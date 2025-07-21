import { motion } from 'framer-motion';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';

const FeedbackAnswer = ({ question, userAnswer, answerButtonStyle, answerTextStyle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.ANSWER }}
      className="flex justify-center w-full"
    >
      <div
        className="inline-flex items-center justify-center gap-[min(0.5rem,1vw)] relative"
        style={{
          ...answerButtonStyle,
          backgroundColor: 'var(--color-neutral-light)',
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        <span
          className="relative w-full text-center break-words hyphens-auto max-w-full"
          style={answerTextStyle}
        >
          {question.answers[userAnswer]}
        </span>
      </div>
    </motion.div>
  );
};

export default FeedbackAnswer;
