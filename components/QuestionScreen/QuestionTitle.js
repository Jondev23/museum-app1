import { motion } from 'framer-motion';
import { QUESTION_CONFIG } from './QuestionScreenConfig';

const QuestionTitle = ({ question, titleStyle }) => (
  <motion.h1
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ 
      duration: QUESTION_CONFIG.ANIMATION_DURATIONS.TITLE, 
      delay: QUESTION_CONFIG.ANIMATION_DELAYS.TITLE 
    }}
    className="title-question"
    style={titleStyle}
  >
    {question.question}
  </motion.h1>
);

export default QuestionTitle;
