// Import React hooks and app context
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';

// Custom hook for question screen functionality
export const useQuestionScreen = () => {
  // Get quiz data and functions from app context
  const {
    getCurrentQuestion,
    answerQuestion,
    content,
    language,
    currentQuestionIndex,
    answers,
    questions
  } = useApp();

  // Local state for answer selection and processing
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Reset state when moving to a new question
  useEffect(() => {
    console.log('Resetting selectedAnswer for question index:', currentQuestionIndex);
    setSelectedAnswer(null);
    setIsProcessing(false);
  }, [currentQuestionIndex]);
  
  // Get current question data
  const question = useMemo(() => getCurrentQuestion(), [getCurrentQuestion]);
  const startContent = useMemo(() => content?.[language]?.startScreen, [content, language]);

  // Handle answer selection with processing delay
  const handleAnswerClick = useCallback((answerIndex, answerDelay) => {
    // Prevent multiple selections or processing
    if (selectedAnswer !== null || isProcessing) {
      console.warn('Attempt to select an answer when one is already selected or being processed.', { selectedAnswer, answerIndex, isProcessing });
      return;
    }
    
    setIsProcessing(true);
    setSelectedAnswer(answerIndex);
    
    // Process answer after delay for better UX
    const timeoutId = setTimeout(() => {
      answerQuestion(answerIndex);
      setIsProcessing(false);
    }, answerDelay);
    
    return () => clearTimeout(timeoutId);
  }, [selectedAnswer, isProcessing, answerQuestion]);

  // Check if we have valid question data
  const isValidData = useMemo(() => {
    return question && content?.[language];
  }, [question, content, language]);

  // Generate CSS classes for answer buttons based on selection state
  const getButtonClassName = useCallback((index) => {
    const baseClasses = 'transition-all duration-75 transform bg-transparent';
    
    if (selectedAnswer === null && !isProcessing) {
      return `${baseClasses} hover:bg-white/10 hover:shadow-lg cursor-pointer`;
    }
    
    if (selectedAnswer === index) {
      return `${baseClasses} cursor-not-allowed`;
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
