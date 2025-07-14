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
          className="text-center leading-tight"
          style={{
            color: '#61809D',
            fontFamily: '"Tisa Pro", serif',
            fontSize: '96px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '112px'
          }}
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
          {/* Touch icon */}
          <div className="relative z-10 w-18 h-18 flex items-center justify-center">
            <img
              src="/images/OE_Touch_128 2.svg"
              alt="Touch indicator"
              style={{
                width: '64px',
                height: '64px'
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ScreensaverScreen;
