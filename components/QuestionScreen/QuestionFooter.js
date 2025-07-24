import ProgressDots from '../shared/ProgressDots';
import StandardFooter from '../shared/StandardFooter';
import { QUESTION_CONFIG } from './QuestionScreenConfig';

const QuestionFooter = ({ currentQuestionIndex, progressDotsStyle, answers, questions }) => (
  <div className="relative">
    <ProgressDots
      totalQuestions={QUESTION_CONFIG.TOTAL_QUESTIONS}
      currentQuestionIndex={currentQuestionIndex}
      answers={answers}
      questions={questions}
      variant="default"
      className="absolute"
      style={progressDotsStyle}
    />
    
    <StandardFooter
      showProgressDots={false}
      alignProgressDots="center"
    />
  </div>
);

export default QuestionFooter;
