import { useMemo, useCallback } from 'react';
import { COLORS } from '../../utils/cssVariables';

// Constantes de configuración
export const QUESTION_CONFIG = {
  TOTAL_QUESTIONS: 5,
  ANSWER_DELAY: 500,
  ANIMATION_DELAYS: {
    TITLE: 0.2,
    BUTTONS: 0.4,
    BUTTON_STAGGER: 0.1,
    BUTTON_BASE: 0.6,
  },
  ANIMATION_DURATIONS: {
    SCREEN_TRANSITION: 0.5,
    TITLE: 0.6,
    BUTTONS: 0.6,
    BUTTON_INDIVIDUAL: 0.4,
  },
  COLORS: {
    BUTTON_BORDER: COLORS.LIGHT_GRAY,
    BUTTON_TEXT: COLORS.LIGHT_GRAY,
  },
};

// Hook para estilos memoizados
export const useQuestionScreenStyles = (startContent) => {
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url(${startContent?.backgroundImage || '/images/Bild_Kutsche.webp'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }), [startContent?.backgroundImage]);

  const mainContentStyle = useMemo(() => ({
    width: '100%',
    maxWidth: 'min(120rem, 95vw)',
    gap: 'min(1.5rem, 3vw)',
    paddingTop: 'min(4rem, 6vh)',
    paddingBottom: 'min(0.5rem, 1vh)',
    paddingLeft: 'min(4rem, 6vw)',
    paddingRight: 'min(4rem, 6vw)',
    margin: '0 auto'
  }), []);

  const cardContainerStyle = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'min(1.5rem, 3vw)',
    padding: 'min(2rem, 4vw)',
    width: '100%',
    borderRadius: 'min(1.875rem, 4vw)',
    overflow: 'hidden',
    border: '0',
    backgroundColor: 'transparent',
    marginTop: 'min(3.08rem, 4.62vh)'
  }), []);

  const contentStyle = useMemo(() => ({
    padding: '0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'min(3rem, 4.5vw)'
  }), []);

  const titleStyle = useMemo(() => ({
    position: 'relative',
    alignSelf: 'stretch',
    fontSize: 'min(4.28vw, 2.14rem)',
    lineHeight: 'min(5.13vw, 2.78rem)',
    marginBottom: 'min(3rem, 4vh)',
    marginLeft: 'min(4rem, 5vw, 6vh)',
    marginRight: 'min(4rem, 5vw, 6vh)',
    boxSizing: 'border-box',
    maxHeight: '20vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }), []);

  const answersContainerStyle = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 'min(2.52rem, 3.6vh)',
    width: '100%',
    alignItems: 'center'
  }), []);

  const progressDotsStyle = useMemo(() => ({
    left: '46%',
    bottom: 'min(5.625rem, 9vh)',
    transform: 'translateX(calc(-50% - min(4rem, 8vw)))',
    zIndex: 30
  }), []);

  const getButtonStyle = useCallback(() => ({
    display: 'inline-flex',
    minWidth: 'min(42.3rem, 63vw, 80vh)',
    minHeight: 'min(4.62rem, 6.93vh, 8vw)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'min(0.5rem, 1vw)',
    padding: 'min(1rem, 1.5vh, 2vw) min(4rem, 5vw, 6vh)',
    borderRadius: 'min(4.62rem, 6.93vh, 8vw)',
    border: `min(0.1125rem, 0.225vw, 0.3vh) solid ${COLORS.LIGHT_GRAY}`,
    position: 'relative'
  }), []);

  const textStyle = useMemo(() => ({
    position: 'relative',
    width: '100%',
    color: COLORS.LIGHT_GRAY,
    fontSize: 'min(3.40vw, 1.70rem)',
    lineHeight: 'min(4.25vw, 2.13rem)',
    textAlign: 'center',
    wordWrap: 'break-word',
    hyphens: 'auto',
    maxWidth: '100%'
  }), []);

  return {
    backgroundStyle,
    mainContentStyle,
    cardContainerStyle,
    contentStyle,
    titleStyle,
    answersContainerStyle,
    progressDotsStyle,
    getButtonStyle,
    textStyle
  };
};
