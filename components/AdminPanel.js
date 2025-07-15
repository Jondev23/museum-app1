import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [clickSequence, setClickSequence] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Secuencia secreta: click en las 4 esquinas en orden (top-left, top-right, bottom-right, bottom-left)
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

  const handleReloadContent = () => {
    if (window.confirm('Inhalte neu laden?')) {
      window.location.reload();
    }
  };

  return (
    <>
      {/* Invisible corner triggers - responsivos */}
      <div 
        className="fixed top-0 left-0 z-50 opacity-0"
        style={{
          width: 'min(2rem, 4vw)', // Responsive width
          height: 'min(2rem, 4vw)' // Responsive height
        }}
        onClick={() => handleCornerClick('tl')}
      />
      <div 
        className="fixed top-0 right-0 z-50 opacity-0"
        style={{
          width: 'min(2rem, 4vw)', // Responsive width
          height: 'min(2rem, 4vw)' // Responsive height
        }}
        onClick={() => handleCornerClick('tr')}
      />
      <div 
        className="fixed bottom-0 right-0 z-50 opacity-0"
        style={{
          width: 'min(2rem, 4vw)', // Responsive width
          height: 'min(2rem, 4vw)' // Responsive height
        }}
        onClick={() => handleCornerClick('br')}
      />
      <div 
        className="fixed bottom-0 left-0 z-50 opacity-0"
        style={{
          width: 'min(2rem, 4vw)', // Responsive width
          height: 'min(2rem, 4vw)' // Responsive height
        }}
        onClick={() => handleCornerClick('bl')}
      />

      {/* Admin Panel */}
      <AnimatePresence>
        {isVisible && (
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
              className="bg-white rounded-lg w-full"
              style={{
                padding: 'min(2rem, 4vw)', // Responsive padding
                borderRadius: 'min(0.5rem, 1vw)', // Responsive border radius
                maxWidth: 'min(28rem, 90vw)', // Responsive max width
                margin: 'min(1rem, 2vw)' // Responsive margin
              }}
            >
              <h2 
                className="font-bold text-center"
                style={{
                  fontSize: 'min(1.5rem, 3vw)', // Responsive font size
                  marginBottom: 'min(1.5rem, 3vw)' // Responsive margin
                }}
              >
                Admin Panel
              </h2>

              {!isAuthenticated ? (
                <form 
                  onSubmit={handlePasswordSubmit} 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 'min(1rem, 2vw)' 
                  }}
                >
                  <div>
                    <label 
                      className="block font-medium text-gray-700"
                      style={{
                        fontSize: 'min(0.875rem, 1.75vw)', // Responsive font size
                        marginBottom: 'min(0.5rem, 1vw)' // Responsive margin
                      }}
                    >
                      Passwort:
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-museum-brown"
                      style={{
                        padding: 'min(0.5rem, 1vw) min(0.75rem, 1.5vw)', // Responsive padding
                        borderRadius: 'min(0.375rem, 0.75vw)' // Responsive border radius
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
                      className="flex-1 bg-museum-brown text-white rounded-md hover:bg-opacity-90"
                      style={{
                        padding: 'min(0.5rem, 1vw) min(1rem, 2vw)', // Responsive padding
                        borderRadius: 'min(0.375rem, 0.75vw)' // Responsive border radius
                      }}
                    >
                      Anmelden
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                      style={{
                        padding: 'min(0.5rem, 1vw) min(1rem, 2vw)', // Responsive padding
                        borderRadius: 'min(0.375rem, 0.75vw)' // Responsive border radius
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
                  <p 
                    className="text-green-600 font-medium text-center"
                    style={{
                      marginBottom: 'min(1.5rem, 3vw)' // Responsive margin
                    }}
                  >
                    ✓ Erfolgreich angemeldet
                  </p>
                  
                  <button
                    onClick={handleReloadContent}
                    className="w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    style={{
                      padding: 'min(0.75rem, 1.5vw) min(1rem, 2vw)', // Responsive padding
                      borderRadius: 'min(0.375rem, 0.75vw)', // Responsive border radius
                      marginBottom: 'min(0.75rem, 1.5vw)' // Responsive margin
                    }}
                  >
                    Inhalte neu laden
                  </button>
                  
                  <button
                    onClick={handleExitKiosk}
                    className="w-full bg-red-500 text-white rounded-md hover:bg-red-600"
                    style={{
                      padding: 'min(0.75rem, 1.5vw) min(1rem, 2vw)', // Responsive padding
                      borderRadius: 'min(0.375rem, 0.75vw)', // Responsive border radius
                      marginBottom: 'min(0.75rem, 1.5vw)' // Responsive margin
                    }}
                  >
                    Kiosk-Modus beenden
                  </button>
                  
                  <button
                    onClick={handleClose}
                    className="w-full bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    style={{
                      padding: 'min(0.75rem, 1.5vw) min(1rem, 2vw)', // Responsive padding
                      borderRadius: 'min(0.375rem, 0.75vw)' // Responsive border radius
                    }}
                  >
                    Panel schließen
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminPanel;
