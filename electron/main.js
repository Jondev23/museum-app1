const { app, BrowserWindow, globalShortcut, Menu } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV !== 'production';

let mainWindow;
let inactivityTimer;
const INACTIVITY_TIMEOUT = 3 * 60 * 1000; 

console.log('Electron starting in', isDev ? 'DEVELOPMENT' : 'PRODUCTION', 'mode');

function createWindow() {
  // Only disable menu bar in production
  if (!isDev) {
    Menu.setApplicationMenu(null);
  }

  mainWindow = new BrowserWindow({
    width: 1920, 
    height: 1080, 
    fullscreen: !isDev, 
    kiosk: !isDev, 
    frame: isDev, 
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: isDev ? false : true, 
      allowRunningInsecureContent: isDev,
      experimentalFeatures: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the Next.js app
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../out/index.html')}`;
  
  if (isDev) {
    console.log('Loading development server:', startUrl);
    mainWindow.loadURL(startUrl).catch(err => {
      console.error('Failed to load URL:', err);
      // Show a helpful error page
      mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURI(`
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
    // In production, check if the file exists
    const fs = require('fs');
    const filePath = path.join(__dirname, '../out/index.html');
    if (fs.existsSync(filePath)) {
      mainWindow.loadFile(filePath);
    } else {
      console.error('Production build not found. Run "npm run build" first.');
      // Fallback to a simple HTML page
      mainWindow.loadURL(`data:text/html,<h1>Build not found. Run "npm run build" first.</h1>`);
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

  // Reset inactivity timer on any user interaction
  mainWindow.webContents.on('before-input-event', (event, input) => {
    resetInactivityTimer();
  });

  // Prevent navigation away from the app
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    if (parsedUrl.origin !== startUrl) {
      event.preventDefault();
    }
  });

  // Open dev tools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

function resetInactivityTimer() {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }
  
  inactivityTimer = setTimeout(() => {
    if (mainWindow) {
      mainWindow.webContents.send('show-screensaver');
    }
  }, INACTIVITY_TIMEOUT);
}

app.whenReady().then(() => {
  createWindow();
  resetInactivityTimer();

  // Register global shortcuts for kiosk management
  if (!isDev) {
    // Disable common shortcuts that could break kiosk mode
    try {
      globalShortcut.register('Alt+F4', () => {});
      globalShortcut.register('Ctrl+Shift+I', () => {});
      globalShortcut.register('F11', () => {});
      globalShortcut.register('F12', () => {});
      // Note: Ctrl+Alt+Del cannot be disabled on most systems
    } catch (error) {
      console.warn('Could not register some global shortcuts:', error);
    }
  }

  // Allow admin exit in development
  if (isDev) {
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
      globalShortcut.register('F12', () => {
        console.log('Opening DevTools via F12');
        if (mainWindow) {
          mainWindow.webContents.openDevTools();
        }
      });
      globalShortcut.register('Escape', () => {
        console.log('Exiting fullscreen via Escape');
        if (mainWindow && mainWindow.isFullScreen()) {
          mainWindow.setFullScreen(false);
        }
      });
      console.log('Development shortcuts registered: Ctrl+Q (quit), Ctrl+R (reload), F12 (devtools), Escape (exit fullscreen)');
    } catch (error) {
      console.warn('Could not register development shortcuts:', error);
    }
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
