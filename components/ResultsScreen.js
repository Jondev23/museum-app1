import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const ResultsScreen = () => {
  const { 
    getScore, 
    beginQuiz,
    content,
    language,
    questions,
    answers
  } = useApp();

  const [showContent, setShowContent] = useState(false);

  const score = getScore();

  useEffect(() => {
    // Trigger content animation after component mounts
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayAgain = () => {
    beginQuiz();
  };

  const handleTouchAnywhere = (e) => {
    // Only trigger if not clicking on the play again button
    if (!e.target.closest('button')) {
      handlePlayAgain();
    }
  };

  if (!content?.[language]) return null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col cursor-pointer"
      onClick={handleTouchAnywhere}
      style={{
        backgroundImage: 'url(/images/Bild_Kutsche.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/75" />
      
      {/* Content - Centered vertically and horizontally */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        
        {/* Main title */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
          style={{
            color: '#D9D9D9',
            fontFamily: '"Tisa Pro", serif',
            fontSize: '96px',
            fontStyle: 'italic',
            fontWeight: 700,
            lineHeight: '120%',
            textAlign: 'center'
          }}
        >
          Hü! Sehr gut!
        </motion.h1>

        {/* Secondary text with score */}
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
          style={{
            color: '#85AF8B',
            fontFamily: '"Tisa Sans Pro", sans-serif',
            fontSize: '64px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '120%',
            textAlign: 'center'
          }}
        >
          Du hast {score} von {questions.length} Fragen richtig beantwortet.
        </motion.p>

        {/* Answer indicators - circles */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-4 mb-16"
        >
          {questions.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            const backgroundColor = isCorrect ? '#85AF8B' : '#A94930';
            
            return (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={showContent ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '9999px',
                  backgroundColor: backgroundColor
                }}
              />
            );
          })}
        </motion.div>

        {/* "NOCH EINMAL" button */}
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          onClick={handlePlayAgain}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#FFF',
            fontFamily: '"Tisa Sans Pro", sans-serif',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            padding: '16px 32px',
            borderRadius: '24px'
          }}
        >
          NOCH EINMAL
          <img
            src="/images/GUI.svg"
            alt="Restart icon"
            style={{
              width: '48px',
              height: '78px'
            }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ResultsScreen;
