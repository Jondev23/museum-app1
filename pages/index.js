// Import app context
import { useApp } from '../context/AppContext';
import { useMemo, useCallback } from 'react';

// Import GSAP transitions hook
import useGSAPTransitions from '../hooks/useGSAPTransitions';

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

  // Use GSAP transitions hook
  const {
    displayedScreen,
    displayedQuestionIndex,
    isTransitioning,
    containerRef
  } = useGSAPTransitions(currentScreen, currentQuestionIndex);

  // Memoize the render screen function to prevent unnecessary re-renders
  const renderScreen = useCallback(() => {
    // Only log when displayedScreen actually changes, not on every render
    if (process.env.NODE_ENV === 'development') {
      console.log('🎬 renderScreen called - displayedScreen:', displayedScreen);
    }
    switch (displayedScreen) {
      case 'screensaver':
        return null; // Screensaver is rendered outside
      case 'start':
        return <StartScreen key="start" />;
      case 'question':
        return <QuestionScreen key={`question-${displayedQuestionIndex}`} />;
      case 'feedback':
        // Use stable key to prevent unnecessary unmounting/mounting
        return <FeedbackScreen key="feedback" />;
      case 'results':
        return <ResultsScreen key="results" />;
      default:
        return null; // Default to screensaver outside
    }
  }, [displayedScreen, displayedQuestionIndex]);

  // Memoize background image to prevent re-calculations
  const globalBackgroundImage = useMemo(() => {
    return content?.[language]?.startScreen?.backgroundImage;
  }, [content, language]);

  console.log('🏠 Main component - currentScreen:', currentScreen, 'displayedScreen:', displayedScreen);

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

  return (
    // Main container - fullscreen with black background
    <div className="w-screen h-screen overflow-hidden bg-black">
      {/* Global Background - static across all screens */}
      <div className="fixed inset-0 z-5">
        <GlobalBackground backgroundImage={globalBackgroundImage} />
      </div>

      {/* Screensaver - OUTSIDE of GSAP container */}
      {currentScreen === 'screensaver' && (
        <ScreensaverScreen key="screensaver" />
      )}

      {/* Current screen content with GSAP animations - ONLY non-screensaver screens */}
      {currentScreen !== 'screensaver' && (
        <div ref={containerRef} className="screen-container">
          {renderScreen()}
        </div>
      )}
      
      
      {/* Always visible components */}
      <div className="relative">
        <LanguageSelector />
        <AdminPanel />
        
        {/* Global Language Selector Icon - always visible except screensaver */}
        {currentScreen !== 'screensaver' && (
          <div 
            className="fixed bottom-0 left-0"
            style={{
              zIndex: 60,
              marginBottom: '3.94rem', 
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
        {(currentScreen === 'question' || currentScreen === 'feedback') && (
          <div 
            className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40"
            style={{
              bottom: '5.5rem'
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
