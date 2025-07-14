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
      className="fixed inset-0 bg-gradient-to-br from-museum-cream to-museum-gold overflow-hidden"
      onTouchStart={handleTouchStart}
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ 
          backgroundImage: `url(${startContent.backgroundImage})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8">
        
        {/* Main content */}
        <div className="text-center max-w-4xl">
          <motion.h1
            initial={{ x: '100%', opacity: 0 }}
            animate={showContent ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-8xl font-bold text-museum-brown mb-4 font-serif"
          >
            {startContent.title}
          </motion.h1>

          <motion.h2
            initial={{ x: '100%', opacity: 0 }}
            animate={showContent ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl text-museum-brown mb-6 font-serif opacity-80"
          >
            {startContent.subtitle}
          </motion.h2>

          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={showContent ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-museum-brown text-white px-6 py-3 rounded-full text-xl font-semibold mb-8 inline-block"
          >
            {startContent.highlightText}
          </motion.div>

          <motion.p
            initial={{ x: '100%', opacity: 0 }}
            animate={showContent ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-2xl text-museum-brown mb-16 leading-relaxed"
          >
            {startContent.introText}
          </motion.p>
        </div>

        {/* Swipe indicator */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            onClick={handleSwipeLeft}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-4 bg-white bg-opacity-90 px-8 py-4 rounded-full shadow-lg cursor-pointer"
          >
            <motion.div
              animate={{ x: [-10, 0, -10] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-4xl"
            >
              👋
            </motion.div>
            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-4xl"
            >
              ←
            </motion.div>
            <span className="text-xl font-semibold text-museum-brown">
              {startContent.swipeText}
            </span>
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
          whileHover={{ scale: 1.1, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
          whileTap={{ scale: 0.95 }}
          className="bg-white bg-opacity-95 p-5 rounded-full shadow-2xl hover:bg-opacity-100 transition-all cursor-pointer border-2 border-museum-brown border-opacity-20 relative"
        >
          <motion.span 
            className="text-4xl block"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🌐
          </motion.span>
          
          {/* Pulse indicator */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-museum-brown opacity-30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
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
