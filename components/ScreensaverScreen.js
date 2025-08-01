// Import custom hooks and configuration
import { useScreensaverScreen } from '../hooks/useScreensaverScreen';
import { useScreensaverScreenStyles } from './ScreensaverScreen/ScreensaverScreenConfig';

// Import subcomponents
import ScreensaverLoading from './ScreensaverScreen/ScreensaverLoading';
import ScreensaverBackground from './ScreensaverScreen/ScreensaverBackground';

// Screensaver component - idle state that activates after inactivity
const ScreensaverScreen = () => {
  const {
    isLoading,
    isValidData,
    screensaverContent,
    defaultContent,
    handleTouch,
  } = useScreensaverScreen();

  const {
    titleStyle,
    videoStyle,
  } = useScreensaverScreenStyles();

  if (isLoading) {
    return <ScreensaverLoading titleStyle={titleStyle} />;
  }

  if (!isValidData) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center cursor-pointer"
      onClick={handleTouch}
      onTouchStart={handleTouch}
      style={{
        willChange: 'opacity'
      }}
    >
      <ScreensaverBackground 
        defaultContent={defaultContent}
        videoStyle={videoStyle}
      />
    </div>
  );
};

export default ScreensaverScreen;
