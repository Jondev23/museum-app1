import { motion } from 'framer-motion';
import { QUESTION_CONFIG } from './QuestionScreenConfig';

const AnswerButtons = ({ 
  question, 
  handleAnswerClick,
  selectedAnswer,
  getButtonClassName
}) => {
  const handleTouchStart = (e, index) => {
    e.preventDefault();
    if (selectedAnswer === null) {
      handleAnswerClick(index, QUESTION_CONFIG.ANSWER_DELAY);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: QUESTION_CONFIG.ANIMATION_DURATIONS.BUTTONS, 
        delay: QUESTION_CONFIG.ANIMATION_DELAYS.BUTTONS 
      }}
      className="flex flex-col gap-[min(2.52rem,3.6vh)] w-full items-center"
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
          onTouchStart={(e) => handleTouchStart(e, index)}
          disabled={selectedAnswer !== null}
          className={`btn-answer inline-flex min-w-[min(42.3rem,63vw,80vh)] min-h-[min(4.62rem,6.93vh,8vw)] items-center justify-center gap-[min(0.5rem,1vw)] px-[min(4rem,5vw,6vh)] py-[min(1rem,1.5vh,2vw)] rounded-[min(4.62rem,6.93vh,8vw)] border-[min(0.1125rem,0.225vw,0.3vh)] border-solid relative ${getButtonClassName(index)}`}
          style={{ 
            borderColor: 'var(--color-neutral-light)',
            touchAction: 'manipulation',
            userSelect: 'none',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none'
          }}
        >
          <span className="typography-antworten-buttons text-primary relative w-full text-center break-words hyphens-auto max-w-full">
            {answer}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default AnswerButtons;