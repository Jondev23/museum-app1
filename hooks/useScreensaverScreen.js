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
    console.log('🔴 SCREENSAVER handleTouch called! This should only happen from ScreensaverScreen', {
      currentLocation: window.location.href,
      timestamp: new Date().toISOString(),
      stackTrace: new Error().stack
    });
    console.log('Screensaver touched, transitioning to start screen');
    startQuiz();
  }, [startQuiz]);

  // Contenido por defecto memoizado
  const defaultContent = useMemo(() => ({
    message: 'Touch the screen to begin',
    handIcon: '/images/OE_Touch_128 2.svg',
    videoSource: '/videos/Mi proyecto (7).mp4'
  }), []);

  // Lógica para determinar el tipo de icono
  const iconConfig = useMemo(() => {
    const iconSource = screensaverContent?.handIcon || defaultContent.handIcon;
    const isImageIcon = iconSource.includes('.svg') || iconSource.includes('.png') || iconSource.includes('.jpg');
    
    return {
      source: iconSource,
      isImage: isImageIcon,
      fallback: defaultContent.handIcon
    };
  }, [screensaverContent?.handIcon, defaultContent.handIcon]);

  return {
    // Estados
    isLoading,
    isValidData,
    
    // Datos
    screensaverContent,
    defaultContent,
    iconConfig,
    
    // Handlers
    handleTouch,
  };
};
