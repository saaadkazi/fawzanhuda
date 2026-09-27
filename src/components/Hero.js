"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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

// Royal Swaying Lanterns inside the Hero chamber background (Performance-optimized for mobile 60 FPS)
const SwayingLantern = ({ position }) => {
  const isLeft = position === "left";
  return (
    <motion.div
      animate={{ rotate: isLeft ? [-1.8, 1.8, -1.8] : [1.8, -1.8, 1.8] }}
      transition={{ duration: 9.0, repeat: Infinity, ease: "easeInOut", delay: isLeft ? 0 : 2.5 }}
      style={{ transformOrigin: "top center" }}
      className={`absolute top-0 ${isLeft ? "left-4 md:left-16" : "right-4 md:right-16"} w-12 md:w-20 h-[300px] z-10 pointer-events-none transform-gpu will-change-transform`}
    >
      {/* Hanging Chain (No expensive box shadow) */}
      <div className="w-[1px] h-[110px] md:h-[150px] bg-gradient-to-b from-[#856124] via-[#D4AF37] to-[#FCF6BA] mx-auto opacity-75" />
      
      {/* Intricately detailed vectors representing palace lanterns */}
      <div className="w-9 h-14 md:w-12 md:h-18 mx-auto relative flex flex-col items-center justify-start text-[#D4AF37]">
        {/* Glow halo (Using radial gradient instead of expensive CSS blur filter) */}
        <div 
          className="absolute top-2.5 w-8 h-8 rounded-full opacity-35 animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(255, 209, 102, 0.45) 0%, transparent 70%)"
          }}
        />
        <svg className="w-full h-full fill-current drop-shadow-[0_2px_5px_rgba(212,175,55,0.4)]" viewBox="0 0 40 60">
          <path d="M 20 2 L 10 15 L 30 15 Z" />
          <path d="M 10 15 L 30 15 L 35 45 L 20 55 L 5 45 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Flame core */}
          <circle cx="20" cy="32" r="5" className="fill-[#FFEAA7] animate-pulse" />
          <circle cx="20" cy="32" r="3.2" className="fill-[#FFD166]" />
        </svg>
      </div>
    </motion.div>
  );
};

// Illuminated Islamic Arch Frame surrounding the centerpiece card
const PalaceArchFrame = ({ entering }) => {
  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ 
        scale: entering ? 1.15 : 1, 
        opacity: entering ? 0 : 1,
      }}
      transition={{
        scale: entering ? { duration: 0.85, ease: "easeOut" } : { duration: 2.8, ease: "easeOut" },
        opacity: entering ? { duration: 0.75, ease: "easeOut" } : { duration: 2.2, ease: "easeOut" },
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[84vw] md:w-auto md:max-w-[395px] h-[68vh] md:h-auto pointer-events-none z-0 transform-gpu will-change-transform"
    >
      {/* Arch backlighting bloom */}
      <div className="absolute inset-0 bg-[#D4AF37]/10 blur-[36px] rounded-[150px_150px_24px_24px] animate-pulse-slow" />
      {/* Sacred arch line vectors */}
      <svg className="w-full h-full stroke-current fill-none stroke-[1.2] text-[#D4AF37]/30 drop-shadow-[0_0_10px_rgba(212,175,55,0.45)]" viewBox="0 0 100 150">
        <path d="M 5,150 L 5,45 C 5,15 35,2 50,2 C 65,2 95,15 95,45 L 95,150" />
        <path d="M 9,150 L 9,47 C 9,18 36,6 50,6 C 64,6 90,18 90,47 L 90,150" strokeDasharray="1.5,1.5" strokeWidth="0.5" />
        
        {/* Rosette at Peak */}
        <path d="M 47,4 L 50,1 L 53,4 L 50,7 Z" fill="#D4AF37" opacity="0.8" />
        <circle cx="50" cy="4" r="1.5" fill="#FFFDF9" />
      </svg>
    </motion.div>
  );
};

// Module-level global variable to track if the hero intro has already completed in this session
let globalHeroIntroPlayed = false;

