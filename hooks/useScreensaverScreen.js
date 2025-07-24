// Import React hooks and app context
import { useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';

// Custom hook for screensaver screen functionality
export const useScreensaverScreen = () => {
  // Get start quiz function and content from app context
  const { startQuiz, content, language } = useApp();

  // Get screensaver-specific content based on current language
  const screensaverContent = useMemo(() => content?.[language]?.screensaver, [content, language]);
  
  // Check if we have valid data and determine loading state
  const isValidData = useMemo(() => Boolean(content?.[language]), [content, language]);
  const isLoading = useMemo(() => !isValidData, [isValidData]);

  // Handle touch interaction to exit screensaver
  const handleTouch = useCallback(() => {
    console.log('Screensaver touched, transitioning to start screen');
    startQuiz();
  }, [startQuiz]);

  // Default fallback content for screensaver
  const defaultContent = useMemo(() => ({
    message: 'Touch the screen to begin',
    videoSource: '/videos/Mi proyecto (7).mp4'
  }), []);

  return {
    isLoading,
    isValidData,
    
    screensaverContent,
    defaultContent,
    
    handleTouch,
  };
};
