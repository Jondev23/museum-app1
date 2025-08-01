// Overlay component for language selector background
const LanguageOverlay = ({ onOverlayClick, children }) => {
  return (
    <div
      className="language-overlay"
      onClick={onOverlayClick}
    >
      {children}
    </div>
  );
};

export default LanguageOverlay;
