// Unified screen transition animations configuration
// This file centralizes all screen transition animations for consistency

// Define replacement components for framer-motion
import React from 'react';

// Import animations from separate file
import { 
  ANIMATION_CONFIG, 
  BASE_ANIMATIONS,
  TRANSITION_PRESETS,
  createTransition, 
  CSS_KEYFRAMES, 
  CSS_VARIABLES,
  injectCSSAnimations
} from './animations';

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

// Re-export for backward compatibility
export const TRANSITION_CONFIG = {
  DURATIONS: ANIMATION_CONFIG.DURATIONS,
  DELAYS: ANIMATION_CONFIG.DELAYS,
  EASING: ANIMATION_CONFIG.EASING,
  Z_INDEX: {
    BACKGROUND: 5,
    CONTENT: 20,
    OVERLAY: 30,
    UI: 40,
    MODAL: 50
  }
};

// Re-export CSS animations and variables for backward compatibility
export { CSS_KEYFRAMES as CSS_ANIMATIONS, CSS_VARIABLES };

// Standard transition configurations
const STANDARD_TRANSITION = TRANSITION_PRESETS.standard;
const FAST_TRANSITION = TRANSITION_PRESETS.fast;
const MODAL_TRANSITION = TRANSITION_PRESETS.modal;
const NO_ANIMATION = TRANSITION_PRESETS.none;

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
  // QuestionScreen maneja sus propias animaciones internamente
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
    getTransition: () => `opacity ${ANIMATION_CONFIG.DURATIONS.FAST}s ease ${ANIMATION_CONFIG.DELAYS.MEDIUM}s`
  },

  // Special case - touch indicator
  touchIndicator: {
    ...createTransition('fade', 'standard'),
    transition: {
      duration: 0.5,
      ease: ANIMATION_CONFIG.EASING.SMOOTH
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
