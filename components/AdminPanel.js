// Import React hooks, animation library, and kiosk selector
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KioskSelectorScreen from './KioskSelector';

// Admin panel component - hidden panel for kiosk management and configuration
const AdminPanel = () => {
  // State for panel visibility and authentication
  const [isVisible, setIsVisible] = useState(false);
  const [clickSequence, setClickSequence] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showKioskSelector, setShowKioskSelector] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const passwordInputRef = useRef(null);

  // Security configuration
  const SECRET_SEQUENCE = ['tr', 'tr', 'br']; // Top-right, top-right, bottom-right
  const ADMIN_PASSWORD = 'museum2025';

  // Reset click sequence after timeout to prevent accidental access
  useEffect(() => {
    const timer = setTimeout(() => {
      setClickSequence([]);
    }, 10000); // 10 second timeout

    return () => clearTimeout(timer);
  }, [clickSequence]);

  // Auto-focus password input when panel becomes visible
  useEffect(() => {
    if (isVisible && !isAuthenticated && passwordInputRef.current) {
      const timer = setTimeout(() => {
        passwordInputRef.current.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isAuthenticated, password]);

  // Handle corner click sequence for panel activation
  const handleCornerClick = (corner) => {
    const newSequence = [...clickSequence, corner];
    setClickSequence(newSequence);

    // Check if sequence matches the secret pattern
    if (newSequence.length === SECRET_SEQUENCE.length) {
      if (JSON.stringify(newSequence) === JSON.stringify(SECRET_SEQUENCE)) {
        setIsVisible(true);
      }
      setClickSequence([]);
    }
  };

  // Handle touch events for mobile devices
  const handleCornerTouch = (e, corner) => {
    e.preventDefault();
    handleCornerClick(corner);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setPassword('');
      alert('Passwort inkorrekt');
     
      setTimeout(() => {
        if (passwordInputRef.current) {
          passwordInputRef.current.focus();
        }
      }, 100);
    }
  };

  const handlePasswordTouchSubmit = (e) => {
    e.preventDefault();
    handlePasswordSubmit(e);
  };

  const handleClose = () => {
    setIsVisible(false);
    setPassword('');
    setIsAuthenticated(false);
    setShowKioskSelector(false);
    setSuccessMsg('');
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
      
      <div 
        className="admin-corner-trigger top-0 right-0"
        onClick={() => handleCornerClick('tr')}
        onTouchStart={(e) => handleCornerTouch(e, 'tr')}
        style={{
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none'
        }}
      />
      
      
      <div 
        className="admin-corner-trigger bottom-0 right-0"
        onClick={() => handleCornerClick('br')}
        onTouchStart={(e) => handleCornerTouch(e, 'br')}
        style={{
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none'
        }}
      />

      
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
                      ref={passwordInputRef}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="admin-input"
                      autoFocus
                    />
                  </div>
                  <div className="admin-button-group-spaced">
                    <button
                      type="submit"
                      className="flex-1 admin-button-primary"
                      onTouchStart={handlePasswordTouchSubmit}
                      style={{
                        touchAction: 'manipulation',
                        userSelect: 'none',
                        WebkitTouchCallout: 'none',
                        WebkitUserSelect: 'none'
                      }}
                    >
                      Anmelden
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      onTouchStart={(e) => { e.preventDefault(); handleClose(); }}
                      className="flex-1 admin-button-secondary"
                      style={{
                        touchAction: 'manipulation',
                        userSelect: 'none',
                        WebkitTouchCallout: 'none',
                        WebkitUserSelect: 'none'
                      }}
                    >
                      Abbrechen
                    </button>
                  </div>
                </form>
              ) : (
                <div className="admin-form-group">
                  <button
                    onClick={() => setShowKioskSelector(true)}
                    onTouchStart={(e) => { e.preventDefault(); setShowKioskSelector(true); }}
                    className="w-full admin-button-primary"
                    style={{
                      touchAction: 'manipulation',
                      userSelect: 'none',
                      WebkitTouchCallout: 'none',
                      WebkitUserSelect: 'none'
                    }}
                  >
                    Kiosk auswählen
                  </button>
                  
                  <button
                    onClick={handleClose}
                    onTouchStart={(e) => { e.preventDefault(); handleClose(); }}
                    className="w-full admin-button-secondary"
                    style={{ 
                      marginBottom: 'min(1.5rem, 3vw)',
                      touchAction: 'manipulation',
                      userSelect: 'none',
                      WebkitTouchCallout: 'none',
                      WebkitUserSelect: 'none'
                    }}
                  >
                    Panel schließen
                  </button>

                  <div className="admin-separator" />
                  
                  <button
                    onClick={handleExitKiosk}
                    onTouchStart={(e) => { e.preventDefault(); handleExitKiosk(); }}
                    className="w-full admin-button-danger"
                    style={{
                      touchAction: 'manipulation',
                      userSelect: 'none',
                      WebkitTouchCallout: 'none',
                      WebkitUserSelect: 'none'
                    }}
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
