import { motion } from 'framer-motion';
import { SCREENSAVER_CONFIG } from './ScreensaverScreenConfig';

const ScreensaverTitle = ({ screensaverContent, defaultContent, titleStyle }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: SCREENSAVER_CONFIG.ANIMATION_DURATIONS.SCREEN_TRANSITION, 
      delay: SCREENSAVER_CONFIG.ANIMATION_DELAYS.TITLE 
    }}
    className="flex-1 flex items-center justify-center relative z-20"
  >
    <motion.h1
      animate={{ 
        scale: SCREENSAVER_CONFIG.TITLE_ANIMATION.SCALE,
        opacity: SCREENSAVER_CONFIG.TITLE_ANIMATION.OPACITY
      }}
      transition={{ 
        duration: SCREENSAVER_CONFIG.ANIMATION_DURATIONS.TITLE_PULSE,
        repeat: SCREENSAVER_CONFIG.TITLE_ANIMATION.REPEAT,
        ease: SCREENSAVER_CONFIG.TITLE_ANIMATION.EASE
      }}
      className="text-center leading-tight font-tisa-pro"
      style={titleStyle}
    >
      
    </motion.h1>
  </motion.div>
);

export default ScreensaverTitle;
