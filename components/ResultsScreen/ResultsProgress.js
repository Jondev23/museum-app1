import { motion } from 'framer-motion';
import ProgressDots from '../shared/ProgressDots';

const ResultsProgress = ({ questions, answers }) => {
  return (
    <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
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
