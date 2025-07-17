import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ProgressDots from './shared/ProgressDots';
import StandardFooter from './shared/StandardFooter';

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
  const startContent = content?.[language]?.startScreen;

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
      exit={{ x: '-100%' }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col cursor-pointer"
      onClick={handleTouchAnywhere}
      style={{
        backgroundImage: `url(${startContent?.backgroundImage || '/images/Bild_Kutsche.webp'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/75" />
      
      {/* Content - Centered vertically and horizontally - optimizado para tableta landscape */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full" style={{ padding: 'min(2rem, 3vh)' }}>
        
        {/* Main title */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            marginBottom: 'min(2rem, 3vh)', 
            color: '#D9D9D9',
            fontFamily: '"Tisa Pro"',
            fontSize: 'min(4.8rem, 8vw)', 
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
            marginBottom: 'min(3rem, 4vh)', 
            color: '#85AF8B',
            fontFamily: '"Tisa Sans Pro",',
            fontSize: 'min(3.2rem, 5.5vw)',
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
        <ProgressDots
          totalQuestions={questions.length}
          answers={answers}
          questions={questions}
          variant="results"
          style={{ 
            marginBottom: 'min(4rem, 6vh)' 
          }}
        />

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
            fontFamily: '"Tisa Sans Pro"',
            fontSize: 'min(1.5rem, 2.5vw)',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: 'min(0.0625rem, 0.1vw)',
            padding: 'min(1rem, 1.5vh) min(2rem, 3vw)',
            borderRadius: 'min(1.5rem, 2.5vw)', 
            gap: 'min(0.5rem, 0.8vw)'
          }}
        >
          {content[language]?.results?.playAgain || 'NOCH EINMAL'}
          <img
            src="/images/GUI.svg"
            alt="Restart icon"
            style={{
              width: 'min(3rem, 4.5vw)',
              height: 'min(4.875rem, 7vw)' 
            }}
          />
        </motion.button>
      </div>

      {/* Standard footer with language selector */}
      <StandardFooter />
    </motion.div>
  );
};

export default ResultsScreen;
