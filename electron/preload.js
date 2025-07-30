// Electron preload script - secure communication bridge between main and renderer processes
const { contextBridge, ipcRenderer } = require('electron');

// Expose secure API to renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Listen for screensaver activation signals from main process
  onShowScreensaver: (callback) => ipcRenderer.on('show-screensaver', callback),
  // Clean up event listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
  // Save configuration to file
  saveConfig: (config) => ipcRenderer.invoke('save-config', config),
  // Load configuration from file
  loadConfig: () => ipcRenderer.invoke('load-config'),
  // Load kiosk content from file system
  loadKioskContent: (kioskId) => ipcRenderer.invoke('load-kiosk-content', kioskId)
});
