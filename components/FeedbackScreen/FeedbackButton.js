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
        onClick={nextQuestion}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 transition-all cursor-pointer"
        style={buttonStyle}
      >
        <span
          className="text-button"
          style={{
            textTransform: buttonTextStyle.textTransform
          }}
        >
          {buttonText}
        </span>
        <motion.img
          src="/images/GUI-2.svg"
          alt="Zur Auswertung"
          style={arrowStyle}
          animate={{ x: [0, 5, 0] }}
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
