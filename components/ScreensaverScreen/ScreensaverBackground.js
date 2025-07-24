import { SCREENSAVER_CONFIG } from './ScreensaverScreenConfig';

// Background video component for screensaver screen
const ScreensaverBackground = ({ defaultContent, videoStyle }) => (
  <>
    {/* Background video */}
    <video
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
    </video>
    
    {/* Dark overlay */}
    <div className={`absolute inset-0 ${SCREENSAVER_CONFIG.COLORS.OVERLAY} z-10`} />
  </>
);

export default ScreensaverBackground;
