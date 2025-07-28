// Import React hooks for memoization
import { useMemo } from 'react';

// Configuration constants for feedback screen animations and styling
export const FEEDBACK_CONFIG = {
  // Animation duration timings in seconds
  ANIMATION_DURATIONS: {
    SCREEN_TRANSITION: 0.4, // Screen transition duration
    CONTAINER: 0.4,         // Container animation duration
    TITLE: 0.1,             // Title animation duration
    ANSWER: 0.2,            // Answer reveal animation
    MESSAGE: 0.3,           // Feedback message animation
    BUTTON: 0.8,            // Continue button animation
    BUTTON_DELAY: 0.7,      // Delay before button appears
  },
  
  // Color configuration using CSS custom properties
  COLORS: {
    CORRECT_BG: 'var(--color-feedback-correct)',     // Green for correct answers
    INCORRECT_BG: 'var(--color-feedback-incorrect)', // Red for incorrect answers
    ANSWER_BG: 'var(--color-feedback-answer-bg)',    // Answer background color
    ANSWER_TEXT: 'var(--color-feedback-answer-text)', // Answer text color
    OVERLAY: 'bg-overlay',                            // Background overlay class
  },
  
  // Size and styling constants
  SIZES: {
    BORDER_RADIUS: 'var(--border-radius-md)',  // Medium border radius
    BUTTON_BORDER_RADIUS: 'rounded-full',      // Full rounded button style
  },
};

// Custom hook for feedback screen styles with dynamic correct/incorrect theming
export const useFeedbackScreenStyles = (startContent, isCorrect) => {
  // Background image style with fallback
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url(${startContent?.backgroundImage || '/images/Bild_Kutsche.webp'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }), [startContent?.backgroundImage]);

  // Main content container styles
  const mainContentStyle = useMemo(() => ({
    width: '100%',
    maxWidth: 'min(127rem, 84vw)',    // Responsive max width - increased to 100vw to use full width
    paddingTop: 'min(6rem, 8vh)',     // Responsive top padding
    paddingBottom: 'min(2rem, 3vh)',  // Responsive bottom padding
    margin: '0 auto'                   // Center horizontally
  }), []);

  // Feedback container styles with responsive spacing
  const feedbackContainerStyle = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'min(1.2rem, 2vw)',          // Responsive gap between elements
    paddingTop: 'min(2rem, 3vw)',     // Responsive top padding
    paddingBottom: 'min(2rem, 3vw)',  // Responsive bottom padding
    paddingLeft: '0',                 // No left padding
    paddingRight: '0',                // No right padding
    width: '100%',
    maxWidth: '100%',                 // Use full width available
    height: '74vh',
    justifyContent: 'space-evenly', 
    overflow: 'hidden'
  }), []);

  const titleStyle = useMemo(() => ({
    fontSize: '3.375rem', // Fixed size - 54px
    lineHeight: 'clamp(1.2rem, 6.05vw, 3.9325rem)',
    width: '95%',
    minHeight: 'auto', 
    maxHeight: '35vh', 
    maxWidth: '80%',
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
    minWidth: 'min(42.3rem, 63vw, 80vh)',
    minHeight: 'min(4.62rem, 6.93vh, 8vw)',
    maxWidth: '90vw',
    width: 'auto', 
    height: 'auto', 
    padding: 'min(1rem, 1.5vh, 2vw) min(4rem, 5vw, 6vh)',
    borderRadius: 'min(4.62rem, 6.93vh, 8vw)',
    border: 'min(0.1125rem, 0.225vw, 0.3vh) solid var(--color-neutral-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    gap: '0.5rem',
    width: '100%', 
    minHeight: 'auto',
    maxHeight: '30vh', 
    justifyContent: 'flex-start',
    overflow: 'visible',
    flex: '0 1 auto' 
  }), []);

  const messageStyle = useMemo(() => ({
    fontSize: 'clamp(0.8rem, 3.2vw, 1.6rem)',
    lineHeight: 'clamp(1rem, 4vw, 2rem)',
    maxWidth: '100%',
    overflowWrap: 'break-word',
    margin: '0',
    wordBreak: 'break-word',
    hyphens: 'auto',
    textAlign: 'center',
    fontWeight: '700' 
  }), []);

  const explanationStyle = useMemo(() => ({
    fontSize: 'clamp(0.8rem, 3.2vw, 1.6rem)',
    lineHeight: 'clamp(1rem, 4vw, 2rem)',
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
    marginRight: 'min(3.43125rem, 5.5vw)', 
    marginBottom: 'min(6.3rem, 10vh)'
  }), []);

  const buttonStyle = useMemo(() => ({
    minWidth: 'var(--feedback-button-width)',
    minHeight: 'var(--feedback-button-height)',
    background: 'transparent',
    border: 'none',
    justifyContent: 'flex-start',
    gap: 'var(--feedback-button-gap)'
  }), []);

  const buttonTextStyle = useMemo(() => ({
    fontSize: 'var(--feedback-button-text-size)',
    lineHeight: 'var(--feedback-button-text-line-height)',
    textTransform: 'uppercase'
  }), []);

  const arrowStyle = useMemo(() => ({
    
    width: 'var(--feedback-arrow-width)',
    height: 'var(--feedback-arrow-height)',
    flexShrink: 0,
    
    minWidth: 'var(--feedback-arrow-min-width)',
    minHeight: 'var(--feedback-arrow-min-height)',
    
    aspectRatio: '1/1',
    objectFit: 'contain'
  }), []);

  const feedbackContainerStyleWithBg = useMemo(() => ({
    ...feedbackContainerStyle,
    backgroundColor: isCorrect ? 'var(--color-feedback-correct)' : 'var(--color-feedback-incorrect)',
    borderRadius: FEEDBACK_CONFIG.SIZES.BORDER_RADIUS,
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
