import { motion } from 'framer-motion';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';

const FeedbackAnswer = ({ question, userAnswer, answerButtonStyle, answerTextStyle }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 0.1 }}
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
          className="typography-antworten-buttons relative w-full text-center break-words hyphens-auto max-w-full"
          style={{
            color: answerTextStyle.color
          }}
        >
          {question.answers[userAnswer]}
        </span>
      </div>
    </motion.div>
  );
};

export default FeedbackAnswer;
