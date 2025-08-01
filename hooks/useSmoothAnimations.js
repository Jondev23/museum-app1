import { useRef, useCallback, useEffect } from 'react';
import { SmoothAnimations, screenTransitionManager } from '../utils/smoothAnimations';

/**
 * Hook personalizado para animaciones ultra suaves con JavaScript
 */
export const useSmoothAnimations = () => {
  const elementRef = useRef(null);
  const isAnimatingRef = useRef(false);

  // Función para animar fade in
  const fadeIn = useCallback(async (duration) => {
    if (!elementRef.current || isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    try {
      await SmoothAnimations.fadeIn(elementRef.current, duration);
    } finally {
      isAnimatingRef.current = false;
    }
  }, []);

  // Función para animar fade out
  const fadeOut = useCallback(async (duration) => {
    if (!elementRef.current || isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    try {
      await SmoothAnimations.fadeOut(elementRef.current, duration);
    } finally {
      isAnimatingRef.current = false;
    }
  }, []);

  // Función para slide in desde la derecha
  const slideInFromRight = useCallback(async (duration) => {
    if (!elementRef.current || isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    try {
      await SmoothAnimations.slideInFromRight(elementRef.current, duration);
    } finally {
      isAnimatingRef.current = false;
    }
  }, []);

  // Función para slide out hacia la izquierda
  const slideOutToLeft = useCallback(async (duration) => {
    if (!elementRef.current || isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    try {
      await SmoothAnimations.slideOutToLeft(elementRef.current, duration);
    } finally {
      isAnimatingRef.current = false;
    }
  }, []);

  // Función para animación de feedback
  const slideOutToLeftFeedback = useCallback(async (duration) => {
    if (!elementRef.current || isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    try {
      await SmoothAnimations.slideOutToLeftFeedback(elementRef.current, duration);
    } finally {
      isAnimatingRef.current = false;
    }
  }, []);

  // Función para animación de screensaver
  const screensaverEnter = useCallback(async (duration) => {
    if (!elementRef.current || isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    try {
      await SmoothAnimations.screensaverEnter(elementRef.current, duration);
    } finally {
      isAnimatingRef.current = false;
    }
  }, []);

  // Función genérica para transiciones entre pantallas
  const transitionToScreen = useCallback(async (toElementRef, transitionType = 'slide') => {
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    try {
      await screenTransitionManager.transitionToScreen(
        elementRef.current,
        toElementRef?.current,
        transitionType
      );
    } finally {
      isAnimatingRef.current = false;
    }
  }, []);

  // Cleanup al desmontar el componente
  useEffect(() => {
    return () => {
      if (elementRef.current) {
        elementRef.current.style.willChange = 'auto';
      }
    };
  }, []);

  return {
    elementRef,
    isAnimating: isAnimatingRef.current,
    animations: {
      fadeIn,
      fadeOut,
      slideInFromRight,
      slideOutToLeft,
      slideOutToLeftFeedback,
      screensaverEnter,
      transitionToScreen
    },
    transitionManager: screenTransitionManager
  };
};

/**
 * Hook específico para transiciones de pantallas
 */
export const useScreenTransitions = () => {
  const currentScreenRef = useRef(null);
  const nextScreenRef = useRef(null);

  const transitionTo = useCallback(async (transitionType = 'slide') => {
    if (screenTransitionManager.isTransitioning()) return;

    await screenTransitionManager.transitionToScreen(
      currentScreenRef.current,
      nextScreenRef.current,
      transitionType
    );

    // Intercambiar referencias
    const temp = currentScreenRef.current;
    currentScreenRef.current = nextScreenRef.current;
    nextScreenRef.current = temp;
  }, []);

  return {
    currentScreenRef,
    nextScreenRef,
    transitionTo,
    isTransitioning: screenTransitionManager.isTransitioning()
  };
};
