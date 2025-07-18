import ProgressDots from '../shared/ProgressDots';
import StandardFooter from '../shared/StandardFooter';
import { QUESTION_CONFIG } from './QuestionScreenConfig';

const QuestionFooter = ({ currentQuestionIndex, progressDotsStyle, answers, questions }) => (
  <div className="relative">
    {/* Pagination dots - positioned independently but aligned vertically with language icon */}
    <ProgressDots
      totalQuestions={QUESTION_CONFIG.TOTAL_QUESTIONS}
      currentQuestionIndex={currentQuestionIndex}
      answers={answers}
      questions={questions}
      variant="default"
      className="absolute"
      style={progressDotsStyle}
    />
    
    {/* Standard footer with language icon only */}
    <StandardFooter
      showProgressDots={false}
      alignProgressDots="center"
    />
  </div>
);

export default QuestionFooter;
