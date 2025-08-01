/**
 * Sistema de animaciones JavaScript ultra suaves para el kiosco del museo
 * Proporciona animaciones más fluidas y controlables que CSS
 */

// Función de easing personalizada (más suave que cubic-bezier)
const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
const easeOutQuart = (t) => 1 - (--t) * t * t * t;
const easeInOutQuint = (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;

// Configuración de animaciones
const ANIMATION_CONFIG = {
  duration: 2500, // 2.5 segundos para ultra suavidad
  fps: 144, // Alta frecuencia para suavidad máxima
  easings: {
    fadeIn: easeOutQuart,
    fadeOut: easeInOutCubic,
    slideIn: easeOutExpo,
    slideOut: easeInOutQuint
  }
};

/**
 * Anima un elemento con propiedades específicas
 */
function animateElement(element, fromProps, toProps, duration, easingFunction, onComplete) {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const frameInterval = 1000 / ANIMATION_CONFIG.fps;
    let lastFrameTime = startTime;

    // Configurar propiedades iniciales
    Object.keys(fromProps).forEach(prop => {
      if (prop === 'opacity') {
        element.style.opacity = fromProps[prop];
      } else if (prop === 'transform') {
        element.style.transform = fromProps[prop];
      } else if (prop === 'scale') {
        const currentTransform = element.style.transform || '';
        const scaleTransform = `scale(${fromProps[prop]})`;
        element.style.transform = currentTransform + ' ' + scaleTransform;
      }
    });

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Solo actualizar si ha pasado suficiente tiempo para el próximo frame
      if (currentTime - lastFrameTime >= frameInterval) {
        const easedProgress = easingFunction(progress);

        // Interpolar todas las propiedades
        Object.keys(toProps).forEach(prop => {
          const fromValue = fromProps[prop];
          const toValue = toProps[prop];
          
          if (prop === 'opacity') {
            const currentValue = fromValue + (toValue - fromValue) * easedProgress;
            element.style.opacity = currentValue;
          } else if (prop === 'translateX') {
            const currentValue = fromValue + (toValue - fromValue) * easedProgress;
            element.style.transform = `translate3d(${currentValue}%, 0, 0)`;
          } else if (prop === 'scale') {
            const currentValue = fromValue + (toValue - fromValue) * easedProgress;
            element.style.transform = `scale(${currentValue})`;
          } else if (prop === 'transform') {
            // Para transformaciones complejas
            element.style.transform = toValue;
          }
        });

        lastFrameTime = currentTime;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        if (onComplete) onComplete();
        resolve();
      }
    }

    requestAnimationFrame(animate);
  });
}

/**
 * Animaciones predefinidas ultra suaves
 */
