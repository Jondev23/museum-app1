import { useApp } from '../context/AppContext';
import { AnimatePresence } from 'framer-motion';
import ScreensaverScreen from '../components/ScreensaverScreen';
import StartScreen from '../components/StartScreen';
import QuestionScreen from '../components/QuestionScreen';
import FeedbackScreen from '../components/FeedbackScreen';
import ResultsScreen from '../components/ResultsScreen';
import LanguageSelector from '../components/LanguageSelector';
import AdminPanel from '../components/AdminPanel';

export default function Home() {
  const { currentScreen } = useApp();

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
    <div className="w-screen h-screen overflow-hidden bg-black">
      <AnimatePresence>
        {renderScreen()}
      </AnimatePresence>
      
      <LanguageSelector />
      <AdminPanel />
    </div>
  );
}
