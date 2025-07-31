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

// Unified transition generator - creates consistent transitions
const createTransition = (animation, timing = 'standard', delay = 0) => {
  const timingMap = {
    fast: FAST_TRANSITION,
    standard: STANDARD_TRANSITION,
    modal: MODAL_TRANSITION
  };
  
  const baseTransition = timingMap[timing] || STANDARD_TRANSITION;
  
  return {
    ...BASE_ANIMATIONS[animation],
    transition: delay > 0 ? { ...baseTransition, delay } : baseTransition
  };
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


const NO_ANIMATION = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
  transition: { duration: 0 }
};


export const SCREEN_TRANSITIONS = {
  screensaver: createTransition('fade', 'standard'),
  default: createTransition('slideHorizontal', 'standard'),
  feedback: NO_ANIMATION // FeedbackScreen sin animaciones
};

// Create aliases for all screen types using the same transition
SCREEN_TRANSITIONS.start = SCREEN_TRANSITIONS.default;
SCREEN_TRANSITIONS.question = SCREEN_TRANSITIONS.default;
SCREEN_TRANSITIONS.results = SCREEN_TRANSITIONS.default;

// Footer animations - unified using generator
export const FOOTER_TRANSITIONS = {
  standard: createTransition('slideUp', 'fast', TRANSITION_CONFIG.DELAYS.SHORT),
  slide: createTransition('slideHorizontal', 'standard')
};

// Overlay animations - unified using generator
export const OVERLAY_TRANSITIONS = {
  fade: createTransition('fade', 'fast'),
  modal: createTransition('scaleModal', 'modal')
};

// Language Selector animations - unified with sequential timing
export const LANGUAGE_SELECTOR_TRANSITIONS = {
  // Reuse overlay patterns
  overlay: OVERLAY_TRANSITIONS.fade,
  container: OVERLAY_TRANSITIONS.modal,

  // Sequential content elements with unified timing
  globeIcon: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { 
      duration: TRANSITION_CONFIG.DURATIONS.FAST, 
      delay: TRANSITION_CONFIG.DELAYS.SHORT,
      ease: TRANSITION_CONFIG.EASING.BOUNCE
    }
  },

  title: createTransition('slideUp', 'fast', TRANSITION_CONFIG.DELAYS.MEDIUM),
  buttons: createTransition('slideUp', 'fast', TRANSITION_CONFIG.DELAYS.LONG),

  // Interactive button tap
  buttonTap: { scale: 0.98 }
};

// Unified interactive elements animations
export const INTERACTIVE_TRANSITIONS = {
  // Base tap patterns
  standard: { tap: { scale: 0.95 } },
  subtle: { tap: { scale: 0.98 } }
};

// Add backward compatibility aliases
INTERACTIVE_TRANSITIONS.button = INTERACTIVE_TRANSITIONS.standard;
INTERACTIVE_TRANSITIONS.feedbackButton = INTERACTIVE_TRANSITIONS.standard;
INTERACTIVE_TRANSITIONS.languageButton = INTERACTIVE_TRANSITIONS.subtle;
INTERACTIVE_TRANSITIONS.answerButton = INTERACTIVE_TRANSITIONS.subtle;

// Unified UI element animations using generator
export const UI_TRANSITIONS = {
  // Core patterns using generator
  content: {
    ...createTransition('slideUp', 'fast'),
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
  },

  icon: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 0.8, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: FAST_TRANSITION
  },

  dynamicContent: {
    getOpacity: (showContent) => ({ opacity: showContent ? 1 : 0 }),
    transition: FAST_TRANSITION
  },

  delayedContent: {
    getOpacity: (showContent) => ({ opacity: showContent ? 1 : 0 }),
    getTransition: () => `opacity ${TRANSITION_CONFIG.DURATIONS.FAST}s ease ${TRANSITION_CONFIG.DELAYS.MEDIUM}s`
  },

  // Special case - touch indicator
  touchIndicator: {
    ...createTransition('fade', 'standard'),
    transition: {
      duration: 0.5,
      ease: TRANSITION_CONFIG.EASING.SMOOTH
    },
    css: {
      animation: 'fade-swipe 4.5s ease-in-out infinite',
      transition: 'transform 0.2s ease, opacity 0.5s ease'
    },
    tap: { scale: 0.9 }
  }
};

// Add backward compatibility aliases
UI_TRANSITIONS.contentFade = UI_TRANSITIONS.dynamicContent;
UI_TRANSITIONS.contentFadeDelayed = UI_TRANSITIONS.delayedContent;
UI_TRANSITIONS.progressDots = UI_TRANSITIONS.content;
UI_TRANSITIONS.languageIcon = UI_TRANSITIONS.icon;

// Unified page and screensaver transitions using generator
export const PAGE_TRANSITION = createTransition('fade', 'standard');
export const SCREENSAVER_TRANSITION = {
  overlay: createTransition('fade', 'standard')
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

// Unified transition helper - one function for all transition types
export const getTransition = (category, element = 'default', ...args) => {
  const categories = {
    screen: SCREEN_TRANSITIONS,
    footer: FOOTER_TRANSITIONS,
    overlay: OVERLAY_TRANSITIONS,
    ui: UI_TRANSITIONS,
    interactive: INTERACTIVE_TRANSITIONS,
    languageSelector: LANGUAGE_SELECTOR_TRANSITIONS
  };

  const categoryObj = categories[category];
  if (!categoryObj) {
    // Fallback for specific cases
    if (category === 'page') {
      if (element === 'dynamicUIOverlay') {
        const [isTransitioningToScreensaver, isCriticalTransition] = args;
        return {
          animate: { 
            opacity: (isTransitioningToScreensaver || isCriticalTransition) ? 0 : 1 
          },
          transition: { 
            duration: isCriticalTransition ? 0.05 : (isTransitioningToScreensaver ? 0.3 : 0.2),
            ease: TRANSITION_CONFIG.EASING.SMOOTH
          }
        };
      }
      return PAGE_TRANSITION;
    }
    return null;
  }

  return categoryObj[element] || categoryObj.default || categoryObj.standard || categoryObj.container;
};

// Backward compatibility - individual helper functions
export const getScreenTransition = (screenName) => getTransition('screen', screenName);
export const getFooterTransition = (type = 'standard') => getTransition('footer', type);
export const getOverlayTransition = (type = 'fade') => getTransition('overlay', type);
export const getUITransition = (element) => getTransition('ui', element);
export const getInteractiveTransition = (type = 'standard') => getTransition('interactive', type);
export const getLanguageSelectorTransition = (element) => getTransition('languageSelector', element);
export const getPageTransition = (type = 'default', ...args) => getTransition('page', type, ...args);
