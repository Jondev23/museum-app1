import { useState, useCallback, useMemo, useEffect } from 'react';
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
  
  // Resetear selectedAnswer cuando cambia la pregunta
  useEffect(() => {
    console.log('Resetting selectedAnswer for question index:', currentQuestionIndex);
    setSelectedAnswer(null);
  }, [currentQuestionIndex]);
  
  // Memoizar datos derivados
  const question = useMemo(() => getCurrentQuestion(), [getCurrentQuestion]);
  const startContent = useMemo(() => content?.[language]?.startScreen, [content, language]);

  // Handler para manejar el clic en respuestas
  const handleAnswerClick = useCallback((answerIndex, answerDelay) => {
    // Doble verificación: asegurar que no hay respuesta seleccionada
    if (selectedAnswer !== null) {
      console.warn('Intento de seleccionar respuesta cuando ya hay una seleccionada:', { selectedAnswer, answerIndex });
      return;
    }
    
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
    const baseClasses = 'transition-all duration-75 transform bg-transparent';
    
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
      // Exactamente el mismo estilo que en FeedbackScreen
      return {
        ...baseStyle,
        backgroundColor: 'var(--color-neutral-light)',
        border: 'min(0.1125rem, 0.225vw, 0.3vh) solid var(--color-neutral-light)',
        minWidth: 'min(42.3rem, 63vw, 80vh)',
        minHeight: 'min(4.62rem, 6.93vh, 8vw)',
        maxWidth: '90vw',
        width: 'auto',
        height: 'auto',
        padding: 'min(1rem, 1.5vh, 2vw) min(4rem, 5vw, 6vh)',
        borderRadius: 'min(4.62rem, 6.93vh, 8vw)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        flex: '0 0 auto'
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
