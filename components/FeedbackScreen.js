// Import shared components
import StandardFooter from './shared/StandardFooter';
import { useState, useEffect } from 'react';
import { injectCSSAnimations } from '../utils/screenTransitions';

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
  // State for CSS animations
  const [isEntering, setIsEntering] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

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
    nextQuestion: originalNextQuestion,
    handleTouchStart
  } = useFeedbackScreen();

  // Handle entry animation on mount
  useEffect(() => {
    // Inject CSS animations into DOM
    injectCSSAnimations();
    
    setIsEntering(true);
    setIsExiting(false);
  }, [currentQuestionIndex]); // Reset animations when question changes

  // Custom exit animation handler with CSS
  const handleExit = () => {
    setIsExiting(true);
    // Wait for exit animation to complete before calling nextQuestion
    setTimeout(() => {
      originalNextQuestion();
    }, 600); // Match the CSS animation duration
  };

  // Get dynamic styles based on content and answer correctness
  const {
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
      {/* Content container with CSS animations */}
      <div
        className={`fixed inset-0 flex flex-col ${
          isExiting ? 'feedback-screen-exit' : 'feedback-screen-enter'
        }`}
        style={{ paddingBottom: 'min(4.375rem, 7vh)' }} 
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
            <div
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
            </div>
          </div>
        </div>
      </div>

      {/* Footer section - animations now handled by index.js */}
      <div className="fixed bottom-0 left-0 right-0" style={{ zIndex: 50 }}>
        <StandardFooter
          showProgressDots={false}
          alignProgressDots="center"
          className="relative"
        >
          <FeedbackButton
            buttonText={buttonText}
            nextQuestion={handleExit}
            buttonContainerStyle={buttonContainerStyle}
            buttonStyle={buttonStyle}
            buttonTextStyle={buttonTextStyle}
            arrowStyle={arrowStyle}
          />
        </StandardFooter>
      </div>
    </>
  );
};

export default FeedbackScreen;
