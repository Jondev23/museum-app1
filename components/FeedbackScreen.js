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
      
      {/* Main content container - dimensiones fijas específicas */}
      <div 
        className="flex-1 flex items-center justify-center overflow-hidden"
        style={{
          maxHeight: 'calc(100vh - 60px)', // más espacio para el contenedor
          paddingTop: '30px', // padding superior reducido
          paddingBottom: '30px' // padding inferior para balancear
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
            width: '1440px', // ancho total del contenedor
            height: '666px', // alto total del contenedor
            padding: '80px 72px', // padding específico (arriba/abajo: 80px, izquierda/derecha: 72px)
            margin: '30px 120px 55px 120px', // margin: 30px arriba, 120px laterales, 55px abajo
            boxSizing: 'border-box', // incluye padding en las dimensiones totales
            maxWidth: 'calc(100vw - 240px)', // fallback considerando margin lateral aumentado
            maxHeight: 'calc(100vh - 205px)', // fallback considerando margin aumentado y footer
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
              fontSize: 'clamp(28px, 5vw, 54px)', // responsive font size
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

          {/* Selected answer container - ancho fijo ~15cm */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-4 flex-shrink-0"
          >
            <div
              className="rounded-full bg-[#D9D9D9] flex items-center justify-center"
              style={{
                width: 'clamp(750px, 35vw, 600px)', // ancho específico ~15cm
                minHeight: 'clamp(55px, 7vw, 80px)', // altura aumentada
                padding: 'clamp(0.8rem, 2vw, 1.2rem) clamp(0.8rem, 2vw, 1.2rem)' // padding vertical aumentado
              }}
            >
              <span
                style={{
                  color: '#344243',
                  fontFamily: '"Tisa Sans Pro", sans-serif',
                  fontSize: 'clamp(18px, 3vw, 32px)',
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
                fontSize: 'clamp(20px, 3.5vw, 36px)', // responsive font size
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '1.4',
                letterSpacing: '0.02em',
                textAlign: 'center',
                maxWidth: '100%',
                overflowWrap: 'break-word',
                margin: 0
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
                  fontSize: 'clamp(18px, 3vw, 32px)', // slightly smaller for explanation
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '1.4',
                  letterSpacing: '0.02em',
                  textAlign: 'center',
                  maxWidth: '100%',
                  overflowWrap: 'break-word',
                  margin: 0
                }}
              >
                {question.explanation}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Fixed footer - language selector + pagination dots (sin fondo difuminado) */}
      <div 
        className="relative z-20 flex justify-between items-center"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 'clamp(50px, 6vh, 70px)', // altura reducida del footer
          padding: 'clamp(0.3rem, 1.5vw, 0.8rem) clamp(0.8rem, 3vw, 1.5rem)', // padding reducido
          minHeight: '50px' // altura mínima reducida
        }}
      >
        {/* Language selector icon */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ 
            flexShrink: 0,
            marginBottom: '90px', // espacio en la parte inferior igual que "ZUR AUSWERTUNG"
            marginLeft: '98px' // mover más hacia la derecha
          }}
        >
          <motion.button
            onClick={() => setShowLanguageSelector(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="transition-all cursor-pointer"
            style={{
              minWidth: 'clamp(32px, 6vw, 48px)', // tamaño mínimo touch-friendly
              minHeight: 'clamp(32px, 6vw, 48px)'
            }}
          >
            <motion.img
              src="/images/OE_Sprache_64 1.svg"
              alt="Language selector"
              className="block"
              style={{
                width: 'clamp(32px, 6vw, 48px)', // icono adaptativo
                height: 'clamp(32px, 6vw, 48px)'
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
            gap: 'clamp(0.3rem, 1.2vw, 0.8rem)', // gap reducido (antes: 0.5rem, 2vw, 1.5rem)
            flexShrink: 0,
            marginBottom: '90px', // espacio en la parte inferior igual que los otros elementos
            marginLeft: '220px' // mover los dots hacia la derecha
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
                  width: 'clamp(14px, 2.8vw, 18px)', // dots un poco más grandes (antes: 12px, 2.5vw, 16px)
                  height: 'clamp(14px, 2.8vw, 18px)', // dots un poco más grandes
                  border: `clamp(1.8px, 0.45vw, 2.8px) solid ${borderColor}`, // borde proporcionalmente más grande
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
            marginRight: '90px',
            marginBottom: '90px' // espacio en la parte inferior
          }}
        >
          <motion.button
            onClick={nextQuestion}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 transition-all cursor-pointer"
            style={{
              minWidth: 'clamp(120px, 15vw, 180px)',
              minHeight: 'clamp(32px, 6vw, 48px)',
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
                fontSize: '22px', // tamaño reducido de 30px a 20px
                fontStyle: 'normal',
                fontWeight: 300,
                lineHeight: '112px',
                textTransform: 'uppercase'
              }}
            >
              zur Auswertung
            </span>
            <motion.img
              src="/images/GUI-2.svg"
              alt="Zur Auswertung"
              style={{
                width: 'clamp(40px, 6vw, 56px)', // imagen más grande
                height: 'clamp(40px, 6vw, 56px)' // imagen más grande
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
