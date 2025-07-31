// Touch indicator component with swipe animation for start screen
import { UI_TRANSITIONS, CSS_ANIMATIONS } from '../../utils/screenTransitions';

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
    <div
      onClick={handleSwipeLeft}
      onMouseEnter={(e) => e.target.style.transform = `scale(${UI_TRANSITIONS.touchIndicator.hover.scale})`}
      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      onMouseDown={(e) => e.target.style.transform = `scale(${UI_TRANSITIONS.touchIndicator.tap.scale})`}
      onMouseUp={(e) => e.target.style.transform = `scale(${UI_TRANSITIONS.touchIndicator.hover.scale})`}
      style={touchIndicatorContainerStyle}
    >
      {/* Swipe indicator icon with centralized animation */}
      <img
        src="./images/OE_Swipe_128.svg"
        alt="Swipe indicator"
        style={animationStyles}
      />
      
      {/* CSS animation keyframes from centralized system */}
      <style jsx>{`${CSS_ANIMATIONS.fadeSwipe}`}</style>
    </div>
  );
};

export default StartScreenTouchIndicator;
