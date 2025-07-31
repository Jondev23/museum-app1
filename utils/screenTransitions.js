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

// Base animation patterns - reusable animation objects
const BASE_ANIMATIONS = {
  // Simple fade in/out
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },

  // Slide from right to left
  slideHorizontal: {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' }
  },

  // Scale and fade (for modals)
  scaleModal: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },

  // Slide up from bottom
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  }
};

// Standard transition configurations
const STANDARD_TRANSITION = {
  duration: TRANSITION_CONFIG.DURATIONS.STANDARD,
  ease: TRANSITION_CONFIG.EASING.SMOOTH
};

const FAST_TRANSITION = {
  duration: TRANSITION_CONFIG.DURATIONS.FAST,
  ease: TRANSITION_CONFIG.EASING.SMOOTH
};

const MODAL_TRANSITION = {
  duration: TRANSITION_CONFIG.DURATIONS.FAST,
  ease: TRANSITION_CONFIG.EASING.BOUNCE
};

// Screen transition variants - all screens use the same patterns
export const SCREEN_TRANSITIONS = {
  // Screensaver - simple fade
  screensaver: {
    ...BASE_ANIMATIONS.fade,
    transition: STANDARD_TRANSITION
  },

  // All other screens use the same horizontal slide pattern
  default: {
    ...BASE_ANIMATIONS.slideHorizontal,
    transition: STANDARD_TRANSITION
  }
};

// Create aliases for all screen types using the same transition
SCREEN_TRANSITIONS.start = SCREEN_TRANSITIONS.default;
SCREEN_TRANSITIONS.question = SCREEN_TRANSITIONS.default;
SCREEN_TRANSITIONS.feedback = SCREEN_TRANSITIONS.default;
SCREEN_TRANSITIONS.results = SCREEN_TRANSITIONS.default;

// Footer animations - unified using base animations
export const FOOTER_TRANSITIONS = {
  // Standard footer with slide up
  standard: {
    ...BASE_ANIMATIONS.slideUp,
    transition: {
      ...FAST_TRANSITION,
      delay: TRANSITION_CONFIG.DELAYS.SHORT
    }
  },

  // Footer that slides with main content
  slide: {
    ...BASE_ANIMATIONS.slideHorizontal,
    transition: STANDARD_TRANSITION
  }
};

// Overlay animations - simplified since most are the same
export const OVERLAY_TRANSITIONS = {
  // Standard fade for general overlays
  fade: {
    ...BASE_ANIMATIONS.fade,
    transition: FAST_TRANSITION
  },

  // Scale and fade for modals - used by language selector, admin panel, kiosk selector
  modal: {
    ...BASE_ANIMATIONS.scaleModal,
    transition: MODAL_TRANSITION
  }
};

// Language Selector animations - reuse base patterns
export const LANGUAGE_SELECTOR_TRANSITIONS = {
  // Background overlay
  overlay: OVERLAY_TRANSITIONS.fade,

  // Main container 
  container: OVERLAY_TRANSITIONS.modal,

  // Sequential animations for content elements
  globeIcon: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { 
      duration: TRANSITION_CONFIG.DURATIONS.FAST, 
      delay: TRANSITION_CONFIG.DELAYS.SHORT,
      ease: TRANSITION_CONFIG.EASING.BOUNCE
    }
  },

  title: {
    ...BASE_ANIMATIONS.slideUp,
    transition: { 
      duration: TRANSITION_CONFIG.DURATIONS.FAST, 
      delay: TRANSITION_CONFIG.DELAYS.MEDIUM,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  },

  buttons: {
    ...BASE_ANIMATIONS.slideUp,
    transition: { 
      duration: TRANSITION_CONFIG.DURATIONS.FAST, 
      delay: TRANSITION_CONFIG.DELAYS.LONG,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    }
  },

  // Interactive button tap
  buttonTap: { scale: 0.98 }
};

// Modal transitions - unified for admin panel, kiosk selector, etc.
export const MODAL_TRANSITIONS = {
  // Background overlay
  overlay: OVERLAY_TRANSITIONS.fade,

  // Modal container
  container: OVERLAY_TRANSITIONS.modal,

  // Touch feedback for interactive elements
  touchFeedback: {
    tap: { scale: 0.98 },
    transition: FAST_TRANSITION
  }
};

// Interactive elements animations - create base patterns then reuse
const STANDARD_TAP = { tap: { scale: 0.95 } };
const SUBTLE_TAP = { tap: { scale: 0.98 } };

export const INTERACTIVE_TRANSITIONS = {
  // Main patterns
  standard: STANDARD_TAP,
  subtle: SUBTLE_TAP,

  // Legacy aliases for backward compatibility - reuse patterns
  button: STANDARD_TAP,
  feedbackButton: STANDARD_TAP,
  languageButton: SUBTLE_TAP,
  answerButton: SUBTLE_TAP
};

// UI element animations - create base patterns then reuse
const SLIDE_UP_CONTENT = {
  ...BASE_ANIMATIONS.slideUp,
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: FAST_TRANSITION
};

const ICON_FADE = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 0.8, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: FAST_TRANSITION
};

