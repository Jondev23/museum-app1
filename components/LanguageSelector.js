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
            style={{ width: 'auto', maxWidth: '100vw', padding: '0 min(2rem, 4vw)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Globe icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{ marginBottom: '3.75rem' }}
            >
              <img 
                src="/images/OE_Sprache_64 1.svg" 
                alt="Language selector" 
                style={{
                  width: '6rem',
                  height: '6rem',
                  margin: '0 auto',
                  display: 'block'
                }}
              />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              style={{
                marginBottom: '3rem',
                color: '#D9D9D9',
                fontFamily: "Tisa Pro",
                fontSize: 'min(3.375rem, 8vw)',
                fontWeight: 750,
                fontStyle: 'italic',
                textAlign: 'center',
                lineHeight: '130%'
              }}
            >
              <span style={{ 
                width: 'min(26.75rem, 80vw)', 
                height: 'min(4.375rem, 10vw)',
                display: 'block',
                margin: '0 auto'
              }}>
                Change language
              </span>
              <span style={{ 
                opacity: 0.6,
                width: 'min(24.9375rem, 75vw)',
                height: 'min(4.375rem, 10vw)',
                display: 'block',
                margin: '0 auto'
              }}>
                Sprache wählen
              </span>
            </motion.h2>

            {/* Language buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'min(1rem, 2vw)'
              }}
            >
              <motion.button
                onClick={() => handleLanguageChange('de')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="transition-all"
                style={{
                  display: 'flex',
                  width: 'min(62.5rem, 90vw)',
                  height: 'min(5rem, 12vw)',
                  padding: 'min(0.4375rem, 1vw) min(5rem, 10vw)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 'min(0.625rem, 1.5vw)',
                  borderRadius: 'min(3.75rem, 8vw)',
                  border: '2px solid #A94930',
                  background: '#A94930',
                  color: '#D9D9D9',
                  textAlign: 'center',
                  fontFamily: '"Tisa Sans Pro", sans-serif',
                  fontSize: 'min(2rem, 4vw)',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  lineHeight: 'min(5.5rem, 12vw)', /* 275% */
                  textTransform: 'uppercase',
                  margin: '0 auto'
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
                  display: 'flex',
                  width: 'min(62.5rem, 90vw)',
                  height: 'min(5rem, 12vw)',
                  padding: 'min(0.4375rem, 1vw) min(5rem, 10vw)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 'min(0.625rem, 1.5vw)',
                  borderRadius: 'min(3.75rem, 8vw)',
                  border: '2px solid #D9D9D9',
                  background: '#344243', // Schiefer (mismo color que el fondo)
                  color: '#D9D9D9',
                  textAlign: 'center',
                  fontFamily: '"Tisa Sans Pro", sans-serif',
                  fontSize: 'min(2rem, 4vw)',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  lineHeight: 'min(5.5rem, 12vw)', /* 275% */
                  textTransform: 'uppercase',
                  margin: '0 auto'
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
