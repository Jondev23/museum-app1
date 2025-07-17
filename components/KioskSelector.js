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
    <div className="admin-overlay" style={{ padding: 'min(2rem, 4vw)' }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="admin-panel-wide"
      >
        <h2 className="admin-title">
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
              className={`kiosk-item ${kioskId === kiosk.id ? 'kiosk-item-selected' : 'kiosk-item-unselected'}`}
            >
              <div>{kiosk.name}</div>
              <div className="kiosk-item-subtitle">
                {kiosk.theme}
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={onBack}
          className="w-full admin-button-secondary"
        >
          Zurück
        </button>
      </motion.div>
    </div>
  );
};

export default KioskSelectorScreen;
