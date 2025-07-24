
// Progress dots component - shows quiz progress with different visual states
const ProgressDots = ({ 
  totalQuestions, 
  currentQuestionIndex, 
  answers = [], 
  questions = [],
  variant = 'default', 
  className = '',
  style = {}
}) => {
  // Calculate gap between dots based on variant
  const getGap = () => {
    switch (variant) {
      case 'results':
        return 'min(2.8rem, 4.5vw, 5.6vh)'; 
      default:
        return 'min(0.75rem, 1.2vw, 1.5vh)'; 
    }
  };

  // Base styles for the dots container
  const baseStyles = {
    gap: getGap(),
    ...style
  };

  // Calculate individual dot styles based on question state
  const getDotStyles = (index) => {
    const baseSize = 'min(1rem, 1.8vw, 2.25vh)';
    const baseBorder = 'min(0.1575rem, 0.252vw, 0.315vh)';
    
    let dotColor = 'transparent';
    let borderColor = 'var(--color-neutral-light)';
    let showBorder = true;
    
    switch (variant) {
      case 'feedback':
        // Show correct/incorrect colors for answered questions
        if (index < currentQuestionIndex || (index === currentQuestionIndex && answers[index] !== undefined)) {
          const questionAnswered = questions[index];
          const userAnswerForQuestion = answers[index];
          const wasCorrect = userAnswerForQuestion === questionAnswered?.correctAnswer;
          dotColor = wasCorrect ? 'var(--color-feedback-correct)' : 'var(--color-feedback-incorrect)';
          showBorder = false;
        } else if (index === currentQuestionIndex) {
          dotColor = 'var(--color-neutral-light)'; 
          showBorder = false; 
        }
        break;
        
      case 'results':
        
        const userAnswer = answers[index];
        const isCorrect = userAnswer === questions[index]?.correctAnswer;
        dotColor = isCorrect ? 'var(--color-blassgruen)' : 'var(--color-feedback-incorrect)';
        return {
          width: 'min(3.5rem, 5.6vw, 7vh)', 
          height: 'min(3.5rem, 5.6vw, 7vh)',
          borderRadius: '50%',
          backgroundColor: dotColor,
          border: 'none'
        };
        
      default:
        
        if (index < currentQuestionIndex && answers[index] !== undefined) {
          
          const questionAnswered = questions[index];
          const userAnswerForQuestion = answers[index];
          const wasCorrect = userAnswerForQuestion === questionAnswered?.correctAnswer;
          dotColor = wasCorrect ? 'var(--color-feedback-correct)' : 'var(--color-feedback-incorrect)';
          showBorder = false;
        } else if (index === currentQuestionIndex) {
          
          dotColor = 'var(--color-neutral-light)';
          showBorder = false;
        } else {
          
          dotColor = 'transparent';
          showBorder = true;
        }
        break;
    }
    
    return {
      width: baseSize,
      height: baseSize,
      borderRadius: '50%',
      border: showBorder ? `${baseBorder} solid ${borderColor}` : 'none',
      backgroundColor: dotColor,
      flexShrink: 0
    };
  };

  return (
    <div
      className={`flex justify-center ${className}`}
      style={baseStyles}
    >
      {[...Array(totalQuestions)].map((_, index) => (
        <div
          key={index}
          style={getDotStyles(index)}
        />
      ))}
    </div>
  );
};

export default ProgressDots;
