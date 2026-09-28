/**
 * AETHER-9 Spatial Audio Engine
 * Web Audio API with 432Hz harmonic tuning, binaural resonance, and 3D Doppler effects.
 */

class SpatialAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;

  // Sound nodes
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private subGain: GainNode | null = null;
  
  private panner: PannerNode | null = null;
  private currentFreq: number = 432;
  private wingFlapGain: GainNode | null = null;

  public init() {
    if (this.isInitialized) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

      // 3D Panner
      this.panner = this.ctx.createPanner();
      this.panner.panningModel = 'HRTF';
      this.panner.distanceModel = 'inverse';
      this.panner.refDistance = 1;
      this.panner.maxDistance = 10000;
      this.panner.rolloffFactor = 1;

      this.panner.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      // Initialize 432Hz Drone
      this.setupDroneOscillators();
      this.isInitialized = true;
    } catch (e) {
      console.warn("AudioContext init error:", e);
    }
  }

  private setupDroneOscillators() {
    if (!this.ctx || !this.panner) return;

    const now = this.ctx.currentTime;

    // Drone Oscillator 1 (Base harmonic)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(432, now);

    // Drone Oscillator 2 (Binaural offset + 3.5Hz theta frequency)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(435.5, now);

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.12, now);

    // Sub Bass Thrum
    this.subOsc = this.ctx.createOscillator();
    this.subOsc.type = 'sine';
    this.subOsc.frequency.setValueAtTime(54, now); // 432 / 8

    this.subGain = this.ctx.createGain();
    this.subGain.gain.setValueAtTime(0.2, now);

    // Connections
    this.droneOsc1.connect(this.droneGain);
    this.droneOsc2.connect(this.droneGain);
    this.droneGain.connect(this.panner);

    this.subOsc.connect(this.subGain);
    this.subGain.connect(this.panner);

    this.droneOsc1.start();
    this.droneOsc2.start();
    this.subOsc.start();
  }

  public updateDimension(dimensionNumber: number, targetFreq: number) {
    if (!this.ctx || !this.droneOsc1 || !this.droneOsc2 || !this.subOsc) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    this.currentFreq = targetFreq;

    // Smooth frequency glide over 0.8s
    this.droneOsc1.frequency.exponentialRampToValueAtTime(targetFreq, now + 0.8);
    // Maintain +3.5Hz theta binaural gap
    this.droneOsc2.frequency.exponentialRampToValueAtTime(targetFreq + 3.5, now + 0.8);
    // Sub bass 1/8th octave
    this.subOsc.frequency.exponentialRampToValueAtTime(targetFreq / 8, now + 0.8);

    // Trigger dimensional shift chime burst
    this.playDimensionalShiftBurst(targetFreq);
  }

  public updateFlightAudio(speedKnots: number, rollDegrees: number, pitchDegrees: number) {
    if (!this.ctx || !this.panner) return;

    const now = this.ctx.currentTime;
    
    // Doppler effect on frequency based on flight velocity
    const speedFactor = 1 + (speedKnots / 1000) * 0.15;
    if (this.droneOsc1 && this.droneOsc2) {
      this.droneOsc1.frequency.setTargetAtTime(this.currentFreq * speedFactor, now, 0.1);
      this.droneOsc2.frequency.setTargetAtTime((this.currentFreq + 3.5) * speedFactor, now, 0.1);
    }

    // 3D spatial position tracking based on pitch and roll
    const xPos = Math.sin((rollDegrees * Math.PI) / 180) * 5;
    const yPos = Math.sin((pitchDegrees * Math.PI) / 180) * 5;
    const zPos = -Math.cos((rollDegrees * Math.PI) / 180) * 5;

    this.panner.positionX.setTargetAtTime(xPos, now, 0.1);
    this.panner.positionY.setTargetAtTime(yPos, now, 0.1);
    this.panner.positionZ.setTargetAtTime(zPos, now, 0.1);
  }

  public triggerWingFlap() {
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      // Low frequency air displacement sweep
      const flapOsc = this.ctx.createOscillator();
      const flapGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      flapOsc.type = 'sawtooth';
      flapOsc.frequency.setValueAtTime(60, now);
      flapOsc.frequency.exponentialRampToValueAtTime(20, now + 0.4);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, now);

      flapGain.gain.setValueAtTime(0.4, now);
      flapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      flapOsc.connect(filter);
      filter.connect(flapGain);
      flapGain.connect(this.masterGain);

      flapOsc.start(now);
      flapOsc.stop(now + 0.45);
    } catch {
      // Audio trigger fail safe
    }
  }

  public playDimensionalShiftBurst(freq: number) {
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      
      // High cosmic chime synthesizer
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();

      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(freq * 2, now);
      chimeOsc.frequency.exponentialRampToValueAtTime(freq * 4, now + 0.6);

      chimeGain.gain.setValueAtTime(0.25, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.masterGain);

      chimeOsc.start(now);
      chimeOsc.stop(now + 1.0);
    } catch {
      // Audio trigger fail safe
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.3, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const spatialAudio = new SpatialAudioEngine();
