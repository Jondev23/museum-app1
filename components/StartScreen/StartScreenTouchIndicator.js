import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Touch indicator component with swipe animation for start screen using GSAP
const StartScreenTouchIndicator = ({ 
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

  // Clean animation styles - no more CSS animations
  const animationStyles = {
    ...touchIndicatorStyle,
    // Remove CSS animation and transition properties
  };

  return (
    <div
      style={touchIndicatorContainerStyle}
    >
      {/* Swipe indicator icon with GSAP animation - ahora clickeable */}
      <img
        ref={iconRef}
        src="./images/OE_Swipe_128.svg"
        alt="Swipe indicator"
        style={{
          ...animationStyles,
          cursor: 'pointer',
          pointerEvents: 'auto'
        }}
      />
    </div>
  );
};

export default StartScreenTouchIndicator;
