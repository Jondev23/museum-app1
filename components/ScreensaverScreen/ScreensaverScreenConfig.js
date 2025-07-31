// Import React hooks for memoization
import { useMemo } from 'react';

// Configuration constants for screensaver screen behavior
export const SCREENSAVER_CONFIG = {
  // Color configuration using CSS custom properties and classes
  COLORS: {
    TITLE: 'var(--color-screensaver-title)',  // Title text color
    OVERLAY: 'bg-black/30',                   // Background overlay
    TOUCH_BACKGROUND: 'bg-white/20',          // Touch indicator background
    TOUCH_BORDER: 'border-white/30',          // Touch indicator border
    LOADING_BG: 'bg-black',                   // Loading screen background
  },
  
  // Video configuration
  VIDEO: {
    DEFAULT_SOURCE: '/videos/screensaver-video.mp4', // Default background video
    TYPE: 'video/mp4',                               // Video MIME type
  },
};

// Custom hook for screensaver screen styles
export const useScreensaverScreenStyles = () => {
  // Title text styling with responsive sizing
  const titleStyle = useMemo(() => ({
    color: 'var(--color-screensaver-title)',
    fontSize: 'min(12vw, 6rem)',     // Responsive font size with max limit
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 'min(14vw, 7rem)'    // Responsive line height
  }), []);

  // Touch indicator container spacing
  const touchIndicatorContainerStyle = useMemo(() => ({
    marginBottom: 'min(4rem, 8vw)'    // Responsive bottom margin
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
