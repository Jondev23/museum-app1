// Import React hooks and utilities for kiosk configuration
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
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
  const [language, setLanguage] = useState('de'); // German as default language
  const [content, setContent] = useState(null);
  
  // Quiz state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  
  // UI state
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  
  // Kiosk configuration - Start with null to force loading from config
  const [kioskId, setKioskId] = useState(null);
  const [screensaverTimeout, setScreensaverTimeoutState] = useState(10000); // 10 seconds unified default 

  // Load configuration on component mount
  useEffect(() => {
    const initializeAppConfig = async () => {
      try {
        const configKioskId = await detectKioskId();
        setKioskId(configKioskId);

        const configTimeout = await getScreensaverTimeout();
        setScreensaverTimeoutState(configTimeout);
      } catch (error) {
        console.error('Config initialization error:', error);
        const fallbackKiosk = detectKioskIdSync();
        setKioskId(fallbackKiosk);
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
    if (!kioskId) return;
    
    const loadContent = async () => {
      try {
        console.log(`Loading content for kiosk: ${kioskId}, language: ${language}`);
        
        // Simple fallback content
        const fallbackContent = {
          [language]: {
            screensaver: { title: 'Welcome', videoSource: './videos/screensaver-video.mp4' },
            start: { title: 'Museum Quiz', description: 'Test your knowledge' },
            questions: [{ id: 1, question: 'Sample question?', answers: ['A1', 'A2', 'A3', 'A4'], correctAnswer: 0 }]
          }
        };
        
        let data = fallbackContent;
        
        // Try to load real content
        if (typeof window !== 'undefined' && window.electronAPI) {
          try {
            data = await window.electronAPI.loadKioskContent(kioskId);
          } catch (error) {
            console.warn('Electron load failed, using fallback:', error);
          }
        } else {
          try {
            const response = await fetch(`/content/${kioskId}.json`);
            if (response.ok) {
              data = await response.json();
            }
          } catch (error) {
            console.warn('Fetch failed, using fallback:', error);
          }
        }
        
        setContent(data);
        
        // Shuffle questions
        if (data[language]?.questions) {
          const shuffled = [...data[language].questions].sort(() => Math.random() - 0.5);
          setQuestions(shuffled.slice(0, 5));
        }
      } catch (error) {
        console.error('Content loading error:', error);
      }
    };

    loadContent();
  }, [kioskId, language]);

  // Effect to handle inactivity timer
  useEffect(() => {
    let timer;
    let lastActivity = 0;
    const throttleDelay = 1000; // Throttle activity detection to once per second
    
    const resetTimer = () => {
      clearTimeout(timer);
      if (currentScreen !== 'screensaver') {
        timer = setTimeout(goToScreensaver, screensaverTimeout);
      }
    };

    const handleActivity = (event) => {
      if (currentScreen !== 'screensaver') {
        const now = Date.now();
        
        // Throttle mousemove events to prevent excessive re-renders
        if (event.type === 'mousemove' && now - lastActivity < throttleDelay) {
          return;
        }
        
        lastActivity = now;
        console.log('🔄 Activity detected, resetting timer. Event:', event.type, 'Screen:', currentScreen);
        resetTimer();
      }
    };

    // Event listeners - prioritize touch and click over mousemove
    const events = ['touchstart', 'click', 'keydown', 'mousemove', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
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

  // Helper function to reset quiz state - now memoized
  const resetQuizState = useCallback(() => {
    setAnswers([]);
    setQuestions([]);
    setCurrentQuestionIndex(0);
  }, []);

  const goToScreensaver = useCallback(() => {
    console.log('🖥️ goToScreensaver called - setting currentScreen to screensaver');
    setCurrentScreen('screensaver');
    resetQuizState();
    setShowLanguageSelector(false);
  }, [resetQuizState]);

  const startQuiz = useCallback(() => {
    console.log('🚀 startQuiz called - setting currentScreen to start');
    setCurrentScreen('start');
  }, []);

  const beginQuiz = useCallback(() => {
    resetQuizState();
    setCurrentScreen('start');
    
    // Reshuffle questions
    if (content?.[language]?.questions) {
      const shuffled = [...content[language].questions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, 5));
    }
  }, [resetQuizState, content, language]);

  const startQuestions = useCallback(() => {
    console.log('🎯 startQuestions called');
    console.log('🎯 Current content:', content);
    console.log('🎯 Current language:', language);
    console.log('🎯 Questions available:', content?.[language]?.questions?.length);
    
    setCurrentScreen('question');
    resetQuizState();
    
    // Reshuffle questions
    if (content?.[language]?.questions) {
      const shuffled = [...content[language].questions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, 5));
      console.log('🎯 Questions set:', shuffled.slice(0, 5).length);
    } else {
      console.error('❌ No questions found in content!');
    }
  }, [resetQuizState, content, language]);

  const answerQuestion = useCallback((answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
    setCurrentScreen('feedback');
  }, [answers, currentQuestionIndex]);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      // Mantener el patrón original pero sincronizar ambos casos
      setCurrentScreen('question');
      // Usar requestAnimationFrame para asegurar que la animación se inicie antes del cambio de índice
      requestAnimationFrame(() => {
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }, 900); // Duración completa de la animación de salida
      });
    } else {
      setCurrentScreen('results');
    }
  }, [currentQuestionIndex, questions.length]);

  const changeLanguage = useCallback((newLanguage) => {
    if (newLanguage === language) {
      setShowLanguageSelector(false);
      return;
    }
    
    resetQuizState();
    setLanguage(newLanguage);
    setShowLanguageSelector(false);
    setCurrentScreen('start');
  }, [language, resetQuizState]);

  const getScore = useCallback(() => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[index]?.correctAnswer ? 1 : 0);
    }, 0);
  }, [answers, questions]);

  const getCurrentQuestion = useCallback(() => {
    return questions[currentQuestionIndex];
  }, [questions, currentQuestionIndex]);

  const getCurrentAnswer = useCallback(() => {
    return answers[currentQuestionIndex];
  }, [answers, currentQuestionIndex]);

  const getProgressStatus = useCallback((index) => {
    if (index === currentQuestionIndex && currentScreen === 'question') {
      return 'current';
    }
    if (index < answers.length) {
      return answers[index] === questions[index]?.correctAnswer ? 'correct' : 'incorrect';
    }
    return 'unanswered';
  }, [currentQuestionIndex, currentScreen, answers, questions]);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
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
  }), [
    currentScreen,
    language,
    content,
    questions,
    currentQuestionIndex,
    answers,
    showLanguageSelector,
    kioskId,
    screensaverTimeout,
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
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
