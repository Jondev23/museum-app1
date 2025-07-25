// Import React hooks and utilities for kiosk configuration
import React, { createContext, useContext, useState, useEffect } from 'react';
import { detectKioskId, getCurrentKioskConfig } from '../utils/kioskConfig';

// Create context for global app state
const AppContext = createContext();

// Custom hook to access app context with error handling
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// App provider component that manages global state
export const AppProvider = ({ children }) => {
  // Screen navigation state
  const [currentScreen, setCurrentScreen] = useState('screensaver');
  
  // Language and content state
  const [language, setLanguage] = useState('de');
  const [content, setContent] = useState(null);
  
  // Quiz state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  
  // UI state
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Kiosk configuration
  const [kioskId, setKioskId] = useState(() => detectKioskId());

  // Effect to load content when kiosk ID or language changes
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
        
        // Shuffle and select 5 random questions for each quiz session
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

  // Effect to handle inactivity timer (3 minutes)
  useEffect(() => {
    let timer;
    
    // Reset the inactivity timer
    const resetTimer = () => {
      clearTimeout(timer);
      // Only set timer if not on screensaver
      if (currentScreen !== 'screensaver') {
        timer = setTimeout(() => {
          // Direct screen change to avoid hoisting issues
          setCurrentScreen('screensaver');
          setCurrentQuestionIndex(0);
          setAnswers([]);
          setShowLanguageSelector(false);
        }, 3 * 60 * 1000); // 3 minutes
      }
    };

    // Handle any user activity to reset timer
    const handleActivity = (e) => {
      // Only reset if we're not on the screensaver screen
      if (currentScreen !== 'screensaver') {
        console.log('User activity detected, resetting inactivity timer');
        resetTimer();
      }
    };

    // Add event listeners for user activity
    const addEventListeners = () => {
      document.addEventListener('touchstart', handleActivity, { passive: true });
      document.addEventListener('click', handleActivity);
      document.addEventListener('keydown', handleActivity);
      document.addEventListener('mousemove', handleActivity, { passive: true });
      document.addEventListener('scroll', handleActivity, { passive: true });
    };

    // Remove event listeners
    const removeEventListeners = () => {
      document.removeEventListener('touchstart', handleActivity);
      document.removeEventListener('click', handleActivity);
      document.removeEventListener('keydown', handleActivity);
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('scroll', handleActivity);
    };

    // Initialize timer and listeners
    addEventListeners();
    resetTimer();

    // Cleanup on unmount or when currentScreen changes
    return () => {
      clearTimeout(timer);
      removeEventListeners();
    };
  }, [currentScreen]);

  // Effect to listen for Electron screensaver signals
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
    setCurrentScreen('start');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    
    // Reshuffle questions when starting new quiz
    if (content?.[language]?.questions) {
      const shuffled = [...content[language].questions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, 5));
    }
  };

  const startQuestions = () => {
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
    if (isTransitioning) return; 
    
    setIsTransitioning(true);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentScreen('question');
    } else {
      setCurrentScreen('results');
    }
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const changeLanguage = (newLanguage) => {
    console.log('changeLanguage called:', { from: language, to: newLanguage });
    
    if (newLanguage === language) {
      console.log('Same language selected, just closing selector');
      setShowLanguageSelector(false);
      return;
    }
    
    setLanguage(newLanguage);
    setShowLanguageSelector(false);
    setCurrentScreen('start');
    
    // Reset quiz state when changing language
    setCurrentQuestionIndex(0);
    setAnswers([]);
    
    console.log('Language changed successfully to:', newLanguage);
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
    startQuestions,
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
