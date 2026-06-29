"use client";

import { useEffect, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Section curved transition divider (Parents to ScratchDate)
const SectionDivider = () => {
  return (
    <div className="absolute left-0 right-0 w-full h-10 pointer-events-none z-10 text-[#2D040F] top-0">
      <svg className="w-full h-full fill-current" viewBox="0 0 1000 100" preserveAspectRatio="none">
        {/* Transparent curve overlay, showing previous section background */}
        <path d="M 0 0 C 300 100 700 100 1000 0 L 1000 100 L 0 100 Z" />
      </svg>
    </div>
  );
};

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
    setIsScratching(true);
    const coords = getCoordinates(e);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, 36, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const scratch = (e) => {
    if (!isScratching) return;
    const coords = getCoordinates(e);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, 36, 0, Math.PI * 2);
        ctx.fill();
        checkRevealPercentage(canvas);
      }
    }
  };

  const stopScratching = () => {
    setIsScratching(false);
  };

  const checkRevealPercentage = (canvas) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparentPixels = 0;
      for (let i = 3; i < imgData.data.length; i += 4) {
        if (imgData.data[i] === 0) {
          transparentPixels++;
        }
      }
      const percentage = (transparentPixels / (canvas.width * canvas.height)) * 100;
      if (percentage >= 35 && !isRevealed) {
        setIsRevealed(true);
        onReveal(index);
      }
    } catch (err) {
      console.warn("Canvas security error checking percentage:", err);
    }
  };

  return (
    <div className="flex flex-col items-center flex-1 max-w-[90px] md:max-w-[110px]">
      <div 
        ref={containerRef}
        className="w-full h-24 md:h-28 rounded-xl bg-gradient-to-br from-[#FFFDF9] via-[#FFFBF5] to-[#FFF9F0] border-[1.5px] border-[#D4AF37]/50 shadow-[0_8px_20px_rgba(0,0,0,0.3)] shadow-[inset_0_0_12px_rgba(212,175,55,0.06)] relative flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #4A081B 1px, transparent 1px), radial-gradient(circle at 0 0, #4A081B 1px, transparent 1px)", backgroundSize: "12px 12px, 6px 6px" }} />
        
        {/* Hidden value display */}
        <div className="flex flex-col items-center z-10">
          <span className="font-cormorant text-2xl md:text-3xl font-semibold tracking-wider text-[#4A081B] drop-shadow-[0_0.5px_1px_rgba(255,255,255,0.7)] select-all">
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
      <span className="font-cormorant text-[10px] md:text-xs uppercase tracking-widest text-[#FFF8ED]/75 font-semibold mt-2.5">
        {label}
      </span>
    </div>
  );
}

function ScratchDate() {
  const [revealedCards, setRevealedCards] = useState([false, false, false]);
  const [celebrationParticles, setCelebrationParticles] = useState([]);
  const [bgStars, setBgStars] = useState([]);

  const allRevealed = revealedCards.every((v) => v);

  useEffect(() => {
    // Generate background gold stars/dust
    const generated = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 95}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 7 + 7,
    }));
    setBgStars(generated);
  }, []);

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
    playPopperSound();

    // Spawn popper particles
    const particlesList = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      type: Math.random() > 0.52 ? "petal" : "gold",
      x: Math.random() * 40 - 20, 
      y: 80, 
      scale: Math.random() * 0.7 + 0.35,
      rotation: Math.random() * 360,
      spin: Math.random() * 240 - 120,
      driftX: Math.random() * 240 - 120, 
      driftY: - (Math.random() * 180 + 130), 
      gravity: Math.random() * 110 + 70, 
      duration: Math.random() * 0.5 + 1.8, 
    }));
    setCelebrationParticles(particlesList);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#2D040F] via-[#4A081B] to-[#2D040F] relative flex flex-col items-center justify-center overflow-hidden">
      
      {/* Top curved section transition divider */}
      <SectionDivider />

      {/* Paper grain luxury texture overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #FFF8ED 1px, transparent 1px), radial-gradient(circle at 0 0, #FFF8ED 1px, transparent 1px)", backgroundSize: "16px 16px, 8px 8px" }} />

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
                  opacity: [1, 1, 0], 
                  rotate: p.rotation + p.spin
                }}
                transition={{
                  duration: p.duration,
                  ease: "easeOut"
                }}
                className="absolute"
              >
                {p.type === "petal" ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M 12 2 C 7 2 4 6 4 11 C 4 17 8 22 12 22 C 16 22 20 17 20 11 C 20 6 17 2 12 2 Z" 
                      fill="url(#confetti-petal-date)" 
                    />
                    <defs>
                      <radialGradient id="confetti-petal-date" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#8F1C3C" />
                        <stop offset="70%" stopColor="#6D0F2A" />
                        <stop offset="100%" stopColor="#4A081B" />
                      </radialGradient>
                    </defs>
                  </svg>
                ) : (
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

      {/* Floating gold background stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {bgStars.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "110%", opacity: 0 }}
            animate={{
              y: "-10%",
              opacity: [0, 0.6, 0.6, 0],
              x: ["0px", `${Math.random() * 40 - 20}px`],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
            className="absolute rounded-full bg-[#E8C76A] shadow-[0_0_5px_rgba(212,175,55,0.5)]"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* Soft background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center mb-12 max-w-sm relative z-10">
        <span className="font-cormorant text-xs md:text-sm uppercase tracking-[0.3em] text-[#E8C76A] font-semibold">
          The Sacred Date
        </span>
        <h2 className="font-cormorant text-3xl md:text-4xl text-[#FFF8ED] mt-2 tracking-wide font-light">
          Blessed Union
        </h2>
        <div className="w-12 h-[1px] bg-[#D4AF37]/60 mx-auto mt-4" />
      </div>

      {/* 3 Split Cards Horizontal Layout */}
      <div className="flex gap-4 md:gap-6 justify-center w-full max-w-[340px] md:max-w-[400px] relative z-10">
        <ScratchCard value="09" label="Day" onReveal={handleCardReveal} index={0} />
        <ScratchCard value="12" label="Month" onReveal={handleCardReveal} index={1} />
        <ScratchCard value="2026" label="Year" onReveal={handleCardReveal} index={2} />
      </div>

      {/* Progress Helper Indicator */}
      <div className="mt-8 h-5 flex items-center justify-center text-center relative z-10">
        {!allRevealed ? (
          <p className="font-inter text-[10px] tracking-widest text-[#FFF8ED]/70 uppercase">
            Scratch all cards to reveal union date
          </p>
        ) : (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-cormorant text-sm text-[#E8C76A] italic font-semibold tracking-wider"
          >
            Looking forward to welcoming you on Wednesday!
          </motion.p>
        )}
      </div>
    </section>
  );
}

export default memo(ScratchDate);
