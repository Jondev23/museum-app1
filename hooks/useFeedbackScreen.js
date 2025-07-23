import { useMemo, useCallback } from 'react';
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

  // Handler para touch start con lógica de swipe (simplificado)
  const handleTouchStart = useCallback((e) => {
    // Solo procesar si es un touch event real
    if (!e.touches || e.touches.length === 0) return;
    
    const startX = e.touches[0].clientX;
    
    const handleTouchMove = (e) => {
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
      
      // Swipe left de mínimo 100px para pasar a siguiente pregunta
      if (diffX > 100) {
        nextQuestion();
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
  }, [nextQuestion]);

  // Datos memoizados
  const question = useMemo(() => getCurrentQuestion(), [getCurrentQuestion]);
  const userAnswer = useMemo(() => getCurrentAnswer(), [getCurrentAnswer]);
  const totalQuestions = useMemo(() => questions.length, [questions.length]);
  
  // Lógica de negocio memoizada
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

  // Contenido de inicio memoizado
  const startContent = useMemo(() => content?.[language]?.startScreen, [content, language]);

  // Texto del botón memoizado
  const buttonText = useMemo(() => {
    if (!feedbackData.isValidData) return '';
    
    return feedbackData.isLastQuestion ? 
      (content[language]?.quiz?.showResults || 'Show Results') : 
      (content[language]?.quiz?.nextQuestion || 'Next Question');
  }, [feedbackData.isValidData, feedbackData.isLastQuestion, content, language]);

  return {
    // Datos básicos
    question,
    userAnswer,
    totalQuestions,
    currentQuestionIndex,
    questions,
    answers,
    startContent,
    buttonText,
    
    // Datos de feedback
    ...feedbackData,
    
    // Funciones
    nextQuestion,
    handleTouchStart
  };
};
