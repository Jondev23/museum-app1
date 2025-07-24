// Import React hooks for memoization
import { useMemo } from 'react';

// Configuration constants for screensaver screen behavior and animations
export const SCREENSAVER_CONFIG = {
  // Animation delay timings in seconds
  ANIMATION_DELAYS: {
    TITLE: 0.5,            // Title fade-in delay
    TOUCH_INDICATOR: 1.0,  // Touch indicator appearance delay
    TOUCH_ANIMATION: 0.5,  // Touch animation start delay
  },
  
  // Animation duration timings in seconds
  ANIMATION_DURATIONS: {
    SCREEN_TRANSITION: 1.0, // Screen transition duration
    TITLE_PULSE: 3.0,       // Title pulsing animation cycle
    TOUCH_BOUNCE: 2.5,      // Touch indicator bounce cycle
  },
  
  // Color configuration using CSS custom properties and classes
  COLORS: {
    TITLE: 'var(--color-screensaver-title)',  // Title text color
    OVERLAY: 'bg-black/30',                   // Background overlay
    TOUCH_BACKGROUND: 'bg-white/20',          // Touch indicator background
    TOUCH_BORDER: 'border-white/30',          // Touch indicator border
    LOADING_BG: 'bg-black',                   // Loading screen background
  },
  
  // Title pulsing animation configuration
  TITLE_ANIMATION: {
    SCALE: [1, 1.02, 1],       // Scale animation keyframes
    OPACITY: [0.9, 1, 0.9],    // Opacity animation keyframes
    EASE: "easeInOut",         // Animation easing
    REPEAT: Infinity,          // Infinite repeat
  },
  
  // Touch indicator bounce animation configuration
  TOUCH_ANIMATION: {
    Y_MOVEMENT: [0, -15, 0],    // Vertical movement keyframes
    SCALE_MOVEMENT: [1, 1.1, 1], // Scale animation keyframes
    EASE: "easeInOut",          // Animation easing
    REPEAT: Infinity,           // Infinite repeat
  },
  
  // Video configuration
  VIDEO: {
    DEFAULT_SOURCE: '/videos/Mi proyecto (7).mp4', // Default background video
    TYPE: 'video/mp4',                             // Video MIME type
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
