import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import ProgressBar from './ProgressBar';
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';

const ResultsScreen = () => {
  const { 
    getScore, 
    beginQuiz,
    content,
    language,
    questions
  } = useApp();

  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  const score = getScore();

  useEffect(() => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    if (score >= 4) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [score]);

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

  const resultsContent = content[language].results;
  const scoreText = resultsContent.scoreText.replace('{score}', score);
  const message = resultsContent.messages[score.toString()];

  const getScoreEmoji = () => {
    if (score === 5) return '🏆';
    if (score >= 4) return '🎉';
    if (score >= 3) return '👍';
    if (score >= 2) return '💪';
    return '📚';
  };

  const getScoreColor = () => {
    if (score >= 4) return 'text-feedback-correct';
    if (score >= 2) return 'text-yellow-500';
    return 'text-feedback-incorrect';
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-br from-museum-cream to-museum-gold flex flex-col cursor-pointer"
      onClick={handleTouchAnywhere}
    >
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.1}
        />
      )}

      {/* Header */}
      <div className="p-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold text-center text-museum-brown mb-8"
        >
          Quiz Ergebnis
        </motion.h1>
        <ProgressBar />
      </div>

      {/* Results content */}
      <div className="flex-1 flex flex-col justify-center items-center px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-4xl"
        >
          {/* Score emoji */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-9xl mb-8"
          >
            {getScoreEmoji()}
          </motion.div>

          {/* Score text */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`text-5xl font-bold mb-8 ${getScoreColor()}`}
          >
            {scoreText}
          </motion.h2>

          {/* Score visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center space-x-4 mb-8"
          >
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold
                  ${index < score 
                    ? 'bg-feedback-correct text-white' 
                    : 'bg-gray-300 text-gray-500'
                  }
                `}
              >
                {index < score ? '✓' : '✗'}
              </motion.div>
            ))}
          </motion.div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-3xl text-museum-brown mb-12 leading-relaxed max-w-3xl"
          >
            {message}
          </motion.p>

          {/* Play again hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-xl text-museum-brown opacity-70 mb-8"
          >
            Berühren Sie den Bildschirm für ein neues Quiz
          </motion.p>
        </motion.div>
      </div>

      {/* Play again button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="p-8 flex justify-center"
      >
        <motion.button
          onClick={handlePlayAgain}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-museum-brown text-white px-12 py-6 rounded-xl text-2xl font-semibold shadow-lg hover:bg-opacity-90 transition-all"
        >
          {resultsContent.playAgain}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ResultsScreen;
