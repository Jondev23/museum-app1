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
    gap: 'min(1.2rem, 2vw)', // Gap moderado para balance
    paddingTop: 'min(2rem, 3vw)', // Padding restaurado
    paddingBottom: 'min(2rem, 3vw)', 
    paddingLeft: 'min(1.5rem, 2.5vw)',
    paddingRight: 'min(1.5rem, 2.5vw)',
    width: '100%',
    maxWidth: 'min(75.6rem, 83.05vw)',
    height: '74vh',
    justifyContent: 'space-evenly', // Distribución equilibrada
    overflow: 'hidden'
  }), []);

  const titleStyle = useMemo(() => ({
    // Tamaño base del texto con rango más amplio para ajuste automático
    fontSize: 'clamp(1rem, 4.84vw, 3.025rem)', // Tamaño mínimo más pequeño
    lineHeight: 'clamp(1.2rem, 6.05vw, 3.9325rem)',
    // Dimensiones flexibles para adaptarse al contenido
    width: '95%',
    minHeight: 'auto', 
    maxHeight: '35vh', // Límite razonable para títulos muy largos
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
    flex: '0 1 auto' // Puede encogerse si es necesario
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
    overflow: 'visible',
    flex: '0 0 auto' // Tamaño fijo, no se adapta
  }), []);

  const answerTextStyle = useMemo(() => ({
    color: FEEDBACK_CONFIG.COLORS.ANSWER_TEXT,
    // Solo conservamos propiedades específicas para el centrado
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto',
    whiteSpace: 'normal'
  }), []);

  const messageContainerStyle = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%', 
    minHeight: 'auto',
    maxHeight: '30vh', // Límite para no dominar el espacio
    justifyContent: 'flex-start',
    overflow: 'visible',
    flex: '0 1 auto' // Puede encogerse si es necesario, no crece
  }), []);

  const messageStyle = useMemo(() => ({
    // Mismo tamaño base para ambos textos
    fontSize: 'clamp(0.8rem, 3.2vw, 1.6rem)',
    lineHeight: 'clamp(1rem, 4vw, 2rem)',
    maxWidth: '100%',
    overflowWrap: 'break-word',
    margin: '0',
    wordBreak: 'break-word',
    hyphens: 'auto',
    textAlign: 'center',
    fontWeight: '700' // Más grueso para el mensaje principal
  }), []);

  const explanationStyle = useMemo(() => ({
    // Mismo tamaño que messageStyle pero peso normal
    fontSize: 'clamp(0.8rem, 3.2vw, 1.6rem)',
    lineHeight: 'clamp(1rem, 4vw, 2rem)',
    maxWidth: '85%',
    overflowWrap: 'break-word',
    margin: '0',
    wordBreak: 'break-word',
    hyphens: 'auto',
    textAlign: 'center',
    fontWeight: '400' // Peso normal para la explicación
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
