// Import React hooks and GSAP
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Unified animation constants for consistency
const ANIMATION_DURATION = 0.8; // Consistent duration across all transitions
const EASING_IN = "power2.in";
const EASING_OUT = "power2.out";

// Custom hook for handling screen transitions with GSAP
const useGSAPTransitions = (currentScreen, currentQuestionIndex) => {
  const [displayedScreen, setDisplayedScreen] = useState(currentScreen);
  const [displayedQuestionIndex, setDisplayedQuestionIndex] = useState(currentQuestionIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  // Simplified and unified animation configurations
  const getAnimationConfig = (screenType, animationType) => {
    const configs = {
      screensaver: {
        enter: { opacity: 1, duration: 0, ease: "none" },
        exit: { opacity: 1, duration: 0, ease: "none" },
        initial: { opacity: 1 }
      },
      start: {
        enter: { x: 0, opacity: 1, duration: ANIMATION_DURATION, ease: EASING_OUT },
        exit: { x: "-100%", opacity: 0, duration: ANIMATION_DURATION, ease: EASING_IN },
        initial: { x: "100%", opacity: 0 }
      },
      question: {
        enter: { x: 0, opacity: 1, duration: ANIMATION_DURATION, ease: EASING_OUT },
        exit: { 
          opacity: 0, 
          duration: ANIMATION_DURATION, 
          ease: EASING_IN,
          onStart: () => {
              // Simplified question exit animation - more reliable
              const questionTitle = document.querySelector('[class*="QuestionTitle"], .question-title');
              const allButtons = document.querySelectorAll('.btn-answer');
              
              if (questionTitle) {
                gsap.to(questionTitle, {
                  opacity: 0,
                  y: -20,
                  duration: 0.3,
                  ease: EASING_IN
                });
              }
              
              if (allButtons.length > 0) {
                gsap.to(allButtons, {
                  opacity: 0,
                  y: -15,
                  duration: 0.3,
                  delay: 0.1,
                  ease: EASING_IN
                });
              }
            }
          }
        },
        initial: { x: "100%", opacity: 0 }
      },
      feedback: {
        enter: { x: 0, opacity: 1, duration: ANIMATION_DURATION, ease: EASING_OUT },
        exit: { x: "-100%", opacity: 0, duration: ANIMATION_DURATION, ease: EASING_IN },
        initial: { x: "100%", opacity: 0 }
      },
      results: {
        enter: { x: 0, opacity: 1, duration: ANIMATION_DURATION, ease: EASING_OUT },
        exit: { x: "-100%", opacity: 0, duration: ANIMATION_DURATION, ease: EASING_IN },
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
