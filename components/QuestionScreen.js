import { motion } from 'framer-motion';
import { useQuestionScreen } from '../hooks/useQuestionScreen';
import { useQuestionScreenStyles, QUESTION_CONFIG } from './QuestionScreen/QuestionScreenConfig';
import QuestionTitle from './QuestionScreen/QuestionTitle';
import AnswerButtons from './QuestionScreen/AnswerButtons';
import QuestionFooter from './QuestionScreen/QuestionFooter';

const QuestionScreen = () => {
  const {
    question,
    startContent,
    currentQuestionIndex,
    selectedAnswer,
    isValidData,
    handleAnswerClick,
    getButtonClassName
  } = useQuestionScreen();

  const {
    backgroundStyle,
    mainContentStyle,
    cardContainerStyle,
    contentStyle,
    titleStyle,
    answersContainerStyle,
    progressDotsStyle,
    getButtonStyle,
    textStyle
  } = useQuestionScreenStyles(startContent);

  if (!isValidData) return null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: QUESTION_CONFIG.ANIMATION_DURATIONS.SCREEN_TRANSITION }}
      className="fixed inset-0 flex flex-col"
      style={backgroundStyle}
    >
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Main content */}
        <div 
          className="flex flex-col items-center justify-start flex-1"
          style={mainContentStyle}
        >
          {/* Card container */}
          <div style={cardContainerStyle}>
            {/* Content */}
            <div style={contentStyle}>
              <QuestionTitle 
                question={question} 
                titleStyle={titleStyle} 
              />

              <AnswerButtons
                question={question}
                answersContainerStyle={answersContainerStyle}
                getButtonStyle={getButtonStyle}
                getButtonClassName={getButtonClassName}
                textStyle={textStyle}
                handleAnswerClick={handleAnswerClick}
                selectedAnswer={selectedAnswer}
              />
            </div>
          </div>
        </div>

        {/* Footer section */}
        <QuestionFooter
          currentQuestionIndex={currentQuestionIndex}
          progressDotsStyle={progressDotsStyle}
        />
      </div>
    </motion.div>
  );
};

export default QuestionScreen;
