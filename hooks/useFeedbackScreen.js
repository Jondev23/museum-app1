import { useMemo, useCallback, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

export const useFeedbackScreen = () => {
  const { 
    getCurrentQuestion, 
    getCurrentAnswer,
    nextQuestion,
    content,
    language,
    currentQuestionIndex,
    questions,
    answers
  } = useApp();

  const activeListenersRef = useRef(new Set());

  useEffect(() => {
    return () => {
      activeListenersRef.current.forEach(({ type, listener }) => {
        document.removeEventListener(type, listener);
      });
      activeListenersRef.current.clear();
    };
  }, [currentQuestionIndex]);

  const handleTouchStart = useCallback((e) => {
    if (!e.touches || e.touches.length === 0) return;
    
    if (e.target.closest('button') || e.target.closest('[role="button"]')) return;
    
    const startX = e.touches[0].clientX;
    let hasExecuted = false; 
    
    const handleTouchMove = (e) => {
      if (hasExecuted) return; 
      
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
      
      if (diffX > 100) {
        hasExecuted = true;
        nextQuestion();
        cleanupListeners();
      }
    };

    const handleTouchEnd = () => {
      cleanupListeners();
    };

    const cleanupListeners = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      activeListenersRef.current.delete({ type: 'touchmove', listener: handleTouchMove });
      activeListenersRef.current.delete({ type: 'touchend', listener: handleTouchEnd });
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    
    // Track listeners activos
    activeListenersRef.current.add({ type: 'touchmove', listener: handleTouchMove });
    activeListenersRef.current.add({ type: 'touchend', listener: handleTouchEnd });
  }, [nextQuestion]);

  const question = useMemo(() => getCurrentQuestion(), [getCurrentQuestion]);
  const userAnswer = useMemo(() => getCurrentAnswer(), [getCurrentAnswer]);
  const totalQuestions = useMemo(() => questions.length, [questions.length]);
  
  const feedbackData = useMemo(() => {
    if (!question || userAnswer === undefined || !content?.[language]) {
      return { isValidData: false };
    }

    const isCorrect = userAnswer === question.correctAnswer;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    
    const quizContent = content[language]?.quiz;
    const feedbackMessages = isCorrect ? quizContent?.correctFeedback : quizContent?.incorrectFeedback;
    const randomMessage = feedbackMessages?.[Math.floor(Math.random() * feedbackMessages.length)];

    return {
      isValidData: true,
      isCorrect,
      isLastQuestion,
      randomMessage,
      quizContent
    };
  }, [question, userAnswer, content, language, currentQuestionIndex, questions.length]);


  const startContent = useMemo(() => content?.[language]?.startScreen, [content, language]);


  const buttonText = useMemo(() => {
    if (!feedbackData.isValidData) return '';
    
    return feedbackData.isLastQuestion ? 
      (content[language]?.quiz?.showResults || 'Show Results') : 
      (content[language]?.quiz?.nextQuestion || 'Next Question');
  }, [feedbackData.isValidData, feedbackData.isLastQuestion, content, language]);

  return {
    
    question,
    userAnswer,
    totalQuestions,
    currentQuestionIndex,
    questions,
    answers,
    startContent,
    buttonText,
    
   
    ...feedbackData,
    
  
    nextQuestion,
    handleTouchStart
  };
};
