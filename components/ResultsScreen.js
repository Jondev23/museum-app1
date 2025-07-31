// Import shared components
import StandardFooter from './shared/StandardFooter';

// Import custom hook and configuration
import useResultsScreen from '../hooks/useResultsScreen';
import { TRANSITION_CONFIG, SCREEN_TRANSITIONS } from '../utils/screenTransitions';

// Import subcomponents
import ResultsTitle from './ResultsScreen/ResultsTitle';
import ResultsScoreText from './ResultsScreen/ResultsScoreText';
import ResultsPlayAgainButton from './ResultsScreen/ResultsPlayAgainButton';
import ResultsProgress from './ResultsScreen/ResultsProgress';

// Results screen component - shows final quiz score and play again option
const ResultsScreen = () => {
  // Get results data and handlers from custom hook
  const {
    showContent,
    contentData,
    questions,
    answers,
    handlePlayAgain,
    handleTouchAnywhere,
    isValid
  } = useResultsScreen();

  // Don't render if data is invalid
  if (!isValid) return null;

  return (
    <>
      {/* Content container - animations now handled by index.js */}
      <div
        className="fixed inset-0 flex flex-col cursor-pointer"
        onClick={handleTouchAnywhere}
      >
        {/* Content - Fully responsive layout */}
        <div 
          className="relative z-10 flex flex-col items-center justify-center h-full w-full"
          style={{ 
            paddingTop: '22.6rem', 
            paddingBottom: 'clamp(3.4rem, 4.4vh, 5.4rem)', 
            paddingLeft: '0',
            paddingRight: '0',
            minHeight: '100vh', 
            gap: '0' 
          }}
        >
          <ResultsTitle 
            title={contentData.title} 
            showContent={showContent} 
          />

          <ResultsScoreText 
            scoreText={contentData.scoreText} 
            scoreTextColor={contentData.scoreTextColor}
            showContent={showContent} 
          />

          {/* Local Progress Dots - fully responsive */}
          <ResultsProgress 
            questions={questions} 
            answers={answers}
            showContent={showContent}
          />

          {/* Play Again Button - positioned at the very bottom */}
          <div className="mt-auto mb-2"> {/* Push to bottom with minimal margin */}
            <ResultsPlayAgainButton 
              playAgainText={contentData.playAgainText}
              showContent={showContent}
              onPlayAgain={handlePlayAgain}
            />
          </div>
        </div>
      </div>

      {/* Footer section - animations now handled by index.js */}
      <div className="fixed bottom-0 left-0 right-0" style={{ zIndex: 50 }}>
        <StandardFooter />
      </div>
    </>
  );
};

export default ResultsScreen;
