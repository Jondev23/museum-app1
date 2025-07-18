const ResultsBackground = ({ backgroundImage }) => {
  const bgImage = backgroundImage || '/images/Bild_Kutsche.webp';
  
  return (
    <>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-overlay" />
    </>
  );
};

export default ResultsBackground;
