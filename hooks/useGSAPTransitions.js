// Import React hooks and GSAP
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Custom hook for handling screen transitions with GSAP
const useGSAPTransitions = (currentScreen, currentQuestionIndex) => {
  const [displayedScreen, setDisplayedScreen] = useState(currentScreen);
  const [displayedQuestionIndex, setDisplayedQuestionIndex] = useState(currentQuestionIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  // Animation configurations for different screen types
  const getAnimationConfig = (screenType, animationType) => {
    const configs = {
      screensaver: {
        enter: { opacity: 1, duration: 0, ease: "none" },
        exit: { opacity: 1, duration: 0, ease: "none" },
        initial: { opacity: 1 }
      },
      start: {
        enter: { x: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
        exit: { x: "-100%", opacity: 0, duration: 0.9, ease: "power2.in" },
        initial: { x: "100%", opacity: 0 }
      },
      question: {
        enter: { x: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
        exit: { 
          opacity: 0, 
          duration: 0.9, 
          ease: "power2.in",
          onStart: () => {
            // Identificar el botón seleccionado y crear animación secuencial
            const selectedButton = document.querySelector('.btn-answer:has(.selected)');
            if (selectedButton) {
              // Obtener todos los botones excepto el seleccionado
              const allButtons = document.querySelectorAll('.btn-answer');
              const otherButtons = Array.from(allButtons).filter(btn => btn !== selectedButton);
              
              // Animar primero el título de la pregunta
              const questionTitle = document.querySelector('[class*="QuestionTitle"], .question-title');
              if (questionTitle) {
                gsap.to(questionTitle, {
                  opacity: 0,
                  y: -20,
                  duration: 0.4,
                  ease: "power2.in"
                });
              }
              
              // Animar los botones no seleccionados con stagger
              gsap.to(otherButtons, {
                opacity: 0,
                y: -15,
                duration: 0.4,
                delay: 0.1,
                stagger: 0.08,
                ease: "power2.in"
              });
              
              // Finalmente animar el botón seleccionado
              gsap.to(selectedButton, {
                opacity: 0,
                scale: 0.95,
                duration: 0.35,
                delay: 0.6,
                ease: "power2.in"
              });
            }
          }
        },
        initial: { x: "100%", opacity: 0 }
      },
      feedback: {
        enter: { x: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
        exit: { x: "-100%", opacity: 0, duration: 0.9, ease: "power2.in" },
        initial: { x: "100%", opacity: 0 }
      },
      results: {
        enter: { x: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
        exit: { x: "-100%", opacity: 0, duration: 0.9, ease: "power2.in" },
        initial: { x: "100%", opacity: 0 }
      }
    };

    return configs[screenType]?.[animationType] || configs.screensaver[animationType];
  };

  // Handle screen transitions with GSAP animations
  useEffect(() => {
    console.log('🎬 useGSAPTransitions - currentScreen:', currentScreen, 'displayedScreen:', displayedScreen, 'isTransitioning:', isTransitioning);
    
    // Skip if screens are already the same and not transitioning
    if (currentScreen === displayedScreen && !isTransitioning) {
      console.log('🎬 Screens already match, skipping transition');
      return;
    }
    
    // If transitioning TO screensaver, update immediately (no animation needed)
    if (currentScreen === 'screensaver' && displayedScreen !== 'screensaver') {
      console.log('🎬 Transitioning TO screensaver - immediate update');
      setDisplayedScreen('screensaver');
      setDisplayedQuestionIndex(currentQuestionIndex);
      return;
    }
    
    // If transitioning FROM screensaver, update immediately (no animation needed)
    if (displayedScreen === 'screensaver' && currentScreen !== 'screensaver') {
      console.log('🎬 Transitioning FROM screensaver - immediate update');
      setDisplayedScreen(currentScreen);
      setDisplayedQuestionIndex(currentQuestionIndex);
      return;
    }
    
    if (currentScreen !== displayedScreen && !isTransitioning && currentScreen !== 'screensaver' && displayedScreen !== 'screensaver') {
      console.log('🎬 Starting transition from', displayedScreen, 'to', currentScreen);
      setIsTransitioning(true);
      
      if (containerRef.current) {
        // Get exit animation config
        const exitConfig = getAnimationConfig(displayedScreen, 'exit');
        
        // Apply exit animation
        gsap.to(containerRef.current, {
          ...exitConfig,
          onComplete: () => {
            // Change screen after exit animation
            setDisplayedScreen(currentScreen);
            setDisplayedQuestionIndex(currentQuestionIndex);
            
            // Apply initial state for enter animation
            const initialConfig = getAnimationConfig(currentScreen, 'initial');
            if (initialConfig) {
              gsap.set(containerRef.current, initialConfig);
            }
            
            // Apply enter animation
            const enterConfig = getAnimationConfig(currentScreen, 'enter');
            gsap.to(containerRef.current, {
              ...enterConfig,
              onComplete: () => {
                setIsTransitioning(false);
              }
            });
          }
        });
      }
    }
  }, [currentScreen, displayedScreen, isTransitioning, currentQuestionIndex]);

  return {
    displayedScreen,
    displayedQuestionIndex,
    isTransitioning,
    containerRef
  };
};

export default useGSAPTransitions;
