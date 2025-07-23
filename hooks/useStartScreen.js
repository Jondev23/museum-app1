import { useState, useEffect, useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';

export const useStartScreen = () => {
  const { startQuestions, content, language } = useApp();
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

  // Handler para touch start con lógica de swipe (simplificado)
  const handleTouchStart = useCallback((e) => {
    // Solo procesar si es un touch event real
    if (!e.touches || e.touches.length === 0) return;
    
    const startX = e.touches[0].clientX;
    
    const handleTouchMove = (e) => {
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
      
      // Swipe left de mínimo 100px para ir a preguntas
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
    handleTouchStart,
  };
};
