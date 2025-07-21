import { motion } from 'framer-motion';
import LanguageSelectorIcon from './shared/LanguageSelectorIcon';
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
    answers,
    questions,
    handleAnswerClick,
    getButtonClassName
  } = useQuestionScreen();

  const {
    backgroundStyle,
    progressDotsStyle
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
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-overlay)' }} />

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
                getButtonClassName={getButtonClassName}
              />
            </div>
          </div>
        </div>

        {/* Language Selector Icon */}
        <LanguageSelectorIcon 
          variant="standard" 
          delay={0.6}
          className="language-selector-icon-container"
        />

        {/* Footer section */}
        <QuestionFooter
          currentQuestionIndex={currentQuestionIndex}
          progressDotsStyle={progressDotsStyle}
          answers={answers}
          questions={questions}
        />
      </div>
    </motion.div>
  );
};

export default QuestionScreen;
