import { motion } from 'framer-motion';

const ProgressDots = ({ 
  totalQuestions, 
  currentQuestionIndex, 
  answers = [], 
  questions = [],
  variant = 'default', // 'default', 'feedback', 'results'
  className = '',
  style = {}
}) => {
  // Adjust gap based on variant
  const getGap = () => {
    switch (variant) {
      case 'results':
        return 'min(2.2rem, 3.5vw, 4.4vh)'; 
      default:
        return 'min(0.75rem, 1.2vw, 1.5vh)'; 
    }
  };

  const baseStyles = {
    gap: getGap(),
    ...style
  };

  const getDotStyles = (index) => {
    const baseSize = 'min(1rem, 1.8vw, 2.25vh)';
    const baseBorder = 'min(0.125rem, 0.2vw, 0.25vh)';
    
    let dotColor = 'transparent';
    let borderColor = '#D9D9D9';
    let showBorder = true;
    
    switch (variant) {
      case 'feedback':
        if (index < currentQuestionIndex || (index === currentQuestionIndex && answers[index] !== undefined)) {
          // Question has been answered
          const questionAnswered = questions[index];
          const userAnswerForQuestion = answers[index];
          const wasCorrect = userAnswerForQuestion === questionAnswered?.correctAnswer;
          dotColor = wasCorrect ? '#598364' : '#A94930';
          showBorder = false;
        } else if (index === currentQuestionIndex) {
          dotColor = '#D9D9D9'; 
          showBorder = false; 
        }
        break;
        
      case 'results':
        
        const userAnswer = answers[index];
        const isCorrect = userAnswer === questions[index]?.correctAnswer;
        dotColor = isCorrect ? '#85AF8B' : '#A94930';
        return {
          width: 'min(2.75rem, 4.4vw, 5.5vh)',
          height: 'min(2.75rem, 4.4vw, 5.5vh)',
          borderRadius: '50%',
          backgroundColor: dotColor,
          border: 'none'
        };
        
      default:
        // Default behavior for question screen
        dotColor = index === currentQuestionIndex ? '#D9D9D9' : 'transparent';
        showBorder = index !== currentQuestionIndex; 
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
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className={`flex justify-center ${className}`}
      style={baseStyles}
    >
      {[...Array(totalQuestions)].map((_, index) => (
        <motion.div
          key={index}
          initial={variant === 'results' ? { scale: 0 } : { y: 20, opacity: 0 }}
          animate={variant === 'results' ? { scale: 1 } : { y: 0, opacity: 1 }}
          transition={
            variant === 'results' 
              ? { duration: 0.4, delay: 0.3 + index * 0.1 }
              : { duration: 0.4, delay: 0.1 + index * 0.05 }
          }
          style={getDotStyles(index)}
        />
      ))}
    </motion.div>
  );
};

export default ProgressDots;
