import { motion } from 'framer-motion';
import LanguageSelectorIcon from './LanguageSelectorIcon';
import ProgressDots from './ProgressDots';

const StandardFooter = ({ 
  children,
  showProgressDots = false,
  totalQuestions = 5,
  currentQuestionIndex = 0,
  answers = [],
  questions = [],
  progressDotsVariant = 'default',
  className = '',
  style = {}
}) => {
  const baseFooterStyles = {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    height: 'min(4.375rem, 7vh)', // Same as FeedbackScreen
    padding: 'min(0.625rem, 1vh) min(1.25rem, 2vw)', // Same as FeedbackScreen
    minHeight: 'min(3.125rem, 5vh)', // Same as FeedbackScreen
    zIndex: 20,
    ...style
  };

  return (
    <div 
      className={`relative flex justify-between items-center ${className}`}
      style={baseFooterStyles}
    >
      {/* Language selector icon - always in same position */}
      <LanguageSelectorIcon 
        variant="standard" 
        delay={0.6}
      />

      {/* Pagination dots - conditional */}
      {showProgressDots ? (
        <ProgressDots
          totalQuestions={totalQuestions}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          questions={questions}
          variant={progressDotsVariant}
          style={{
            flexShrink: 0,
            marginBottom: 'min(5.625rem, 9vh)',
            marginLeft: 'min(13.75rem, 22vw)'
          }}
        />
      ) : (
        <div style={{ flex: 1 }} /> // Spacer when no progress dots
      )}

      {/* Custom content (buttons, etc.) */}
      {children}
    </div>
  );
};

export default StandardFooter;
