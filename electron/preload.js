const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onShowScreensaver: (callback) => ipcRenderer.on('show-screensaver', callback),
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});
