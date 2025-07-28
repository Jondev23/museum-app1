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
    backgroundStyle,
    progressDotsStyle
  } = useQuestionScreenStyles(startContent);

  // Don't render if data is invalid
  if (!isValidData) return null;

  return (
    <>
      {/* Fixed background layer - positioned behind content but above FeedbackScreen */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }} // Quick fade to create seamless background
        className="fixed inset-0 z-20"
        style={backgroundStyle}
      >
        {/* Background overlay for better contrast */}
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-overlay)' }} />
      </motion.div>

      {/* Animated content container with slide-in animation from right */}
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: QUESTION_CONFIG.ANIMATION_DURATIONS.SCREEN_TRANSITION,
          exit: { duration: 0.2 }, // Faster exit to prevent overlap with FeedbackScreen
          when: "afterChildren"
        }}
        className="fixed inset-0 flex flex-col z-30"
      >
        {/* Content container */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Main content */}
          <div className="flex flex-col items-center justify-start flex-1 w-full max-w-[min(120rem,95vw)] mx-auto px-[min(4rem,6vw)] pt-[min(4rem,6vh)] pb-[min(0.5rem,1vh)] gap-[min(1.5rem,3vw)]">
            {/* Card container */}
            <div className="flex flex-col items-center w-full mt-[min(3.08rem,4.62vh)] p-[min(2rem,4vw)] gap-[min(1.5rem,3vw)] rounded-[min(1.875rem,4vw)] overflow-hidden border-0 bg-transparent">
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

          {/* Footer section */}
          <QuestionFooter
            currentQuestionIndex={currentQuestionIndex}
            progressDotsStyle={progressDotsStyle}
            answers={answers}
            questions={questions}
          />
        </div>
      </motion.div>
    </>
  );
};

export default QuestionScreen;
