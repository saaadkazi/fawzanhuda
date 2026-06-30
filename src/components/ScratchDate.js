"use client";

import { useEffect, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Web Audio API Synthesizer for high-fidelity luxury chime sound
const playChimeSound = () => {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const playTone = (freq, time, vol) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(vol, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 2.0); // Slow decay

      // High pass filter for crystal clarity
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 800;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 2.2);
    };

    // Arpeggiated sequence of celestial chime frequencies
    const now = ctx.currentTime;
    playTone(523.25, now, 0.08);        // C5
    playTone(659.25, now + 0.1, 0.08);  // E5
    playTone(783.99, now + 0.2, 0.08);  // G5
    playTone(1046.50, now + 0.3, 0.08); // C6
    playTone(1318.51, now + 0.4, 0.08); // E6

  } catch (err) {
    console.warn("Audio synthesis failed:", err);
  }
};

// Luxury Ceremonial Medallion Sub-component (Brushed Gold Casing & Burgundy Enamel Foil)
function CeremonialMedallion({ value, label, onReveal, index, isAllRevealed }) {
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
      // Get padding-adjusted dimensions for rectangular shape
      canvas.width = container.clientWidth - 10;
      canvas.height = container.clientHeight - 10;
      drawMedallionFoil(canvas);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const drawMedallionFoil = (canvas) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // 1. Deep Burgundy Enamel base background gradient
    const foilGrad = ctx.createLinearGradient(0, 0, w, h);
    foilGrad.addColorStop(0, "#5E001F"); // Deep burgundy center
    foilGrad.addColorStop(0.7, "#3B0013"); // Rich wine midtone
    foilGrad.addColorStop(1, "#1A0008"); // Dark wine border

    ctx.fillStyle = foilGrad;
    ctx.beginPath();
    // Draw rounded rect path for foil canvas
    const r = 8; // rounded corner radius
    ctx.moveTo(r, 0);
    ctx.lineTo(w - r, 0);
    ctx.quadraticCurveTo(w, 0, w, r);
    ctx.lineTo(w, h - r);
    ctx.quadraticCurveTo(w, h, w - r, h);
    ctx.lineTo(r, h);
    ctx.quadraticCurveTo(0, h, 0, h - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fill();

    // 2. Micro-grain enamel reflections
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const size = Math.random() * 1.2;
      ctx.fillRect(x, y, size, size);
    }

    // 3. Bright inner reflection gold highlight border
    ctx.strokeStyle = "rgba(243, 218, 144, 0.35)";
    ctx.lineWidth = 1.2;
    ctx.strokeRect(3, 3, w - 6, h - 6);

    // 4. Stamped Embossed Arabesque/Islamic Star Pattern (Rub el Hizb 8-pointed star)
    const drawIslamicPattern = () => {
      ctx.save();
      const cx = w / 2;
      const cy = h / 2;
      const points = 8;
      const outerR = Math.min(w, h) * 0.32;
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

        // Inner geometric circles
        ctx.beginPath();
        ctx.arc(cx + ox, cy + oy, outerR * 0.5, 0, Math.PI * 2);
        ctx.stroke();
      };

      // Stamped emboss shadow (darker deep burgundy/black)
      ctx.strokeStyle = "rgba(10, 0, 2, 0.85)";
      ctx.lineWidth = 0.9;
      drawPath(0.6, 0.6);

      // Stamped emboss highlight (champagne gold)
      ctx.strokeStyle = "rgba(243, 218, 144, 0.65)";
      ctx.lineWidth = 0.9;
      drawPath(-0.6, -0.6);

      ctx.restore();
    };
    drawIslamicPattern();

    // 5. Embossed Gold Stamped typography
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 9px 'Cinzel', serif";
    ctx.letterSpacing = "1.5px";

    const cx = w / 2;
    const cy = h / 2;

    // Embossed shadow text (dark wine/black)
    ctx.fillStyle = "rgba(10, 0, 2, 0.85)";
    ctx.fillText("SCRATCH", cx + 0.6, cy - 4.5);
    ctx.fillText("TO REVEAL", cx + 0.6, cy + 5.5);

    // Embossed highlight text (champagne gold reflection)
    ctx.fillStyle = "rgba(243, 218, 144, 0.65)";
    ctx.fillText("SCRATCH", cx - 0.5, cy - 5.5);
    ctx.fillText("TO REVEAL", cx - 0.5, cy + 4.5);

    // Main text fill in luxury champagne gold
    ctx.fillStyle = "#F3DA90";
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

  // Spawns burgundy enamel fragments and golden sparks on scratch
  const spawnDissolvingParticles = (x, y) => {
    const enamelCount = 2;
    const goldCount = 2;
    const newParticles = [];

    // Deep Burgundy Enamel Fragments
    for (let i = 0; i < enamelCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 1.5;
      newParticles.push({
        id: Math.random(),
        type: "enamel",
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.4,
        gravity: 0.05,
        fadeSpeed: 0.03,
        scale: Math.random() * 0.5 + 0.2,
        opacity: 0.9,
        color: "rgba(94, 0, 31, 0.85)", 
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
      className="flex flex-col items-center w-full animate-float-tile"
      animate={{ y: [0, -5, 0] }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.25, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
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
        className={`w-full aspect-[2/3] rounded-xl bg-gradient-to-br from-[#8E7037] via-[#F3DA90] to-[#8E7037] p-[4px] relative flex items-center justify-center overflow-hidden transition-all duration-1000 ${
          isAllRevealed 
            ? "shadow-[0_0_35px_rgba(212,175,55,0.75),_inset_0_1.5px_2px_rgba(255,255,255,0.85)] scale-102" 
            : "shadow-[0_12px_28px_rgba(0,0,0,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.75)]"
        }`}
      >
        {/* Inner core textured cream marble paper casing */}
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#FDF8F0] via-[#FAF5EC] to-[#F8F2E8] p-[3px] flex flex-col items-center justify-center relative shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden">
          
          {/* Burgundy Inset Layer border */}
          <div className="absolute inset-1.5 rounded-md border border-[#8F1C3C]/35 pointer-events-none z-0" />
          
          {/* Subtle Islamic geometric pattern watermark inside card */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
               style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`, 
                 backgroundSize: "60px 60px" 
               }} />

          {/* Hidden value display with blur-to-sharp animation and gold bloom shadow */}
          <motion.div 
            className="flex flex-col items-center z-10 w-full"
            initial={false}
            animate={isRevealed ? {
              filter: ["blur(10px)", "blur(0px)"],
              scale: [0.9, 1.1, 1],
            } : {
              filter: "blur(0px)",
              scale: 1
            }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
          >
            {/* Label header above value */}
            <span className="font-cinzel text-[8px] md:text-[9px] uppercase tracking-wider text-[#753A3A] mb-2 opacity-85 font-semibold">
              {label}
            </span>

            {/* Large luxury serif typography date value */}
            <span 
              className="font-cormorant text-2xl md:text-5xl font-bold tracking-normal text-[#4A081B] select-all transition-all duration-700 leading-none"
              style={{
                textShadow: isRevealed 
                  ? "0 0 16px rgba(232, 199, 106, 0.95), 0 0 4px rgba(212, 175, 55, 0.45)" 
                  : "none"
              }}
            >
              {value}
            </span>
          </motion.div>
        </div>

        {/* Scratch Canvas (Burgundy Enamel Luxury Layer) */}
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
              className="absolute inset-[4px] rounded-lg z-30 cursor-pointer touch-none"
            />
          )}
        </AnimatePresence>

        {/* Luxury Reflection Sweep Overlay (Brighter for interactive guide) */}
        {!isRevealed && (
          <div className="absolute inset-[4px] rounded-lg overflow-hidden pointer-events-none z-35">
            <motion.div
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent skew-x-30"
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

        {/* Scratch Drag Particles Overlay (Dissolving Enamel & Gold Dust) */}
        <div className="absolute inset-0 pointer-events-none z-35 overflow-hidden">
          {dragParticles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.x,
                top: p.y,
                width: `${p.scale * (p.type === "enamel" ? 12 : 7)}px`,
                height: `${p.scale * (p.type === "enamel" ? 12 : 7)}px`,
                backgroundColor: p.color,
                opacity: p.opacity,
                transform: "translate(-50%, -50%) rotate(45deg)",
                boxShadow: p.type === "gold" ? `0 0 6px ${p.color}` : "none",
                borderRadius: p.type === "enamel" ? "1px" : "50%",
              }}
            />
          ))}
        </div>
      </div>
      <span className="font-cormorant text-[10px] md:text-xs uppercase tracking-widest text-[#FFF8ED]/75 font-semibold mt-3">
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
  const [showRewardText, setShowRewardText] = useState(false);

  const allRevealed = revealedCards.every((v) => v);

  useEffect(() => {
    // Generate background gold/champagne slow floating dust
    const generated = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2.2 + 1.2,
      delay: Math.random() * 4,
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
        setTimeout(() => {
          setShowRewardText(true);
        }, 600);
      }
      return next;
    });
  };

  const triggerCelebration = () => {
    playChimeSound();

    // Spawn luxury celebration particles (cream rose petals, gold sparks, and gold foil chips)
    const particlesList = Array.from({ length: 90 }).map((_, i) => {
      const typeRand = Math.random();
      let type = "gold";
      if (typeRand < 0.35) type = "petal";
      else if (typeRand < 0.7) type = "sparkle";

      return {
        id: i,
        type,
        x: 0,
        y: 0,
        scale: Math.random() * 0.8 + 0.3,
        rotation: Math.random() * 360,
        spin: Math.random() * 180 - 90,
        vx: (Math.random() * 200 - 100) * 0.8,
        vy: -(Math.random() * 180 + 120) * 0.8,
        gravity: Math.random() * 40 + 30, // low gravity slow fall
        duration: Math.random() * 1.5 + 2.5, // 2.5s - 4.0s slow drift
      };
    });
    setCelebrationParticles(particlesList);
  };

  return (
    <section 
      style={{
        background: `linear-gradient(to bottom, #2A000C 0%, #4a0018 30%, #5A001E 70%, #7a1438 100%)`
      }}
      className="pt-24 pb-8 px-6 relative flex flex-col items-center justify-center overflow-hidden"
    >
      
      {/* Top Gold Arch Section Divider */}
      <LuxuryDivider className="absolute top-0 left-0 right-0 z-20 -translate-y-[15px] rotate-180" />

      {/* Velvet fabric grain overlay (2.5% opacity) */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay z-0" 
        style={{ 
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.12) 0.5px, transparent 0.5px)`, 
          backgroundSize: "2px 2px" 
        }} 
      />

      {/* Low-opacity repeating Islamic geometric pattern watermark (3.5% opacity, large scale) */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none z-0" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`, 
             backgroundSize: "80px 80px",
             filter: "blur(0.5px)"
           }} />

      {/* Faint oversized Islamic arch and crescent lines for depth */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
        <svg className="w-[450px] h-[750px] md:w-[800px] md:h-[1250px] text-[#D4AF37] stroke-current fill-none stroke-[0.8] filter blur-[0.5px]" viewBox="0 0 100 150" preserveAspectRatio="none">
          <path d="M 5,150 L 5,60 C 5,30 25,10 50,10 C 75,10 95,30 95,60 L 95,150" />
          <path d="M 15,150 A 35,35 0 0,1 85,150" />
        </svg>
      </div>

      {/* Layer 3: Top-heavy gold glow bleeding & center spotlight glow behind card */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-[radial-gradient(circle,rgba(142,17,58,0.32)_0%,rgba(94,0,31,0.08)_50%,transparent_100%)] rounded-full blur-[60px] pointer-events-none z-0" />

      {/* Center bloom burst when all are revealed */}
      <AnimatePresence>
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.75, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] bg-[radial-gradient(circle,rgba(212,175,55,0.25)_0%,rgba(142,17,58,0.1)_50%,transparent_100%)] rounded-full blur-[50px] pointer-events-none z-0"
          />
        )}
      </AnimatePresence>

      {/* Ambient dynamic diagonal light sweep */}
      <div className="ambient-light-sweep" />

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
                  x: p.vx * 1.8,
                  y: [0, p.vy * 0.7, p.vy * 0.7 + p.gravity * 2.5],
                  scale: p.scale,
                  opacity: [1, 1, 0], 
                  rotate: p.rotation + p.spin
                }}
                transition={{
                  duration: p.duration,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="absolute"
              >
                {p.type === "petal" ? (
                  // Elegant white/cream flower petal
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M 12 2 C 7 2 4 6 4 11 C 4 17 8 22 12 22 C 16 22 20 17 20 11 C 20 6 17 2 12 2 Z" 
                      fill="url(#confetti-petal-date)" 
                      className="opacity-90"
                    />
                    <defs>
                      <radialGradient id="confetti-petal-date" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FFFDF9" />
                        <stop offset="70%" stopColor="#FAF5EC" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.4" />
                      </radialGradient>
                    </defs>
                  </svg>
                ) : p.type === "sparkle" ? (
                  // Twinkling golden sparkle star
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path 
                      d="M 6 0 L 7.5 4.5 L 12 6 L 7.5 7.5 L 6 12 L 4.5 7.5 L 0 6 L 4.5 4.5 Z" 
                      fill="#F3DA90" 
                      className="drop-shadow-[0_0_6px_#E8C76A]"
                    />
                  </svg>
                ) : (
                  // Luxury gold foil chip
                  <div 
                    className="w-3.5 h-2 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] rounded-xs shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
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

      {/* Slow ambient light sweep across background */}
      <motion.div
        animate={{
          x: ["-10%", "10%", "-10%"],
          y: ["-10%", "10%", "-10%"],
          opacity: [0.12, 0.25, 0.12]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-[#D4AF37]/10 to-transparent rounded-full blur-[100px] pointer-events-none z-0"
        style={{ top: "15%", left: "10%" }}
      />

      {/* Subtle radial spotlight behind tiles */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] md:w-[500px] h-[380px] md:h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(255, 255, 255, 0) 70%)"
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

      {/* Heading Viewport Reveal */}
      <motion.div 
        initial={{ opacity: 0, filter: "blur(12px)", y: 25 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="text-center mb-12 max-w-sm relative z-10"
      >
        <span className="font-inter text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#E8C76A] font-semibold flex items-center justify-center gap-1">
          The Sacred Date
          <motion.span 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="inline-block"
          >
            ✦
          </motion.span>
        </span>
        <h2 className="font-cormorant text-3xl md:text-4xl text-[#FFF8ED] mt-2 tracking-wide font-light">
          Union Date Reveal
        </h2>
        <div className="w-12 h-[1px] bg-[#D4AF37]/50 mx-auto mt-4" />
      </motion.div>

      {/* Rectangular Reveal Tiles Container */}
      <motion.div 
        initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.85, ease: "easeOut", delay: 0.15 }}
        className="grid grid-cols-3 gap-4 sm:gap-6 justify-center w-full max-w-[340px] md:max-w-[480px] relative z-10"
      >
        <CeremonialMedallion value="09" label="Day" onReveal={handleCardReveal} index={0} isAllRevealed={allRevealed} />
        <CeremonialMedallion value="DEC" label="Month" onReveal={handleCardReveal} index={1} isAllRevealed={allRevealed} />
        <CeremonialMedallion value="2026" label="Year" onReveal={handleCardReveal} index={2} isAllRevealed={allRevealed} />
      </motion.div>

      {/* Alhamdulillah Sacred Date Revealed Text Overlay */}
      <AnimatePresence>
        {showRewardText && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center mt-8 text-center relative z-20"
          >
            <motion.h3 
              className="font-cormorant text-2xl md:text-3xl text-[#E8C76A] tracking-[0.15em] font-medium"
              animate={{ 
                textShadow: [
                  "0 0 10px rgba(232,199,106,0.2)",
                  "0 0 20px rgba(232,199,106,0.6)",
                  "0 0 10px rgba(232,199,106,0.2)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              Alhamdulillah ✨
            </motion.h3>
            <p className="font-cinzel text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#FFF8ED]/90 mt-2 font-semibold">
              Sacred Date Revealed
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Helper Indicator */}
      <div className="mt-10 h-5 flex items-center justify-center text-center relative z-10">
        {!allRevealed ? (
          <p className="font-inter text-[9px] tracking-[0.25em] text-[#FFF8ED]/70 uppercase">
            Scratch the luxury tiles to reveal union date
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

// Pointed Islamic Gold Divider Component
const LuxuryDivider = ({ className = "" }) => (
  <div className={`w-full flex items-center justify-center pointer-events-none ${className}`}>
    <div className="flex-1 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
    <svg className="w-16 h-8 text-[#D4AF37] fill-none stroke-current" viewBox="0 0 100 50">
      <path d="M 10,25 C 30,25 35,10 50,5 C 65,10 70,25 90,25" strokeWidth="1.5" />
      <path d="M 20,25 Q 50,40 80,25" strokeWidth="0.8" strokeDasharray="2,2" />
      <circle cx="50" cy="20" r="3" fill="currentColor" />
    </svg>
    <div className="flex-1 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
  </div>
);

export default memo(ScratchDate);
