"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FloralOrnament from "./FloralOrnament";

// Card corner ornament subcomponent
const CardCornerOrnament = ({ position }) => {
  const classMap = {
    "top-left": "top-4 left-4 rotate-0",
    "top-right": "top-4 right-4 rotate-90",
    "bottom-left": "bottom-4 left-4 -rotate-90",
    "bottom-right": "bottom-4 right-4 rotate-180",
  };
  return (
    <div className={`absolute w-7 h-7 text-[#D4AF37]/35 pointer-events-none z-10 ${classMap[position]}`}>
      <svg className="w-full h-full" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M 0,0 L 40,0 M 0,0 L 0,40" />
        <path d="M 6,6 C 12,6 16,12 16,16 C 16,20 20,24 24,24" strokeDasharray="1.5,1.5" />
        <circle cx="6" cy="6" r="1.2" fill="currentColor" />
      </svg>
    </div>
  );
};

// Pointed Islamic Arch Outline vector with slow breathing float
const ArchOutline = ({ className, delay = 0, scale = 1, opacity = 0.2, entering = false }) => {
  return (
    <motion.div
      initial={{ scale: scale * 0.72, opacity: 0 }}
      animate={{ 
        scale: entering ? scale * 1.45 : scale, 
        opacity: entering ? 0 : opacity,
      }}
      transition={{
        scale: entering ? { duration: 0.85, ease: "easeOut" } : { duration: 2.8, delay, ease: [0.25, 1, 0.36, 1] },
        opacity: entering ? { duration: 0.75, ease: "easeOut" } : { duration: 2.5, delay, ease: "easeOut" },
      }}
      className={`absolute pointer-events-none text-[#D4AF37]/15 flex items-center justify-center ${className}`}
    >
      <svg className="w-full h-full stroke-current fill-none stroke-[0.35]" viewBox="0 0 100 150">
        <path d="M 5,150 L 5,45 C 5,15 35,2 50,2 C 65,2 95,15 95,45 L 95,150" />
        <path d="M 10,150 L 10,47 C 10,18 36,6 50,6 C 64,6 90,18 90,47 L 90,150" strokeDasharray="1.5,1.5" strokeWidth="0.15" />
      </svg>
    </motion.div>
  );
};

// Palace silhouette back layer vector
const PalaceSilhouette = () => {
  return (
    <div className="absolute inset-0 flex items-end justify-center opacity-[0.015] pointer-events-none z-0 pb-16">
      <svg className="w-5/6 max-w-[850px] h-auto text-[#D4AF37] fill-current" viewBox="0 0 100 65" preserveAspectRatio="none">
        <path d="M 0 65 L 0 52 Q 10 50 15 42 Q 22 32 32 32 Q 42 32 50 18 Q 58 32 68 32 Q 78 32 85 42 Q 90 50 100 52 L 100 65 Z" />
      </svg>
    </div>
  );
};

