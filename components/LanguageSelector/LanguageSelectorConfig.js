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

// Styling configurations
export const STYLE_CONFIG = {
  // Overlay styles
  OVERLAY: {
    backgroundColor: '#344243',
    className: 'fixed inset-0 flex items-center justify-center z-50'
  },

  // Container styles
  CONTAINER: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'min(3.24rem, 6.08vw)',
    width: 'auto',
    maxWidth: '100vw',
    padding: '0 min(2rem, 4vw)',
    minHeight: '100vh',
    paddingTop: 'min(4rem, 6vw)',
    paddingBottom: 'min(5rem, 10vw)'
  },

  // Globe icon styles
  GLOBE_ICON: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    iconStyle: {
      width: 'min(5.4rem, 13.5vw)',
      height: 'min(5.4rem, 13.5vw)',
      display: 'block',
      opacity: 0.8
    }
  },

  // Title container styles
  TITLE_CONTAINER: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 'min(0.0rem, 0vw)'
  },

  // Title styles
  TITLE: {
    fontSize: 'min(2.5rem, 6.2vw)',
    lineHeight: '130%',
    margin: 0,
    whiteSpace: 'nowrap'
  },

  // Subtitle styles
  SUBTITLE: {
    opacity: 0.6,
    fontSize: 'min(2.5rem, 6.2vw)',
    lineHeight: '130%',
    margin: 0,
    whiteSpace: 'nowrap'
  },

  // Buttons container styles
  BUTTONS_CONTAINER: {
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'min(1.5rem, 3vw)'
  },

  // Button styles
  BUTTON: {
    width: 'min(max(21rem, 53vw), 75rem)',
    height: 'min(3.47rem, 8.31vw)',
    borderRadius: 'min(3.75rem, 8vw)',
    border: '2px solid',
    padding: 'min(0.625rem, 1.5vw)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },

  // Button text styles
  BUTTON_TEXT: {
    flex: 1,
    fontSize: 'min(1.25rem, 2.5vw)',
    lineHeight: 'min(5.5rem, 12vw)',
    textTransform: 'uppercase'
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

// Color configurations
export const COLOR_CONFIG = {
  OVERLAY_BG: '#344243',
  ACTIVE_BUTTON: '#A94930',
  INACTIVE_BUTTON: '#D9D9D9',
  TRANSPARENT: 'transparent'
};
