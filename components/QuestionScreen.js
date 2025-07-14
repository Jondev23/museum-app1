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
        <div className="flex-1 flex flex-col justify-center items-center px-8 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl w-full text-center"
          >
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
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

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 max-w-4xl mx-auto"
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
                    w-full max-w-3xl mx-auto block transition-all duration-300 transform bg-transparent
                    ${selectedAnswer === null
                      ? 'hover:bg-white/20 hover:shadow-lg hover:scale-102 active:scale-98 cursor-pointer'
                      : selectedAnswer === index
                        ? 'bg-white/30 scale-102 shadow-xl'
                        : 'opacity-60 cursor-not-allowed'
                    }
                  `}
                  style={{
                    borderRadius: '60px',
                    border: '2px solid #D9D9D9',
                    padding: '14px 12px', // padding horizontal reducido de 16px a 12px
                    minHeight: '32px', // altura aumentada de 24px a 32px
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span
                    style={{
                      color: '#D9D9D9',
                      fontFamily: '"Tisa Sans Pro", sans-serif',
                      fontSize: '40px', // tamaño aumentado de 36px a 40px
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '1.3', // line-height aumentado para mejor legibilidad
                      letterSpacing: '0.40px', // letter-spacing ajustado proporcionalmente
                      textAlign: 'center'
                    }}
                  >
                    {answer}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Footer: Pagination dots + language icon */}
        <div className="relative flex justify-between items-center p-8">
          {/* Language selector icon */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
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
                className="w-8 h-8 block"
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
            className="absolute flex gap-6"
            style={{
              left: '43%',
              transform: 'translateX(calc(-50% - 64px))'
            }}
          >
            {[...Array(totalQuestions)].map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full"
                style={{
                  border: '3px solid #D9D9D9',
                  backgroundColor: i === currentQuestionIndex ? '#D9D9D9' : 'transparent'
                }}
              />
            ))}
          </motion.div>

          {/* Spacer for symmetry */}
          <div className="w-16"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionScreen;
