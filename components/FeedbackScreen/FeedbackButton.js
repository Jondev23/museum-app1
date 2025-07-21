import { motion } from 'framer-motion';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';

const FeedbackButton = ({ 
  buttonText, 
  nextQuestion, 
  buttonContainerStyle, 
  buttonStyle, 
  buttonTextStyle, 
  arrowStyle 
}) => {
  const handleTouchStart = (e) => {
    e.preventDefault();
    console.log('🔘 Feedback button touched!', e.type);
    nextQuestion();
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log('🔘 Feedback button clicked!', e.type);
    nextQuestion();
  };

  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: FEEDBACK_CONFIG.ANIMATION_DURATIONS.BUTTON, 
        delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.BUTTON_DELAY 
      }}
      style={buttonContainerStyle}
    >
      <motion.button
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onPointerDown={handleClick} // Add pointer events too
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center transition-all cursor-pointer"
        style={{
          ...buttonStyle,
          gap: 'min(0.4rem, 1vw)', // 20% smaller gap - applied after buttonStyle
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          position: 'relative',
          zIndex: 90,
          pointerEvents: 'auto',
          // Ensure full button area is clickable
          padding: 'min(12px, 2vh) min(16px, 3vw)',
          minHeight: '60px', // Minimum touch target
          minWidth: '120px' // Minimum touch target
        }}
      >
        <span
          className="text-button"
          style={{
            fontSize: buttonTextStyle.fontSize,
            lineHeight: buttonTextStyle.lineHeight,
            textTransform: buttonTextStyle.textTransform,
            transform: 'scale(0.95)' // 5% smaller text
          }}
        >
          {buttonText}
        </span>
        <motion.img
          src="/images/GUI-2.svg"
          alt="Zur Auswertung"
          style={{
            ...arrowStyle,
            touchAction: 'manipulation',
            pointerEvents: 'none'
          }}
          animate={{ 
            x: [0, 5, 0],
            scale: 0.88825 // 10% larger than previous 0.8075
          }}
          transition={{ 
            duration: FEEDBACK_CONFIG.ANIMATION_DURATIONS.ARROW_ANIMATION, 
            repeat: Infinity, 
            repeatDelay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.ARROW_REPEAT_DELAY 
          }}
        />
      </motion.button>
    </motion.div>
  );
};

export default FeedbackButton;
