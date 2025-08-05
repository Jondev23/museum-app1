// Import React hooks for memoization
import { useMemo, useCallback } from 'react';

// Configuration constants for question screen behavior and animations
export const QUESTION_CONFIG = {
  TOTAL_QUESTIONS: 5,      
  ANSWER_DELAY: 800,
  };       
  

// Custom hook for question screen styles with memoization
export const useQuestionScreenStyles = (startContent) => {
  // Background style with fallback image
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url(${startContent?.backgroundImage || './images/Bild_Kutsche.webp'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }), [startContent?.backgroundImage]);

  // Progress dots positioning styles
  const progressDotsStyle = useMemo(() => ({
    left: '50%',
    bottom: 'min(4.8rem, 7.8vh)', 
    transform: 'translateX(-50%)', 
    zIndex: 30                    
  }), []);

  return {
    backgroundStyle,
    progressDotsStyle
  };
};
