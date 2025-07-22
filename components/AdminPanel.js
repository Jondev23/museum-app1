import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KioskSelectorScreen from './KioskSelector';

const AdminPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [clickSequence, setClickSequence] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showKioskSelector, setShowKioskSelector] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const passwordInputRef = useRef(null);

  // Nueva secuencia SIN esquina superior izquierda: 2x superior derecha, luego 1x inferior derecha
  const SECRET_SEQUENCE = ['tr', 'tr', 'br'];
  const ADMIN_PASSWORD = 'museum2025';

  useEffect(() => {
    // Reset sequence after 10 seconds of inactivity
    const timer = setTimeout(() => {
      setClickSequence([]);
    }, 10000);

    return () => clearTimeout(timer);
  }, [clickSequence]);

  // Efecto para mantener el foco en el input de contraseña cuando es visible
  useEffect(() => {
    if (isVisible && !isAuthenticated && passwordInputRef.current) {
      const timer = setTimeout(() => {
        passwordInputRef.current.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isAuthenticated, password]);

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
      // Restaurar el foco al input después del alert
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
      {/* Solo los triggers necesarios para la nueva secuencia */}
      {/* ESQUINA SUPERIOR IZQUIERDA ELIMINADA - libre para el selector de idioma */}
      
      {/* Esquina superior derecha - para los 2 primeros toques */}
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
      
      {/* Esquina inferior derecha - para el toque final */}
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

      {/* Admin Panel Modal */}
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
