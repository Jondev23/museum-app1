import { motion } from 'framer-motion';
import { QUESTION_CONFIG } from './QuestionScreenConfig';

const AnswerButtons = ({ 
  question, 
  handleAnswerClick,
  selectedAnswer,
  getButtonClassName,
  getButtonStyle
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
      exit={{ opacity: 1 }}
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
          exit={{ 
            opacity: selectedAnswer === index ? 1 : 0,
            transition: { 
              duration: selectedAnswer === index ? 0.4 : 0.15,
              delay: selectedAnswer === index ? 0.15 : 0
            }
          }}
          transition={{ 
            duration: QUESTION_CONFIG.ANIMATION_DURATIONS.BUTTON_INDIVIDUAL, 
            delay: QUESTION_CONFIG.ANIMATION_DELAYS.BUTTON_BASE + index * QUESTION_CONFIG.ANIMATION_DELAYS.BUTTON_STAGGER 
          }}
          onClick={() => handleAnswerClick(index, QUESTION_CONFIG.ANSWER_DELAY)}
          onTouchStart={(e) => handleTouchStart(e, index)}
          disabled={selectedAnswer !== null}
          className={`btn-answer inline-flex min-w-[min(42.3rem,63vw,80vh)] min-h-[min(4.62rem,6.93vh,8vw)] items-center justify-center gap-[min(0.5rem,1vw)] px-[min(4rem,5vw,6vh)] py-[min(1rem,1.5vh,2vw)] rounded-[min(4.62rem,6.93vh,8vw)] border-[min(0.1125rem,0.225vw,0.3vh)] border-solid relative ${getButtonClassName(index)}`}
          style={getButtonStyle(index)}
        >
          <span 
            className={`typography-antworten-buttons relative w-full text-center break-words hyphens-auto max-w-full transition-colors duration-150 ${selectedAnswer === index ? '' : 'text-primary'}`}
            style={{
              color: selectedAnswer === index ? 'var(--color-feedback-answer-text)' : undefined,
              // Exactamente los mismos estilos de texto que en FeedbackScreen cuando está seleccionado
              overflowWrap: selectedAnswer === index ? 'break-word' : undefined,
              wordBreak: selectedAnswer === index ? 'break-word' : undefined,
              hyphens: selectedAnswer === index ? 'auto' : undefined,
              whiteSpace: selectedAnswer === index ? 'normal' : undefined
            }}
          >
            {answer}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default AnswerButtons;