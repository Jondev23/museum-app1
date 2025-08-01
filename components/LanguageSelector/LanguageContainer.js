// Container wrapper for language selector content
const LanguageContainer = ({ onContentClick, children }) => {
  return (
    <div
      className="language-container"
      onClick={onContentClick}
    >
      {children}
    </div>
  );
};

export default LanguageContainer;
