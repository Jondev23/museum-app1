// Import centralized animations
import { LANGUAGE_SELECTOR_TRANSITIONS } from '../../utils/screenTransitions';

// Animation configurations for LanguageSelector overlay component - MOVED TO screenTransitions.js
// Compatibility mapping to maintain existing component structure
export const ANIMATION_CONFIG = {
  // Background overlay fade animation
  OVERLAY: {
    INITIAL: LANGUAGE_SELECTOR_TRANSITIONS.overlay.initial,
    ANIMATE: LANGUAGE_SELECTOR_TRANSITIONS.overlay.animate,
    EXIT: LANGUAGE_SELECTOR_TRANSITIONS.overlay.exit,
    TRANSITION: LANGUAGE_SELECTOR_TRANSITIONS.overlay.transition
  },

  // Main container scale and fade animation
  CONTAINER: {
    INITIAL: LANGUAGE_SELECTOR_TRANSITIONS.container.initial,
    ANIMATE: LANGUAGE_SELECTOR_TRANSITIONS.container.animate,
    EXIT: LANGUAGE_SELECTOR_TRANSITIONS.container.exit,
    TRANSITION: LANGUAGE_SELECTOR_TRANSITIONS.container.transition
  },

  // Globe icon pop-in animation
  GLOBE_ICON: {
    INITIAL: LANGUAGE_SELECTOR_TRANSITIONS.globeIcon.initial,
    ANIMATE: LANGUAGE_SELECTOR_TRANSITIONS.globeIcon.animate,
    TRANSITION: LANGUAGE_SELECTOR_TRANSITIONS.globeIcon.transition
  },

  // Title text slide-up animation
  TITLE: {
    INITIAL: LANGUAGE_SELECTOR_TRANSITIONS.title.initial,
    ANIMATE: LANGUAGE_SELECTOR_TRANSITIONS.title.animate,
    TRANSITION: LANGUAGE_SELECTOR_TRANSITIONS.title.transition
  },

  // Language buttons slide-up animation
  BUTTONS: {
    INITIAL: LANGUAGE_SELECTOR_TRANSITIONS.buttons.initial,
    ANIMATE: LANGUAGE_SELECTOR_TRANSITIONS.buttons.animate,
    TRANSITION: LANGUAGE_SELECTOR_TRANSITIONS.buttons.transition
  },

  // Interactive button animation states
  BUTTON_HOVER: LANGUAGE_SELECTOR_TRANSITIONS.buttonHover,
  BUTTON_TAP: LANGUAGE_SELECTOR_TRANSITIONS.buttonTap
};

// Styling configurations - Simplified with most styles moved to CSS
export const STYLE_CONFIG = {
  // Title container layout styles
  TITLE_CONTAINER: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 'min(0.0rem, 0vw)'
  }
};

// Default content fallbacks
export const DEFAULT_CONTENT = {
  title: "Sprache wählen / Change language",
  german: "DEUTSCH",
  english: "ENGLISH",
  germanTitle: "Sprache wählen",
  englishTitle: "Change language",
  iconSrc: "./images/OE_Sprache_64.svg",
  iconAlt: "Language selector"
};

// Color configurations - Simplified (moved to CSS variables)
export const COLOR_CONFIG = {
  TRANSPARENT: 'transparent'
};
