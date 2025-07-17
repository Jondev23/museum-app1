import { motion } from 'framer-motion';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';

const FeedbackTitle = ({ question, titleStyle }) => (
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.TITLE }}
    className="title-question"
    style={titleStyle}
  >
    {question.question}
  </motion.h1>
);

export default FeedbackTitle;
