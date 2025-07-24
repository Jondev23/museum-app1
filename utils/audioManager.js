
class AudioManager {
  constructor() {
    this.audioContext = null;
    this.sounds = new Map();
    this.isMuted = false;
  }

  async init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Audio context not available', error);
    }
  }

  async loadSound(name, url) {
    if (!this.audioContext) return;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.sounds.set(name, audioBuffer);
    } catch (error) {
      console.warn(`Error loading sound ${name}:`, error);
    }
  }

  playSound(name, volume = 0.3) {
    if (this.isMuted || !this.audioContext || !this.sounds.has(name)) return;

    try {
      const audioBuffer = this.sounds.get(name);
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();

      source.buffer = audioBuffer;
      gainNode.gain.value = volume;

      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      source.start();
    } catch (error) {
      console.warn(`Error playing sound ${name}:`, error);
    }
  }

  mute() {
    this.isMuted = true;
  }

  unmute() {
    this.isMuted = false;
  }

  toggle() {
    this.isMuted = !this.isMuted;
  }
}

export const SOUND_EFFECTS = {
  BUTTON_CLICK: 'button-click',
  CORRECT_ANSWER: 'correct-answer',
  INCORRECT_ANSWER: 'incorrect-answer',
  QUIZ_COMPLETE: 'quiz-complete',
  SCREEN_TRANSITION: 'screen-transition'
};

export const audioManager = new AudioManager();

export const useAudio = () => {
  const playSound = (soundName, volume) => {
    audioManager.playSound(soundName, volume);
  };

  return {
    playSound,
    mute: () => audioManager.mute(),
    unmute: () => audioManager.unmute(),
    toggle: () => audioManager.toggle()
  };
};
