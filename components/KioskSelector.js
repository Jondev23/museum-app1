import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { KIOSK_CONFIGS } from '../utils/kioskConfig';

const KioskSelectorScreen = ({ onKioskSelected, onBack }) => {
  const { setKioskId, kioskId } = useApp();

  // Convertimos el objeto de kioscos a un array
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
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 flex flex-col items-center"
      >
        <h2 className="font-bold text-center mb-6" style={{ fontSize: 'min(1.5rem, 3vw)' }}>
          Kiosk auswählen
        </h2>
        <div className="w-full flex flex-col gap-4 mb-6">
          {kiosks.map((kiosk) => (
            <button
              key={kiosk.id}
              onClick={() => handleSelect(kiosk.id)}
              className={`w-full rounded px-4 py-3 text-left font-bold transition-all ${kioskId === kiosk.id ? 'bg-museum-gold text-black' : 'bg-gray-100 text-black hover:bg-gray-200'}`}
              style={{ fontSize: 'min(1rem, 2vw)' }}
            >
              <div>{kiosk.name}</div>
              <div className="font-normal text-sm opacity-70">{kiosk.theme}</div>
            </button>
          ))}
        </div>
        <button
          onClick={onBack}
          className="w-full bg-museum-brown text-white rounded-md hover:bg-opacity-90 py-2 font-medium"
        >
          Zurück
        </button>
      </motion.div>
    </div>
  );
};

export default KioskSelectorScreen;
