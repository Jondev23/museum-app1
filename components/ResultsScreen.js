import StandardFooter from './shared/StandardFooter';

// Import custom hook and configuration
import useResultsScreen from '../hooks/useResultsScreen';

// Import subcomponents
import ResultsTitle from './ResultsScreen/ResultsTitle';
import ResultsScoreText from './ResultsScreen/ResultsScoreText';
import ResultsPlayAgainButton from './ResultsScreen/ResultsPlayAgainButton';
import ResultsProgress from './ResultsScreen/ResultsProgress';

// Results screen component - shows final quiz score and play again option
const ResultsScreen = () => {
  const {
    showContent,
    contentData,
    questions,
    answers,
    handlePlayAgain,
    handleTouchAnywhere,
    isValid
  } = useResultsScreen();

  if (!isValid) return null;

  return (
    <>
      {/* Content container */}
      <div
        className="fixed inset-0 flex flex-col cursor-pointer z-20"
        onClick={handleTouchAnywhere}
      >
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

          <ResultsProgress 
            questions={questions} 
            answers={answers}
            showContent={showContent}
          />

          <div className="mt-auto mb-2">
            <ResultsPlayAgainButton 
              playAgainText={contentData.playAgainText}
              showContent={showContent}
              onPlayAgain={handlePlayAgain}
            />
          </div>
        </div>
      </div>

      {/* Footer section */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <StandardFooter />
      </div>
    </>
  );
};

export default ResultsScreen;
