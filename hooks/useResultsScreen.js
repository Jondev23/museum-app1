import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useApp } from '../context/AppContext';

const useResultsScreen = () => {
  const { 
    getScore, 
    beginQuiz,
    content,
    language,
    questions,
    answers
  } = useApp();

  const [showContent, setShowContent] = useState(false);
  
  // Keep a stable reference to the score to prevent flickering during transitions
  const stableScoreRef = useRef(null);
  const stableQuestionsRef = useRef(null);

  // Memoized calculations
  const currentScore = useMemo(() => getScore(), [getScore]);
  
  // Update stable score only when we have valid answers and questions
  useEffect(() => {
    if (answers.length > 0 && questions.length > 0) {
      stableScoreRef.current = currentScore;
      stableQuestionsRef.current = questions;
    }
  }, [currentScore, answers.length, questions.length]);

  // Use stable score or fallback to current score
  const score = stableScoreRef.current !== null ? stableScoreRef.current : currentScore;
  const stableQuestions = stableQuestionsRef.current || questions;
  
  const startContent = useMemo(() => content?.[language]?.startScreen, [content, language]);

  // Content data
  const contentData = useMemo(() => {
    if (!content?.[language]) return null;

    const results = content[language]?.results || {};
    
    return {
      title: results.messages?.[score],
      scoreText: results.scoreText?.replace('{score}', score).replace('{total}', stableQuestions.length),
      scoreTextColor: results.scoreTextColor,
      playAgainText: results.playAgain,
      backgroundImage: startContent?.backgroundImage
    };
  }, [content, language, score, stableQuestions.length, startContent]);

  // Animation trigger effect
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Clean up stable references when component unmounts or screen changes
  useEffect(() => {
    return () => {
      // Reset stable references when the component is truly unmounting
      const cleanup = () => {
        stableScoreRef.current = null;
        stableQuestionsRef.current = null;
      };
      
      // Delay cleanup to allow for transition
      setTimeout(cleanup, 1000);
    };
  }, []);

  // Event handlers
  const handlePlayAgain = useCallback(() => {
    beginQuiz();
  }, [beginQuiz]);

  const handleTouchAnywhere = useCallback((e) => {
    // Only trigger if not clicking on the play again button
    if (!e.target.closest('button')) {
      handlePlayAgain();
    }
  }, [handlePlayAgain]);

  // Validation
  const isValid = useMemo(() => {
    return Boolean(content?.[language] && stableQuestions.length > 0);
  }, [content, language, stableQuestions.length]);

  return {
    // State
    showContent,
    
    // Data
    contentData,
    score,
    questions: stableQuestions,
    answers,
    
    // Handlers
    handlePlayAgain,
    handleTouchAnywhere,
    
    // Validation
    isValid
  };
};

export default useResultsScreen;
