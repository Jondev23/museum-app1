// Import app context and animation library
import { useApp } from '../context/AppContext';
import { useEffect, useState } from 'react';

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
import ScreenRenderer from '../components/ScreenRenderer';

// Import Z-INDEX configuration
import { TRANSITION_CONFIG } from '../utils/animations';

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
    isTransitioningToScreensaver,
    isCriticalTransition,
    kioskId
  } = useApp();

  // Show loading screen if kioskId is not yet determined
  if (!kioskId) {
    return (
      <div className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-2xl mb-4">Initialisiere Kiosk...</div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  // Render different screens based on current state without the animation system
  const renderScreen = () => {
    const screens = {
      'screensaver': { Component: ScreensaverScreen },
      'start': { Component: StartScreen },
      'question': { Component: QuestionScreen },
      'feedback': { Component: FeedbackScreen },
      'results': { Component: ResultsScreen }
    };

    const screenConfig = screens[currentScreen] || screens['screensaver'];
    const { Component } = screenConfig;

    return (
      <ScreenRenderer
        currentScreen={currentScreen}
        Component={Component}
      />
    );
  };

  // Determine if progress dots should be shown and what variant
  const getProgressDotsConfig = () => {
    // Hide progress dots during critical transitions to prevent showing incorrect state
    if (isCriticalTransition) {
      return { show: false };
    }
    
    switch (currentScreen) {
      case 'question':
        return {
          show: true,
          variant: 'default',
          totalQuestions: 5
        };
      case 'feedback':
        return {
          show: true,
          variant: 'feedback',
          totalQuestions: 5
        };
      case 'results':
        return {
          show: false, 
          variant: 'results',
          totalQuestions: 5
        };
      default:
        return { show: false };
    }
  };

  const progressConfig = getProgressDotsConfig();

  // Get background image from current kiosk configuration
  const startContent = content?.[language]?.startScreen;
  const globalBackgroundImage = startContent?.backgroundImage;

  return (
    // Main container - fullscreen with black background
    <div className="w-screen h-screen overflow-hidden bg-black">
      {/* Global Background - static across all screens */}
      <div className="fixed inset-0" style={{ zIndex: TRANSITION_CONFIG.Z_INDEX.BACKGROUND }}>
        <GlobalBackground backgroundImage={globalBackgroundImage} />
      </div>

      {/* Current screen content without the animation system */}
      <div>
        {!isTransitioningToScreensaver && renderScreen()}
      </div>
      
      {isTransitioningToScreensaver && (
        <div
          key="screensaver-transition"
          className="fixed inset-0 bg-black fade-animation standard-timing"
          style={{ zIndex: TRANSITION_CONFIG.Z_INDEX.OVERLAY }}
        />
      )}

      {/* Always visible components */}
      <div
        className={`relative ${isTransitioningToScreensaver ? 'fade-animation exit' : ''}`}
        style={{ zIndex: TRANSITION_CONFIG.Z_INDEX.UI }}
      >
        <LanguageSelector />
        <AdminPanel />
        
        {/* Global Language Selector Icon */}
        {currentScreen !== 'screensaver' && !isCriticalTransition && (
          <div 
            className="fixed bottom-0 left-0 slide-up-animation"
            style={{
              marginBottom: 'min(3.7rem, 4.7vh)', 
              marginLeft: 'min(9.5rem, 14.5vw)',
              zIndex: TRANSITION_CONFIG.Z_INDEX.MODAL
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

        {/* Global Progress Dots */}
        {progressConfig.show && !isCriticalTransition && (
          <div 
            key="progress-dots"
            className="fixed bottom-0 left-1/2 transform -translate-x-1/2 slide-up-animation"
            style={{
              bottom: progressConfig.variant === 'results' 
                ? 'min(20rem, 21vh)' 
                : 'min(4.5rem, 7.5vh)',
              zIndex: TRANSITION_CONFIG.Z_INDEX.UI
            }}
          >
            <ProgressDots
              totalQuestions={progressConfig.totalQuestions}
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              questions={questions}
              variant={progressConfig.variant}
            />
          </div>
        )}
      </div>
    </div>
  );
}
