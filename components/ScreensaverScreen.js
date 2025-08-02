// Import custom hooks and configuration
import { useScreensaverScreen } from '../hooks/useScreensaverScreen';
import { useScreensaverScreenStyles } from './ScreensaverScreen/ScreensaverScreenConfig';
import { useEffect, useRef } from 'react';

// Import subcomponents
import ScreensaverLoading from './ScreensaverScreen/ScreensaverLoading';
import ScreensaverBackground from './ScreensaverScreen/ScreensaverBackground';

// Screensaver component - idle state that activates after inactivity
const ScreensaverScreen = () => {
  const containerRef = useRef(null);
  console.log('🖥️ ScreensaverScreen component rendered');

  const {
    isLoading,
    isValidData,
    shouldShowScreensaver,
    screensaverContent,
    defaultContent,
    handleTouch,
  } = useScreensaverScreen();

  const {
    titleStyle,
    videoStyle,
  } = useScreensaverScreenStyles();

  console.log('🖥️ ScreensaverScreen state - isLoading:', isLoading, 'isValidData:', isValidData, 'shouldShowScreensaver:', shouldShowScreensaver);

  // No animations - direct visibility
  useEffect(() => {
    if (containerRef.current && !isLoading && shouldShowScreensaver) {
      // Set directly visible without animations
      containerRef.current.style.opacity = '1';
    }
  }, [isLoading, shouldShowScreensaver]);

  if (isLoading) {
    console.log('🔄 ScreensaverScreen showing loading screen');
    return <ScreensaverLoading titleStyle={titleStyle} />;
  }

  // Always show screensaver, even with fallback content
  console.log('✅ ScreensaverScreen rendering main content');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center cursor-pointer"
      onClick={handleTouch}
      onTouchStart={handleTouch}
      style={{
        opacity: 1,
        zIndex: 9999, // MUCH HIGHER Z-INDEX
        backgroundColor: 'rgba(0,0,0,0.8)'
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
