
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
  // Validate that we have consistent data before rendering
  const hasValidData = () => {
    if (variant === 'results') {
      // For results variant, we need answers and questions to match
      return answers.length > 0 && questions.length > 0 && answers.length <= questions.length;
    }
    return questions.length > 0;
  };

  // Don't render if data is invalid or inconsistent
  if (!hasValidData()) {
    return null;
  }

  // Calculate gap between dots based on variant
  const getGap = () => {
    switch (variant) {
      case 'results':
        return '3.42rem'; 
      default:
        return '1.1875rem'; 
    }
  };

  // Base styles for the dots container
  const baseStyles = {
    gap: getGap(),
    ...style
  };

  // Calculate individual dot styles based on question state
  const getDotStyles = (index) => {
    const baseSize = '1.5rem'; 
    const baseBorder = '0.1875rem'; 
    
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
        // Additional validation for results variant
        if (index >= answers.length || index >= questions.length) {
          return {
            width: '5.12638rem',
            height: '5.12638rem', 
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: '0.1875rem solid var(--color-neutral-light)'
          };
        }
        
        const userAnswer = answers[index];
        const question = questions[index];
        
        // Only show result if we have valid data
        if (userAnswer === undefined || !question) {
          return {
            width: '5.12638rem',
            height: '5.12638rem', 
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: '0.1875rem solid var(--color-neutral-light)'
          };
        }
        
        const isCorrect = userAnswer === question.correctAnswer;
        dotColor = isCorrect ? 'var(--color-blassgruen)' : 'var(--color-feedback-incorrect)';
        return {
          width: '5.12638rem', // Fixed size - 82.02px
          height: '5.12638rem', // Fixed size - 82.02px
          borderRadius: '50%', // Perfect circle
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
