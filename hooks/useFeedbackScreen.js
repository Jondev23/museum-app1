import { useMemo } from 'react';
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
    nextQuestion
  };
};
