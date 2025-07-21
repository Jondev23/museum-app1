import { motion } from 'framer-motion';
import LanguageSelectorIcon from './shared/LanguageSelectorIcon';
import ProgressDots from './shared/ProgressDots';
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

        {/* Language Selector Icon */}
        <LanguageSelectorIcon 
          variant="standard" 
          delay={0.6}
          className="" 
          style={{
            position: 'fixed',
            bottom: '1rem', 
            left: 'min(3rem, 6vw)',
            zIndex: 75,
            margin: 0 
          }}
        />

        {/* Progress Dots - centered */}
        <div style={{
          position: 'fixed',
          bottom: '1rem', 
          left: '50%',
          transform: 'translateX(-50%) translateY(-230%)',
          zIndex: 76, // Higher than language selector
          margin: 0, 
          padding: 0, 
        }}>
          <ProgressDots
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            questions={questions}
            variant="feedback"
            style={{
              margin: 0,
              padding: 0,
              alignItems: 'center' 
            }}
          />
        </div>

        {/* Feedback Button - bottom right */}
        <div style={{
          position: 'fixed',
          bottom: '4vh',
          right: '6rem',
          zIndex: 78
        }}>
          <FeedbackButton
            buttonText={buttonText}
            nextQuestion={nextQuestion}
            buttonContainerStyle={{}}
            buttonStyle={buttonStyle}
            buttonTextStyle={buttonTextStyle}
            arrowStyle={arrowStyle}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FeedbackScreen;
