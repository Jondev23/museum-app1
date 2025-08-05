// Electron main process for museum kiosk application
const { app, BrowserWindow, globalShortcut, Menu, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;

// Better production detection for packaged apps
const isDev = process.env.NODE_ENV === 'development' || 
              (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath));

console.log('Electron starting in', isDev ? 'DEVELOPMENT' : 'PRODUCTION', 'mode');
console.log('process.execPath:', process.execPath);
console.log('process.resourcesPath:', process.resourcesPath);
console.log('__dirname:', __dirname);

let mainWindow;

// Use userData directory for config file - this is writable in packaged apps
const CONFIG_FILE_PATH = isDev 
  ? path.join(__dirname, '../public/config.json')
  : path.join(app.getPath('userData'), 'config.json');

console.log('Config file path:', CONFIG_FILE_PATH);

// Configuration management functions
async function loadConfig() {
  try {
    const configData = await fs.readFile(CONFIG_FILE_PATH, 'utf8');
    const config = JSON.parse(configData);
    console.log('Config loaded from file:', config);
    return config;
  } catch (error) {
    console.warn('Could not load config file, trying to migrate or create default:', error.message);
    
    // Try to migrate from old location in development
    if (isDev) {
      try {
        const oldConfigPath = path.join(__dirname, '../public/config.json');
        const oldConfigData = await fs.readFile(oldConfigPath, 'utf8');
        const oldConfig = JSON.parse(oldConfigData);
        console.log('Migrating config from old location:', oldConfig);
        await saveConfig(oldConfig);
        return oldConfig;
      } catch (migrationError) {
        console.log('No old config to migrate');
      }
    }
    
    const defaultConfig = {
      activeKioskId: 'kiosk1',
      screensaverTimeout: 10000, // 10 seconds unified default
      lastUpdated: new Date().toISOString()
    };
    
    // Try to create default config file
    try {
      await saveConfig(defaultConfig);
      console.log('Created default config file');
    } catch (saveError) {
      console.error('Could not save default config:', saveError.message);
    }
    
    return defaultConfig;
  }
}

async function saveConfig(config) {
  try {
    // Ensure the directory exists (important for userData directory)
    const configDir = path.dirname(CONFIG_FILE_PATH);
    await fs.mkdir(configDir, { recursive: true });
    
    const configData = JSON.stringify(config, null, 2);
    await fs.writeFile(CONFIG_FILE_PATH, configData, 'utf8');
    console.log('Config saved to file:', CONFIG_FILE_PATH, config);
    return true;
  } catch (error) {
    console.error('Error saving config file:', error);
    throw error;
  }
}

// IPC handlers for config management
ipcMain.handle('load-config', async () => {
  return await loadConfig();
});

ipcMain.handle('save-config', async (event, config) => {
  return await saveConfig(config);
});

