// Container wrapper for language selector content with CSS animations
const LanguageContainer = ({ onContentClick, children }) => {
  return (
    <div
      className="language-container scale-modal-animation standard-timing"
      onClick={onContentClick}
    >
      {children}
    </div>
  );
};

export default LanguageContainer;
