import { motion } from 'framer-motion';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';

const FeedbackMessage = ({ 
  randomMessage, 
  question, 
  messageContainerStyle, 
  messageStyle, 
  explanationStyle 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.MESSAGE }}
    style={messageContainerStyle}
  >
    <p
      className="text-body-bold"
      style={messageStyle}
    >
      {randomMessage}
    </p>
    {question.explanation && (
      <p
        className="text-body-primary"
        style={explanationStyle}
      >
        {question.explanation}
      </p>
    )}
  </motion.div>
);

export default FeedbackMessage;
