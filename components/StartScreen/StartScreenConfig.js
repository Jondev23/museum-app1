
// Configuration constants for start screen animations and behavior
export const START_SCREEN_CONFIG = {
  // Animation delay timings in seconds
  ANIMATION_DELAYS: {
    CONTENT_TRIGGER: 150, // Initial content display delay (ms)
    TITLE: 0.2,           // Title animation delay
    SUBTITLE: 0.4,        // Subtitle animation delay
    DESCRIPTION: 0.6,     // Description animation delay
    TOUCH_INDICATOR: 1.0, // Touch indicator animation delay
  },
  // Animation duration timings in seconds
  ANIMATION_DURATIONS: {
    SCREEN_TRANSITION: 0.8, // Screen change transition
    CONTENT_FADE: 0.8,      // Content fade in/out
    TOUCH_INDICATOR: 2,     // Touch indicator animation cycle
  },
  // Swipe gesture configuration
  SWIPE: {
    MIN_DISTANCE: 100, // Minimum pixels for swipe detection
  },
  // Touch indicator animation settings
  TOUCH_INDICATOR: {
    ANIMATION_TYPE: "easeInOut",
    REPEAT: Infinity,
    X_MOVEMENT: [0, -30, 0],    // Horizontal movement animation
    SCALE_MOVEMENT: [1, 1.1, 1], // Scale animation
  },
};

// Custom hook that provides dynamic styles based on content
export const useStartScreenStyles = (startContent) => ({
  // Background image configuration with fallback
  backgroundStyle: {
    backgroundImage: `url(${startContent?.backgroundImage || './images/Bild_Kutsche.webp'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },

  // Container styles for full viewport height
  containerStyle: {
    minHeight: '100vh',
    minHeight: '100dvh' // Dynamic viewport height for mobile
  },

  // Main card container styles
  mainCardStyle: { 
    width: '100%', 
    height: '100%',
    minHeight: 'inherit'
  },

  // Content section layout configuration
  contentSectionStyle: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 'var(--startscreen-top-spacing)',
    paddingLeft: 'clamp(1rem, 3vw, 3rem)',
    paddingRight: 'clamp(1rem, 3vw, 3rem)'
  },

  // Content section with minimal padding for description
  contentSectionMinimalStyle: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 'var(--startscreen-top-spacing)',
    paddingLeft: '0.25rem',
    paddingRight: '0.25rem'
  },

  
  titleStyle: {
    fontSize: 'var(--typography-head-font-size)',
    fontFamily: 'var(--typography-head-font-family)',
    fontWeight: 'var(--typography-head-font-weight)',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 'var(--typography-head-line-height)'
  },

  
  subtitleStyle: {
    fontSize: 'var(--typography-subline-font-size)',
    fontFamily: 'var(--typography-subline-font-family)',
    fontWeight: 'var(--typography-subline-font-weight)',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 'var(--typography-subline-line-height)',
    marginTop: '-0.5rem'
  },

  
  descriptionSectionStyle: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 'clamp(3.5rem, 7vh, 5.5rem)',
    paddingBottom: 'clamp(2rem, 6vh, 4rem)'
  },

  descriptionContainerStyle: {
    width: '100vw',
    maxWidth: '100vw',
    textAlign: 'center',
    paddingLeft: 'var(--startscreen-description-lateral-spacing)',
    paddingRight: 'var(--startscreen-description-lateral-spacing)',
    marginLeft: 'calc(-1 * clamp(1rem, 3vw, 3rem))',
    marginRight: 'calc(-1 * clamp(1rem, 3vw, 3rem))',
    position: 'relative'
  },

  highlightTextStyle: {
    fontSize: 'var(--typography-antwort-fliess-font-size)',
    fontFamily: 'var(--typography-antwort-fliess-font-family)',
    fontWeight: 'var(--typography-antwort-fliess-bold-font-weight)',
    textAlign: 'center',
    lineHeight: 'var(--typography-antwort-fliess-line-height)',
    letterSpacing: 'var(--typography-antwort-fliess-letter-spacing)',
    marginBottom: '0'
  },

  introTextStyle: {
    fontSize: 'var(--typography-antwort-fliess-font-size)',
    fontFamily: 'var(--typography-antwort-fliess-font-family)',
    fontWeight: 'var(--typography-antwort-fliess-font-weight)',
    textAlign: 'center',
    lineHeight: 'var(--typography-antwort-fliess-line-height)',
    letterSpacing: 'var(--typography-antwort-fliess-letter-spacing)'
  },

  
  touchIndicatorContainerStyle: {
    width: 'var(--touch-indicator-size)',
    height: 'var(--touch-indicator-size)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'clamp(1rem, 4vh, 3rem)'
  },

  touchIndicatorStyle: {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  }
});
