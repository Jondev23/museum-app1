// Import React hooks and utilities for kiosk configuration
import React, { createContext, useContext, useState, useEffect } from 'react';
import { detectKioskId, detectKioskIdSync, getCurrentKioskConfig } from '../utils/kioskConfig';
import { loadConfig, setActiveKioskId, getScreensaverTimeout } from '../utils/configManager';

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
  const [isTransitioningToScreensaver, setIsTransitioningToScreensaver] = useState(false);
  
  // Kiosk configuration
  const [kioskId, setKioskId] = useState(() => detectKioskIdSync());
  const [screensaverTimeout, setScreensaverTimeoutState] = useState(3 * 60 * 1000); // Default 3 minutes

  // Load configuration on component mount
  useEffect(() => {
    const initializeAppConfig = async () => {
      try {
        // Load the active kiosk ID from config
        const configKioskId = await detectKioskId();
        if (configKioskId !== kioskId) {
          console.log('Updating kiosk ID from config:', configKioskId);
          setKioskId(configKioskId);
        }

        // Load screensaver timeout from config
        const configTimeout = await getScreensaverTimeout();
        if (configTimeout !== screensaverTimeout) {
          console.log('Updating screensaver timeout from config:', configTimeout);
          setScreensaverTimeoutState(configTimeout);
        }
      } catch (error) {
        console.error('Error initializing app config:', error);
      }
    };

    initializeAppConfig();
  }, []);

  // Custom setKioskId that also saves to config
  const updateKioskId = async (newKioskId) => {
    console.log('Updating kiosk ID:', newKioskId);
    setKioskId(newKioskId);
    
    try {
      await setActiveKioskId(newKioskId);
      console.log('Kiosk ID saved to config successfully');
    } catch (error) {
      console.error('Error saving kiosk ID to config:', error);
    }
  };

  // Effect to load content when kiosk ID or language changes
  useEffect(() => {
    const loadContent = async () => {
      try {
        console.log('=== APPCONTEXT: Starting content load');
        console.log(`=== APPCONTEXT: Loading content for kiosk: ${kioskId}, language: ${language}`);
        console.log('=== APPCONTEXT: Window electronAPI available:', typeof window !== 'undefined' && !!window.electronAPI);
        
        // Add a fallback content immediately to prevent infinite loading
        const fallbackContent = {
          [language]: {
            screensaver: {
              title: 'Welcome to the Museum',
              videoSource: '/videos/screensaver-video.mp4'
            },
            start: {
              title: 'Museum Quiz',
              description: 'Test your knowledge about our exhibits'
            },
            questions: [
              {
                id: 1,
                question: 'Sample question?',
                answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
                correctAnswer: 0
              }
            ]
          }
        };
        
        // Set fallback content first to prevent loading screen
        console.log('=== APPCONTEXT: Setting fallback content first to prevent loading...');
        setContent(fallbackContent);
        
        let data;
        // Check if we're in Electron environment
        if (typeof window !== 'undefined' && window.electronAPI) {
          // In Electron, load content via IPC
          try {
            console.log('=== APPCONTEXT: Attempting to load content via Electron IPC...');
            data = await window.electronAPI.loadKioskContent(kioskId);
            console.log('=== APPCONTEXT: ✅ Content loaded via Electron IPC:', data);
          } catch (electronError) {
            console.warn('=== APPCONTEXT: ❌ Failed to load via Electron IPC, using fallback:', electronError);
            data = fallbackContent;
          }
        } else {
          // In web environment, use fetch
          try {
            console.log('=== APPCONTEXT: Loading content via fetch...');
            const response = await fetch(`/content/${kioskId}.json`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            data = await response.json();
            console.log('=== APPCONTEXT: ✅ Content loaded via fetch:', data);
          } catch (fetchError) {
            console.warn('=== APPCONTEXT: ❌ Failed to load via fetch, using fallback:', fetchError);
            data = fallbackContent;
          }
        }
        
        console.log('=== APPCONTEXT: ✅ Final content loaded successfully:', data);
        setContent(data);
        
        // Shuffle and select 5 random questions for each quiz session
        if (data[language]?.questions) {
          const shuffled = [...data[language].questions].sort(() => Math.random() - 0.5);
          setQuestions(shuffled.slice(0, 5));
          console.log('=== APPCONTEXT: Questions shuffled:', shuffled.slice(0, 5));
        }
      } catch (error) {
        console.error('=== APPCONTEXT: ❌ Unexpected error loading content:', error);
        console.error('=== APPCONTEXT: Failed kiosk ID:', kioskId);
        
        // Set fallback content to prevent infinite loading
        console.log('=== APPCONTEXT: Setting emergency fallback content...');
        const emergencyFallback = {
          [language]: {
            screensaver: {
              title: 'Welcome to the Museum',
              videoSource: '/videos/screensaver-video.mp4'
            },
            start: {
              title: 'Museum Quiz',
              description: 'Test your knowledge about our exhibits'
            },
            questions: [
              {
                id: 1,
                question: 'Emergency sample question?',
                answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
                correctAnswer: 0
              }
            ]
          }
        };
        setContent(emergencyFallback);
      }
    };

    loadContent();
  }, [kioskId, language]);

  // Effect to handle inactivity timer (configurable timeout)
  useEffect(() => {
    let timer;
    
    // Reset the inactivity timer
    const resetTimer = () => {
      clearTimeout(timer);
      // Only set timer if not on screensaver
      if (currentScreen !== 'screensaver') {
        timer = setTimeout(() => {
          // Smooth transition to screensaver instead of direct change
          goToScreensaver();
        }, screensaverTimeout);
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

    // Cleanup on unmount or when currentScreen/timeout changes
    return () => {
      clearTimeout(timer);
      removeEventListeners();
    };
  }, [currentScreen, screensaverTimeout]);

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
    // Only start transition if not already transitioning and not on screensaver
    if (!isTransitioningToScreensaver && currentScreen !== 'screensaver') {
      console.log('Starting smooth transition to screensaver');
      setIsTransitioningToScreensaver(true);
      
      // After fade out transition, change to screensaver
      setTimeout(() => {
        setCurrentScreen('screensaver');
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setShowLanguageSelector(false);
        setIsTransitioningToScreensaver(false);
      }, 500); // 500ms fade out duration
    } else if (!isTransitioningToScreensaver) {
      // Direct change if already on screensaver
      setCurrentScreen('screensaver');
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setShowLanguageSelector(false);
    }
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
    isTransitioningToScreensaver,
    kioskId,
    setKioskId: updateKioskId,
    screensaverTimeout,
    setScreensaverTimeout: setScreensaverTimeoutState,
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
