import { motion } from 'framer-motion';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';
import { COLORS } from '../../utils/cssVariables';

const FeedbackAnswer = ({ question, userAnswer, answerButtonStyle, answerTextStyle }) => (
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
        backgroundColor: COLORS.FEEDBACK_ANSWER_BG,
      }}
    >
      <span
        className="text-answer"
        style={answerTextStyle}
      >
        {question.answers[userAnswer]}
      </span>
    </div>
  </motion.div>
);

export default FeedbackAnswer;
