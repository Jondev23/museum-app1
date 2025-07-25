# Kiosk Video Configuration Guide

## Adding Custom Videos for Each Kiosk

Each kiosk can have its own screensaver video. Follow these steps to customize:

### 1. Add Video Files

Place your video files in the `public/videos/` folder:
- `kiosk1-video.mp4` - For Kiosk 1 (Distances theme)
- `kiosk2-video.mp4` - For Kiosk 2 (Speeds theme)  
- `kiosk3-video.mp4` - For Kiosk 3 (General Travel theme)

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

### 3. Video Requirements

- **Format:** MP4 (H.264)
- **Resolution:** 1920x1080 recommended
- **Duration:** 30-60 seconds (loops automatically)
- **Size:** Keep under 50MB for better performance
- **Audio:** Muted (audio will be disabled in browser)

### 4. Rebuild Application

After making changes:
1. Run `npm run build`
2. Restart the kiosk application

### 5. Fallback Behavior

If a specific video is not found, the application will use `screensaver-video.mp4` as fallback.

---
**Note:** Remember to avoid spaces and special characters in video filenames to prevent loading issues.
