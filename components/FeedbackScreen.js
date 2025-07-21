import { motion } from 'framer-motion';
import StandardFooter from './shared/StandardFooter';
import { useFeedbackScreen } from '../hooks/useFeedbackScreen';
import { useFeedbackScreenStyles, FEEDBACK_CONFIG } from './FeedbackScreen/FeedbackScreenConfig';
import FeedbackTitle from './FeedbackScreen/FeedbackTitle';
import FeedbackAnswer from './FeedbackScreen/FeedbackAnswer';
import FeedbackMessage from './FeedbackScreen/FeedbackMessage';
import FeedbackButton from './FeedbackScreen/FeedbackButton';

const FeedbackScreen = () => {
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
    nextQuestion
  } = useFeedbackScreen();

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col z-50"
      onClick={(e) => e.stopPropagation()}
      style={backgroundStyle}
    >
      {/* Dark overlay */}
      <div className={`absolute inset-0 ${FEEDBACK_CONFIG.COLORS.OVERLAY}`} />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col h-full">
        <div 
          className="flex flex-col items-center justify-start flex-1"
          style={mainContentStyle}
        >
          {/* Contenedor del feedback */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
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

        {/* Footer con z-index alto para estar encima del overlay */}
        <StandardFooter
          showProgressDots={true}
          totalQuestions={totalQuestions}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          questions={questions}
          progressDotsVariant="feedback"
          alignProgressDots="inline"
          className="relative"
          style={{ zIndex: 30 }}
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
      </div>
    </motion.div>
  );
};

export default FeedbackScreen;
