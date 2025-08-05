import { processTextWithHTML } from '../../utils/textProcessor';
import { QUESTION_CONFIG } from './QuestionScreenConfig';

// Answer buttons component with multiple choice answers
const AnswerButtons = ({ 
  question, 
  handleAnswerClick, 
  selectedAnswer, 
  isProcessing, 
  getButtonClassName, 
  getButtonStyle 
}) => {
  // Handle touch events for mobile devices
  const handleTouchStart = (e, index) => {
    e.preventDefault();
    if (selectedAnswer === null && !isProcessing) {
      handleAnswerClick(index, QUESTION_CONFIG.ANSWER_DELAY);
    }
  };

  return (
    // Container for answer buttons
    <div className="flex flex-col gap-[min(2.52rem,3.6vh)] w-full items-center max-h-[40vh] overflow-hidden px-[min(0.5rem,1vw)]">
      {question.answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => handleAnswerClick(index, 800)}
          onTouchStart={(e) => handleTouchStart(e, index)}
          disabled={selectedAnswer !== null || isProcessing}
          className={`btn-answer inline-flex min-w-[min(63.36rem,58vw,75vh)] h-[5rem] gap-[min(0.5rem,1vw)] px-[min(4rem,5vw,6vh)] pt-[1.0rem] pb-[0.8rem] rounded-[min(7.3152rem,6.93vh,8vw)] border-[min(0.1125rem,0.225vw,0.3vh)] border-solid relative ${getButtonClassName(index)}`}
          style={getButtonStyle(index)}
        >
          <span 
            className={`typography-antworten-buttons ${selectedAnswer === index ? 'selected' : ''} relative w-full text-center break-words hyphens-auto max-w-full transition-colors duration-75`}
          >
            {processTextWithHTML(answer)}
          </span>
        </button>
      ))}
    </div>
  );
};

export default AnswerButtons;