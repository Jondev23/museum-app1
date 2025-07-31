// Import screensaver components

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
    videoStyle,
  } = useScreensaverScreenStyles();

  // Show loading state while content is being fetched
  if (isLoading) {
    return <ScreensaverLoading />;
  }

  // Don't render if data is invalid
  if (!isValidData) return null;

  return (
    // Container - animations now handled by index.js
    <div
      className="fixed inset-0 flex flex-col items-center justify-center cursor-pointer"
      onClick={handleTouch}
      onTouchStart={handleTouch}
    >
      {/* Background video or image */}
      <ScreensaverBackground 
        defaultContent={defaultContent}
        videoStyle={videoStyle}
      />
    </div>
  );
};

export default ScreensaverScreen;
