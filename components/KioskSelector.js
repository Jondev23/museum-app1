import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { KIOSK_CONFIGS } from '../utils/kioskConfig';

const KioskSelectorScreen = ({ onKioskSelected, onBack }) => {
  const { setKioskId, kioskId } = useApp();

  // Konvertiert das Kiosk-Objekt in ein Array
  const kiosks = Object.values(KIOSK_CONFIGS);

  const handleSelect = (id) => {
    setKioskId(id);
    if (onKioskSelected) onKioskSelected(id);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-80 flex flex-col items-center justify-center"
      style={{ padding: 'min(2rem, 4vw)' }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-lg shadow-2xl w-full flex flex-col items-center"
        style={{
          maxWidth: 'min(26rem, 90vw)', 
          padding: 'min(2.5rem, 5vw)', 
          borderRadius: 'min(1rem, 2vw)', 
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)'
        }}
      >
        <h2 
          className="font-medium text-center text-gray-800" 
          style={{ 
            fontSize: 'min(1.375rem, 2.75vw)',
            marginBottom: 'min(2rem, 4vw)',
            fontWeight: '500'
          }}
        >
          Kiosk auswählen
        </h2>
        <div 
          className="w-full flex flex-col"
          style={{ 
            gap: 'min(0.75rem, 1.5vw)', 
            marginBottom: 'min(2rem, 4vw)'
          }}
        >
          {kiosks.map((kiosk) => (
            <button
              key={kiosk.id}
              onClick={() => handleSelect(kiosk.id)}
              className={`w-full rounded-lg text-left font-medium transition-all ${kioskId === kiosk.id ? 'bg-blue-500 text-white' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'}`}
              style={{ 
                fontSize: 'min(1rem, 2vw)',
                padding: 'min(1rem, 2vw) min(1.25rem, 2.5vw)', 
                borderRadius: 'min(0.5rem, 1vw)',
                fontWeight: '500'
              }}
            >
              <div>{kiosk.name}</div>
              <div 
                className="font-normal opacity-70"
                style={{
                  fontSize: 'min(0.875rem, 1.75vw)',
                  marginTop: 'min(0.25rem, 0.5vw)'
                }}
              >
                {kiosk.theme}
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={onBack}
          className="w-full bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
          style={{
            padding: 'min(0.875rem, 1.75vw) min(1.25rem, 2.5vw)',
            borderRadius: 'min(0.5rem, 1vw)',
            fontSize: 'min(1rem, 2vw)',
            fontWeight: '500'
          }}
        >
          Zurück
        </button>
      </motion.div>
    </div>
  );
};

export default KioskSelectorScreen;
