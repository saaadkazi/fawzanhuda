"use client";

import { useEffect, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";
import FloralOrnament from "./FloralOrnament";

// Card corner ornament matching Hero master design system
const CardCornerOrnament = ({ position }) => {
  const classMap = {
    "top-left": "top-3 left-3 rotate-0",
    "top-right": "top-3 right-3 rotate-90",
    "bottom-left": "bottom-3 left-3 -rotate-90",
    "bottom-right": "bottom-3 right-3 rotate-180",
  };
  return (
    <div className={`absolute w-5 h-5 md:w-7 md:h-7 text-[#D4AF37]/35 pointer-events-none z-10 ${classMap[position]}`}>
      <svg className="w-full h-full" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M 0,0 L 40,0 M 0,0 L 0,40" />
        <path d="M 6,6 C 12,6 16,12 16,16 C 16,20 20,24 24,24" strokeDasharray="1.5,1.5" />
        <circle cx="6" cy="6" r="1.2" fill="currentColor" />
      </svg>
    </div>
  );
};

// Royal Swaying Lanterns matching Hero master design system
const SwayingLantern = ({ position }) => {
  const isLeft = position === "left";
  return (
    <motion.div
      animate={{ rotate: isLeft ? [-1.8, 1.8, -1.8] : [1.8, -1.8, 1.8] }}
      transition={{ duration: 9.0, repeat: Infinity, ease: "easeInOut", delay: isLeft ? 0 : 2.5 }}
      style={{ transformOrigin: "top center" }}
      className={`absolute top-0 ${isLeft ? "left-4 md:left-16" : "right-4 md:right-16"} w-12 md:w-20 h-[300px] z-10 pointer-events-none transform-gpu will-change-transform`}
    >
      <div className="w-[1px] h-[110px] md:h-[150px] bg-gradient-to-b from-[#856124] via-[#D4AF37] to-[#FCF6BA] mx-auto opacity-75" />
      <div className="w-9 h-14 md:w-12 md:h-18 mx-auto relative flex flex-col items-center justify-start text-[#D4AF37]">
        <div 
          className="absolute top-2.5 w-8 h-8 rounded-full opacity-35 animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(255, 209, 102, 0.45) 0%, transparent 70%)"
          }}
        />
        <svg className="w-full h-full fill-current drop-shadow-[0_2px_5px_rgba(212,175,55,0.4)]" viewBox="0 0 40 60">
          <path d="M 20 2 L 10 15 L 30 15 Z" />
          <path d="M 10 15 L 30 15 L 35 45 L 20 55 L 5 45 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="20" cy="32" r="5" className="fill-[#FFEAA7] animate-pulse" />
          <circle cx="20" cy="32" r="3.2" className="fill-[#FFD166]" />
        </svg>
      </div>
    </motion.div>
  );
};

// Core Illuminated Palace Arch Frame matching Hero master system
const PalaceArchFrame = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88vw] md:w-auto md:max-w-[480px] h-[78vh] md:h-[620px] pointer-events-none z-0 transform-gpu will-change-transform">
      <div className="absolute inset-0 bg-[#D4AF37]/10 blur-[36px] rounded-[150px_150px_24px_24px] animate-pulse-slow" />
      <svg className="w-full h-full stroke-current fill-none stroke-[1.2] text-[#D4AF37]/30 drop-shadow-[0_0_10px_rgba(212,175,55,0.45)]" viewBox="0 0 100 150">
        <path d="M 5,150 L 5,45 C 5,15 35,2 50,2 C 65,2 95,15 95,45 L 95,150" />
        <path d="M 9,150 L 9,47 C 9,18 36,6 50,6 C 64,6 90,18 90,47 L 90,150" strokeDasharray="1.5,1.5" strokeWidth="0.5" />
        <path d="M 47,4 L 50,1 L 53,4 L 50,7 Z" fill="#D4AF37" opacity="0.8" />
        <circle cx="50" cy="4" r="1.5" fill="#FFFDF9" />
      </svg>
    </div>
  );
};

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

// Section curved transition divider (Countdown to Venue)
const SectionDivider = () => {
  return (
    <div className="absolute left-0 right-0 w-full h-10 pointer-events-none z-10 bottom-0">
      <svg className="w-full h-full text-[#FFFDF9] fill-current" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path d="M 0 100 C 300 0 700 0 1000 100 L 1000 100 Z" />
      </svg>
      <svg className="absolute inset-0 w-full h-full text-[#D4AF37]/50 fill-none pointer-events-none stroke-current" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path d="M 0 100 C 300 0 700 0 1000 100" strokeWidth="2" />
      </svg>
    </div>
  );
};

