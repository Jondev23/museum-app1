import { motion } from 'framer-motion';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';

const FeedbackTitle = ({ question, titleStyle }) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: FEEDBACK_CONFIG.ANIMATION_DURATIONS.TITLE }}
      className="feedback-title"
      style={{
        width: titleStyle.width,
        height: titleStyle.height,
        maxWidth: titleStyle.maxWidth,
        overflowWrap: titleStyle.overflowWrap,
        overflow: titleStyle.overflow,
        display: titleStyle.display,
        alignItems: titleStyle.alignItems,
        justifyContent: titleStyle.justifyContent,
        textAlign: titleStyle.textAlign,
        wordBreak: titleStyle.wordBreak,
        hyphens: titleStyle.hyphens
      }}
    >
      {question.question}
    </motion.h1>
  );
};

export default FeedbackTitle;
