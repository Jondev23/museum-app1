# Content Management - HTML Tags Support

## Summary of implemented changes

HTML tag support has been added to the kiosk system titles, allowing greater control over text formatting and presentation.

## Supported content types

The HTML tag support has been extended to cover all text content in the kiosk system:

### Titles and Subtitles:
- Start screen titles and subtitles
- Question titles  
- Feedback screen titles
- Results screen titles
- Screensaver titles
- Language selector titles

### Descriptive Text:
- Start screen highlight text and intro text
- Feedback messages and explanations
- User selected answer display
- Score text

### Interactive Elements:
- Answer button text
- Continue button text
- Play again button text  
- Language selection button text

## Supported HTML tags

### 1. `<br>` tags - Line breaks
- **Purpose**: Create line breaks in titles
- **Usage**: `<br>` or `<br/>`
- **Example**: `"title": "First line<br>Second line"`

### 2. `<b>` tags - Bold text  
- **Purpose**: Highlight specific parts of text in bold
- **Usage**: `<b>text</b>`
- **Example**: `"title": "<b>Important text</b> normal text"`

### 3. Tag combinations
- **Usage**: Both tags can be combined
- **Example**: `"title": "<b>Main Title</b><br>Normal subtitle"`

## Backward compatibility

The system maintains backward compatibility with:
- **Previous pattern**: Text using ` / ` for line breaks still works
- **Plain text**: Text without HTML tags works normally

## Affected files

### Updated components:
- `StartScreenTitle.js` - Start screen titles and subtitles
- `StartScreenDescription.js` - Highlight text and intro text
- `QuestionTitle.js` - Question titles
- `AnswerButtons.js` - Answer button text
- `FeedbackTitle.js` - Feedback screen titles
- `FeedbackMessage.js` - Feedback messages and explanations  
- `FeedbackAnswer.js` - User selected answer display
- `FeedbackButton.js` - Continue button text
- `ResultsTitle.js` - Results screen titles
- `ResultsScoreText.js` - Score text
- `ResultsPlayAgainButton.js` - Play again button text
- `ScreensaverTitle.js` - Screensaver titles
- `LanguageTitle.js` - Language selector titles
- `LanguageButton.js` - Language button text

### Utility file:
- `utils/textProcessor.js` - Centralized processing function

## JSON usage examples

### Before (previous method still supported):
```json
{
  "title": "Distanzen / des Reisens",
  "question": "Long question / with line break"
}
```

### Now (new methods):
```json
{
  "title": "<b>Distanzen</b><br>des Reisens",
  "subtitle": "Wie schnell war das <b>eigentlich</b>?",
  "question": "<b>Wie schnell</b> fuhren Kutschen<br>typischerweise auf Landstraßen?"
}
```

### Examples implemented in the project:

#### Kiosk 2 - Comprehensive example (German):
```json
{
  "title": "<b>Geschwindigkeiten</b><br>im 19. Jahrhundert",
  "subtitle": "Wie schnell war das <b>eigentlich</b>?",
  "highlightText": "<b>Reisegeschwindigkeiten</b><br>im 19. Jahrhundert",
  "introText": "Teste dein Wissen! Fünf Fragen rund um <b>Tempo und Technik</b> im Zeitalter der Pferdestärken warten auf dich.<br><br>Fußgänger, Reiter, Kutsche oder Eisenbahn – wer war am <b>flottesten</b> unterwegs?",
  "question": "<b>Wie schnell</b> fuhren Kutschen<br>typischerweise auf Landstraßen?",
  "explanation": "Die Reisegeschwindigkeit hing stark von Faktoren wie <b>Streckenbeschaffenheit, Wetter, Straßenqualität</b> ab.<br><br>Unter günstigen Bedingungen erreichten sie typischerweise <b>10 bis 15 Kilometern pro Stunde</b>."
}
```

#### Kiosk 1 (German):
```json
{
  "title": "<b>Distanzen</b><br>des Reisens",
  "question": "<b>Wie viele Kilometer</b><br>konnte eine Postkutsche durchschnittlich an einem Tag zurücklegen?"
}
```

#### Kiosk 1 (English):
```json
{
  "title": "<b>Distances</b><br>of Travel", 
  "question": "<b>How many kilometers</b><br>could a mail coach travel on average per day?"
}
```

### Complex combinations:
```json
{
  "title": "<b>Bold text</b><br>Normal line<br><b>Another bold line</b>",
  "subtitle": "Text with <b>highlighted words</b> in the middle"
}
```

## Technical implementation

### Main function: `processTextWithHTML()`
- Processes backward compatibility with ` / ` pattern
- Converts `<br>` tags to React `<br />` elements
- Converts `<b>` tags to `<span>` elements with `fontWeight: 'bold'`
- Returns valid React JSX elements

### Integration:
All title components now import and use:
```javascript
import { processTextWithHTML } from '../../utils/textProcessor';

// In render:
{processTextWithHTML(titleText)}
```

## Next steps

The system is prepared to expand to other HTML tags such as:
- `<i>` for italic text
- `<u>` for underlined text
- `<span>` with custom styles

## Recommended tests

1. Verify that titles with `<br>` display on multiple lines
2. Confirm that text with `<b>` appears in bold
3. Check that the previous ` / ` pattern still works
4. Test combinations of both tags
5. Verify that text without tags displays normally
