import { useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';

export const useScreensaverScreen = () => {
  const { startQuiz, content, language } = useApp();

  const screensaverContent = useMemo(() => content?.[language]?.screensaver, [content, language]);
  
  const isValidData = useMemo(() => Boolean(content?.[language]), [content, language]);
  const isLoading = useMemo(() => !isValidData, [isValidData]);

  const handleTouch = useCallback(() => {
    console.log('Screensaver touched, transitioning to start screen');
    startQuiz();
  }, [startQuiz]);

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
