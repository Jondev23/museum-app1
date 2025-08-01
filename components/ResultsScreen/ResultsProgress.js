import ProgressDots from '../shared/ProgressDots';

// Progress dots component for results screen
const ResultsProgress = ({ questions, answers }) => {
  return (
    <div 
      className="w-full flex justify-center"
      style={{ 
        marginTop: '4.56rem',
        marginBottom: 'clamp(1rem, 3vh, 2rem)'
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
