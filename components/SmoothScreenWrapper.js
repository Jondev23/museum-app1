import React, { useEffect, useRef } from 'react';
import { useSmoothAnimations } from '../hooks/useSmoothAnimations';

/**
 * Componente wrapper que demuestra las animaciones JavaScript ultra suaves
 * Reemplaza las clases CSS por animaciones programáticas
 */
const SmoothScreenWrapper = ({ 
  children, 
  animationType = 'fadeIn', 
  duration,
  onAnimationComplete,
  className = '',
  style = {} 
}) => {
  const { elementRef, animations, isAnimating } = useSmoothAnimations();
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const animate = async () => {
      if (hasAnimatedRef.current || !elementRef.current) return;
      
      hasAnimatedRef.current = true;
      
      try {
        switch (animationType) {
          case 'fadeIn':
            await animations.fadeIn(duration);
            break;
          case 'slideInFromRight':
            await animations.slideInFromRight(duration);
            break;
          case 'screensaverEnter':
            await animations.screensaverEnter(duration);
            break;
          default:
            await animations.fadeIn(duration);
        }
        
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      } catch (error) {
        console.error('Error en animación:', error);
      }
    };

    // Pequeño delay para asegurar que el DOM esté listo
    const timeout = setTimeout(animate, 50);
    return () => clearTimeout(timeout);
  }, [animationType, duration, animations, onAnimationComplete]);

  return (
    <div
      ref={elementRef}
      className={`js-animate ${className}`}
      style={{
        opacity: 0, // Inicial oculto para la animación
        ...style
      }}
    >
      {children}
    </div>
  );
};

/**
 * Componente para transiciones entre pantallas con JavaScript
 */
export const SmoothScreenTransition = ({ 
  currentScreen, 
  nextScreen, 
  transitionType = 'slide',
  onTransitionComplete 
}) => {
  const currentRef = useRef(null);
  const nextRef = useRef(null);
  const { transitionManager } = useSmoothAnimations();
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const performTransition = async () => {
      if (isTransitioningRef.current || !currentRef.current || !nextRef.current) return;
      
      isTransitioningRef.current = true;
      
      try {
        await transitionManager.transitionToScreen(
          currentRef.current,
          nextRef.current,
          transitionType
        );
        
        if (onTransitionComplete) {
          onTransitionComplete();
        }
      } catch (error) {
        console.error('Error en transición:', error);
      } finally {
        isTransitioningRef.current = false;
      }
    };

    if (currentScreen && nextScreen) {
      performTransition();
    }
  }, [currentScreen, nextScreen, transitionType, transitionManager, onTransitionComplete]);

  return (
    <div className="screen-container hw-accelerated">
      <div ref={currentRef} className="absolute inset-0">
        {currentScreen}
      </div>
      <div ref={nextRef} className="absolute inset-0" style={{ display: 'none' }}>
        {nextScreen}
      </div>
    </div>
  );
};

export default SmoothScreenWrapper;
