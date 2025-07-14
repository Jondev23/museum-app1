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
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8">
        
        {/* Main content */}
        <div className="text-center max-w-6xl">
          {/* Main title */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={showContent ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-start-title"
            style={{
              color: '#D9D9D9',
              fontFamily: '"Tisa Pro", "Times New Roman", serif',
              fontSize: '96px',
              fontStyle: 'italic',
              fontWeight: 700,
              lineHeight: '115.2px',
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
            className="mb-12 text-start-subtitle"
            style={{
              color: '#85AF8B',
              fontFamily: '"Tisa Sans Pro", "Arial", sans-serif',
              fontSize: '64px',
              fontWeight: 400,
              lineHeight: '76.8px',
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
            className="mb-16 text-start-body"
            style={{
              color: '#D9D9D9',
              fontFamily: '"Tisa Pro", "Times New Roman", serif',
              fontSize: '36px',
              fontWeight: 700,
              lineHeight: '50.4px',
              letterSpacing: '0.36px',
              textAlign: 'center'
            }}
          >
            <p className="mb-6">
              Teste dein Wissen!<br />
              Fünf Fragen rund um das Reisen mit der Kutsche warten auf dich.<br />
              Wie weit kam man an einem Tag? Wie lange dauerte eine Reise von Leipzig nach München?
            </p>
            <p>
              Stell dich der Herausforderung – vielleicht weißt du mehr, als du denkst.<br />
              Und falls nicht: unterwegs lernst du garantiert etwas dazu!
            </p>
          </motion.div>
        </div>

        {/* Touch indicator with bouncing animation */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="absolute bottom-8 cursor-pointer"
          style={{
            left: 'calc(50% - 30px)'
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
                width: '64px',
                height: '64px'
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Language selector icon */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={showContent ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-8 z-50"
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
            className="w-10 h-10 block"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.button>
        
        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-museum-brown text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap"
        >
          Sprache / Language
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-museum-brown" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default StartScreen;
