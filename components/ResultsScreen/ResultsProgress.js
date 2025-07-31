import ProgressDots from '../shared/ProgressDots';
import { TRANSITION_CONFIG, UI_TRANSITIONS } from '../../utils/screenTransitions';

// Progress dots component for results screen - inherits parent animation (slides from right)
const ResultsProgress = ({ questions, answers, showContent }) => {
  return (
    <div 
      className="w-full flex justify-center"
      style={{ 
        marginTop: '4.6rem',
        marginBottom: 'clamp(1rem, 3vh, 2rem)', 
        ...UI_TRANSITIONS.contentFadeDelayed.getOpacity(showContent),
        transition: UI_TRANSITIONS.contentFadeDelayed.getTransition()
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
