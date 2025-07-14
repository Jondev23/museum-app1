import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import ProgressBar from './ProgressBar';
import { useState } from 'react';

const QuestionScreen = () => {
  const { 
    getCurrentQuestion, 
    answerQuestion,
    content,
    language,
    currentQuestionIndex 
  } = useApp();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const question = getCurrentQuestion();

  if (!question || !content?.[language]) return null;

  const handleAnswerClick = (answerIndex) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answerIndex);
    
    // Delay before showing feedback
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
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-museum-cream/85 to-white/85" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header with progress */}
        <div className="p-8">
          <ProgressBar />
        </div>

      {/* Question content */}
      <div className="flex-1 flex flex-col justify-center items-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl w-full text-center"
        >
          {/* Question number */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="inline-block bg-museum-brown text-white px-6 py-2 rounded-full text-lg font-semibold mb-8"
          >
            Frage {currentQuestionIndex + 1} von 5
          </motion.div>

          {/* Question text */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl font-bold text-museum-brown mb-12 leading-tight max-w-3xl mx-auto"
          >
            {question.question}
          </motion.h2>

          {/* Answer options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
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
                  w-full max-w-2xl mx-auto block px-8 py-6 rounded-xl text-xl font-medium
                  transition-all duration-300 transform
                  ${selectedAnswer === null 
                    ? 'bg-white border-2 border-museum-brown text-museum-brown hover:bg-museum-brown hover:text-white hover:scale-105 active:scale-95' 
                    : selectedAnswer === index 
                      ? 'bg-museum-brown text-white scale-105'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
                whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
              >
                {answer}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
      </div>
    </motion.div>
  );
};

export default QuestionScreen;
