import { motion } from 'framer-motion';
import { SCREENSAVER_CONFIG } from './ScreensaverScreenConfig';

// Background video component for screensaver screen
const ScreensaverBackground = ({ defaultContent, videoStyle }) => (
  <>
    {/* Background video with fade in animation */}
    <motion.video
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 1,
        ease: "easeInOut",
        delay: 0.3 // Delay to create a smooth appearance
      }}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={videoStyle}
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
      transition={{ 
        duration: 0.8,
        ease: "easeInOut",
        delay: 0.4
      }}
      className={`absolute inset-0 ${SCREENSAVER_CONFIG.COLORS.OVERLAY} z-10`} 
    />
  </>
);

export default ScreensaverBackground;
