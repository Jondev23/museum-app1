
// Configuration constants for start screen
export const useStartScreenStyles = (startContent) => ({
  containerStyle: {
    minHeight: '100vh',
    minHeight: '100dvh'
  },

  mainCardStyle: {
    width: '100%',
    height: '100%',
    minHeight: 'inherit'
  },

  contentSectionStyle: {
    width: '100%',
    minHeight: 'calc(100% - 10rem)',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 'var(--startscreen-top-spacing)',
    paddingLeft: '8rem',
    paddingRight: '8rem',
    paddingBottom: '10rem',
    boxSizing: 'border-box'
  },

  subtitleStyle: {
    fontSize: 'var(--typography-subline-font-size)',
    fontFamily: 'var(--typography-subline-font-family)',
    fontWeight: 'var(--typography-subline-font-weight)',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    lineHeight: 'var(--typography-subline-line-height)',
    marginTop: '-1.0rem'
  },

  descriptionSectionStyle: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 'clamp(1rem, 4vh, 3.5rem)',
    paddingBottom: 'clamp(1rem, 3vh, 2rem)',
    overflow: 'hidden'
  },

  descriptionContainerStyle: {
    width: '100vw',
    maxWidth: '100vw',
    textAlign: 'center',
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
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    pointerEvents: 'auto'
  },

  touchIndicatorStyle: {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    pointerEvents: 'auto'
    
  }
});
