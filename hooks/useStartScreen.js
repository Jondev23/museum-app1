// Import React hooks and app context
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';

// Custom hook for start screen functionality
export const useStartScreen = () => {
  // Get app context functions and data
  const { startQuestions, content, language } = useApp();
  
  // Local state for content animation
  const [showContent, setShowContent] = useState(false);

  // Effect to show content with delay for animation
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100); // Reducido para mejor sincronización
    return () => clearTimeout(timer);
  }, []);

  // Memoized start screen content based on current language
  const startContent = useMemo(() => content?.[language]?.startScreen, [content, language]);
  
  // Check if we have valid data to display
  const isValidData = useMemo(() => Boolean(content?.[language]), [content, language]);

  // Handle touch gestures for swiping left to start quiz
  const handleTouchStart = useCallback((e) => {
    if (!e.touches || e.touches.length === 0) return;
    
    const startX = e.touches[0].clientX;
    
    const handleTouchMove = (e) => {
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
      
      // If swipe left is detected (>100px), start the quiz
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

  // Handle click/tap to start quiz
  const handleClick = useCallback(() => {
    startQuestions();
  }, [startQuestions]);

  // Default fallback texts in case content is not loaded
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
    handleClick,
  };
};
