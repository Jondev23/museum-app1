import { motion } from 'framer-motion';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';

const FeedbackAnswer = ({ question, userAnswer, answerButtonStyle, answerTextStyle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.ANSWER }}
      className="flex justify-center"
      style={{ width: '100%' }}
    >
      <div
        className={`${FEEDBACK_CONFIG.SIZES.BUTTON_BORDER_RADIUS} flex items-center justify-center`}
        style={{
          ...answerButtonStyle,
          backgroundColor: 'var(--color-neutral-light)',
        }}
      >
        <span
          className="text-answer"
          style={{
            maxWidth: answerTextStyle.maxWidth,
            overflowWrap: answerTextStyle.overflowWrap,
            wordBreak: answerTextStyle.wordBreak,
            hyphens: answerTextStyle.hyphens,
            textAlign: answerTextStyle.textAlign,
            whiteSpace: answerTextStyle.whiteSpace
          }}
        >
          {question.answers[userAnswer]}
        </span>
      </div>
    </motion.div>
  );
};

export default FeedbackAnswer;
