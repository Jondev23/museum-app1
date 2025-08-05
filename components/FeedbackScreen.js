// Import shared components
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
  const {
    question,
    userAnswer,
    startContent,
    buttonText,
    isValidData,
    isCorrect,
    randomMessage,
    nextQuestion: originalNextQuestion,
    handleTouchStart
  } = useFeedbackScreen();

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
    <div
      className="absolute inset-0 flex flex-col z-20"
      onTouchStart={(e) => {
        e.stopPropagation();
        if (!e.target.closest('button') && !e.target.closest('[role="button"]')) {
          handleTouchStart(e);
        }
      }}
    >
      <div
        className="relative z-10 flex flex-col h-full"
        style={{ paddingBottom: 'min(4.375rem, 7vh)' }}
      >
        <div
          className="flex flex-col items-center justify-start flex-1"
          style={mainContentStyle}
        >
          <div style={feedbackContainerStyle}>
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

      {/* Standard Footer (if needed for other elements) */}
      <div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 45 }}>
        <StandardFooter
          showProgressDots={false}
          alignProgressDots="center"
          className="relative"
        />
      </div>
    </div>
  );
};

export default FeedbackScreen;