export default function Hero() {
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isWaveActive, setIsWaveActive] = useState(false);
  const [isCardTapped, setIsCardTapped] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [isEntering, setIsEntering] = useState(false);
  const [introPlayed, setIntroPlayed] = useState(false);

  // Buttery-smooth hardware accelerated hover spring configurations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 90, damping: 22 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const layer1X = useTransform(smoothX, (x) => x * 4.5);
  const layer1Y = useTransform(smoothY, (y) => y * 4.5);

  const layer2X = useTransform(smoothX, (x) => x * 8);
  const layer2Y = useTransform(smoothY, (y) => y * 8);

  const layer3X = useTransform(smoothX, (x) => x * 14);
  const layer3Y = useTransform(smoothY, (y) => y * 14);

  const rotateX = useTransform(smoothY, (y) => isMobile ? 0 : -y * 3.5);
  const rotateY = useTransform(smoothX, (x) => isMobile ? 0 : x * 3.5);

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
    setMounted(true);
    const checkMobileVal = typeof window !== "undefined" && window.innerWidth < 768;
    setIsMobile(checkMobileVal);

    // Dynamic pre-distributed gold particles
    const particleCount = checkMobileVal ? 24 : 48;
    const generated = Array.from({ length: particleCount }).map((_, i) => {
      const types = ["dot", "spark", "orb"];
      const type = types[i % types.length];
      
      let size = 1.5;
      let duration = Math.random() * 15 + 15;
      
      if (type === "orb") {
        size = Math.random() * 14 + 6;
        duration = Math.random() * 20 + 20;
      } else if (type === "spark") {
        size = Math.random() * 3 + 1.5;
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

    const handlePointerMove = (e) => {
      if (window.innerWidth < 768) return; // Desktop mouse tilt only
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
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

  const splitName = (name, parentVariant, isBride = false) => {
    return (
      <motion.span variants={parentVariant} className="inline-flex justify-center flex-wrap gap-x-1 select-none">
        {name.split("").map((char, index) => {
          const delayOffset = isBride ? 0.6 + index * 0.08 : index * 0.08;

          return (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  filter: "blur(0px)", 
                  transition: { duration: 0.45, ease: "easeOut" } 
                }
              }}
              animate={
                isMobile && isWaveActive
                  ? {
                      y: [0, -7, 0],
                      color: ["#4A081B", "#D4AF37", "#4A081B"],
                      textShadow: [
                        "0 0 0px rgba(212, 175, 55, 0)",
                        "0 0 12px rgba(212, 175, 55, 0.85)",
                        "0 0 0px rgba(212, 175, 55, 0)"
                      ]
                    }
                  : "visible"
              }
              transition={
                isMobile && isWaveActive
                  ? {
                      duration: 0.85,
                      delay: delayOffset,
                      ease: "easeInOut"
                    }
                  : { duration: 0.45, ease: "easeOut" }
              }
              whileHover={
                !isMobile
                  ? {
                      y: -8,
                      color: "#D4AF37",
                      textShadow: "0 0 12px rgba(212, 175, 55, 0.85)",
                      transition: { type: "spring", stiffness: 350, damping: 14 }
                    }
                  : {}
              }
              className="inline-block cursor-default font-bold drop-shadow-[0_0_8px_rgba(212,175,55,0.25)] tracking-tighter transition-all duration-300"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </motion.span>
    );
  };

  const groomStagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: isMobile ? (introPlayed ? 0 : 1.0) : (introPlayed ? 0 : 5.2) }
    }
  };

  const brideStagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: isMobile ? (introPlayed ? 0 : 1.8) : (introPlayed ? 0 : 6.3) }
    }
  };

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

      {/* Layer 1: Dark Vignette Edge Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[5] hero-vignette" />

      {/* Velvet fabric grain overlay (2.5% opacity) */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay z-[2]" 
        style={{ 
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.12) 0.5px, transparent 0.5px)`, 
          backgroundSize: "2px 2px" 
        }} 
      />

      {/* Layer 2: Exact Geometric Diamond Grid & Circular Motif Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.045] pointer-events-none z-[1]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`, 
          backgroundSize: "60px 60px" 
        }} 
      />

      {/* Cinematic Mystical Drifting Fog Layers at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[200px] pointer-events-none overflow-hidden z-[4] opacity-[0.3]">
        <div className="absolute bottom-[-50px] left-0 w-full h-[150px] bg-gradient-to-t from-[#8a1538] via-[#4a0218]/45 to-transparent blur-[40px] animate-fog-drift-1" />
        <div className="absolute bottom-[-80px] left-[-20%] w-full h-[180px] bg-gradient-to-t from-[#D4AF37]/25 via-[#4a0218]/30 to-transparent blur-[50px] animate-fog-drift-2" style={{ animationDelay: "-6s" }} />
      </div>

      {/* Swaying Golden lanterns */}
      <SwayingLantern position="left" />
      <SwayingLantern position="right" />

      {/* Corner floral frame ornaments */}
      <FloralOrnament position="top-left" opacity={0.65} />
      <FloralOrnament position="top-right" opacity={0.65} />
      <FloralOrnament position="bottom-left" opacity={0.65} />
      <FloralOrnament position="bottom-right" opacity={0.65} />

      {/* ==================================================
          PARALLAX LAYER 1 (0.2x): BACKGROUND PALACE & ARCHES
          ================================================== */}
      <motion.div 
        style={{
          x: layer1X,
          y: layer1Y
        }}
        className="absolute inset-0 z-[2] pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D040F]/90 via-transparent to-transparent pointer-events-none" />
        
        {/* Core Illuminated Palace Archway */}
        <PalaceArchFrame entering={isEntering} />
      </motion.div>



      {/* ==================================================
          PARALLAX LAYER 2 (0.5x): GOLD PARTICLES LAYER
          ================================================== */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1
        }}
        transition={{ 
          opacity: { duration: 1.5, delay: 1.0 }
        }}
        style={{
          x: layer2X,
          y: layer2Y
        }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-[4] transform-gpu will-change-transform"
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
          PARALLAX LAYER 3 (1.0x): CARD CENTERPIECE WITH INTRO
          ================================================== */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full text-center select-none pt-0">
        
        {/* Large layered glowing Islamic arch frame around card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
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
          whileTap={{ scale: 0.992 }}
          style={{
            x: layer3X,
            y: layer3Y,
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
          className={`relative w-[80vw] h-[64svh] md:w-auto md:max-w-[365px] md:h-auto p-[2px] md:p-[4px] bg-gradient-to-tr from-[#BF953F] via-[#FCF6BA] to-[#B38728] rounded-[126px_126px_18px_18px] md:rounded-[162px_162px_22px_22px] shadow-[0_25px_60px_-15px_rgba(32,3,10,0.65),0_0_35px_rgba(212,175,55,0.25)] flex flex-col items-center justify-center overflow-hidden cursor-pointer transform-gpu will-change-transform ${isMobile ? "animate-card-float" : ""}`}
        >
          {/* Inner illuminated glow halo */}
          <div className="absolute inset-[0.5px] border border-[#FFFDF9]/45 rounded-[125.5px_125.5px_17.5px_17.5px] md:rounded-[161.5px_161.5px_21.5px_21.5px] pointer-events-none z-10 animate-border-shimmer" />

          {/* Inner Ivory Textured Invitation Card */}
          <div className="relative w-full h-full bg-gradient-to-br from-[#FFFFFF] via-[#FFFDF9] to-[#F7F2E8] px-5 md:px-8 pt-9 md:pt-12 pb-5 md:pb-8 rounded-[124px_124px_16px_16px] md:rounded-[158px_158px_18px_18px] border border-[#856124]/30 shadow-[inset_0_1.5px_4px_rgba(255,255,255,0.95)] flex flex-col items-center justify-between overflow-hidden">
            {/* Elegant Islamic card corner frame ornaments for depth */}
            <CardCornerOrnament position="top-left" />
            <CardCornerOrnament position="top-right" />
            <CardCornerOrnament position="bottom-left" />
            <CardCornerOrnament position="bottom-right" />

            {/* Paper Grain Texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0" 
                 style={{ 
                   backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.15) 0.5px, transparent 0.5px)`, 
                   backgroundSize: "3px 3px" 
                 }} />
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply z-0"
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)'/%3E%3C/svg%3E")`
                 }} />

            {/* Card Center Rosette Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none z-0">
              <svg className="w-48 h-48 text-[#D4AF37]" viewBox="0 0 100 100" fill="currentColor">
                <path d="M 50,0 C 77.6,0 100,22.4 100,50 C 100,77.6 77.6,100 50,100 C 22.4,100 0,77.6 0,50 C 0,22.4 22.4,0 50,0 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M 50,10 L 61,39 L 90,50 L 61,61 L 50,90 L 39,61 L 10,50 L 39,39 Z" />
                <path d="M 50,20 L 59,41 L 80,50 L 59,59 L 50,80 L 41,59 L 20,50 L 41,41 Z" opacity="0.7" />
              </svg>
            </div>

          {/* Gold sweep dynamic foil reflection light */}
          <div className="gold-sweep-overlay" />

          {/* Floral Corner Ornaments inside card bottom */}
          <FloralOrnament position="bottom-left" opacity={0.35} />
          <FloralOrnament position="bottom-right" opacity={0.35} />

          {/* Golden inner arch border lining with border shimmer */}
          <div className="absolute inset-[10px] border border-[#D4AF37]/25 rounded-[170px_170px_16px_16px] pointer-events-none z-10 animate-border-shimmer" />
          <div className="absolute inset-[13px] border border-dashed border-[#D4AF37]/15 rounded-[167px_167px_13px_13px] pointer-events-none z-10 animate-border-shimmer" style={{ animationDelay: "1.5s" }} />

          {/* Tap gold glow bloom pulse */}
          <motion.div
            animate={
              isCardTapped
                ? { opacity: [0, 0.5, 0], scale: [0.98, 1.02, 0.98] }
                : { opacity: [0, 0.35, 0] }
            }
            transition={
              isCardTapped 
                ? { duration: 1.0, ease: "easeInOut" } 
                : { delay: 4.2, duration: 1.8, ease: "easeInOut" }
            }
            className="absolute inset-0 bg-[#D4AF37]/5 rounded-[170px_170px_16px_16px] pointer-events-none z-0 blur-xl"
          />

          {/* Sequential text stagger reveals */}
          <motion.div 
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.95, delay: isMobile ? (introPlayed ? 0 : 0.8) : (introPlayed ? 0 : 5.0), ease: "easeOut" }}
            className="w-full flex-1 flex flex-col items-center justify-between z-10"
          >
            
            {/* Top Islamic star rosette */}
            <div className="w-6.5 h-6.5 md:w-10 md:h-10 text-brand-gold mb-2.5 md:mb-6 relative">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" />
                <path d="M 50 25 L 75 50 L 50 75 L 25 50 Z" />
                <circle cx="50" cy="50" r="6" fill="currentColor" />
              </svg>
            </div>

            {/* Families Line */}
            <p className="font-cormorant italic text-[10px] md:text-sm text-brand-body tracking-[0.25em] uppercase mb-1.5 md:mb-5">
              Together with their families
            </p>

            {/* Groom Label */}
            <p className="font-inter text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-0.5 select-none">
              THE GROOM
            </p>

            {/* Groom Name */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={groomStagger}
              className="font-cormorant text-[42px] md:text-[56px] font-bold text-[#4A081B] tracking-tighter leading-none"
            >
              {splitName("Fawzan", groomStagger, false)}
            </motion.h1>

            {/* Star Rosette Divider */}
            <div className="my-2.5 md:my-5 w-full flex items-center justify-center gap-4 relative pointer-events-none">
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 5.8, ease: "easeOut" }}
                style={{ transformOrigin: "right center" }}
                className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" 
              />
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={
                    isCardTapped
                      ? { scale: [1, 2.0, 1], opacity: [0.95, 0] }
                      : { scale: 1, opacity: 0 }
                  }
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute w-12 h-12 rounded-full border border-[#D4AF37] pointer-events-none z-30"
                />
                <div className="text-[#D4AF37] flex items-center justify-center drop-shadow-[0_0_10px_rgba(212,175,55,0.65)] z-10">
                  <svg className="w-8 h-8 animate-pulse-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
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
                className="h-[0.5px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" 
              />
            </div>

            {/* Bride Label */}
            <p className="font-inter text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-0.5 select-none">
              THE BRIDE
            </p>

            {/* Bride Name */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={brideStagger}
              className="font-cormorant text-[42px] md:text-[56px] font-bold text-[#4A081B] tracking-tighter leading-none mb-1 md:mb-4"
            >
              {splitName("Huda", brideStagger, true)}
            </motion.h1>

            {/* Honor request line */}
            <p className="font-inter text-[8px] md:text-[10px] text-brand-gold font-bold uppercase tracking-[0.25em] mb-1.5 md:mb-4">
              Request the honor of your presence
            </p>

            {/* Nikah ceremony description */}
            <p className="font-cormorant italic text-xs md:text-xl text-brand-body max-w-[240px] md:max-w-[280px] leading-relaxed">
              at their blessed Nikah ceremony
            </p>

            {/* Subtle gold line divider */}
            <div className="w-12 h-[0.5px] bg-[#D4AF37]/50 mt-4.5 mb-2.5 md:mt-6 md:mb-4 pointer-events-none" />

            {/* Sacred Date Micro-Detail */}
            <p className="font-cinzel text-[8px] md:text-[9.5px] tracking-[0.25em] text-[#856124] font-bold">
              09 • 12 • 2026
            </p>
            </motion.div>
          </div>
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

        {/* Premium Medallion CTA Button ("TAP TO ENTER") */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ 
            opacity: 1, 
            scale: isEntering ? 0.96 : [1, 1.03, 1],
            y: scrollRatio * 15
          }}
          transition={{ 
            opacity: { duration: 1.0, delay: isMobile ? (introPlayed ? 0 : 0.8) : (introPlayed ? 0 : 4.3), ease: "easeOut" },
            scale: { repeat: Infinity, duration: 3.0, ease: "easeInOut" }
          }}
          className="mt-1 z-20 md:mt-6 flex flex-col items-center justify-center pointer-events-auto"
        >
          <motion.button
            onClick={handleEnterClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 450, damping: 15 }}
            className="w-20 h-20 md:w-[90px] md:h-[90px] rounded-full p-[2.2px] bg-gradient-to-tr from-[#BF953F] via-[#FCF6BA] to-[#B38728] shadow-[0_8px_25px_rgba(212,175,55,0.45),0_0_15px_rgba(212,175,55,0.15),inset_0_1.5px_2px_rgba(255,255,255,0.85)] hover:shadow-[0_12px_35px_rgba(232,199,106,0.6)] transition-shadow duration-300 relative group flex items-center justify-center cursor-pointer select-none focus:outline-none"
          >
            {/* Center burgundy core */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#4A081B] via-[#310411] to-[#1F000A] shadow-[inset_0_2px_5px_rgba(0,0,0,0.65)] flex flex-col items-center justify-center p-2 relative overflow-hidden">
              
              {/* Inner gold bead trim ring */}
              <div className="absolute inset-[3.5px] border border-dashed border-[#FCF6BA]/35 rounded-full pointer-events-none z-10" />
              
              {/* Gold light sweep across medallion */}
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "linear", delay: 0.5 }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#FCF6BA]/35 to-transparent skew-x-12"
                />
              </div>

              {/* Bouncing Gold chevron arrow */}
              <svg className="w-3.5 h-3.5 text-[#FCF6BA] animate-bounce mb-0.5" fill="none" stroke="currentColor" strokeWidth="2.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>

              {/* Engraved luxury text */}
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
