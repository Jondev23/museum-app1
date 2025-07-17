import { motion } from 'framer-motion';
import { START_SCREEN_CONFIG } from './StartScreenConfig';

const StartScreenTouchIndicator = ({ 
  showContent, 
  handleSwipeLeft, 
  touchIndicatorContainerStyle,
  touchIndicatorStyle 
}) => (
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ 
      y: START_SCREEN_CONFIG.TOUCH_INDICATOR.Y_MOVEMENT,
      scale: START_SCREEN_CONFIG.TOUCH_INDICATOR.SCALE_MOVEMENT,
      opacity: showContent ? 1 : 0
    }}
    transition={{ 
      duration: START_SCREEN_CONFIG.ANIMATION_DURATIONS.TOUCH_INDICATOR,
      repeat: START_SCREEN_CONFIG.TOUCH_INDICATOR.REPEAT,
      ease: START_SCREEN_CONFIG.TOUCH_INDICATOR.ANIMATION_TYPE,
      delay: START_SCREEN_CONFIG.ANIMATION_DELAYS.TOUCH_INDICATOR
    }}
    onClick={handleSwipeLeft}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="cursor-pointer"
    style={touchIndicatorContainerStyle}
  >
    <img
      src="/images/OE_Swipe_128.svg"
      alt="Swipe indicator"
      style={touchIndicatorStyle}
    />
  </motion.div>
);

export default StartScreenTouchIndicator;
