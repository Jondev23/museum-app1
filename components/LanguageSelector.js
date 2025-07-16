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
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'min(4rem, 7.5vw)', // Aumentado de 3rem a 4rem, de 6vw a 7.5vw para más espacio entre textos y botones
              width: 'auto', 
              maxWidth: '100vw', 
              padding: '0 min(2rem, 4vw)',
              minHeight: '100vh',
              paddingTop: 'min(4rem, 6vw)', // Reducido de 8rem a 4rem, de 12vw a 6vw para menos espacio superior
              paddingBottom: 'min(5rem, 10vw)' // Aumentado de 4rem a 5rem, de 8vw a 10vw para más espacio inferior
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Globe icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img 
                src="/images/OE_Sprache_64 1.svg" 
                alt="Language selector" 
                style={{
                  width: 'min(5.4rem, 13.5vw)', // Reducido 10%: de 6rem a 5.4rem, de 15vw a 13.5vw
                  height: 'min(5.4rem, 13.5vw)', // Reducido 10%: de 6rem a 5.4rem, de 15vw a 13.5vw
                  display: 'block'
                }}
              />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 'min(0.0rem, 0vw)' // Agregado gap reducido entre los títulos
              }}
            >
              <h1 style={{
                color: '#D9D9D9',
                fontFamily: "Tisa Pro",
                fontSize: 'min(2.7rem, 6.4vw)', // Reducido 20%: de 3.375rem a 2.7rem, de 8vw a 6.4vw
                fontWeight: 750,
                fontStyle: 'italic',
                textAlign: 'center',
                lineHeight: '130%',
                margin: 0,
                whiteSpace: 'nowrap'
              }}>
                Change language
              </h1>
              <h2 style={{
                color: '#D9D9D9',
                opacity: 0.6,
                fontFamily: "Tisa Pro",
                fontSize: 'min(2.7rem, 6.4vw)', // Reducido 20%: de 3.375rem a 2.7rem, de 8vw a 6.4vw
                fontWeight: 750,
                fontStyle: 'italic',
                textAlign: 'center',
                lineHeight: '130%',
                margin: 0,
                whiteSpace: 'nowrap'
              }}>
                Sprache wählen
              </h2>
            </motion.div>

            {/* Language buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none'
              }}
            >
              <div style={{
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'min(1.5rem, 3vw)'
              }}>
                <motion.button
                  onClick={() => handleLanguageChange('de')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="transition-all"
                  style={{
                    width: 'min(max(21rem, 53vw), 75rem)', // Aumentado: 24rem min (era 20rem), 60vw (era 50vw), 75rem max (era 62.5rem)
                    height: 'min(3.47rem, 8.31vw)', // Reducido 10%: de 3.85rem a 3.47rem, de 9.23vw a 8.31vw
                    borderRadius: 'min(3.75rem, 8vw)',
                    border: '2px solid #A94930',
                    background: '#A94930', // Siempre Kupfer como en la referencia (selected)
                    padding: 'min(0.625rem, 1.5vw)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{
                    flex: 1,
                    fontFamily: '"Tisa Sans Pro", Helvetica, sans-serif',
                    fontWeight: 400,
                    color: '#D9D9D9',
                    fontSize: 'min(1.25rem, 2.5vw)', // Reducido de 1.4rem a 1.25rem, de 2.8vw a 2.5vw (10.7% menos)
                    textAlign: 'center',
                    lineHeight: 'min(5.5rem, 12vw)',
                    textTransform: 'uppercase'
                  }}>
                    {selectorContent.german}
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => handleLanguageChange('en')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="transition-all"
                  style={{
                    width: 'min(max(21rem, 53vw), 75rem)', // Igualado al primer botón
                    height: 'min(3.47rem, 8.31vw)', // Reducido 10%: de 3.85rem a 3.47rem, de 9.23vw a 8.31vw
                    borderRadius: 'min(3.75rem, 8vw)',
                    border: '2px solid #D9D9D9',
                    background: 'transparent', // Transparente como en la referencia (outline)
                    padding: 'min(0.625rem, 1.5vw)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{
                    flex: 1,
                    fontFamily: '"Tisa Sans Pro", Helvetica, sans-serif',
                    fontWeight: 400,
                    color: '#D9D9D9',
                    fontSize: 'min(1.25rem, 2.5vw)', // Reducido de 1.4rem a 1.25rem, de 2.8vw a 2.5vw (10.7% menos)
                    textAlign: 'center',
                    lineHeight: 'min(5.5rem, 12vw)',
                    textTransform: 'uppercase'
                  }}>
                    {selectorContent.english}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageSelector;
