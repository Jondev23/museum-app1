import { motion } from 'framer-motion';
import { SCREENSAVER_CONFIG } from './ScreensaverScreenConfig';

// Loading screen component for screensaver state
const ScreensaverLoading = ({ titleStyle }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={`fixed inset-0 ${SCREENSAVER_CONFIG.COLORS.LOADING_BG} flex flex-col items-center justify-center cursor-pointer`}
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
      {/* Loading text with pulsing animation */}
      Loading...
    </motion.h1>
  </motion.div>
);

export default ScreensaverLoading;
