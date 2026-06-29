"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Web Audio API Synthesizer for high-fidelity luxury party popper sound
const playPopperSound = () => {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // 1. Noise burst for the "Pop/Blast"
    const bufferSize = ctx.sampleRate * 0.35; // 0.35s duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(900, ctx.currentTime);
    noiseFilter.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.28);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.12, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start();
    noiseSource.stop(ctx.currentTime + 0.35);

    // 2. High-frequency chime ring for "Metallic Sparkles"
    const chime = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    
    chime.type = "sine";
    chime.frequency.setValueAtTime(1350, ctx.currentTime);
    chime.frequency.exponentialRampToValueAtTime(550, ctx.currentTime + 0.25);

    chimeGain.gain.setValueAtTime(0.04, ctx.currentTime);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    chime.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    chime.start();
    chime.stop(ctx.currentTime + 0.26);

  } catch (err) {
    console.warn("Popper audio synthesis failed:", err);
  }
};

// Luxury Scratch Card Sub-component
function ScratchCard({ value, label, onReveal, index }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      // Subtract border padding
      canvas.width = container.clientWidth - 8;
      canvas.height = container.clientHeight - 8;
      drawFoil(canvas);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const drawFoil = (canvas) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Premium gold gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#9A7D42");
    grad.addColorStop(0.2, "#D4AF37");
    grad.addColorStop(0.4, "#FFF8ED");
    grad.addColorStop(0.5, "#E8C76A");
    grad.addColorStop(0.7, "#D4AF37");
    grad.addColorStop(0.85, "#FFF8ED");
    grad.addColorStop(1, "#9A7D42");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Fine metallic noise speckles
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    for (let i = 0; i < 180; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 1.5;
      ctx.fillRect(x, y, size, size);
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 1.2;
      ctx.fillRect(x, y, size, size);
    }

    // Border inner line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

    // Calligraphy-style Text "SCRATCH"
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(74, 8, 27, 0.9)";
    ctx.font = "bold 10px 'Cinzel', 'Cormorant Garamond', serif";
    ctx.letterSpacing = "2px";
    ctx.fillText("SCRATCH", canvas.width / 2, canvas.height / 2);
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startScratching = (e) => {
    if (isRevealed) return;
    setIsScratching(true);
    scratch(e);
  };

  const scratch = (e) => {
    if (!isScratching || isRevealed) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 36, 0, Math.PI * 2); // Significantly increased brush radius
    ctx.fill();

    checkPercentage();
  };

  const stopScratching = () => {
    setIsScratching(false);
  };

  const checkPercentage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }

    const percent = Math.round((transparent / (pixels.length / 4)) * 100);

    // Reduced threshold to 35% so it triggers instantly with 1-2 strokes
    if (percent >= 35 && !isRevealed) {
      revealCard();
    }
  };

  const revealCard = () => {
    setIsRevealed(true);
    setIsScratching(false);
    onReveal(index);
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-[95px] md:max-w-[110px]">
      <div
        ref={containerRef}
        className="w-full h-24 md:h-28 rounded-xl relative shadow-[0_8px_20px_rgba(75,58,50,0.15)] bg-gradient-to-br from-[#4A081B] to-[#20030B] overflow-hidden select-none border border-brand-gold/45 p-[4px] luxury-hover-lift"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Inner gold frame contours */}
        <div className="absolute inset-[3px] border border-[#D4AF37]/35 rounded-lg pointer-events-none z-20" />
        <div className="absolute inset-[5px] border border-dashed border-[#D4AF37]/15 rounded-lg pointer-events-none z-20" />

        {/* Hidden Content (Revealed Burgundy Inner Card) */}
        <div className="absolute inset-[4px] flex flex-col items-center justify-center bg-gradient-to-br from-[#5C0C22] via-[#4A081B] to-[#20030B] rounded-lg">
          {/* Subtle gold glow under scratch layer */}
          <div className="absolute w-8 h-8 rounded-full bg-brand-gold/15 blur-md" />
          
          <span className="font-cormorant text-2xl md:text-3xl font-semibold tracking-wider text-[#E8C76A] drop-shadow-[0_0_8px_rgba(232,199,106,0.65)] select-all z-10">
            {value}
          </span>
        </div>

        {/* Scratch Canvas Card */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.canvas
              ref={canvasRef}
              exit={{ 
                opacity: 0, 
                scale: 0.94, 
                filter: "blur(6px)",
                transition: { duration: 0.5, ease: "easeOut" } 
              }}
              onMouseDown={startScratching}
              onMouseMove={scratch}
              onMouseUp={stopScratching}
              onMouseLeave={stopScratching}
              onTouchStart={startScratching}
              onTouchMove={scratch}
              onTouchEnd={stopScratching}
              className="absolute inset-[4px] rounded-lg z-30 cursor-pointer touch-none"
            />
          )}
        </AnimatePresence>
      </div>
      <span className="font-cormorant text-[10px] md:text-xs uppercase tracking-widest text-[#6D0F2A]/70 font-semibold mt-1">
        {label}
      </span>
    </div>
  );
}

