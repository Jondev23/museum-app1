// Import animation library and shared components
import { motion } from 'framer-motion';
import StandardFooter from './shared/StandardFooter';

// Import custom hooks and configuration
import { useFeedbackScreen } from '../hooks/useFeedbackScreen';
import { useFeedbackScreenStyles, FEEDBACK_CONFIG } from './FeedbackScreen/FeedbackScreenConfig';

// Import subcomponents
import FeedbackTitle from './FeedbackScreen/FeedbackTitle';
import FeedbackAnswer from './FeedbackScreen/FeedbackAnswer';
import FeedbackMessage from './FeedbackScreen/FeedbackMessage';
import FeedbackButton from './FeedbackScreen/FeedbackButton';

// Feedback screen component - shows correct/incorrect feedback after each question
const FeedbackScreen = () => {
  // Get feedback data and handlers from custom hook
  const {
    question,
    userAnswer,
    totalQuestions,
    currentQuestionIndex,
    questions,
    answers,
    startContent,
    buttonText,
    isValidData,
    isCorrect,
    randomMessage,
    nextQuestion,
    handleTouchStart
  } = useFeedbackScreen();

  // Get dynamic styles based on content and answer correctness
  const {
    backgroundStyle,
    mainContentStyle,
    feedbackContainerStyle,
    titleStyle,
    answerButtonStyle,
    answerTextStyle,
    messageContainerStyle,
    messageStyle,
    explanationStyle,
    buttonContainerStyle,
    buttonStyle,
    buttonTextStyle,
    arrowStyle
  } = useFeedbackScreenStyles(startContent, isCorrect);

  if (!isValidData) return null;

  return (
    <>
      {/* Fixed background layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }} // Quick fade to maintain background consistency
        className="fixed inset-0 z-10"
        style={backgroundStyle}
      >
        {/* Dark overlay */}
        <div className={`absolute inset-0 ${FEEDBACK_CONFIG.COLORS.OVERLAY}`} />
      </motion.div>

      {/* Animated content container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: FEEDBACK_CONFIG.ANIMATION_DURATIONS.SCREEN_TRANSITION,
          exit: { duration: 0.2 } // Faster exit to match QuestionScreen behavior
        }}
        className="fixed inset-0 flex flex-col z-40"
        style={{ paddingBottom: 'min(4.375rem, 7vh)' }} // Leave space for footer
        onTouchStart={(e) => {
          e.stopPropagation();
          if (!e.target.closest('button') && !e.target.closest('[role="button"]')) {
            handleTouchStart(e);
          }
        }}
      >
        {/* Main content */}
        <div className="relative z-10 flex flex-col h-full">
          <div 
            className="flex flex-col items-center justify-start flex-1"
            style={mainContentStyle}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: FEEDBACK_CONFIG.ANIMATION_DURATIONS.CONTAINER }}
              style={feedbackContainerStyle}
            >
              <FeedbackTitle 
                question={question} 
                titleStyle={titleStyle} 
              />

              <FeedbackAnswer
                question={question}
                userAnswer={userAnswer}
                answerButtonStyle={answerButtonStyle}
                answerTextStyle={answerTextStyle}
              />

              <FeedbackMessage
                randomMessage={randomMessage}
                question={question}
                messageContainerStyle={messageContainerStyle}
                messageStyle={messageStyle}
                explanationStyle={explanationStyle}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Footer section - separated with independent animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.4, // Entry duration
          exit: { duration: 0.2, delay: 0.15 } // Delayed exit to overlap with next screen footer
        }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <StandardFooter
          showProgressDots={true}
          totalQuestions={totalQuestions}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          questions={questions}
          progressDotsVariant="feedback"
          alignProgressDots="inline"
          className="relative"
        >
          <FeedbackButton
            buttonText={buttonText}
            nextQuestion={nextQuestion}
            buttonContainerStyle={buttonContainerStyle}
            buttonStyle={buttonStyle}
            buttonTextStyle={buttonTextStyle}
            arrowStyle={arrowStyle}
          />
        </StandardFooter>
      </motion.div>
    </>
  );
};

export default FeedbackScreen;
