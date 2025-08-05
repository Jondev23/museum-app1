// Import React hooks for memoization
import { useMemo } from 'react';

// Configuration constants for feedback screen styling
export const FEEDBACK_CONFIG = {
 
  // Color configuration using CSS custom properties
  COLORS: {
    CORRECT_BG: 'var(--color-feedback-correct)',    
    INCORRECT_BG: 'var(--color-feedback-incorrect)', 
    ANSWER_BG: 'var(--color-feedback-answer-bg)',    
    ANSWER_TEXT: 'var(--color-feedback-answer-text)', 
    OVERLAY: 'bg-overlay',                            
  },
  
  // Size and styling constants
  SIZES: {
    BORDER_RADIUS: 'var(--border-radius-md)',  
    BUTTON_BORDER_RADIUS: 'rounded-full',      
  },
};

// Custom hook for feedback screen styles with dynamic correct/incorrect theming
export const useFeedbackScreenStyles = (startContent, isCorrect) => {
  // Background image style with fallback
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url(${startContent?.backgroundImage || './images/Bild_Kutsche.webp'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }), [startContent?.backgroundImage]);

  // Main content container styles
  const mainContentStyle = useMemo(() => ({
    width: '100%',
    
    paddingTop: '5rem',     
    paddingBottom: 'min(2rem, 3vh)',  
    paddingLeft: '10rem',             
    paddingRight: '10rem',            
    margin: '0 auto'                  
  }), []);

  // Feedback container styles with responsive spacing
  const feedbackContainerStyle = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'min(1.2rem, 2vw)',          
    paddingTop: 'min(2rem, 3vw)',     
    paddingBottom: 'min(2rem, 3vw)',  
    paddingLeft: '0',                 
    paddingRight: '0',                
    width: '100%',
    maxWidth: '100%',                
    height: '74vh',
    justifyContent: 'space-evenly', 
    overflow: 'hidden'
  }), []);

  const titleStyle = useMemo(() => ({
    width: '100%',
    minHeight: 'auto', 
    maxHeight: '35vh', 
    maxWidth: '100%',
    overflowWrap: 'break-word',
    overflow: 'visible', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    wordBreak: 'break-word',
    hyphens: 'auto',
    padding: '0.5rem',
    flex: '0 1 auto' 
  }), []);

  const answerButtonStyle = useMemo(() => ({
    minWidth: 'min(63.36rem, 58vw, 75vh)',
    height: '5rem',
    maxWidth: '90vw',
    width: 'auto', 
    paddingTop: '1.4rem',
    paddingBottom: '0.7rem',
    paddingLeft: 'min(4rem, 5vw, 6vh)',
    paddingRight: 'min(4rem, 5vw, 6vh)',
    borderRadius: 'min(7.3152rem, 6.93vh, 8vw)',
    border: 'min(0.1125rem, 0.225vw, 0.3vh) solid var(--color-neutral-light)',
    display: 'flex',
    overflow: 'visible',
    flex: '0 0 auto'
  }), []);

  const answerTextStyle = useMemo(() => ({
    color: FEEDBACK_CONFIG.COLORS.ANSWER_TEXT,
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto',
    whiteSpace: 'normal',
    transform: 'translateY(5%)'
  }), []);

  const messageContainerStyle = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', 
    minHeight: 'auto',
    maxHeight: '30vh', 
    justifyContent: 'flex-start',
    overflow: 'visible',
    flex: '0 1 auto' 
  }), []);

  const messageStyle = useMemo(() => ({
    fontSize: '2.25rem', // Fixed size - 36px
    lineHeight: '2.7rem', // Fixed proportional line height
    maxWidth: '100%',
    overflowWrap: 'break-word',
    margin: '0',
    wordBreak: 'break-word',
    hyphens: 'auto',
    textAlign: 'center',
    fontWeight: '700' 
  }), []);

  const explanationStyle = useMemo(() => ({
    fontSize: '2.25rem', // Fixed size - 36px
    lineHeight: '2.7rem', // Fixed proportional line height
    maxWidth: '85%',
    overflowWrap: 'break-word',
    margin: '0',
    wordBreak: 'break-word',
    hyphens: 'auto',
    textAlign: 'center',
    fontWeight: '400' 
  }), []);

  const buttonContainerStyle = useMemo(() => ({
    flexShrink: 0,
    marginRight: 'min(8.8rem, 11.3vw)', 
    marginBottom: '5.4rem'
  }), []);

  const buttonStyle = useMemo(() => ({
    background: 'transparent',
    border: 'none',
    justifyContent: 'flex-start',
    gap: '1rem'
  }), []);

  const buttonTextStyle = useMemo(() => ({
    textTransform: 'uppercase'
  }), []);

  const arrowStyle = useMemo(() => ({
    width: '5.01688rem',
    height: '2.71563rem',
    flexShrink: 0,
    minWidth: '5.01688rem',
    minHeight: '2.71563rem',
    objectFit: 'contain'
  }), []);

  const feedbackContainerStyleWithBg = useMemo(() => ({
    ...feedbackContainerStyle,
    backgroundColor: isCorrect ? 'var(--color-feedback-correct)' : 'var(--color-feedback-incorrect)',
    borderRadius: '1.875rem',
    paddingLeft: '8rem',
    paddingRight: '8rem',
  }), [feedbackContainerStyle, isCorrect]);

  return {
    backgroundStyle,
    mainContentStyle,
    feedbackContainerStyle: feedbackContainerStyleWithBg,
    titleStyle,
    answerButtonStyle,
    answerTextStyle,
    messageContainerStyle,
    messageStyle,
    explanationStyle,
    buttonContainerStyle,
    buttonStyle,
    buttonTextStyle,
    arrowStyle
  };
};
