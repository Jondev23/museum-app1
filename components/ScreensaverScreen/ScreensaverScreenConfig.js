import { useMemo } from 'react';

// Screensaver configuration constants
export const SCREENSAVER_CONFIG = {
  COLORS: {
    TITLE: 'var(--color-screensaver-title)',
    OVERLAY: 'bg-black/30',
    TOUCH_BACKGROUND: 'bg-white/20',
    TOUCH_BORDER: 'border-white/30',
    LOADING_BG: 'bg-black',
  },
  VIDEO: {
    DEFAULT_SOURCE: '/videos/screensaver-video.mp4',
    TYPE: 'video/mp4',
  },
};

// Custom hook for screensaver screen styles
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
