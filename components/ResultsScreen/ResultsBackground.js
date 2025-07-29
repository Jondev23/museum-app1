// Background component for results screen with overlay
const ResultsBackground = ({ backgroundImage }) => {
  const bgImage = backgroundImage || './images/Bild_Kutsche.webp';
  
  return (
    <>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-overlay" />
    </>
  );
};

export default ResultsBackground;
