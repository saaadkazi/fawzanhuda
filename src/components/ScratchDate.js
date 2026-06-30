"use client";

import { useEffect, useRef, useState, memo } from "react";
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

    // 2. High-frequency chime ring for "Chime Accent"
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
    console.warn("Audio synthesis failed:", err);
  }
};

// Luxury Frosted Pearl Ceremonial Medallion Sub-component
function CeremonialMedallion({ value, label, onReveal, index }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const lastCoordsRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [dragParticles, setDragParticles] = useState([]);

  // Glass dust & gold spark updates using requestAnimationFrame
  useEffect(() => {
    if (dragParticles.length === 0) return;
    let frameId;
    const update = () => {
      setDragParticles((prev) => {
        if (prev.length === 0) return [];
        return prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + p.gravity,
            opacity: p.opacity - p.fadeSpeed,
            scale: Math.max(0, p.scale - 0.005),
          }))
          .filter((p) => p.opacity > 0 && p.scale > 0);
      });
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [dragParticles.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      canvas.width = container.clientWidth - 8;
      canvas.height = container.clientHeight - 8;
      drawMedallionFoil(canvas);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const drawMedallionFoil = (canvas) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = Math.min(canvas.width, canvas.height) / 2;

    // 1. Brushed Champagne Gold/Satin Beige gradient (rich and darker than outer rim)
    const foilGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, r);
    foilGrad.addColorStop(0, "#D5C09B"); // Brushed champagne center
    foilGrad.addColorStop(0.35, "#C0AD54"); // Satin gold mid
    foilGrad.addColorStop(0.72, "#A89467"); // Muted metallic beige
    foilGrad.addColorStop(1, "#836C3D"); // Darker gold/bronze outer edge

    ctx.fillStyle = foilGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // 2. Fine diagonal brushed metal lines for physical foil feel
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 0.5;
    for (let i = -r; i < r; i += 3) {
      ctx.beginPath();
      ctx.moveTo(cx + i, cy - r);
      ctx.lineTo(cx + i + r, cy + r);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Stamped micro-glass dust & metallic texture noise
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    for (let i = 0; i < 150; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * r;
      const x = cx + Math.cos(angle) * dist;
      const y = cy + Math.sin(angle) * dist;
      const size = Math.random() * 1.5;
      ctx.fillRect(x, y, size, size);
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * r;
      const x = cx + Math.cos(angle) * dist;
      const y = cy + Math.sin(angle) * dist;
      const size = Math.random() * 1.2;
      ctx.fillRect(x, y, size, size);
    }

    // 4. Bright reflective gold highlights at the outer edge for high border contrast
    ctx.strokeStyle = "rgba(255, 248, 237, 0.65)";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 1.2, 0, Math.PI * 2);
    ctx.stroke();

    // 5. Delicate Islamic geometric emboss pattern (Rub el Hizb 8-pointed star)
    const drawIslamicPattern = () => {
      ctx.save();
      const points = 8;
      const outerR = r - 14;
      const innerR = outerR * 0.72;

      const drawPath = (ox, oy) => {
        ctx.beginPath();
        for (let i = 0; i < points * 2; i++) {
          const angle = (i * Math.PI) / points - Math.PI / 16;
          const dist = i % 2 === 0 ? outerR : innerR;
          const x = cx + Math.cos(angle) * dist + ox;
          const y = cy + Math.sin(angle) * dist + oy;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        // Inner geometric lattice circles
        ctx.beginPath();
        ctx.arc(cx + ox, cy + oy, outerR * 0.5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx + ox, cy + oy, outerR * 0.3, 0, Math.PI * 2);
        ctx.stroke();
      };

      // Stamped emboss shadow
      ctx.strokeStyle = "rgba(45, 30, 10, 0.28)";
      ctx.lineWidth = 0.8;
      drawPath(0.6, 0.6);

      // Stamped emboss highlight
      ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      ctx.lineWidth = 0.8;
      drawPath(-0.6, -0.6);

      ctx.restore();
    };
    drawIslamicPattern();

    // 6. Stamped "SCRATCH TO REVEAL" high-contrast double-line typography
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 9px 'Cinzel', serif";
    ctx.letterSpacing = "1.5px";

    // Embossed shadow offsets
    ctx.fillStyle = "rgba(45, 30, 10, 0.55)";
    ctx.fillText("SCRATCH", cx + 0.6, cy - 4.5);
    ctx.fillText("TO REVEAL", cx + 0.6, cy + 5.5);

    // Embossed highlight offsets
    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    ctx.fillText("SCRATCH", cx - 0.5, cy - 5.5);
    ctx.fillText("TO REVEAL", cx - 0.5, cy + 4.5);

    // Main typography fill (deep burgundy for maximum legibility and contrast)
    ctx.fillStyle = "rgba(74, 8, 27, 0.88)";
    ctx.fillText("SCRATCH", cx, cy - 5);
    ctx.fillText("TO REVEAL", cx, cy + 5);
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

  // Spawns glass dust (white shards) and golden sparkles (glowing points)
  const spawnDissolvingParticles = (x, y) => {
    const glassCount = 2;
    const goldCount = 2;

    const newParticles = [];

    // Glass Shard Dust
    for (let i = 0; i < glassCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 1.5;
      newParticles.push({
        id: Math.random(),
        type: "glass",
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.4,
        gravity: 0.05,
        fadeSpeed: 0.03,
        scale: Math.random() * 0.5 + 0.2,
        opacity: 0.9,
        color: "rgba(255, 255, 255, 0.85)",
      });
    }

    // Gold Sparkles
    for (let i = 0; i < goldCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.0 + Math.random() * 1.8;
      newParticles.push({
        id: Math.random(),
        type: "gold",
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.6,
        gravity: 0.07,
        fadeSpeed: 0.04,
        scale: Math.random() * 0.4 + 0.15,
        opacity: 1.0,
        color: Math.random() > 0.5 ? "#FFF9E6" : "#E8C76A",
      });
    }

    setDragParticles((prev) => {
      const active = prev.filter((p) => p.opacity > 0.1);
      return [...active, ...newParticles];
    });
  };

  const startScratching = (e) => {
    setIsScratching(true);
    const coords = getCoordinates(e);
    lastCoordsRef.current = coords;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, 22, 0, Math.PI * 2); // 44px brush
        ctx.fill();
        spawnDissolvingParticles(coords.x, coords.y);
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
        ctx.lineWidth = 44;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        if (lastCoordsRef.current) {
          ctx.moveTo(lastCoordsRef.current.x, lastCoordsRef.current.y);
        } else {
          ctx.moveTo(coords.x, coords.y);
        }
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();

        spawnDissolvingParticles(coords.x, coords.y);
        checkRevealPercentage(canvas);
      }
      lastCoordsRef.current = coords;
    }
  };

  const stopScratching = () => {
    setIsScratching(false);
    lastCoordsRef.current = null;
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
        triggerLocalBloom();
        onReveal(index);
      }
    } catch (err) {
      console.warn("Canvas security error checking percentage:", err);
    }
  };

  const triggerLocalBloom = () => {
    const newSparkles = Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * Math.PI * 2 + Math.random() * 0.4;
      const distance = 45 + Math.random() * 50;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: Math.random() * 0.75 + 0.35,
        duration: 0.7 + Math.random() * 0.5,
        delay: Math.random() * 0.08,
      };
    });
    setSparkles(newSparkles);
  };

  return (
    <motion.div 
      className="flex flex-col items-center"
      animate={{ y: [0, -5, 0] }}
      whileHover={{ 
        scale: 1.08,
        transition: { duration: 0.25, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        y: {
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.4,
        }
      }}
    >
      <div 
        ref={containerRef}
        className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#FFFDF9] via-[#FFFBF5] to-[#FFF9F0] border-2 border-[#D4AF37] shadow-[0_12px_28px_rgba(0,0,0,0.3),_0_0_12px_rgba(212,175,55,0.12)] hover:shadow-[0_15px_35px_rgba(212,175,55,0.35),_0_0_20px_rgba(212,175,55,0.2)] relative flex items-center justify-center overflow-hidden transition-shadow duration-300"
      >
        {/* Subtle inner shadow for depth */}
        <div className="absolute inset-0 rounded-full pointer-events-none z-10 shadow-[inset_0_2px_8px_rgba(212,175,55,0.05)]" />
        
        {/* Hidden value display with blur-to-sharp animation and gold bloom shadow */}
        <motion.div 
          className="flex flex-col items-center z-10"
          initial={false}
          animate={isRevealed ? {
            filter: ["blur(10px)", "blur(0px)"],
            scale: [0.85, 1.12, 1],
          } : {
            filter: "blur(0px)",
            scale: 1
          }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
        >
          <span 
            className="font-cormorant text-2.5xl md:text-3.5xl font-bold tracking-widest text-[#4A081B] select-all transition-all duration-700"
            style={{
              textShadow: isRevealed 
                ? "0 0 14px rgba(232, 199, 106, 0.9), 0 0 4px rgba(212, 175, 55, 0.45)" 
                : "none"
            }}
          >
            {value}
          </span>
        </motion.div>

        {/* Scratch Canvas (Brushed Gold/Beige Luxury Layer) */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.canvas
              ref={canvasRef}
              exit={{ 
                opacity: 0, 
                scale: 0.92, 
                filter: "blur(10px)",
                transition: { duration: 0.6, ease: "easeOut" } 
              }}
              onMouseDown={startScratching}
              onMouseMove={scratch}
              onMouseUp={stopScratching}
              onMouseLeave={stopScratching}
              onTouchStart={startScratching}
              onTouchMove={scratch}
              onTouchEnd={stopScratching}
              className="absolute inset-[3px] rounded-full z-30 cursor-pointer touch-none"
            />
          )}
        </AnimatePresence>

        {/* Luxury Reflection Sweep Overlay (Brighter for interactive guide) */}
        {!isRevealed && (
          <div className="absolute inset-[3px] rounded-full overflow-hidden pointer-events-none z-35">
            <motion.div
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-30"
              animate={{
                left: ["-150%", "200%"],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatDelay: 3.0,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            />
          </div>
        )}

        {/* Local Sparkles Bloom burst */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <AnimatePresence>
            {sparkles.map((sp) => (
              <motion.div
                key={sp.id}
                initial={{ x: 0, y: 0, scale: 0.1, opacity: 1 }}
                animate={{
                  x: sp.x,
                  y: sp.y,
                  scale: sp.scale,
                  opacity: [1, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: sp.duration,
                  delay: sp.delay,
                  ease: "easeOut",
                }}
                className="absolute"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path 
                    d="M 6 0 L 7.5 4.5 L 12 6 L 7.5 7.5 L 6 12 L 4.5 7.5 L 0 6 L 4.5 4.5 Z" 
                    fill="#FFF8ED" 
                    className="drop-shadow-[0_0_4px_#D4AF37]"
                  />
                </svg>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Scratch Drag Particles Overlay (Dissolving Glass & Gold Dust) */}
        <div className="absolute inset-0 pointer-events-none z-35 overflow-hidden">
          {dragParticles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.x,
                top: p.y,
                width: `${p.scale * (p.type === "glass" ? 12 : 7)}px`,
                height: `${p.scale * (p.type === "glass" ? 12 : 7)}px`,
                backgroundColor: p.color,
                opacity: p.opacity,
                transform: "translate(-50%, -50%) rotate(45deg)",
                boxShadow: p.type === "gold" ? `0 0 6px ${p.color}` : "none",
                borderRadius: p.type === "glass" ? "1px" : "50%",
              }}
            />
          ))}
        </div>
      </div>
      <span className="font-cormorant text-[10px] md:text-xs uppercase tracking-widest text-[#FFF8ED]/75 font-semibold mt-2.5">
        {label}
      </span>
    </motion.div>
  );
}

function ScratchDate() {
  const [revealedCards, setRevealedCards] = useState([false, false, false]);
  const [celebrationParticles, setCelebrationParticles] = useState([]);
  const [bgStars, setBgStars] = useState([]);
  const [shimmerActive, setShimmerActive] = useState(false);

  const allRevealed = revealedCards.every((v) => v);

  useEffect(() => {
    // Generate background gold/champagne slow floating dust
    const generated = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 98}%`,
      size: Math.random() * 2.2 + 1.2,
      delay: Math.random() * 5,
      duration: Math.random() * 9 + 7,
      opacity: Math.random() * 0.35 + 0.15,
    }));
    setBgStars(generated);
  }, []);

  const handleCardReveal = (index) => {
    setRevealedCards((prev) => {
      const next = [...prev];
      next[index] = true;
      if (next.every((v) => v)) {
        setShimmerActive(true);
        triggerCelebration();
      }
      return next;
    });
  };

  const triggerCelebration = () => {
    playPopperSound();

    // Spawn luxury celebration particles (champagne, silver, gold sparks, and white rose petals)
    const particlesList = Array.from({ length: 70 }).map((_, i) => {
      const typeRand = Math.random();
      let type = "champagne";
      if (typeRand < 0.35) type = "petal";
      else if (typeRand < 0.7) type = "gold-star";

      return {
        id: i,
        type,
        x: Math.random() * 60 - 30, // Centered zone
        y: 40,
        scale: Math.random() * 0.75 + 0.4,
        rotation: Math.random() * 360,
        spin: Math.random() * 360 - 180,
        driftX: Math.random() * 400 - 200, 
        driftY: -(Math.random() * 250 + 170), // Pop height
        gravity: Math.random() * 140 + 90, // gravity fall
        duration: Math.random() * 0.8 + 2.3, // lifetime
      };
    });
    setCelebrationParticles(particlesList);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#2D040F] via-[#4A081B] to-[#2D040F] relative flex flex-col items-center justify-center overflow-hidden">
      
      {/* Paper grain luxury texture overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #FFF8ED 1px, transparent 1px), radial-gradient(circle at 0 0, #FFF8ED 1px, transparent 1px)", backgroundSize: "16px 16px, 8px 8px" }} />

      {/* Dynamic Celebration Particles */}
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
                  y: [p.y, p.y + p.driftY, p.y + p.driftY + p.gravity],
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M 12 2 C 7 2 4 6 4 11 C 4 17 8 22 12 22 C 16 22 20 17 20 11 C 20 6 17 2 12 2 Z" 
                      fill="url(#confetti-petal-date)" 
                    />
                    <defs>
                      <radialGradient id="confetti-petal-date" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="60%" stopColor="#FFF2E0" />
                        <stop offset="100%" stopColor="#EADBC8" />
                      </radialGradient>
                    </defs>
                  </svg>
                ) : p.type === "gold-star" ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path 
                      d="M 6 0 L 7.5 4.5 L 12 6 L 7.5 7.5 L 6 12 L 4.5 7.5 L 0 6 L 4.5 4.5 Z" 
                      fill="#FFF9E6" 
                      className="drop-shadow-[0_0_5px_#E8C76A]"
                    />
                  </svg>
                ) : (
                  <div 
                    className="w-3.5 h-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E8C76A] rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
                    style={{
                      transform: `rotate(${Math.random() * 45}deg)`,
                    }}
                  />
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
              opacity: [0, p.opacity, p.opacity, 0],
              x: ["0px", `${Math.random() * 30 - 15}px`],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
            className="absolute rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.4)]"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* Subtle radial spotlight behind medallions */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] md:w-[500px] h-[380px] md:h-[500px] rounded-full pointer-events-none z-0 animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(255, 255, 255, 0) 70%)",
          animationDuration: "5s"
        }}
      />

      {/* Luxury Shimmer Wave Overlay */}
      <AnimatePresence>
        {shimmerActive && (
          <motion.div
            initial={{ left: "-150%", opacity: 0 }}
            animate={{
              left: ["-150%", "200%"],
              opacity: [0, 0.4, 0.4, 0],
            }}
            transition={{
              duration: 2.2,
              ease: "easeInOut",
            }}
            onAnimationComplete={() => setShimmerActive(false)}
            className="absolute top-0 bottom-0 w-[45%] bg-gradient-to-r from-transparent via-[#FFF8ED]/30 to-transparent skew-x-30 pointer-events-none z-45"
          />
        )}
      </AnimatePresence>

      <div className="text-center mb-12 max-w-sm relative z-10">
        <span className="font-inter text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#E8C76A] font-semibold">
          The Sacred Date
        </span>
        <h2 className="font-cormorant text-3xl md:text-4xl text-[#FFF8ED] mt-2 tracking-wide font-light">
          Union Date Reveal
        </h2>
        <div className="w-12 h-[1px] bg-[#D4AF37]/50 mx-auto mt-4" />
      </div>

      {/* 3 Medallions Horizontal Layout */}
      <div className="flex gap-6 md:gap-8 justify-center w-full max-w-[340px] md:max-w-[420px] relative z-10">
        <CeremonialMedallion value="09" label="Day" onReveal={handleCardReveal} index={0} />
        <CeremonialMedallion value="12" label="Month" onReveal={handleCardReveal} index={1} />
        <CeremonialMedallion value="2026" label="Year" onReveal={handleCardReveal} index={2} />
      </div>

      {/* Progress Helper Indicator */}
      <div className="mt-10 h-5 flex items-center justify-center text-center relative z-10">
        {!allRevealed ? (
          <p className="font-inter text-[9px] tracking-[0.25em] text-[#FFF8ED]/70 uppercase">
            Scratch the luxury medallions to reveal union date
          </p>
        ) : (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-cormorant text-sm text-[#E8C76A] italic font-semibold tracking-wider"
          >
            We look forward to welcoming you on Wednesday!
          </motion.p>
        )}
      </div>
    </section>
  );
}

export default memo(ScratchDate);