export default function Hero() {
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isWaveActive, setIsWaveActive] = useState(false);
  const [isCardTapped, setIsCardTapped] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Screen resize checking
    const checkMobileVal = typeof window !== "undefined" && window.innerWidth < 768;
    setIsMobile(checkMobileVal);

    // Generate soft luxury particles (dots, sparks, orbs)
    const particleCount = checkMobileVal ? 10 : 22; // Restrained count
    const generated = Array.from({ length: particleCount }).map((_, i) => {
      const types = ["dot", "spark", "orb"];
      const type = types[i % types.length];
      
      let size = 1.5;
      let duration = Math.random() * 15 + 15; // Extremely slow (15-30 seconds)
      
      if (type === "orb") {
        size = Math.random() * 16 + 8; // larger bokeh orbs
        duration = Math.random() * 20 + 20; // very slow
      } else if (type === "spark") {
        size = Math.random() * 3 + 2;
        duration = Math.random() * 12 + 10;
      } else {
        size = Math.random() * 1.5 + 1; // tiny dots
        duration = Math.random() * 18 + 14;
      }

      return {
        id: i,
        left: `${Math.random() * 100}%`,
        size,
        type,
        delay: Math.random() * -10, // pre-distributed
        duration,
      };
    });
    setParticles(generated);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    // Pointer move listener for 3D parallax (mouse on desktop, drag/touch on mobile)
    const handlePointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const x = (clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      
      setPointer({ x, y });
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    // Scroll listener for hero exit transition
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Looping wave timeline on mobile every 3.8 seconds
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
    
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight * 0.95,
        behavior: "smooth"
      });
      setTimeout(() => {
        setIsEntering(false);
      }, 1000);
    }, 850);
  };

  // Scroll ratio for smooth scroll triggers (lifts card, expands glow)
  const scrollRatio = typeof window !== "undefined" ? Math.min(scrollY / 300, 1) : 0;

  // Characters split helper for letter-by-letter reveal & spring hover waves
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
              className="inline-block cursor-default font-semibold drop-shadow-[0_0_8px_rgba(212,175,55,0.25)] tracking-wide transition-all duration-300"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </motion.span>
    );
  };

  // Text Stagger Timelines aligned to trigger AFTER card intro (delays adjusted to 5.2s and 6.5s)
  const groomStagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 5.2 }
    }
  };

  const brideStagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 6.3 }
    }
  };

  return (
    <section 
      style={{
        background: "radial-gradient(circle at center, #7a1738 0%, #5d001f 55%, #3b0014 100%)"
      }}
      className="relative min-h-screen flex items-center justify-center px-4 py-16 md:py-24 overflow-hidden z-10"
    >
      
      {/* Custom Styles for GPU floating animations, silk haze, and shadows */}
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
          0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
          50% { transform: translateY(-8px) rotateX(0.4deg) rotateY(-0.4deg); }
          100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
        }
        .animate-card-float {
          animation: card-float-breathing 7.5s infinite ease-in-out;
        }

        .hero-vignette {
          background: radial-gradient(circle, rgba(0,0,0,0) 45%, rgba(15,0,5,0.85) 100%);
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
      `}} />

      {/* Layer 1: Vignette Edge Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[5] hero-vignette" />

      {/* Layer 2: Silk Haze Ambient Atmospheric layer (3% opacity) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.035] z-[1]">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_30%_30%,#7a1738_0%,transparent_50%),radial-gradient(circle_at_70%_70%,#D4AF37_0%,transparent_50%)] animate-silk-haze" />
      </div>

      {/* Layer 3: Watermark Geometric Pattern (2.5% opacity) */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none z-[1]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`, 
          backgroundSize: "60px 60px" 
        }} 
      />

      {/* Corner floral frame ornaments */}
      <FloralOrnament position="top-left" opacity={0.65} />
      <FloralOrnament position="top-right" opacity={0.65} />
      <FloralOrnament position="bottom-left" opacity={0.65} />
      <FloralOrnament position="bottom-right" opacity={0.65} />

      {/* ==================================================
          PARALLAX LAYER 1 (0.2x): BACKGROUND PALACE & ARCHES
          ================================================== */}
      <motion.div 
        animate={{
          x: pointer.x * 4.5,
          y: pointer.y * 4.5
        }}
        transition={{ type: "spring", stiffness: 85, damping: 26 }}
        className="absolute inset-0 z-[2] pointer-events-none"
      >
        <PalaceSilhouette />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D040F]/90 via-transparent to-transparent pointer-events-none" />
        
        {/* Layer 4: Soft-Drawing Islamic Arch Outlines */}
        <ArchOutline className="w-[280px] h-[420px] md:w-[480px] md:h-[720px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" scale={0.72} opacity={0.12} delay={2.0} entering={isEntering} />
        <ArchOutline className="w-[360px] h-[540px] md:w-[620px] md:h-[930px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" scale={1.0} opacity={0.2} delay={2.3} entering={isEntering} />
        <ArchOutline className="w-[450px] h-[675px] md:w-[800px] md:h-[1200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" scale={1.35} opacity={0.08} delay={2.6} entering={isEntering} />
      </motion.div>

      {/* ==================================================
          NOOR LIGHT GLOW (Layered Divine Backlighting)
          ================================================== */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[3] w-[450px] h-[650px] flex items-center justify-center">
        {/* Outer Soft Gold Glow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            scale: isEntering ? 1.35 : (1 + (scrollRatio * 0.18)),
            opacity: isEntering ? 0.9 : ((0.35 + (scrollRatio * 0.12)) * (mounted ? 1 : 0)),
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-[360px] h-[520px] rounded-[180px_180px_60px_60px] bg-gradient-to-b from-[#D4AF37] to-transparent blur-[80px]"
          style={{
            transform: "translate(-50%, -50%)"
          }}
        />
        {/* Inner Warm Ivory Glow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            scale: isEntering ? 1.25 : (1 + (scrollRatio * 0.15)),
            opacity: isEntering ? 0.95 : ((0.55 + (scrollRatio * 0.15)) * (mounted ? 1 : 0)),
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-[270px] h-[390px] rounded-[135px_135px_40px_40px] bg-gradient-to-b from-[#FFFDF9] to-transparent blur-[48px]"
          style={{
            transform: "translate(-50%, -50%)"
          }}
        />
      </div>

      {/* ==================================================
          PARALLAX LAYER 2 (0.5x): GOLD PARTICLES LAYER
          ================================================== */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          x: pointer.x * 8,
          y: pointer.y * 8
        }}
        transition={{ 
          opacity: { duration: 1.5, delay: 1.0 },
          x: { type: "spring", stiffness: 85, damping: 26 },
          y: { type: "spring", stiffness: 85, damping: 26 }
        }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-[4]"
      >
        {particles.map((p) => {
          let particleEl;
          if (p.type === "orb") {
            // Soft bokeh orb
            particleEl = (
              <div 
                className="rounded-full bg-gradient-to-br from-[#E8C76A]/10 to-transparent blur-[2.5px]"
                style={{ width: p.size, height: p.size }}
              />
            );
          } else if (p.type === "spark") {
            // Diamond glowing star spark
            particleEl = (
              <svg width={p.size} height={p.size} viewBox="0 0 24 24" className="text-[#D4AF37]/50 drop-shadow-[0_0_4px_rgba(212,175,55,0.4)]">
                <path d="M 12 2 C 12 2 12 12 2 12 C 12 12 12 22 12 22 C 12 22 12 12 22 12 C 12 12 12 2 12 2 Z" fill="currentColor" />
              </svg>
            );
          } else {
            // Glowing micro dot
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
                opacity: [0, 0.75, 0.75, 0],
                x: ["0px", `${Math.random() * 80 - 40}px`]
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
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full text-center select-none pt-2">
        
        {/* Ivory textured card body with 3D bevel gold lining */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={{ 
            opacity: 1, 
            y: (pointer.y * 14) + (-scrollRatio * 25) + (isEntering ? -20 : 0), // Scroll + Tap lifts card
            x: pointer.x * 14,
            scale: isEntering ? 1.06 : 1.01,
            rotateX: (-pointer.y * 3.5) + (isEntering ? -2 : 0),
            rotateY: (pointer.x * 3.5) + (isEntering ? 2 : 0)
          }}
          transition={{ 
            opacity: { duration: 1.4, delay: 4.0, ease: "easeOut" },
            y: { type: "spring", stiffness: 85, damping: 26 },
            x: { type: "spring", stiffness: 85, damping: 26 },
            scale: { duration: 0.8, ease: "easeOut" },
            rotateX: { type: "spring", stiffness: 85, damping: 26 },
            rotateY: { type: "spring", stiffness: 85, damping: 26 }
          }}
          onClick={handleCardTap}
          whileTap={{ scale: 0.995 }}
          className={`relative w-full max-w-[345px] md:max-w-[410px] bg-gradient-to-br from-[#FFFFFF] via-[#FFFDF9] to-[#F7F2E8] px-6 md:px-8 pt-12 md:pt-16 pb-8 md:pb-12 rounded-[180px_180px_24px_24px] border-[2px] border-t-[#FCF6BA] border-l-[#DFCA98] border-r-[#B38728] border-b-[#856124] shadow-[0_25px_60px_-15px_rgba(32,3,10,0.65),0_0_40px_rgba(212,175,55,0.06),inset_0_1px_3px_rgba(255,255,255,0.9),inset_0_0_20px_rgba(212,175,55,0.05)] flex flex-col items-center overflow-hidden cursor-pointer animate-card-float`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Elegant Islamic card corner frame ornaments for depth */}
          <CardCornerOrnament position="top-left" />
          <CardCornerOrnament position="top-right" />
          <CardCornerOrnament position="bottom-left" />
          <CardCornerOrnament position="bottom-right" />

          {/* Paper Grain Texture (Mix-blend multiplier layer for tactile feel) */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0" 
               style={{ 
                 backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.15) 0.5px, transparent 0.5px)`, 
                 backgroundSize: "3px 3px" 
               }} />
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply z-0"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)'/%3E%3C/svg%3E")`
               }} />

          {/* Gold sweep dynamic foil light overlay */}
          <div className="gold-sweep-overlay" />

          {/* Floral Corner Ornaments inside bottom edges of the card */}
          <FloralOrnament position="bottom-left" opacity={0.35} />
          <FloralOrnament position="bottom-right" opacity={0.35} />

          {/* Golden inner arch border lining */}
          <div className="absolute inset-[10px] border border-[#D4AF37]/25 rounded-[170px_170px_16px_16px] pointer-events-none z-10" />
          <div className="absolute inset-[13px] border border-dashed border-[#D4AF37]/15 rounded-[167px_167px_13px_13px] pointer-events-none z-10" />

          {/* Soft wave of gold glow pulse that washes card face on card tap */}
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

          {/* Sequential stagger reveals for content (Sharpens text and fades in at 5s) */}
          <motion.div 
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.95, delay: 5.0, ease: "easeOut" }}
            className="w-full flex flex-col items-center z-10"
          >
            
            {/* Top Islamic Icon ornament */}
            <div className="w-8 h-8 md:w-10 md:h-10 text-brand-gold mb-4 md:mb-6 relative">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" />
                <path d="M 50 25 L 75 50 L 50 75 L 25 50 Z" />
                <circle cx="50" cy="50" r="6" fill="currentColor" />
              </svg>
            </div>

            {/* Families Line */}
            <p className="font-cormorant italic text-xs md:text-sm text-brand-body tracking-[0.25em] uppercase mb-4 md:mb-5">
              Together with their families
            </p>

            {/* Groom Label */}
            <p className="font-inter text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-1 select-none">
              THE GROOM
            </p>

            {/* Groom Name (starts at 5.2s) */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={groomStagger}
              className="font-cormorant text-3.5xl md:text-5xl font-semibold text-[#4A081B] tracking-wide"
            >
              {splitName("Fauzan", groomStagger, false)}
            </motion.h1>

            {/* Premium Gold Star Rosette Divider */}
            <div className="my-4 md:my-5 w-full flex items-center justify-center gap-4 relative pointer-events-none">
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 5.8, ease: "easeOut" }}
                style={{ transformOrigin: "right center" }}
                className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" 
              />
              <div className="relative flex items-center justify-center">
                {/* Tap Sparkle ring expanding */}
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
            <p className="font-inter text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-1 select-none">
              THE BRIDE
            </p>

            {/* Bride Name (starts at 6.3s) */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={brideStagger}
              className="font-cormorant text-3.5xl md:text-5xl font-semibold text-[#4A081B] tracking-wide mb-4 md:mb-6"
            >
              {splitName("Huda", brideStagger, true)}
            </motion.h1>

            {/* Honor request line */}
            <p className="font-inter text-[8px] md:text-[10px] text-brand-gold font-bold uppercase tracking-[0.25em] mb-3 md:mb-4">
              Request the honor of your presence
            </p>

            {/* Nikah ceremony */}
            <p className="font-cormorant italic text-base md:text-xl text-brand-body max-w-[240px] md:max-w-[280px] leading-relaxed">
              at their blessed Nikah ceremony
            </p>
          </motion.div>
        </motion.div>

        {/* Premium Medallion CTA Button ("TAP TO ENTER") */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: scrollRatio * 15 // smooth lift shift on scroll
          }}
          transition={{ duration: 1.0, delay: 6.8, ease: "easeOut" }}
          className="mt-8 md:mt-12 flex flex-col items-center justify-center pointer-events-auto z-20"
        >
          <motion.button
            onClick={handleEnterClick}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 450, damping: 15 }}
            className="w-20 h-20 md:w-[90px] md:h-[90px] rounded-full p-[2.2px] bg-gradient-to-tr from-[#BF953F] via-[#FCF6BA] to-[#B38728] shadow-[0_8px_25px_rgba(212,175,55,0.4),0_0_15px_rgba(212,175,55,0.15),inset_0_1.5px_2px_rgba(255,255,255,0.85)] hover:shadow-[0_12px_35px_rgba(232,199,106,0.6)] transition-shadow duration-300 relative group flex items-center justify-center cursor-pointer select-none focus:outline-none"
            style={{
              animation: "card-float-breathing 4.5s infinite ease-in-out"
            }}
          >
            {/* Center burgundy core */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#4A081B] via-[#310411] to-[#1F000A] shadow-[inset_0_2px_5px_rgba(0,0,0,0.65)] flex flex-col items-center justify-center p-2 relative overflow-hidden">
              
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
