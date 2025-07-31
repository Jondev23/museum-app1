import { processTextWithHTML } from '../../utils/textProcessor';
import { motion, INTERACTIVE_TRANSITIONS } from '../../utils/screenTransitions';

// Continue button component for feedback screen
const FeedbackButton = ({ 
  buttonText, 
  nextQuestion, 
  buttonContainerStyle, 
  buttonStyle, 
  buttonTextStyle, 
  arrowStyle 
}) => {
  return (
    <div style={buttonContainerStyle}>
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          nextQuestion(); // Navigate to next question or results
        }}
        whileTap={INTERACTIVE_TRANSITIONS.feedbackButton.tap}
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
          {processTextWithHTML(buttonText)}
        </span>
        <img
          src="./images/GUI-2.svg"
          alt="Zur Auswertung"
          style={{
            ...arrowStyle,
            touchAction: 'manipulation',
            pointerEvents: 'none',
            transform: 'translateY(-10%)'
          }}
        />
      </motion.button>
    </div>
  );
};

export default FeedbackButton;
