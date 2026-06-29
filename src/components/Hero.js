"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FloralOrnament from "./FloralOrnament";

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

  useEffect(() => {
    // Generate soft drifting particles (gold sparks & burgundy rose petals)
    const generated = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 1.2,
      type: Math.random() > 0.65 ? "petal" : "spark",
      delay: Math.random() * 4,
      duration: Math.random() * 7 + 6, // 6s to 13s
    }));
    setParticles(generated);
  }, []);

  // Characters split helper for letter-by-letter reveal & spring hover waves
  const splitName = (name, parentVariant) => {
    return (
      <motion.span variants={parentVariant} className="inline-flex justify-center flex-wrap gap-x-1 select-none">
        {name.split("").map((char, index) => (
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
            whileHover={{
              y: -8,
              color: "#D4AF37",
              textShadow: "0 0 12px rgba(212, 175, 55, 0.85)",
              transition: { type: "spring", stiffness: 350, damping: 14 }
            }}
            className="inline-block cursor-default font-semibold drop-shadow-[0_0_8px_rgba(212,175,55,0.25)] tracking-wide transition-all duration-300"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  // Card Float & Tilt Variants
  const cardFloatVariants = {
    animate: {
      y: [0, -8, 0],
      rotateX: [0, 1.2, 0, -1.2, 0],
      rotateY: [0, -1.2, 0, 1.2, 0],
      scale: [1, 1.01, 1],
      transition: {
        y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
        rotateX: { duration: 6.8, repeat: Infinity, ease: "easeInOut" },
        rotateY: { duration: 8.2, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 6.0, repeat: Infinity, ease: "easeInOut" }
      }
    }
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
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden bg-gradient-to-b from-[#4A081B] via-[#6D0F2A] to-[#2D040F] z-10">
      
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
          MIDDLE LAYER: VOLUMETRIC FOG & GLOWS
          ================================================== */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] pointer-events-none z-[2] volumetric-bloom opacity-40" />
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[520px] md:h-[520px] rounded-full bg-[#D4AF37]/10 blur-[90px] pointer-events-none z-[1]" />

      {/* ==================================================
          FRONT LAYER: SPARKS & DRIFTING ROSE PETALS
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
              // Tiny burgundy rose petal drifting
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="opacity-50">
                <path d="M 12 2 C 7 2 4 6 4 11 C 4 17 8 22 12 22 C 16 22 20 17 20 11 C 20 6 17 2 12 2 Z" fill="#6D0F2A" />
              </svg>
            ) : (
              // Fine gold dust spark
              <div className="w-1.5 h-1.5 rounded-full bg-[#E8C76A]/45 shadow-[0_0_5px_rgba(212,175,55,0.7)]" />
            )}
          </motion.div>
        ))}
      </div>

      {/* ==================================================
          STAGE 4 - FLOATING INVITATION CARD CENTERPIECE
          ================================================== */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full text-center">
        
        {/* Embossed Ivory Card Body with Floating Animation wrapper */}
        <motion.div
          variants={cardFloatVariants}
          animate="animate"
          className="relative w-full max-w-[340px] md:max-w-[410px] bg-gradient-to-br from-[#FFFDF9] via-[#FFFBF5] to-[#FFF9F0] px-8 pt-16 pb-12 rounded-[180px_180px_24px_24px] border-[2.2px] border-[#D4AF37]/50 luxury-shadow-heavy shadow-[inset_0_0_24px_rgba(212,175,55,0.08)] flex flex-col items-center overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Embossed ivory texture grid pattern */}
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none" 
               style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #4A081B 1px, transparent 1px), radial-gradient(circle at 0 0, #4A081B 1px, transparent 1px)", backgroundSize: "16px 16px, 8px 8px" }} />

          {/* Floral Corner Ornaments inside bottom edges of the card */}
          <FloralOrnament position="bottom-left" opacity={0.35} />
          <FloralOrnament position="bottom-right" opacity={0.35} />

          {/* Golden inner arch border lining */}
          <div className="absolute inset-[10px] border border-[#D4AF37]/25 rounded-[170px_170px_16px_16px] pointer-events-none z-10" />
          <div className="absolute inset-[13px] border border-dashed border-[#D4AF37]/15 rounded-[167px_167px_13px_13px] pointer-events-none z-10" />

          {/* Soft wave of gold glow pulse that washes card face at 4.2s */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0] }}
            transition={{ delay: 4.2, duration: 1.8, ease: "easeInOut" }}
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
              {splitName("Fauzan", groomStagger)}
            </motion.h1>

            {/* Premium Gold Star Rosette Divider */}
            <div className="my-5 w-full flex items-center justify-center gap-4 relative">
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 2.3, ease: "easeOut" }}
                style={{ transformOrigin: "right center" }}
                className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" 
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 2.6, ease: "easeOut" }}
                className="text-[#D4AF37] flex items-center justify-center drop-shadow-[0_0_10px_rgba(212,175,55,0.65)]"
              >
                <svg className="w-8 h-8 animate-pulse-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M 50 12 L 61 39 L 88 50 L 61 61 L 50 88 L 39 61 L 12 50 L 39 39 Z" />
                  <circle cx="50" cy="50" r="7.5" fill="currentColor" />
                </svg>
              </motion.div>
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
              {splitName("Huda", brideStagger)}
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

        {/* Redesigned Premium Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.35, 0.95, 0.35] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 4.5 }}
          className="mt-12 flex flex-col items-center gap-3 pointer-events-none"
        >
          <span className="font-cormorant text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#FFF8ED]/80 font-medium">
            Explore Invitation
          </span>
          <div className="w-[1.5px] h-10 bg-gradient-to-b from-[#D4AF37] to-transparent relative overflow-hidden">
            {/* Moving light pulse line */}
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-4 bg-[#FFF8ED] shadow-[0_0_6px_#D4AF37]"
            />
          </div>
          <svg className="w-3.5 h-3.5 text-[#D4AF37] animate-bounce" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>

      </div>
    </section>
  );
}
