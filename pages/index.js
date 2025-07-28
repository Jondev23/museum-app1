// Import app context and animation library
import { useApp } from '../context/AppContext';
import { AnimatePresence } from 'framer-motion';

// Import all screen components
import ScreensaverScreen from '../components/ScreensaverScreen';
import StartScreen from '../components/StartScreen';
import QuestionScreen from '../components/QuestionScreen';
import FeedbackScreen from '../components/FeedbackScreen';
import ResultsScreen from '../components/ResultsScreen';
import LanguageSelector from '../components/LanguageSelector';
import LanguageSelectorIcon from '../components/shared/LanguageSelectorIcon';
import ProgressDots from '../components/shared/ProgressDots';
import AdminPanel from '../components/AdminPanel';

// Main application component
export default function Home() {
  // Get current screen state from app context
  const { 
    currentScreen, 
    currentQuestionIndex, 
    answers, 
    questions 
  } = useApp();

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
          show: true,
          variant: 'results',
          totalQuestions: 5
        };
      default:
        return { show: false };
    }
  };

  const progressConfig = getProgressDotsConfig();

  return (
    // Main container - fullscreen with black background
    <div className="w-screen h-screen overflow-hidden bg-black">
      {/* Animated transitions between screens */}
      <AnimatePresence>
        {renderScreen()}
      </AnimatePresence>
      
      {/* Always visible components */}
      <LanguageSelector />
      <AdminPanel />
      
      {/* Global Language Selector Icon - always visible and fixed */}
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

      {/* Global Progress Dots - shown during quiz screens */}
      {progressConfig.show && (
        <div 
          className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40"
          style={{
            bottom: progressConfig.variant === 'results' 
              ? 'min(20rem, 28vh)' // Subidos para ResultsScreen
              : 'min(4.5rem, 7.5vh)' // Mantienen posición baja para Question/Feedback
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
  );
}
