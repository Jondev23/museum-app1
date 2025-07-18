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
    gap: 'min(1.5rem, 3vw)', 
    paddingTop: 'min(6rem, 8vh)',
    paddingBottom: 'min(2rem, 3vh)', 
    paddingLeft: 'min(5rem, 6vw)', 
    paddingRight: 'min(5rem, 6vw)',
    margin: '0 auto'
  }), []);

  const feedbackContainerStyle = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'min(2rem, 3vw)',
    padding: 'min(3rem, 5vw)',
    width: '100%',
    maxWidth: 'min(75.6rem, 83.05vw)',
    height: '74vh',
    justifyContent: 'space-evenly',
    overflow: 'hidden'
  }), []);

  const titleStyle = useMemo(() => ({
    fontSize: 'min(4vw, 2.5rem)',
    lineHeight: 'min(5vw, 3.25rem)',
    maxWidth: '100%',
    overflowWrap: 'break-word',
    maxHeight: '15vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }), []);

  const answerButtonStyle = useMemo(() => ({
    minWidth: 'min(40.74rem, 81.48vw)',
    minHeight: 'min(3.0174375rem, 4.2244125vh)',
    padding: 'min(1.96558rem, 1.81046vh) min(2rem, 4vw)',
    maxWidth: '100%'
  }), []);

  const answerTextStyle = useMemo(() => ({
    color: FEEDBACK_CONFIG.COLORS.ANSWER_TEXT,
    fontSize: 'min(3.6vw, 1.8rem)',
    lineHeight: 'min(4.5vw, 2.25rem)',
    maxWidth: '100%',
    overflowWrap: 'break-word'
  }), []);

  const messageContainerStyle = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0',
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 'min(0.5rem, 1vh)',
    maxHeight: '25vh',
    overflow: 'hidden'
  }), []);

  const messageStyle = useMemo(() => ({
    fontSize: 'min(3.0528vw, 1.5264rem)',
    lineHeight: 'min(3.8151vw, 1.908rem)',
    maxWidth: '100%',
    overflowWrap: 'break-word',
    margin: '0'
  }), []);

  const explanationStyle = useMemo(() => ({
    fontSize: 'min(3.3264vw, 1.2474rem)',
    lineHeight: 'min(4.158vw, 2.079rem)',
    maxWidth: '100%',
    overflowWrap: 'break-word',
    margin: '0',
    paddingLeft: 'min(7rem, 14vw)',
    paddingRight: 'min(7rem, 14vw)'
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
    lineHeight: 'min(11vh, 7rem)',
    textTransform: 'uppercase'
  }), []);

  const arrowStyle = useMemo(() => ({
    width: 'min(4.977rem, 9.333vw, 6.219vh)',
    height: 'min(5.445rem, 9.333vh, 6.219vh)',
    flexShrink: 0,
    minWidth: '3.114rem',
    minHeight: '3.114rem'
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
