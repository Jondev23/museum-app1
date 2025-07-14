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
    questions
  } = useApp();

  const question = getCurrentQuestion();
  const userAnswer = getCurrentAnswer();
  
  if (!question || userAnswer === undefined || !content?.[language]) return null;

  const isCorrect = userAnswer === question.correctAnswer;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  const quizContent = content[language].quiz;
  const feedbackMessages = isCorrect ? quizContent.correctFeedback : quizContent.incorrectFeedback;
  const randomMessage = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];

  const buttonText = isLastQuestion ? quizContent.showResults : quizContent.nextQuestion;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`
          max-w-3xl w-full mx-8 p-8 rounded-2xl shadow-2xl
          ${isCorrect ? 'bg-feedback-correct' : 'bg-feedback-incorrect'}
          text-white
        `}
      >
        {/* Progress bar */}
        <div className="mb-8">
          <ProgressBar />
        </div>

        {/* Question title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold mb-6 text-center opacity-90"
        >
          {question.question}
        </motion.h3>

        {/* Selected answer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-lg opacity-80 mb-3">Ihre Antwort:</p>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <p className="text-xl font-semibold">{question.answers[userAnswer]}</p>
          </div>
        </motion.div>

        {/* Feedback message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 text-center"
        >
          <p className="text-3xl font-bold mb-4">
            {isCorrect ? '✓' : '✗'} {randomMessage}
          </p>
        </motion.div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <p className="text-lg opacity-90 mb-2">Erklärung:</p>
          <p className="text-xl leading-relaxed bg-white bg-opacity-10 p-4 rounded-lg">
            {question.explanation}
          </p>
        </motion.div>

        {/* Next button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-end"
        >
          <motion.button
            onClick={nextQuestion}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-800 px-8 py-4 rounded-lg font-semibold text-xl hover:bg-opacity-90 transition-all"
          >
            {buttonText}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackScreen;
