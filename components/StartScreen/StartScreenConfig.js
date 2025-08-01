
// Configuration constants for start screen
export const useStartScreenStyles = (startContent) => ({
  backgroundStyle: {
    backgroundImage: `url(${startContent?.backgroundImage || './images/Bild_Kutsche.webp'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },

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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 'var(--startscreen-top-spacing)',
    paddingLeft: 'clamp(1rem, 3vw, 3rem)',
    paddingRight: 'clamp(1rem, 3vw, 3rem)'
  },

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
