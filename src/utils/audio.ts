/**
 * Royal Music Engine playing the song "Ranjha" (Shershaah).
 * Supports HTML5 Audio (/ranjha.mp3) with automatic Web Audio API synthesis fallback.
 */

class RoyalMusicEngine {
  private audioEl: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private useAudioEl: boolean = false;

  // Ranjha melody — D minor pentatonic scale (D4, F4, G4, A4, C5, D5, F5, G5, A5)
  private notes = [
    293.66, // D4
    349.23, // F4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    698.46, // F5
    783.99, // G5
    880.00, // A5
  ];

  // Ranjha chorus melodic sequence
  private sequence = [
    0, 2, 3, 2, 1, 0, 2, 4,
    3, 5, 4, 3, 2, 1, 0, 3,
    2, 4, 5, 4, 3, 2, 1, 0,
    1, 3, 4, 6, 5, 4, 3, 2,
  ];
  private step = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.audioEl = new Audio('/ranjha.mp3');
        this.audioEl.loop = true;
      } catch {
        this.audioEl = null;
      }
    }
  }

  public initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Try HTML5 Audio /ranjha.mp3 first
    if (this.audioEl) {
      this.audioEl.play().then(() => {
        this.useAudioEl = true;
      }).catch(() => {
        // Fallback to Web Audio synthesis
        this.useAudioEl = false;
        this.playSynth();
      });
    } else {
      this.useAudioEl = false;
      this.playSynth();
    }
  }

  private playSynth() {
    this.initCtx();
    this.step = 0;
    this.scheduleNextNote();
  }

  public pause() {
    this.isPlaying = false;
    if (this.audioEl && !this.audioEl.paused) {
      this.audioEl.pause();
    }
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private playTone(freq: number, duration: number, isBass: boolean = false) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = isBass ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isBass ? 400 : 1800, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    const vol = isBass ? 0.25 : 0.22;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(vol, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  public playSealTap() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.09);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      if (this.masterGain) gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // ignore
    }
  }

  public playGlowBurst() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.5];
      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.001, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.06 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.7);
        osc.connect(gain);
        if (this.masterGain) gain.connect(this.masterGain);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.75);
      });
    } catch {
      // ignore
    }
  }

  private scheduleNextNote = () => {
    if (!this.isPlaying || this.useAudioEl) return;

    const noteIdx = this.sequence[this.step % this.sequence.length];
    const freq = this.notes[noteIdx % this.notes.length];

    if (this.step % 4 === 0) {
      const bassNotes = [130.81, 164.81, 146.83, 130.81];
      const bassFreq = bassNotes[Math.floor(this.step / 4) % bassNotes.length];
      this.playTone(bassFreq, 1.8, true);
    }

    this.playTone(freq, 1.2, false);
    this.step++;

    const delay = 480;
    this.timerId = window.setTimeout(this.scheduleNextNote, delay);
  };
}

export const royalMusic = new RoyalMusicEngine();
