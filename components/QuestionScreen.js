// Import animation library and question screen components
import { motion } from 'framer-motion';

// Import custom hooks and configuration
import { useQuestionScreen } from '../hooks/useQuestionScreen';
import { useQuestionScreenStyles, QUESTION_CONFIG } from './QuestionScreen/QuestionScreenConfig';

// Import subcomponents
import QuestionTitle from './QuestionScreen/QuestionTitle';
import AnswerButtons from './QuestionScreen/AnswerButtons';
import QuestionFooter from './QuestionScreen/QuestionFooter';

// Question screen component - displays quiz questions with multiple choice answers
const QuestionScreen = () => {
  // Get question data and handlers from custom hook
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

  // Get dynamic styles based on content
  const {
    progressDotsStyle
  } = useQuestionScreenStyles(startContent);

  // Don't render if data is invalid
  if (!isValidData) return null;

  return (
    <>
      {/* Animated content container with slide-in animation from right */}
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 1.2, // Duración más lenta para efecto "empuje"
          exit: { duration: 0.2 }, 
          when: "afterChildren"
        }}
        className="fixed inset-0 flex flex-col z-20"
      >
        {/* Content container - without footer */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Main content */}
          <div className="flex flex-col items-center justify-start flex-1 w-full max-w-7xl mx-auto pt-[6.42rem] pb-2 gap-6">
            {/* Card container */}
            <div className="flex flex-col items-center w-full mt-[min(3.08rem,4.62vh)] py-[min(0.25rem,0.5vw)] gap-[min(1.5rem,3vw)] rounded-[min(1.875rem,4vw)] overflow-hidden border-0 bg-transparent">
              {/* Content */}
              <div className="flex flex-col items-center w-full p-0 gap-[min(3rem,4.5vw)]">
                <QuestionTitle 
                  question={question} 
                />

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
          </div>
        </div>
      </motion.div>

      {/* Footer section - separated with independent animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.4, // Same as FeedbackScreen entry
          exit: { duration: 0.2 } // Sin delay para entrada inmediata
        }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <QuestionFooter />
      </motion.div>
    </>
  );
};

export default QuestionScreen;
