import { useState, useEffect, useCallback, useMemo } from 'react';
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

  // Memoized calculations
  const score = useMemo(() => getScore(), [getScore]);
  const startContent = useMemo(() => content?.[language]?.startScreen, [content, language]);

  // Content data
  const contentData = useMemo(() => {
    if (!content?.[language]) return null;

    const results = content[language]?.results || {};
    
    return {
      title: results.messages?.[score],
      scoreText: results.scoreText?.replace('{score}', score).replace('{total}', questions.length),
      scoreTextColor: results.scoreTextColor,
      playAgainText: results.playAgain,
      backgroundImage: startContent?.backgroundImage
    };
  }, [content, language, score, questions.length, startContent]);

  // Animation trigger effect
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
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
    return Boolean(content?.[language] && questions.length > 0);
  }, [content, language, questions.length]);

  return {
    // State
    showContent,
    
    // Data
    contentData,
    score,
    questions,
    answers,
    
    // Handlers
    handlePlayAgain,
    handleTouchAnywhere,
    
    // Validation
    isValid
  };
};

export default useResultsScreen;
