// Import app context and animation library
import { useApp } from '../context/AppContext';
import { AnimatePresence, motion } from 'framer-motion';

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

  // Render different screens based on current state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'screensaver':
        return <ScreensaverScreen key="screensaver" />;
      case 'start':
        return <StartScreen key="start" />;
      case 'question':
        return <QuestionScreen key="question" />;
      case 'feedback':
        return <FeedbackScreen key="feedback" />;
      case 'results':
        return <ResultsScreen key="results" />;
      default:
        return <ScreensaverScreen key="screensaver" />;
    }
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
          show: false, // Results screen handles its own progress dots locally
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
      <div className="fixed inset-0 z-5">
        <GlobalBackground backgroundImage={globalBackgroundImage} />
      </div>

      {/* Animated transitions between screens */}
      <AnimatePresence mode="wait">
        {/* Fade overlay for smooth transition to screensaver */}
        {isTransitioningToScreensaver && (
          <motion.div
            key="screensaver-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-30"
          />
        )}
      </AnimatePresence>

      {/* Current screen content with fade effect during screensaver transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentScreen}-${isTransitioningToScreensaver ? 'fading' : 'active'}`}
          initial={{ opacity: currentScreen === 'screensaver' ? 0 : 1 }}
          animate={{ 
            opacity: isTransitioningToScreensaver ? 0 : 1 
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            // Give screensaver consistent timing for smooth video fade - faster but symmetric
            duration: currentScreen === 'screensaver' ? 1.0 : (isTransitioningToScreensaver ? 0.5 : 0.3),
            ease: currentScreen === 'screensaver' ? "easeInOut" : "easeInOut"
          }}
          className="relative z-10"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      
      {/* Always visible components - hidden during screensaver transition */}
      <motion.div
        animate={{ 
          opacity: (isTransitioningToScreensaver || isCriticalTransition) ? 0 : 1 
        }}
        transition={{ 
          duration: isCriticalTransition ? 0.05 : (isTransitioningToScreensaver ? 0.3 : 0.2),
          ease: "easeInOut" 
        }}
        className="relative z-40"
      >
        <LanguageSelector />
        <AdminPanel />
        
        {/* Global Language Selector Icon - hidden during screensaver and critical transitions */}
        {currentScreen !== 'screensaver' && !isCriticalTransition && (
          <div 
            className="fixed bottom-0 left-0 z-50"
            style={{
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

        {/* Global Progress Dots - shown during quiz screens */}
        {progressConfig.show && !isCriticalTransition && (
          <motion.div 
            key="progress-dots"
            initial={{ opacity: 1 }}
            animate={{ opacity: isCriticalTransition ? 0 : 1 }}
            transition={{ duration: 0.05 }}
            className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40"
            style={{
              bottom: progressConfig.variant === 'results' 
                ? 'min(20rem, 21vh)' 
                : 'min(4.5rem, 7.5vh)' 
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
