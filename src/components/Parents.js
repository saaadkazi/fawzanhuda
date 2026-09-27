"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import FloralOrnament from "./FloralOrnament";

// Reusable Hanging Gold Lantern component
const HangingLantern = ({ side }) => {
  return (
    <motion.div
      animate={{ rotate: side === "left" ? [0, 1.2, -1.2, 0] : [0, -1.2, 1.2, 0] }}
      transition={{ repeat: Infinity, duration: 9.0, ease: "easeInOut" }}
      style={{ transformOrigin: "top center" }}
      className={`absolute top-0 ${side === "left" ? "left-4 sm:left-8 md:left-20" : "right-4 sm:right-8 md:right-20"} w-7 md:w-9 h-32 md:h-36 z-[3] pointer-events-none flex flex-col items-center opacity-85`}
    >
      {/* Fine gold chain */}
      <div className="w-[1px] h-16 md:h-20 bg-[#D4AF37]/40 shadow-[0.5px_0_0_rgba(255,255,255,0.3)]" />
      
      {/* Dome top of lantern */}
      <div className="w-4 md:w-5 h-2 md:h-2.5 bg-gradient-to-r from-[#BF953F] to-[#B38728] rounded-t-full relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 md:w-7 h-5 md:h-7 rounded-full bg-[#E8C76A]/20 blur-sm" />
      </div>
      
      {/* Hexagonal lantern cage */}
      <div className="w-5.5 md:w-6.5 h-7 md:h-8 border border-[#D4AF37]/80 bg-gradient-to-b from-[#FFFDF9]/95 to-[#F6EBDD]/95 relative flex items-center justify-center shadow-sm">
        {/* Pulsating warm flame light inside */}
        <motion.div 
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ repeat: Infinity, duration: 3.0, ease: "easeInOut" }}
          className="absolute w-3 md:w-3.5 h-4.5 md:h-5 rounded-full bg-gradient-to-b from-[#FFEAA7] to-[#FFD166] blur-[2px] z-0"
        />
        {/* Geometric cage screen */}
        <div className="absolute inset-0 flex items-center justify-center text-[#D4AF37]/40 z-10">
          <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none stroke-[0.85]">
            <path d="M12 2 L12 22 M2 12 L22 12 M4 4 L20 20 M4 20 L20 4" />
          </svg>
        </div>
      </div>
      
      {/* Bottom spire elements */}
      <div className="w-1.5 md:w-2 h-1 bg-gradient-to-r from-[#BF953F] to-[#B38728] rounded-b-sm" />
      <div className="w-[1px] h-3 bg-[#D4AF37]/50" />
    </motion.div>
  );
};

// 8-Pointed Rub el Hizb Islamic Star Emblem Subcomponent
const IslamicEmblem = () => (
  <div className="w-6 h-6 text-[#D4AF37] flex items-center justify-center mb-1 relative">
    <svg className="w-full h-full drop-shadow-[0_1px_2px_rgba(212,175,55,0.3)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M 50 12 L 62 38 L 88 50 L 62 62 L 50 88 L 38 62 L 12 50 L 38 38 Z" fill="currentColor" fillOpacity="0.08" />
      <path d="M 50 20 L 70 50 L 50 80 L 30 50 Z" strokeWidth="1" strokeDasharray="2,2" />
      <circle cx="50" cy="50" r="6" fill="currentColor" />
    </svg>
  </div>
);

