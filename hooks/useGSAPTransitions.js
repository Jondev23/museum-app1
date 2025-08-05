// Import React hooks and GSAP
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Custom hook for handling screen transitions with GSAP
const useGSAPTransitions = (currentScreen, currentQuestionIndex) => {
  const [displayedScreen, setDisplayedScreen] = useState(currentScreen);
  const [displayedQuestionIndex, setDisplayedQuestionIndex] = useState(currentQuestionIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  // Initialize container to hidden state when first transitioning from screensaver
  useEffect(() => {
    if (containerRef.current && currentScreen !== 'screensaver' && displayedScreen === 'screensaver') {
      gsap.set(containerRef.current, { opacity: 0 });
    }
  }, [currentScreen, displayedScreen]);

  // Animation configurations for different screen types
  const getAnimationConfig = (screenType, animationType) => {
    const configs = {
      screensaver: {
        enter: { opacity: 1, duration: 0, ease: "none" },
        exit: { opacity: 1, duration: 0, ease: "none" },
        initial: { opacity: 1 }
      },
      start: {
        enter: { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        exit: { x: "-100%", opacity: 0, duration: 0.9, ease: "power2.in" },
        initial: { opacity: 0 } // Simplified - only control opacity
      },
      question: {
        enter: { x: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
        exit: { 
          opacity: 0, 
          duration: 0.9, 
          ease: "power2.in",
          onStart: () => {
            const selectedButton = document.querySelector('.btn-answer:has(.selected)');
            if (selectedButton) {
              const allButtons = document.querySelectorAll('.btn-answer');
              const otherButtons = Array.from(allButtons).filter(btn => btn !== selectedButton);
              
              const questionTitle = document.querySelector('[class*="QuestionTitle"], .question-title');
              if (questionTitle) {
                gsap.to(questionTitle, {
                  opacity: 0,
                  y: -20,
                  duration: 0.4,
                  ease: "power2.in"
                });
              }
              
              gsap.to(otherButtons, {
                opacity: 0,
                y: -15,
                duration: 0.4,
                delay: 0.1,
                stagger: 0.08,
                ease: "power2.in"
              });
              
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
        enter: { 
          opacity: 1, 
          duration: 0.6, 
          ease: "power2.out",
          onStart: () => {
            const feedbackAnswer = document.querySelector('.feedback-answer-text')?.parentElement;
            if (feedbackAnswer) {
              gsap.set(feedbackAnswer, { opacity: 0 });
              gsap.to(feedbackAnswer, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
              });
            }
            
            const otherElements = [
              '.feedback-title',
              '.feedback-message-text',
              '.feedback-explanation-text'
            ];
            
            otherElements.forEach((selector, index) => {
              const element = document.querySelector(selector);
              if (element) {
                gsap.set(element, { opacity: 0 });
                gsap.to(element, {
                  opacity: 1,
                  duration: 0.4,
                  delay: 0.3 + (index * 0.1),
                  ease: "power2.out"
                });
              }
            });

            setTimeout(() => {
              const buttonText = document.querySelector('.text-button');
              if (buttonText) {
                buttonText.classList.add('fade-in');
              }
            }, 600);
          }
        },
        exit: { 
          x: "-100%", 
          opacity: 0, 
          duration: 0.9, 
          ease: "power2.in",
          onStart: () => {
            const buttonText = document.querySelector('.text-button');
            if (buttonText) {
              buttonText.classList.remove('fade-in');
              buttonText.classList.add('fade-out');
            }
          }
        },
        initial: { opacity: 0 }
      },
      results: {
        enter: { x: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
        exit: { 
          duration: 0,
          onStart: () => {
          }
        },
        initial: { x: "100%", opacity: 0 }
      }
    };

    return configs[screenType]?.[animationType] || configs.screensaver[animationType];
  };

  // Handle screen transitions with GSAP animations
  useEffect(() => {
    // Only log when there's actually a transition happening
    if (currentScreen !== displayedScreen || isTransitioning) {
      console.log('🎬 useGSAPTransitions - currentScreen:', currentScreen, 'displayedScreen:', displayedScreen, 'isTransitioning:', isTransitioning);
    }
    
    // Skip if screens are already the same and not transitioning
    if (currentScreen === displayedScreen && !isTransitioning) {
      return;
    }
    
    // If transitioning TO screensaver, update immediately (no animation needed)
    if (currentScreen === 'screensaver' && displayedScreen !== 'screensaver') {
      console.log('🎬 Transitioning TO screensaver - immediate update');
      setDisplayedScreen('screensaver');
      setDisplayedQuestionIndex(currentQuestionIndex);
      return;
    }
    
    // If transitioning FROM screensaver, coordinate with target screen animations
    if (displayedScreen === 'screensaver' && currentScreen !== 'screensaver') {
      console.log('🎬 Transitioning FROM screensaver - coordinated update');
      setIsTransitioning(true);
      
      // Wait for ScreensaverScreen fade out to complete
      setTimeout(() => {
        setDisplayedScreen(currentScreen);
        setDisplayedQuestionIndex(currentQuestionIndex);
        
        // Immediately set container to hidden state and make it ready for animation
        if (containerRef.current && currentScreen !== 'screensaver') {
          // Force container to be completely hidden first
          gsap.set(containerRef.current, { 
            opacity: 0,
            x: 0,
            scale: 1,
            clearProps: "visibility" // Clear any visibility properties
          });
          
          // Start enter animation immediately after setting initial state
          const enterConfig = getAnimationConfig(currentScreen, 'enter');
          gsap.to(containerRef.current, {
            ...enterConfig,
            delay: 0.1, // Small delay to ensure clean state
            onComplete: () => {
              setIsTransitioning(false);
            }
          });
        } else {
          setIsTransitioning(false);
        }
      }, 350); // Match ScreensaverScreen fade out duration exactly
      return;
    }
    
    if (currentScreen !== displayedScreen && !isTransitioning && currentScreen !== 'screensaver' && displayedScreen !== 'screensaver') {
      console.log('🎬 Starting transition from', displayedScreen, 'to', currentScreen);
      console.log('🎬 containerRef.current exists:', !!containerRef.current);
      setIsTransitioning(true);
      
      if (containerRef.current) {
        // Get exit animation config
        const exitConfig = getAnimationConfig(displayedScreen, 'exit');
        console.log('🎬 Exit config for', displayedScreen, ':', exitConfig);
        
        // Apply exit animation
        gsap.to(containerRef.current, {
          ...exitConfig,
          onStart: () => {
            console.log('🎬 Exit animation STARTED for', displayedScreen);
          },
          onComplete: () => {
            console.log('🎬 Exit animation COMPLETED for', displayedScreen);
            setDisplayedScreen(currentScreen);
            if (currentQuestionIndex !== displayedQuestionIndex) {
              setDisplayedQuestionIndex(currentQuestionIndex);
            }
            
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

  // Handle question index changes separately to avoid interfering with animations
  useEffect(() => {
    // Only update displayedQuestionIndex if we're not transitioning and screens match
    if (!isTransitioning && currentScreen === displayedScreen && currentQuestionIndex !== displayedQuestionIndex) {
      setDisplayedQuestionIndex(currentQuestionIndex);
    }
  }, [currentQuestionIndex, displayedQuestionIndex, isTransitioning, currentScreen, displayedScreen]);

  return {
    displayedScreen,
    displayedQuestionIndex,
    isTransitioning,
    containerRef
  };
};

export default useGSAPTransitions;
