import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';


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
      <div 
        className="relative z-20 flex justify-between items-center"
        style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          height: 'min(4.375rem, 7vh)', // Usa vh para altura en landscape
          padding: 'min(0.625rem, 1vh) min(1.25rem, 2vw)', // vh para vertical, vw para horizontal
          minHeight: 'min(3.125rem, 5vh)' // Usa vh para altura mínima en landscape
        }}
      >
        {/* Language selector icon */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ 
            flexShrink: 0,
            marginBottom: 'min(5.625rem, 9vh)', // Usa vh para vertical en landscape
            marginLeft: 'min(6.125rem, 10vw)' // Optimizado para pantalla más ancha
          }}
        >
          <motion.button
            onClick={() => setShowLanguageSelector(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="transition-all cursor-pointer"
            style={{
              minWidth: 'min(3.5rem, 6vw)', // Optimizado para pantalla más ancha
              minHeight: 'min(3.5rem, 6vh)' // Usa vh para altura en landscape
            }}
          >
            <motion.img
              src="/images/OE_Sprache_64 1.svg"
              alt="Language selector"
              className="block"
              style={{
                width: 'min(3.5rem, 6vw)', // Optimizado para pantalla más ancha
                height: 'min(3.5rem, 6vh)' // Usa vh para altura en landscape
              }}
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
          className="flex justify-center"
          style={{
            gap: 'min(0.75rem, 1.2vw)', // Optimizado para pantalla más ancha
            flexShrink: 0,
            marginBottom: 'min(5.625rem, 9vh)', // Usa vh para vertical en landscape
            marginLeft: 'min(13.75rem, 22vw)' // Optimizado para pantalla más ancha
          }}
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
                className="rounded-full"
                style={{
                  width: 'min(1.125rem, 1.8vw)', // Optimizado para pantalla más ancha
                  height: 'min(1.125rem, 1.8vw)', // Mismo valor que width para mantener círculos perfectos
                  border: `min(0.175rem, 0.3vw) solid ${borderColor}`, // Optimizado para pantalla más ancha
                  backgroundColor: dotColor,
                  flexShrink: 0
                }}
              />
            );
          })}
        </motion.div>

        {/* Spacer para simetría - reemplazado por "zur Auswertung" */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ 
            flexShrink: 0,
            marginRight: 'min(5.625rem, 9vw)', // Optimizado para pantalla más ancha
            marginBottom: 'min(5.625rem, 9vh)' // Usa vh para vertical en landscape
          }}
        >
          <motion.button
            onClick={nextQuestion}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 transition-all cursor-pointer"
            style={{
              minWidth: 'min(11.25rem, 18vw)', // Optimizado para pantalla más ancha
              minHeight: 'min(3rem, 5vh)', // Usa vh para altura en landscape
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
                fontSize: 'min(1.375rem, 2.2vw, 3.5vh)', // Añadido vh para escalar verticalmente
                fontStyle: 'normal',
                fontWeight: 300,
                lineHeight: 'min(7rem, 11vh)', // Usa vh para altura en landscape
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
                width: 'min(3.5rem, 6vw)', // Optimizado para pantalla más ancha
                height: 'min(3.5rem, 6vh)' // Usa vh para altura en landscape
              }}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeedbackScreen;
