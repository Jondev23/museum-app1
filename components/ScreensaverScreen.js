// Import custom hooks and configuration
import { useScreensaverScreen } from '../hooks/useScreensaverScreen';
import { useScreensaverScreenStyles } from './ScreensaverScreen/ScreensaverScreenConfig';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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
    defaultContent,
    handleTouch,
  } = useScreensaverScreen();

  const {
    titleStyle,
    videoStyle,
  } = useScreensaverScreenStyles();

  console.log('🖥️ ScreensaverScreen state - isLoading:', isLoading, 'isValidData:', isValidData, 'shouldShowScreensaver:', shouldShowScreensaver);

  // Fade in animation when screensaver becomes visible
  useEffect(() => {
    if (containerRef.current && !isLoading && shouldShowScreensaver) {
      // Set initial state
      gsap.set(containerRef.current, { opacity: 0 });
      
      // Fade in animation
      gsap.to(containerRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [isLoading, shouldShowScreensaver]);

  // Fade out animation when exiting screensaver
  const handleExitAnimation = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.35, // Increased from 0.3 to 0.35 for smoother transition
        ease: "power2.out",
        onComplete: () => {
          handleTouch();
        }
      });
    }
  };

  // Modified handlers to include fade out animation
  const handleTouchWithAnimation = (e) => {
    e.preventDefault();
    handleExitAnimation();
  };

  const handleClickWithAnimation = (e) => {
    e.preventDefault();
    handleExitAnimation();
  };

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
      onClick={handleClickWithAnimation}
      onTouchStart={handleTouchWithAnimation}
      style={{
        opacity: 0, // Initial opacity set to 0 for fade in animation
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
