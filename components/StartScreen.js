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
      <motion.button
        initial={{ y: '100%', opacity: 0 }}
        animate={showContent ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={() => setShowLanguageSelector(true)}
        className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 rounded-full shadow-lg hover:bg-opacity-100 transition-all"
      >
        <span className="text-3xl">🌐</span>
      </motion.button>
    </motion.div>
  );
};

export default StartScreen;
