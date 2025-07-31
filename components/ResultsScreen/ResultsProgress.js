import ProgressDots from '../shared/ProgressDots';
import { TRANSITION_CONFIG } from '../../utils/screenTransitions';

// Progress dots component for results screen - inherits parent animation (slides from right)
const ResultsProgress = ({ questions, answers, showContent }) => {
  return (
    <div 
      className="w-full flex justify-center"
      style={{ 
        marginTop: '4.6rem',
        marginBottom: 'clamp(1rem, 3vh, 2rem)', 
        opacity: showContent ? 1 : 0, // Simple opacity control, no competing animation
        transition: `opacity ${TRANSITION_CONFIG.DURATIONS.FAST}s ease 0.2s` // Delayed opacity transition
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
