// Custom hook for handling question screen transitions
import { useCallback } from 'react';
import { useApp } from '../context/AppContext';

export const useQuestionTransitions = () => {
  const { answerQuestion } = useApp();

  // Custom exit animation handler with CSS
  const handleExit = useCallback((answerIndex, callback) => {
    // Handle exit animation logic here
    // Similar to how it's done in FeedbackScreen
    
    // Wait for exit animation to complete before proceeding
    setTimeout(() => {
      if (typeof callback === 'function') {
        callback(answerIndex);
      }
    }, 600); // Match the CSS animation duration
  }, []);

  // Wrap the answerQuestion function with animation handling
  const handleAnswerWithAnimation = useCallback((answerIndex, delay) => {
    handleExit(answerIndex, () => {
      answerQuestion(answerIndex);
    });
  }, [answerQuestion, handleExit]);

  return {
    handleAnswerWithAnimation,
    handleExit
  };
};

export default useQuestionTransitions;
