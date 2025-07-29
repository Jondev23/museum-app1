import { motion } from 'framer-motion';
import ProgressDots from '../shared/ProgressDots';

// Progress dots component for results screen showing quiz completion - fully responsive
const ResultsProgress = ({ questions, answers, showContent }) => {
  return (
    <motion.div 
      className="w-full flex justify-center"
      style={{ 
        marginTop: 'clamp(2rem, 5vh, 4rem)', // Responsive top margin
        marginBottom: 'clamp(1rem, 3vh, 2rem)' // Responsive bottom margin
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut",
        delay: showContent ? 1.2 : 0 // Delay after content appears
      }}
    >
      <ProgressDots
        totalQuestions={questions.length}
        answers={answers}
        questions={questions}
        variant="results"
      />
    </motion.div>
  );
};

export default ResultsProgress;
