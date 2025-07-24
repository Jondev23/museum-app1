import { motion } from 'framer-motion';
import ProgressDots from '../shared/ProgressDots';

// Progress dots component for results screen showing quiz completion
const ResultsProgress = ({ questions, answers }) => {
  return (
    <div style={{ 
      marginTop: 'var(--results-progress-margin)', 
      marginBottom: 'var(--spacing-2xl)' 
    }}>
      <ProgressDots
        totalQuestions={questions.length}
        answers={answers}
        questions={questions}
        variant="results"
      />
    </div>
  );
};

export default ResultsProgress;
