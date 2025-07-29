import { motion } from 'framer-motion';
import { SCREENSAVER_CONFIG } from './ScreensaverScreenConfig';

// Background video component for screensaver screen
const ScreensaverBackground = ({ defaultContent, videoStyle }) => (
  <>
    {/* Background video with fade in animation */}
    <motion.video
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0 // Simple fade out
      }}
      transition={{ 
        duration: 2.5, // Even longer duration for very gradual video fade
        ease: "easeOut", // Simple smooth easing
        delay: 0 // Start fading immediately
      }}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={{
        ...videoStyle,
        willChange: 'opacity' // Only optimize for opacity changes
      }}
    >
      <source 
        src={defaultContent.videoSource} 
        type={SCREENSAVER_CONFIG.VIDEO.TYPE} 
      />
    </motion.video>
    
    {/* Dark overlay with fade in */}
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0 // Simple fade out
      }}
      transition={{ 
        duration: 2.0, // Gradual overlay fade
        ease: "easeOut", // Simple smooth easing
        delay: 0
      }}
      className={`absolute inset-0 ${SCREENSAVER_CONFIG.COLORS.OVERLAY} z-10`}
      style={{
        willChange: 'opacity' // Only optimize for opacity changes
      }}
    />
  </>
);

export default ScreensaverBackground;
