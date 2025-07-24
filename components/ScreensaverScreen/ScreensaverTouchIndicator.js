import { motion } from 'framer-motion';
import { SCREENSAVER_CONFIG } from './ScreensaverScreenConfig';

const ScreensaverTouchIndicator = ({ 
  touchIndicatorContainerStyle,
  touchIconBackgroundStyle,
  touchIconStyle,
  touchIconTextStyle 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: SCREENSAVER_CONFIG.ANIMATION_DURATIONS.SCREEN_TRANSITION, 
      delay: SCREENSAVER_CONFIG.ANIMATION_DELAYS.TOUCH_INDICATOR 
    }}
    style={touchIndicatorContainerStyle}
    className="relative z-20"
  >
    <motion.div
      animate={{ 
        y: SCREENSAVER_CONFIG.TOUCH_ANIMATION.Y_MOVEMENT,
        scale: SCREENSAVER_CONFIG.TOUCH_ANIMATION.SCALE_MOVEMENT
      }}
      transition={{ 
        duration: SCREENSAVER_CONFIG.ANIMATION_DURATIONS.TOUCH_BOUNCE,
        repeat: SCREENSAVER_CONFIG.TOUCH_ANIMATION.REPEAT,
        ease: SCREENSAVER_CONFIG.TOUCH_ANIMATION.EASE,
        delay: SCREENSAVER_CONFIG.ANIMATION_DELAYS.TOUCH_ANIMATION
      }}
      className="relative"
    >
      <div 
        className={`relative z-10 flex items-center justify-center rounded-full ${SCREENSAVER_CONFIG.COLORS.TOUCH_BACKGROUND} backdrop-blur-sm border ${SCREENSAVER_CONFIG.COLORS.TOUCH_BORDER}`}
        style={touchIconBackgroundStyle}
      >
      </div>
    </motion.div>
  </motion.div>
);

export default ScreensaverTouchIndicator;
