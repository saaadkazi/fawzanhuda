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
const ArchOutline = ({ className, delay = 0, scale = 1, opacity = 0.2 }) => {
  return (
    <motion.div
      initial={{ scale: scale * 0.7, opacity: 0, filter: "blur(8px)" }}
      animate={{ 
        scale: scale, 
        opacity: opacity,
        filter: "blur(0px)",
        y: [0, -10, 0] 
      }}
      transition={{
        scale: { duration: 2.8, delay, ease: [0.25, 1, 0.36, 1] },
        opacity: { duration: 2.5, delay, ease: "easeOut" },
        y: { duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: delay * 1.5 }
      }}
      className={`absolute pointer-events-none text-brand-gold/25 flex items-center justify-center ${className}`}
    >
      <svg className="w-full h-full stroke-current fill-none stroke-[0.4]" viewBox="0 0 100 150">
        <path d="M 5,150 L 5,45 C 5,15 35,2 50,2 C 65,2 95,15 95,45 L 95,150" />
        <path d="M 10,150 L 10,47 C 10,18 36,6 50,6 C 64,6 90,18 90,47 L 90,150" strokeDasharray="1.5,1.5" strokeWidth="0.2" />
      </svg>
    </motion.div>
  );
};

// Palace silhouette back layer vector
const PalaceSilhouette = () => {
  return (
    <div className="absolute inset-0 flex items-end justify-center opacity-[0.025] pointer-events-none z-0 pb-12">
      <svg className="w-5/6 max-w-[850px] h-auto text-brand-gold fill-current" viewBox="0 0 100 65" preserveAspectRatio="none">
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Screen resize checking
    const checkMobileVal = typeof window !== "undefined" && window.innerWidth < 768;
    setIsMobile(checkMobileVal);

    // Generate soft drifting particles (rose petals, stars, sparks, dust - reduced by 60% on mobile: 32 -> 12)
    const particleCount = checkMobileVal ? 12 : 32;
    const generated = Array.from({ length: particleCount }).map((_, i) => {
      const types = ["petal", "spark", "dust", "star"];
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        type: types[Math.floor(Math.random() * types.length)],
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 7,
      };
    });
    setParticles(generated);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    // Mouse position listener for 3D parallax
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 32,
        y: (e.clientY - window.innerHeight / 2) / 32,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
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

  // Text Reveal stagger timelines
  const groomStagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 1.4 }
    }
  };

  const brideStagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 3.0 }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden velvet-silk-bg z-10">
      
      {/* Low-opacity repeating Islamic geometric pattern watermark (matches light theme) */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none z-0" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`, 
             backgroundSize: "60px 60px" 
           }} />

      {/* Ambient dynamic diagonal light sweep */}
      <div className="ambient-light-sweep" />
      
      {/* Corner floral frame ornaments */}
      <FloralOrnament position="top-left" opacity={0.65} />
      <FloralOrnament position="top-right" opacity={0.65} />
      <FloralOrnament position="bottom-left" opacity={0.65} />
      <FloralOrnament position="bottom-right" opacity={0.65} />

      {/* ==================================================
          BACK LAYER: SILHOUETTES & ARCHES
          ================================================== */}
      <PalaceSilhouette />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2D040F]/95 via-transparent to-transparent pointer-events-none z-[1]" />
      
      <ArchOutline className="w-[280px] h-[420px] md:w-[480px] md:h-[720px] z-[2]" scale={0.72} opacity={0.15} delay={0.2} />
      <ArchOutline className="w-[360px] h-[540px] md:w-[620px] md:h-[930px] z-[3]" scale={1.0} opacity={0.24} delay={0.5} />
      <ArchOutline className="w-[450px] h-[675px] md:w-[800px] md:h-[1200px] z-[4]" scale={1.3} opacity={0.1} delay={0.8} />

      {/* ==================================================
          MIDDLE LAYER: VOLUMETRIC FOG & ROTATING LIGHT RAYS
          ================================================== */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full ${isMobile ? 'h-[300px] opacity-25' : 'h-[600px] opacity-45'} pointer-events-none z-[2] volumetric-bloom`} />
      <div className={`absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-[200px] h-[200px] blur-[40px] opacity-5' : 'w-[350px] h-[350px] md:w-[520px] md:h-[520px] blur-[90px]'} rounded-full bg-[#D4AF37]/10 pointer-events-none z-[1]`} />
      
      {/* Conic rotating volumetric rays (hidden on mobile for rendering speed) */}
      {!isMobile && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(212,175,55,0.06)_45deg,transparent_90deg,rgba(212,175,55,0.06)_135deg,transparent_180deg)] opacity-50 z-[1] pointer-events-none"
        />
      )}

      {/* ==================================================
          FRONT LAYER: MULTI-TYPE PREMIUM PARTICLES
          ================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[4]">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "105vh", opacity: 0, rotate: Math.random() * 360 }}
            animate={{
              y: "-10vh",
              opacity: [0, 0.7, 0.7, 0],
              x: ["0px", `${Math.random() * 60 - 30}px`],
              rotate: Math.random() * 360 + 180
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
            className="absolute"
            style={{ left: p.left }}
          >
            {p.type === "petal" ? (
              // Crimson rose petal
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="opacity-50">
                <path d="M 12 2 C 7 2 4 6 4 11 C 4 17 8 22 12 22 C 16 22 20 17 20 11 C 20 6 17 2 12 2 Z" fill="#6D0F2A" />
              </svg>
            ) : p.type === "star" ? (
              // Gold star sparkle
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#D4AF37] opacity-65">
                <path d="M 12,2 L 15,9 L 22,10 L 17,15 L 18,22 L 12,18 L 6,22 L 7,15 L 2,10 L 9,9 Z" fill="currentColor" />
              </svg>
            ) : p.type === "dust" ? (
              // Fine ivory dust
              <div className="w-1 h-1 rounded-full bg-[#FFF8ED]/30" />
            ) : (
              // Gold spark glow
              <div className="w-1.5 h-1.5 rounded-full bg-[#E8C76A]/45 shadow-[0_0_5px_rgba(212,175,55,0.7)]" />
            )}
          </motion.div>
        ))}
      </div>

      {/* ==================================================
          STAGE 4 - FLOATING INVITATION CARD CENTERPIECE
          ================================================== */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full text-center select-none">
        
        {/* Embossed Ivory Card Body with Parallax mouse tilt (fallback to float breathing on mobile) */}
        <motion.div
          animate={
            isMobile
              ? {
                  y: [0, -6, 0],
                  rotateX: [0, 0.8, 0, -0.8, 0],
                  rotateY: [0, -0.8, 0, 0.8, 0],
                  scale: [1, 1.008, 1],
                }
              : {
                  x: mousePosition.x,
                  y: mousePosition.y - 4,
                  rotateX: -mousePosition.y * 0.45,
                  rotateY: mousePosition.x * 0.45,
                  scale: 1.01,
                }
          }
          transition={
            isMobile
              ? {
                  y: { duration: 7.0, repeat: Infinity, ease: "easeInOut" },
                  rotateX: { duration: 8.0, repeat: Infinity, ease: "easeInOut" },
                  rotateY: { duration: 9.5, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
                }
              : { type: "spring", stiffness: 120, damping: 25 }
          }
          onClick={handleCardTap}
          whileTap={{ scale: 0.99 }}
          className={`relative w-full max-w-[340px] md:max-w-[410px] bg-gradient-to-br from-[#FFFDF9] via-[#FFFBF5] to-[#FFF9F0] px-8 pt-16 pb-12 rounded-[180px_180px_24px_24px] border-[2.2px] border-[#D4AF37]/50 ${isMobile ? 'shadow-md' : 'luxury-shadow-heavy'} shadow-[inset_0_0_24px_rgba(212,175,55,0.08)] flex flex-col items-center overflow-hidden cursor-pointer`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Elegant Islamic card corner frame ornaments for depth */}
          <CardCornerOrnament position="top-left" />
          <CardCornerOrnament position="top-right" />
          <CardCornerOrnament position="bottom-left" />
          <CardCornerOrnament position="bottom-right" />

          {/* Embossed ivory texture grid pattern */}
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none" 
               style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #4A081B 1px, transparent 1px), radial-gradient(circle at 0 0, #4A081B 1px, transparent 1px)", backgroundSize: "16px 16px, 8px 8px" }} />

          {/* Floral Corner Ornaments inside bottom edges of the card */}
          <FloralOrnament position="bottom-left" opacity={0.35} />
          <FloralOrnament position="bottom-right" opacity={0.35} />

          {/* Golden inner arch border lining */}
          <div className="absolute inset-[10px] border border-[#D4AF37]/25 rounded-[170px_170px_16px_16px] pointer-events-none z-10" />
          <div className="absolute inset-[13px] border border-dashed border-[#D4AF37]/15 rounded-[167px_167px_13px_13px] pointer-events-none z-10" />

          {/* Soft wave of gold glow pulse that washes card face at 4.2s (and on card tap) */}
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

          {/* Sequential stagger reveals */}
          <div className="w-full flex flex-col items-center z-10">
            
            {/* Top Islamic Icon ornament */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.4 }}
              className="w-10 h-10 text-brand-gold mb-6 relative"
            >
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" />
                <path d="M 50 25 L 75 50 L 50 75 L 25 50 Z" />
                <circle cx="50" cy="50" r="6" fill="currentColor" />
              </svg>
            </motion.div>

            {/* Families Line (Fades in first - delay 0.8s) */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
              className="font-cormorant italic text-xs md:text-sm text-brand-body tracking-[0.25em] uppercase mb-5"
            >
              Together with their families
            </motion.p>

            {/* Groom Label (delay 1.2s) */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="font-inter text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-1 select-none"
            >
              THE GROOM
            </motion.p>

            {/* Groom Name (Reveals letter-by-letter - starts at 1.4s) */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={groomStagger}
              className="font-cormorant text-4xl md:text-5xl font-semibold text-[#4A081B] tracking-wide"
            >
              {splitName("Fauzan", groomStagger, false)}
            </motion.h1>

            {/* Premium Gold Star Rosette Divider */}
            <div className="my-5 w-full flex items-center justify-center gap-4 relative pointer-events-none">
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 2.3, ease: "easeOut" }}
                style={{ transformOrigin: "right center" }}
                className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" 
              />
              <div className="relative flex items-center justify-center">
                {/* Tap Sparkle ring expanding */}
                <motion.div
                  animate={
                    isCardTapped
                      ? { scale: [1, 2.0, 1], opacity: [0, 0.95, 0] }
                      : { scale: 1, opacity: 0 }
                  }
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute w-12 h-12 rounded-full border border-[#D4AF37] pointer-events-none z-30"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 2.6, ease: "easeOut" }}
                  className="text-[#D4AF37] flex items-center justify-center drop-shadow-[0_0_10px_rgba(212,175,55,0.65)] z-10"
                >
                  <svg className="w-8 h-8 animate-pulse-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M 50 12 L 61 39 L 88 50 L 61 61 L 50 88 L 39 61 L 12 50 L 39 39 Z" />
                    <circle cx="50" cy="50" r="7.5" fill="currentColor" />
                  </svg>
                </motion.div>
              </div>
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 2.3, ease: "easeOut" }}
                style={{ transformOrigin: "left center" }}
                className="h-[0.5px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" 
              />
            </div>

            {/* Bride Label (delay 2.8s) */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.8, delay: 2.8 }}
              className="font-inter text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-1 select-none"
            >
              THE BRIDE
            </motion.p>

            {/* Bride Name (Reveals letter-by-letter - starts at 3.0s) */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={brideStagger}
              className="font-cormorant text-4xl md:text-5xl font-semibold text-[#4A081B] tracking-wide mb-6"
            >
              {splitName("Huda", brideStagger, true)}
            </motion.h1>

            {/* Honor request line (Fades in last - starts at 4.0s) */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 4.0 }}
              className="font-inter text-[9px] md:text-[10px] text-brand-gold font-bold uppercase tracking-[0.25em] mb-4"
            >
              Request the honor of your presence
            </motion.p>

            {/* Nikah ceremony (Fades in last - starts at 4.0s) */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 4.0, ease: "easeOut" }}
              className="font-cormorant italic text-base md:text-xl text-brand-body max-w-[240px] md:max-w-[280px] leading-relaxed"
            >
              at their blessed Nikah ceremony
            </motion.p>
          </div>
        </motion.div>

        {/* Redesigned Premium Interactive Explore Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 4.5 }}
          className="mt-14 flex flex-col items-center gap-3 cursor-pointer group pointer-events-auto"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight * 0.95,
              behavior: "smooth"
            });
          }}
        >
          <span className="font-cormorant text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#FFF8ED]/80 font-bold transition-colors duration-300 group-hover:text-[#D4AF37] drop-shadow-[0_0_6px_rgba(212,175,55,0.15)]">
            Explore Invitation
          </span>
          <div className="w-[1.5px] h-11 bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37] to-transparent relative overflow-hidden shadow-[0_0_6px_rgba(212,175,55,0.3)]">
            {/* Moving light pulse line */}
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 2.0, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-5 bg-[#FFF8ED] shadow-[0_0_8px_#D4AF37]"
            />
          </div>
          
          <div className="relative flex items-center justify-center">
            {/* Soft glow pulse halo */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.45, 0.15] }}
              transition={{ repeat: Infinity, duration: 2.0, ease: "easeInOut" }}
              className="absolute w-8 h-8 rounded-full bg-[#D4AF37]/15 blur-sm"
            />
            <svg className="w-4 h-4 text-[#D4AF37] animate-bounce z-10" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
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
