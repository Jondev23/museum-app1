# Kiosk Configuration Guide

## Adding Custom Videos and Background Images for Each Kiosk

Each kiosk can have its own screensaver video and background images. Follow these steps to customize:

### 1. Add Media Files

#### Videos
Place your video files in the `public/videos/` folder:
- `kiosk1-video.mp4` - For Kiosk 1 (Distances theme)
- `kiosk2-video.mp4` - For Kiosk 2 (Speeds theme)  
- `kiosk3-video.mp4` - For Kiosk 3 (General Travel theme)

#### Background Images
Place your background images in the `public/images/` folder:
- `kiosk1-background.jpg/png` - For Kiosk 1 background
- `kiosk2-background.jpg/png` - For Kiosk 2 background
- `kiosk3-background.jpg/png` - For Kiosk 3 background

**Current Configuration:**
- Kiosk 1: Uses `Bild_Kutsche.webp` (default)
- Kiosk 2: Uses `kutschen-background2.png`
- Kiosk 3: Uses `kutschen-background3.png`

### 2. Update JSON Configuration

Edit the corresponding JSON files in `public/content/`:

#### For Kiosk 1 (`kiosk1.json`):
```json
{
  "de": {
    "screensaver": {
      "handIcon": "/images/OE_Touch_128 2.svg",
      "videoSource": "/videos/kiosk1-video.mp4",
      "title": "Distanzen - Willkommen im Museum"
    },
    "startScreen": {
      "title": "Distances",
      "subtitle": "How far? How long?",
      "backgroundImage": "/images/Bild_Kutsche.webp"
    }
  },
  "en": {
    "screensaver": {
      "handIcon": "/images/OE_Touch_128 2.svg",
      "videoSource": "/videos/kiosk1-video.mp4",
      "title": "Distances - Welcome to the Museum"
    }
  }
}
```

#### For Kiosk 2 (`kiosk2.json`):
```json
{
  "de": {
    "screensaver": {
      "handIcon": "/images/OE_Touch_128 2.svg",
      "videoSource": "/videos/kiosk2-video.mp4",
      "title": "Geschwindigkeiten - Willkommen im Museum"
    },
    "startScreen": {
      "title": "Speeds",
      "subtitle": "How fast was it actually?",
      "backgroundImage": "/images/kutschen-background2.png"
    }
  },
  "en": {
    "screensaver": {
      "handIcon": "/images/OE_Touch_128 2.svg",
      "videoSource": "/videos/kiosk2-video.mp4",
      "title": "Speeds - Welcome to the Museum"
    }
  }
}
```

#### For Kiosk 3 (`kiosk3.json`):
```json
{
  "de": {
    "screensaver": {
      "handIcon": "/images/OE_Touch_128 2.svg",
      "videoSource": "/videos/kiosk3-video.mp4",
      "title": "Reisen allgemein - Willkommen im Museum"
    },
    "startScreen": {
      "title": "General Travel",
      "subtitle": "What was traveling really like in the past?",
      "backgroundImage": "/images/kutschen-background3.png"
    }
  },
  "en": {
    "screensaver": {
      "handIcon": "/images/OE_Touch_128 2.svg",
      "videoSource": "/videos/kiosk3-video.mp4",
      "title": "General Travel - Welcome to the Museum"
    }
  }
}
```

### 4. Background Image Requirements

- **Format:** JPG, PNG, or WebP
- **Resolution:** 1920x1080 or higher recommended
- **Aspect Ratio:** 16:9 preferred (will be cropped to fit)
- **Size:** Keep under 5MB for better performance
- **Usage:** Used in StartScreen, QuestionScreen, FeedbackScreen, and ResultsScreen

### 5. Video Requirements

- **Format:** MP4 (H.264)
- **Resolution:** 1920x1080 recommended
- **Duration:** 30-60 seconds (loops automatically)
- **Size:** Keep under 50MB for better performance
- **Audio:** Muted (audio will be disabled in browser)

### 6. Rebuild Application

After making changes:
1. Run `npm run build`
2. Restart the kiosk application

### 7. Fallback Behavior

- **Videos:** If a specific video is not found, the application will use `screensaver-video.mp4` as fallback
- **Background Images:** If a specific background is not found, the application will use `Bild_Kutsche.webp` as fallback

---
**Note:** Remember to avoid spaces and special characters in video filenames to prevent loading issues.
