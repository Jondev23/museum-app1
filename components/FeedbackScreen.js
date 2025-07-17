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
  const totalQuestions = questions.length;
  
  if (!question || userAnswer === undefined || !content?.[language]) return null;

  const isCorrect = userAnswer === question.correctAnswer;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  const quizContent = content[language]?.quiz;
  const feedbackMessages = isCorrect ? quizContent?.correctFeedback : quizContent?.incorrectFeedback;
  const randomMessage = feedbackMessages?.[Math.floor(Math.random() * feedbackMessages.length)];

  const startContent = content[language]?.startScreen;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col z-50"
      onClick={(e) => e.stopPropagation()}
      style={{
        backgroundImage: `url(${startContent?.backgroundImage || '/images/Bild_Kutsche.webp'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75" />
      
      {/* Main content - usando el patrón de QuestionScreen */}
      <div className="relative z-10 flex flex-col h-full">
        <div 
          className="flex flex-col items-center justify-start flex-1"
          style={{ 
            width: '100%',
            maxWidth: 'min(120rem, 95vw)',
            gap: 'min(1.5rem, 3vw)', 
            paddingTop: 'min(6rem, 8vh)',
            paddingBottom: 'min(2rem, 3vh)', 
            paddingLeft: 'min(4rem, 6vw)', 
            paddingRight: 'min(4rem, 6vw)',
            margin: '0 auto'
          }}
        >
          {/* Contenedor del feedback con colores */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-[19px] ${
              isCorrect ? 'bg-[#598364]' : 'bg-[#A94930]'
            }`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'min(1.5rem, 3vw)',
              padding: 'min(3rem, 5vw)',
              width: '100%',
              maxWidth: 'min(74.42226rem, 83.71242vw)',
              minHeight: 'min(43rem, 74vh)',
              justifyContent: 'space-evenly'
            }}
          >
            {/* Título de la pregunta */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                color: '#D9D9D9',
                fontFamily: '"Tisa Pro"',
                fontSize: 'min(2.5rem, 5vw, 6vh)',
                fontStyle: 'italic',
                fontWeight: 750,
                lineHeight: 'min(3.25rem, 6vw, 7.5vh)',
                textAlign: 'center',
                maxWidth: '100%',
                overflowWrap: 'break-word'
              }}
            >
              {question.question}
            </motion.h1>

            {/* Respuesta seleccionada */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
              style={{ width: '100%' }}
            >
              <div
                className="rounded-full bg-[#D9D9D9] flex items-center justify-center"
                style={{
                  minWidth: 'min(35rem, 70vw)',
                  minHeight: 'min(4rem, 6vh)',
                  padding: 'min(1.5rem, 3vh) min(2rem, 4vw)',
                  maxWidth: '90%'
                }}
              >
                <span
                  style={{
                    color: '#344243',
                    fontFamily: '"Tisa Sans Pro"',
                    fontSize: 'min(1.8rem, 3.6vw, 4.5vh)',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 'min(2.25rem, 4.5vw, 5.6vh)',
                    textAlign: 'center',
                    maxWidth: '100%',
                    overflowWrap: 'break-word'
                  }}
                >
                  {question.answers[userAnswer]}
                </span>
              </div>
            </motion.div>

            {/* Mensaje de feedback */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'min(1rem, 2vh)',
                width: '100%',
                flex: 1,
                justifyContent: 'center'
              }}
            >
              <p
                style={{
                  color: '#D9D9D9',
                  fontFamily: '"Tisa Pro"',
                  fontSize: 'min(2rem, 4vw, 5vh)',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'min(2.5rem, 5vw, 6vh)',
                  textAlign: 'center',
                  maxWidth: '100%',
                  overflowWrap: 'break-word',
                  margin: '0'
                }}
              >
                {randomMessage}
              </p>
              {question.explanation && (
                <p
                  style={{
                    color: '#D9D9D9',
                    fontFamily: '"Tisa Pro"',
                    fontSize: 'min(1.6rem, 3.2vw, 4vh)',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 'min(2rem, 4vw, 5vh)',
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

        {/* Footer usando el mismo patrón que QuestionScreen */}
        <StandardFooter
          showProgressDots={true}
          totalQuestions={totalQuestions}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          questions={questions}
          progressDotsVariant="feedback"
          alignProgressDots="inline"
        >
          {/* Botón siguiente */}
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
                  fontFamily: '"Tisa Sans Pro"',
                  fontSize: 'min(1.375rem, 2.2vw, 3.5vh)',
                  fontStyle: 'normal',
                  fontWeight: 400,
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
      </div>
    </motion.div>
  );
};

export default FeedbackScreen;
