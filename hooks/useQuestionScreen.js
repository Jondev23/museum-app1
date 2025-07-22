import { useState, useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';

export const useQuestionScreen = () => {
  const {
    getCurrentQuestion,
    answerQuestion,
    content,
    language,
    currentQuestionIndex,
    answers,
    questions
  } = useApp();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  // Memoizar datos derivados
  const question = useMemo(() => getCurrentQuestion(), [getCurrentQuestion]);
  const startContent = useMemo(() => content?.[language]?.startScreen, [content, language]);

  // Handler para manejar el clic en respuestas
  const handleAnswerClick = useCallback((answerIndex, answerDelay) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    
    const timeoutId = setTimeout(() => {
      answerQuestion(answerIndex);
    }, answerDelay);
    
    // Cleanup implícito - React limpiará automáticamente el timeout
    return () => clearTimeout(timeoutId);
  }, [selectedAnswer, answerQuestion]);

  // Validación de datos
  const isValidData = useMemo(() => {
    return question && content?.[language];
  }, [question, content, language]);

  // Función para obtener el className del botón
  const getButtonClassName = useCallback((index) => {
    const baseClasses = 'transition-all duration-150 transform bg-transparent';
    
    if (selectedAnswer === null) {
      return `${baseClasses} hover:bg-white/10 hover:shadow-lg hover:scale-102 active:scale-98 cursor-pointer`;
    }
    
    if (selectedAnswer === index) {
      return `${baseClasses} scale-102 shadow-xl cursor-not-allowed`;
    }
    
    return `${baseClasses} opacity-60 cursor-not-allowed`;
  }, [selectedAnswer]);

  // Función para obtener el estilo del botón seleccionado
  const getButtonStyle = useCallback((index) => {
    const baseStyle = { 
      borderColor: 'var(--color-neutral-light)',
      touchAction: 'manipulation',
      userSelect: 'none',
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none'
    };
    
    if (selectedAnswer === index) {
      return {
        ...baseStyle,
        backgroundColor: 'var(--color-neutral-light)'
      };
    }
    
    return baseStyle;
  }, [selectedAnswer]);

  return {
    // Datos
    question,
    startContent,
    currentQuestionIndex,
    selectedAnswer,
    isValidData,
    answers,
    questions,
    
    // Funciones
    handleAnswerClick,
    getButtonClassName,
    getButtonStyle
  };
};
