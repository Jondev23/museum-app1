// Import app context
import { useApp } from '../context/AppContext';
import { useState, useEffect } from 'react';

// Import all screen components
import ScreensaverScreen from '../components/ScreensaverScreen';
import StartScreen from '../components/StartScreen';
import QuestionScreen from '../components/QuestionScreen';
import FeedbackScreen from '../components/FeedbackScreen';
import ResultsScreen from '../components/ResultsScreen';
import LanguageSelector from '../components/LanguageSelector';
import LanguageSelectorIcon from '../components/shared/LanguageSelectorIcon';
import ProgressDots from '../components/shared/ProgressDots';
import GlobalBackground from '../components/shared/GlobalBackground';
import AdminPanel from '../components/AdminPanel';

// Main application component
export default function Home() {
  // Get current screen state from app context
  const { 
    currentScreen, 
    currentQuestionIndex, 
    answers, 
    questions,
    content,
    language,
    kioskId
  } = useApp();

  // State for managing screen transitions
  const [displayedScreen, setDisplayedScreen] = useState(currentScreen);
  const [displayedQuestionIndex, setDisplayedQuestionIndex] = useState(currentQuestionIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  // Ensure CSS animations are loaded on component mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.add('screen-animations-loaded');
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('screen-animations-loaded');
      }
    };
  }, []);

  // Handle screen transitions with animations
  useEffect(() => {
    if (currentScreen !== displayedScreen && !isTransitioning) {
      setIsTransitioning(true);
      
      // Apply exit animation to current screen
      const exitClass = getExitAnimationClass(displayedScreen);
      setAnimationClass(`screen-transition ${exitClass}`);
      
      // After exit animation completes, change screen and apply enter animation
      setTimeout(() => {
        setDisplayedScreen(currentScreen);
        setDisplayedQuestionIndex(currentQuestionIndex); // También actualizar el índice aquí
        const enterClass = getEnterAnimationClass(currentScreen);
        setAnimationClass(`screen-transition ${enterClass}`);
        
        // Clear animation class after enter animation completes
        setTimeout(() => {
          setAnimationClass('');
          setIsTransitioning(false);
        }, 500);
      }, 500);
    }
  }, [currentScreen, displayedScreen, isTransitioning, currentQuestionIndex]);

  // Get enter animation class for each screen type
  const getEnterAnimationClass = (screenType) => {
    switch (screenType) {
      case 'screensaver':
        return 'enter-screensaver';
      case 'start':
        return 'enter-start';
      case 'question':
        return 'enter-question';
      case 'feedback':
        return 'enter-feedback';
      case 'results':
        return 'enter-results';
      default:
        return 'enter-screensaver';
    }
  };

  // Get exit animation class for each screen type
  const getExitAnimationClass = (screenType) => {
    switch (screenType) {
      case 'screensaver':
        return 'exit-screensaver';
      case 'start':
        return 'exit-start';
      case 'question':
        return 'exit-question';
      case 'feedback':
        return 'exit-feedback';
      case 'results':
        return 'exit-results';
      default:
        return 'exit-screensaver';
    }
  };

  // Show loading screen if kioskId is not yet determined
  if (!kioskId) {
    return (
      <div className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-2xl mb-4">Initialisiere Kiosk...</div>
          <div className="rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  // Render different screens based on displayed state (for smooth transitions)
  const renderScreen = () => {
    switch (displayedScreen) {
      case 'screensaver':
        return <ScreensaverScreen key="screensaver" />;
      case 'start':
        return <StartScreen key="start" />;
      case 'question':
        return <QuestionScreen key={`question-${displayedQuestionIndex}`} />;
      case 'feedback':
        return <FeedbackScreen key={`feedback-${displayedQuestionIndex}`} />;
      case 'results':
        return <ResultsScreen key="results" />;
      default:
        return <ScreensaverScreen key="screensaver" />;
    }
  };

  
  // Get background image from current kiosk configuration
  const startContent = content?.[language]?.startScreen;
  const globalBackgroundImage = startContent?.backgroundImage;

  return (
    // Main container - fullscreen with black background
    <div className="w-screen h-screen overflow-hidden bg-black">
      {/* Global Background - static across all screens */}
      <div className="fixed inset-0 z-5">
        <GlobalBackground backgroundImage={globalBackgroundImage} />
      </div>

      {/* Current screen content with animations */}
      <div className={`screen-container ${animationClass}`}>
        {renderScreen()}
      </div>
      
      {/* Always visible components */}
      <div className="relative">
        <LanguageSelector />
        <AdminPanel />
        
        {/* Global Language Selector Icon - always visible except screensaver */}
        {displayedScreen !== 'screensaver' && (
          <div 
            className="fixed bottom-0 left-0"
            style={{
              zIndex: 60,
              marginBottom: 'min(3.7rem, 4.7vh)', 
              marginLeft: 'min(9.5rem, 14.5vw)',
            }}
          >
            <LanguageSelectorIcon 
              variant="standard" 
              delay={0}
              opacity={0.8}
              style={{
                marginBottom: 0,
                marginLeft: 0,
              }}
            />
          </div>
        )}

        {/* Global Progress Dots - always visible during quiz screens */}
        {(displayedScreen === 'question' || displayedScreen === 'feedback') && (
          <div 
            className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40"
            style={{
              bottom: 'min(4.5rem, 7.5vh)'
            }}
          >
            <ProgressDots
              totalQuestions={5}
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              questions={questions}
              variant="default"
            />
          </div>
        )}
      </div>
    </div>
  );
}
