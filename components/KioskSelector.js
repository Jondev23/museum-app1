import { useApp } from '../context/AppContext';
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
    e.stopPropagation();
    handleSelect(id);
  };

  // Mouse event handler for selection
  const handleMouseSelect = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    // Only handle mouse events if no touch events are supported
    if (!('ontouchstart' in window)) {
      handleSelect(id);
    }
  };

  // Touch event handler for back button
  const handleTouchBack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onBack();
  };

  // Mouse event handler for back button
  const handleMouseBack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only handle mouse events if no touch events are supported
    if (!('ontouchstart' in window)) {
      onBack();
    }
  };

  return (
    <div className="admin-overlay" style={{ padding: 'min(2rem, 4vw)' }}>
      <div className="admin-panel-wide enter-feedback">
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
              onTouchStart={(e) => handleTouchSelect(e, kiosk.id)}
              onMouseDown={(e) => handleMouseSelect(e, kiosk.id)}
              className={`kiosk-item ${kioskId === kiosk.id ? 'kiosk-item-selected' : 'kiosk-item-unselected'}`}
              style={{
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none'
              }}
            >
              <div className="kiosk-item-name">{kiosk.name}</div>
              <div className="kiosk-item-subtitle">
                {kiosk.theme}
              </div>
            </button>
          ))}
        </div>
        <button
          onTouchStart={handleTouchBack}
          onMouseDown={handleMouseBack}
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
      </div>
    </div>
  );
};

export default KioskSelectorScreen;
