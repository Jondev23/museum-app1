import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

const ScreensaverScreen = () => {
  const { startQuiz, content, language } = useApp();

  const handleTouch = () => {
    console.log('Screensaver touched, transitioning to start screen');
    startQuiz();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center cursor-pointer"
      onClick={handleTouch}
      onTouchStart={handleTouch}
    >
      {/* Main title - Animation Loop */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex-1 flex items-center justify-center"
      >
        <motion.h1
          animate={{ 
            scale: [1, 1.02, 1],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-white text-8xl md:text-9xl font-serif text-center leading-tight"
        >
          Animation Loop
        </motion.h1>
      </motion.div>

      {/* Interactive hand icon at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="mb-16"
      >
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="relative"
        >
          {/* Circular background for hand icon */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-white rounded-full w-24 h-24 -m-3"
          />
          
          {/* Hand icon */}
          <div className="relative z-10 text-6xl w-18 h-18 flex items-center justify-center">
            👆
          </div>
        </motion.div>
        
        {/* Pulse rings around the icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          {[0, 0.5, 1].map((delay) => (
            <motion.div
              key={delay}
              className="absolute border-2 border-white rounded-full"
              animate={{
                scale: [1, 2.5],
                opacity: [0.6, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: delay,
                ease: "easeOut"
              }}
              style={{
                width: '96px',
                height: '96px'
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ScreensaverScreen;
