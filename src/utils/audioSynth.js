"use client";

// Web Audio API Synthesizer Engine
// Provides high-end, zero-latency cinematic sound effects generated programmatically.
// Fully SSR-safe and optimized for mobile browsers.

let audioCtx = null;
let ambientSource = null;
let ambientGain = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  // Resume if suspended by browser autoplay policy
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Helper to generate a white noise buffer
function createNoiseBuffer(ctx, duration) {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

// 1. Loopable Low-Frequency Palace Ambience / Wind Hum
export function startAmbience() {
  const ctx = getAudioContext();
  if (!ctx) return null;

  try {
    if (ambientSource) return { stop: stopAmbience };

    // Create noise source
    const duration = 4.0;
    const noiseBuffer = createNoiseBuffer(ctx, duration);
    ambientSource = ctx.createBufferSource();
    ambientSource.buffer = noiseBuffer;
    ambientSource.loop = true;

    // Filter to create a soft, deep rumble (low hum)
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(140, ctx.currentTime);

    // Dynamic slow sweep for wind variation
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.08; // extremely slow LFO (8s loop)
    lfoGain.gain.value = 40; // modulate frequency by +/-40Hz

    lfo.connect(lfoGain);
    lfoGain.connect(lowpass.frequency);
    lfo.start();

    // Volume gain node
    ambientGain = ctx.createGain();
    ambientGain.gain.setValueAtTime(0, ctx.currentTime);
    // Fade in ambience slowly
    ambientGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 3.0);

    ambientSource.connect(lowpass);
    lowpass.connect(ambientGain);
    ambientGain.connect(ctx.destination);

    ambientSource.start(0);

    return { stop: stopAmbience };
  } catch (err) {
    console.warn("Palace ambience synthesis failed:", err);
    return null;
  }
}

export function stopAmbience() {
  if (ambientGain && audioCtx) {
    try {
      ambientGain.gain.cancelScheduledValues(audioCtx.currentTime);
      ambientGain.gain.setValueAtTime(ambientGain.gain.value, audioCtx.currentTime);
      // Fade out slowly
      ambientGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.5);
      
      const sourceToStop = ambientSource;
      setTimeout(() => {
        try {
          sourceToStop.stop();
        } catch(e){}
      }, 2600);
      
      ambientSource = null;
      ambientGain = null;
    } catch (e) {}
  }
}

// 2. Heavy Hinge Squeak (wood friction tension groans)
export function playHingeCreak() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const time = ctx.currentTime;
    
    // Low frequency wood vibration oscillator
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(65, time);
    
    // Frequency modulation (groan stutter)
    const fm = ctx.createOscillator();
    const fmGain = ctx.createGain();
    fm.type = "square";
    fm.frequency.value = 16; // rapid friction stutter
    fmGain.gain.value = 18; // stutter range in Hz
    
    fm.connect(fmGain);
    fmGain.connect(osc.frequency);
    
    // Lowpass filter to make it sound muffled inside wood
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(180, time);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, time);
    // Slow swell and jittery decay
    gain.gain.linearRampToValueAtTime(0.035, time + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 2.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    fm.start(time);
    osc.start(time);
    
    fm.stop(time + 2.3);
    osc.stop(time + 2.3);
  } catch (err) {
    console.warn("Hinge creak synthesis failed:", err);
  }
}

// 3. Medallion Tap (0-300ms Strike)
export function playMetallicTap() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const time = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(900, time);
    osc.frequency.exponentialRampToValueAtTime(200, time + 0.12);

    gain.gain.setValueAtTime(0.07, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.13);
  } catch (e) {}
}

// 4. Medallion Lock Unlock Click (300-900ms)
export function playLockClick() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const time = ctx.currentTime;

    const playClickPulse = (startTime, freq, vol) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);
      osc.frequency.exponentialRampToValueAtTime(80, startTime + 0.04);

      gain.gain.setValueAtTime(vol, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.05);
    };

    // Mechanical double click
    playClickPulse(time, 1350, 0.05);
    playClickPulse(time + 0.07, 1050, 0.03);
  } catch (e) {}
}

// 5. Camera Dolly Whoosh
export function playWhoosh() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const time = ctx.currentTime;
    const duration = 1.6;
    const noiseBuffer = createNoiseBuffer(ctx, duration);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // Bandpass filter to create air whoosh sound
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    // Sweep filter frequency up and down
    filter.frequency.setValueAtTime(150, time);
    filter.frequency.exponentialRampToValueAtTime(1200, time + 0.7);
    filter.frequency.exponentialRampToValueAtTime(100, time + 1.6);
    filter.Q.setValueAtTime(1.5, time);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.065, time + 0.65);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 1.6);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noiseSource.start(time);
    noiseSource.stop(time + 1.6);
  } catch (err) {
    console.warn("Whoosh synthesis failed:", err);
  }
}

// 6. Luxury Spiritual Chime (Consonant cluster ring)
export function playChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const time = ctx.currentTime;
    
    // Set of consonant golden harmonic frequencies (root, fifth, octave, major third)
    const frequencies = [440, 660, 880, 1100, 1320];
    
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, time + idx * 0.08); // arpeggiate slightly

      // Add a slight vibrato to chime decay
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.frequency.value = 5.5; // 5.5Hz vibrato
      vibratoGain.gain.value = 4;
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);
      vibrato.start(time);

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.018, time + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + idx * 0.08 + 2.8); // long decay

      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(time + idx * 0.08);
      osc.stop(time + idx * 0.08 + 3.0);
      vibrato.stop(time + idx * 0.08 + 3.0);
    });
  } catch (err) {
    console.warn("Chime synthesis failed:", err);
  }
}
