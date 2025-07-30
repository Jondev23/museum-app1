import { getActiveKioskId } from './configManager';

// Configuration for different kiosk installations in the museum
export const KIOSK_CONFIGS = {
  kiosk1: {
    id: 'kiosk1',
    name: 'Kutschen Geschichte', // General carriage history
    theme: 'general',
    contentFile: 'kiosk1.json'
  },
  kiosk2: {
    id: 'kiosk2', 
    name: 'Luxuskutschen', // Luxury carriages
    theme: 'luxury',
    contentFile: 'kiosk2.json'
  },
  kiosk3: {
    id: 'kiosk3',
    name: 'Kutschenbau', // Carriage construction
    theme: 'craftsmanship', 
    contentFile: 'kiosk3.json'
  }
};

// Function to detect which kiosk configuration to use
// Priority: 1) URL parameter, 2) config file, 3) localStorage, 4) default (kiosk1)
export const detectKioskId = async () => {
  // Return default if running on server-side
  if (typeof window === 'undefined') return 'kiosk1';
  
  // Check URL parameter first (?kiosk=kiosk2)
  const urlParams = new URLSearchParams(window.location.search);
  const urlKiosk = urlParams.get('kiosk');
  if (urlKiosk && KIOSK_CONFIGS[urlKiosk]) {
    return urlKiosk;
  }
  
  // Try to get from config file
  try {
    const configKiosk = await getActiveKioskId();
    if (configKiosk && KIOSK_CONFIGS[configKiosk]) {
      return configKiosk;
    }
  } catch (error) {
    console.warn('Could not load kiosk ID from config:', error);
  }
  
  // Check localStorage for previously set kiosk (fallback)
  const storedKiosk = localStorage.getItem('kioskId');
  if (storedKiosk && KIOSK_CONFIGS[storedKiosk]) {
    return storedKiosk;
  }
  
  // Default to kiosk1 if nothing else is found
  return 'kiosk1';
};

// Synchronous version for initial load
export const detectKioskIdSync = () => {
  // Return default if running on server-side
  if (typeof window === 'undefined') return 'kiosk1';
  
  // Check URL parameter first (?kiosk=kiosk2)
  const urlParams = new URLSearchParams(window.location.search);
  const urlKiosk = urlParams.get('kiosk');
  if (urlKiosk && KIOSK_CONFIGS[urlKiosk]) {
    return urlKiosk;
  }
  
  // Check localStorage for previously set kiosk
  const storedKiosk = localStorage.getItem('kioskId');
  if (storedKiosk && KIOSK_CONFIGS[storedKiosk]) {
    return storedKiosk;
  }
  
  // Default to kiosk1 if nothing else is found
  return 'kiosk1';
};

// Get kiosk configuration object with fallback to default
export const getCurrentKioskConfig = (kioskId) => {
  return KIOSK_CONFIGS[kioskId] || KIOSK_CONFIGS.kiosk1;
};
