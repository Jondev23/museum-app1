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

// Styling configurations
export const STYLE_CONFIG = {
  // Container styles
  CONTAINER: {
    padding: 'min(2rem, 3vh)'
  },

  // Typography styles
  TITLE: {
    marginBottom: 'min(2rem, 3vh)',
    fontSize: 'min(4.8rem, 8vw)',
    lineHeight: '120%'
  },

  SUBTITLE: {
    marginBottom: 'min(3rem, 4vh)',
    fontSize: 'min(3.2rem, 5.5vw)',
    lineHeight: '120%'
  },

  // Progress dots styles
  PROGRESS_DOTS: {
    marginBottom: 'min(4rem, 6vh)'
  },

  // Button container styles
  BUTTON_CONTAINER: {
    position: 'fixed',
    left: '0',
    right: '0',
    bottom: 'min(1.5rem, 2.5vh)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50
  },

  // Button styles
  BUTTON: {
    background: 'transparent',
    border: 'none',
    fontSize: 'min(1.5rem, 2.5vw)',
    lineHeight: 'normal',
    textTransform: 'uppercase',
    letterSpacing: 'min(0.0625rem, 0.1vw)',
    padding: 'min(1rem, 1.5vh) min(2rem, 3vw)',
    borderRadius: 'min(1.5rem, 2.5vw)',
    gap: 'min(0.5rem, 0.8vw)',
    cursor: 'pointer'
  },

  // Icon styles
  ICON: {
    width: 'min(3rem, 4.5vw)',
    height: 'min(4.875rem, 7vw)'
  }
};

// Background and overlay configurations
export const BACKGROUND_CONFIG = {
  OVERLAY_OPACITY: 0.75,
  SIZE: 'cover',
  POSITION: 'center',
  REPEAT: 'no-repeat'
};

// Default content fallbacks
export const DEFAULT_CONTENT = {
  title: {
    en: 'Great job!',
    de: 'Hü! Sehr gut!'
  },
  playAgain: 'NOCH EINMAL',
  iconSrc: '/images/GUI.svg',
  iconAlt: 'Restart icon',
  backgroundImage: '/images/Bild_Kutsche.webp'
};
