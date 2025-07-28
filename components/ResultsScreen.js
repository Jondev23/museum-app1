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
import ResultsBackground from './ResultsScreen/ResultsBackground';

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
      {/* Fixed background layer - remains static */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.01 }}
        className="fixed inset-0 z-10"
      >
        {/* Background image component */}
        <ResultsBackground backgroundImage={contentData.backgroundImage} />
      </motion.div>

      {/* Animated content container - only content slides in */}
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }} // Content animation duration
        className="fixed inset-0 flex flex-col cursor-pointer z-20"
        onClick={handleTouchAnywhere}
      >
        {/* Content - Centered vertically and horizontally */}
        <div 
          className="relative z-10 flex flex-col items-center justify-center h-full"
          style={{ 
            paddingTop: 'var(--spacing-lg)',
            paddingBottom: 'var(--spacing-lg)',
            paddingLeft: 'var(--results-horizontal-padding)',
            paddingRight: 'var(--results-horizontal-padding)'
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

          {/* ResultsProgress now global */}
          {/* <ResultsProgress 
            questions={questions} 
            answers={answers} 
          /> */}
        </div>

        <ResultsPlayAgainButton 
          playAgainText={contentData.playAgainText}
          showContent={showContent}
          onPlayAgain={handlePlayAgain}
        />
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
