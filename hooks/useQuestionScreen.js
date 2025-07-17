import { useState, useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';

export const useQuestionScreen = () => {
  const {
    getCurrentQuestion,
    answerQuestion,
    content,
    language,
    currentQuestionIndex
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
    const baseClasses = 'transition-all duration-300 transform bg-transparent';
    
    if (selectedAnswer === null) {
      return `${baseClasses} hover:bg-white/10 hover:shadow-lg hover:scale-102 active:scale-98 cursor-pointer`;
    }
    
    if (selectedAnswer === index) {
      return `${baseClasses} bg-white/30 scale-102 shadow-xl`;
    }
    
    return `${baseClasses} opacity-60 cursor-not-allowed`;
  }, [selectedAnswer]);

  return {
    // Datos
    question,
    startContent,
    currentQuestionIndex,
    selectedAnswer,
    isValidData,
    
    // Funciones
    handleAnswerClick,
    getButtonClassName
  };
};
