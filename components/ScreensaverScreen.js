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
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.8)'
      }}
    >
      <ScreensaverBackground 
        defaultContent={defaultContent}
        videoStyle={videoStyle}
      />
      
      {/* Fallback content visible for debugging */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">SCREENSAVER ACTIVE</h1>
          <p className="text-xl">Touch anywhere to continue</p>
        </div>
      </div>
    </div>
  );
};

export default ScreensaverScreen;
