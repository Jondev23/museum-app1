import { processTextWithHTML } from '../../utils/textProcessor';

// Results title component
const ResultsTitle = ({ title }) => {
  return (
    <h1
      className="title-results"
      style={{ 
        marginBottom: 'var(--results-title-margin)',
        paddingLeft: '10rem',
        paddingRight: '10rem'
      }}
    >
      {processTextWithHTML(title)}
    </h1>
  );
};

export default ResultsTitle;
