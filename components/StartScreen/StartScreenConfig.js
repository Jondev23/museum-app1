
// Configuration constants for start screen behavior
export const START_SCREEN_CONFIG = {
  // Swipe gesture configuration
  SWIPE: {
    MIN_DISTANCE: 100, // Minimum pixels for swipe detection
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
    cursor: 'pointer'
    // Transition moved to centralized screenTransitions.js
  }
});
