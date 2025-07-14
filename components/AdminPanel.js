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
      {/* Invisible corner triggers */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 z-50 opacity-0"
        onClick={() => handleCornerClick('tl')}
      />
      <div 
        className="fixed top-0 right-0 w-8 h-8 z-50 opacity-0"
        onClick={() => handleCornerClick('tr')}
      />
      <div 
        className="fixed bottom-0 right-0 w-8 h-8 z-50 opacity-0"
        onClick={() => handleCornerClick('br')}
      />
      <div 
        className="fixed bottom-0 left-0 w-8 h-8 z-50 opacity-0"
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
              className="bg-white p-8 rounded-lg max-w-md w-full mx-4"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">
                Admin Panel
              </h2>

              {!isAuthenticated ? (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Passwort:
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-museum-brown"
                      autoFocus
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-museum-brown text-white py-2 px-4 rounded-md hover:bg-opacity-90"
                    >
                      Anmelden
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                    >
                      Abbrechen
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-green-600 font-medium text-center mb-6">
                    ✓ Erfolgreich angemeldet
                  </p>
                  
                  <button
                    onClick={handleReloadContent}
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 mb-3"
                  >
                    Inhalte neu laden
                  </button>
                  
                  <button
                    onClick={handleExitKiosk}
                    className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 mb-3"
                  >
                    Kiosk-Modus beenden
                  </button>
                  
                  <button
                    onClick={handleClose}
                    className="w-full bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400"
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
