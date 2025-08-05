// Import custom hooks and configuration
import { useQuestionScreen } from '../hooks/useQuestionScreen';
import { useQuestionScreenStyles } from './QuestionScreen/QuestionScreenConfig';

// Import subcomponents
import QuestionTitle from './QuestionScreen/QuestionTitle';
import AnswerButtons from './QuestionScreen/AnswerButtons';
import QuestionFooter from './QuestionScreen/QuestionFooter';

// Question screen component - displays quiz questions with multiple choice answers
const QuestionScreen = () => {
  const {
    question,
    startContent,
    currentQuestionIndex,
    selectedAnswer,
    isValidData,
    answers,
    questions,
    isProcessing,
    handleAnswerClick,
    getButtonClassName,
    getButtonStyle
  } = useQuestionScreen();

  const { progressDotsStyle } = useQuestionScreenStyles(startContent);

  if (!isValidData) return null;

  return (
    <div className="fixed inset-0 flex flex-col z-25">
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex flex-col items-center justify-end flex-1 pb-[18.0rem] gap-[8rem]">
          <QuestionTitle question={question} />
          <AnswerButtons
            question={question}
            handleAnswerClick={handleAnswerClick}
            selectedAnswer={selectedAnswer}
            isProcessing={isProcessing}
            getButtonClassName={getButtonClassName}
            getButtonStyle={getButtonStyle}
          />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0" style={{ zIndex: 55 }}>
        <QuestionFooter />
      </div>
    </div>
  );
};

export default QuestionScreen;
