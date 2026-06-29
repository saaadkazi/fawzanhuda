"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloralOrnament from "./FloralOrnament";

// Section corner ornaments
const SectionCornerOrnament = ({ position }) => {
  const classMap = {
    "top-left": "top-8 left-8 rotate-0",
    "top-right": "top-8 right-8 rotate-90",
    "bottom-left": "bottom-8 left-8 -rotate-90",
    "bottom-right": "bottom-8 right-8 rotate-180",
  };
  return (
    <div className={`absolute w-12 h-12 text-[#D4AF37]/15 pointer-events-none z-0 ${classMap[position]}`}>
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M 0,0 L 80,0 M 0,0 L 0,80" />
        <path d="M 12,12 C 24,12 32,24 32,32 M 12,12 Q 50,12 50,50" strokeDasharray="2,2" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );
};

// Gold ornamental divider for top transition
const GoldOrnamentalDivider = () => {
  return (
    <div className="w-48 h-10 text-[#D4AF37]/50 flex items-center justify-center opacity-85 mb-16 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="1">
        {/* Swirling scrolls */}
        <path d="M 10,15 L 42,15 C 46,15 48,11 50,7 C 52,11 54,15 58,15 L 90,15" />
        <path d="M 30,15 Q 35,9 40,15" />
        <path d="M 60,15 Q 65,9 70,15" />
        <circle cx="50" cy="7" r="3" fill="currentColor" />
        <circle cx="24" cy="15" r="1.8" fill="currentColor" />
        <circle cx="76" cy="15" r="1.8" fill="currentColor" />
      </svg>
    </div>
  );
};

