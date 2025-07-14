import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import ProgressBar from './ProgressBar';

const FeedbackScreen = () => {
  const { 
    getCurrentQuestion, 
    getCurrentAnswer,
    nextQuestion,
    content,
    language,
    currentQuestionIndex,
    questions,
    setShowLanguageSelector,
    answers
  } = useApp();

  const question = getCurrentQuestion();
  const userAnswer = getCurrentAnswer();
  
  if (!question || userAnswer === undefined || !content?.[language]) return null;

  const isCorrect = userAnswer === question.correctAnswer;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const totalQuestions = 5; // Adjust if the number varies
  
  const quizContent = content[language].quiz;
  const feedbackMessages = isCorrect ? quizContent.correctFeedback : quizContent.incorrectFeedback;
  const randomMessage = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];

  const buttonText = isLastQuestion ? quizContent.showResults : quizContent.nextQuestion;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={(e) => e.stopPropagation()}
      style={{
        backgroundImage: 'url(/images/Bild_Kutsche.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative z-10 rounded-[30px] px-8 py-12 max-w-5xl mx-auto text-center ${
          isCorrect ? 'bg-[#598364]' : 'bg-[#A94930]'
        }`}
      >
        {/* Question title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
          style={{
            color: '#D9D9D9',
            fontFamily: '"Tisa Pro", serif',
            fontSize: '54px',
            fontStyle: 'italic',
            fontWeight: 750,
            lineHeight: '70.2px',
            textAlign: 'center'
          }}
        >
          {question.question}
        </motion.h1>

        {/* Selected answer container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-10 py-5 rounded-full bg-[#D9D9D9] mb-8"
        >
          <span
            style={{
              color: '#344243',
              fontFamily: '"Tisa Sans Pro", sans-serif',
              fontSize: '48px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '57.6px',
              letterSpacing: '0.48px',
              textAlign: 'center'
            }}
          >
            {question.answers[userAnswer]}
          </span>
        </motion.div>

        {/* Feedback text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p
            style={{
              color: '#D9D9D9',
              fontFamily: '"Tisa Pro", serif',
              fontSize: '36px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '50.4px',
              letterSpacing: '0.36px',
              textAlign: 'center'
            }}
          >
            {isCorrect ? 'Das ist richtig!' : 'Das ist leider falsch.'}
          </p>
          {question.explanation && (
            <p
              className="mt-4"
              style={{
                color: '#D9D9D9',
                fontFamily: '"Tisa Pro", serif',
                fontSize: '36px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '50.4px',
                letterSpacing: '0.36px',
                textAlign: 'center'
              }}
            >
              {question.explanation}
            </p>
          )}
        </motion.div>

        {/* Next button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-8"
        >
          <motion.button
            onClick={nextQuestion}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#344243] px-8 py-4 rounded-lg font-semibold text-xl hover:bg-opacity-90 transition-all"
          >
            {buttonText}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Footer: Language selector + pagination dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between items-center px-8 z-50">
        {/* Language selector icon */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            onClick={() => setShowLanguageSelector(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="transition-all cursor-pointer"
          >
            <motion.img
              src="/images/OE_Sprache_64 1.svg"
              alt="Language selector"
              className="w-10 h-10 block"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </motion.button>
        </motion.div>

        {/* Pagination dots */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex gap-6"
        >
          {[...Array(totalQuestions)].map((_, i) => {
            let dotColor = 'transparent';
            let borderColor = '#D9D9D9';
            
            if (i < currentQuestionIndex || (i === currentQuestionIndex && answers[i] !== undefined)) {
              // Question has been answered
              const questionAnswered = questions[i];
              const userAnswerForQuestion = answers[i];
              const wasCorrect = userAnswerForQuestion === questionAnswered.correctAnswer;
              dotColor = wasCorrect ? '#598364' : '#A94930'; // Green for correct, copper for incorrect
            } else if (i === currentQuestionIndex) {
              dotColor = '#D9D9D9'; // Current question
            }
            
            return (
              <div
                key={i}
                className="w-5 h-5 rounded-full"
                style={{
                  border: `3px solid ${borderColor}`,
                  backgroundColor: dotColor
                }}
              />
            );
          })}
        </motion.div>

        {/* Spacer for symmetry */}
        <div className="w-10"></div>
      </div>
    </motion.div>
  );
};

export default FeedbackScreen;
