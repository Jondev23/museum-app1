
import { processTextWithHTML } from '../../utils/textProcessor';

// Score text component for results screen with line break processing
const ResultsScoreText = ({ scoreText, scoreTextColor, showContent }) => {
  return (
    <p
      className="subtitle-small"
      style={{ 
        marginBottom: 'var(--results-title-margin)',
        color: scoreTextColor || 'var(--color-blassgruen)',
        paddingLeft: '33.56rem',
        paddingRight: '6rem',
        opacity: showContent ? 1 : 0
      }}
    >
      {processTextWithHTML(scoreText)}
    </p>
  );
};

export default ResultsScoreText;
