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
    flex: 'none'
  }), []);

  const titleSectionStyle = useMemo(() => ({
    gap: '0'
  }), []);

  const contentSectionStyle = useMemo(() => ({
    gap: '0'
  }), []);

  const titleStyle = useMemo(() => ({
    // Tamaño optimizado para pantalla completa
    fontSize: 'min(8.1vw, 4.32rem)',
    lineHeight: 'min(9.72vw, 4.86rem)',
    // Dimensiones como porcentaje de la pantalla para coherencia
    width: '70%',
    maxWidth: '100%',
    height: '10vh',
    maxHeight: '20vh',
    textAlign: 'center'
  }), []);

  const subtitleStyle = useMemo(() => ({
    // Tamaño optimizado para subtítulo
    fontSize: 'min(5.04vw, 2.52rem)',
    lineHeight: 'min(6.048vw, 3.024rem)',
    // Dimensiones como porcentaje de la pantalla para coherencia
    width: '70%',
    maxWidth: '100%',
    height: '10vh',
    maxHeight: '20vh',
    textAlign: 'center',
    wordBreak: 'break-word',
    hyphens: 'auto'
  }), []);

  const descriptionContainerStyle = useMemo(() => ({
    // Dimensiones como porcentaje de la pantalla para coherencia
    width: '80%',
    maxWidth: '100%',
    height: '40vh',
    maxHeight: '40vh',
    textAlign: 'center'
  }), []);

  const highlightTextStyle = useMemo(() => ({
    // Tamaño optimizado para texto destacado
    fontSize: 'min(2.7702vw, 1.3851rem)',
    lineHeight: 'min(3.87828vw, 1.93914rem)',
    letterSpacing: 'min(0.027702vw, 0.013851rem)',
    maxWidth: '100%',
    textAlign: 'center'
  }), []);

  const introTextStyle = useMemo(() => ({
    // Tamaño optimizado para texto introductorio
    fontSize: 'min(2.4786vw, 1.1664rem)',
    lineHeight: 'min(3.47004vw, 1.73502rem)',
    letterSpacing: 'min(0.024786vw, 0.012393rem)',
    maxWidth: '100%',
    textAlign: 'center'
  }), []);

  const touchIndicatorContainerStyle = useMemo(() => ({
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
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
