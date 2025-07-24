import { useState, useEffect, useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';

export const useStartScreen = () => {
  const { startQuestions, content, language } = useApp();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const startContent = useMemo(() => content?.[language]?.startScreen, [content, language]);
  
  const isValidData = useMemo(() => Boolean(content?.[language]), [content, language]);

  const handleTouchStart = useCallback((e) => {
    if (!e.touches || e.touches.length === 0) return;
    
    const startX = e.touches[0].clientX;
    
    const handleTouchMove = (e) => {
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
      
      if (diffX > 100) {
        startQuestions();
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
  }, [startQuestions]);

  const defaultTexts = useMemo(() => ({
    title: 'Wie weit? Wie lange?',
    subtitle: 'Distanzen des Reisens im 19. Jahrhundert',
    highlightText: 'Teste dein Wissen!',
    introText: 'Entdecken Sie die faszinierende Welt historischer Kutschen. Testen Sie Ihr Wissen mit unserem Quiz!'
  }), []);

  return {
    showContent,
    
    startContent,
    defaultTexts,
    isValidData,
    
    handleTouchStart,
  };
};
