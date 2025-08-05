
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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 'clamp(3rem, 6vh, 5rem)',
    paddingLeft: 'clamp(1rem, 3vw, 3rem)',
    paddingRight: 'clamp(1rem, 3vw, 3rem)'
  },

  subtitleStyle: {
    fontSize: '4rem',
    fontFamily: '"Tisa Sans Pro"',
    fontWeight: '400',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '120%',
    marginTop: '-1.0rem'
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
    marginLeft: 'calc(-4 * clamp(1rem, 3vw, 3rem))',
    marginRight: 'calc(-4 * clamp(1rem, 3vw, 3rem))',
    position: 'relative'
  },

  highlightTextStyle: {
    fontSize: '2.25rem',
    fontFamily: '"Tisa Pro"',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: '140%',
    letterSpacing: '0.0225rem',
    marginBottom: '0'
  },

  introTextStyle: {
    fontSize: '2.25rem',
    fontFamily: '"Tisa Pro"',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: '140%',
    letterSpacing: '0.0225rem'
  },

  touchIndicatorContainerStyle: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  touchIndicatorStyle: {
    width: '100%',
    height: '100%',
    cursor: 'pointer'
    // Removed CSS transition - now using GSAP
  }
});
