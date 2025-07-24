import { motion } from 'framer-motion';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';

// Display component for showing the user's selected answer in feedback screen
const FeedbackAnswer = ({ question, userAnswer, answerButtonStyle, answerTextStyle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.4 }}
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
            color: answerTextStyle.color,
            overflowWrap: answerTextStyle.overflowWrap,
            wordBreak: answerTextStyle.wordBreak,
            hyphens: answerTextStyle.hyphens,
            whiteSpace: answerTextStyle.whiteSpace,
            transform: answerTextStyle.transform
          }}
        >
          {/* Display the selected answer text */}
          {question.answers[userAnswer]}
        </span>
      </div>
    </motion.div>
  );
};

export default FeedbackAnswer;
