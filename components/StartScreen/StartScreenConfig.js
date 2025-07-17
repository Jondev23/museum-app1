import { useMemo } from 'react';
import { COLORS } from '../../utils/cssVariables';

// Constantes de configuración
export const START_SCREEN_CONFIG = {
  ANIMATION_DELAYS: {
    CONTENT_TRIGGER: 300,
    TITLE: 0.2,
    SUBTITLE: 0.4,
    DESCRIPTION: 0.6,
    TOUCH_INDICATOR: 1.0,
  },
  ANIMATION_DURATIONS: {
    SCREEN_TRANSITION: 0.5,
    CONTENT_FADE: 0.8,
    TOUCH_INDICATOR: 2,
  },
  SWIPE: {
    MIN_DISTANCE: 100,
  },
  TOUCH_INDICATOR: {
    ANIMATION_TYPE: "easeInOut",
    REPEAT: Infinity,
    Y_MOVEMENT: [0, -15, 0],
    SCALE_MOVEMENT: [1, 1.05, 1],
  },
};

// Hook para estilos memoizados
export const useStartScreenStyles = (startContent) => {
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url(${startContent?.backgroundImage || '/images/Bild_Kutsche.webp'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }), [startContent?.backgroundImage]);

  const containerStyle = useMemo(() => ({
    paddingTop: 'min(2rem, 4vw)',
    paddingLeft: 'min(2rem, 4vw)',
    paddingRight: 'min(2rem, 4vw)',
    paddingBottom: 'min(4rem, 8vw)'
  }), []);

  const mainCardStyle = useMemo(() => ({
    maxWidth: 'min(120rem, 95vw)',
    minHeight: '0',
    flex: '1 1 auto'
  }), []);

  const titleSectionStyle = useMemo(() => ({
    gap: 'min(0.0rem, 0vw)'
  }), []);

  const contentSectionStyle = useMemo(() => ({
    gap: 'min(4.0rem, 6.4vw)'
  }), []);

  const titleStyle = useMemo(() => ({
    fontSize: 'min(4.8rem, 9vw, 11vh)',
    lineHeight: 'min(5.4rem, 10.8vw, 12.4vh)'
  }), []);

  const subtitleStyle = useMemo(() => ({
    fontSize: 'min(2.8rem, 5.6vw, 7vh)',
    lineHeight: 'min(3.36rem, 6.72vw, 8.4vh)'
  }), []);

  const descriptionContainerStyle = useMemo(() => ({
    maxWidth: 'min(120rem, 95vw)'
  }), []);

  const highlightTextStyle = useMemo(() => ({
    fontSize: 'min(1.9rem, 3.8vw, 4.8vh)',
    lineHeight: 'min(2.66rem, 5.32vw, 6.7vh)',
    letterSpacing: 'min(0.019rem, 0.038vw, 0.048vh)'
  }), []);

  const introTextStyle = useMemo(() => ({
    fontSize: 'min(1.6rem, 3.4vw, 4.2vh)',
    lineHeight: 'min(2.38rem, 4.76vw, 5.9vh)',
    letterSpacing: 'min(0.017rem, 0.034vw, 0.042vh)'
  }), []);

  const touchIndicatorContainerStyle = useMemo(() => ({
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 'min(5.625rem, 9vh)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30,
    pointerEvents: 'none'
  }), []);

  const touchIndicatorStyle = useMemo(() => ({
    width: 'min(5.8rem, 9.6vw, 12vh)',
    height: 'min(5.8rem, 9.6vw, 12vh)',
    pointerEvents: 'auto',
    cursor: 'pointer'
  }), []);

  return {
    backgroundStyle,
    containerStyle,
    mainCardStyle,
    titleSectionStyle,
    contentSectionStyle,
    titleStyle,
    subtitleStyle,
    descriptionContainerStyle,
    highlightTextStyle,
    introTextStyle,
    touchIndicatorContainerStyle,
    touchIndicatorStyle
  };
};
