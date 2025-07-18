import { motion } from 'framer-motion';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';

const FeedbackMessage = ({ 
  randomMessage, 
  question, 
  messageContainerStyle, 
  messageStyle, 
  explanationStyle 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.MESSAGE }}
      style={messageContainerStyle}
    >
      {/* Mensaje principal (¡Correcto! / ¡Incorrecto!) */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.MESSAGE + 0.1 }}
        className="feedback-message"
        style={{
          maxWidth: messageStyle.maxWidth,
          overflowWrap: messageStyle.overflowWrap,
          margin: messageStyle.margin,
          wordBreak: messageStyle.wordBreak,
          hyphens: messageStyle.hyphens,
          textAlign: messageStyle.textAlign
        }}
      >
        {randomMessage}
      </motion.p>

      {/* Explicación adicional */}
      {question?.explanation && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.MESSAGE + 0.2 }}
          className="feedback-explanation"
          style={{
            maxWidth: explanationStyle.maxWidth,
            overflowWrap: explanationStyle.overflowWrap,
            margin: explanationStyle.margin,
            wordBreak: explanationStyle.wordBreak,
            hyphens: explanationStyle.hyphens,
            textAlign: explanationStyle.textAlign
          }}
        >
          {question.explanation}
        </motion.p>
      )}
    </motion.div>
  );
};

export default FeedbackMessage;
