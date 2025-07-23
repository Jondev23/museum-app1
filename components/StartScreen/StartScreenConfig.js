// Configuración simple
export const START_SCREEN_CONFIG = {
  ANIMATION_DELAYS: {
    CONTENT_TRIGGER: 300,
    TITLE: 0.2,
    SUBTITLE: 0.4,
    DESCRIPTION: 0.6,
    TOUCH_INDICATOR: 1.0,
  },
  ANIMATION_DURATIONS: {
    SCREEN_TRANSITION: 0.8,
    CONTENT_FADE: 0.8,
    TOUCH_INDICATOR: 2,
  },
  SWIPE: {
    MIN_DISTANCE: 100,
  },
  TOUCH_INDICATOR: {
    ANIMATION_TYPE: "easeInOut",
    REPEAT: Infinity,
    X_MOVEMENT: [0, -30, 0],
    SCALE_MOVEMENT: [1, 1.1, 1],
  },
};

// Estilos súper simples con porcentajes y responsivos
export const useStartScreenStyles = (startContent) => ({
  backgroundStyle: {
    backgroundImage: `url(${startContent?.backgroundImage || '/images/Bild_Kutsche.webp'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },

  containerStyle: {
    minHeight: '100vh',
    minHeight: '100dvh' // Dynamic viewport height for mobile
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
    paddingTop: 'clamp(4rem, 8vh, 6rem)',
    paddingLeft: 'clamp(1rem, 3vw, 3rem)',
    paddingRight: 'clamp(1rem, 3vw, 3rem)'
  },

  // Título - responsivo 
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

  // Subtítulo - responsivo
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

  // Descripción - responsiva
  descriptionSectionStyle: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 'clamp(3.5rem, 7vh, 5.5rem)',
    paddingBottom: 'clamp(2rem, 6vh, 4rem)'
  },

  descriptionContainerStyle: {
    width: '90%',
    maxWidth: '80rem',
    textAlign: 'center'
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

  // TouchIndicator responsivo
  touchIndicatorContainerStyle: {
    width: 'clamp(50px, 8vw, 80px)',
    height: 'clamp(50px, 8vw, 80px)',
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
