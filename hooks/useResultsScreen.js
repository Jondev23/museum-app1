// Import React hooks and app context
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { gsap } from 'gsap';

// Custom hook for results screen functionality
const useResultsScreen = () => {
  // Get score calculation and quiz restart functions from app context
  const { 
    getScore, 
    beginQuiz,
    content,
    language,
    questions,
    answers
  } = useApp();

  // Local state for content animation
  const [showContent, setShowContent] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  // Refs to maintain stable score and questions data
  const stableScoreRef = useRef(null);
  const stableQuestionsRef = useRef(null);

  // Calculate current score
  const currentScore = useMemo(() => getScore(), [getScore]);
  
  // Store stable references when quiz is completed
  useEffect(() => {
    // Only store stable references if we have complete and valid data
    if (answers.length > 0 && questions.length > 0 && answers.length <= questions.length) {
      stableScoreRef.current = currentScore;
      stableQuestionsRef.current = questions;
    }
  }, [currentScore, answers.length, questions.length]);

  // Use stable score/questions or fallback to current values
  const score = stableScoreRef.current !== null ? stableScoreRef.current : currentScore;
  const stableQuestions = stableQuestionsRef.current || questions;
  
  // Get start screen content for background image
  const startContent = useMemo(() => content?.[language]?.startScreen, [content, language]);

  // Build content data for results display
  const contentData = useMemo(() => {
    if (!content?.[language]) return null;

    const results = content[language]?.results || {};
    
    // Validate we have stable data before building content
    const validScore = stableScoreRef.current !== null ? stableScoreRef.current : currentScore;
    const validQuestions = stableQuestionsRef.current || questions;
    
    // Additional validation - don't show results if data is inconsistent
    if (validQuestions.length === 0 || (stableScoreRef.current === null && answers.length === 0)) {
      return null;
    }
    
    return {
      title: results.messages?.[validScore], // Get message based on score
      scoreText: results.scoreText?.replace('{score}', validScore).replace('{total}', validQuestions.length),
      scoreTextColor: results.scoreTextColor,
      playAgainText: results.playAgain,
      backgroundImage: startContent?.backgroundImage
    };
  }, [content, language, score, stableQuestions.length, startContent, answers.length]);

  // Effect to show content with delay for animation
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      const cleanup = () => {
        stableScoreRef.current = null;
        stableQuestionsRef.current = null;
      };
      
      setTimeout(cleanup, 1000);
    };
  }, []);

  const handlePlayAgain = useCallback(() => {
    // Iniciar animación de salida manual
    setIsExiting(true);
    
    // Animar elementos específicos antes de cambiar la pantalla
    const resultsTitle = document.querySelector('.title-results');
    const playAgainButton = document.querySelector('.text-button-play-again')?.parentElement;
    const scoreText = document.querySelector('.subtitle-small');
    const resultsContainer = document.querySelector('.fixed.inset-0.flex.flex-col');
    
    // Timeline de animación de salida
    const exitTimeline = gsap.timeline({
      onComplete: () => {
        // Solo después de que termine la animación, cambiar la pantalla
        beginQuiz();
      }
    });
    
    // Animar elementos individuales
    if (resultsTitle) {
      exitTimeline.to(resultsTitle, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: "power2.in"
      }, 0);
    }
    
    if (scoreText) {
      exitTimeline.to(scoreText, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in"
      }, 0.1);
    }
    
    if (playAgainButton) {
      exitTimeline.to(playAgainButton, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in"
      }, 0.2);
    }
    
    // Finalmente, fade out del contenedor completo
    if (resultsContainer) {
      exitTimeline.to(resultsContainer, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      }, 0.4);
    }
  }, [beginQuiz]);

  const handleTouchAnywhere = useCallback((e) => {
    if (!e.target.closest('button')) {
      handlePlayAgain();
    }
  }, [handlePlayAgain]);

  const isValid = useMemo(() => {
    return Boolean(
      content?.[language] && 
      stableQuestions.length > 0 && 
      contentData &&
      (stableScoreRef.current !== null || answers.length > 0)
    );
  }, [content, language, stableQuestions.length, contentData, answers.length]);

  return {
    showContent,
    isExiting,
    
    contentData,
    score,
    questions: stableQuestions,
    answers,
    
    handlePlayAgain,
    handleTouchAnywhere,
    
    isValid
  };
};

export default useResultsScreen;