const DYNAMIC_OPACITY = {
  getOpacity: (showContent) => ({ opacity: showContent ? 1 : 0 }),
  transition: FAST_TRANSITION
};

const DELAYED_OPACITY = {
  getOpacity: (showContent) => ({ opacity: showContent ? 1 : 0 }),
  getTransition: () => `opacity ${TRANSITION_CONFIG.DURATIONS.FAST}s ease ${TRANSITION_CONFIG.DELAYS.MEDIUM}s`
};

export const UI_TRANSITIONS = {
  // Main patterns
  content: SLIDE_UP_CONTENT,
  icon: ICON_FADE,
  dynamicContent: DYNAMIC_OPACITY,
  delayedContent: DELAYED_OPACITY,

  // Special case - touch indicator
  touchIndicator: {
    ...BASE_ANIMATIONS.fade,
    transition: {
      duration: 0.5,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    },
    css: {
      animation: 'fade-swipe 4.5s ease-in-out infinite',
      transition: 'transform 0.2s ease, opacity 0.5s ease'
    },
    tap: { scale: 0.9 }
  },

  // Legacy aliases - reuse patterns
  contentFade: DYNAMIC_OPACITY,
  contentFadeDelayed: DELAYED_OPACITY,
  progressDots: SLIDE_UP_CONTENT,
  languageIcon: ICON_FADE
};

// Page transitions - reuse existing patterns
export const PAGE_TRANSITIONS = {
  languageSelectorIcon: UI_TRANSITIONS.icon,
  screenContainer: {
    ...BASE_ANIMATIONS.fade,
    transition: STANDARD_TRANSITION
  },

  // Dynamic UI overlay with conditional opacity and timing
  dynamicUIOverlay: {
    getDynamicTransition: (isTransitioningToScreensaver, isCriticalTransition) => ({
      animate: { 
        opacity: (isTransitioningToScreensaver || isCriticalTransition) ? 0 : 1 
      },
      transition: { 
        duration: isCriticalTransition ? 0.05 : (isTransitioningToScreensaver ? 0.3 : 0.2),
        ease: TRANSITION_CONFIG.EASING.SMOOTH
      }
    })
  }
};

// Special transition for screensaver timeout - uses base fade
export const SCREENSAVER_TRANSITION = {
  overlay: {
    ...BASE_ANIMATIONS.fade,
    transition: STANDARD_TRANSITION
  }
};

// CSS Keyframes animations - centralized CSS animations
export const CSS_ANIMATIONS = {
  // Swipe animation keyframes for touch indicator
  fadeSwipe: `
    @keyframes fade-swipe {
      0% { 
        transform: translateX(56px);
        opacity: 0;
      }
      22% { 
        transform: translateX(0px);
        opacity: 1;
      }
      33% { 
        transform: translateX(0px);
        opacity: 1;
      }
      78% { 
        transform: translateX(0px);
        opacity: 1;
      }
      100% { 
        transform: translateX(-56px);
        opacity: 0;
      }
    }
  `
};

// CSS Variables for consistent transitions
export const CSS_VARIABLES = {
  // Transition durations as CSS custom properties
  transitions: {
    fast: `${TRANSITION_CONFIG.DURATIONS.FAST}s`,
    standard: `${TRANSITION_CONFIG.DURATIONS.STANDARD}s`,
    slow: `${TRANSITION_CONFIG.DURATIONS.SLOW}s`
  },
  
  // Common CSS transition values
  values: {
    allFast: `all ${TRANSITION_CONFIG.DURATIONS.FAST}s ${TRANSITION_CONFIG.EASING.SMOOTH}`,
    allStandard: `all ${TRANSITION_CONFIG.DURATIONS.STANDARD}s ${TRANSITION_CONFIG.EASING.SMOOTH}`,
    transformFast: `transform ${TRANSITION_CONFIG.DURATIONS.FAST}s ${TRANSITION_CONFIG.EASING.SMOOTH}`,
    opacityFast: `opacity ${TRANSITION_CONFIG.DURATIONS.FAST}s ${TRANSITION_CONFIG.EASING.SMOOTH}`
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
  return UI_TRANSITIONS[element] || UI_TRANSITIONS.content;
};

// Helper function to get page transition config
export const getPageTransition = (element, ...args) => {
  const transition = PAGE_TRANSITIONS[element];
  if (!transition) return PAGE_TRANSITIONS.screenContainer;
  
  // Handle dynamic transitions that need runtime parameters
  if (element === 'dynamicUIOverlay' && transition.getDynamicTransition) {
    return transition.getDynamicTransition(...args);
  }
  
  return transition;
};

// Helper function to get language selector transition config
export const getLanguageSelectorTransition = (element) => {
  return LANGUAGE_SELECTOR_TRANSITIONS[element] || LANGUAGE_SELECTOR_TRANSITIONS.container;
};

// Helper function to get interactive transition config
export const getInteractiveTransition = (type = 'standard') => {
  return INTERACTIVE_TRANSITIONS[type] || INTERACTIVE_TRANSITIONS.standard;
};

// Helper function to get modal transition config  
export const getModalTransition = (element) => {
  return MODAL_TRANSITIONS[element] || MODAL_TRANSITIONS.container;
};
