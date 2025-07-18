// Animation configurations for ResultsScreen
export const ANIMATION_CONFIG = {
  // Main container animation
  CONTAINER: {
    INITIAL: { x: '100%' },
    ANIMATE: { x: 0 },
    EXIT: { x: '-100%' },
    TRANSITION: { duration: 0.5 }
  },

  // Content reveal animation
  CONTENT_REVEAL: {
    INITIAL: { y: 50, opacity: 0 },
    ANIMATE: { y: 0, opacity: 1 },
    TRANSITION: { duration: 0.8 }
  },

  // Staggered delays for content elements
  DELAYS: {
    TITLE: 0.2,
    SUBTITLE: 0.4,
    BUTTON: 1.0
  },

  // Button interactions
  BUTTON: {
    HOVER: { scale: 1.05 },
    TAP: { scale: 0.95 }
  }
};

// Background and overlay configurations
export const BACKGROUND_CONFIG = {
  SIZE: 'cover',
  POSITION: 'center',
  REPEAT: 'no-repeat'
};
