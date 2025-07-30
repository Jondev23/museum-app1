import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { setScreensaverTimeout as saveScreensaverTimeout } from '../utils/configManager';

// Settings screen for configuring screensaver timeout
const SettingsScreen = ({ onBack, onSettingsSaved }) => {
  const { screensaverTimeout, setScreensaverTimeout } = useApp();
  const [timeoutMinutes, setTimeoutMinutes] = useState(Math.round(screensaverTimeout / 60000));
  const [isSaving, setIsSaving] = useState(false);

  // Predefined timeout options (in minutes)
  const timeoutOptions = [
    { value: 1, label: '1 Minute' },
    { value: 2, label: '2 Minuten' },
    { value: 3, label: '3 Minuten' },
    { value: 5, label: '5 Minuten' },
    { value: 10, label: '10 Minuten' },
    { value: 15, label: '15 Minuten' }
  ];

  // Handle timeout selection
  const handleTimeoutSelect = (minutes) => {
    setTimeoutMinutes(minutes);
  };

  // Handle touch event for timeout selection
  const handleTouchSelect = (e, minutes) => {
    e.preventDefault();
    handleTimeoutSelect(minutes);
  };

  // Save settings
  const handleSave = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      const timeoutMs = timeoutMinutes * 60 * 1000;
      await saveScreensaverTimeout(timeoutMs);
      
      // Update the context state immediately
      setScreensaverTimeout(timeoutMs);
      
      if (onSettingsSaved) {
        onSettingsSaved(timeoutMs);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Fehler beim Speichern der Einstellungen');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle touch event for save
  const handleTouchSave = (e) => {
    e.preventDefault();
    handleSave();
  };

  // Handle touch event for back button
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
          Screensaver-Einstellungen
        </h2>
        
        <div className="admin-form-group">
          <label className="admin-label" style={{ marginBottom: 'min(1rem, 2vw)' }}>
            Timeout bis Screensaver (aktuell: {Math.round(screensaverTimeout / 60000)} Min.)
          </label>
          
          <div 
            className="w-full flex flex-col"
            style={{ 
              gap: 'min(0.5rem, 1vw)', 
              marginBottom: 'min(2rem, 4vw)'
            }}
          >
            {timeoutOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleTimeoutSelect(option.value)}
                onTouchStart={(e) => handleTouchSelect(e, option.value)}
                className={`admin-timeout-option ${timeoutMinutes === option.value ? 'admin-timeout-selected' : 'admin-timeout-unselected'}`}
                style={{
                  touchAction: 'manipulation',
                  userSelect: 'none',
                  WebkitTouchCallout: 'none',
                  WebkitUserSelect: 'none'
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="admin-button-group">
            <button
              onClick={handleSave}
              onTouchStart={handleTouchSave}
              disabled={isSaving}
              className="flex-1 admin-button-primary"
              style={{
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                opacity: isSaving ? 0.6 : 1
              }}
            >
              {isSaving ? 'Speichern...' : 'Speichern'}
            </button>
            
            <button
              onClick={onBack}
              onTouchStart={handleTouchBack}
              disabled={isSaving}
              className="flex-1 admin-button-secondary"
              style={{
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                opacity: isSaving ? 0.6 : 1
              }}
            >
              Zurück
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsScreen;
