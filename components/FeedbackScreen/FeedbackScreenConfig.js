import { useMemo } from 'react';
import { COLORS } from '../../utils/cssVariables';

// Constantes de configuración
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
    CORRECT_BG: COLORS.FEEDBACK_CORRECT,
    INCORRECT_BG: COLORS.FEEDBACK_INCORRECT,
    ANSWER_BG: COLORS.FEEDBACK_ANSWER_BG,
    ANSWER_TEXT: COLORS.FEEDBACK_ANSWER_TEXT,
    OVERLAY: 'bg-black/75', 
  },
  SIZES: {
    BORDER_RADIUS: '19px',
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
    gap: 'min(2rem, 3vw)',
    paddingTop: 'min(3.24rem, 5.4vw)',
    paddingBottom: 'min(3rem, 5vw)',
    paddingLeft: 'min(1.5rem, 2.5vw)',
    paddingRight: 'min(1.5rem, 2.5vw)',
    width: '100%',
    maxWidth: 'min(75.6rem, 83.05vw)',
    height: '74vh',
    justifyContent: 'space-evenly',
    overflow: 'hidden'
  }), []);

  const titleStyle = useMemo(() => ({
    // Tamaño base del texto - se ajusta automáticamente si no cabe (21% más grande total)
    fontSize: 'min(4.84vw, 3.025rem)',
    lineHeight: 'min(6.05vw, 3.9325rem)',
    // Dimensiones fijas como porcentaje de la pantalla
    width: '100%', // Ocupa 85% del ancho disponible
    height: '15vh', // Ocupa 15% de la altura de la pantalla
    maxWidth: '100%',
    overflowWrap: 'break-word',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    // Propiedades para ajuste automático de texto
    wordBreak: 'break-word',
    hyphens: 'auto'
  }), []);

  const answerButtonStyle = useMemo(() => ({
    // Dimensiones fijas como porcentaje de la pantalla
    width: '68%', // Ocupa 73% del ancho disponible
    height: '10vh', // Ocupa 9% de la altura de la pantalla
    // Valores mínimos para compatibilidad
    minWidth: 'min(40.74rem, 81.48vw)',
    minHeight: 'min(3.0174375rem, 4.2244125vh)',
    maxWidth: '100%',
    // Propiedades para centrado y ajuste automático
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }), []);

  const answerTextStyle = useMemo(() => ({
    color: FEEDBACK_CONFIG.COLORS.ANSWER_TEXT,
    // Tamaño base del texto - se ajusta automáticamente si no cabe (10% más grande)
    fontSize: 'min(3.96vw, 1.98rem)',
    lineHeight: 'min(4.95vw, 2.475rem)',
    maxWidth: '100%',
    overflowWrap: 'break-word',
    // Propiedades para ajuste automático de texto
    wordBreak: 'break-word',
    hyphens: 'auto',
    textAlign: 'center'
  }), []);

  const messageContainerStyle = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0',
    // Dimensiones fijas como porcentaje de la pantalla
    width: '100%', // Ocupa 85% del ancho disponible
    height: '35vh', // Ocupa 35% de la altura de la pantalla
    justifyContent: 'flex-start',
    overflow: 'hidden'
  }), []);

  const messageStyle = useMemo(() => ({
    // Tamaño base del texto - se ajusta automáticamente si no cabe (43% más grande total)
    fontSize: 'min(3.8657vw, 1.9329rem)',
    lineHeight: 'min(4.2523vw, 2.1262rem)',
    maxWidth: '100%',
    overflowWrap: 'break-word',
    margin: '0',
    // Propiedades para ajuste automático de texto
    wordBreak: 'break-word',
    hyphens: 'auto',
    textAlign: 'center'
  }), []);

  const explanationStyle = useMemo(() => ({
    // Tamaño base del texto - se ajusta automáticamente si no cabe (15% más grande)
    fontSize: 'min(3.8254vw, 1.4345rem)',
    lineHeight: 'min(4.7817vw, 2.3909rem)',
    maxWidth: '70%',
    overflowWrap: 'break-word',
    margin: '0',
    
    // Propiedades para ajuste automático de texto
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
    minWidth: 'min(11.25rem, 18vw)',
    minHeight: 'min(3rem, 5vh)',
    background: 'transparent',
    border: 'none',
    justifyContent: 'flex-start',
    gap: 'min(1rem, 2vw)'
  }), []);

  const buttonTextStyle = useMemo(() => ({
    fontSize: 'min(2.31vw, 1.23375rem)',
    lineHeight: 'min(5vh, 3rem)',
    textTransform: 'uppercase'
  }), []);

  const arrowStyle = useMemo(() => ({
    // Escalado proporcional usando viewport units
    width: 'min(6vw, 4.977rem, 8vh)',
    height: 'min(6vh, 5.445rem, 8vh)',
    flexShrink: 0,
    // Tamaños mínimos para pantallas pequeñas
    minWidth: 'min(3.114rem, 5vw)',
    minHeight: 'min(3.114rem, 5vh)',
    // Mantener aspect ratio
    aspectRatio: '1/1',
    objectFit: 'contain'
  }), []);

  const feedbackContainerClassName = useMemo(() => {
    const bgColor = isCorrect ? COLORS.FEEDBACK_CORRECT : COLORS.FEEDBACK_INCORRECT;
    return `rounded-[19px]`;
  }, [isCorrect]);

  const feedbackContainerStyleWithBg = useMemo(() => ({
    ...feedbackContainerStyle,
    backgroundColor: isCorrect ? COLORS.FEEDBACK_CORRECT : COLORS.FEEDBACK_INCORRECT,
  }), [feedbackContainerStyle, isCorrect]);

  return {
    backgroundStyle,
    mainContentStyle,
    feedbackContainerStyle: feedbackContainerStyleWithBg,
    feedbackContainerClassName,
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
