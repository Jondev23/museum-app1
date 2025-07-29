import { motion } from 'framer-motion';
import { SCREENSAVER_CONFIG } from './ScreensaverScreenConfig';
import { processTextWithHTML } from '../../utils/textProcessor';

// Animated title component for screensaver with pulsing effect
const ScreensaverTitle = ({ screensaverContent, defaultContent, titleStyle }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ 
      opacity: 0 // Simple fade out
    }}
    transition={{ 
      duration: 1.8, // Gradual title fade
      ease: "easeOut", // Simple smooth easing
      delay: 0
    }}
    className="flex-1 flex items-center justify-center relative z-20"
    style={{
      willChange: 'opacity' // Only optimize for opacity changes
    }}
  >
    <motion.h1
      animate={{ 
        scale: SCREENSAVER_CONFIG.TITLE_ANIMATION.SCALE,
        opacity: SCREENSAVER_CONFIG.TITLE_ANIMATION.OPACITY
      }}
      exit={{
        opacity: 0 // Simple fade out
      }}
      transition={{ 
        duration: SCREENSAVER_CONFIG.ANIMATION_DURATIONS.TITLE_PULSE,
        repeat: SCREENSAVER_CONFIG.TITLE_ANIMATION.REPEAT,
        ease: SCREENSAVER_CONFIG.TITLE_ANIMATION.EASE
      }}
      className="text-center leading-tight font-tisa-pro"
      style={{
        ...titleStyle,
        willChange: 'opacity' // Only optimize for opacity changes
      }}
    >
      {processTextWithHTML(screensaverContent?.title || defaultContent.title)}
    </motion.h1>
  </motion.div>
);

export default ScreensaverTitle;
