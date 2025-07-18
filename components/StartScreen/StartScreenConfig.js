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
    // Tamaño base del texto - se ajusta automáticamente si no cabe
    fontSize: 'min(5.5vw, 3.5rem)',
    lineHeight: 'min(6.6vw, 4.2rem)',
    // Dimensiones como porcentaje de la pantalla para coherencia
    width: '70%',
    maxWidth: '100%',
    maxHeight: '15vh',
    textAlign: 'center'
  }), []);

  const subtitleStyle = useMemo(() => ({
    // Tamaño base del texto - se ajusta automáticamente si no cabe
    fontSize: 'min(3.2vw, 2.1rem)',
    lineHeight: 'min(3.8vw, 2.5rem)',
    // Dimensiones como porcentaje de la pantalla para coherencia
    width: '70%',
    maxWidth: '100%',
    maxHeight: '12vh',
    textAlign: 'center',
    wordBreak: 'break-word',
    hyphens: 'auto'
  }), []);

  const descriptionContainerStyle = useMemo(() => ({
    // Dimensiones como porcentaje de la pantalla para coherencia
    width: '80%',
    maxWidth: '100%',
    maxHeight: '50vh',
    textAlign: 'center'
  }), []);

  const highlightTextStyle = useMemo(() => ({
    // Tamaño base del texto - se ajusta automáticamente si no cabe
    fontSize: 'min(2.8vw, 1.6rem)',
    lineHeight: 'min(3.5vw, 2.0rem)',
    letterSpacing: 'min(0.028vw, 0.016rem)',
    maxWidth: '100%',
    textAlign: 'center'
  }), []);

  const introTextStyle = useMemo(() => ({
    // Tamaño base del texto - se ajusta automáticamente si no cabe
    fontSize: 'min(2.5vw, 1.4rem)',
    lineHeight: 'min(3.1vw, 1.75rem)',
    letterSpacing: 'min(0.025vw, 0.014rem)',
    maxWidth: '100%',
    textAlign: 'center'
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
    // Escalado proporcional usando viewport units para coherencia - más grande
    width: 'min(12vw, 10rem, 18vh)',
    height: 'min(12vh, 8rem, 16vh)',
    // Mantener aspect ratio
    aspectRatio: '1/1',
    objectFit: 'contain',
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
