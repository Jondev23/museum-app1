import { BACKGROUND_CONFIG, DEFAULT_CONTENT } from './ResultsScreenConfig';

const ResultsBackground = ({ backgroundImage }) => {
  const bgImage = backgroundImage || DEFAULT_CONTENT.backgroundImage;
  
  return (
    <>
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: BACKGROUND_CONFIG.SIZE,
          backgroundPosition: BACKGROUND_CONFIG.POSITION,
          backgroundRepeat: BACKGROUND_CONFIG.REPEAT
        }}
      />
      
      {/* Dark overlay for better text contrast */}
      <div 
        className="absolute inset-0 bg-black"
        style={{ 
          opacity: BACKGROUND_CONFIG.OVERLAY_OPACITY 
        }}
      />
    </>
  );
};

export default ResultsBackground;
