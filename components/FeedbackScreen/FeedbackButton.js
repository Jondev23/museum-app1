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
    nextQuestion();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: FEEDBACK_CONFIG.ANIMATION_DURATIONS.BUTTON, 
        delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.BUTTON_DELAY 
      }}
      style={buttonContainerStyle}
    >
      <motion.button
        onClick={nextQuestion}
        onTouchStart={handleTouchStart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center transition-all cursor-pointer"
        style={{
          ...buttonStyle,
          gap: 'calc(var(--feedback-button-gap) * 0.7)',
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        <span
          className="text-button"
          style={{
            fontSize: buttonTextStyle.fontSize,
            lineHeight: buttonTextStyle.lineHeight,
            textTransform: buttonTextStyle.textTransform
          }}
        >
          {buttonText}
        </span>
        <img
          src="/images/GUI-2.svg"
          alt="Zur Auswertung"
          style={{
            ...arrowStyle,
            touchAction: 'manipulation',
            pointerEvents: 'none',
            transform: 'translateY(-10%)'
          }}
        />
      </motion.button>
    </motion.div>
  );
};

export default FeedbackButton;