// Create the main browser window
function createWindow() {
  // Keep standard menu bar for desktop application
  // Menu.setApplicationMenu(null); // Commented out to keep standard menu

  mainWindow = new BrowserWindow({
    width: 1920, 
    height: 1080, 
    fullscreen: false, 
    kiosk: false, 
    frame: true, 
    show: false,
    resizable: true,
    minimizable: true,
    maximizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: false, // Disable webSecurity to allow local file loading in production
      allowRunningInsecureContent: true,
      experimentalFeatures: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the Next.js app
  if (isDev) {
    console.log('Development mode - Loading from localhost:3000');
    const startUrl = 'http://localhost:3000';
    mainWindow.loadURL(startUrl).catch(err => {
      console.error('Failed to load URL:', err);
      // Show a helpful error page
      mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURI(`
        <!DOCTYPE html>
        <html>
          <head><title>Development Server</title></head>
          <body style="font-family: Arial; padding: 40px; background: #f0f0f0; text-align: center;">
            <h1>🚀 Waiting for Next.js Development Server</h1>
            <p>Please make sure the development server is running on port 3000</p>
            <p>Run: <code style="background: #eee; padding: 5px;">npm run next-dev</code> in another terminal</p>
            <br>
            <button onclick="location.reload()" style="padding: 10px 20px; font-size: 16px; margin: 10px;">🔄 Retry</button>
            <button onclick="window.close()" style="padding: 10px 20px; font-size: 16px; margin: 10px;">❌ Close</button>
          </body>
        </html>
      `));
    });
  } else {
    // Production mode - start local server and load from it
    console.log('Production mode - Starting local server for static files');
    
    const startLocalServer = () => {
      return new Promise((resolve, reject) => {
        const http = require('http');
        const fs = require('fs');
        
        // MIME types for different files
        const mimeTypes = {
          '.html': 'text/html',
          '.css': 'text/css',
          '.js': 'application/javascript',
          '.json': 'application/json',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.gif': 'image/gif',
          '.svg': 'image/svg+xml',
          '.webp': 'image/webp',
          '.mp4': 'video/mp4',
          '.otf': 'font/otf',
          '.woff': 'font/woff',
          '.woff2': 'font/woff2'
        };
        
        const server = http.createServer((req, res) => {
          // Add CORS headers
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          
          if (req.method === 'OPTIONS') {
            res.writeHead(204);
            res.end();
            return;
          }
          
          let filePath = path.join(__dirname, '../out', req.url);
          
          // If root, serve index.html
          if (req.url === '/') {
            filePath = path.join(__dirname, '../out', 'index.html');
          }
          
          // If file doesn't exist, serve index.html (SPA routing)
          if (!fs.existsSync(filePath)) {
            filePath = path.join(__dirname, '../out', 'index.html');
          }
          
          const ext = path.extname(filePath);
          const contentType = mimeTypes[ext] || 'application/octet-stream';
          
          fs.readFile(filePath, (err, data) => {
            if (err) {
              console.error('File read error:', err, 'for path:', filePath);
              res.writeHead(404);
              res.end('404 - File not found');
              return;
            }
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
          });
        });
        
        server.listen(3001, (err) => {
          if (err) {
            reject(err);
          } else {
            console.log('Local server started on http://localhost:3001');
            resolve('http://localhost:3001');
          }
        });
      });
    };
    
    startLocalServer()
      .then((serverUrl) => {
        mainWindow.loadURL(serverUrl);
      })
      .catch((err) => {
        console.error('Failed to start local server:', err);
        // Fallback to file loading
        const fallbackPath = path.join(__dirname, '../out/index.html');
        if (fs.existsSync(fallbackPath)) {
          mainWindow.loadFile(fallbackPath);
        } else {
          console.error('Could not find index.html at:', fallbackPath);
        }
      });
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focus the window
    if (mainWindow) {
      mainWindow.focus();
    }
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Allow navigation within the same domain (only for development)
  if (isDev) {
    mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
      const parsedUrl = new URL(navigationUrl);
      if (parsedUrl.origin !== 'http://localhost:3000') {
        event.preventDefault();
      }
    });
  }

  // Open dev tools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  // Register useful shortcuts for desktop application
  try {
    globalShortcut.register('Ctrl+Q', () => {
      console.log('Quitting app via Ctrl+Q');
      app.quit();
    });
    globalShortcut.register('Ctrl+R', () => {
      console.log('Reloading app via Ctrl+R');
      if (mainWindow) {
        mainWindow.reload();
      }
    });
    if (isDev) {
      globalShortcut.register('F12', () => {
        console.log('Opening DevTools via F12');
        if (mainWindow) {
          mainWindow.webContents.openDevTools();
        }
      });
    }
    console.log('Desktop application shortcuts registered: Ctrl+Q (quit), Ctrl+R (reload)' + (isDev ? ', F12 (devtools)' : ''));
  } catch (error) {
    console.warn('Could not register application shortcuts:', error);
  }
});

// IPC handlers for loading content
ipcMain.handle('load-kiosk-content', async (event, kioskId) => {
  try {
    console.log('Loading kiosk content for:', kioskId);
    
    // Try multiple possible paths for content files
    const possibleContentPaths = [
      path.join(process.resourcesPath, 'app', 'out', 'content', `${kioskId}.json`),  
      path.join(__dirname, '../out/content', `${kioskId}.json`),                     
      path.join(__dirname, '../public/content', `${kioskId}.json`),                 
      path.join(process.cwd(), 'out', 'content', `${kioskId}.json`),               
      path.join(app.getAppPath(), 'out', 'content', `${kioskId}.json`)    
    ];
    
    console.log('Checking content paths:', possibleContentPaths);
    
    let contentPath = null;
    for (const testPath of possibleContentPaths) {
      console.log('Checking content path:', testPath);
      try {
        await fs.access(testPath);
        contentPath = testPath;
        console.log('Found content file at:', contentPath);
        break;
      } catch (error) {
        console.log('Path not found:', testPath);
        // File doesn't exist, continue to next path
      }
    }
    
    if (contentPath) {
      const contentData = await fs.readFile(contentPath, 'utf8');
      const content = JSON.parse(contentData);
      console.log('Content loaded successfully from:', contentPath);
      console.log('Content preview:', Object.keys(content));
      return content;
    } else {
      console.error(`Content file not found for kiosk: ${kioskId}`);
      console.error('Checked paths:', possibleContentPaths);
      throw new Error(`Content file not found for kiosk: ${kioskId}`);
    }
  } catch (error) {
    console.error('Error loading kiosk content:', error);
    throw error;
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('will-quit', () => {
  // Unregister all shortcuts
  globalShortcut.unregisterAll();
});

// Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
  });
});
