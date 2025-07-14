import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

const ProgressBar = () => {
  const { questions, getProgressStatus } = useApp();

  return (
    <div className="flex justify-center items-center space-x-4">
      {questions.map((_, index) => {
        const status = getProgressStatus(index);
        
        return (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`
              w-6 h-6 rounded-full border-2 transition-all duration-300
              ${status === 'current' ? 'bg-white border-museum-brown scale-125' : ''}
              ${status === 'correct' ? 'bg-feedback-correct border-feedback-correct' : ''}
              ${status === 'incorrect' ? 'bg-feedback-incorrect border-feedback-incorrect' : ''}
              ${status === 'unanswered' ? 'bg-gray-400 border-gray-400' : ''}
            `}
          />
        );
      })}
    </div>
  );
};

export default ProgressBar;
