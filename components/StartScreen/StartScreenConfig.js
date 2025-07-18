import { useMemo } from 'react';

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
    // Usando tokens oficiales de Figma para Head & Auswertung
    fontSize: 'var(--typography-head-font-size)',
    lineHeight: 'var(--typography-head-line-height)',
    fontFamily: 'var(--typography-head-font-family)',
    fontWeight: 'var(--typography-head-font-weight)',
    fontStyle: 'var(--typography-head-font-style)',
    // Dimensiones responsivas
    width: '70%',
    height: '10vh',
    maxHeight: '20vh'
  }), []);

  const subtitleStyle = useMemo(() => ({
    // Usando tokens oficiales de Figma para Subline
    fontSize: 'var(--typography-subline-font-size)',
    lineHeight: 'var(--typography-subline-line-height)',
    fontFamily: 'var(--typography-subline-font-family)',
    fontWeight: 'var(--typography-subline-font-weight)',
    fontStyle: 'var(--typography-subline-font-style)',
    // Dimensiones responsivas
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
    // Usando tokens oficiales de Figma para Antworten Buttons
    fontSize: 'var(--typography-antworten-buttons-font-size)',
    lineHeight: 'var(--typography-antworten-buttons-line-height)',
    fontFamily: 'var(--typography-antworten-buttons-font-family)',
    fontWeight: 'var(--typography-antworten-buttons-font-weight)',
    fontStyle: 'var(--typography-antworten-buttons-font-style)',
    letterSpacing: 'var(--typography-antworten-buttons-letter-spacing)'
  }), []);

  const introTextStyle = useMemo(() => ({
    // Usando tokens oficiales de Figma para Antwort Fließ
    fontSize: 'var(--typography-antwort-fliess-font-size)',
    lineHeight: 'var(--typography-antwort-fliess-line-height)',
    fontFamily: 'var(--typography-antwort-fliess-font-family)',
    fontWeight: 'var(--typography-antwort-fliess-font-weight)',
    fontStyle: 'var(--typography-antwort-fliess-font-style)',
    letterSpacing: 'var(--typography-antwort-fliess-letter-spacing)'
  }), []);

  const touchIndicatorContainerStyle = useMemo(() => ({
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 'var(--spacing-sm)',
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
