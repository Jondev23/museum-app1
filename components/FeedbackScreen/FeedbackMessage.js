import { motion } from 'framer-motion';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';
import useResponsiveText from '../../hooks/useResponsiveText';
import { processTextWithHTML } from '../../utils/textProcessor';

// Feedback message component displaying result and explanation
const FeedbackMessage = ({ 
  randomMessage, 
  question, 
  messageContainerStyle, 
  messageStyle, 
  explanationStyle 
}) => {
  // Responsive text sizing for feedback message
  const { ref: messageRef, adjustedStyle: adjustedMessageStyle, isAdjusted: isMessageAdjusted } = useResponsiveText(
    messageStyle,
    randomMessage,
    {
      minScale: 0.6, 
      step: 0.5,    
      delay: 150    
    }
  );

  // Responsive text sizing for explanation
  const { ref: explanationRef, adjustedStyle: adjustedExplanationStyle, isAdjusted: isExplanationAdjusted } = useResponsiveText(
    explanationStyle,
    question?.explanation,
    {
      minScale: 0.6, 
      step: 0.33,    
      delay: 200    
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: FEEDBACK_CONFIG.ANIMATION_DURATIONS.MESSAGE }}
      style={messageContainerStyle}
    >
      <motion.p
        ref={messageRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: FEEDBACK_CONFIG.ANIMATION_DURATIONS.MESSAGE }}
        style={{
          ...adjustedMessageStyle,
          color: 'var(--color-white)' 
        }}
        title={isMessageAdjusted ? 'Text adjusted automatically' : ''}
      >
        {/* Display feedback message */}
        {processTextWithHTML(randomMessage)}
      </motion.p>

      {/* Show explanation if available */}
      {question?.explanation && (
        <motion.p
          ref={explanationRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: FEEDBACK_CONFIG.ANIMATION_DURATIONS.MESSAGE }}
          style={{
            ...adjustedExplanationStyle,
            color: 'var(--color-white)' 
          }}
          title={isExplanationAdjusted ? 'Text adjusted automatically' : ''}
        >
          {processTextWithHTML(question.explanation)}
        </motion.p>
      )}
    </motion.div>
  );
};

export default FeedbackMessage;
