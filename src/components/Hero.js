"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import FloralOrnament from "./FloralOrnament";

// Card corner ornament subcomponent
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

// Royal Swaying Lanterns with Organic Candlelight Flicker (Unsynchronized)
const SwayingLantern = ({ position }) => {
  const isLeft = position === "left";
  return (
    <motion.div
      animate={{ rotate: isLeft ? [-1.5, 1.5, -1.5] : [1.5, -1.5, 1.5] }}
      transition={{ duration: 11.0, repeat: Infinity, ease: "easeInOut", delay: isLeft ? 0 : 3.2 }}
      style={{ transformOrigin: "top center" }}
      className={`absolute top-0 ${isLeft ? "left-4 md:left-16" : "right-4 md:right-16"} w-12 md:w-20 h-[300px] z-10 pointer-events-none transform-gpu`}
    >
      {/* Hanging Chain */}
      <div className="w-[1px] h-[110px] md:h-[150px] bg-gradient-to-b from-[#856124] via-[#D4AF37] to-[#FCF6BA] mx-auto opacity-75" />
      
      {/* Palace Lantern */}
      <div className="w-9 h-14 md:w-12 md:h-18 mx-auto relative flex flex-col items-center justify-start text-[#D4AF37]">
        {/* Organic Candlelight Glow Halo */}
        <motion.div 
          animate={{ opacity: isLeft ? [0.25, 0.55, 0.3, 0.6, 0.25] : [0.4, 0.2, 0.55, 0.3, 0.4] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: isLeft ? 0 : 2.0 }}
          className="absolute top-2.5 w-8 h-8 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255, 209, 102, 0.55) 0%, transparent 70%)"
          }}
        />
        <svg className="w-full h-full fill-current drop-shadow-[0_2px_5px_rgba(212,175,55,0.4)]" viewBox="0 0 40 60">
          <path d="M 20 2 L 10 15 L 30 15 Z" />
          <path d="M 10 15 L 30 15 L 35 45 L 20 55 L 5 45 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Flame Core */}
          <motion.circle 
            cx="20" cy="32" r="5" 
            animate={{ scale: [1, 1.12, 0.96, 1.08, 1], opacity: [0.85, 1, 0.8, 1, 0.85] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: isLeft ? 0 : 1.5 }}
            className="fill-[#FFEAA7]" 
          />
          <circle cx="20" cy="32" r="3.2" className="fill-[#FFD166]" />
        </svg>
      </div>
    </motion.div>
  );
};

// Arch Frame Placeholder (Photorealistic Arch is present in hero_palace_bg.jpg)
const PalaceArchFrame = () => null;

// Master Luxury Islamic Pavilion Architectural Environment (Using Master Reference Background)
const PalacePavilionBackdrop = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Photorealistic 8K Master Reference Venue Image */}
      <img 
        src="/hero_palace_bg.jpg" 
        alt="Luxury Islamic Wedding Pavilion Venue" 
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transform-gpu scale-[1.01]" 
      />

      {/* 2. Slow Continuous Warm Light Breathing behind Arch */}
      <motion.div
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.99, 1.03, 0.99] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(circle at 50% 45%, rgba(255, 235, 180, 0.32) 0%, rgba(212, 175, 55, 0.12) 35%, transparent 70%)"
        }}
      />
    </div>
  );
};

