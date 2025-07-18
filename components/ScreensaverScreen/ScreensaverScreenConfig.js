import { useMemo } from 'react';

// Constantes de configuración
export const SCREENSAVER_CONFIG = {
  ANIMATION_DELAYS: {
    TITLE: 0.5,
    TOUCH_INDICATOR: 1.0,
    TOUCH_ANIMATION: 0.5,
  },
  ANIMATION_DURATIONS: {
    SCREEN_TRANSITION: 1.0,
    TITLE_PULSE: 3.0,
    TOUCH_BOUNCE: 2.5,
  },
  COLORS: {
    TITLE: 'var(--color-screensaver-title)',
    OVERLAY: 'bg-black/30',
    TOUCH_BACKGROUND: 'bg-white/20',
    TOUCH_BORDER: 'border-white/30',
    LOADING_BG: 'bg-black',
  },
  TITLE_ANIMATION: {
    SCALE: [1, 1.02, 1],
    OPACITY: [0.9, 1, 0.9],
    EASE: "easeInOut",
    REPEAT: Infinity,
  },
  TOUCH_ANIMATION: {
    Y_MOVEMENT: [0, -15, 0],
    SCALE_MOVEMENT: [1, 1.1, 1],
    EASE: "easeInOut",
    REPEAT: Infinity,
  },
  VIDEO: {
    DEFAULT_SOURCE: '/videos/Mi proyecto (7).mp4',
    TYPE: 'video/mp4',
  },
};

// Hook para estilos memoizados
export const useScreensaverScreenStyles = () => {
  const titleStyle = useMemo(() => ({
    color: 'var(--color-screensaver-title)',
    fontSize: 'min(12vw, 6rem)',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 'min(14vw, 7rem)'
  }), []);

  const touchIndicatorContainerStyle = useMemo(() => ({
    marginBottom: 'min(4rem, 8vw)'
  }), []);

  const touchIconBackgroundStyle = useMemo(() => ({
    width: 'min(6rem, 12vw)',
    height: 'min(6rem, 12vw)'
  }), []);

  const touchIconStyle = useMemo(() => ({
    width: 'min(4rem, 8vw)',
    height: 'min(4rem, 8vw)'
  }), []);

  const touchIconTextStyle = useMemo(() => ({
    fontSize: 'min(6vw, 3rem)',
    lineHeight: 1
  }), []);

  const videoStyle = useMemo(() => ({
    pointerEvents: 'none'
  }), []);

  return {
    titleStyle,
    touchIndicatorContainerStyle,
    touchIconBackgroundStyle,
    touchIconStyle,
    touchIconTextStyle,
    videoStyle,
  };
};
