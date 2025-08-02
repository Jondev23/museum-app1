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
        enter: { opacity: 1, duration: 0.9, ease: "power2.out" },
        exit: { opacity: 0, duration: 0.9, ease: "power2.in" }
      },
      start: {
        enter: { x: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
        exit: { x: "-100%", opacity: 0, duration: 0.9, ease: "power2.in" },
        initial: { x: "100%", opacity: 0 }
      },
      question: {
        enter: { x: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
        exit: { opacity: 0, duration: 0.9, ease: "power2.in" },
        initial: { x: "100%", opacity: 0 }
      },
      feedback: {
        enter: { opacity: 1, duration: 0.9, ease: "power2.out" },
        exit: { x: "-100%", opacity: 0, duration: 0.9, ease: "power2.in" }
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
    if (currentScreen !== displayedScreen && !isTransitioning) {
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
