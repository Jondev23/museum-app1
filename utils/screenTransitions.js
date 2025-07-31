// Unified screen transition animations configuration
// This file centralizes all screen transition animations for consistency

// Animation configuration constants
export const TRANSITION_CONFIG = {
  // Standard durations
  DURATIONS: {
    FAST: 0.3,
    STANDARD: 0.8,
    SLOW: 1.2,
    SCREENSAVER: 1.0
  },
  
  // Easing functions
  EASING: {
    SMOOTH: "easeInOut",
    BOUNCE: "easeOut", 
    SHARP: "easeIn"
  },

  // Z-index layers
  Z_INDEX: {
    BACKGROUND: 5,
    CONTENT: 20,
    OVERLAY: 30,
    UI: 40,
    MODAL: 50
  }
};

// Screen transition variants - defines how each screen enters and exits
export const SCREEN_TRANSITIONS = {
  // Screensaver - simple fade
  screensaver: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.SCREENSAVER,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  },

  // Start screen - slides in from right, exits to left
  start: {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.STANDARD,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  },

  // Question screen - slides in from right with push effect
  question: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { opacity: 0, x: '-100%' },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.SLOW, // Slower for push effect
      ease: TRANSITION_CONFIG.EASING.SMOOTH,
      // Different exit timing for smooth handoff
      exit: { 
        duration: TRANSITION_CONFIG.DURATIONS.STANDARD,
        ease: TRANSITION_CONFIG.EASING.SMOOTH
      }
    }
  },

  // Feedback screen - slides in from right, exits to left
  feedback: {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.STANDARD,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  },

  // Results screen - fades in, slides out
  results: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, x: '-100%' },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.STANDARD,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  }
};

// Footer animations - consistent across all screens
export const FOOTER_TRANSITIONS = {
  // Standard footer animation
  standard: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.FAST,
      ease: TRANSITION_CONFIG.EASING.SMOOTH,
      delay: 0.2 // Slight delay after main content
    }
  },

  // Footer that slides with main content
  slide: {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.STANDARD,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  }
};

// Overlay animations (for language selector, admin panel, etc.)
export const OVERLAY_TRANSITIONS = {
  // Fade in/out for overlays
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.FAST,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  },

  // Scale and fade for modals
  modal: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.FAST,
      ease: TRANSITION_CONFIG.EASING.BOUNCE
    }
  }
};

// Global UI element animations
export const UI_TRANSITIONS = {
  // Progress dots
  progressDots: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.FAST,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  },

  // Language selector icon
  languageIcon: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 0.8, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.FAST,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  }
};

// Special transition for screensaver timeout
export const SCREENSAVER_TRANSITION = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.5,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  }
};

// Helper function to get transition config for a screen
export const getScreenTransition = (screenName) => {
  return SCREEN_TRANSITIONS[screenName] || SCREEN_TRANSITIONS.screensaver;
};

// Helper function to get footer transition config
export const getFooterTransition = (type = 'standard') => {
  return FOOTER_TRANSITIONS[type] || FOOTER_TRANSITIONS.standard;
};

// Helper function to get overlay transition config
export const getOverlayTransition = (type = 'fade') => {
  return OVERLAY_TRANSITIONS[type] || OVERLAY_TRANSITIONS.fade;
};

// Helper function to get UI transition config
export const getUITransition = (element) => {
  return UI_TRANSITIONS[element] || UI_TRANSITIONS.progressDots;
};
