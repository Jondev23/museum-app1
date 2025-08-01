// animations.js
// Este archivo centraliza todas las animaciones CSS utilizadas en la aplicación

// Configuración de animaciones
export const ANIMATION_CONFIG = {
  // Duraciones estándar - más consistentes
  DURATIONS: {
    FAST: 0.3,
    STANDARD: 0.6,  
    SLOW: 0.6,      
    SCREENSAVER: 0.6 
  },
  
  // Retrasos estándar
  DELAYS: {
    NONE: 0,
    SHORT: 0.1,
    MEDIUM: 0.2,
    LONG: 0.3
  },
  
  // Funciones de aceleración
  EASING: {
    SMOOTH: "easeInOut",  
    BOUNCE: "easeOut",    
    SHARP: "easeIn"       
  },
};

// Patrones de animación base - objetos de animación reutilizables (versiones de clase CSS)
export const BASE_ANIMATIONS = {
  // Fade in/out simple
  fade: {
    className: 'fade-animation',
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },

  // Deslizar de derecha a izquierda
  slideHorizontal: {
    className: 'slide-horizontal-animation',
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' }
  },
  
  // Deslizar de izquierda a derecha
  slideLeftToRight: {
    className: 'slide-left-to-right-animation',
    initial: { opacity: 0, x: '-100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' }
  },

  // Escala y fade (para modales)
  scaleModal: {
    className: 'scale-modal-animation',
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },

  // Deslizar desde abajo
  slideUp: {
    className: 'slide-up-animation',
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  }
};

// Configuraciones de transición estándar
export const TRANSITION_PRESETS = {
  standard: {
    duration: ANIMATION_CONFIG.DURATIONS.STANDARD,
    ease: ANIMATION_CONFIG.EASING.SMOOTH
  },
  
  fast: {
    duration: ANIMATION_CONFIG.DURATIONS.FAST,
    ease: ANIMATION_CONFIG.EASING.SMOOTH
  },
  
  modal: {
    duration: ANIMATION_CONFIG.DURATIONS.FAST,
    ease: ANIMATION_CONFIG.EASING.BOUNCE
  },
  
  // Sin animación - para pantallas que deben aparecer instantáneamente
  none: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 1 },
    transition: { duration: 0 }
  }
};

// Generador de transición unificado - crea transiciones consistentes
export const createTransition = (animation, timing = 'standard', delay = 0) => {
  // Devuelve la clase CSS basada en el tipo de animación y el tiempo
  return {
    className: `${BASE_ANIMATIONS[animation].className} ${timing}-timing`,
    ...BASE_ANIMATIONS[animation]
  };
};

// Definiciones de animaciones de Keyframes CSS
export const CSS_KEYFRAMES = {
  // Animación de deslizamiento para el indicador táctil
  fadeSwipe: `
    @keyframes fade-swipe {
      0% { 
        transform: translateX(56px);
        opacity: 0;
      }
      22% { 
        transform: translateX(0px);
        opacity: 1;
      }
      33% { 
        transform: translateX(0px);
        opacity: 1;
      }
      78% { 
        transform: translateX(0px);
        opacity: 1;
      }
      100% { 
        transform: translateX(-56px);
        opacity: 0;
      }
    }
  `,

  // Animaciones personalizadas de FeedbackScreen
  feedbackScreen: `
    @keyframes feedback-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes feedback-slide-out-left {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(-100%);
      }
    }

    @keyframes feedback-button-fade-in {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes feedback-button-fade-out {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-10px);
      }
    }

    /* Clases CSS de FeedbackScreen */
    .feedback-screen-enter {
      animation: feedback-fade-in 0.6s ease-in-out forwards;
    }

    .feedback-screen-exit {
      animation: feedback-slide-out-left 0.6s ease-in-out forwards;
    }

    .feedback-button-enter {
      animation: feedback-button-fade-in 0.4s ease-out forwards;
      animation-delay: 0.2s;
      opacity: 0; /* Comienza invisible, la animación lo hará visible */
    }

    .feedback-button-exit {
      animation: feedback-button-fade-out 0.3s ease-in forwards;
    }
  `
};

// Variables CSS para transiciones consistentes
export const CSS_VARIABLES = {
  // Duraciones de transición como propiedades personalizadas CSS
  transitions: {
    fast: `${ANIMATION_CONFIG.DURATIONS.FAST}s`,
    standard: `${ANIMATION_CONFIG.DURATIONS.STANDARD}s`,
    slow: `${ANIMATION_CONFIG.DURATIONS.SLOW}s`
  },
  
  // Valores comunes de transición CSS
  values: {
    allFast: `all ${ANIMATION_CONFIG.DURATIONS.FAST}s ${ANIMATION_CONFIG.EASING.SMOOTH}`,
    allStandard: `all ${ANIMATION_CONFIG.DURATIONS.STANDARD}s ${ANIMATION_CONFIG.EASING.SMOOTH}`,
    transformFast: `transform ${ANIMATION_CONFIG.DURATIONS.FAST}s ${ANIMATION_CONFIG.EASING.SMOOTH}`,
    opacityFast: `opacity ${ANIMATION_CONFIG.DURATIONS.FAST}s ${ANIMATION_CONFIG.EASING.SMOOTH}`
  }
};

// Función de utilidad para inyectar animaciones CSS en el DOM
export const injectCSSAnimations = () => {
  if (typeof document === 'undefined') return; // Omitir en el lado del servidor
  
  const styleId = 'custom-animations';
  
  // Eliminar animaciones existentes para forzar actualización
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // Crear elemento de estilo con alta prioridad
  const style = document.createElement('style');
  style.id = styleId;
  
  // Combinar todas las animaciones keyframes
  // QuestionScreen ya no se gestiona aquí, tiene sus propias animaciones
  style.textContent = CSS_KEYFRAMES.fadeSwipe + CSS_KEYFRAMES.feedbackScreen;
  
  // Inyectar en el head del documento - asegurarse que sea el último estilo
  document.head.appendChild(style);
  
  // Forzar un reflow para aplicar inmediatamente los cambios
  if (document.body) {
    document.body.offsetHeight;
  }
};
