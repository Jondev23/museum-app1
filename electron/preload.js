// Electron preload script - secure communication bridge between main and renderer processes
const { contextBridge, ipcRenderer } = require('electron');

// Expose secure API to renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Listen for screensaver activation signals from main process
  onShowScreensaver: (callback) => ipcRenderer.on('show-screensaver', callback),
  // Clean up event listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});
