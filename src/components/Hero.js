"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FloralOrnament from "./FloralOrnament";

// Pointed Islamic Arch Outline vector with slow breathing float
const ArchOutline = ({ className, delay = 0, scale = 1, opacity = 0.2 }) => {
  return (
    <motion.div
      initial={{ scale: scale * 0.7, opacity: 0, filter: "blur(10px)" }}
      animate={{ 
        scale: scale, 
        opacity: opacity,
        filter: "blur(0px)",
        y: [0, -12, 0] 
      }}
      transition={{
        scale: { duration: 2.8, delay, ease: [0.25, 1, 0.36, 1] },
        opacity: { duration: 2.5, delay, ease: "easeOut" },
        y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: delay * 1.5 }
      }}
      className={`absolute pointer-events-none text-brand-gold/30 flex items-center justify-center ${className}`}
    >
      <svg className="w-full h-full stroke-current fill-none stroke-[0.4]" viewBox="0 0 100 150">
        <path d="M 5,150 L 5,45 C 5,15 35,2 50,2 C 65,2 95,15 95,45 L 95,150" />
        <path d="M 10,150 L 10,47 C 10,18 36,6 50,6 C 64,6 90,18 90,47 L 90,150" strokeDasharray="1.5,1.5" strokeWidth="0.2" />
      </svg>
    </motion.div>
  );
};

export default function Hero() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate soft drifting particles client-side
    const generated = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 1.5, // 1.5px to 4px
      delay: Math.random() * 3,
      duration: Math.random() * 6 + 5, // 5s to 11s
    }));
    setParticles(generated);
  }, []);

  // Text Reveal stagger configuration
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.85, 
      filter: "blur(12px)" 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      boxShadow: "0 25px 60px -15px rgba(109, 15, 42, 0.16), 0 0 35px rgba(212, 175, 55, 0.18)",
      transition: { 
        duration: 1.8, 
        delay: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const textContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.28,
        delayChildren: 1.6,
      }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden bg-gradient-to-b from-[#4A081B] via-[#6D0F2A] to-[#2D040F]">
      
      {/* Royal envelope screen-corner floral ornaments */}
      <FloralOrnament position="top-left" opacity={0.75} />
      <FloralOrnament position="top-right" opacity={0.75} />
      <FloralOrnament position="bottom-left" opacity={0.75} />
      <FloralOrnament position="bottom-right" opacity={0.75} />

      {/* ==================================================
          STAGE 3 - 5-LAYER BACKGROUND CINEMATIC DEPTH
          ================================================== */}
      
      {/* LAYER 1: Atmospheric Burgundy Gradient Backdrop (covered in main section tag) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2D040F]/95 via-transparent to-transparent pointer-events-none z-[1]" />

      {/* LAYER 2: Multiple Floating Arch Layers (Parallax Depth) */}
      <ArchOutline className="w-[280px] h-[420px] md:w-[480px] md:h-[720px] z-[2]" scale={0.72} opacity={0.16} delay={0.2} />
      <ArchOutline className="w-[360px] h-[540px] md:w-[620px] md:h-[930px] z-[3]" scale={1.0} opacity={0.26} delay={0.5} />
      <ArchOutline className="w-[450px] h-[675px] md:w-[800px] md:h-[1200px] z-[4]" scale={1.3} opacity={0.12} delay={0.8} />

      {/* LAYER 3: Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "105vh", opacity: 0 }}
            animate={{
              y: "-10vh",
              opacity: [0, 0.65, 0.65, 0],
              x: ["0px", `${Math.random() * 50 - 25}px`],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
            className="absolute rounded-full bg-[#FFF0D6]/40"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 6px rgba(212, 175, 55, 0.4)",
            }}
          />
        ))}
      </div>

      {/* LAYER 4: Soft Volumetric Fog Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] pointer-events-none z-[2] volumetric-bloom" />

      {/* LAYER 5: Central Glow Light Source */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-[#D4AF37]/10 blur-[85px] pointer-events-none z-[1]" />

      {/* ==================================================
          STAGE 4 - FLOATING INVITATION CARD CENTERPIECE
          ================================================== */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full text-center">
        
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full max-w-[350px] md:max-w-[420px] bg-[#FFF8ED]/95 backdrop-blur-md px-8 pt-16 pb-12 rounded-[180px_180px_24px_24px] border border-[#D4AF37]/30 luxury-shadow-heavy arch-card-clip flex flex-col items-center overflow-hidden"
        >
          {/* Floral Corner Ornaments inside bottom edges of the card */}
          <FloralOrnament position="bottom-left" opacity={0.35} />
          <FloralOrnament position="bottom-right" opacity={0.35} />

          {/* Subtle gold grid pattern inside card */}
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none islamic-pattern" />

          {/* Golden inner arch border lining */}
          <div className="absolute inset-[10px] border border-[#D4AF37]/20 rounded-[170px_170px_16px_16px] pointer-events-none" />
          <div className="absolute inset-[13px] border border-dashed border-[#D4AF37]/10 rounded-[167px_167px_13px_13px] pointer-events-none" />

          {/* Stagger reveal invitation details */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col items-center"
          >
            {/* Top Islamic Icon ornament */}
            <motion.div variants={textItemVariants} className="w-10 h-10 text-brand-gold mb-6 relative">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" />
                <path d="M 50 25 L 75 50 L 50 75 L 25 50 Z" />
                <circle cx="50" cy="50" r="6" fill="currentColor" />
              </svg>
            </motion.div>

            {/* Families Line */}
            <motion.p
              variants={textItemVariants}
              className="font-cormorant italic text-xs md:text-sm text-brand-body tracking-[0.25em] uppercase mb-5"
            >
              Together with their families
            </motion.p>

            {/* Groom Name */}
            <motion.h1
              variants={textItemVariants}
              className="font-cormorant text-4xl md:text-5xl font-semibold text-brand-heading tracking-wide"
            >
              Fauzan
            </motion.h1>

            {/* Ampersand ornament */}
            <motion.div
              variants={textItemVariants}
              className="my-2 text-brand-gold font-light flex items-center gap-3 w-full justify-center"
            >
              <span className="h-[0.5px] w-8 bg-brand-gold/20" />
              <span className="font-cormorant italic text-lg text-brand-body">&</span>
              <span className="h-[0.5px] w-8 bg-brand-gold/20" />
            </motion.div>

            {/* Bride Name */}
            <motion.h1
              variants={textItemVariants}
              className="font-cormorant text-4xl md:text-5xl font-semibold text-brand-heading tracking-wide mb-6"
            >
              Huda
            </motion.h1>

            {/* Honor request line */}
            <motion.p
              variants={textItemVariants}
              className="font-inter text-[9px] md:text-[10px] text-brand-gold font-bold uppercase tracking-[0.25em] mb-4"
            >
              Request the honor of your presence
            </motion.p>

            {/* Nikah ceremony */}
            <motion.p
              variants={textItemVariants}
              className="font-cormorant italic text-base md:text-xl text-brand-body max-w-[240px] md:max-w-[280px] leading-relaxed"
            >
              at their blessed Nikah ceremony
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Floating Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.35, 0.85, 0.35], y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 3.2 }}
          className="mt-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="font-cormorant text-[10px] uppercase tracking-[0.25em] text-[#6D0F2A]/75 font-medium">
            Scroll Down
          </span>
          <div className="w-[1px] h-8 bg-brand-gold/40" />
        </motion.div>

      </div>
    </section>
  );
}
