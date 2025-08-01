// Touch indicator component with swipe animation for start screen
import { useEffect, useState, useRef } from 'react';
import { UI_TRANSITIONS } from '../../utils/screenTransitions';
import { CSS_KEYFRAMES } from '../../utils/animations';

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
      <style jsx>{`${CSS_KEYFRAMES.fadeSwipe}`}</style>
    </div>
  );
};

export default StartScreenTouchIndicator;
