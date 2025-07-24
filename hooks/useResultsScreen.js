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
  
  const stableScoreRef = useRef(null);
  const stableQuestionsRef = useRef(null);

  const currentScore = useMemo(() => getScore(), [getScore]);
  
  useEffect(() => {
    if (answers.length > 0 && questions.length > 0) {
      stableScoreRef.current = currentScore;
      stableQuestionsRef.current = questions;
    }
  }, [currentScore, answers.length, questions.length]);

  const score = stableScoreRef.current !== null ? stableScoreRef.current : currentScore;
  const stableQuestions = stableQuestionsRef.current || questions;
  
  const startContent = useMemo(() => content?.[language]?.startScreen, [content, language]);

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
