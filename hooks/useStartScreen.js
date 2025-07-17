import { useState, useEffect, useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';

export const useStartScreen = () => {
  const { beginQuiz, content, language } = useApp();
  const [showContent, setShowContent] = useState(false);

  // Efecto para mostrar contenido con delay
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Contenido memoizado
  const startContent = useMemo(() => content?.[language]?.startScreen, [content, language]);
  
  // Validación de datos
  const isValidData = useMemo(() => Boolean(content?.[language]), [content, language]);

  // Handler para swipe left
  const handleSwipeLeft = useCallback(() => {
    beginQuiz();
  }, [beginQuiz]);

  // Handler para touch start con lógica de swipe
  const handleTouchStart = useCallback((e) => {
    const startX = e.touches[0].clientX;
    
    const handleTouchMove = (e) => {
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
      
      // Usar la constante de configuración para la distancia mínima
      if (diffX > 100) { // Swipe left detected
        handleSwipeLeft();
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  }, [handleSwipeLeft]);

  // Textos por defecto memoizados
  const defaultTexts = useMemo(() => ({
    title: 'Wie weit? Wie lange?',
    subtitle: 'Distanzen des Reisens im 19. Jahrhundert',
    highlightText: 'Teste dein Wissen!',
    introText: 'Entdecken Sie die faszinierende Welt historischer Kutschen. Testen Sie Ihr Wissen mit unserem Quiz!'
  }), []);

  return {
    // Estados
    showContent,
    
    // Datos
    startContent,
    defaultTexts,
    isValidData,
    
    // Handlers
    handleSwipeLeft,
    handleTouchStart,
  };
};
