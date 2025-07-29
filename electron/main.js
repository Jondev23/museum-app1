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
let inactivityTimer;
const INACTIVITY_TIMEOUT = 3 * 60 * 1000; // 3 minutes inactivity timeout (will be configurable)
const CONFIG_FILE_PATH = path.join(__dirname, '../public/config.json');

console.log('Electron starting in', isDev ? 'DEVELOPMENT' : 'PRODUCTION', 'mode');
console.log('Config file path:', CONFIG_FILE_PATH);

// Configuration management functions
async function loadConfig() {
  try {
    const configData = await fs.readFile(CONFIG_FILE_PATH, 'utf8');
    const config = JSON.parse(configData);
    console.log('Config loaded from file:', config);
    return config;
  } catch (error) {
    console.warn('Could not load config file, using defaults:', error.message);
    const defaultConfig = {
      activeKioskId: 'kiosk1',
      screensaverTimeout: 180000,
      lastUpdated: new Date().toISOString()
    };
    // Try to create default config file
    try {
      await saveConfig(defaultConfig);
    } catch (saveError) {
      console.error('Could not save default config:', saveError.message);
    }
    return defaultConfig;
  }
}

async function saveConfig(config) {
  try {
    const configData = JSON.stringify(config, null, 2);
    await fs.writeFile(CONFIG_FILE_PATH, configData, 'utf8');
    console.log('Config saved to file:', config);
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

  // Always enable DevTools for debugging (commented out for production)
  // mainWindow.webContents.openDevTools();

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
    // Production mode - load static files
    const fs = require('fs');
    console.log('Production mode - Loading static files');
    
    // Try multiple possible paths for the index.html file
    const possiblePaths = [
      path.join(process.resourcesPath, 'app', 'out', 'index.html'),  // Standard packaged path
      path.join(__dirname, '../out/index.html'),                    // Development build path
      path.join(process.cwd(), 'out', 'index.html'),               // Current working directory
      path.join(app.getAppPath(), 'out', 'index.html')             // App path
    ];
    
    let filePath = null;
    for (const testPath of possiblePaths) {
      console.log('Checking path:', testPath);
      if (fs.existsSync(testPath)) {
        filePath = testPath;
        console.log('Found index.html at:', filePath);
        break;
      }
    }
    
    if (filePath) {
      mainWindow.loadFile(filePath);
    } else {
      console.error('Could not find index.html in any of the expected locations');
      console.error('Tried paths:', possiblePaths);
      // Show error page with proper DOCTYPE
      mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURI(`
        <!DOCTYPE html>
        <html>
          <head><title>File Not Found</title></head>
          <body style="font-family: Arial; padding: 40px; background: #f0f0f0; text-align: center;">
            <h1>❌ Application Files Not Found</h1>
            <p>The application could not locate the required files.</p>
            <p>Please ensure the application was built properly with: <code>npm run package</code></p>
            <h3>Searched in:</h3>
            <ul style="text-align: left; display: inline-block;">
              ${possiblePaths.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </body>
        </html>
      `));
    }
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

  // Optional: Reset inactivity timer on any user interaction (disabled for desktop app)
  // mainWindow.webContents.on('before-input-event', (event, input) => {
  //   resetInactivityTimer();
  // });

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

// Optional function for desktop app - screensaver disabled by default
function resetInactivityTimer() {
  // Disabled for desktop application
  // if (inactivityTimer) {
  //   clearTimeout(inactivityTimer);
  // }
  
  // inactivityTimer = setTimeout(() => {
  //   if (mainWindow) {
  //     mainWindow.webContents.send('show-screensaver');
  //   }
  // }, INACTIVITY_TIMEOUT);
}

app.whenReady().then(() => {
  createWindow();
  // Optional: resetInactivityTimer(); // Disabled for desktop app

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
      path.join(process.resourcesPath, 'app', 'out', 'content', `${kioskId}.json`),  // Standard packaged path
      path.join(__dirname, '../out/content', `${kioskId}.json`),                     // Development build path
      path.join(__dirname, '../public/content', `${kioskId}.json`),                  // Source path
      path.join(process.cwd(), 'out', 'content', `${kioskId}.json`),               // Current working directory
      path.join(app.getAppPath(), 'out', 'content', `${kioskId}.json`)             // App path
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
