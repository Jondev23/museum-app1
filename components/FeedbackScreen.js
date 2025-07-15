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
      
      {/* Main content container - totalmente responsivo */}
      <div 
        className="flex-1 flex items-center justify-center overflow-hidden"
        style={{
          maxHeight: 'calc(100vh - min(3.75rem, 7.5vw))', // más espacio para el contenedor
          paddingTop: 'min(1.875rem, 3.75vw)', // padding superior reducido
          paddingBottom: 'min(1.875rem, 3.75vw)' // padding inferior para balancear
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
            width: 'min(90rem, 90vw)', // ancho total del contenedor responsivo
            height: 'min(41.625rem, 85vh)', // alto total del contenedor responsivo
            padding: 'min(5rem, 10vw) min(4.5rem, 9vw)', // padding específico responsivo
            margin: 'min(1.875rem, 3.75vw) min(7.5rem, 15vw) min(3.4375rem, 6.875vw) min(7.5rem, 15vw)', // margin responsivo
            boxSizing: 'border-box', // incluye padding en las dimensiones totales
            maxWidth: 'calc(100vw - min(15rem, 30vw))', // fallback considerando margin lateral
            maxHeight: 'calc(100vh - min(12.8125rem, 25.625vw))', // fallback considerando margin y footer
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
              fontSize: 'min(3.375rem, 6.75vw)', // responsive font size
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
                width: 'min(37.5rem, 75vw)', // ancho específico responsivo
                minHeight: 'min(5rem, 10vw)', // altura responsiva
                padding: 'min(1.25rem, 2.5vw) min(1.25rem, 2.5vw)' // padding responsivo
              }}
            >
              <span
                style={{
                  color: '#344243',
                  fontFamily: '"Tisa Sans Pro", sans-serif',
                  fontSize: 'min(2rem, 4vw)',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '1.2',
                  letterSpacing: '0.02em',
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
                fontSize: 'min(2.25rem, 4.5vw)', // responsive font size
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '1.4',
                letterSpacing: '0.02em',
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
                  fontSize: 'min(2rem, 4vw)', // slightly smaller for explanation
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '1.4',
                  letterSpacing: '0.02em',
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
          height: 'min(4.375rem, 8.75vw)', // altura responsiva del footer
          padding: 'min(0.625rem, 1.25vw) min(1.25rem, 2.5vw)', // padding responsivo
          minHeight: 'min(3.125rem, 6.25vw)' // altura mínima responsiva
        }}
      >
        {/* Language selector icon */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ 
            flexShrink: 0,
            marginBottom: 'min(5.625rem, 11.25vw)', // espacio en la parte inferior responsivo
            marginLeft: 'min(6.125rem, 12.25vw)' // mover más hacia la derecha responsivo
          }}
        >
          <motion.button
            onClick={() => setShowLanguageSelector(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="transition-all cursor-pointer"
            style={{
              minWidth: 'min(3.5rem, 7vw)', // tamaño mínimo responsivo
              minHeight: 'min(3.5rem, 7vw)' // tamaño mínimo responsivo
            }}
          >
            <motion.img
              src="/images/OE_Sprache_64 1.svg"
              alt="Language selector"
              className="block"
              style={{
                width: 'min(3.5rem, 7vw)', // icono responsivo
                height: 'min(3.5rem, 7vw)' // icono responsivo
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
            gap: 'min(0.75rem, 1.5vw)', // gap responsivo
            flexShrink: 0,
            marginBottom: 'min(5.625rem, 11.25vw)', // espacio en la parte inferior responsivo
            marginLeft: 'min(13.75rem, 27.5vw)' // mover los dots hacia la derecha responsivo
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
                  width: 'min(1.125rem, 2.25vw)', // dots responsivos
                  height: 'min(1.125rem, 2.25vw)', // dots responsivos
                  border: `min(0.175rem, 0.35vw) solid ${borderColor}`, // borde responsivo
                  backgroundColor: dotColor,
                  flexShrink: 0 // evita compresión
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
            marginRight: 'min(5.625rem, 11.25vw)',
            marginBottom: 'min(5.625rem, 11.25vw)' // espacio en la parte inferior responsivo
          }}
        >
          <motion.button
            onClick={nextQuestion}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 transition-all cursor-pointer"
            style={{
              minWidth: 'min(11.25rem, 22.5vw)',
              minHeight: 'min(3rem, 6vw)',
              background: 'transparent',
              border: 'none',
              justifyContent: 'flex-start' // alineación hacia la izquierda
            }}
          >
            <span
              style={{
                color: '#D9D9D9',
                textAlign: 'center',
                fontFamily: '"Tisa Sans Pro", sans-serif',
                fontSize: 'min(1.375rem, 2.75vw)', // tamaño responsivo
                fontStyle: 'normal',
                fontWeight: 300,
                lineHeight: 'min(7rem, 14vw)',
                textTransform: 'uppercase'
              }}
            >
              zur Auswertung
            </span>
            <motion.img
              src="/images/GUI-2.svg"
              alt="Zur Auswertung"
              style={{
                width: 'min(3.5rem, 7vw)', // imagen responsiva
                height: 'min(3.5rem, 7vw)' // imagen responsiva
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
