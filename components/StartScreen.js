import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import StandardFooter from './shared/StandardFooter';

const StartScreen = () => {
  const { beginQuiz, content, language } = useApp();
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
        backgroundImage: `url(${startContent?.backgroundImage || '/images/Bild_Kutsche.webp'})`,
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
          paddingBottom: 'min(4rem, 8vw)'
        }}
      >
        
        {/* Main Card Container */}
        <div className="w-full bg-transparent flex items-center justify-center" style={{ 
          maxWidth: 'min(120rem, 95vw)',
          minHeight: '0', 
          flex: '1 1 auto' 
        }}>
          <div style={{ padding: '0' }}>
            <div className="flex flex-col items-center" style={{ gap: 'min(4.0rem, 6.4vw)' }}>
              
              {/* Title Section */}
              <div 
                className="flex flex-col items-center" 
                style={{ 
                  gap: 'min(0.0rem, 0vw)' 
                }}
              >
                {/* Main title */}
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={showContent ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="title-main"
                  style={{
                    fontSize: 'min(4.8rem, 9vw, 11vh)', 
                    lineHeight: 'min(5.4rem, 10.8vw, 12.4vh)' 
                  }}
                >
                  {startContent?.title || 'Wie weit? Wie lange?'}
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                  initial={{ y: 50, opacity: 0 }}
                  animate={showContent ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="subtitle-main"
                  style={{
                    fontSize: 'min(2.8rem, 5.6vw, 7vh)',
                    lineHeight: 'min(3.36rem, 6.72vw, 8.4vh)'
                  }}
                >
                  {startContent?.subtitle || 'Distanzen des Reisens im 19. Jahrhundert'}
                </motion.h2>
              </div>

              {/* Description Section */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={showContent ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-body-primary"
                style={{
                  maxWidth: 'min(120rem, 95vw)'
                }}
              >
                <span 
                  className="text-body-bold"
                  style={{
                    fontSize: 'min(1.9rem, 3.8vw, 4.8vh)', 
                    lineHeight: 'min(2.66rem, 5.32vw, 6.7vh)',
                    letterSpacing: 'min(0.019rem, 0.038vw, 0.048vh)'
                  }}
                >
                  {startContent?.highlightText || 'Teste dein Wissen!'}&nbsp;&nbsp;
                  <br />
                </span>

                <span 
                  className="text-body-primary"
                  style={{
                    fontSize: 'min(1.6rem, 3.4vw, 4.2vh)',
                    lineHeight: 'min(2.38rem, 4.76vw, 5.9vh)',
                    letterSpacing: 'min(0.017rem, 0.034vw, 0.042vh)'
                  }}
                >
                  {startContent?.introText || 'Entdecken Sie die faszinierende Welt historischer Kutschen. Testen Sie Ihr Wissen mit unserem Quiz!'}
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer with language icon and swipe indicator */}
        <StandardFooter>
          {/* Touch indicator – absolutely centered relative to the full screen */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
              y: [0, -15, 0],
              scale: [1, 1.05, 1],
              opacity: showContent ? 1 : 0
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.0
            }}
            onClick={handleSwipeLeft}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            style={{ 
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 'min(5.625rem, 9vh)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 30,
              pointerEvents: 'none'
            }}
          >
            <img
              src="/images/OE_Swipe_128.svg"
              alt="Swipe indicator"
              style={{
                width: 'min(5.8rem, 9.6vw, 12vh)',
                height: 'min(5.8rem, 9.6vw, 12vh)',
                pointerEvents: 'auto',
                cursor: 'pointer'
              }}
            />
          </motion.div>
        </StandardFooter>
      </div>

    </motion.div>
  );
};

export default StartScreen;
