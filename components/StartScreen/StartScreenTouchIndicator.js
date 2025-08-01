// Touch indicator component with swipe animation for start screen
import { UI_TRANSITIONS, CSS_ANIMATIONS, motion } from '../../utils/screenTransitions';

const StartScreenTouchIndicator = ({ 
  showContent, 
  handleSwipeLeft, 
  touchIndicatorContainerStyle,
  touchIndicatorStyle 
}) => {
  // Animation styles using centralized configuration
  const animationStyles = {
    ...touchIndicatorStyle,
    ...UI_TRANSITIONS.touchIndicator.css,
    cursor: 'pointer',
    ...UI_TRANSITIONS.contentFade.getOpacity(showContent),
  };

  return (
    <motion.div
      onClick={handleSwipeLeft}
      className="touch-indicator-container"
      style={{
        ...touchIndicatorContainerStyle,
        transition: 'all 0.3s ease-in-out'
      }}
    >
      {/* Swipe indicator icon with centralized animation */}
      <img
        src="./images/OE_Swipe_128.svg"
        alt="Swipe indicator"
        style={animationStyles}
      />
      
      {/* CSS animation keyframes from centralized system */}
      <style jsx>{`${CSS_ANIMATIONS.fadeSwipe}`}</style>
    </motion.div>
  );
};

export default StartScreenTouchIndicator;
