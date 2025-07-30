// Configuration manager for persistent app settings
const CONFIG_FILE_PATH = './config.json';

// Default configuration values
const DEFAULT_CONFIG = {
  activeKioskId: 'kiosk1',
  screensaverTimeout: 180000, // 3 minutes in milliseconds - fallback if config.json not available
  lastUpdated: new Date().toISOString()
};

// Load configuration from file
export const loadConfig = async () => {
  try {
    // Try Electron API first
    if (window.electronAPI && window.electronAPI.loadConfig) {
      const config = await window.electronAPI.loadConfig();
      console.log('Configuration loaded via Electron:', config);
      return { ...DEFAULT_CONFIG, ...config };
    }
    
    // Fallback to fetch for browser environment
    const response = await fetch(CONFIG_FILE_PATH);
    if (!response.ok) {
      console.warn('Config file not found, using defaults');
      return DEFAULT_CONFIG;
    }
    const config = await response.json();
    console.log('Configuration loaded via fetch:', config);
    return { ...DEFAULT_CONFIG, ...config };
  } catch (error) {
    console.error('Error loading config:', error);
    
    // Try to load from localStorage as last resort
    try {
      const localConfig = localStorage.getItem('appConfig');
      if (localConfig) {
        const parsedConfig = JSON.parse(localConfig);
        console.log('Configuration loaded from localStorage:', parsedConfig);
        return { ...DEFAULT_CONFIG, ...parsedConfig };
      }
    } catch (localError) {
      console.error('Error loading from localStorage:', localError);
    }
    
    return DEFAULT_CONFIG;
  }
};

// Save configuration to file (only works in Electron environment)
export const saveConfig = async (config) => {
  try {
    // In Electron environment
    if (window.electronAPI && window.electronAPI.saveConfig) {
      await window.electronAPI.saveConfig(config);
      console.log('Configuration saved:', config);
      return true;
    } else {
      // In browser environment, use localStorage as fallback
      localStorage.setItem('appConfig', JSON.stringify(config));
      console.log('Configuration saved to localStorage:', config);
      return true;
    }
  } catch (error) {
    console.error('Error saving config:', error);
    return false;
  }
};

// Get active kiosk ID from config
export const getActiveKioskId = async () => {
  const config = await loadConfig();
  return config.activeKioskId || DEFAULT_CONFIG.activeKioskId;
};

// Set active kiosk ID and save config
export const setActiveKioskId = async (kioskId) => {
  try {
    const config = await loadConfig();
    const updatedConfig = {
      ...config,
      activeKioskId: kioskId,
      lastUpdated: new Date().toISOString()
    };
    
    const saved = await saveConfig(updatedConfig);
    if (saved) {
      // Also update localStorage for immediate use
      localStorage.setItem('kioskId', kioskId);
    }
    return saved;
  } catch (error) {
    console.error('Error setting active kiosk ID:', error);
    return false;
  }
};

// Get screensaver timeout from config
export const getScreensaverTimeout = async () => {
  const config = await loadConfig();
  return config.screensaverTimeout || DEFAULT_CONFIG.screensaverTimeout;
};

// Set screensaver timeout and save config
export const setScreensaverTimeout = async (timeout) => {
  try {
    const config = await loadConfig();
    const updatedConfig = {
      ...config,
      screensaverTimeout: timeout,
      lastUpdated: new Date().toISOString()
    };
    
    return await saveConfig(updatedConfig);
  } catch (error) {
    console.error('Error setting screensaver timeout:', error);
    return false;
  }
};

// Initialize config with fallback to localStorage
export const initializeConfig = async () => {
  try {
    // First try to load from config file
    let config = await loadConfig();
    
    // Check if we have a stored kiosk ID in localStorage (from previous version)
    const storedKioskId = localStorage.getItem('kioskId');
    if (storedKioskId && storedKioskId !== config.activeKioskId) {
      console.log('Migrating kiosk ID from localStorage:', storedKioskId);
      config.activeKioskId = storedKioskId;
      config.lastUpdated = new Date().toISOString();
      await saveConfig(config);
    }
    
    return config;
  } catch (error) {
    console.error('Error initializing config:', error);
    return DEFAULT_CONFIG;
  }
};
