// Overlay component for language selector background with CSS animations
const LanguageOverlay = ({ onOverlayClick, children }) => {
  return (
    <div
      className="language-overlay fade-animation standard-timing"
      onClick={onOverlayClick}
    >
      {children}
    </div>
  );
};

export default LanguageOverlay;
