// Animation configurations for ResultsScreen component
export const ANIMATION_CONFIG = {
  // Main container slide-in animation from right side
  CONTAINER: {
    INITIAL: { x: '100%' },        // Start off-screen to the right
    ANIMATE: { x: 0 },             // Slide to normal position
    EXIT: { opacity: 0 },          // Fade out on exit
    TRANSITION: { duration: 0.8 }  // Animation duration
  },

  // Content reveal animation with upward movement and fade
  CONTENT_REVEAL: {
    INITIAL: { y: 50, opacity: 0 },  // Start below and transparent
    ANIMATE: { y: 0, opacity: 1 },   // Move to position and become visible
    TRANSITION: { duration: 0.8 }     // Animation duration
  },

  // Staggered animation delays for different content elements
  DELAYS: {
    TITLE: 0.2,     // Results title appears first
    SUBTITLE: 0.4,  // Score text appears second
    BUTTON: 1.0     // Play again button appears last
  },

  // Interactive button animation states
  BUTTON: {
    HOVER: { scale: 1.05 },  // Slightly larger on hover
    TAP: { scale: 0.95 }     // Slightly smaller when pressed
  }
};
