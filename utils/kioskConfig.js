// Configuración para diferentes kioscos
export const KIOSK_CONFIGS = {
  kiosk1: {
    id: 'kiosk1',
    name: 'Kutschen Geschichte',
    theme: 'general',
    contentFile: 'kiosk1.json'
  },
  kiosk2: {
    id: 'kiosk2', 
    name: 'Luxuskutschen',
    theme: 'luxury',
    contentFile: 'kiosk2.json'
  },
  kiosk3: {
    id: 'kiosk3',
    name: 'Kutschenbau',
    theme: 'craftsmanship', 
    contentFile: 'kiosk3.json'
  }
};

// Detectar el kiosk ID del URL o localStorage
export const detectKioskId = () => {
  if (typeof window === 'undefined') return 'kiosk1';
  
  // Prioridad 1: URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const urlKiosk = urlParams.get('kiosk');
  if (urlKiosk && KIOSK_CONFIGS[urlKiosk]) {
    localStorage.setItem('kioskId', urlKiosk);
    return urlKiosk;
  }
  
  // Prioridad 2: localStorage
  const storedKiosk = localStorage.getItem('kioskId');
  if (storedKiosk && KIOSK_CONFIGS[storedKiosk]) {
    return storedKiosk;
  }
  
  // Default: kiosk1
  return 'kiosk1';
};

// Obtener configuración del kiosk actual
export const getCurrentKioskConfig = (kioskId) => {
  return KIOSK_CONFIGS[kioskId] || KIOSK_CONFIGS.kiosk1;
};
