// Import React and results configuration
import { processTextWithHTML } from '../../utils/textProcessor';

// Results title component with line break processing
const ResultsTitle = ({ title, showContent }) => {
  return (
    <h1
      className="title-results"
      style={{ 
        marginBottom: 'var(--results-title-margin)',
        paddingLeft: '15rem',
        paddingRight: '6rem',
        opacity: showContent ? 1 : 0
      }}
    >
      {processTextWithHTML(title)}
    </h1>
  );
};

export default ResultsTitle;