export default function ScratchDate() {
  const [revealedCards, setRevealedCards] = useState([false, false, false]);
  const [celebrationParticles, setCelebrationParticles] = useState([]);

  const allRevealed = revealedCards.every((v) => v);

  const handleCardReveal = (index) => {
    setRevealedCards((prev) => {
      const next = [...prev];
      next[index] = true;
      if (next.every((v) => v)) {
        triggerCelebration();
      }
      return next;
    });
  };

  const triggerCelebration = () => {
    // Play physical audio synthesis popper sound
    playPopperSound();

    // Spawn 28 luxury popper particles max (mix of gold stars and rose petals)
    const particlesList = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      type: Math.random() > 0.52 ? "petal" : "gold",
      x: Math.random() * 40 - 20, // offset near center
      y: 80, // offset slightly below middle
      scale: Math.random() * 0.7 + 0.35,
      rotation: Math.random() * 360,
      spin: Math.random() * 240 - 120,
      driftX: Math.random() * 240 - 120, // horizontal drift
      driftY: - (Math.random() * 180 + 130), // elegant upward thrust
      gravity: Math.random() * 110 + 70, // gravity fall multiplier
      duration: Math.random() * 0.5 + 1.8, // all fade out within 1.8 to 2.3s
    }));
    setCelebrationParticles(particlesList);
  };

  return (
    <section className="py-24 px-6 bg-[#F6F0E8] relative flex flex-col items-center justify-center overflow-hidden">
      
      {/* Dynamic Celebration Particles (Classy rose petals & gold sparks) */}
      <AnimatePresence>
        {celebrationParticles.length > 0 && (
          <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
            {celebrationParticles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ 
                  x: p.x, 
                  y: p.y, 
                  scale: 0.1, 
                  opacity: 1, 
                  rotate: p.rotation 
                }}
                animate={{
                  x: p.x + p.driftX,
                  y: [p.y + p.driftY, p.y + p.driftY + p.gravity],
                  scale: p.scale,
                  opacity: [1, 1, 0], // smooth fade out
                  rotate: p.rotation + p.spin
                }}
                transition={{
                  duration: p.duration,
                  ease: "easeOut"
                }}
                className="absolute"
              >
                {p.type === "petal" ? (
                  // Crimson Burgundy Rose Petal
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M 12 2 C 7 2 4 6 4 11 C 4 17 8 22 12 22 C 16 22 20 17 20 11 C 20 6 17 2 12 2 Z" 
                      fill="url(#confetti-petal)" 
                    />
                    <defs>
                      <radialGradient id="confetti-petal" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#8F1C3C" />
                        <stop offset="70%" stopColor="#6D0F2A" />
                        <stop offset="100%" stopColor="#4A081B" />
                      </radialGradient>
                    </defs>
                  </svg>
                ) : (
                  // Gold Shimmer Spark
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path 
                      d="M 6 0 L 7.5 4.5 L 12 6 L 7.5 7.5 L 6 12 L 4.5 7.5 L 0 6 L 4.5 4.5 Z" 
                      fill="#E8C76A" 
                      className="drop-shadow-[0_0_4px_#D4AF37]"
                    />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Soft background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center mb-12 max-w-sm">
        <span className="font-cormorant text-xs md:text-sm uppercase tracking-[0.3em] text-brand-gold font-semibold">
          The Sacred Date
        </span>
        <h2 className="font-cormorant text-3xl md:text-4xl text-brand-heading mt-2 tracking-wide font-light">
          Blessed Union
        </h2>
        <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4" />
      </div>

      {/* 3 Split Cards Horizontal Layout */}
      <div className="flex gap-4 md:gap-6 justify-center w-full max-w-[340px] md:max-w-[400px]">
        <ScratchCard value="09" label="Day" onReveal={handleCardReveal} index={0} />
        <ScratchCard value="12" label="Month" onReveal={handleCardReveal} index={1} />
        <ScratchCard value="2026" label="Year" onReveal={handleCardReveal} index={2} />
      </div>

      {/* Progress Helper Indicator */}
      <div className="mt-8 h-5 flex items-center justify-center text-center">
        {!allRevealed ? (
          <p className="font-inter text-[10px] tracking-widest text-[#6D0F2A]/75 uppercase">
            Scratch all cards to reveal union date
          </p>
        ) : (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-cormorant text-sm text-brand-gold italic font-semibold tracking-wider"
          >
            Looking forward to welcoming you on Wednesday!
          </motion.p>
        )}
      </div>
    </section>
  );
}
