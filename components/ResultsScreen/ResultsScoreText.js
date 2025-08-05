import { processTextWithHTML } from '../../utils/textProcessor';

// Score text component for results screen
const ResultsScoreText = ({ scoreText, scoreTextColor }) => {
  return (
    <p
      className="subtitle-small"
      style={{ 
        marginBottom: 'var(--results-title-margin)',
        color: scoreTextColor || 'var(--color-blassgruen)',
        paddingLeft: '33.56rem',
        paddingRight: '6rem'
      }}
    >
      {processTextWithHTML(scoreText)}
    </p>
  );
};

export default ResultsScoreText;
