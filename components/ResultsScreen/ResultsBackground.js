import { BACKGROUND_CONFIG } from './ResultsScreenConfig';

const ResultsBackground = ({ backgroundImage }) => {
  const bgImage = backgroundImage || '/images/Bild_Kutsche.webp';
  
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
      <div className="absolute inset-0 bg-overlay" />
    </>
  );
};

export default ResultsBackground;
