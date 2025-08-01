import { processTextWithHTML } from '../../utils/textProcessor';

// Play again button component
const ResultsPlayAgainButton = ({ 
  playAgainText, 
  onPlayAgain,
  iconSrc = './images/GUI.svg',
  iconAlt = 'Restart icon'
}) => {
  return (
    <div className="flex justify-center w-full">
      <button
        onClick={onPlayAgain}
        className="flex items-center bg-transparent border-none"
        style={{ 
          gap: 'var(--spacing-sm)',
          padding: '0', 
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        <span className="text-button-play-again">
          {processTextWithHTML(playAgainText)}
        </span>
        <img
          src={iconSrc}
          alt={iconAlt}
          style={{
            width: '4.91625rem', 
            height: '2.71563rem',
            touchAction: 'manipulation',
            pointerEvents: 'none'
          }}
        />
      </button>
    </div>
  );
};

export default ResultsPlayAgainButton;
