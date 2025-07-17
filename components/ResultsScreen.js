import { motion } from 'framer-motion';
import StandardFooter from './shared/StandardFooter';
import useResultsScreen from '../hooks/useResultsScreen';
import ResultsTitle from './ResultsScreen/ResultsTitle';
import ResultsScoreText from './ResultsScreen/ResultsScoreText';
import ResultsPlayAgainButton from './ResultsScreen/ResultsPlayAgainButton';
import ResultsProgress from './ResultsScreen/ResultsProgress';
import ResultsBackground from './ResultsScreen/ResultsBackground';
import { ANIMATION_CONFIG, STYLE_CONFIG } from './ResultsScreen/ResultsScreenConfig';

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
    <motion.div
      initial={ANIMATION_CONFIG.CONTAINER.INITIAL}
      animate={ANIMATION_CONFIG.CONTAINER.ANIMATE}
      exit={ANIMATION_CONFIG.CONTAINER.EXIT}
      transition={ANIMATION_CONFIG.CONTAINER.TRANSITION}
      className="fixed inset-0 flex flex-col cursor-pointer"
      onClick={handleTouchAnywhere}
    >
      <ResultsBackground backgroundImage={contentData.backgroundImage} />
      
      {/* Content - Centered vertically and horizontally */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center h-full" 
        style={STYLE_CONFIG.CONTAINER}
      >
        <ResultsTitle 
          title={contentData.title} 
          showContent={showContent} 
        />

        <ResultsScoreText 
          scoreText={contentData.scoreText} 
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
