// Animation configurations for LanguageSelector
export const ANIMATION_CONFIG = {
  // Overlay animation
  OVERLAY: {
    INITIAL: { opacity: 0 },
    ANIMATE: { opacity: 1 },
    EXIT: { opacity: 0 },
    TRANSITION: { duration: 0.3 }
  },

  // Container animation
  CONTAINER: {
    INITIAL: { scale: 0.8, opacity: 0 },
    ANIMATE: { scale: 1, opacity: 1 },
    EXIT: { scale: 0.8, opacity: 0 },
    TRANSITION: { duration: 0.3 }
  },

  // Globe icon animation
  GLOBE_ICON: {
    INITIAL: { scale: 0 },
    ANIMATE: { scale: 1 },
    TRANSITION: { duration: 0.3, delay: 0.1 }
  },

  // Title animation
  TITLE: {
    INITIAL: { opacity: 0, y: 20 },
    ANIMATE: { opacity: 1, y: 0 },
    TRANSITION: { duration: 0.3, delay: 0.2 }
  },

  // Buttons animation
  BUTTONS: {
    INITIAL: { opacity: 0, y: 20 },
    ANIMATE: { opacity: 1, y: 0 },
    TRANSITION: { duration: 0.3, delay: 0.3 }
  },

  // Button interactions
  BUTTON_HOVER: { scale: 1.02 },
  BUTTON_TAP: { scale: 0.98 }
};

// Styling configurations - Simplified (most styles moved to CSS)
export const STYLE_CONFIG = {
  // Title container styles
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
  iconSrc: "/images/OE_Sprache_64 1.svg",
  iconAlt: "Language selector"
};

// Color configurations - Simplified (moved to CSS variables)
export const COLOR_CONFIG = {
  TRANSPARENT: 'transparent'
};