function Parents() {
  const [groomRipple, setGroomRipple] = useState(false);
  const [brideRipple, setBrideRipple] = useState(false);
  const [bgParticles, setBgParticles] = useState([]);

  useEffect(() => {
    // Generate slow floating gold particles inside section background
    const generated = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 8 + 8,
    }));
    setBgParticles(generated);
  }, []);

  const handleGroomClick = () => {
    setGroomRipple(true);
    setTimeout(() => setGroomRipple(false), 850);
  };

  const handleBrideClick = () => {
    setBrideRipple(true);
    setTimeout(() => setBrideRipple(false), 850);
  };

  // Scroll reveal variants
  const leftCardVariants = {
    hidden: { opacity: 0, x: -40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const rightCardVariants = {
    hidden: { opacity: 0, x: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#FFFDF9] via-[#F6EBDD] to-[#FFFDF9] relative overflow-hidden flex flex-col items-center">
      
      {/* Paper grain / luxury linen texture overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #4A081B 1px, transparent 1px), radial-gradient(circle at 0 0, #4A081B 1px, transparent 1px)", backgroundSize: "16px 16px, 8px 8px" }} />

      {/* Soft burgundy radial glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,8,27,0.06)_0%,transparent_75%)] pointer-events-none" />

      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-96 bg-brand-gold/8 rounded-r-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-48 h-96 bg-[#4A081B]/5 rounded-l-full blur-3xl pointer-events-none" />

      {/* Section corner ornaments for visual depth */}
      <SectionCornerOrnament position="top-left" />
      <SectionCornerOrnament position="top-right" />
      <SectionCornerOrnament position="bottom-left" />
      <SectionCornerOrnament position="bottom-right" />

      {/* Slow floating gold particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {bgParticles.map((p) => (
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

      {/* Luxury divider at the top boundary */}
      <GoldOrnamentalDivider />

      <div className="max-w-4xl w-full relative z-10 flex flex-col items-center">
        
        {/* Section Heading */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={headingVariants}
          className="text-center mb-16"
        >
          <span className="font-cormorant text-xs md:text-sm uppercase tracking-[0.3em] text-brand-gold font-semibold">
            With Praise to Allah
          </span>
          <h2 className="font-cormorant text-3xl md:text-4xl text-brand-heading mt-2 tracking-wide font-light">
            The Beloved Parents
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4" />
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 px-4 w-full justify-items-center">
          
          {/* Groom Parents Card (Outer: Scroll Reveal. Inner: Float loop + Ripple) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={leftCardVariants}
            onClick={handleGroomClick}
            whileTap={{
              scale: 0.985,
              borderColor: "#D4AF37",
              boxShadow: "0 12px 30px rgba(212, 175, 55, 0.35)",
              transition: { duration: 0.22 }
            }}
            className="w-full max-w-[340px] bg-gradient-to-br from-[#FFFDF9] via-[#FFFBF5] to-[#FFF9F0] px-6 py-12 rounded-[140px_140px_20px_20px] border-[2px] border-[#D4AF37]/35 shadow-[0_12px_28px_rgba(75,58,50,0.12)] shadow-[inset_0_0_16px_rgba(212,175,55,0.06)] flex flex-col items-center text-center relative group overflow-hidden cursor-pointer select-none transition-all duration-300 hover:shadow-[0_16px_36px_rgba(212,175,55,0.22)] z-10"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Automatic diagonal golden shimmer sweep */}
            <motion.div 
              animate={{
                left: ["-100%", "200%"],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 4.0, // loops every 6.2 seconds
                ease: "easeInOut"
              }}
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#FFF8ED]/20 to-transparent blur-[3px] -skew-x-[25deg] pointer-events-none z-20" 
            />

            {/* Tap Ripple concentric ring */}
            <AnimatePresence>
              {groomRipple && (
                <motion.div
                  initial={{ scale: 0.4, opacity: 0.7 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 rounded-[140px_140px_20px_20px] border-[2px] border-[#D4AF37] pointer-events-none z-30"
                />
              )}
            </AnimatePresence>

            {/* Linen background paper texture */}
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none" 
                 style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #4A081B 1px, transparent 1px), radial-gradient(circle at 0 0, #4A081B 1px, transparent 1px)", backgroundSize: "16px 16px, 8px 8px" }} />

            {/* Corner ornaments */}
            <FloralOrnament position="bottom-left" opacity={0.25} />
            <FloralOrnament position="bottom-right" opacity={0.25} />

            {/* Subtle inner gold arch borders */}
            <div className="absolute inset-[8px] border border-brand-gold/20 rounded-[132px_132px_14px_14px] pointer-events-none" />
            <div className="absolute inset-[11px] border border-dashed border-brand-gold/10 rounded-[129px_129px_11px_11px] pointer-events-none" />
            
            {/* Nested infinite float loop wrapper */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full flex flex-col items-center z-10"
            >
              <span className="font-inter text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#4A081B] font-bold mb-6 bg-[#D4AF37]/15 px-3 py-1 rounded-full border border-brand-gold/25">
                Parents of the Groom
              </span>

              {/* SVG Islamic motif inside card */}
              <div className="w-8 h-8 text-brand-gold/60 mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" />
                  <circle cx="50" cy="50" r="10" />
                </svg>
              </div>

              <div className="my-2 space-y-5 relative">
                <div>
                  <p className="font-cormorant text-xl md:text-2xl text-[#4A081B] tracking-wide font-semibold select-all">
                    Rafiq Zainuddin Kazi
                  </p>
                  <p className="font-cormorant text-xs italic text-brand-body mt-1">Father</p>
                </div>
                <div className="w-8 h-[0.5px] bg-brand-gold/40 mx-auto" />
                <div>
                  <p className="font-cormorant text-xl md:text-2xl text-[#4A081B] tracking-wide font-semibold select-all">
                    Hajara Rafiq Kazi
                  </p>
                  <p className="font-cormorant text-xs italic text-brand-body mt-1">Mother</p>
                </div>
              </div>

              {/* Emotional Touch Dua line */}
              <p className="font-cormorant text-xs italic text-brand-gold mt-6 select-none font-semibold drop-shadow-[0_0.5px_1px_rgba(255,255,255,0.8)]">
                “May Allah bless both families with barakah.”
              </p>
            </motion.div>
          </motion.div>

          {/* Bride Parents Card (Outer: Scroll Reveal. Inner: Float loop + Ripple) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={rightCardVariants}
            onClick={handleBrideClick}
            whileTap={{
              scale: 0.985,
              borderColor: "#D4AF37",
              boxShadow: "0 12px 30px rgba(212, 175, 55, 0.35)",
              transition: { duration: 0.22 }
            }}
            className="w-full max-w-[340px] bg-gradient-to-br from-[#FFFDF9] via-[#FFFBF5] to-[#FFF9F0] px-6 py-12 rounded-[140px_140px_20px_20px] border-[2px] border-[#D4AF37]/35 shadow-[0_12px_28px_rgba(75,58,50,0.12)] shadow-[inset_0_0_16px_rgba(212,175,55,0.06)] flex flex-col items-center text-center relative group overflow-hidden cursor-pointer select-none transition-all duration-300 hover:shadow-[0_16px_36px_rgba(212,175,55,0.22)] z-10"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Automatic diagonal golden shimmer sweep */}
            <motion.div 
              animate={{
                left: ["-100%", "200%"],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 4.0, // loops every 6.2 seconds
                ease: "easeInOut"
              }}
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#FFF8ED]/20 to-transparent blur-[3px] -skew-x-[25deg] pointer-events-none z-20" 
            />

            {/* Tap Ripple concentric ring */}
            <AnimatePresence>
              {brideRipple && (
                <motion.div
                  initial={{ scale: 0.4, opacity: 0.7 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 rounded-[140px_140px_20px_20px] border-[2px] border-[#D4AF37] pointer-events-none z-30"
                />
              )}
            </AnimatePresence>

            {/* Linen background paper texture */}
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none" 
                 style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #4A081B 1px, transparent 1px), radial-gradient(circle at 0 0, #4A081B 1px, transparent 1px)", backgroundSize: "16px 16px, 8px 8px" }} />

            {/* Corner ornaments */}
            <FloralOrnament position="bottom-left" opacity={0.25} />
            <FloralOrnament position="bottom-right" opacity={0.25} />

            {/* Subtle inner gold arch borders */}
            <div className="absolute inset-[8px] border border-brand-gold/20 rounded-[132px_132px_14px_14px] pointer-events-none" />
            <div className="absolute inset-[11px] border border-dashed border-brand-gold/10 rounded-[129px_129px_11px_11px] pointer-events-none" />

            {/* Nested infinite float loop wrapper */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full flex flex-col items-center z-10"
            >
              <span className="font-inter text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#4A081B] font-bold mb-6 bg-[#D4AF37]/15 px-3 py-1 rounded-full border border-brand-gold/25">
                Parents of the Bride
              </span>

              {/* SVG Islamic motif inside card */}
              <div className="w-8 h-8 text-brand-gold/60 mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" />
                  <circle cx="50" cy="50" r="10" />
                </svg>
              </div>

              <div className="my-2 space-y-5 relative">
                <div>
                  <p className="font-cormorant text-xl md:text-2xl text-[#4A081B] tracking-wide font-semibold select-all">
                    Hasham Ismail Kazi
                  </p>
                  <p className="font-cormorant text-xs italic text-brand-body mt-1">Father</p>
                </div>
                <div className="w-8 h-[0.5px] bg-brand-gold/40 mx-auto" />
                <div>
                  <p className="font-cormorant text-xl md:text-2xl text-[#4A081B] tracking-wide font-semibold select-all">
                    Seemab Hasham Kazi
                  </p>
                  <p className="font-cormorant text-xs italic text-brand-body mt-1">Mother</p>
                </div>
              </div>

              {/* Emotional Touch Dua line */}
              <p className="font-cormorant text-xs italic text-brand-gold mt-6 select-none font-semibold drop-shadow-[0_0.5px_1px_rgba(255,255,255,0.8)]">
                “May Allah bless both families with barakah.”
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default memo(Parents);
