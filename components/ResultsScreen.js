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
    answers,
    setShowLanguageSelector
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
    // Only trigger if not clicking on the play again button or language selector
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
      
      {/* Content - Centered vertically and horizontally - totalmente responsivo */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full" style={{ padding: 'min(2rem, 4vw)' }}>
        
        {/* Main title */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            marginBottom: 'min(2rem, 4vw)', // Responsive margin
            color: '#D9D9D9',
            fontFamily: '"Tisa Pro", serif',
            fontSize: 'min(4.8rem, 9.6vw)', // Responsive font size - 20% smaller
            fontStyle: 'italic',
            fontWeight: 700,
            lineHeight: '120%',
            textAlign: 'center'
          }}
        >
          {content[language]?.results?.messages?.[score] || 
           (language === 'en' ? 'Great job!' : 'Hü! Sehr gut!')}
        </motion.h1>

        {/* Secondary text with score */}
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            marginBottom: 'min(3rem, 6vw)', // Responsive margin
            color: '#85AF8B',
            fontFamily: '"Tisa Sans Pro", sans-serif',
            fontSize: 'min(3.2rem, 6.4vw)', // Responsive font size - 20% smaller
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '120%',
            textAlign: 'center'
          }}
        >
          {content[language]?.results?.scoreText?.replace('{score}', score).replace('{total}', questions.length) || 
           `Du hast ${score} von ${questions.length} Fragen richtig beantwortet.`}
        </motion.p>

        {/* Answer indicators - circles responsivos */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex"
          style={{ 
            gap: 'min(2.2rem, 4.4vw)', // Gap responsivo - 10% más espacio
            marginBottom: 'min(4rem, 8vw)' // Responsive margin
          }}
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
                  width: 'min(3.31rem, 6.6vw)', // Tamaño responsivo - 5% más grande
                  height: 'min(3.31rem, 6.6vw)', // Tamaño responsivo - 5% más grande
                  borderRadius: '9999px',
                  backgroundColor: backgroundColor
                }}
              />
            );
          })}
        </motion.div>

        {/* "NOCH EINMAL" button responsivo */}
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          onClick={handlePlayAgain}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#FFF',
            fontFamily: '"Tisa Sans Pro", sans-serif',
            fontSize: 'min(1.5rem, 3vw)', // Responsive font size - 20% smaller
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.0625rem', // Responsive letter spacing
            padding: 'min(1rem, 2vw) min(2rem, 4vw)', // Responsive padding
            borderRadius: 'min(1.5rem, 3vw)', // Responsive border radius
            gap: 'min(0.5rem, 1vw)' // Responsive gap
          }}
        >
          {content[language]?.results?.playAgain || 'NOCH EINMAL'}
          <img
            src="/images/GUI.svg"
            alt="Restart icon"
            style={{
              width: 'min(3rem, 6vw)', // Responsive width
              height: 'min(4.875rem, 9.75vw)' // Responsive height
            }}
          />
        </motion.button>
      </div>

      {/* Language selector icon - positioned in bottom left */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={showContent ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-0 left-0 z-20"
        style={{ 
          marginLeft: 'min(3.5rem, 6.5vw)',
          marginBottom: 'min(2.5rem, 4vh)'
        }}
      >
        <motion.button
          onClick={() => setShowLanguageSelector(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="transition-all cursor-pointer"
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0
          }}
        >
          <motion.img
            src="/images/OE_Sprache_64 1.svg"
            alt="Language selector"
            style={{
              width: 'min(2.7rem, 5.4vw)',
              height: 'min(2.7rem, 5.4vw)',
              display: 'block',
              opacity: 0.8
            }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ResultsScreen;
