// Import React hooks and app context
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useApp } from '../context/AppContext';

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
  
  // Refs to maintain stable score and questions data
  const stableScoreRef = useRef(null);
  const stableQuestionsRef = useRef(null);

  // Calculate current score
  const currentScore = useMemo(() => getScore(), [getScore]);
  
  // Store stable references when quiz is completed
  useEffect(() => {
    if (answers.length > 0 && questions.length > 0) {
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
    
    return {
      title: results.messages?.[score], // Get message based on score
      scoreText: results.scoreText?.replace('{score}', score).replace('{total}', stableQuestions.length),
      scoreTextColor: results.scoreTextColor,
      playAgainText: results.playAgain,
      backgroundImage: startContent?.backgroundImage
    };
  }, [content, language, score, stableQuestions.length, startContent]);

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
    beginQuiz();
  }, [beginQuiz]);

  const handleTouchAnywhere = useCallback((e) => {
    if (!e.target.closest('button')) {
      handlePlayAgain();
    }
  }, [handlePlayAgain]);

  const isValid = useMemo(() => {
    return Boolean(content?.[language] && stableQuestions.length > 0);
  }, [content, language, stableQuestions.length]);

  return {
    showContent,
    
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
