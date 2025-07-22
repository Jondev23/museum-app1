import { motion } from 'framer-motion';
import { START_SCREEN_CONFIG } from './StartScreenConfig';

const StartScreenTouchIndicator = ({ 
  showContent, 
  handleSwipeLeft, 
  touchIndicatorContainerStyle,
  touchIndicatorStyle 
}) => {
  const animationStyles = {
    ...touchIndicatorStyle,
    animation: 'fade-swipe 2.5s ease-in-out infinite',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, opacity 0.5s ease',
    opacity: showContent ? 1 : 0,
  };

  return (
    <div
      onClick={handleSwipeLeft}
      onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      onMouseDown={(e) => e.target.style.transform = 'scale(0.9)'}
      onMouseUp={(e) => e.target.style.transform = 'scale(1.1)'}
      style={touchIndicatorContainerStyle}
    >
      <img
        src="/images/OE_Swipe_128.svg"
        alt="Swipe indicator"
        style={animationStyles}
      />
      
      <style jsx>{`
        @keyframes fade-swipe {
          0% { 
            transform: translateX(80px);
            opacity: 0;
          }
          50% { 
            transform: translateX(0px);
            opacity: 1;
          }
          100% { 
            transform: translateX(-80px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default StartScreenTouchIndicator;
