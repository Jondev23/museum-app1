import { ArrowButton } from '../shared';

// Continue button component for feedback screen
const FeedbackButton = ({ 
  buttonText, 
  nextQuestion, 
  buttonContainerStyle, 
  buttonStyle, 
  buttonTextStyle, 
  arrowStyle 
}) => {
  return (
    <ArrowButton
      buttonText={buttonText}
      onClick={nextQuestion}
      position="bottom-right"
      buttonStyle={buttonStyle}
      buttonTextStyle={buttonTextStyle}
      arrowStyle={arrowStyle}
      arrowAlt="Zur Auswertung"
      className="cursor-pointer"
      buttonContainerStyle={buttonContainerStyle}
    />
  );
};

export default FeedbackButton;
