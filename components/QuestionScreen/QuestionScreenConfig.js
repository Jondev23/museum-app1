// Import React hooks for memoization
import { useMemo, useCallback } from 'react';

// Configuration constants for question screen behavior and animations
export const QUESTION_CONFIG = {
  TOTAL_QUESTIONS: 5,      // Total number of questions in quiz
  ANSWER_DELAY: 800,       // Delay before processing answer (ms)
  
  // Animation delay timings in seconds
  ANIMATION_DELAYS: {
    TITLE: 0.2,           // Question title animation delay
    BUTTONS: 0.4,         // Answer buttons group delay
    BUTTON_STAGGER: 0.1,  // Stagger delay between individual buttons
    BUTTON_BASE: 0.6,     // Base delay for button animations
  },
  
  // Animation duration timings in seconds
  ANIMATION_DURATIONS: {
    SCREEN_TRANSITION: 0.8,    // Screen transition duration
    TITLE: 0.6,               // Title animation duration
    BUTTONS: 0.6,             // Button group animation duration
    BUTTON_INDIVIDUAL: 0.4,   // Individual button animation duration
  },
};

// Custom hook for question screen styles with memoization
export const useQuestionScreenStyles = (startContent) => {
  // Background style with fallback image
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url(${startContent?.backgroundImage || '/images/Bild_Kutsche.webp'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }), [startContent?.backgroundImage]);

  // Progress dots positioning styles
  const progressDotsStyle = useMemo(() => ({
    left: '50%',
    bottom: 'min(4.8rem, 7.8vh)', // Responsive bottom spacing
    transform: 'translateX(-50%)', // Center horizontally
    zIndex: 30                     // Ensure above other elements
  }), []);

  return {
    backgroundStyle,
    progressDotsStyle
  };
};
