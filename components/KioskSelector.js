import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { KIOSK_CONFIGS } from '../utils/kioskConfig';

// Kiosk selection screen for choosing between different kiosk configurations
const KioskSelectorScreen = ({ onKioskSelected, onBack }) => {
  const { setKioskId, kioskId } = useApp();

 
  // Get available kiosk configurations
  const kiosks = Object.values(KIOSK_CONFIGS);

  // Handle kiosk selection
  const handleSelect = (id) => {
    setKioskId(id);
    if (onKioskSelected) onKioskSelected(id);
  };

  // Touch event handler for selection
  const handleTouchSelect = (e, id) => {
    e.preventDefault();
    handleSelect(id);
  };

  // Touch event handler for back button
  const handleTouchBack = (e) => {
    e.preventDefault();
    onBack();
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
          {/* Render kiosk selection buttons */}
          {kiosks.map((kiosk) => (
            <button
              key={kiosk.id}
              onClick={() => handleSelect(kiosk.id)}
              onTouchStart={(e) => handleTouchSelect(e, kiosk.id)}
              className={`kiosk-item ${kioskId === kiosk.id ? 'kiosk-item-selected' : 'kiosk-item-unselected'}`}
              style={{
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none'
              }}
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
          onTouchStart={handleTouchBack}
          className="w-full admin-button-secondary"
          style={{
            touchAction: 'manipulation',
            userSelect: 'none',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none'
          }}
        >
          Zurück
        </button>
      </motion.div>
    </div>
  );
};

export default KioskSelectorScreen;
