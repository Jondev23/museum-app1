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
import AdminPanel from '../components/AdminPanel';

// Main application component
export default function Home() {
  // Get current screen state from app context
  const { currentScreen } = useApp();

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
    </div>
  );
}
