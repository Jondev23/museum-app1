import { useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';

export const useScreensaverScreen = () => {
  const { startQuiz, content, language } = useApp();

  // Datos memoizados
  const screensaverContent = useMemo(() => content?.[language]?.screensaver, [content, language]);
  
  // Validación de datos
  const isValidData = useMemo(() => Boolean(content?.[language]), [content, language]);
  const isLoading = useMemo(() => !isValidData, [isValidData]);

  // Handler para touch/click
  const handleTouch = useCallback(() => {
    console.log('Screensaver touched, transitioning to start screen');
    startQuiz();
  }, [startQuiz]);

  // Contenido por defecto memoizado
  const defaultContent = useMemo(() => ({
    message: 'Touch the screen to begin',
    videoSource: '/videos/Mi proyecto (7).mp4'
  }), []);

  return {
    // Estados
    isLoading,
    isValidData,
    
    // Datos
    screensaverContent,
    defaultContent,
    
    // Handlers
    handleTouch,
  };
};