// Luxury Ceremonial Medallion Sub-component (Burgundy Foil + Gold Casing)
function CeremonialMedallion({ value, label, onReveal, index, isAllRevealed }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  
  const lastCoordsRef = useRef(null);
  const lastCheckTimeRef = useRef(0);
  const particlesRef = useRef([]);
  const animationFrameIdRef = useRef(null);
  const scratchPointsRef = useRef([]);
  const isScratchFrameScheduledRef = useRef(false);

  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  // Clean up canvas animation loop on unmount
  useEffect(() => {
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  // Performance-optimized canvas particle system drawing loop (No React re-renders)
  const startParticleLoop = () => {
    if (animationFrameIdRef.current) return;
    
    const update = () => {
      const canvas = particleCanvasRef.current;
      if (!canvas) {
        animationFrameIdRef.current = null;
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animationFrameIdRef.current = null;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.opacity -= p.fadeSpeed;
        p.scale = Math.max(0, p.scale - 0.005);

        // Delete dead particle
        if (p.opacity <= 0 || p.scale <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.type === "gold") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.scale * 3.5, 0, Math.PI * 2);
          ctx.shadowBlur = 4;
          ctx.shadowColor = p.color;
          ctx.fill();
        } else {
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.PI / 4);
          const size = p.scale * 6;
          ctx.fillRect(-size / 2, -size / 2, size, size);
        }
        ctx.restore();
      }

      if (particles.length > 0) {
        animationFrameIdRef.current = requestAnimationFrame(update);
      } else {
        animationFrameIdRef.current = null;
      }
    };
    
    animationFrameIdRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const w = container.clientWidth - 4; // Adjusted for thin border
      const h = container.clientHeight - 4;
      
      canvas.width = w;
      canvas.height = h;
      drawMedallionFoil(canvas);

      if (particleCanvasRef.current) {
        particleCanvasRef.current.width = w;
        particleCanvasRef.current.height = h;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  function drawMedallionFoil(canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // 1. Deep glossy burgundy foil background gradient (#3b0014 → #690024 → #4a0018)
    const foilGrad = ctx.createLinearGradient(0, 0, 0, h);
    foilGrad.addColorStop(0, "#3b0014"); // Deep glossy burgundy base
    foilGrad.addColorStop(0.5, "#690024"); // Rich metallic wine midtone
    foilGrad.addColorStop(1, "#4a0018"); // Luxury deep burgundy bottom

    ctx.fillStyle = foilGrad;
    ctx.beginPath();
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

    // 2. Soft inner vignette for premium depth
    const vignette = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.min(w, h) * 0.8);
    vignette.addColorStop(0, "rgba(255, 255, 255, 0.12)"); // Central highlight
    vignette.addColorStop(0.6, "rgba(0, 0, 0, 0.05)");
    vignette.addColorStop(1, "rgba(0, 0, 0, 0.45)"); // Dark vignette edge
    ctx.fillStyle = vignette;
    ctx.fill();

    // 3. Subtle gold reflections / gloss sweep
    const reflections = ctx.createLinearGradient(0, 0, w, h);
    reflections.addColorStop(0, "rgba(212, 175, 55, 0)");
    reflections.addColorStop(0.3, "rgba(212, 175, 55, 0.06)");
    reflections.addColorStop(0.5, "rgba(255, 255, 255, 0.16)"); // Soft gloss sweep
    reflections.addColorStop(0.7, "rgba(212, 175, 55, 0.06)");
    reflections.addColorStop(1, "rgba(212, 175, 55, 0)");
    ctx.fillStyle = reflections;
    ctx.fill();

    // 4. Thinner matte gold canvas border
    ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
    ctx.lineWidth = 0.8;
    ctx.strokeRect(2.5, 2.5, w - 5, h - 5);

    // 5. Faint Embossed Rub el Hizb 8-pointed star pattern
    const drawEmbossedPattern = () => {
      ctx.save();
      const cx = w / 2;
      const cy = h / 2;
      const points = 8;
      const outerR = Math.min(w, h) * 0.28;
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

        ctx.beginPath();
        ctx.arc(cx + ox, cy + oy, outerR * 0.52, 0, Math.PI * 2);
        ctx.stroke();
      };

      // Stamped shadow
      ctx.strokeStyle = "rgba(10, 0, 2, 0.65)";
      ctx.lineWidth = 0.7;
      drawPath(0.6, 0.6);

      // Stamped highlight
      ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
      ctx.lineWidth = 0.7;
      drawPath(-0.6, -0.6);

      ctx.restore();
    };
    drawEmbossedPattern();

    // 6. Embossed Gold Stamped typography "SCRATCH TO REVEAL"
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 7px 'Cinzel', serif";
    ctx.letterSpacing = "1.5px";

    const cx = w / 2;
    const cy = h / 2;

    // Shadow text
    ctx.fillStyle = "rgba(10, 0, 2, 0.85)";
    ctx.fillText("SCRATCH", cx + 0.6, cy - 5.5);
    ctx.fillText("TO REVEAL", cx + 0.6, cy + 4.5);

    // Highlight text
    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.fillText("SCRATCH", cx - 0.5, cy - 6.5);
    ctx.fillText("TO REVEAL", cx - 0.5, cy + 3.5);

    // Main text fill in luxury champagne gold
    ctx.fillStyle = "#F3DA90";
    ctx.fillText("SCRATCH", cx, cy - 6);
    ctx.fillText("TO REVEAL", cx, cy + 4);
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

  const spawnDissolvingParticles = (x, y) => {
    const enamelCount = 2;
    const goldCount = 2;

    for (let i = 0; i < enamelCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 1.5;
      particlesRef.current.push({
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

    for (let i = 0; i < goldCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.0 + Math.random() * 1.8;
      particlesRef.current.push({
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

    startParticleLoop();
  };

  const getBrushSize = (canvas) => {
    if (!canvas) return 60;
    return canvas.width < 100 ? 60 : 75; // Mobile: 60px, Desktop: 75px (adjusted for faster scratch coverage)
  };

  const drawScratchFrame = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.globalCompositeOperation = "destination-out";
        const brushSize = getBrushSize(canvas);
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const points = scratchPointsRef.current;
        if (points.length > 0) {
          for (const pt of points) {
            if (pt.from.x === pt.to.x && pt.from.y === pt.to.y) {
              ctx.beginPath();
              ctx.arc(pt.to.x, pt.to.y, brushSize / 2, 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.beginPath();
              ctx.moveTo(pt.from.x, pt.from.y);
              ctx.lineTo(pt.to.x, pt.to.y);
              ctx.stroke();
            }
            spawnDissolvingParticles(pt.to.x, pt.to.y);
          }
          scratchPointsRef.current = []; // Clear queue
          checkRevealPercentage(canvas);
        }
      }
    }
    isScratchFrameScheduledRef.current = false;
  };

  const startScratching = (e) => {
    setIsScratching(true);
    const coords = getCoordinates(e);
    lastCoordsRef.current = coords;

    scratchPointsRef.current.push({
      from: { ...coords },
      to: { ...coords }
    });

    if (!isScratchFrameScheduledRef.current) {
      isScratchFrameScheduledRef.current = true;
      requestAnimationFrame(drawScratchFrame);
    }
  };

  const scratch = (e) => {
    if (!isScratching) return;
    const coords = getCoordinates(e);

    scratchPointsRef.current.push({
      from: lastCoordsRef.current ? { ...lastCoordsRef.current } : { ...coords },
      to: { ...coords }
    });

    if (!isScratchFrameScheduledRef.current) {
      isScratchFrameScheduledRef.current = true;
      requestAnimationFrame(drawScratchFrame);
    }

    lastCoordsRef.current = coords;
  };

  const stopScratching = () => {
    setIsScratching(false);
    lastCoordsRef.current = null;
    
    // Force final percentage check on release to ensure smooth experience
    const canvas = canvasRef.current;
    if (canvas && !isRevealed) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        try {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          let transparentPixels = 0;
          for (let i = 3; i < imgData.data.length; i += 4) {
            if (imgData.data[i] === 0) {
              transparentPixels++;
            }
          }
          const percentage = (transparentPixels / (canvas.width * canvas.height)) * 100;
          if (percentage >= 25) {
            setIsRevealed(true);
            triggerLocalBloom();
            onReveal(index);
          }
        } catch (err) {
          console.warn("Canvas percentage calculation failed:", err);
        }
      }
    }
  };

  const checkRevealPercentage = (canvas) => {
    const now = Date.now();
    if (now - lastCheckTimeRef.current < 50) return; // Throttled check for zero visual latency
    lastCheckTimeRef.current = now;

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
      if (percentage >= 25 && !isRevealed) {
        setIsRevealed(true);
        setIsScratching(false);
        triggerLocalBloom();
        onReveal(index);
      }
    } catch (err) {
      console.warn("Canvas percentage calculation failed:", err);
    }
  };

  const triggerLocalBloom = () => {
    const newSparkles = Array.from({ length: 12 }).map((_, i) => {
      const angle = (i / 12) * Math.PI * 2 + Math.random() * 0.4;
      const distance = 30 + Math.random() * 35;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: Math.random() * 0.5 + 0.25,
        duration: 0.5 + Math.random() * 0.4,
        delay: Math.random() * 0.05,
      };
    });
    setSparkles(newSparkles);
  };

  return (
    <motion.div 
      className="flex flex-col items-center animate-float-tile"
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
      {/* Sizing reduced by 15-20%: w-[72px] h-[102px] on Mobile, md:w-[98px] md:h-[140px] on Desktop */}
      <div 
        ref={containerRef}
        className={`w-[72px] h-[102px] md:w-[98px] md:h-[140px] rounded-lg md:rounded-xl bg-gradient-to-br from-[#BF953F] via-[#DFCA98] to-[#B38728] p-[1px] md:p-[1.5px] relative flex items-center justify-center overflow-hidden transition-all duration-1000 ${
          isAllRevealed 
            ? "shadow-[0_0_12px_rgba(212,175,55,0.35),_inset_0_0.5px_1px_rgba(255,255,255,0.8)] scale-102" 
            : "shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_0.5px_1px_rgba(255,255,255,0.5)]"
        }`}
      >
        {/* BOTTOM REVEAL LAYER: Warm ivory paper texture with matte gold accents */}
        <div className="w-full h-full rounded-md md:rounded-lg bg-gradient-to-br from-[#fffdf8] via-[#f7efe1] to-[#efe3d0] p-[2px] flex flex-col items-center justify-center relative shadow-[inset_0_1.5px_6px_rgba(74,8,27,0.12)] overflow-hidden">
          
          {/* Subtle paper grain texture */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" 
               style={{ 
                 backgroundImage: "radial-gradient(circle at 50% 50%, #4A081B 1px, transparent 1px), radial-gradient(circle at 0 0, #4A081B 1px, transparent 1px)", 
                 backgroundSize: "6px 6px" 
               }} />

          {/* Gold Inset border */}
          <div className="absolute inset-1 rounded-sm md:rounded-md border border-[#D4AF37]/35 pointer-events-none z-0" />
          
          {/* Faint Islamic geometric pattern watermark */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0" 
               style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`, 
                 backgroundSize: "40px 40px" 
               }} />

          {/* Revealed value display: Always visible underneath the canvas to allow dynamic reveal during scratching */}
          <div className="flex flex-col items-center z-10 w-full">
            {/* Label header above value */}
            <span className="font-cinzel text-[6.5px] md:text-[7.5px] uppercase tracking-wider text-[#856124] mb-1.5 font-semibold z-10">
              {label}
            </span>

            {/* Large luxury serif typography date value */}
            <span 
              className={`font-cormorant font-bold tracking-normal text-[#4A081B] select-all leading-none z-10 ${
                label.toLowerCase() === "month" 
                  ? "text-[20px] md:text-[28px] uppercase font-semibold" 
                  : "text-[24px] md:text-[34px]"
              }`}
              style={{
                textShadow: "0 1px 1px rgba(255, 255, 255, 0.95)"
              }}
            >
              {value}
            </span>
          </div>
        </div>

        {/* TOP SCRATCH LAYER: Deep glossy burgundy foil with metallic finish */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.canvas
              ref={canvasRef}
              exit={{ 
                opacity: 0, 
                scale: 0.96, 
                transition: { duration: 0.4, ease: "easeOut" } 
              }}
              onMouseDown={startScratching}
              onMouseMove={scratch}
              onMouseUp={stopScratching}
              onMouseLeave={stopScratching}
              onTouchStart={startScratching}
              onTouchMove={scratch}
              onTouchEnd={stopScratching}
              className="absolute inset-[1px] md:inset-[1.5px] rounded-md md:rounded-lg z-30 cursor-pointer touch-none"
            />
          )}
        </AnimatePresence>

        {/* Particles Canvas Overlay (Draws scratch particles) */}
        {!isRevealed && (
          <canvas
            ref={particleCanvasRef}
            className="absolute inset-[1px] md:inset-[1.5px] rounded-md md:rounded-lg pointer-events-none z-40"
          />
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
                <svg width="6" height="6" viewBox="0 0 12 12" fill="none">
                  <path 
                    d="M 6 0 L 7.5 4.5 L 12 6 L 7.5 7.5 L 6 12 L 4.5 7.5 L 0 6 L 4.5 4.5 Z" 
                    fill="#FFF8ED" 
                    className="drop-shadow-[0_0_3px_#D4AF37]"
                  />
                </svg>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <span className="font-cormorant text-[9px] md:text-xs uppercase tracking-widest text-[#FFF8ED]/75 font-semibold mt-2.5">
        {label}
      </span>
    </motion.div>
  );
}

// Countdown Card Sub-component
function CountdownCard({ value, label, format }) {
  const formattedVal = format(value);

  return (
    <div className="flex flex-col items-center flex-1 max-w-[62px] md:max-w-[74px]">
      
      {/* Clock Casing with Gold Gradient Borders (Ivory panel on dark backdrop) */}
      <div className="relative w-full h-[62px] md:h-[74px] bg-gradient-to-br from-[#BF953F] via-[#DFCA98] to-[#B38728] p-[2px] rounded-xl shadow-[0_6px_16px_rgba(0,0,0,0.35)] flex items-center justify-center overflow-hidden">
        
        {/* Inner core textured cream marble paper casing */}
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#fffdf8] via-[#f7efe1] to-[#efe3d0] p-[1.5px] flex items-center justify-center relative shadow-[inset_0_1.5px_6px_rgba(74,8,27,0.12)] overflow-hidden">
          
          {/* Burgundy Inset Layer border */}
          <div className="absolute inset-0.5 rounded-md border border-[#8F1C3C]/20 pointer-events-none z-0" />
          
          {/* Double Inner Frame details */}
          <div className="absolute inset-[2px] border border-[#D4AF37]/10 rounded-md pointer-events-none" />

          {/* Physical center-split line simulating mechanical flip clock */}
          <div className="absolute left-0 right-0 top-1/2 h-[0.5px] bg-[#D4AF37]/20 z-10 shadow-[0_0.5px_1px_rgba(0,0,0,0.15)]" />
          
          {/* Shading gradients top and bottom to create physical depth */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black/[0.02] to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/[0.015] to-transparent pointer-events-none" />

          {/* Rolling Number */}
          <div className="relative overflow-hidden h-8 flex items-center justify-center z-20">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={formattedVal}
                initial={{ y: 16, opacity: 0, filter: "blur(2px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -16, opacity: 0, filter: "blur(2px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-cormorant text-[20px] md:text-[28px] font-semibold text-[#4A081B] tracking-wider block drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.7)]"
              >
                {formattedVal}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Card Label */}
      <span className="font-inter text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[#FFF8ED]/75 mt-2.5 font-bold">
        {label}
      </span>
    </div>
  );
}

// Separator Colon with slow pulsing opacity
function SeparatorColon() {
  return (
    <motion.div 
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="flex flex-col gap-1.5 pb-5 text-[#E8C76A] drop-shadow-[0_0_6px_rgba(232,199,106,0.6)] font-semibold text-sm md:text-base"
    >
      <span>•</span>
      <span>•</span>
    </motion.div>
  );
}

function ScratchDate() {
  const targetDate = new Date("2026-12-09T00:00:00").getTime();
  
  const [revealedCards, setRevealedCards] = useState([false, false, false]);
  const [celebrationParticles, setCelebrationParticles] = useState([]);
  const [bgStars, setBgStars] = useState([]);
  const [shimmerActive, setShimmerActive] = useState(false);
  const [showRewardText, setShowRewardText] = useState(false);
  const [showCelebrationPopup, setShowCelebrationPopup] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const allRevealed = revealedCards.every((v) => v);

  useEffect(() => {
    setMounted(true);
    
    // Generate background gold/champagne slow floating dust
    const generated = Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2.2 + 1.2,
      delay: Math.random() * 4,
      duration: Math.random() * 9 + 7,
      opacity: Math.random() * 0.35 + 0.15,
    }));
    setBgStars(generated);

    // Countdown calculation
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCardReveal = (index) => {
    setRevealedCards((prev) => {
      const next = [...prev];
      next[index] = true;
      if (next.every((v) => v)) {
        setShimmerActive(true);

        // Sequence:
        // 1. Third card reveals
        // 2. 300ms pause
        // 3. Centered luxury popper burst (confetti) & gold particles spread outward
        // 4. Success popup appears
        setTimeout(() => {
          // Centered symmetric popper burst
          confetti({
            particleCount: 120,
            spread: 360,
            startVelocity: 35,
            origin: { x: 0.5, y: 0.5 },
            colors: ["#E8C76A", "#D4AF37", "#FFF8ED", "#4A081B"],
          });
          
          triggerCelebration();

          setTimeout(() => {
            setShowCelebrationPopup(true);
            setShowRewardText(true);
          }, 500);
        }, 300);
      }
      return next;
    });
  };

  const triggerCelebration = () => {
    playChimeSound();

    // Spawn symmetric radial celebration particles (cream rose petals, gold sparks, and gold foil chips)
    const particleCount = 45;
    const particlesList = Array.from({ length: particleCount }).map((_, i) => {
      const angle = (i * 2 * Math.PI) / particleCount; // Perfect symmetric circle angles
      const speed = 2.5 + Math.random() * 3.5;
      const typeRand = Math.random();
      let type = "gold";
      if (typeRand < 0.3) type = "petal";
      else if (typeRand < 0.6) type = "sparkle";

      return {
        id: i,
        type,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        scale: Math.random() * 0.55 + 0.35,
        rotation: angle * (180 / Math.PI), // Align initial rotation with angle
        spin: Math.random() * 90 - 45,
        duration: 1.8 + Math.random() * 1.0, // Slow drift duration
      };
    });
    setCelebrationParticles(particlesList);
  };

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <section 
      style={{ background: "#4A081B" }}
      className="relative py-28 px-4 md:px-6 flex flex-col items-center justify-center overflow-hidden min-h-screen z-10"
    >
      {/* 1. Hero Vignette Edge Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[5] hero-vignette" />

      {/* 2. Velvet fabric grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay z-[2]" 
        style={{ 
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.12) 0.5px, transparent 0.5px)`, 
          backgroundSize: "2px 2px" 
        }} 
      />

      {/* 3. Hero Master Golden Hexagon Background SVG Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.045] pointer-events-none z-[1] transform-gpu" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`, 
          backgroundSize: "60px 60px" 
        }} 
      />

      {/* 4. Swaying Golden lanterns */}
      <SwayingLantern position="left" />
      <SwayingLantern position="right" />

      {/* 5. Outer Section Corner Floral Frame Ornaments */}
      <FloralOrnament position="top-left" opacity={0.65} />
      <FloralOrnament position="top-right" opacity={0.65} />
      <FloralOrnament position="bottom-left" opacity={0.65} />
      <FloralOrnament position="bottom-right" opacity={0.65} />

      {/* 6. Palace Arch Frame Backing */}
      <PalaceArchFrame />

      {/* Curved section transition divider */}
      <SectionDivider />

      {/* CSS glow keyframe registration */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gold-glow-pulse {
          0% { text-shadow: 0 0 8px rgba(243, 218, 144, 0.6), 0 0 2px rgba(212, 175, 55, 0.3); }
          50% { text-shadow: 0 0 16px rgba(243, 218, 144, 0.95), 0 0 4px rgba(212, 175, 55, 0.5); }
          100% { text-shadow: 0 0 8px rgba(243, 218, 144, 0.6), 0 0 2px rgba(212, 175, 55, 0.3); }
        }
        .animate-gold-glow {
          animation: gold-glow-pulse 2s infinite ease-in-out;
        }
      `}} />
      
      {/* Top Gold Arch Section Divider */}
      <LuxuryDivider className="absolute top-0 left-0 right-0 z-20 -translate-y-[15px] rotate-180" />

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

      {/* Dynamic Celebration Particles */}
      <AnimatePresence>
        {celebrationParticles.length > 0 && (
          <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
            {celebrationParticles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0.1, 
                  opacity: 1, 
                  rotate: p.rotation 
                }}
                animate={{
                  x: p.vx * 65,
                  y: p.vy * 65,
                  scale: [0.1, p.scale, 0],
                  opacity: [1, 0.9, 0], 
                  rotate: p.rotation + p.spin
                }}
                transition={{
                  duration: p.duration,
                  ease: "easeOut"
                }}
                className="absolute"
              >
                {p.type === "petal" ? (
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
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path 
                      d="M 6 0 L 7.5 4.5 L 12 6 L 7.5 7.5 L 6 12 L 4.5 7.5 L 0 6 L 4.5 4.5 Z" 
                      fill="#F3DA90" 
                      className="drop-shadow-[0_0_6px_#E8C76A]"
                    />
                  </svg>
                ) : (
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

      {/* ====================================================== */}
      {/* HERO MASTER ARCHED CARD SILHOUETTE ENCLOSURE */}
      {/* ====================================================== */}
      <div className="relative z-20 w-full max-w-lg md:max-w-xl bg-gradient-to-b from-[#4A081B] via-[#310411] to-[#1F000A] p-6 md:p-10 rounded-[170px_170px_24px_24px] border border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(212,175,55,0.15)] flex flex-col items-center text-center overflow-hidden">
        <CardCornerOrnament position="top-left" />
        <CardCornerOrnament position="top-right" />
        <CardCornerOrnament position="bottom-left" />
        <CardCornerOrnament position="bottom-right" />
        
        {/* Date Reveal Title Reveal */}
        <motion.div 
          initial={{ opacity: 0, filter: "blur(12px)", y: 25 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="text-center mb-8 relative z-10 flex flex-col items-center justify-center pt-8 md:pt-12"
        >
          <FloralOrnament className="w-14 h-7 text-[#D4AF37]/80 mb-2" />
          <span className="font-inter text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-[#E8C76A] font-semibold flex items-center justify-center gap-1">
            The Sacred Date ✦
          </span>
          <h2 className="font-cormorant text-3xl md:text-4xl gold-shimmer-text mt-2 tracking-wide font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            Union Date Reveal
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Centered Luxury Reveal Cards container with balanced spacing */}
        <motion.div 
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: "easeOut", delay: 0.15 }}
          className="flex flex-row gap-2.5 md:gap-4 justify-center items-center w-full max-w-max mx-auto relative z-10 pb-4"
        >
          <CeremonialMedallion value="09" label="Day" onReveal={handleCardReveal} index={0} isAllRevealed={allRevealed} />
          <CeremonialMedallion value="DEC" label="Month" onReveal={handleCardReveal} index={1} isAllRevealed={allRevealed} />
          <CeremonialMedallion value="2026" label="Year" onReveal={handleCardReveal} index={2} isAllRevealed={allRevealed} />
        </motion.div>
      </div>

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
      <div className="mt-8 h-5 flex items-center justify-center text-center relative z-10">
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

      {/* ====================================================== */}
      {/* TRANSITION: ORNAMENTAL CURVED DIVIDER WITH GOLD ACCENTS */}
      {/* ====================================================== */}
      <div className="w-full flex items-center justify-center my-14 pointer-events-none relative z-10">
        <div className="flex-1 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />
        <svg className="w-20 h-10 text-[#D4AF37]/75 fill-none stroke-current" viewBox="0 0 100 50">
          <path d="M 5,25 C 25,25 35,5 50,20 C 65,5 75,25 95,25" strokeWidth="1.2" />
          <circle cx="50" cy="20" r="2.5" fill="currentColor" />
          <path d="M 25,25 Q 50,45 75,25" strokeWidth="0.6" strokeDasharray="2,2" />
        </svg>
        <div className="flex-1 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />
      </div>

      {/* ====================================================== */}
      {/* BLOCK 2: COUNTDOWN TIMER */}
      {/* ====================================================== */}
      
      {/* Countdown Title Reveal */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(12px)", y: 25 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="text-center mb-10 relative z-10"
      >
        <span className="font-cormorant text-xs md:text-sm uppercase tracking-[0.3em] text-[#E8C76A] font-semibold flex items-center justify-center gap-1.5">
          Counting the Moments
          <motion.span 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="inline-block"
          >
            ✦
          </motion.span>
        </span>
        <h2 className="font-cormorant text-3xl md:text-4xl text-[#FFF8ED] mt-2 tracking-wide font-light">
          Until the Nikah
        </h2>
        <div className="w-12 h-[1px] bg-[#D4AF37]/60 mx-auto mt-4" />
      </motion.div>

      {/* Timer Grid Viewport Reveal with 15-20% reduced cards */}
      <motion.div 
        initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.85, ease: "easeOut", delay: 0.15 }}
        className="flex items-center gap-1.5 md:gap-3.5 justify-center max-w-lg w-full px-4 relative z-10"
      >
        <CountdownCard value={timeLeft.days} label="Days" format={formatNumber} />
        <SeparatorColon />
        <CountdownCard value={timeLeft.hours} label="Hours" format={formatNumber} />
        <SeparatorColon />
        <CountdownCard value={timeLeft.minutes} label="Minutes" format={formatNumber} />
        <SeparatorColon />
        <CountdownCard value={timeLeft.seconds} label="Seconds" format={formatNumber} />
      </motion.div>

      {/* Glassmorphic Success Celebration Modal (Using React Portal for clean layout hierarchy, pre-rendered to prevent load flash) */}
      {mounted && createPortal(
        <div 
          style={{ pointerEvents: showCelebrationPopup ? "auto" : "none" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          {/* Backdrop layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showCelebrationPopup ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={() => setShowCelebrationPopup(false)}
            className="absolute inset-0 bg-black/75 cursor-pointer transform-gpu"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ 
              opacity: showCelebrationPopup ? 1 : 0, 
              scale: showCelebrationPopup ? 1 : 0.96
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-gradient-to-b from-[#FFFDF9] via-[#FFFDF9] to-[#F6EBDD] border border-[#D4AF37]/50 rounded-[28px] p-8 md:p-10 shadow-[0_15px_40px_rgba(74,8,27,0.14)] relative overflow-hidden cursor-default text-center transform-gpu will-change-transform"
          >
            {/* Close Button X */}
            <button
              type="button"
              onClick={() => setShowCelebrationPopup(false)}
              className="absolute top-4 right-4 text-[#4A081B]/50 hover:text-[#4A081B] transition-colors cursor-pointer focus:outline-none z-10"
            >
              <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Elegant gold corner ornaments */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#D4AF37]/40 rounded-tl-sm pointer-events-none" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#D4AF37]/40 rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#D4AF37]/40 rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#D4AF37]/40 rounded-br-sm pointer-events-none" />

            {/* Medallion Gold Icon */}
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/45 flex items-center justify-center mx-auto mb-6 text-[#E8C76A]">
              <svg className="w-6.5 h-6.5 text-[#E8C76A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c-.105-.347-.492-.546-.861-.485a9.001 9.001 0 1 0 7.824 7.824c.06-.369-.138-.756-.485-.861l-6.478-1.478-1.478-6.478Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15h.008v.008H12V15Z" />
              </svg>
            </div>

            <span className="font-cinzel text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#856124] font-semibold mb-4 block">
              The Sacred Date Unlocked
            </span>

            {/* Sacred Arabic Calligraphy */}
            <p className="font-amiri text-[1.8rem] md:text-[2.2rem] leading-none tracking-wide text-center text-[#4A081B] font-bold mb-4">
              بَارَكَ ٱللَّٰهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا
            </p>

            {/* Revealed Date text */}
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-[#4A081B] tracking-normal mb-1">
              09 DEC 2026
            </h2>
            
            <p className="font-cormorant italic text-base text-[#4A081B]/85 tracking-wider mb-2 font-medium">
              Wednesday
            </p>

            <p className="font-cormorant text-[#4A081B]/70 text-sm md:text-base leading-relaxed max-w-xs mx-auto mb-8">
              We look forward to welcoming you to celebrate our union.
            </p>

            {/* Save the Date Action Button */}
            <button
              type="button"
              onClick={() => setShowCelebrationPopup(false)}
              className="px-10 py-3.5 rounded-full border border-[#856124]/60 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#2D040F] font-cinzel text-xs font-bold tracking-[0.25em] shadow-[inset_0_2px_3px_rgba(255,255,255,0.85),0_4px_18px_rgba(212,175,55,0.35)] cursor-pointer hover:scale-105 transition-transform"
            >
              SAVE THE DATE
            </button>
          </motion.div>
        </div>,
        document.body
      )}
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
