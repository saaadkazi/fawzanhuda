"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloralOrnament from "./FloralOrnament";

// Reusable Hanging Gold Lantern component
const HangingLantern = ({ side }) => {
  return (
    <motion.div
      animate={{ rotate: side === "left" ? [0, 1.5, -1.5, 0] : [0, -1.5, 1.5, 0] }}
      transition={{ repeat: Infinity, duration: 8.5, ease: "easeInOut" }}
      style={{ transformOrigin: "top center" }}
      className={`absolute top-0 ${side === "left" ? "left-8 md:left-24" : "right-8 md:right-24"} w-10 h-36 z-[3] pointer-events-none flex flex-col items-center`}
    >
      {/* Fine gold chain */}
      <div className="w-[1px] h-20 bg-[#D4AF37]/45 shadow-[0.5px_0_0_rgba(255,255,255,0.4)]" />
      
      {/* Dome top of lantern */}
      <div className="w-5.5 h-3 bg-gradient-to-r from-[#BF953F] to-[#B38728] rounded-t-full relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#E8C76A]/20 blur-sm" />
      </div>
      
      {/* Hexagonal lantern cage */}
      <div className="w-7 h-9 border border-[#D4AF37] bg-gradient-to-b from-[#FFFDF9]/95 to-[#F6EBDD]/95 relative flex items-center justify-center shadow-md">
        {/* Pulsating warm flame light inside */}
        <motion.div 
          animate={{ opacity: [0.65, 0.95, 0.65] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          className="absolute w-4 h-6 rounded-full bg-gradient-to-b from-[#FFEAA7] to-[#FFD166] blur-[3.5px] z-0"
        />
        {/* Geometric cage screen */}
        <div className="absolute inset-0 flex items-center justify-center text-[#D4AF37]/50 z-10">
          <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none stroke-[0.85]">
            <path d="M12 2 L12 22 M2 12 L22 12 M4 4 L20 20 M4 20 L20 4" />
          </svg>
        </div>
      </div>
      
      {/* Bottom spire elements */}
      <div className="w-2.5 h-1.5 bg-gradient-to-r from-[#BF953F] to-[#B38728] rounded-b-md" />
      <div className="w-[1px] h-3 bg-[#D4AF37]/65" />
    </motion.div>
  );
};

function Parents() {
  const [groomRipple, setGroomRipple] = useState(false);
  const [brideRipple, setBrideRipple] = useState(false);
  const [bgParticles, setBgParticles] = useState([]);

  useEffect(() => {
    // Generate sparse luxury floating sparks in background
    const generated = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * -10, // pre-distributed
      duration: Math.random() * 8 + 12, // slow cinematic drift
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

  // Scroll reveal variants (Choreographed entrance 1.0 - 1.8s)
  const archVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 1.5, ease: "easeOut" } 
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, delay: 0.3, ease: "easeOut" }
    }
  };

  const leftCardVariants = {
    hidden: { opacity: 0, y: 35, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const rightCardVariants = {
    hidden: { opacity: 0, y: 35, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section 
      style={{
        background: "radial-gradient(circle at center, #FFFDF9 0%, #F6EBDD 60%, #EFE3D3 100%)"
      }}
      className="py-24 px-4 relative overflow-hidden flex flex-col items-center min-h-screen"
    >
      
      {/* Paper grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #4A081B 1px, transparent 1px), radial-gradient(circle at 0 0, #4A081B 1px, transparent 1px)", backgroundSize: "16px 16px, 8px 8px" }} />

      {/* Islamic geometric repeating watermark pattern (2.5% opacity) */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%234A081B' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%234A081B' stroke-width='1'/%3E%3C/svg%3E")`, 
             backgroundSize: "60px 60px" 
           }} />

      {/* Vignette border frame edges */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(246,235,221,0)_50%,rgba(74,8,27,0.06)_100%)] z-0" />

      {/* Sparse slow-rising gold spark particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {bgParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "110%", opacity: 0 }}
            animate={{
              y: "-10%",
              opacity: [0, 0.65, 0.65, 0],
              x: ["0px", `${Math.random() * 50 - 25}px`],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
            className="absolute rounded-full bg-[#E8C76A] shadow-[0_0_5px_rgba(212,175,55,0.6)]"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* ==================================================
          MAIN ARCH CASING STRUCTURE (Mughal-Inspired)
          ================================================== */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={archVariants}
        className="max-w-5xl w-full relative z-10 flex flex-col items-center py-16 px-6 md:px-12 border-[2px] border-t-[#FCF6BA] border-l-[#DFCA98] border-r-[#B38728] border-b-[#856124] rounded-[180px_180px_40px_40px] shadow-[inset_0_0_40px_rgba(212,175,55,0.06),0_15px_45px_rgba(74,8,27,0.05)] bg-gradient-to-br from-[#FFFDF9]/60 via-transparent to-[#F6EBDD]/40"
      >
        {/* Arch Dashed Gold Inner Arch Lining */}
        <div className="absolute inset-[8px] border border-dashed border-[#D4AF37]/35 rounded-[172px_172px_32px_32px] pointer-events-none" />

        {/* Gold Noor glow backing behind main arch casing */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-4/5 h-[400px] bg-gradient-to-b from-[#D4AF37]/8 via-[#FFF8ED]/4 to-transparent blur-[65px] rounded-full pointer-events-none z-0" />

        {/* Swaying Lanterns inside arch */}
        <HangingLantern side="left" />
        <HangingLantern side="right" />

        {/* Section Heading */}
        <motion.div 
          variants={headingVariants}
          className="text-center mb-16 relative z-10"
        >
          <span className="font-cormorant text-[10px] md:text-xs uppercase tracking-[0.32em] text-[#856124] font-bold flex items-center justify-center gap-1.5 select-none">
            With Praise to Allah
            <span className="inline-block text-[#D4AF37] animate-pulse">✦</span>
          </span>
          <h2 className="font-cormorant text-3.5xl md:text-4.5xl text-[#4A081B] mt-2.5 tracking-wide font-light select-none">
            The Beloved Parents
          </h2>
          {/* Gold leaf divider line */}
          <div className="w-36 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-5 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D4AF37] text-[9px] bg-[#F6EBDD] px-2 select-none">✦</span>
          </div>
        </motion.div>

        {/* Symmetrical Cards container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 px-2 w-full justify-items-center relative z-10">
          
          {/* Groom Parents Arched Card */}
          <motion.div
            variants={leftCardVariants}
            onClick={handleGroomClick}
            whileTap={{
              scale: 0.985,
              borderColor: "#D4AF37",
              boxShadow: "0 12px 30px rgba(212, 175, 55, 0.35)",
              transition: { duration: 0.22 }
            }}
            className="w-full max-w-[310px] bg-gradient-to-br from-[#FFFFFF] via-[#FFFDF9] to-[#F7F2E8] px-6 py-12 rounded-[140px_140px_24px_24px] border-[1.5px] border-t-[#FCF6BA] border-l-[#DFCA98] border-r-[#B38728] border-b-[#856124] shadow-[0_16px_36px_rgba(74,8,27,0.06),inset_0_1.5px_3px_rgba(255,255,255,0.85)] flex flex-col items-center text-center relative group overflow-hidden cursor-pointer select-none transition-all duration-300 hover:shadow-[0_20px_45px_rgba(212,175,55,0.18)]"
            style={{ 
              transformStyle: "preserve-3d",
              animation: "card-float-breathing 6.0s infinite ease-in-out" 
            }}
          >
            {/* Subtle paper grain texture */}
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay z-0" 
                 style={{ 
                   backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.12) 0.5px, transparent 0.5px)`, 
                   backgroundSize: "3px 3px" 
                 }} />
            
            {/* Automatic diagonal golden shimmer sweep */}
            <motion.div 
              animate={{
                left: ["-120%", "220%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 5.0, // loops every 7.5 seconds
                ease: "easeInOut"
              }}
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#FFF8ED]/30 to-transparent blur-[3px] -skew-x-[25deg] pointer-events-none z-20" 
            />

            {/* Tap Ripple concentric ring */}
            <AnimatePresence>
              {groomRipple && (
                <motion.div
                  initial={{ scale: 0.4, opacity: 0.7 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 rounded-[140px_140px_24px_24px] border border-[#D4AF37] pointer-events-none z-30"
                />
              )}
            </AnimatePresence>

            {/* Corner ornaments (engravings) */}
            <FloralOrnament position="bottom-left" opacity={0.3} />
            <FloralOrnament position="bottom-right" opacity={0.3} />

            {/* Subtle inner gold arch borders */}
            <div className="absolute inset-[8px] border border-[#D4AF37]/22 rounded-[132px_132px_16px_16px] pointer-events-none" />
            <div className="absolute inset-[11px] border border-dashed border-[#D4AF37]/12 rounded-[129px_129px_13px_13px] pointer-events-none" />
            
            <div className="w-full flex flex-col items-center relative z-10">
              
              {/* Premium Embossed gold badge */}
              <span className="font-inter text-[9px] uppercase tracking-[0.25em] text-[#2D040F] font-bold mb-8 border border-[#856124]/40 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] px-4 py-1.5 rounded-full shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.8),0_2px_8px_rgba(212,175,55,0.2)] select-none">
                Parents of the Groom
              </span>

              {/* Islamic motif outline */}
              <div className="w-8 h-8 text-[#D4AF37]/65 mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" />
                  <circle cx="50" cy="50" r="10" />
                </svg>
              </div>

              {/* Names & Roles */}
              <div className="my-2 space-y-5 relative w-full">
                <div>
                  <p className="font-cormorant text-xl md:text-[23px] text-[#4A081B] tracking-wide font-bold select-all leading-tight">
                    Rafiq Zainuddin Kazi
                  </p>
                  <p className="font-cormorant text-xs italic text-[#856124] mt-1 font-semibold">Father</p>
                </div>
                
                {/* Decorative divider */}
                <div className="w-8 h-[0.5px] bg-[#D4AF37]/45 mx-auto" />
                
                <div>
                  <p className="font-cormorant text-xl md:text-[23px] text-[#4A081B] tracking-wide font-bold select-all leading-tight">
                    Hajara Rafiq Kazi
                  </p>
                  <p className="font-cormorant text-xs italic text-[#856124] mt-1 font-semibold">Mother</p>
                </div>
              </div>

              {/* Emotional Touch Dua line */}
              <p className="font-cormorant text-xs italic text-[#856124] mt-8 select-none font-semibold drop-shadow-[0_0.5px_1px_rgba(255,255,255,0.8)]">
                “May Allah bless both families with barakah.”
              </p>
            </div>
          </motion.div>

          {/* Bride Parents Arched Card */}
          <motion.div
            variants={rightCardVariants}
            onClick={handleBrideClick}
            whileTap={{
              scale: 0.985,
              borderColor: "#D4AF37",
              boxShadow: "0 12px 30px rgba(212, 175, 55, 0.35)",
              transition: { duration: 0.22 }
            }}
            className="w-full max-w-[310px] bg-gradient-to-br from-[#FFFFFF] via-[#FFFDF9] to-[#F7F2E8] px-6 py-12 rounded-[140px_140px_24px_24px] border-[1.5px] border-t-[#FCF6BA] border-l-[#DFCA98] border-r-[#B38728] border-b-[#856124] shadow-[0_16px_36px_rgba(74,8,27,0.06),inset_0_1.5px_3px_rgba(255,255,255,0.85)] flex flex-col items-center text-center relative group overflow-hidden cursor-pointer select-none transition-all duration-300 hover:shadow-[0_20px_45px_rgba(212,175,55,0.18)]"
            style={{ 
              transformStyle: "preserve-3d",
              animation: "card-float-breathing 6.0s infinite ease-in-out",
              animationDelay: "0.5s"
            }}
          >
            {/* Subtle paper grain texture */}
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay z-0" 
                 style={{ 
                   backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.12) 0.5px, transparent 0.5px)`, 
                   backgroundSize: "3px 3px" 
                 }} />
            
            {/* Automatic diagonal golden shimmer sweep */}
            <motion.div 
              animate={{
                left: ["-120%", "220%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 5.0, // loops every 7.5 seconds
                ease: "easeInOut"
              }}
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#FFF8ED]/30 to-transparent blur-[3px] -skew-x-[25deg] pointer-events-none z-20" 
            />

            {/* Tap Ripple concentric ring */}
            <AnimatePresence>
              {brideRipple && (
                <motion.div
                  initial={{ scale: 0.4, opacity: 0.7 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 rounded-[140px_140px_24px_24px] border border-[#D4AF37] pointer-events-none z-30"
                />
              )}
            </AnimatePresence>

            {/* Corner ornaments (engravings) */}
            <FloralOrnament position="bottom-left" opacity={0.3} />
            <FloralOrnament position="bottom-right" opacity={0.3} />

            {/* Subtle inner gold arch borders */}
            <div className="absolute inset-[8px] border border-[#D4AF37]/22 rounded-[132px_132px_16px_16px] pointer-events-none" />
            <div className="absolute inset-[11px] border border-dashed border-[#D4AF37]/12 rounded-[129px_129px_13px_13px] pointer-events-none" />

            <div className="w-full flex flex-col items-center relative z-10">
              
              {/* Premium Embossed gold badge */}
              <span className="font-inter text-[9px] uppercase tracking-[0.25em] text-[#2D040F] font-bold mb-8 border border-[#856124]/40 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] px-4 py-1.5 rounded-full shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.8),0_2px_8px_rgba(212,175,55,0.2)] select-none">
                Parents of the Bride
              </span>

              {/* Islamic motif outline */}
              <div className="w-8 h-8 text-[#D4AF37]/65 mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" />
                  <circle cx="50" cy="50" r="10" />
                </svg>
              </div>

              {/* Names & Roles */}
              <div className="my-2 space-y-5 relative w-full">
                <div>
                  <p className="font-cormorant text-xl md:text-[23px] text-[#4A081B] tracking-wide font-bold select-all leading-tight">
                    Hasham Ismail Kazi
                  </p>
                  <p className="font-cormorant text-xs italic text-[#856124] mt-1 font-semibold">Father</p>
                </div>
                
                {/* Decorative divider */}
                <div className="w-8 h-[0.5px] bg-[#D4AF37]/45 mx-auto" />
                
                <div>
                  <p className="font-cormorant text-xl md:text-[23px] text-[#4A081B] tracking-wide font-bold select-all leading-tight">
                    Seemab Hasham Kazi
                  </p>
                  <p className="font-cormorant text-xs italic text-[#856124] mt-1 font-semibold">Mother</p>
                </div>
              </div>

              {/* Emotional Touch Dua line */}
              <p className="font-cormorant text-xs italic text-[#856124] mt-8 select-none font-semibold drop-shadow-[0_0.5px_1px_rgba(255,255,255,0.8)]">
                “May Allah bless both families with barakah.”
              </p>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

export default memo(Parents);
