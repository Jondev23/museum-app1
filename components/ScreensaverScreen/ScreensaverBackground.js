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
        duration: 1.0, // Faster symmetric duration
        ease: "easeInOut", // Symmetric easing for consistent feel
        delay: 0 // Start immediately
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
        duration: 1.0, // Same faster duration for consistency
        ease: "easeInOut", // Symmetric easing
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
