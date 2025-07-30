import ProgressDots from '../shared/ProgressDots';
import { ANIMATION_CONFIG } from './ResultsScreenConfig';

// Progress dots component for results screen - inherits parent animation (slides from right)
const ResultsProgress = ({ questions, answers, showContent }) => {
  return (
    <div 
      className="w-full flex justify-center"
      style={{ 
        marginTop: 'clamp(2rem, 5vh, 4rem)', // Responsive top margin
        marginBottom: 'clamp(1rem, 3vh, 2rem)', // Responsive bottom margin
        opacity: showContent ? 1 : 0, // Simple opacity control, no competing animation
        transition: `opacity 0.3s ease ${ANIMATION_CONFIG.DELAYS.PROGRESS}s` // Delayed opacity transition
      }}
    >
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
