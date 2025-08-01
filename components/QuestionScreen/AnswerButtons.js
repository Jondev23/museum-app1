import { QUESTION_CONFIG } from './QuestionScreenConfig';
import { processTextWithHTML } from '../../utils/textProcessor';

// Answer buttons component with multiple choice answers
const AnswerButtons = ({ 
  question, 
  handleAnswerClick, 
  selectedAnswer, 
  isProcessing, 
  getButtonClassName, 
  getButtonStyle,
  getButtonMotionProps 
}) => {
  // Handle touch events for mobile devices
  const handleTouchStart = (e, index) => {
    e.preventDefault();
    if (selectedAnswer === null && !isProcessing) {
      handleAnswerClick(index, QUESTION_CONFIG.ANSWER_DELAY);
    }
  };

  return (
    // Container for answer buttons - animations now handled by index.js
    <div className="flex flex-col gap-[min(2.52rem,3.6vh)] w-full items-center max-h-[40vh] overflow-hidden">
      {question.answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => handleAnswerClick(index, QUESTION_CONFIG.ANSWER_DELAY)}
          onTouchStart={(e) => handleTouchStart(e, index)}
          disabled={selectedAnswer !== null || isProcessing}
          className={`btn-answer inline-flex min-w-[min(42.3rem,63vw,80vh)] min-h-[min(4.62rem,6.93vh,8vw)] items-center justify-center gap-[min(0.5rem,1vw)] px-[min(4rem,5vw,6vh)] py-[min(1rem,1.5vh,2vw)] rounded-[min(4.62rem,6.93vh,8vw)] border-[min(0.1125rem,0.225vw,0.3vh)] border-solid relative ${getButtonClassName(index)}`}
          style={{
            ...getButtonStyle(index),
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <span 
            className={`typography-antworten-buttons relative w-full text-center break-words hyphens-auto max-w-full transition-colors duration-75 ${selectedAnswer === index ? '' : 'text-primary'}`}
            style={{
              color: selectedAnswer === index ? 'var(--color-feedback-answer-text)' : undefined,
              overflowWrap: selectedAnswer === index ? 'break-word' : undefined,
              wordBreak: selectedAnswer === index ? 'break-word' : undefined,
              hyphens: selectedAnswer === index ? 'auto' : undefined,
              whiteSpace: selectedAnswer === index ? 'normal' : undefined,
              transform: 'translateY(4%)',
              fontVariantNumeric: 'tabular-nums lining-nums'
            }}
          >
            {processTextWithHTML(answer)}
          </span>
        </button>
      ))}
    </div>
  );
};

export default AnswerButtons;