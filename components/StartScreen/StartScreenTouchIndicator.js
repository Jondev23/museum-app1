import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Touch indicator component with swipe animation for start screen using GSAP
const StartScreenTouchIndicator = ({ 
  showContent, 
  handleSwipeLeft, 
  touchIndicatorContainerStyle,
  touchIndicatorStyle 
}) => {
  const iconRef = useRef(null);
  const animationRef = useRef(null);

  // GSAP animation setup
  useEffect(() => {
    if (!iconRef.current) return;

    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Create infinite swipe animation with GSAP
    animationRef.current = gsap.timeline({ repeat: -1, yoyo: false })
      .set(iconRef.current, { 
        x: 56, 
        opacity: 0 
      })
      .to(iconRef.current, { 
        x: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power2.out" 
      })
      .to(iconRef.current, { 
        duration: 0.5, 
        ease: "none" 
      }) // Hold position
      .to(iconRef.current, { 
        x: -56, 
        opacity: 0, 
        duration: 2, 
        ease: "power2.in" 
      })
      .to(iconRef.current, { 
        duration: 1, 
        ease: "none" 
      }); // Pause before repeat

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  // Handle visibility changes
  useEffect(() => {
    if (!iconRef.current || !animationRef.current) return;

    if (showContent) {
      animationRef.current.play();
    } else {
      animationRef.current.pause();
      gsap.to(iconRef.current, { opacity: 0, duration: 0.5 });
    }
  }, [showContent]);

  // Clean animation styles - no more CSS animations
  const animationStyles = {
    ...touchIndicatorStyle,
    cursor: 'pointer',
    // Remove CSS animation and transition properties
  };

  return (
    <div
      onClick={handleSwipeLeft}
      onMouseEnter={(e) => gsap.to(e.target, { scale: 1.1, duration: 0.2 })}
      onMouseLeave={(e) => gsap.to(e.target, { scale: 1, duration: 0.2 })}
      onMouseDown={(e) => gsap.to(e.target, { scale: 0.9, duration: 0.1 })}
      onMouseUp={(e) => gsap.to(e.target, { scale: 1.1, duration: 0.1 })}
      style={touchIndicatorContainerStyle}
    >
      {/* Swipe indicator icon with GSAP animation */}
      <img
        ref={iconRef}
        src="./images/OE_Swipe_128.svg"
        alt="Swipe indicator"
        style={animationStyles}
      />
    </div>
  );
};

export default StartScreenTouchIndicator;
