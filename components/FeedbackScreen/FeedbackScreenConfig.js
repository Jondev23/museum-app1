import { useMemo } from 'react';


export const FEEDBACK_CONFIG = {
  ANIMATION_DURATIONS: {
    SCREEN_TRANSITION: 0.4,
    CONTAINER: 0.4,
    TITLE: 0.1,
    ANSWER: 0.2,
    MESSAGE: 0.3,
    BUTTON: 0.8,
    BUTTON_DELAY: 0.7,
  },
  COLORS: {
    CORRECT_BG: 'var(--color-feedback-correct)',
    INCORRECT_BG: 'var(--color-feedback-incorrect)',
    ANSWER_BG: 'var(--color-feedback-answer-bg)',
    ANSWER_TEXT: 'var(--color-feedback-answer-text)',
    OVERLAY: 'bg-overlay', 
  },
  SIZES: {
    BORDER_RADIUS: 'var(--border-radius-md)',
    BUTTON_BORDER_RADIUS: 'rounded-full',
  },
};

export const useFeedbackScreenStyles = (startContent, isCorrect) => {
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url(${startContent?.backgroundImage || '/images/Bild_Kutsche.webp'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }), [startContent?.backgroundImage]);

  const mainContentStyle = useMemo(() => ({
    width: '100%',
    maxWidth: 'min(127rem, 95vw)',
    paddingTop: 'min(6rem, 8vh)',
    paddingBottom: 'min(2rem, 3vh)', 
    margin: '0 auto'
  }), []);

  const feedbackContainerStyle = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'min(1.2rem, 2vw)', 
    paddingTop: 'min(2rem, 3vw)', 
    paddingBottom: 'min(2rem, 3vw)', 
    paddingLeft: 'min(1.5rem, 2.5vw)',
    paddingRight: 'min(1.5rem, 2.5vw)',
    width: '100%',
    maxWidth: 'min(75.6rem, 83.05vw)',
    height: '74vh',
    justifyContent: 'space-evenly', 
    overflow: 'hidden'
  }), []);

  const titleStyle = useMemo(() => ({
    fontSize: 'clamp(1rem, 4.84vw, 3.025rem)', 
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
    marginRight: 'min(6.43125rem, 10.5vw)',
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
