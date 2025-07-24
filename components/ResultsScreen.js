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
    // Animated container with click handler for touch anywhere functionality
    <motion.div
      initial={ANIMATION_CONFIG.CONTAINER.INITIAL}
      animate={ANIMATION_CONFIG.CONTAINER.ANIMATE}
      exit={ANIMATION_CONFIG.CONTAINER.EXIT}
      transition={ANIMATION_CONFIG.CONTAINER.TRANSITION}
      className="fixed inset-0 flex flex-col cursor-pointer"
      onClick={handleTouchAnywhere}
    >
      {/* Background image component */}
      <ResultsBackground backgroundImage={contentData.backgroundImage} />
      
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

        <ResultsProgress 
          questions={questions} 
          answers={answers} 
        />
      </div>

      <ResultsPlayAgainButton 
        playAgainText={contentData.playAgainText}
        showContent={showContent}
        onPlayAgain={handlePlayAgain}
      />

      <StandardFooter />
    </motion.div>
  );
};

export default ResultsScreen;
