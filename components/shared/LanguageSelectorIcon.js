import { useApp } from '../../context/AppContext';

const LanguageSelectorIcon = ({ 
  variant = 'standard',
  className = '',
  style = {},
  opacity = 0.8
}) => {
  const { setShowLanguageSelector } = useApp();

  const baseIconStyles = {
    width: '4rem',
    height: '4rem',
    display: 'block',
    opacity: opacity
  };

  const getContainerStyles = () => ({
    flexShrink: 0,
    marginBottom: 'min(4.7rem, 8.2vh)',
    marginLeft: 'min(10rem, 7.5vw)',
    ...style
  });

  const getButtonStyles = () => ({
    minWidth: 'min(3.5rem, 6vw)',
    minHeight: 'min(3.5rem, 6vh)'
  });

  const handleClick = () => {
    setShowLanguageSelector(true);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setShowLanguageSelector(true);
  };

  return (
    <div className={className} style={getContainerStyles()}>
      <button
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        className="cursor-pointer relative"
        style={{
          ...getButtonStyles(),
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          zIndex: 50
        }}
      >
        <img
          src="./images/OE_Sprache_64.svg"
          alt="Language selector"
          style={{
            ...baseIconStyles,
            touchAction: 'manipulation',
            pointerEvents: 'none'
          }}
        />
      </button>
    </div>
  );
};

export default LanguageSelectorIcon;