function Parents() {
  // Scroll reveal variants (Subtle motion, performant on mobile)
  const archVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay: 0.15, ease: "easeOut" }
    }
  };

  const legacyPlaqueVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay: 0.3, ease: "easeOut" }
    }
  };

  const leftCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, delay: 0.45, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const rightCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, delay: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section 
      id="parents-section"
      style={{
        background: "radial-gradient(circle at 50% 35%, #FFFDF9 0%, #F6EBDD 65%, #EFE3D3 100%)"
      }}
      className="py-14 sm:py-18 md:py-24 px-3 sm:px-4 relative overflow-hidden flex flex-col items-center select-none"
    >
      {/* Paper grain texture overlay (2% opacity) */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
        style={{ 
          backgroundImage: "radial-gradient(circle at 50% 50%, #4A081B 1px, transparent 1px), radial-gradient(circle at 0 0, #4A081B 1px, transparent 1px)", 
          backgroundSize: "16px 16px, 8px 8px" 
        }} 
      />

      {/* Islamic geometric repeating watermark pattern (2% opacity) */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%234A081B' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%234A081B' stroke-width='1'/%3E%3C/svg%3E")`, 
          backgroundSize: "60px 60px" 
        }} 
      />

      {/* Soft warm champagne radial lighting centered behind cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] md:w-[700px] h-[340px] sm:h-[500px] md:h-[700px] bg-gradient-to-tr from-[#D4AF37]/6 via-[#FFF8ED]/10 to-[#D4AF37]/6 rounded-full blur-[90px] pointer-events-none z-0" />

      {/* Subtle vignette frame edges */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(246,235,221,0)_55%,rgba(74,8,27,0.05)_100%)] z-0" />

      {/* ==================================================
          MAIN LUXURY ARCHITECTURAL CASING FRAME
          ================================================== */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={archVariants}
        className="max-w-4xl w-full relative z-10 flex flex-col items-center py-8 sm:py-10 md:py-14 px-3 sm:px-6 md:px-10 border border-[#D4AF37]/40 rounded-[140px_140px_32px_32px] sm:rounded-[180px_180px_40px_40px] shadow-[0_10px_35px_rgba(74,8,27,0.04),inset_0_1px_2px_rgba(255,255,255,0.8)] bg-gradient-to-b from-[#FFFDF9]/80 via-[#FFFDF9]/40 to-[#F6EBDD]/60"
      >
        {/* Dashed Gold Inner Arch Lining */}
        <div className="absolute inset-[6px] sm:inset-[8px] border border-dashed border-[#D4AF37]/25 rounded-[134px_134px_26px_26px] sm:rounded-[172px_172px_32px_32px] pointer-events-none" />

        {/* Swaying Lanterns inside arch casing */}
        <HangingLantern side="left" />
        <HangingLantern side="right" />

        {/* Section Heading */}
        <motion.div 
          variants={headingVariants}
          className="text-center mb-6 sm:mb-8 relative z-10"
        >
          <span className="font-cormorant text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[#856124] font-bold flex items-center justify-center gap-1.5 select-none">
            With Praise to Allah
            <span className="inline-block text-[#D4AF37] opacity-80">✦</span>
          </span>
          <h2 className="font-cormorant text-3xl sm:text-3.5xl md:text-4.5xl text-[#4A081B] mt-2 tracking-wide font-light select-none">
            The Beloved Parents
          </h2>
          
          {/* Gold leaf divider line */}
          <div className="w-28 sm:w-36 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D4AF37] text-[8px] bg-[#F6EBDD] px-2 select-none">✦</span>
          </div>
        </motion.div>

        {/* ==================================================
            SACRED LEGACY PLAQUE (Grandfather Memorial Card)
            ================================================== */}
        <motion.div
          variants={legacyPlaqueVariants}
          className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] bg-gradient-to-br from-[#FFFFFF] via-[#FFFDF9] to-[#F7F2E8] px-5 py-4 rounded-[40px_40px_18px_18px] border border-[#D4AF37]/45 shadow-[0_8px_24px_rgba(74,8,27,0.04),inset_0_1px_2px_rgba(255,255,255,0.9)] flex flex-col items-center text-center relative overflow-hidden mb-7 sm:mb-9 md:mb-11 select-none"
        >
          {/* Subtle paper grain texture */}
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay z-0" 
            style={{ 
              backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.1) 0.5px, transparent 0.5px)`, 
              backgroundSize: "3px 3px" 
            }} 
          />

          {/* Inner dashed line framing */}
          <div className="absolute inset-[5px] border border-dashed border-[#D4AF37]/20 rounded-[35px_35px_14px_14px] pointer-events-none z-10" />

          {/* Top Micro Crescent Icon */}
          <div className="w-4 h-4 text-[#D4AF37] mb-1 relative z-10 opacity-90">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.3 2a10 10 0 0 0-1.9.2 10.4 10.4 0 0 1 .4 3c0 5.4-4 9.8-9.2 10.4a10.2 10.2 0 0 0 10.7 8.3 10 10 0 0 0 9.8-10A10 10 0 0 0 12.3 2z" />
            </svg>
          </div>

          {/* Top micro text */}
          <span className="font-cinzel text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.28em] text-[#856124] font-bold mb-1 relative z-10">
            UNDER THE BLESSED LEGACY OF
          </span>

          <div className="w-14 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto mb-2 relative z-10" />

          {/* Legacy Names */}
          <div className="space-y-0.5 relative z-10 mb-1.5">
            <h3 className="font-cormorant text-lg sm:text-[20px] md:text-[21px] font-bold text-[#4A081B] tracking-wide leading-snug">
              Zainuddin Kadir Kazi
            </h3>
            <h3 className="font-cormorant text-lg sm:text-[20px] md:text-[21px] font-bold text-[#4A081B] tracking-wide leading-snug">
              Fatimbi Zainuddin Kazi
            </h3>
          </div>

          <p className="font-cormorant text-[9px] sm:text-[10px] md:text-[11px] text-[#856124] tracking-wider relative z-10 font-semibold uppercase">
            Marhoom <span className="inline-block text-[#D4AF37] mx-1">•</span> Beloved Grandfather of the Groom
          </p>
        </motion.div>

        {/* ==================================================
            SYMMETRICAL FAMILY ARCH INVITATION PANELS
            ================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 px-1 sm:px-2 w-full justify-items-center relative z-10">
          
          {/* GROOM PARENTS PANEL */}
          <motion.div
            variants={leftCardVariants}
            className="w-full max-w-[295px] sm:max-w-[320px] md:max-w-[340px] bg-gradient-to-br from-[#FFFFFF] via-[#FFFDF9] to-[#F7F2E8] py-7 sm:py-9 md:py-10 px-5 sm:px-6 rounded-[130px_130px_22px_22px] sm:rounded-[150px_150px_26px_26px] border border-[#D4AF37]/45 shadow-[0_10px_28px_rgba(74,8,27,0.04),0_2px_8px_rgba(212,175,55,0.06),inset_0_1.5px_3px_rgba(255,255,255,0.9)] flex flex-col items-center text-center relative group overflow-hidden select-none transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(212,175,55,0.14)]"
          >
            {/* Subtle paper grain texture */}
            <div 
              className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay z-0" 
              style={{ 
                backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.1) 0.5px, transparent 0.5px)`, 
                backgroundSize: "3px 3px" 
              }} 
            />

            {/* Embossed Islamic geometric watermark (2% opacity) */}
            <div 
              className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%234A081B' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%234A081B' stroke-width='1'/%3E%3C/svg%3E")`, 
                backgroundSize: "50px 50px" 
              }} 
            />

            {/* Corner ornaments */}
            <FloralOrnament position="bottom-left" opacity={0.25} />
            <FloralOrnament position="bottom-right" opacity={0.25} />

            {/* Double inner gold arch borders */}
            <div className="absolute inset-[7px] border border-[#D4AF37]/20 rounded-[123px_123px_15px_15px] pointer-events-none" />
            <div className="absolute inset-[10px] border border-dashed border-[#D4AF37]/12 rounded-[120px_120px_12px_12px] pointer-events-none" />
            
            <div className="w-full flex flex-col items-center relative z-10">
              
              {/* Top Islamic Star Emblem */}
              <IslamicEmblem />

              {/* Refined Integrated Gold Title Banner */}
              <span className="font-cinzel text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.28em] text-[#856124] font-extrabold pb-1.5 mb-5 border-b border-[#D4AF37]/35 select-none">
                Parents of the Groom
              </span>

              {/* Names & Roles Hierarchy */}
              <div className="w-full space-y-3.5 my-1">
                {/* Father */}
                <div>
                  <h3 className="font-cormorant text-xl sm:text-[22px] md:text-[24px] text-[#4A081B] tracking-wide font-bold leading-tight select-all">
                    Rafiq Zainuddin Kazi
                  </h3>
                  <p className="font-cormorant text-xs italic text-[#856124] font-semibold mt-0.5">
                    Father
                  </p>
                </div>
                
                {/* Thin Gold Divider */}
                <div className="w-12 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto" />
                
                {/* Mother */}
                <div>
                  <h3 className="font-cormorant text-xl sm:text-[22px] md:text-[24px] text-[#4A081B] tracking-wide font-bold leading-tight select-all">
                    Hajara Rafiq Kazi
                  </h3>
                  <p className="font-cormorant text-xs italic text-[#856124] font-semibold mt-0.5">
                    Mother
                  </p>
                </div>
              </div>

              {/* Blessing Line */}
              <p className="font-cormorant text-xs sm:text-[13px] italic text-[#856124] font-medium mt-5 max-w-[240px] text-center leading-relaxed select-none">
                “May Allah bless both families with barakah.”
              </p>
            </div>
          </motion.div>

          {/* BRIDE PARENTS PANEL */}
          <motion.div
            variants={rightCardVariants}
            className="w-full max-w-[295px] sm:max-w-[320px] md:max-w-[340px] bg-gradient-to-br from-[#FFFFFF] via-[#FFFDF9] to-[#F7F2E8] py-7 sm:py-9 md:py-10 px-5 sm:px-6 rounded-[130px_130px_22px_22px] sm:rounded-[150px_150px_26px_26px] border border-[#D4AF37]/45 shadow-[0_10px_28px_rgba(74,8,27,0.04),0_2px_8px_rgba(212,175,55,0.06),inset_0_1.5px_3px_rgba(255,255,255,0.9)] flex flex-col items-center text-center relative group overflow-hidden select-none transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(212,175,55,0.14)]"
          >
            {/* Subtle paper grain texture */}
            <div 
              className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay z-0" 
              style={{ 
                backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.1) 0.5px, transparent 0.5px)`, 
                backgroundSize: "3px 3px" 
              }} 
            />

            {/* Embossed Islamic geometric watermark (2% opacity) */}
            <div 
              className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%234A081B' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%234A081B' stroke-width='1'/%3E%3C/svg%3E")`, 
                backgroundSize: "50px 50px" 
              }} 
            />

            {/* Corner ornaments */}
            <FloralOrnament position="bottom-left" opacity={0.25} />
            <FloralOrnament position="bottom-right" opacity={0.25} />

            {/* Double inner gold arch borders */}
            <div className="absolute inset-[7px] border border-[#D4AF37]/20 rounded-[123px_123px_15px_15px] pointer-events-none" />
            <div className="absolute inset-[10px] border border-dashed border-[#D4AF37]/12 rounded-[120px_120px_12px_12px] pointer-events-none" />

            <div className="w-full flex flex-col items-center relative z-10">
              
              {/* Top Islamic Star Emblem */}
              <IslamicEmblem />

              {/* Refined Integrated Gold Title Banner */}
              <span className="font-cinzel text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.28em] text-[#856124] font-extrabold pb-1.5 mb-5 border-b border-[#D4AF37]/35 select-none">
                Parents of the Bride
              </span>

              {/* Names & Roles Hierarchy */}
              <div className="w-full space-y-3.5 my-1">
                {/* Father */}
                <div>
                  <h3 className="font-cormorant text-xl sm:text-[22px] md:text-[24px] text-[#4A081B] tracking-wide font-bold leading-tight select-all">
                    Hasham Ismail Kazi
                  </h3>
                  <p className="font-cormorant text-xs italic text-[#856124] font-semibold mt-0.5">
                    Father
                  </p>
                </div>
                
                {/* Thin Gold Divider */}
                <div className="w-12 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto" />

                {/* Mother */}
                <div>
                  <h3 className="font-cormorant text-xl sm:text-[22px] md:text-[24px] text-[#4A081B] tracking-wide font-bold leading-tight select-all">
                    Seemab Hasham Kazi
                  </h3>
                  <p className="font-cormorant text-xs italic text-[#856124] font-semibold mt-0.5">
                    Mother
                  </p>
                </div>
              </div>

              {/* Blessing Line */}
              <p className="font-cormorant text-xs sm:text-[13px] italic text-[#856124] font-medium mt-5 max-w-[240px] text-center leading-relaxed select-none">
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
