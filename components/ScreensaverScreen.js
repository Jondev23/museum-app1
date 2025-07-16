import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

const ScreensaverScreen = () => {
  const { startQuiz, content, language } = useApp();

  const handleTouch = () => {
    console.log('Screensaver touched, transitioning to start screen');
    startQuiz();
  };

  // Show loading state if content is not yet loaded
  if (!content?.[language]) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black flex flex-col items-center justify-center cursor-pointer"
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
            fontSize: 'min(6rem, 12vw)',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'min(7rem, 14vw)'
          }}
        >
          Loading...
        </motion.h1>
      </motion.div>
    );
  }

  const screensaverContent = content[language].screensaver;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center cursor-pointer"
      onClick={handleTouch}
      onTouchStart={handleTouch}
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: 'none' }}
      >
        <source src="/videos/Mi proyecto (7).mp4" type="video/mp4" />
        {/* Fallback to black background if video fails to load */}
      </video>
      
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      {/* Main title - Animation Loop */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex-1 flex items-center justify-center relative z-20"
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
            fontSize: 'min(6rem, 12vw)', // Responsive font size
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'min(7rem, 14vw)' // Responsive line height
          }}
        >
          {screensaverContent?.message || 'Touch the screen to begin'}
        </motion.h1>
      </motion.div>

      {/* Interactive hand icon at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        style={{ marginBottom: 'min(4rem, 8vw)' }} // Responsive margin
        className="relative z-20"
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
          {/* Touch icon with circular background */}
          <div 
            className="relative z-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30" 
            style={{
              width: 'min(6rem, 12vw)', // Responsive width - increased for circular background
              height: 'min(6rem, 12vw)' // Responsive height - increased for circular background
            }}
          >
            {screensaverContent?.handIcon ? (
              screensaverContent.handIcon.includes('.svg') ? (
                <img
                  src={screensaverContent.handIcon}
                  alt="Touch indicator"
                  style={{
                    width: 'min(4rem, 8vw)', // Responsive image width
                    height: 'min(4rem, 8vw)' // Responsive image height
                  }}
                />
              ) : (
                <span style={{
                  fontSize: 'min(3rem, 6vw)',
                  lineHeight: 1
                }}>
                  {screensaverContent.handIcon}
                </span>
              )
            ) : (
              <img
                src="/images/OE_Touch_128 2.svg"
                alt="Touch indicator"
                style={{
                  width: 'min(4rem, 8vw)', // Responsive image width
                  height: 'min(4rem, 8vw)' // Responsive image height
                }}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ScreensaverScreen;
