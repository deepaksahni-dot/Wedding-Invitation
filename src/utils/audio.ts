/**
 * Web Audio API based ambient royal melodic soundtrack
 * Creates an elegant, romantic arpeggiated harp & warm pad progression
 * without depending on external MP3 hosting or network latency.
 */

class RoyalMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;

  private notes = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99, // G5
  ];

  private sequence = [
    0, 2, 4, 3, 5, 4, 2, 1,
    0, 3, 4, 6, 7, 5, 4, 2,
    1, 3, 5, 4, 6, 5, 3, 2,
    0, 4, 5, 7, 8, 6, 4, 2,
  ];
  private step = 0;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step = 0;
    this.scheduleNextNote();
  }

  public pause() {
    this.isPlaying = false;
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

    // Warm harp-like chime
    osc.type = isBass ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Warm filter roll-off for organic feel
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
      this.init();
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
      // AudioContext might be blocked until user interaction
    }
  }

  public playGlowBurst() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Celestial rising harp-like shimmer
      const chord = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
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
      // AudioContext might be blocked
    }
  }

  private scheduleNextNote = () => {
    if (!this.isPlaying) return;

    const noteIdx = this.sequence[this.step % this.sequence.length];
    const freq = this.notes[noteIdx % this.notes.length];

    // Every 4 beats, play a warm gentle root drone
    if (this.step % 4 === 0) {
      const bassNotes = [130.81, 164.81, 146.83, 130.81]; // C3, E3, D3, C3
      const bassFreq = bassNotes[Math.floor(this.step / 4) % bassNotes.length];
      this.playTone(bassFreq, 1.8, true);
    }

    this.playTone(freq, 1.2, false);
    this.step++;

    const delay = 480; // tempo around 125 bpm eighth notes, tranquil and flowing
    this.timerId = window.setTimeout(this.scheduleNextNote, delay);
  };
}

export const royalMusic = new RoyalMusicEngine();
