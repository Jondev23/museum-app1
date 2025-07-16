import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import StandardFooter from './shared/StandardFooter';


const FeedbackScreen = () => {
  const { 
    getCurrentQuestion, 
    getCurrentAnswer,
    nextQuestion,
    content,
    language,
    currentQuestionIndex,
    questions,
    answers
  } = useApp();

  const question = getCurrentQuestion();
  const userAnswer = getCurrentAnswer();
  const totalQuestions = questions.length; // Add this line
  
  if (!question || userAnswer === undefined || !content?.[language]) return null;

  const isCorrect = userAnswer === question.correctAnswer;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  const quizContent = content[language].quiz;
  const feedbackMessages = isCorrect ? quizContent.correctFeedback : quizContent.incorrectFeedback;
  const randomMessage = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];

  const buttonText = isLastQuestion ? quizContent.showResults : quizContent.nextQuestion;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col z-50"
      onClick={(e) => e.stopPropagation()}
      style={{
        backgroundImage: 'url(/images/Bild_Kutsche.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75" />
      
      {/* Main content container - optimizado para landscape tablet */}
      <div 
        className="flex-1 flex items-center justify-center overflow-hidden"
        style={{
          maxHeight: 'calc(100vh - min(3.75rem, 6vh))', // Optimizado para landscape tablet
          paddingTop: 'min(1.875rem, 3vh)', // Usa vh para vertical en landscape
          paddingBottom: 'min(1.875rem, 3vh)' // Usa vh para vertical en landscape
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`relative z-10 rounded-[30px] text-center ${
            isCorrect ? 'bg-[#598364]' : 'bg-[#A94930]'
          }`}
          style={{
            width: 'min(90rem, 80vw)', // Optimizado para pantalla más ancha
            height: 'min(41.625rem, 75vh)', // Usa vh para altura en landscape
            padding: 'min(5rem, 6vh) min(4.5rem, 7vw)', // vh para vertical, vw para horizontal
            margin: 'min(1.875rem, 3vh) min(7.5rem, 12vw) min(3.4375rem, 5vh) min(7.5rem, 12vw)', // Optimizado para landscape
            boxSizing: 'border-box',
            maxWidth: 'calc(100vw - min(15rem, 24vw))', // Optimizado para pantalla más ancha
            maxHeight: 'calc(100vh - min(12.8125rem, 20vh))', // Usa vh para altura en landscape
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
          }}
        >
          {/* Question title - responsive */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 flex-shrink-0"
            style={{
              color: '#D9D9D9',
              fontFamily: '"Tisa Pro", serif',
              fontSize: 'min(3.375rem, 5.5vw, 8vh)', // Añadido vh para escalar verticalmente
              fontStyle: 'italic',
              fontWeight: 750,
              lineHeight: '1.3',
              textAlign: 'center',
              maxWidth: '100%',
              overflowWrap: 'break-word'
            }}
          >
            {question.question}
          </motion.h1>

          {/* Selected answer container - ancho responsivo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-4 flex-shrink-0"
          >
            <div
              className="rounded-full bg-[#D9D9D9] flex items-center justify-center"
              style={{
                width: 'min(37.5rem, 65vw)', // Optimizado para pantalla más ancha
                minHeight: 'min(5rem, 8vh)', // Usa vh para altura en landscape
                padding: 'min(1.25rem, 2vh) min(1.25rem, 2vw)' // vh para vertical, vw para horizontal
              }}
            >
              <span
                style={{
                  color: '#344243',
                  fontFamily: '"Tisa Sans Pro", sans-serif',
                  fontSize: 'min(2rem, 3.5vw, 5vh)', // Añadido vh para escalar verticalmente
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '1.2',
                  letterSpacing: 'min(0.02em, 0.05vw)', // Usa min() para letterSpacing
                  textAlign: 'center',
                  maxWidth: '100%',
                  overflowWrap: 'break-word'
                }}
              >
                {question.answers[userAnswer]}
              </span>
            </div>
          </motion.div>

          {/* Feedback text - responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 flex-shrink-0"
          >
            <p
              style={{
                color: '#D9D9D9',
                fontFamily: '"Tisa Pro", serif',
                fontSize: 'min(2.25rem, 3.8vw, 6vh)', // Añadido vh para escalar verticalmente
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '1.4',
                letterSpacing: 'min(0.02em, 0.05vw)', // Usa min() para letterSpacing
                textAlign: 'center',
                maxWidth: '100%',
                overflowWrap: 'break-word',
                margin: '0'
              }}
            >
              {isCorrect ? 'Das ist richtig!' : 'Das ist leider falsch.'}
            </p>
            {question.explanation && (
              <p
                className="mt-2"
                style={{
                  color: '#D9D9D9',
                  fontFamily: '"Tisa Pro", serif',
                  fontSize: 'min(2rem, 3.5vw, 5vh)', // Añadido vh para escalar verticalmente
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '1.4',
                  letterSpacing: 'min(0.02em, 0.05vw)', // Usa min() para letterSpacing
                  textAlign: 'center',
                  maxWidth: '100%',
                  overflowWrap: 'break-word',
                  margin: '0'
                }}
              >
                {question.explanation}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Fixed footer - language selector + pagination dots totalmente responsivo */}
      <StandardFooter
        showProgressDots={true}
        totalQuestions={totalQuestions}
        currentQuestionIndex={currentQuestionIndex}
        answers={answers}
        questions={questions}
        progressDotsVariant="feedback"
        alignProgressDots="inline"
      >
        {/* Next Question Button */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ 
            flexShrink: 0,
            marginRight: 'min(5.625rem, 9vw)',
            marginBottom: 'min(5.625rem, 9vh)'
          }}
        >
          <motion.button
            onClick={nextQuestion}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 transition-all cursor-pointer"
            style={{
              minWidth: 'min(11.25rem, 18vw)',
              minHeight: 'min(3rem, 5vh)',
              background: 'transparent',
              border: 'none',
              justifyContent: 'flex-start'
            }}
          >
            <span
              style={{
                color: '#D9D9D9',
                textAlign: 'center',
                fontFamily: '"Tisa Sans Pro", sans-serif',
                fontSize: 'min(1.375rem, 2.2vw, 3.5vh)',
                fontStyle: 'normal',
                fontWeight: 300,
                lineHeight: 'min(7rem, 11vh)',
                textTransform: 'uppercase'
              }}
            >
              {isLastQuestion ? 
                (content[language]?.quiz?.showResults || 'Show Results') : 
                (content[language]?.quiz?.nextQuestion || 'Next Question')
              }
            </span>
            <motion.img
              src="/images/GUI-2.svg"
              alt="Zur Auswertung"
              style={{
                width: 'min(3.5rem, 6vw)',
                height: 'min(3.5rem, 6vh)'
              }}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            />
          </motion.button>
        </motion.div>
      </StandardFooter>
    </motion.div>
  );
};

export default FeedbackScreen;
