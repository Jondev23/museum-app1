import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSelector = () => {
  const { 
    showLanguageSelector, 
    setShowLanguageSelector, 
    changeLanguage, 
    language,
    content 
  } = useApp();

  if (!showLanguageSelector || !content) return null;

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowLanguageSelector(false);
    }
  };

  return (
    <AnimatePresence>
      {showLanguageSelector && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Globe icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-center mb-6"
            >
              <span className="text-6xl">🌐</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-2xl font-bold text-center text-museum-brown mb-8"
            >
              {content.de.languageSelector.title}
            </motion.h2>

            {/* Language buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="space-y-4"
            >
              <motion.button
                onClick={() => handleLanguageChange('de')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full py-4 px-6 rounded-lg text-xl font-semibold transition-all
                  ${language === 'de' 
                    ? 'bg-museum-brown text-white' 
                    : 'bg-gray-100 text-museum-brown hover:bg-gray-200'
                  }
                `}
              >
                🇩🇪 {content.de.languageSelector.german}
              </motion.button>

              <motion.button
                onClick={() => handleLanguageChange('en')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full py-4 px-6 rounded-lg text-xl font-semibold transition-all
                  ${language === 'en' 
                    ? 'bg-museum-brown text-white' 
                    : 'bg-gray-100 text-museum-brown hover:bg-gray-200'
                  }
                `}
              >
                🇬🇧 {content.en.languageSelector.english}
              </motion.button>
            </motion.div>

            {/* Close hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="text-center text-gray-500 text-sm mt-6"
            >
              Tippen Sie außerhalb um zu schließen
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageSelector;
