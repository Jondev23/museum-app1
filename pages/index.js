// Import app context
import { useApp } from '../context/AppContext';

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
    console.log('🎬 renderScreen called - displayedScreen:', displayedScreen);
    switch (displayedScreen) {
      case 'screensaver':
        console.log('🖥️ Rendering ScreensaverScreen');
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
        console.log('🖥️ Default case - Rendering ScreensaverScreen');
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

      {/* Current screen content with GSAP animations */}
      <div ref={containerRef} className="screen-container">
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
