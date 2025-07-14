import React, { createContext, useContext, useState, useEffect } from 'react';
import { detectKioskId, getCurrentKioskConfig } from '../utils/kioskConfig';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('screensaver');
  const [language, setLanguage] = useState('de');
  const [content, setContent] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [kioskId, setKioskId] = useState(() => detectKioskId());

  // Load content based on kiosk ID
  useEffect(() => {
    const loadContent = async () => {
      try {
        console.log(`Loading content for kiosk: ${kioskId}, language: ${language}`);
        const response = await fetch(`/content/${kioskId}.json`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Content loaded successfully:', data);
        setContent(data);
        
        // Shuffle and select 5 random questions
        if (data[language]?.questions) {
          const shuffled = [...data[language].questions].sort(() => Math.random() - 0.5);
          setQuestions(shuffled.slice(0, 5));
          console.log('Questions shuffled:', shuffled.slice(0, 5));
        }
      } catch (error) {
        console.error('Error loading content:', error);
        console.error('Failed URL:', `/content/${kioskId}.json`);
      }
    };

    loadContent();
  }, [kioskId, language]);

  // Inactivity timer
  useEffect(() => {
    let timer;
    
    const resetTimer = () => {
      clearTimeout(timer);
      if (currentScreen !== 'screensaver') {
        timer = setTimeout(() => {
          goToScreensaver();
        }, 3 * 60 * 1000); // 3 minutes
      }
    };

    const handleActivity = () => {
      resetTimer();
    };

    // Listen for user activity
    document.addEventListener('touchstart', handleActivity);
    document.addEventListener('click', handleActivity);
    document.addEventListener('keydown', handleActivity);

    resetTimer();

    return () => {
      clearTimeout(timer);
      document.removeEventListener('touchstart', handleActivity);
      document.removeEventListener('click', handleActivity);
      document.removeEventListener('keydown', handleActivity);
    };
  }, [currentScreen]);

  // Listen for Electron screensaver signal
  useEffect(() => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.onShowScreensaver(() => {
        goToScreensaver();
      });
    }

    return () => {
      if (typeof window !== 'undefined' && window.electronAPI) {
        window.electronAPI.removeAllListeners('show-screensaver');
      }
    };
  }, []);

  const goToScreensaver = () => {
    setCurrentScreen('screensaver');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowLanguageSelector(false);
  };

  const startQuiz = () => {
    setCurrentScreen('start');
  };

  const beginQuiz = () => {
    setCurrentScreen('question');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    
    // Reshuffle questions when starting new quiz
    if (content?.[language]?.questions) {
      const shuffled = [...content[language].questions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, 5));
    }
  };

  const answerQuestion = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
    setCurrentScreen('feedback');
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentScreen('question');
    } else {
      setCurrentScreen('results');
    }
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setShowLanguageSelector(false);
    setCurrentScreen('start');
  };

  const getScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[index]?.correctAnswer ? 1 : 0);
    }, 0);
  };

  const getCurrentQuestion = () => {
    return questions[currentQuestionIndex];
  };

  const getCurrentAnswer = () => {
    return answers[currentQuestionIndex];
  };

  const getProgressStatus = (index) => {
    if (index === currentQuestionIndex && currentScreen === 'question') {
      return 'current';
    }
    if (index < answers.length) {
      return answers[index] === questions[index]?.correctAnswer ? 'correct' : 'incorrect';
    }
    return 'unanswered';
  };

  const value = {
    currentScreen,
    setCurrentScreen,
    language,
    content,
    questions,
    currentQuestionIndex,
    answers,
    showLanguageSelector,
    setShowLanguageSelector,
    kioskId,
    setKioskId,
    goToScreensaver,
    startQuiz,
    beginQuiz,
    answerQuestion,
    nextQuestion,
    changeLanguage,
    getScore,
    getCurrentQuestion,
    getCurrentAnswer,
    getProgressStatus,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
