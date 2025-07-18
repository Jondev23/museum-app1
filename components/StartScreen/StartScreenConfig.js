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

  const containerStyle = useMemo(() => ({}), []);

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
    // Usando CSS custom properties para valores responsivos
    fontSize: 'var(--font-size-title)',
    lineHeight: 'var(--line-height-title)',
    // Dimensiones como porcentaje de la pantalla para coherencia
    width: '70%',
    height: '10vh',
    maxHeight: '20vh'
  }), []);

  const subtitleStyle = useMemo(() => ({
    // Usando CSS custom properties para valores responsivos
    fontSize: 'var(--font-size-subtitle)',
    lineHeight: 'var(--line-height-subtitle)',
    // Dimensiones como porcentaje de la pantalla para coherencia
    width: '70%',
    height: '10vh',
    maxHeight: '20vh',
    wordBreak: 'break-word',
    hyphens: 'auto'
  }), []);

  const descriptionContainerStyle = useMemo(() => ({
    // Dimensiones como porcentaje de la pantalla para coherencia
    width: '80%',
    height: '40vh',
    maxHeight: '40vh'
  }), []);

  const highlightTextStyle = useMemo(() => ({
    // Usando CSS custom properties para valores responsivos
    fontSize: 'var(--font-size-highlight)',
    lineHeight: 'var(--line-height-highlight)',
    letterSpacing: 'var(--letter-spacing-highlight)'
  }), []);

  const introTextStyle = useMemo(() => ({
    // Usando CSS custom properties para valores responsivos
    fontSize: 'var(--font-size-intro)',
    lineHeight: 'var(--line-height-intro)',
    letterSpacing: 'var(--letter-spacing-intro)'
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
