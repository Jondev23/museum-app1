// Unified screen transition animations configuration
// This file centralizes all screen transition animations for consistency

// Re-export framer-motion components for centralized access
export { AnimatePresence, motion } from 'framer-motion';

// Animation configuration constants
export const TRANSITION_CONFIG = {
  // Standard durations - more consistent
  DURATIONS: {
    FAST: 0.3,
    STANDARD: 0.6,  
    SLOW: 0.6,      
    SCREENSAVER: 0.6 
  },
  
  // Standard delays
  DELAYS: {
    NONE: 0,
    SHORT: 0.1,
    MEDIUM: 0.2,
    LONG: 0.3
  },
  
  // Easing functions - simplified to one main easing
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
  // Screensaver - simple fade with standard timing
  screensaver: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.STANDARD,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  },

  // Start screen - slides in from right, exits to left with standard timing
  start: {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.STANDARD,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  },

  // Question screen - slides in from right with standard timing
  question: {
    initial: { x: '100%', opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: TRANSITION_CONFIG.DURATIONS.STANDARD,
        ease: TRANSITION_CONFIG.EASING.SMOOTH
      }
    },
    exit: { 
      opacity: 0, 
      x: '-100%',
      transition: {
        duration: TRANSITION_CONFIG.DURATIONS.STANDARD,
        ease: TRANSITION_CONFIG.EASING.SMOOTH
      }
    }
  },

  // Feedback screen - slides in from right, exits to left with standard timing
  feedback: {
    initial: { opacity: 0, x: '100%' },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: TRANSITION_CONFIG.DURATIONS.STANDARD,
        ease: TRANSITION_CONFIG.EASING.SMOOTH
      }
    },
    exit: { 
      opacity: 0, 
      x: '-100%',
      transition: {
        duration: TRANSITION_CONFIG.DURATIONS.STANDARD,
        ease: TRANSITION_CONFIG.EASING.SMOOTH
      }
    }
  },

  // Results screen - consistent slide pattern with standard timing
  results: {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.STANDARD,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  }
};

// Footer animations - consistent with main transitions
export const FOOTER_TRANSITIONS = {
  // Standard footer animation - simplified
  standard: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.FAST,
      ease: TRANSITION_CONFIG.EASING.SMOOTH,
      delay: TRANSITION_CONFIG.DELAYS.SHORT // Reduced delay for consistency
    }
  },

  // Footer that slides with main content - consistent timing
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

// Overlay animations (language selector and admin panel keep their special effects)
export const OVERLAY_TRANSITIONS = {
  // Standard fade for general overlays
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.FAST,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  },

  // Scale and fade for language selector and admin panel (keeps special effect)
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

// Language Selector specific animations - moved from LanguageSelectorConfig
export const LANGUAGE_SELECTOR_TRANSITIONS = {
  // Background overlay fade animation
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: TRANSITION_CONFIG.DURATIONS.FAST }
  },

  // Main container scale and fade animation
  container: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: TRANSITION_CONFIG.DURATIONS.FAST }
  },

  // Globe icon pop-in animation
  globeIcon: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { 
      duration: TRANSITION_CONFIG.DURATIONS.FAST, 
      delay: TRANSITION_CONFIG.DELAYS.SHORT,
      ease: TRANSITION_CONFIG.EASING.BOUNCE
    }
  },

  // Title text slide-up animation
  title: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: TRANSITION_CONFIG.DURATIONS.FAST, 
      delay: TRANSITION_CONFIG.DELAYS.MEDIUM,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  },

  // Language buttons slide-up animation
  buttons: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: TRANSITION_CONFIG.DURATIONS.FAST, 
      delay: TRANSITION_CONFIG.DELAYS.LONG,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  },

  // Interactive button animation states
  buttonHover: { scale: 1.02 },
  buttonTap: { scale: 0.98 }
};

// Admin Panel specific animations
export const ADMIN_PANEL_TRANSITIONS = {
  // Background overlay
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.FAST,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  },

  // Admin panel modal
  modal: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.FAST,
      ease: TRANSITION_CONFIG.EASING.BOUNCE
    }
  }
};

// Kiosk Selector specific animations
export const KIOSK_SELECTOR_TRANSITIONS = {
  // Kiosk selector modal
  modal: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.FAST,
      ease: TRANSITION_CONFIG.EASING.BOUNCE
    }
  }
};

// Main page transitions (from pages/index.js)
export const PAGE_TRANSITIONS = {
  // Language selector icon
  languageSelectorIcon: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 0.8, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.FAST,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  },

  // Screen container
  screenContainer: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.STANDARD,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  }
};

// Interactive elements animations
export const INTERACTIVE_TRANSITIONS = {
  // Standard button hover/tap
  button: {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  },

  // Language selector button hover/tap
  languageButton: {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  }
};

// Global UI element animations - standardized
export const UI_TRANSITIONS = {
  // Progress dots - consistent with other elements
  progressDots: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.FAST,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  },

  // Language selector icon - consistent timing
  languageIcon: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 0.8, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.FAST,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  }
};

// Special transition for screensaver timeout - consistent with other transitions
export const SCREENSAVER_TRANSITION = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: TRANSITION_CONFIG.DURATIONS.STANDARD,
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

// Helper function to get language selector transition config
export const getLanguageSelectorTransition = (element) => {
  return LANGUAGE_SELECTOR_TRANSITIONS[element] || LANGUAGE_SELECTOR_TRANSITIONS.container;
};

// Helper function to get admin panel transition config
export const getAdminPanelTransition = (element) => {
  return ADMIN_PANEL_TRANSITIONS[element] || ADMIN_PANEL_TRANSITIONS.modal;
};

// Helper function to get kiosk selector transition config
export const getKioskSelectorTransition = (element) => {
  return KIOSK_SELECTOR_TRANSITIONS[element] || KIOSK_SELECTOR_TRANSITIONS.modal;
};

// Helper function to get page transition config
export const getPageTransition = (element) => {
  return PAGE_TRANSITIONS[element] || PAGE_TRANSITIONS.screenContainer;
};

// Helper function to get interactive transition config
export const getInteractiveTransition = (element) => {
  return INTERACTIVE_TRANSITIONS[element] || INTERACTIVE_TRANSITIONS.button;
};
