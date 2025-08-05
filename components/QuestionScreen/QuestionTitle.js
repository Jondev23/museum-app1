import { processTextWithHTML } from '../../utils/textProcessor';

// Question title component with fixed typography styles
const QuestionTitle = ({ question }) => {
  return (
    <h1
      className="typography-fragen relative w-full overflow-hidden flex items-center justify-center text-center mb-[min(3rem,4vh)] box-border px-[15rem]"
    >
      {processTextWithHTML(question.question)}
    </h1>
  );
};

export default QuestionTitle;