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
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    console.log('Resetting selectedAnswer for question index:', currentQuestionIndex);
    setSelectedAnswer(null);
    setIsProcessing(false);
  }, [currentQuestionIndex]);
  
  const question = useMemo(() => getCurrentQuestion(), [getCurrentQuestion]);
  const startContent = useMemo(() => content?.[language]?.startScreen, [content, language]);

  const handleAnswerClick = useCallback((answerIndex, answerDelay) => {
    if (selectedAnswer !== null || isProcessing) {
      console.warn('Attempt to select an answer when one is already selected or being processed.', { selectedAnswer, answerIndex, isProcessing });
      return;
    }
    
    setIsProcessing(true);
    setSelectedAnswer(answerIndex);
    
    const timeoutId = setTimeout(() => {
      answerQuestion(answerIndex);
      setIsProcessing(false);
    }, answerDelay);
    
    return () => clearTimeout(timeoutId);
  }, [selectedAnswer, isProcessing, answerQuestion]);

  const isValidData = useMemo(() => {
    return question && content?.[language];
  }, [question, content, language]);

  const getButtonClassName = useCallback((index) => {
    const baseClasses = 'transition-all duration-75 transform bg-transparent';
    
    if (selectedAnswer === null && !isProcessing) {
      return `${baseClasses} hover:bg-white/10 hover:shadow-lg hover:scale-102 active:scale-98 cursor-pointer`;
    }
    
    if (selectedAnswer === index) {
      return `${baseClasses} scale-102 shadow-xl cursor-not-allowed`;
    }
    
    return `${baseClasses} opacity-60 cursor-not-allowed`;
  }, [selectedAnswer, isProcessing]);

  const getButtonStyle = useCallback((index) => {
    const baseStyle = { 
      touchAction: 'manipulation',
      userSelect: 'none',
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      borderWidth: 'min(0.1125rem, 0.225vw, 0.3vh)',
      borderStyle: 'solid',
      borderColor: 'var(--color-neutral-light)'
    };
    
    if (selectedAnswer === index) {
      return {
        ...baseStyle,
        backgroundColor: 'var(--color-neutral-light)',
        borderColor: 'var(--color-neutral-light)',
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
    question,
    startContent,
    currentQuestionIndex,
    selectedAnswer,
    isValidData,
    answers,
    questions,
    isProcessing,
    
    handleAnswerClick,
    getButtonClassName,
    getButtonStyle
  };
};