export const SmoothAnimations = {
  
  /**
   * Fade In ultra suave con micro-scaling
   */
  async fadeIn(element, duration = ANIMATION_CONFIG.duration) {
    element.style.willChange = 'opacity, transform';
    
    await animateElement(
      element,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1 },
      duration,
      ANIMATION_CONFIG.easings.fadeIn
    );
    
    element.style.willChange = 'auto';
  },

  /**
   * Fade Out ultra suave con micro-scaling
   */
  async fadeOut(element, duration = ANIMATION_CONFIG.duration) {
    element.style.willChange = 'opacity, transform';
    
    await animateElement(
      element,
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0.98 },
      duration,
      ANIMATION_CONFIG.easings.fadeOut
    );
    
    element.style.willChange = 'auto';
  },

  /**
   * Slide In desde la derecha ultra suave
   */
  async slideInFromRight(element, duration = ANIMATION_CONFIG.duration) {
    element.style.willChange = 'transform, opacity';
    
    // Animación en múltiples fases para máxima suavidad
    await Promise.all([
      // Animación de posición
      animateElement(
        element,
        { translateX: 100 },
        { translateX: 0 },
        duration,
        ANIMATION_CONFIG.easings.slideIn
      ),
      // Animación de opacidad (ligeramente más rápida)
      animateElement(
        element,
        { opacity: 0 },
        { opacity: 1 },
        duration * 0.8,
        ANIMATION_CONFIG.easings.fadeIn
      )
    ]);
    
    element.style.willChange = 'auto';
  },

  /**
   * Slide Out hacia la izquierda ultra suave
   */
  async slideOutToLeft(element, duration = ANIMATION_CONFIG.duration) {
    element.style.willChange = 'transform, opacity';
    
    await Promise.all([
      // Animación de posición
      animateElement(
        element,
        { translateX: 0 },
        { translateX: -100 },
        duration,
        ANIMATION_CONFIG.easings.slideOut
      ),
      // Animación de opacidad (más rápida que la posición)
      animateElement(
        element,
        { opacity: 1 },
        { opacity: 0 },
        duration * 0.7,
        ANIMATION_CONFIG.easings.fadeOut
      )
    ]);
    
    element.style.willChange = 'auto';
  },

  /**
   * Animación compleja para feedback screen
   */
  async slideOutToLeftFeedback(element, duration = ANIMATION_CONFIG.duration) {
    element.style.willChange = 'transform, opacity';
    
    // Animación en tres fases para ultra suavidad
    const phase1Duration = duration * 0.3;
    const phase2Duration = duration * 0.4;
    const phase3Duration = duration * 0.3;

    // Fase 1: Inicio lento
    await Promise.all([
      animateElement(
        element,
        { translateX: 0, opacity: 1, scale: 1 },
        { translateX: -15, opacity: 0.8, scale: 0.99 },
        phase1Duration,
        easeOutQuart
      )
    ]);

    // Fase 2: Aceleración gradual
    await Promise.all([
      animateElement(
        element,
        { translateX: -15, opacity: 0.8, scale: 0.99 },
        { translateX: -60, opacity: 0.4, scale: 0.97 },
        phase2Duration,
        easeInOutCubic
      )
    ]);

    // Fase 3: Finalización rápida
    await Promise.all([
      animateElement(
        element,
        { translateX: -60, opacity: 0.4, scale: 0.97 },
        { translateX: -100, opacity: 0, scale: 0.95 },
        phase3Duration,
        easeInOutQuint
      )
    ]);
    
    element.style.willChange = 'auto';
  },

  /**
   * Animación de screensaver con efectos especiales
   */
  async screensaverEnter(element, duration = ANIMATION_CONFIG.duration * 1.2) {
    element.style.willChange = 'opacity, transform, filter';
    
    // Efecto de aparición muy gradual con blur
    element.style.filter = 'blur(5px)';
    
    await Promise.all([
      animateElement(
        element,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1 },
        duration,
        easeOutExpo
      ),
      // Reducir blur gradualmente
      new Promise((resolve) => {
        const startTime = performance.now();
        function animateBlur(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const blurValue = 5 * (1 - easeOutQuart(progress));
          element.style.filter = `blur(${blurValue}px)`;
          
          if (progress < 1) {
            requestAnimationFrame(animateBlur);
          } else {
            element.style.filter = 'none';
            resolve();
          }
        }
        requestAnimationFrame(animateBlur);
      })
    ]);
    
    element.style.willChange = 'auto';
  }
};

/**
 * Sistema de gestión de transiciones entre pantallas
 */
export class ScreenTransitionManager {
  constructor() {
    this.isAnimating = false;
    this.currentScreen = null;
  }

  async transitionToScreen(fromElement, toElement, transitionType = 'slide') {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    
    try {
      // Preparar elementos
      if (toElement) {
        toElement.style.display = 'block';
        toElement.style.pointerEvents = 'none';
      }

      // Ejecutar animaciones según el tipo
      switch (transitionType) {
        case 'slide':
          await Promise.all([
            fromElement ? SmoothAnimations.slideOutToLeft(fromElement) : Promise.resolve(),
            toElement ? SmoothAnimations.slideInFromRight(toElement) : Promise.resolve()
          ]);
          break;
          
        case 'fade':
          if (fromElement) await SmoothAnimations.fadeOut(fromElement);
          if (toElement) await SmoothAnimations.fadeIn(toElement);
          break;
          
        case 'feedback':
          await Promise.all([
            fromElement ? SmoothAnimations.slideOutToLeftFeedback(fromElement) : Promise.resolve(),
            toElement ? SmoothAnimations.fadeIn(toElement) : Promise.resolve()
          ]);
          break;
          
        case 'screensaver':
          if (fromElement) await SmoothAnimations.fadeOut(fromElement);
          if (toElement) await SmoothAnimations.screensaverEnter(toElement);
          break;
      }

      // Limpiar elementos
      if (fromElement) {
        fromElement.style.display = 'none';
      }
      if (toElement) {
        toElement.style.pointerEvents = 'auto';
      }

      this.currentScreen = toElement;
      
    } finally {
      this.isAnimating = false;
    }
  }

  isTransitioning() {
    return this.isAnimating;
  }
}

// Instancia global del manager
export const screenTransitionManager = new ScreenTransitionManager();
