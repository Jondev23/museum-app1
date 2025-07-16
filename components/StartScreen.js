import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const StartScreen = () => {
  const { beginQuiz, content, language, setShowLanguageSelector } = useApp();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger content animation after component mounts
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSwipeLeft = () => {
    beginQuiz();
  };

  const handleTouchStart = (e) => {
    const startX = e.touches[0].clientX;
    
    const handleTouchMove = (e) => {
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
      
      if (diffX > 100) { // Swipe left detected
        handleSwipeLeft();
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  if (!content?.[language]) return null;

  const startContent = content[language].startScreen;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 overflow-hidden"
      onTouchStart={handleTouchStart}
      style={{
        backgroundImage: 'url(/images/Bild_Kutsche.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Black overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Content - basado en referencia Figma con REM responsivo */}
      <div 
        className="relative z-10 h-full flex flex-col items-center w-full" 
        style={{ 
          paddingTop: 'min(2rem, 4vw)',
          paddingLeft: 'min(2rem, 4vw)',
          paddingRight: 'min(2rem, 4vw)',
          paddingBottom: 'min(4rem, 8vw)' // Padding bottom fijo para tablet landscape
        }}
      >
        
        {/* Main Card Container */}
        <div className="w-full bg-transparent flex items-center justify-center" style={{ 
          maxWidth: 'min(120rem, 95vw)',
          minHeight: '0', // Permitir que se contraiga
          flex: '1 1 auto' // Flexible pero no ocupa todo el espacio
        }}>
          <div style={{ padding: '0' }}>
            <div className="flex flex-col items-center" style={{ gap: 'min(4.0rem, 6.4vw)' }}>
              
              {/* Title Section */}
              <div 
                className="flex flex-col items-center" 
                style={{ 
                  gap: 'min(0.0rem, 0vw)' // Reducido de 0.8rem a 0.5rem para aún menos espacio entre título y subtítulo
                }}
              >
                {/* Main title */}
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={showContent ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{
                    color: '#D9D9D9', // var(--Neutral_Light, #D9D9D9)
                    textAlign: 'center',
                    fontFamily: '"Tisa Pro", "Times New Roman", serif', // Head & Auswertung
                    fontSize: 'min(4.8rem, 9vw)', // Reducido de 6rem a 4.5rem
                    fontStyle: 'italic',
                    fontWeight: 700, // Corregido a 700 según especificación
                    lineHeight: 'min(5.4rem, 10.8vw)' // 120% = 5.4rem responsive (reducido proporcionalmente)
                  }}
                >
                  Wie weit? Wie lange?
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                  initial={{ y: 50, opacity: 0 }}
                  animate={showContent ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{
                    color: '#85AF8B', // var(--Blassgruen, #85AF8B)
                    textAlign: 'center',
                    fontFamily: '"Tisa Sans Pro", "Arial", sans-serif', // Subline
                    fontSize: 'min(2.8rem, 5.6vw)', // Reducido de 3.2rem a 2.8rem
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 'min(3.36rem, 6.72vw)' // 120% = 3.36rem responsive
                  }}
                >
                  Distanzen des Reisens im 19. Jahrhundert
                </motion.h2>
              </div>

              {/* Description Section */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={showContent ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{
                  color: '#D9D9D9', // var(--Neutral_Light, #D9D9D9)
                  textAlign: 'center',
                  fontFamily: '"Tisa Pro", "Times New Roman", serif', // Antwort_Fließ_Bold
                  maxWidth: 'min(120rem, 95vw)' // 1920px base
                }}
              >
                <span style={{
                  fontSize: 'min(1.9rem, 3.8vw)', // Reducido de 2.2rem a 1.9rem
                  fontWeight: 700, // Más pesado
                  fontFamily: '"Tisa Pro", "Times New Roman", serif',
                  lineHeight: 'min(2.66rem, 5.32vw)', // 140% = 2.66rem
                  letterSpacing: 'min(0.019rem, 0.038vw)'
                }}>
                  Teste dein Wissen!&nbsp;&nbsp;
                  <br />
                </span>

                <span style={{
                  fontSize: 'min(1.6rem, 3.4vw)', // Reducido de 1.8rem a 1.7rem (6.25% aumento desde 1.6rem)
                  fontWeight: 400, // Más ligero
                  fontFamily: '"Tisa Pro", "Times New Roman", serif',
                  lineHeight: 'min(2.38rem, 4.76vw)', // 140% = 2.38rem
                  letterSpacing: 'min(0.017rem, 0.034vw)'
                }}>
                  Fünf Fragen rund um das Reisen mit der Kutsche warten auf dich.
                  <br />
                  Wie weit kam man an einem Tag? Wie lange dauerte eine Reise von
                  Leipzig nach München?
                  <br /> <br />
                  Stell dich der Herausforderung – vielleicht weißt du mehr, als
                  du denkst.
                  <br />
                  Und falls nicht: unterwegs lernst du garantiert etwas dazu!{" "}
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer con ambas imágenes - posicionado naturalmente */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex justify-between items-center w-full"
          style={{
            marginTop: 'min(3rem, 6vw)' // Solo margen superior, el padding bottom del contenedor padre da el espacio inferior
          }}
        >
          {/* Language selector icon - izquierda */}
          <motion.button
            onClick={() => {
              console.log('Globe icon clicked, opening language selector');
              setShowLanguageSelector(true);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="transition-all cursor-pointer"
          >
            <motion.img
              src="/images/OE_Sprache_64 1.svg"
              alt="Language selector"
              style={{
                width: 'min(3rem, 6vw)', // Responsive width
                height: 'min(3rem, 6vw)', // Responsive height
                display: 'block'
              }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </motion.button>

          {/* Touch indicator - centro */}
          <motion.div
            onClick={handleSwipeLeft}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            animate={{ 
              y: [0, -15, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src="/images/OE_Swipe_128.svg"
              alt="Swipe indicator"
              style={{
                width: 'min(4rem, 8vw)', // Responsive width
                height: 'min(4rem, 8vw)' // Responsive height
              }}
            />
          </motion.div>

          {/* Espacio vacío para equilibrar - derecha */}
          <div style={{ width: 'min(3rem, 6vw)', height: 'min(3rem, 6vw)' }} />
        </motion.div>
      </div>

    </motion.div>
  );
};

export default StartScreen;
