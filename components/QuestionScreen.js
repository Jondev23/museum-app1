import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import StandardFooter from './shared/StandardFooter';
import ProgressDots from './shared/ProgressDots';
import { useState } from 'react';

const QuestionScreen = () => {
  const {
    getCurrentQuestion,
    answerQuestion,
    content,
    language,
    currentQuestionIndex
  } = useApp();

  const totalQuestions = 5; // Ajusta esto si el número varía
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const question = getCurrentQuestion();
  const startContent = content?.[language]?.startScreen;

  if (!question || !content?.[language]) return null;

  const handleAnswerClick = (answerIndex) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    setTimeout(() => {
      answerQuestion(answerIndex);
    }, 500);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col"
      style={{
        backgroundImage: `url(${startContent?.backgroundImage || '/images/Bild_Kutsche.webp'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Main content */}
        <div 
          className="flex flex-col items-center justify-start flex-1"
          style={{ 
            width: '100%',
            maxWidth: 'min(120rem, 95vw)', // 1920px base
            gap: 'min(1.5rem, 3vw)', // Mantenido tamaño actual
            paddingTop: 'min(4rem, 6vh)', // Optimizado para landscape: cambio de 8vw a 6vh
            paddingBottom: 'min(0.5rem, 1vh)', // Reducido para menor espacio con footer: de 1rem, 2vh a 0.5rem, 1vh
            paddingLeft: 'min(4rem, 6vw)', // Reducido de 10rem
            paddingRight: 'min(4rem, 6vw)', // Reducido de 10rem
            margin: '0 auto'
          }}
        >
          {/* Card container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'min(1.5rem, 3vw)', // Mantenido tamaño actual
              padding: 'min(2rem, 4vw)', // Mantenido tamaño actual
              width: '100%',
              borderRadius: 'min(1.875rem, 4vw)', // 30px base
              overflow: 'hidden',
              border: '0',
              backgroundColor: 'transparent',
              marginTop: 'min(4rem, 6vh)' // Optimizado para landscape: cambio de 8vw a 6vh
            }}
          >
            {/* Content */}
            <div style={{ 
              padding: '0', 
              width: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: 'min(1rem, 2vw)' 
            }}>
              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  position: 'relative',
                  alignSelf: 'stretch',
                  color: '#D9D9D9',
                  fontFamily: '"Tisa Pro", serif',
                  fontSize: 'min(2.5rem, 5vw, 6vh)', // Añadido vh para escalar verticalmente
                  fontStyle: 'italic',
                  fontWeight: 750,
                  textAlign: 'center',
                  lineHeight: 'min(3.25rem, 6vw, 7.5vh)', // Añadido vh para escalar verticalmente
                  marginBottom: 'min(3rem, 4vh)' // Optimizado para landscape: cambio de 5vw a 4vh
                }}
              >
                {question.question}
              </motion.h1>

              {/* Answer buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'min(2.52rem, 3.6vh)', // Aumentado 20% adicional: de 2.1rem a 2.52rem, de 3vh a 3.6vh
                  width: '100%',
                  alignItems: 'center'
                }}
              >
                {question.answers.map((answer, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedAnswer !== null}
                    className={`
                      transition-all duration-300 transform bg-transparent
                      ${selectedAnswer === null
                        ? 'hover:bg-white/10 hover:shadow-lg hover:scale-102 active:scale-98 cursor-pointer'
                        : selectedAnswer === index
                          ? 'bg-white/30 scale-102 shadow-xl'
                          : 'opacity-60 cursor-not-allowed'
                      }
                    `}
                    style={{
                      display: 'inline-flex',
                      minWidth: 'min(42.3rem, 63vw, 80vh)', // Añadido vh para escalar verticalmente
                      height: 'min(4.62rem, 6.93vh, 8vw)', // Añadido vw para escalar horizontalmente también
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 'min(0.5rem, 1vw)',
                      padding: 'min(2.89rem, 4.62vh, 6vw) min(0.75rem, 1.5vw)', // Añadido vw al padding vertical
                      borderRadius: 'min(4.62rem, 6.93vh, 8vw)', // Añadido vw para escalar horizontalmente también
                      border: 'min(0.1125rem, 0.225vw, 0.3vh) solid #D9D9D9', // Añadido vh al border
                      position: 'relative'
                    }}
                  >
                    <span
                      style={{
                        position: 'relative',
                        width: 'fit-content',
                        color: '#D9D9D9',
                        fontFamily: '"Tisa Sans Pro", sans-serif',
                        fontSize: 'min(1.8rem, 3.6vw, 4.5vh)', // Añadido vh para escalar verticalmente
                        fontWeight: 400,
                        textAlign: 'center',
                        lineHeight: 'min(2.25rem, 4.5vw, 5.6vh)', // Añadido vh para escalar verticalmente
                        whiteSpace: 'nowrap',
                        fontStyle: 'normal'
                      }}
                    >
                      {answer}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer section with separate positioning */}
        <div className="relative">
          {/* Pagination dots - positioned independently but aligned vertically with language icon */}
          <ProgressDots
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentQuestionIndex}
            variant="default"
            className="absolute"
            style={{
              left: '46%',
              bottom: 'min(5.625rem, 9vh)', // Misma altura que el icono de idioma
              transform: 'translateX(calc(-50% - min(4rem, 8vw)))',
              zIndex: 30
            }}
          />
          
          {/* Standard footer with language icon only */}
          <StandardFooter
            showProgressDots={false}
            alignProgressDots="center"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionScreen;
