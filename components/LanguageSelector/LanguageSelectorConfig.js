// Animation configurations for LanguageSelector overlay component
export const ANIMATION_CONFIG = {
  // Background overlay fade animation
  OVERLAY: {
    INITIAL: { opacity: 0 },        // Start transparent
    ANIMATE: { opacity: 1 },        // Fade to visible
    EXIT: { opacity: 0 },           // Fade out on exit
    TRANSITION: { duration: 0.3 }   // Animation duration
  },

  // Main container scale and fade animation
  CONTAINER: {
    INITIAL: { scale: 0.8, opacity: 0 },  // Start smaller and transparent
    ANIMATE: { scale: 1, opacity: 1 },    // Scale to normal size and visible
    EXIT: { scale: 0.8, opacity: 0 },     // Scale down and fade out
    TRANSITION: { duration: 0.3 }          // Animation duration
  },

  // Globe icon pop-in animation
  GLOBE_ICON: {
    INITIAL: { scale: 0 },              // Start at zero scale
    ANIMATE: { scale: 1 },              // Pop to normal size
    TRANSITION: { duration: 0.3, delay: 0.1 }  // With slight delay
  },

  // Title text slide-up animation
  TITLE: {
    INITIAL: { opacity: 0, y: 20 },     // Start below and transparent
    ANIMATE: { opacity: 1, y: 0 },      // Move up and become visible
    TRANSITION: { duration: 0.3, delay: 0.2 }  // With staggered delay
  },

  // Language buttons slide-up animation
  BUTTONS: {
    INITIAL: { opacity: 0, y: 20 },     // Start below and transparent
    ANIMATE: { opacity: 1, y: 0 },      // Move up and become visible
    TRANSITION: { duration: 0.3, delay: 0.3 }  // With final delay
  },

  // Interactive button animation states
  BUTTON_HOVER: { scale: 1.02 },        // Slightly larger on hover
  BUTTON_TAP: { scale: 0.98 }           // Slightly smaller when pressed
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
  iconSrc: "/images/OE_Sprache_64 1.svg",
  iconAlt: "Language selector"
};

// Color configurations - Simplified (moved to CSS variables)
export const COLOR_CONFIG = {
  TRANSPARENT: 'transparent'
};
