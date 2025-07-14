import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

const ScreensaverScreen = () => {
  const { startQuiz, content, language } = useApp();

  const handleTouch = () => {
    startQuiz();
  };

  // Show loading state if content is not yet loaded
  if (!content) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-museum-brown to-black flex flex-col items-center justify-center">
        <div className="text-white text-4xl mb-4">🏛️</div>
        <div className="text-white text-xl">Lade Inhalte...</div>
      </div>
    );
  }

  if (!content[language]) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-museum-brown to-black flex flex-col items-center justify-center">
        <div className="text-white text-4xl mb-4">⚠️</div>
        <div className="text-white text-xl">Sprache nicht verfügbar</div>
      </div>
    );
  }

  const screensaverContent = content[language].screensaver;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-museum-brown to-black flex flex-col items-center justify-center cursor-pointer"
      onClick={handleTouch}
      onTouchStart={handleTouch}
    >
      {/* Background video placeholder */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Animated hand icon */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-8xl mb-8 z-10"
      >
        {screensaverContent.handIcon}
      </motion.div>

      {/* Message */}
      <motion.p
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-white text-2xl text-center z-10 max-w-md"
      >
        {screensaverContent.message}
      </motion.p>

      {/* Ambient particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-museum-gold rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ScreensaverScreen;
