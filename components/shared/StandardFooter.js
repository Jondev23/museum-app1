// Import animation library and shared components
import ProgressDots from './ProgressDots';

// Standard footer component used across multiple screens
const StandardFooter = ({ 
  children,
  showProgressDots = false,
  totalQuestions = 5,
  currentQuestionIndex = 0,
  answers = [],
  questions = [],
  progressDotsVariant = 'default',
  className = '',
  style = {},
  alignProgressDots = 'center'
}) => {
  // Base styles for consistent footer positioning
  const baseFooterStyles = {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    height: 'min(4.375rem, 7vh)', 
    padding: 'min(0.625rem, 1vh) min(1.25rem, 2vw)',
    minHeight: 'min(3.125rem, 5vh)',
    zIndex: 20,
    ...style
  };

  return (
    // Footer container with flexible layout
    <div 
      className={`relative flex ${alignProgressDots === 'inline' && showProgressDots ? 'justify-center' : 'justify-between'} items-center ${className}`}
      style={baseFooterStyles}
    >
      {/* Language selector icon - now global, removed from footer */}
      {/* <LanguageSelectorIcon 
        variant="standard" 
        delay={0.6}
        style={alignProgressDots === 'inline' && showProgressDots ? { position: 'absolute', left: 'min(1.25rem, 2vw)' } : {}}
      /> */}

      {/* Progress dots - shown during quiz questions */}
      {showProgressDots ? (
        <ProgressDots
          totalQuestions={totalQuestions}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          questions={questions}
          variant={progressDotsVariant}
          className={alignProgressDots === 'inline' ? '' : 'absolute'}
          style={
            alignProgressDots === 'inline' 
            ? {
                // Inline alignment - reduced margin to move dots down 0.1%
                flexShrink: 0,
                marginBottom: 'min(6.83698984375rem, 11.13148375vh)'
              }
            : {
                // Absolute positioning - legacy configuration
                left: '46%',
                transform: 'translateX(calc(-50% - min(4rem, 8vw)))',
                bottom: 'min(5.625rem, 9vh)',
                zIndex: 25
              }
          }
        />
      ) : (
        <div style={{ flex: 1 }} />
      )}

      
      <div style={alignProgressDots === 'inline' && showProgressDots ? { position: 'absolute', right: 'min(6.6rem, 11vw)' } : {}}>
        {children}
      </div>
    </div>
  );
};

export default StandardFooter;
