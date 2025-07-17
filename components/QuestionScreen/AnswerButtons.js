import { motion } from 'framer-motion';
import { QUESTION_CONFIG } from './QuestionScreenConfig';

const AnswerButtons = ({ 
  question, 
  answersContainerStyle, 
  getButtonStyle, 
  getButtonClassName,
  textStyle,
  handleAnswerClick,
  selectedAnswer 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: QUESTION_CONFIG.ANIMATION_DURATIONS.BUTTONS, 
      delay: QUESTION_CONFIG.ANIMATION_DELAYS.BUTTONS 
    }}
    style={answersContainerStyle}
  >
    {question.answers.map((answer, index) => (
      <motion.button
        key={index}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: QUESTION_CONFIG.ANIMATION_DURATIONS.BUTTON_INDIVIDUAL, 
          delay: QUESTION_CONFIG.ANIMATION_DELAYS.BUTTON_BASE + index * QUESTION_CONFIG.ANIMATION_DELAYS.BUTTON_STAGGER 
        }}
        onClick={() => handleAnswerClick(index, QUESTION_CONFIG.ANSWER_DELAY)}
        disabled={selectedAnswer !== null}
        className={getButtonClassName(index)}
        style={getButtonStyle()}
      >
        <span className="text-answer" style={textStyle}>
          {answer}
        </span>
      </motion.button>
    ))}
  </motion.div>
);

export default AnswerButtons;
