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

  // Simple fade-in animation when component mounts
  useEffect(() => {
    if (containerRef.current && !isLoading && isValidData) {
      // Set initial state
      gsap.set(containerRef.current, {
        opacity: 0
      });
      
      // Simple fade in
      gsap.to(containerRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [isLoading, isValidData]);

  if (isLoading) {
    return <ScreensaverLoading titleStyle={titleStyle} />;
  }

  if (!isValidData) return null;

  return (
    <div
      ref={containerRef}
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
