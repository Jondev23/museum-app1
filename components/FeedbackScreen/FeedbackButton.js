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
      position="bottom-right" // Posición global predeterminada
      buttonStyle={buttonStyle}
      buttonTextStyle={buttonTextStyle}
      arrowStyle={arrowStyle}
      arrowAlt="Zur Auswertung"
      className="cursor-pointer"
      // Si necesitas override del container style, usa position="custom"
      buttonContainerStyle={buttonContainerStyle}
    />
  );
};

export default FeedbackButton;
