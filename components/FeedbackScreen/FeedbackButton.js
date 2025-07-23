import { motion } from 'framer-motion';

const FeedbackButton = ({ 
  buttonText, 
  nextQuestion, 
  buttonContainerStyle, 
  buttonStyle, 
  buttonTextStyle, 
  arrowStyle 
}) => {
  return (
    <div
      style={buttonContainerStyle}
    >
      <motion.button
        onClick={(e) => {
          e.stopPropagation(); // Prevenir propagación del evento
          nextQuestion();
        }}
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
    </div>
  );
};

export default FeedbackButton;
