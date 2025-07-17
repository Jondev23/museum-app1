import { motion } from 'framer-motion';
import ProgressDots from '../shared/ProgressDots';
import { STYLE_CONFIG } from './ResultsScreenConfig';

const ResultsProgress = ({ questions, answers }) => {
  return (
    <ProgressDots
      totalQuestions={questions.length}
      answers={answers}
      questions={questions}
      variant="results"
      style={STYLE_CONFIG.PROGRESS_DOTS}
    />
  );
};

export default ResultsProgress;
