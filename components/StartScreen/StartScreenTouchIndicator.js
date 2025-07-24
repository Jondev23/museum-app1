// Touch indicator component with swipe animation for start screen
const StartScreenTouchIndicator = ({ 
  showContent, 
  handleSwipeLeft, 
  touchIndicatorContainerStyle,
  touchIndicatorStyle 
}) => {
  // Animation styles with fade-swipe effect
  const animationStyles = {
    ...touchIndicatorStyle,
    animation: 'fade-swipe 4.5s ease-in-out infinite',
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
      {/* Swipe indicator icon with animation */}
      <img
        src="/images/OE_Swipe_128.svg"
        alt="Swipe indicator"
        style={animationStyles}
      />
      
      {/* CSS animation keyframes */}
      <style jsx>{`
        @keyframes fade-swipe {
          0% { 
            transform: translateX(56px);
            opacity: 0;
          }
          22% { 
            transform: translateX(0px);
            opacity: 1;
          }
          33% { 
            transform: translateX(0px);
            opacity: 1;
          }
          78% { 
            transform: translateX(0px);
            opacity: 1;
          }
          100% { 
            transform: translateX(-56px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default StartScreenTouchIndicator;
