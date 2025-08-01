// Unified screen transition animations configuration
// This file centralizes all screen transition animations for consistency

// Define replacement components for framer-motion
import React from 'react';

// AnimatePresence replacement
export const AnimatePresence = ({ children, mode, initial }) => {
  return <>{children}</>;
};

// motion replacement
export const motion = {
  div: React.forwardRef((props, ref) => <div ref={ref} {...props} />),
  button: React.forwardRef((props, ref) => <button ref={ref} {...props} />),
  img: React.forwardRef((props, ref) => <img ref={ref} {...props} />)
};

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

// Base animation patterns - reusable animation objects (CSS class versions)
const BASE_ANIMATIONS = {
  // Simple fade in/out
  fade: {
    className: 'fade-animation',
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },

  // Slide from right to left
  slideHorizontal: {
    className: 'slide-horizontal-animation',
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' }
  },
  
  // Slide from left to right (for QuestionScreen)
  slideLeftToRight: {
    className: 'slide-left-to-right-animation',
    initial: { opacity: 0, x: '-100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' }
  },

  // Scale and fade (for modals)
  scaleModal: {
    className: 'scale-modal-animation',
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },

  // Slide up from bottom
  slideUp: {
    className: 'slide-up-animation',
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  }
};

// Unified transition generator - creates consistent transitions
const createTransition = (animation, timing = 'standard', delay = 0) => {
  // Return CSS class based on animation type and timing
  return {
    className: `${BASE_ANIMATIONS[animation].className} ${timing}-timing`,
    ...BASE_ANIMATIONS[animation]
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

// No animation configuration - for screens that should appear instantly
const NO_ANIMATION = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
  transition: { duration: 0 }
};

// FeedbackScreen custom CSS animation configuration
const FEEDBACK_CSS_ANIMATION = {
  // Using CSS classes instead of Framer Motion
  cssClasses: {
    enter: 'feedback-screen-enter',
    exit: 'feedback-screen-exit'
  },
  // For compatibility with the existing system
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, x: '-100%' },
  transition: { duration: 0.6, ease: 'easeInOut' }
};

export const SCREEN_TRANSITIONS = {
  screensaver: createTransition('fade', 'standard'),
  default: createTransition('slideHorizontal', 'standard'),
  question: { className: '' }, // Sin animación para QuestionScreen
  feedback: FEEDBACK_CSS_ANIMATION // FeedbackScreen con animaciones CSS personalizadas
};

// Create aliases for all screen types using the same transition
SCREEN_TRANSITIONS.start = SCREEN_TRANSITIONS.default;
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
  `,

  // FeedbackScreen custom animations
  feedbackScreen: `
    @keyframes feedback-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes feedback-slide-out-left {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(-100%);
      }
    }

    @keyframes feedback-button-fade-in {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes feedback-button-fade-out {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-10px);
      }
    }

    /* FeedbackScreen CSS classes */
    .feedback-screen-enter {
      animation: feedback-fade-in 0.6s ease-in-out forwards;
    }

    .feedback-screen-exit {
      animation: feedback-slide-out-left 0.6s ease-in-out forwards;
    }

    .feedback-button-enter {
      animation: feedback-button-fade-in 0.4s ease-out forwards;
      animation-delay: 0.2s;
      opacity: 0; /* Start invisible, animation will make it visible */
    }

    .feedback-button-exit {
      animation: feedback-button-fade-out 0.3s ease-in forwards;
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

// Utility function to inject CSS animations into the DOM
export const injectCSSAnimations = () => {
  if (typeof document === 'undefined') return; // Skip on server-side
  
  const styleId = 'feedback-screen-animations';
  
  // Check if styles are already injected
  if (document.getElementById(styleId)) return;
  
  // Create style element
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = CSS_ANIMATIONS.feedbackScreen;
  
  // Inject into document head
  document.head.appendChild(style);
};
