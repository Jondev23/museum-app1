// Import animation library and shared components
import { motion } from 'framer-motion';
import StandardFooter from './shared/StandardFooter';

// Import custom hook and configuration
import useResultsScreen from '../hooks/useResultsScreen';
import { ANIMATION_CONFIG } from './ResultsScreen/ResultsScreenConfig';

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
      {/* Animated content container - only content slides in */}
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }} // Content animation duration
        className="fixed inset-0 flex flex-col cursor-pointer z-20"
        onClick={handleTouchAnywhere}
      >
        {/* Content - Fully responsive layout */}
        <div 
          className="relative z-10 flex flex-col items-center justify-center h-full w-full"
          style={{ 
            paddingTop: 'clamp(15rem, 18vh, 21rem)', // Responsive top padding
            paddingBottom: 'clamp(8rem, 12vh, 15rem)', // Responsive bottom padding
            paddingLeft: 'var(--results-horizontal-padding)',
            paddingRight: 'var(--results-horizontal-padding)',
            minHeight: '100vh', // Ensure full height
            gap: 'clamp(1rem, 3vh, 2rem)' // Responsive gap between elements
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

          {/* Play Again Button - integrated in responsive layout */}
          <div className="mt-auto mb-8"> {/* Push to bottom with margin */}
            <ResultsPlayAgainButton 
              playAgainText={contentData.playAgainText}
              showContent={showContent}
              onPlayAgain={handlePlayAgain}
            />
          </div>
        </div>
      </motion.div>

      {/* Footer section - separated with independent animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.4, // Entry duration
          exit: { duration: 0.2, delay: 0.15 } // Delayed exit to overlap with next screen footer
        }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <StandardFooter />
      </motion.div>
    </>
  );
};

export default ResultsScreen;
