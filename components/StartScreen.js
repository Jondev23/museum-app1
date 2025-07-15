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

      {/* Content - totalmente responsivo */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center" style={{ padding: 'min(2rem, 4vw)' }}>
        
        {/* Main content */}
        <div className="text-center" style={{ maxWidth: 'min(96rem, 90vw)' }}>
          {/* Main title */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={showContent ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              marginBottom: 'min(2rem, 4vw)', // Responsive margin
              color: '#D9D9D9',
              fontFamily: '"Tisa Pro", "Times New Roman", serif',
              fontSize: 'min(6rem, 12vw)', // Responsive font size
              fontStyle: 'italic',
              fontWeight: 700,
              lineHeight: 'min(7.2rem, 14.4vw)', // Responsive line height
              textAlign: 'center'
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
              marginBottom: 'min(3rem, 6vw)', // Responsive margin
              color: '#85AF8B',
              fontFamily: '"Tisa Sans Pro", "Arial", sans-serif',
              fontSize: 'min(4rem, 8vw)', // Responsive font size
              fontWeight: 400,
              lineHeight: 'min(4.8rem, 9.6vw)', // Responsive line height
              textAlign: 'center'
            }}
          >
            Distanzen des Reisens im 19. Jahrhundert
          </motion.h2>

          {/* Introductory paragraphs */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={showContent ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              marginBottom: 'min(4rem, 8vw)', // Responsive margin
              color: '#D9D9D9',
              fontFamily: '"Tisa Pro", "Times New Roman", serif',
              fontSize: 'min(2.25rem, 4.5vw)', // Responsive font size
              fontWeight: 700,
              lineHeight: 'min(3.15rem, 6.3vw)', // Responsive line height
              letterSpacing: 'min(0.0225rem, 0.045vw)', // Responsive letter spacing
              textAlign: 'center'
            }}
          >
            <p style={{ marginBottom: 'min(1.5rem, 3vw)' }}>
              Teste dein Wissen!<br />
              Fünf Fragen rund um das Reisen mit der Kutsche warten auf dich.<br />
              Wie weit kam man an einem Tag? Wie lange dauerte eine Reise von Leipzig nach München?
            </p>
            <p style={{ margin: '0' }}>
              Stell dich der Herausforderung – vielleicht weißt du mehr, als du denkst.<br />
              Und falls nicht: unterwegs lernst du garantiert etwas dazu!
            </p>
          </motion.div>
        </div>

        {/* Touch indicator with bouncing animation - responsivo */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="absolute cursor-pointer"
          style={{
            bottom: 'min(1.25rem, 2.5vw)', // Responsive bottom position
            left: 'calc(50% - min(2rem, 4vw))' // Responsive centering
          }}
        >
          <motion.div
            onClick={handleSwipeLeft}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
        </motion.div>
      </div>

      {/* Language selector icon - responsivo */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={showContent ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute z-50"
        style={{
          bottom: 'min(2rem, 4vw)', // Responsive bottom position
          left: 'min(2rem, 4vw)' // Responsive left position
        }}
      >
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
      </motion.div>
    </motion.div>
  );
};

export default StartScreen;
