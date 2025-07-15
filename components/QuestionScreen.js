import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

const QuestionScreen = () => {
  const {
    getCurrentQuestion,
    answerQuestion,
    content,
    language,
    currentQuestionIndex,
    setShowLanguageSelector
  } = useApp();

  const totalQuestions = 5; // Ajusta esto si el número varía
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const question = getCurrentQuestion();

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
        backgroundImage: 'url(/images/Bild_Kutsche.webp)',
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
            gap: 'min(1.5rem, 3vw)', // Reducido de 2.5rem
            paddingTop: 'min(4rem, 8vw)', // Aumentado para compensar justify-start
            paddingBottom: '0', // Eliminado completamente para mínimo espacio con footer
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
              gap: 'min(1.5rem, 3vw)', // Reducido de 2.5rem
              padding: 'min(2rem, 4vw)', // Simplificado y reducido
              width: '100%',
              borderRadius: 'min(1.875rem, 4vw)', // 30px base
              overflow: 'hidden',
              border: '0',
              backgroundColor: 'transparent',
              marginTop: 'min(4rem, 8vw)' // Agregado margen superior para empujar contenido abajo
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
                  fontSize: 'min(2.5rem, 5vw)', 
                  fontStyle: 'italic',
                  fontWeight: 750,
                  textAlign: 'center',
                  lineHeight: 'min(3.25rem, 6vw)', // Reducido proporcionalmente
                  marginBottom: 'min(3rem, 5vw)' // Aumentado de 1rem para más espacio con botones
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
                  gap: 'min(1.75rem, 3.5vw)', 
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
                      minWidth: 'min(47rem, 70vw)', // Reducido de 50rem para ser más compacto en X
                      height: 'min(3rem, 6vw)', // Reducido de 3.5rem a 3rem
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 'min(0.5rem, 1vw)',
                      padding: 'min(2rem, 4vw) min(0.75rem, 1.5vw)', // Ajustado para mejor responsividad
                      borderRadius: 'min(3rem, 6vw)', // Mantenido redondeado
                      border: 'min(0.125rem, 0.25vw) solid #D9D9D9', // Responsive border width
                      position: 'relative'
                    }}
                  >
                    <span
                      style={{
                        position: 'relative',
                        width: 'fit-content',
                        color: '#D9D9D9',
                        fontFamily: '"Tisa Sans Pro", sans-serif',
                        fontSize: 'min(2rem, 4vw)', // Aumentado de 1.75rem
                        fontWeight: 400,
                        textAlign: 'center',
                        lineHeight: 'min(2.5rem, 5vw)', // Aumentado proporcionalmente
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

        {/* Footer: Pagination dots + language icon */}
        <div 
          className="relative flex justify-between items-center"
          style={{ padding: 'min(2.8rem, 5.3vw)' }}
        >
          {/* Language selector icon */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{ marginLeft: 'min(5.625rem, 10vw)' }} // 90px base
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
                style={{
                  width: 'min(3rem, 6vw)',
                  height: 'min(3rem, 6vw)',
                  display: 'block'
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
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute flex"
            style={{
              gap: 'min(0.75rem, 1.5vw)',
              left: '46%',
              transform: 'translateX(calc(-50% - min(4rem, 8vw)))'
            }}
          >
            {[...Array(totalQuestions)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 'min(1rem, 2vw)',
                  height: 'min(1rem, 2vw)',
                  borderRadius: '50%',
                  border: '2px solid #D9D9D9',
                  backgroundColor: i === currentQuestionIndex ? '#D9D9D9' : 'transparent'
                }}
              />
            ))}
          </motion.div>

          {/* Spacer for symmetry */}
          <div style={{ width: 'min(4rem, 8vw)' }}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionScreen;
