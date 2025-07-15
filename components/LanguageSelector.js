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
    console.log('Changing language from', language, 'to', newLanguage);
    changeLanguage(newLanguage);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowLanguageSelector(false);
    }
  };

  // Get language selector content based on current language or fallback
  const getSelectorContent = () => {
    if (content[language]?.languageSelector) {
      return content[language].languageSelector;
    }
    // Fallback to German if current language selector is not available
    return content.de?.languageSelector || {
      title: "Sprache wählen / Choose language",
      german: "DEUTSCH",
      english: "ENGLISH"
    };
  };

  const selectorContent = getSelectorContent();

  return (
    <AnimatePresence>
      {showLanguageSelector && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: '#344243' }} // Fondo color Schiefer
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
            style={{ width: 'auto', maxWidth: '850px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Globe icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-8"
            >
              <img 
                src="/images/OE_Sprache_64 1.svg" 
                alt="Language selector" 
                className="w-16 h-16 mx-auto"
              />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-12"
              style={{
                color: '#D9D9D9',
                fontFamily: '"Tisa Sans Pro", sans-serif',
                fontSize: '32px',
                fontWeight: 400,
                textAlign: 'center',
                textTransform: 'uppercase'
              }}
            >
              CHOOSE LANGUAGE
              <br />
              Sprache wählen
            </motion.h2>

            {/* Language buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="space-y-6"
            >
              <motion.button
                onClick={() => handleLanguageChange('de')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="transition-all"
                style={{
                  width: '750px', // aumentado de 567px a 800px (aproximadamente 21 cm)
                  background: '#A94930', // Kupfer
                  border: '2px solid #A94930',
                  borderRadius: '60px',
                  color: '#D9D9D9',
                  textAlign: 'center',
                  fontFamily: '"Tisa Sans Pro", sans-serif',
                  fontSize: '21px', // aumentado de 20px a 21px
                  fontWeight: 300, // reducido de 400 a 300 para hacer el texto más delgado
                  fontStyle: 'normal',
                  lineHeight: '50px', // reducido de 88px a 50px para hacer el botón más bajo
                  textTransform: 'uppercase',
                  padding: '0'
                }}
              >
                {selectorContent.german}
              </motion.button>

              <motion.button
                onClick={() => handleLanguageChange('en')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="transition-all"
                style={{
                  width: '750px', // aumentado de 567px a 800px (aproximadamente 21 cm)
                  background: '#344243', // Schiefer (mismo color que el fondo)
                  border: '2px solid #D9D9D9',
                  borderRadius: '60px',
                  color: '#D9D9D9',
                  textAlign: 'center',
                  fontFamily: '"Tisa Sans Pro", sans-serif',
                  fontSize: '21px', // aumentado de 20px a 21px
                  fontWeight: 300, // reducido de 400 a 300 para hacer el texto más delgado
                  fontStyle: 'normal',
                  lineHeight: '50px', // reducido de 88px a 50px para hacer el botón más bajo
                  textTransform: 'uppercase',
                  padding: '0'
                }}
              >
                {selectorContent.english}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageSelector;