// Interactive Luxury Typography Name Component (Monogram Transformation & Champagne Light Sweep)
const InteractiveName = ({ fullName, monogram, isBride = false, isMobile }) => {
  const [isTransformed, setIsTransformed] = useState(false);
  const [isShimmering, setIsShimmering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Periodic Idle Champagne Light Sweep (Every ~8.5-10s unsynced between groom and bride)
  useEffect(() => {
    const idleDelay = isBride ? 9500 : 8000;
    const interval = setInterval(() => {
      if (!isTransformed && !prefersReducedMotion) {
        setIsShimmering(true);
        setTimeout(() => setIsShimmering(false), 1400);
      }
    }, idleDelay);

    return () => clearInterval(interval);
  }, [isTransformed, isBride, prefersReducedMotion]);

  const triggerTransformation = () => {
    if (isTransformed || prefersReducedMotion) return;

    setIsShimmering(true);
    setIsTransformed(true);

    // Hold monogram state for ~700ms then smoothly resolve back to full name
    setTimeout(() => {
      setIsTransformed(false);
    }, 700);

    setTimeout(() => {
      setIsShimmering(false);
    }, 1400);
  };

  return (
    <div
      onPointerEnter={!isMobile ? triggerTransformation : undefined}
      onClick={isMobile ? triggerTransformation : undefined}
      className="relative inline-flex items-center justify-center cursor-pointer select-none px-3 py-1 rounded-sm overflow-hidden transform-gpu"
    >
      {/* Light Sweep Highlight Overlay */}
      <motion.div
        animate={
          isShimmering
            ? { x: ["-100%", "200%"], opacity: [0, 0.75, 0] }
            : { x: "-100%", opacity: 0 }
        }
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#FCF6BA]/60 to-transparent skew-x-12 z-20"
      />

      {/* Main Typography Box maintaining fixed layout bounds so text never shifts position */}
      <div className="relative flex items-center justify-center min-h-[46px] md:min-h-[62px]">
        <AnimatePresence mode="wait">
          {!isTransformed ? (
            <motion.h1
              key="fullname"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="font-cormorant text-[46px] md:text-[62px] font-bold text-[#4A081B] tracking-tighter leading-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]"
            >
              {fullName}
            </motion.h1>
          ) : (
            <motion.div
              key="monogram"
              initial={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="font-cormorant text-[46px] md:text-[62px] font-bold text-[#856124] tracking-tighter leading-none drop-shadow-[0_0_12px_rgba(212,175,55,0.6)] flex items-center justify-center gap-1"
            >
              <span>{monogram}</span>
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] inline-block mb-1 shadow-[0_0_8px_#FCF6BA]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Module-level global variable to track if the hero intro has already completed in this session
let globalHeroIntroPlayed = false;

export default function Hero() {
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [introPlayed, setIntroPlayed] = useState(false);

  useEffect(() => {
    if (globalHeroIntroPlayed) {
      setIntroPlayed(true);
    } else {
      const timer = setTimeout(() => {
        globalHeroIntroPlayed = true;
        setIntroPlayed(true);
      }, 6800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const checkMobileVal = typeof window !== "undefined" && window.innerWidth < 768;
    setIsMobile(checkMobileVal);

    // Dynamic pre-distributed gold particles
    const particleCount = checkMobileVal ? 12 : 24;
    const generated = Array.from({ length: particleCount }).map((_, i) => {
      const types = ["dot", "spark", "orb"];
      const type = types[i % types.length];
      
      let size = 1.5;
      let duration = Math.random() * 15 + 15;
      
      if (type === "orb") {
        size = Math.random() * 10 + 4;
        duration = Math.random() * 20 + 20;
      } else if (type === "spark") {
        size = Math.random() * 2.5 + 1.5;
        duration = Math.random() * 12 + 10;
      } else {
        size = Math.random() * 1.5 + 1;
        duration = Math.random() * 18 + 14;
      }

      return {
        id: i,
        left: `${Math.random() * 100}%`,
        size,
        type,
        delay: Math.random() * -10,
        duration,
      };
    });
    setParticles(generated);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setIsWaveActive(true);
      setTimeout(() => setIsWaveActive(false), 2200);
    }, 3800);
    return () => clearInterval(interval);
  }, [isMobile]);

  const handleCardTap = () => {
    setIsCardTapped(true);
    setTimeout(() => setIsCardTapped(false), 1200);
  };

  const handleEnterClick = () => {
    if (isEntering) return;
    setIsEntering(true);
    
    const nextSection = document.getElementById("parents-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
      });
    }

    setTimeout(() => {
      setIsEntering(false);
    }, 1200);
  };

  const scrollRatio = typeof window !== "undefined" ? Math.min(scrollY / 300, 1) : 0;

  return (
    <section 
      style={{
        background: "#4A081B"
      }}
      className="relative h-[100svh] md:min-h-screen flex flex-col items-center justify-center px-4 py-4 md:pt-24 md:pb-12 overflow-hidden z-10"
    >
      
      {/* Custom Styles for GPU animations, paper textures, and backlights */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes silk-haze {
          0% { transform: translate(-10%, -10%) scale(1); }
          50% { transform: translate(8%, 5%) scale(1.08); }
          100% { transform: translate(-10%, -10%) scale(1); }
        }
        .animate-silk-haze {
          animation: silk-haze 28s infinite ease-in-out;
        }

        @keyframes card-float-breathing {
          0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          50% { transform: translateY(-3px) rotateX(0.5deg) rotateY(-0.5deg) rotateZ(0.12deg); }
          100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
        }
        .animate-card-float {
          animation: card-float-breathing 4.0s infinite ease-in-out;
        }

        .hero-vignette {
          background: radial-gradient(circle, rgba(0,0,0,0) 35%, rgba(42,0,12,0.95) 100%);
        }

        @keyframes card-gold-sweep {
          0% { left: -120%; top: -120%; opacity: 0; }
          15% { opacity: 0.45; }
          35% { left: 180%; top: 180%; opacity: 0; }
          100% { left: 180%; top: 180%; opacity: 0; }
        }
        .gold-sweep-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
          overflow: hidden;
          border-radius: 170px 170px 16px 16px;
        }
        .gold-sweep-overlay::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -120%;
          width: 55%;
          height: 200%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(252, 246, 186, 0.35) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(35deg);
          animation: card-gold-sweep 6.5s infinite ease-in-out;
        }

        @keyframes border-shimmer {
          0% { opacity: 0.45; }
          50% { opacity: 0.95; }
          100% { opacity: 0.45; }
        }
        .animate-border-shimmer {
          animation: border-shimmer 6.0s infinite ease-in-out;
        }

        @keyframes fog-drift {
          0% { transform: translateX(-50%) translateY(0px) scale(1); opacity: 0.22; }
          50% { transform: translateX(-25%) translateY(-8px) scale(1.08); opacity: 0.42; }
          100% { transform: translateX(-50%) translateY(0px) scale(1); opacity: 0.22; }
        }
        .animate-fog-drift-1 {
          animation: fog-drift 18s infinite ease-in-out;
        }
        .animate-fog-drift-2 {
          animation: fog-drift 24s infinite ease-in-out;
        }

        @keyframes noor-breathe-1 {
          0% { opacity: 0.55; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.75; transform: translate(-50%, -50%) scale(1.06); }
          100% { opacity: 0.55; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes noor-breathe-2 {
          0% { opacity: 0.75; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.95; transform: translate(-50%, -50%) scale(1.04); }
          100% { opacity: 0.75; transform: translate(-50%, -50%) scale(1); }
        }
        .animate-noor-1 {
          animation: noor-breathe-1 8.0s infinite ease-in-out;
        }
        .animate-noor-2 {
          animation: noor-breathe-2 6.0s infinite ease-in-out;
        }
      `}} />

      {/* Layer 1: Master Architectural Pavilion Environment Backdrop */}
      <PalacePavilionBackdrop />

      {/* Velvet fabric grain overlay (2.5% opacity) */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay z-[2]" 
        style={{ 
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.12) 0.5px, transparent 0.5px)`, 
          backgroundSize: "2px 2px" 
        }} 
      />

      {/* Layer 5: Exact Geometric Diamond Grid & Circular Motif Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-[1]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`, 
          backgroundSize: "60px 60px" 
        }} 
      />

      {/* Swaying Golden lanterns */}
      <SwayingLantern position="left" />
      <SwayingLantern position="right" />

      {/* Corner floral frame ornaments */}
      <FloralOrnament position="top-left" opacity={0.55} />
      <FloralOrnament position="top-right" opacity={0.55} />
      <FloralOrnament position="bottom-left" opacity={0.55} />
      <FloralOrnament position="bottom-right" opacity={0.55} />

      {/* Archway Layer (Photorealistic Arch is rendered in PalacePavilionBackdrop) */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <PalaceArchFrame />
      </div>



      {/* Layer 2: Gold Dust Particles */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1
        }}
        transition={{ 
          opacity: { duration: 1.5, delay: 1.0 }
        }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-[4]"
      >
        {particles.map((p) => {
          let particleEl;
          if (p.type === "orb") {
            particleEl = (
              <div 
                className="rounded-full bg-gradient-to-br from-[#E8C76A]/10 to-transparent blur-[2.5px]"
                style={{ width: p.size, height: p.size }}
              />
            );
          } else if (p.type === "spark") {
            particleEl = (
              <svg width={p.size} height={p.size} viewBox="0 0 24 24" className="text-[#D4AF37]/50 drop-shadow-[0_0_4px_rgba(212,175,55,0.4)]">
                <path d="M 12 2 C 12 2 12 12 2 12 C 12 12 12 22 12 22 C 12 22 12 12 22 12 C 12 12 12 2 12 2 Z" fill="currentColor" />
              </svg>
            );
          } else {
            particleEl = (
              <div 
                className="rounded-full bg-[#FFF8ED]/40"
                style={{ 
                  width: p.size, 
                  height: p.size,
                  boxShadow: "0 0 5px rgba(255, 248, 237, 0.8)" 
                }} 
              />
            );
          }
          return (
            <motion.div
              key={p.id}
              initial={{ y: "105vh", opacity: 0 }}
              animate={{
                y: "-15vh",
                opacity: [0, 0.85, 0.85, 0],
                x: ["0px", `${Math.random() * 100 - 50}px`],
                rotate: ["0deg", `${Math.random() * 360}deg`]
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear",
              }}
              className="absolute pointer-events-none"
              style={{ left: p.left }}
            >
              {particleEl}
            </motion.div>
          );
        })}
      </motion.div>

      {/* ==================================================
          STABLE ARCH-INTEGRATED TEXT CENTERPIECE
          ================================================== */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full text-center select-none pt-0">
        
        {/* Borderless text centerpiece positioned directly inside the architectural arch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ 
            opacity: isEntering ? 0.3 : 1, 
            scale: 1,
            y: 0
          }}
          transition={{ 
            opacity: isEntering ? { duration: 0.4, ease: "easeOut" } : { duration: 1.2, delay: isMobile ? (introPlayed ? 0 : 0.4) : (introPlayed ? 0 : 4.0), ease: [0.215, 0.61, 0.355, 1] },
            scale: { duration: 1.2, delay: isMobile ? (introPlayed ? 0 : 0.4) : (introPlayed ? 0 : 4.0), ease: [0.215, 0.61, 0.355, 1] },
            y: { duration: 1.2, delay: isMobile ? (introPlayed ? 0 : 0.4) : (introPlayed ? 0 : 4.0), ease: [0.215, 0.61, 0.355, 1] }
          }}
          onClick={handleCardTap}
          className="relative w-full max-w-[340px] md:max-w-[440px] px-4 py-2 flex flex-col items-center justify-center pointer-events-auto select-none"
        >
          {/* Sequential text stagger reveals positioned directly inside the background arch */}
          <motion.div 
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.95, delay: isMobile ? (introPlayed ? 0 : 0.8) : (introPlayed ? 0 : 5.0), ease: "easeOut" }}
            className="w-full flex flex-col items-center justify-center text-center z-10"
          >
            {/* Top Islamic star rosette */}
            <div className="w-7 h-7 md:w-9 md:h-9 text-[#856124] mb-2 md:mb-4 relative flex items-center justify-center">
              <svg className="w-full h-full drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" />
                <path d="M 50 25 L 75 50 L 50 75 L 25 50 Z" />
                <circle cx="50" cy="50" r="6" fill="currentColor" />
              </svg>
            </div>

            {/* Families Line */}
            <p className="font-cormorant italic text-[11px] md:text-sm text-[#5C3D1E] tracking-[0.28em] uppercase mb-2 md:mb-4 font-semibold drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
              Together with their families
            </p>

            {/* Groom Label */}
            <p className="font-inter text-[8px] md:text-[9.5px] uppercase tracking-[0.25em] text-[#856124] font-bold mb-0.5 select-none">
              THE GROOM
            </p>

            {/* Groom Name */}
            <InteractiveName 
              fullName="Fawzan" 
              monogram="F." 
              isBride={false} 
              isMobile={isMobile} 
            />

            {/* Star Rosette Divider */}
            <div className="my-2.5 md:my-4 w-full flex items-center justify-center gap-4 relative pointer-events-none">
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 5.8, ease: "easeOut" }}
                style={{ transformOrigin: "right center" }}
                className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-[#856124]/60" 
              />
              <div className="relative flex items-center justify-center">
                <div className="absolute w-10 h-10 rounded-full border border-[#856124]/30 pointer-events-none z-30" />
                <div className="text-[#856124] flex items-center justify-center drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] z-10">
                  <svg className="w-6.5 h-6.5 animate-pulse-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M 50 12 L 61 39 L 88 50 L 61 61 L 50 88 L 39 61 L 12 50 L 39 39 Z" />
                    <circle cx="50" cy="50" r="7.5" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 5.8, ease: "easeOut" }}
                style={{ transformOrigin: "left center" }}
                className="h-[0.5px] w-12 bg-gradient-to-l from-transparent to-[#856124]/60" 
              />
            </div>

            {/* Bride Label */}
            <p className="font-inter text-[8px] md:text-[9.5px] uppercase tracking-[0.25em] text-[#856124] font-bold mb-0.5 select-none">
              THE BRIDE
            </p>

            {/* Bride Name */}
            <InteractiveName 
              fullName="Huda" 
              monogram="H." 
              isBride={true} 
              isMobile={isMobile} 
            />

            {/* Honor request line */}
            <p className="font-inter text-[8px] md:text-[10px] text-[#856124] font-bold uppercase tracking-[0.25em] mb-1.5 md:mb-3">
              Request the honor of your presence
            </p>

            {/* Nikah ceremony description */}
            <p className="font-cormorant italic text-xs md:text-xl text-[#3D2314] font-medium max-w-[240px] md:max-w-[300px] leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              at their blessed Nikah ceremony
            </p>

            {/* Subtle gold line divider */}
            <div className="w-12 h-[0.5px] bg-[#856124]/50 mt-3 mb-2 md:mt-5 md:mb-3 pointer-events-none" />

            {/* Sacred Date Micro-Detail */}
            <p className="font-cinzel text-[8.5px] md:text-[10.5px] tracking-[0.28em] text-[#856124] font-bold">
              09 • 12 • 2026
            </p>
          </motion.div>
        </motion.div>

        {/* Glowing visual connector linking card and medallion CTA on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: isMobile ? (introPlayed ? 0 : 0.8) : (introPlayed ? 0 : 4.3) }}
          className="relative w-8 h-6 flex items-center justify-center pointer-events-none z-10 my-0.5 md:hidden"
        >
          {/* Glowing vertical line */}
          <motion.div
            animate={{
              opacity: [0.4, 0.9, 0.4],
              height: ["12px", "20px", "12px"],
              boxShadow: [
                "0 0 4px rgba(212, 175, 55, 0.35)",
                "0 0 10px rgba(212, 175, 55, 0.75)",
                "0 0 4px rgba(212, 175, 55, 0.35)"
              ]
            }}
            transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1.2px] bg-gradient-to-b from-[#D4AF37] via-[#FFFDF9] to-[#B38728]"
          />
          <div className="absolute top-0 w-1.5 h-1.5 rounded-full bg-[#FFFDF9] border border-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.7)]" />
          <div className="absolute bottom-0 w-1 h-1 rounded-full bg-[#FFFDF9] border border-[#D4AF37] shadow-[0_0_4px_rgba(212,175,55,0.6)]" />
        </motion.div>

        {/* Premium Medallion CTA Button ("TAP TO ENTER") with Refined Continuous Idle Motion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: isMobile ? (introPlayed ? 0 : 0.8) : (introPlayed ? 0 : 4.3) }}
          className="mt-3 md:mt-6 z-20 flex flex-col items-center justify-center pointer-events-auto"
        >
          <motion.button
            onClick={handleEnterClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="w-20 h-20 md:w-[90px] md:h-[90px] rounded-full p-[2.2px] bg-gradient-to-tr from-[#BF953F] via-[#FCF6BA] to-[#B38728] shadow-[0_8px_25px_rgba(212,175,55,0.45),0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_12px_35px_rgba(232,199,106,0.6)] transition-shadow duration-300 relative group flex items-center justify-center cursor-pointer select-none focus:outline-none"
          >
            {/* Center Burgundy Core */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#4A081B] via-[#310411] to-[#1F000A] shadow-[inset_0_2px_5px_rgba(0,0,0,0.65)] flex flex-col items-center justify-center p-2 relative overflow-hidden">
              
              {/* Inner Gold Bead Trim Ring */}
              <div className="absolute inset-[3.5px] border border-dashed border-[#FCF6BA]/35 rounded-full pointer-events-none z-10" />
              
              {/* Gold Light Sweep Across Medallion */}
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 4.0, ease: "linear", delay: 0.5 }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#FCF6BA]/35 to-transparent skew-x-12"
                />
              </div>

              {/* Refined Downward Chevron Movement (2.5px max, 3.2s loop) */}
              <motion.svg 
                animate={{ y: [0, 2.5, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-3.5 h-3.5 text-[#FCF6BA] mb-0.5" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.8" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </motion.svg>

              {/* Engraved Luxury Text */}
              <span className="font-cinzel text-[7px] md:text-[8px] tracking-[0.2em] font-extrabold text-[#FCF6BA] leading-tight text-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                TAP TO<br />ENTER
              </span>
            </div>
          </motion.button>
        </motion.div>

      </div>

      {/* Royal Gold Arch Section Divider */}
      <LuxuryDivider className="absolute bottom-0 left-0 right-0 z-20 translate-y-[15px]" />
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
