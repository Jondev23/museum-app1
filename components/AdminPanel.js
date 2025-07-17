import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KioskSelectorScreen from './KioskSelector';

const AdminPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [clickSequence, setClickSequence] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showKioskSelector, setShowKioskSelector] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Geheime Sequenz: Klick auf die 4 Ecken in der Reihenfolge (oben-links, oben-rechts, unten-rechts, unten-links)
  const SECRET_SEQUENCE = ['tl', 'tr', 'br', 'bl'];
  const ADMIN_PASSWORD = 'museum2025';

  useEffect(() => {
    // Reset sequence after 10 seconds of inactivity
    const timer = setTimeout(() => {
      setClickSequence([]);
    }, 10000);

    return () => clearTimeout(timer);
  }, [clickSequence]);

  const handleCornerClick = (corner) => {
    const newSequence = [...clickSequence, corner];
    setClickSequence(newSequence);

    if (newSequence.length === SECRET_SEQUENCE.length) {
      if (JSON.stringify(newSequence) === JSON.stringify(SECRET_SEQUENCE)) {
        setIsVisible(true);
      }
      setClickSequence([]);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setPassword('');
      alert('Passwort inkorrekt');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setPassword('');
    setIsAuthenticated(false);
  };

  const handleExitKiosk = () => {
    if (window.confirm('Kiosk-Modus wirklich beenden?')) {
      // In Electron app
      if (window.electronAPI) {
        window.close();
      } else {
        // In browser
        window.location.href = 'about:blank';
      }
    }
  };



  return (
    <>
      {/* Unsichtbare Eck-Trigger - responsiv */}
      <div 
        className="admin-corner-trigger top-0 left-0"
        onClick={() => handleCornerClick('tl')}
      />
      <div 
        className="admin-corner-trigger top-0 right-0"
        onClick={() => handleCornerClick('tr')}
      />
      <div 
        className="admin-corner-trigger bottom-0 right-0"
        onClick={() => handleCornerClick('br')}
      />
      <div 
        className="admin-corner-trigger bottom-0 left-0"
        onClick={() => handleCornerClick('bl')}
      />

      {/* Admin Panel */}
      <AnimatePresence>
        {isVisible && !showKioskSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="admin-overlay"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="admin-panel"
            >
              <h2 className="admin-title">
                Admin Panel
              </h2>
              {successMsg && (
                <div className="admin-success-message">
                  {successMsg}
                </div>
              )}
              {!isAuthenticated ? (
                <form onSubmit={handlePasswordSubmit} className="admin-form">
                  <div>
                    <label className="admin-label">
                      Passwort
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="admin-input"
                      autoFocus
                    />
                  </div>
                  <div className="admin-button-group">
                    <button
                      type="submit"
                      className="flex-1 admin-button-primary"
                    >
                      Anmelden
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 admin-button-secondary"
                    >
                      Abbrechen
                    </button>
                  </div>
                </form>
              ) : (
                <div className="admin-form-group">
                  {/* Hauptbuttons */}
                  <button
                    onClick={() => setShowKioskSelector(true)}
                    className="w-full admin-button-primary"
                  >
                    Kiosk auswählen
                  </button>
                  
                  <button
                    onClick={handleClose}
                    className="w-full admin-button-secondary"
                    style={{ marginBottom: 'min(1.5rem, 3vw)' }}
                  >
                    Panel schließen
                  </button>

                  {/* Visueller Trenner im Apple-Stil */}
                  <div className="admin-separator" />
                  
                  {/* Separater Exit-Button */}
                  <button
                    onClick={handleExitKiosk}
                    className="w-full admin-button-danger"
                  >
                    Kiosk-Modus beenden
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
        {isVisible && showKioskSelector && (
          <KioskSelectorScreen
            onKioskSelected={(id) => {
              setShowKioskSelector(false);
              setSuccessMsg('Kiosk erfolgreich ausgewählt.');
              setTimeout(() => setSuccessMsg(''), 2000);
            }}
            onBack={() => setShowKioskSelector(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminPanel;
