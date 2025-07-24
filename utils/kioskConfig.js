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

export const detectKioskId = () => {
  if (typeof window === 'undefined') return 'kiosk1';
  
  const urlParams = new URLSearchParams(window.location.search);
  const urlKiosk = urlParams.get('kiosk');
  if (urlKiosk && KIOSK_CONFIGS[urlKiosk]) {
    localStorage.setItem('kioskId', urlKiosk);
    return urlKiosk;
  }
  
  const storedKiosk = localStorage.getItem('kioskId');
  if (storedKiosk && KIOSK_CONFIGS[storedKiosk]) {
    return storedKiosk;
  }
  
  return 'kiosk1';
};

export const getCurrentKioskConfig = (kioskId) => {
  return KIOSK_CONFIGS[kioskId] || KIOSK_CONFIGS.kiosk1;
};
