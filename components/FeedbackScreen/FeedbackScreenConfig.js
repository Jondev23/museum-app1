import { useMemo } from 'react';


export const FEEDBACK_CONFIG = {
  ANIMATION_DURATIONS: {
    SCREEN_TRANSITION: 0.3,
    CONTAINER: 0.3,
    TITLE: 0.1,
    ANSWER: 0.2,
    MESSAGE: 0.3,
    BUTTON: 0.8,
    BUTTON_DELAY: 0.7,
    ARROW_ANIMATION: 2,
    ARROW_REPEAT_DELAY: 2,
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

// Hook para estilos memoizados
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
    gap: 'min(1.5rem, 2.5vw)',
    paddingTop: 'min(3.24rem, 5.4vw)',
    paddingBottom: 'min(3rem, 5vw)',
    paddingLeft: 'min(1.5rem, 2.5vw)',
    paddingRight: 'min(1.5rem, 2.5vw)',
    width: '100%',
    maxWidth: 'min(75.6rem, 83.05vw)',
    height: '74vh',
    justifyContent: 'flex-start',
    overflow: 'hidden'
  }), []);

  const titleStyle = useMemo(() => ({
    // Tamaño base del texto con rango más amplio para ajuste automático
    fontSize: 'clamp(1.2rem, 4.84vw, 3.025rem)',
    lineHeight: 'clamp(1.4rem, 6.05vw, 3.9325rem)',
    // Dimensiones flexibles para adaptarse al contenido
    width: '85%',
    minHeight: 'auto', 
    maxHeight: 'none', 
    maxWidth: '100%',
    overflowWrap: 'break-word',
    overflow: 'visible',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    wordBreak: 'break-word',
    hyphens: 'auto',
    padding: '0.5rem'
  }), []);

  const answerButtonStyle = useMemo(() => ({
    // Usar el mismo sistema adaptativo que QuestionScreen
    minWidth: 'min(42.3rem, 63vw, 80vh)',
    minHeight: 'min(4.62rem, 6.93vh, 8vw)',
    maxWidth: '90vw',
    width: 'auto', // Permitir que se ajuste al contenido
    height: 'auto', // Permitir que crezca con el contenido
    padding: 'min(1rem, 1.5vh, 2vw) min(4rem, 5vw, 6vh)',
    borderRadius: 'min(4.62rem, 6.93vh, 8vw)',
    border: 'min(0.1125rem, 0.225vw, 0.3vh) solid var(--color-neutral-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible'
  }), []);

  const answerTextStyle = useMemo(() => ({
    color: FEEDBACK_CONFIG.COLORS.ANSWER_TEXT,
    // Usar la misma tipografía que QuestionScreen
    fontSize: 'var(--typography-antworten-buttons-font-size)',
    lineHeight: 'var(--typography-antworten-buttons-line-height)',
    fontWeight: 'var(--typography-antworten-buttons-font-weight)',
    fontFamily: 'var(--typography-antworten-buttons-font-family)',
    letterSpacing: 'var(--typography-antworten-buttons-letter-spacing)',
    width: '100%',
    maxWidth: '100%',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto',
    textAlign: 'center',
    whiteSpace: 'normal'
  }), []);

  const messageContainerStyle = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%', 
    minHeight: '20vh',
    maxHeight: 'none', 
    justifyContent: 'flex-start',
    overflow: 'visible',
    flex: 1
  }), []);

  const messageStyle = useMemo(() => ({
    // Rango más amplio para ajuste automático del texto
    fontSize: 'clamp(0.8rem, 3.8657vw, 1.9329rem)',
    lineHeight: 'clamp(1rem, 4.2523vw, 2.1262rem)',
    maxWidth: '100%',
    overflowWrap: 'break-word',
    margin: '0',
    wordBreak: 'break-word',
    hyphens: 'auto',
    textAlign: 'center'
  }), []);

  const explanationStyle = useMemo(() => ({
    // Rango más amplio para texto de explicación largo
    fontSize: 'clamp(0.7rem, 3.8254vw, 1.4345rem)',
    lineHeight: 'clamp(0.9rem, 4.7817vw, 2.3909rem)',
    maxWidth: '85%',
    overflowWrap: 'break-word',
    margin: '0',
    wordBreak: 'break-word',
    hyphens: 'auto',
    textAlign: 'center'
  }), []);

  const buttonContainerStyle = useMemo(() => ({
    flexShrink: 0,
    marginRight: 'min(6.43125rem, 10.5vw)',
    marginBottom: 'min(6.8625rem, 10.8vh)'
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
