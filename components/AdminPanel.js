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
  const ADMIN_PASSWORD = 'museum2024';

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
        className="fixed top-0 left-0 z-50 opacity-0"
        style={{
          width: 'min(2rem, 4vw)', 
          height: 'min(2rem, 4vw)' 
        }}
        onClick={() => handleCornerClick('tl')}
      />
      <div 
        className="fixed top-0 right-0 z-50 opacity-0"
        style={{
          width: 'min(2rem, 4vw)', 
          height: 'min(2rem, 4vw)' 
        }}
        onClick={() => handleCornerClick('tr')}
      />
      <div 
        className="fixed bottom-0 right-0 z-50 opacity-0"
        style={{
          width: 'min(2rem, 4vw)', 
          height: 'min(2rem, 4vw)' 
        }}
        onClick={() => handleCornerClick('br')}
      />
      <div 
        className="fixed bottom-0 left-0 z-50 opacity-0"
        style={{
          width: 'min(2rem, 4vw)', 
          height: 'min(2rem, 4vw)'
        }}
        onClick={() => handleCornerClick('bl')}
      />

      {/* Admin Panel */}
      <AnimatePresence>
        {isVisible && !showKioskSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg w-full shadow-2xl"
              style={{
                padding: 'min(2.5rem, 5vw)', 
                borderRadius: 'min(1rem, 2vw)', 
                maxWidth: 'min(24rem, 85vw)', 
                margin: 'min(1rem, 2vw)',
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
                Admin Panel
              </h2>
              {successMsg && (
                <div 
                  className="text-green-600 text-center rounded-lg"
                  style={{
                    marginBottom: 'min(1rem, 2vw)',
                    padding: 'min(0.75rem, 1.5vw)',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)', 
                    fontSize: 'min(0.875rem, 1.75vw)'
                  }}
                >
                  {successMsg}
                </div>
              )}
              {!isAuthenticated ? (
                <form 
                  onSubmit={handlePasswordSubmit} 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 'min(1.5rem, 3vw)'
                  }}
                >
                  <div>
                    <label 
                      className="block font-medium text-gray-600"
                      style={{
                        fontSize: 'min(0.875rem, 1.75vw)',
                        marginBottom: 'min(0.75rem, 1.5vw)',
                        fontWeight: '500'
                      }}
                    >
                      Passwort
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      style={{
                        padding: 'min(0.875rem, 1.75vw) min(1rem, 2vw)',
                        borderRadius: 'min(0.5rem, 1vw)',
                        fontSize: 'min(1rem, 2vw)',
                        backgroundColor: '#f8f9fa' 
                      }}
                      autoFocus
                    />
                  </div>
                  <div 
                    className="flex"
                    style={{ gap: 'min(0.75rem, 1.5vw)' }}
                  >
                    <button
                      type="submit"
                      className="flex-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium"
                      style={{
                        padding: 'min(0.875rem, 1.75vw) min(1.25rem, 2.5vw)',
                        borderRadius: 'min(0.5rem, 1vw)',
                        fontSize: 'min(1rem, 2vw)',
                        fontWeight: '500'
                      }}
                    >
                      Anmelden
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
                      style={{
                        padding: 'min(0.875rem, 1.75vw) min(1.25rem, 2.5vw)',
                        borderRadius: 'min(0.5rem, 1vw)',
                        fontSize: 'min(1rem, 2vw)',
                        fontWeight: '500'
                      }}
                    >
                      Abbrechen
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 'min(1rem, 2vw)' 
                }}>
                  {/* Hauptbuttons */}
                  <button
                    onClick={() => setShowKioskSelector(true)}
                    className="w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium"
                    style={{
                      padding: 'min(0.875rem, 1.75vw) min(1.25rem, 2.5vw)',
                      borderRadius: 'min(0.5rem, 1vw)',
                      fontSize: 'min(1rem, 2vw)',
                      fontWeight: '500'
                    }}
                  >
                    Kiosk auswählen
                  </button>
                  
                  <button
                    onClick={handleClose}
                    className="w-full bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
                    style={{
                      padding: 'min(0.875rem, 1.75vw) min(1.25rem, 2.5vw)',
                      borderRadius: 'min(0.5rem, 1vw)',
                      fontSize: 'min(1rem, 2vw)',
                      fontWeight: '500',
                      marginBottom: 'min(1.5rem, 3vw)'
                    }}
                  >
                    Panel schließen
                  </button>

                  {/* Visueller Trenner im Apple-Stil */}
                  <div 
                    style={{
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, #e5e7eb, transparent)',
                      margin: 'min(0.5rem, 1vw) 0'
                    }}
                  />
                  
                  {/* Separater Exit-Button */}
                  <button
                    onClick={handleExitKiosk}
                    className="w-full bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all font-medium"
                    style={{
                      padding: 'min(0.875rem, 1.75vw) min(1.25rem, 2.5vw)',
                      borderRadius: 'min(0.5rem, 1vw)',
                      fontSize: 'min(1rem, 2vw)',
                      fontWeight: '500'
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
