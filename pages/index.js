// Import app context and animation library
import { useApp } from '../context/AppContext';
import { AnimatePresence, motion } from 'framer-motion';

// Import unified transition system
import { 
  getScreenTransition, 
  getOverlayTransition, 
  getUITransition,
  SCREENSAVER_TRANSITION,
  TRANSITION_CONFIG
} from '../utils/screenTransitions';

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

  // Render different screens based on current state with unified animations
  const renderScreen = () => {
    const screens = {
      'screensaver': { Component: ScreensaverScreen, key: "screensaver" },
      'start': { Component: StartScreen, key: "start" },
      'question': { Component: QuestionScreen, key: `question-${currentQuestionIndex}` },
      'feedback': { Component: FeedbackScreen, key: `feedback-${currentQuestionIndex}` },
      'results': { Component: ResultsScreen, key: "results" }
    };

    const screenConfig = screens[currentScreen] || screens['screensaver'];
    const { Component, key } = screenConfig;
    const transitionConfig = getScreenTransition(currentScreen);

    return (
      <motion.div
        key={key}
        initial={transitionConfig.initial}
        animate={transitionConfig.animate}
        exit={transitionConfig.exit}
        transition={transitionConfig.transition}
        className="fixed inset-0"
        style={{ zIndex: TRANSITION_CONFIG.Z_INDEX.CONTENT }}
      >
        <Component />
      </motion.div>
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

      {/* Current screen content with unified transitions */}
      <AnimatePresence mode="popLayout" initial={false}>
        {!isTransitioningToScreensaver && renderScreen()}
        {isTransitioningToScreensaver && (
          <motion.div
            key="screensaver-transition"
            {...SCREENSAVER_TRANSITION.overlay}
            className="fixed inset-0 bg-black"
            style={{ zIndex: TRANSITION_CONFIG.Z_INDEX.OVERLAY }}
          />
        )}
      </AnimatePresence>
      
      {/* Always visible components with unified animations */}
      <motion.div
        animate={{ 
          opacity: (isTransitioningToScreensaver || isCriticalTransition) ? 0 : 1 
        }}
        transition={{ 
          duration: isCriticalTransition ? 0.05 : (isTransitioningToScreensaver ? 0.3 : 0.2),
          ease: "easeInOut" 
        }}
        className="relative"
        style={{ zIndex: TRANSITION_CONFIG.Z_INDEX.UI }}
      >
        <LanguageSelector />
        <AdminPanel />
        
        {/* Global Language Selector Icon with unified animation */}
        {currentScreen !== 'screensaver' && !isCriticalTransition && (
          <motion.div 
            {...getUITransition('languageIcon')}
            className="fixed bottom-0 left-0"
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
          </motion.div>
        )}

        {/* Global Progress Dots with unified animation */}
        {progressConfig.show && !isCriticalTransition && (
          <motion.div 
            key="progress-dots"
            {...getUITransition('progressDots')}
            className="fixed bottom-0 left-1/2 transform -translate-x-1/2"
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
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
