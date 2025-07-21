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
  style = {},
  alignProgressDots = 'center'
}) => {
  const baseFooterStyles = {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    height: 'min(4.375rem, 7vh)', 
    padding: 'min(0.625rem, 1vh) min(1.25rem, 2vw)',
    minHeight: 'min(3.125rem, 5vh)',
    zIndex: 60, // Increased to be above admin-corner-trigger (50)
    ...style
  };

  return (
    <div 
      className={`relative flex ${alignProgressDots === 'inline' && showProgressDots ? 'justify-center' : 'justify-between'} items-center ${className}`}
      style={baseFooterStyles}
    >
      {/* Language selector icon - always in same position */}
      <LanguageSelectorIcon 
        variant="standard" 
        delay={0.6}
        className="language-selector-icon-container"
        style={{
          ...((alignProgressDots === 'inline' && showProgressDots) ? { position: 'absolute', left: 'min(1.25rem, 2vw)' } : {}),
          zIndex: 70 // Ensure it's above everything else
        }}
      />

      {/* Pagination dots - conditional with alignment options */}
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
                // Inline alignment for FeedbackScreen - perfectly centered
                flexShrink: 0,
                marginBottom: 'min(6.70698984375rem, 10.73148375vh)'
              }
            : {
                // Centered positioning for QuestionScreen
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

      {/* Custom content (buttons, etc.) - positioned absolutely when progress dots are centered */}
      <div style={alignProgressDots === 'inline' && showProgressDots ? { position: 'absolute', right: 0 } : {}}>
        {children}
      </div>
    </div>
  );
};

export default StandardFooter;
