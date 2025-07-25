// Import animation library and screensaver components
import { motion } from 'framer-motion';

// Import custom hooks and configuration
import { useScreensaverScreen } from '../hooks/useScreensaverScreen';
import { useScreensaverScreenStyles } from './ScreensaverScreen/ScreensaverScreenConfig';

// Import subcomponents
import ScreensaverLoading from './ScreensaverScreen/ScreensaverLoading';
import ScreensaverBackground from './ScreensaverScreen/ScreensaverBackground';

// Screensaver component - idle state that activates after inactivity
const ScreensaverScreen = () => {
  // Get screensaver data and handlers from custom hook
  const {
    isLoading,
    isValidData,
    screensaverContent,
    defaultContent,
    handleTouch,
  } = useScreensaverScreen();

  // Get dynamic styles
  const {
    titleStyle,
    videoStyle,
  } = useScreensaverScreenStyles();

  // Show loading state while content is being fetched
  if (isLoading) {
    return <ScreensaverLoading titleStyle={titleStyle} />;
  }

  // Don't render if data is invalid
  if (!isValidData) return null;

  return (
    // Animated fullscreen container with touch handlers
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center cursor-pointer"
      onClick={handleTouch}
      onTouchStart={handleTouch}
    >
      {/* Background video or image */}
      <ScreensaverBackground 
        defaultContent={defaultContent}
        videoStyle={videoStyle}
      />
    </motion.div>
  );
};

export default ScreensaverScreen;
