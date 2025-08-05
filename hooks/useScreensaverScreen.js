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
  const isLoading = useMemo(() => !content || !content[language], [content, language]);

  // Always show screensaver content, even with fallback data
  const shouldShowScreensaver = useMemo(() => true, []);

  // Handle touch interaction to exit screensaver
  const handleTouch = useCallback(() => {
    console.log('🖱️ Screensaver touched, transitioning to start screen');
    console.log('🖱️ Calling startQuiz()...');
    startQuiz();
  }, [startQuiz]);

  // Default fallback content for screensaver
  const defaultContent = useMemo(() => ({
    message: 'Touch the screen to begin',
    videoSource: screensaverContent?.videoSource || '/videos/screensaver-video.mp4',
    title: screensaverContent?.title || 'Welcome to the Museum'
  }), [screensaverContent]);

  return {
    isLoading,
    isValidData,
    shouldShowScreensaver,
    
    screensaverContent,
    defaultContent,
    
    handleTouch,
  };
};
