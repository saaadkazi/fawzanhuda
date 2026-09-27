"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import FloralOrnament from "./FloralOrnament";

// Reusable Hanging Gold Lantern component with desynchronized pendulum movement
const HangingLantern = ({ side }) => {
  const isLeft = side === "left";
  return (
    <div
      className={`absolute top-0 ${
        isLeft ? "left-3 sm:left-6 md:left-14" : "right-3 sm:right-6 md:right-14"
      } w-7 md:w-9 h-32 md:h-36 z-[3] pointer-events-none flex flex-col items-center opacity-90 ${
        isLeft ? "lantern-pendulum-left" : "lantern-pendulum-right"
      }`}
      style={{ transformOrigin: "top center" }}
    >
      {/* Fine gold chain */}
      <div className="w-[1px] h-16 md:h-20 bg-[#D4AF37]/50 shadow-[0.5px_0_0_rgba(255,255,255,0.4)]" />
      
      {/* Dome top of lantern */}
      <div className="w-4 md:w-5 h-2 md:h-2.5 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] rounded-t-full relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 md:w-7 h-5 md:h-7 rounded-full bg-[#E8C76A]/30 blur-sm" />
      </div>
      
      {/* Hexagonal lantern cage */}
      <div className="w-5.5 md:w-6.5 h-7 md:h-8 border border-[#D4AF37] bg-gradient-to-b from-[#FFFDF9]/95 via-[#FFFDF9] to-[#F6EBDD]/95 relative flex items-center justify-center shadow-md">
        {/* Pulsating warm flame light inside */}
        <motion.div 
          animate={{ opacity: [0.55, 0.95, 0.55], scale: [0.95, 1.08, 0.95] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          className="absolute w-3 md:w-3.5 h-4.5 md:h-5 rounded-full bg-gradient-to-b from-[#FFEAA7] via-[#FFD166] to-[#6D0F2A]/40 blur-[2px] z-0"
        />
        {/* Geometric cage screen */}
        <div className="absolute inset-0 flex items-center justify-center text-[#D4AF37]/50 z-10">
          <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none stroke-[0.85]">
            <path d="M12 2 L12 22 M2 12 L22 12 M4 4 L20 20 M4 20 L20 4" />
          </svg>
        </div>
      </div>
      
      {/* Bottom spire elements */}
      <div className="w-1.5 md:w-2 h-1 bg-gradient-to-r from-[#BF953F] to-[#B38728] rounded-b-sm" />
      <div className="w-[1px] h-3 bg-[#D4AF37]/60" />
    </div>
  );
};

// 8-Pointed Rub el Hizb Islamic Star Emblem Subcomponent with live micro-animation
const IslamicEmblem = () => (
  <div className="w-7 h-7 text-[#D4AF37] flex items-center justify-center relative rounded-full p-0.5">
    {/* Restrained burgundy aura behind ornament */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#6D0F2A]/20 to-[#8B1438]/15 rounded-full blur-sm -z-10 animate-pulse" />
    
    <div className="w-full h-full emblem-ornament-motion flex items-center justify-center">
      <svg className="w-full h-full drop-shadow-[0_1px_4px_rgba(109,15,42,0.25)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M 50 12 L 62 38 L 88 50 L 62 62 L 50 88 L 38 62 L 12 50 L 38 38 Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M 50 20 L 70 50 L 50 80 L 30 50 Z" strokeWidth="1.1" strokeDasharray="2.5,2.5" />
        <circle cx="50" cy="50" r="6" fill="currentColor" />
        <circle cx="50" cy="50" r="2.5" fill="#6D0F2A" />
      </svg>
    </div>
  </div>
);

// CSS Gold Dust Floating Particles (Lightweight, pure CSS keyframe rendering)
const GOLD_DUST_PARTICLES = [
  { left: "10%", top: "20%", delay: "0s", duration: "9s", scale: 0.8 },
  { left: "22%", top: "65%", delay: "2.5s", duration: "11s", scale: 1.1 },
  { left: "38%", top: "30%", delay: "5s", duration: "8.5s", scale: 0.7 },
  { left: "52%", top: "75%", delay: "1.2s", duration: "12s", scale: 1.2 },
  { left: "68%", top: "25%", delay: "4s", duration: "10s", scale: 0.9 },
  { left: "82%", top: "60%", delay: "3.2s", duration: "9.5s", scale: 1.0 },
  { left: "91%", top: "35%", delay: "6.5s", duration: "11.5s", scale: 0.8 },
];

function Parents() {
  // Staggered Entrance Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemRevealVariants = {
    hidden: { opacity: 0, y: 22, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const headingTextVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: "easeOut" },
    },
  };

  // Card Internal Text Stagger
  const cardTextStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.15,
      },
    },
  };

  const cardTextItem = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section 
      id="parents-section"
      style={{
        background: "radial-gradient(circle at 50% 35%, #FFFDF9 0%, #F6EBDD 65%, #EFE3D3 100%)"
      }}
      className="py-14 sm:py-18 md:py-24 px-3 sm:px-4 relative overflow-hidden flex flex-col items-center select-none"
    >
      {/* Dynamic Keyframes & Styles for Burgundy Atmosphere & Border Highlights */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Burgundy Live Atmosphere Drift & Breathing */
        @keyframes burgundyDriftBreathing {
          0% {
            transform: translate(-50%, -50%) scale(1.0) translateY(0px) translateX(0px);
            opacity: 0.55;
          }
          33% {
            transform: translate(-50%, -50%) scale(1.04) translateY(-14px) translateX(10px);
            opacity: 0.75;
          }
          66% {
            transform: translate(-50%, -50%) scale(1.02) translateY(12px) translateX(-12px);
            opacity: 0.60;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.0) translateY(0px) translateX(0px);
            opacity: 0.55;
          }
        }

        .burgundy-atmosphere-bg {
          animation: burgundyDriftBreathing 11s ease-in-out infinite;
        }

        /* Burgundy Ambient Light Sweep */
        @keyframes burgundySweepMotion {
          0% {
            transform: translateX(-110%) rotate(-12deg);
            opacity: 0;
          }
          20% {
            opacity: 0.55;
          }
          60% {
            opacity: 0.55;
          }
          100% {
            transform: translateX(210%) rotate(-12deg);
            opacity: 0;
          }
        }

        .burgundy-light-sweep {
          animation: burgundySweepMotion 15s ease-in-out infinite;
          animation-delay: 2s;
        }

        /* Card Border Traveling Gold Highlight */
        @keyframes borderGoldSweep {
          0% {
            transform: translateX(-100%) translateY(-100%);
            opacity: 0;
          }
          15% {
            opacity: 0.85;
          }
          50% {
            opacity: 0.85;
          }
          85% {
            opacity: 0.85;
          }
          100% {
            transform: translateX(200%) translateY(200%);
            opacity: 0;
          }
        }

        .card-border-highlight::after {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1.5px;
          background: linear-gradient(135deg, transparent 30%, #FFF2B2 48%, #D4AF37 52%, transparent 70%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          animation: borderGoldSweep 8s ease-in-out infinite;
        }

        .card-border-highlight-delay-1::after {
          animation-delay: 1.8s;
        }

        .card-border-highlight-delay-2::after {
          animation-delay: 3.6s;
        }

        /* Gold Dust Floating Animation */
        @keyframes goldDustFloat {
          0% {
            transform: translateY(0px) scale(0.9);
            opacity: 0;
          }
          25% {
            opacity: 0.65;
          }
          75% {
            opacity: 0.65;
          }
          100% {
            transform: translateY(-80px) scale(1.1);
            opacity: 0;
          }
        }

        .gold-dust-particle {
          animation: goldDustFloat linear infinite;
        }

        /* Ornament Gentle Float & Soft Rotation */
        @keyframes ornamentFloatRotate {
          0% {
            transform: translateY(0px) rotate(-3deg) scale(1);
          }
          50% {
            transform: translateY(-2.5px) rotate(3deg) scale(1.03);
          }
          100% {
            transform: translateY(0px) rotate(-3deg) scale(1);
          }
        }

        .emblem-ornament-motion {
          animation: ornamentFloatRotate 5s ease-in-out infinite;
        }

        /* Pendulum Lantern Swaying */
        @keyframes lanternSwayL {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(2.2deg); }
          75% { transform: rotate(-2.2deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes lanternSwayR {
          0% { transform: rotate(0deg); }
          30% { transform: rotate(-2.4deg); }
          70% { transform: rotate(2.4deg); }
          100% { transform: rotate(0deg); }
        }

        .lantern-pendulum-left {
          animation: lanternSwayL 8.5s ease-in-out infinite;
        }

        .lantern-pendulum-right {
          animation: lanternSwayR 10.2s ease-in-out infinite;
        }

        /* Desktop Card Hover Enhancement */
        @media (hover: hover) and (pointer: fine) {
          .parent-invitation-card {
            transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease;
          }
          .parent-invitation-card:hover {
            transform: translateY(-4px);
            border-color: rgba(212, 175, 55, 0.8);
            box-shadow: 0 16px 36px rgba(109, 15, 42, 0.12), 0 4px 14px rgba(212, 175, 55, 0.22), inset 0 0 20px rgba(109, 15, 42, 0.03);
          }
        }

        /* Accessibility: prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .burgundy-atmosphere-bg,
          .burgundy-light-sweep,
          .card-border-highlight::after,
          .gold-dust-particle,
          .emblem-ornament-motion,
          .lantern-pendulum-left,
          .lantern-pendulum-right {
            animation: none !important;
            transform: none !important;
            opacity: 0.5 !important;
          }
        }
      `}} />

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

      {/* ==================================================
          1. BURGUNDY LIVE ATMOSPHERE (Behind Central Composition)
          ================================================== */}
      <div 
        className="burgundy-atmosphere-bg absolute top-1/2 left-1/2 w-[340px] sm:w-[540px] md:w-[740px] h-[340px] sm:h-[540px] md:h-[740px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(109,15,42,0.18) 0%, rgba(139,20,56,0.12) 40%, rgba(74,8,27,0.04) 65%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />

      {/* Secondary Warm Champagne Light Wash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[460px] md:w-[650px] h-[300px] sm:h-[460px] md:h-[650px] bg-gradient-to-tr from-[#D4AF37]/10 via-[#FFF8ED]/20 to-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none z-0" />

      {/* ==================================================
          2. BURGUNDY LIGHT SWEEP (Slow Ambient Drift)
          ================================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="burgundy-light-sweep absolute top-[-20%] left-0 w-[45%] h-[140%] pointer-events-none"
          style={{
            background: "linear-gradient(115deg, transparent 0%, rgba(109,15,42,0.02) 20%, rgba(139,20,56,0.12) 50%, rgba(109,15,42,0.02) 80%, transparent 100%)",
            filter: "blur(35px)",
          }}
        />
      </div>

      {/* Floating Gold Dust Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {GOLD_DUST_PARTICLES.map((particle, idx) => (
          <div
            key={idx}
            className="gold-dust-particle absolute rounded-full bg-gradient-to-tr from-[#FFEAA7] via-[#D4AF37] to-[#FFD166] shadow-[0_0_6px_rgba(212,175,55,0.8)]"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${4 * particle.scale}px`,
              height: `${4 * particle.scale}px`,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {/* Subtle vignette frame edges */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(246,235,221,0)_50%,rgba(74,8,27,0.06)_100%)] z-0" />

      {/* ==================================================
          MAIN LUXURY ARCHITECTURAL CASING FRAME
          ================================================== */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="max-w-4xl w-full relative z-10 flex flex-col items-center py-8 sm:py-10 md:py-14 px-3 sm:px-6 md:px-10 border border-[#D4AF37]/50 rounded-[140px_140px_32px_32px] sm:rounded-[180px_180px_40px_40px] shadow-[0_12px_40px_rgba(74,8,27,0.06),0_2px_10px_rgba(212,175,55,0.1),inset_0_1px_2px_rgba(255,255,255,0.9)] bg-gradient-to-b from-[#FFFDF9]/85 via-[#FFFDF9]/50 to-[#F6EBDD]/70"
      >
        {/* Dashed Gold Inner Arch Lining */}
        <div className="absolute inset-[6px] sm:inset-[8px] border border-dashed border-[#D4AF37]/30 rounded-[134px_134px_26px_26px] sm:rounded-[172px_172px_32px_32px] pointer-events-none" />

        {/* Swaying Pendulum Lanterns inside arch casing */}
        <HangingLantern side="left" />
        <HangingLantern side="right" />

        {/* ==================================================
            8. SECTION ENTRY: HEADING & DIVIDER
            ================================================== */}
        <div className="text-center mb-6 sm:mb-8 relative z-10 flex flex-col items-center">
          {/* STEP 2: "WITH PRAISE TO ALLAH" */}
          <motion.span 
            variants={headingTextVariants}
            className="font-cormorant text-[10.5px] sm:text-xs uppercase tracking-[0.34em] text-[#856124] font-bold flex items-center justify-center gap-1.5 select-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
          >
            With Praise to Allah
            <span className="inline-block text-[#D4AF37] opacity-90 animate-pulse">✦</span>
          </motion.span>
          
          {/* STEP 3: "The Beloved Parents" */}
          <motion.h2 
            variants={headingTextVariants}
            className="font-cormorant text-3xl sm:text-3.5xl md:text-4.5xl text-[#4A081B] mt-2 tracking-wide font-light select-none drop-shadow-[0_1px_2px_rgba(74,8,27,0.08)]"
          >
            The Beloved Parents
          </motion.h2>
          
          {/* STEP 4: Divider / Ornament Illuminates */}
          <motion.div 
            variants={headingTextVariants}
            className="w-28 sm:w-36 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4 relative"
          >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D4AF37] text-[8px] bg-[#F6EBDD] px-2 select-none shadow-sm">✦</span>
          </motion.div>
        </div>

        {/* ==================================================
            STEP 5: SACRED LEGACY PLAQUE (Grandparents Memorial Card)
            ================================================== */}
        <motion.div
          variants={itemRevealVariants}
          className="card-border-highlight card-border-highlight-delay-1 parent-invitation-card w-full max-w-[285px] sm:max-w-[345px] md:max-w-[385px] bg-gradient-to-br from-[#FFFFFF] via-[#FFFDF9] to-[#F7F2E8] px-5 py-4.5 rounded-[40px_40px_18px_18px] border border-[#D4AF37]/50 shadow-[0_8px_24px_rgba(74,8,27,0.05),inset_0_1.5px_3px_rgba(255,255,255,0.95)] flex flex-col items-center text-center relative overflow-hidden mb-7 sm:mb-9 md:mb-11 select-none"
        >
          {/* Subtle paper grain texture */}
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay z-0" 
            style={{ 
              backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.1) 0.5px, transparent 0.5px)`, 
              backgroundSize: "3px 3px" 
            }} 
          />

          {/* Restrained burgundy glow accent inside card center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-to-tr from-[#6D0F2A]/10 via-[#8B1438]/8 to-transparent rounded-full blur-xl pointer-events-none z-0" />

          {/* Inner dashed line framing */}
          <div className="absolute inset-[5px] border border-dashed border-[#D4AF37]/25 rounded-[35px_35px_14px_14px] pointer-events-none z-10" />

          {/* Top Micro Crescent Icon with gentle float */}
          <div className="w-4 h-4 text-[#D4AF37] mb-1 relative z-10 opacity-95 emblem-ornament-motion">
            <svg className="w-full h-full drop-shadow-[0_1px_2px_rgba(109,15,42,0.2)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.3 2a10 10 0 0 0-1.9.2 10.4 10.4 0 0 1 .4 3c0 5.4-4 9.8-9.2 10.4a10.2 10.2 0 0 0 10.7 8.3 10 10 0 0 0 9.8-10A10 10 0 0 0 12.3 2z" />
            </svg>
          </div>

          {/* Top micro text */}
          <span className="font-cinzel text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.28em] text-[#856124] font-bold mb-1 relative z-10">
            UNDER THE BLESSED LEGACY OF
          </span>

          <div className="w-14 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent mx-auto mb-2 relative z-10" />

          {/* Legacy Names & Roles with Stagger */}
          <motion.div 
            variants={cardTextStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-0.5 relative z-10 mb-1.5 flex flex-col items-center"
          >
            <motion.h3 variants={cardTextItem} className="font-cormorant text-lg sm:text-[20px] md:text-[21px] font-bold text-[#4A081B] tracking-wide leading-snug">
              Zainuddin Kadir Kazi
            </motion.h3>
            <motion.h3 variants={cardTextItem} className="font-cormorant text-lg sm:text-[20px] md:text-[21px] font-bold text-[#4A081B] tracking-wide leading-snug">
              Fatimbi Zainuddin Kazi
            </motion.h3>
            <motion.p variants={cardTextItem} className="font-cormorant text-[9px] sm:text-[10px] md:text-[11px] text-[#856124] tracking-wider font-semibold uppercase mt-1">
              Marhoom <span className="inline-block text-[#D4AF37] mx-1">•</span> Beloved Grandfather of the Groom
            </motion.p>
          </motion.div>
        </motion.div>

        {/* ==================================================
            SYMMETRICAL FAMILY ARCH INVITATION PANELS
            ================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 px-1 sm:px-2 w-full justify-items-center relative z-10">
          
          {/* ==================================================
              STEP 6: GROOM PARENTS PANEL
              ================================================== */}
          <motion.div
            variants={itemRevealVariants}
            className="card-border-highlight card-border-highlight-delay-1 parent-invitation-card w-full max-w-[295px] sm:max-w-[320px] md:max-w-[340px] bg-gradient-to-br from-[#FFFFFF] via-[#FFFDF9] to-[#F7F2E8] py-7 sm:py-9 md:py-10 px-5 sm:px-6 rounded-[130px_130px_22px_22px] sm:rounded-[150px_150px_26px_26px] border border-[#D4AF37]/50 shadow-[0_10px_28px_rgba(74,8,27,0.05),0_2px_8px_rgba(212,175,55,0.08),inset_0_1.5px_3px_rgba(255,255,255,0.95)] flex flex-col items-center text-center relative group overflow-hidden select-none"
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

            {/* Restrained burgundy glow accent inside card center */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-tr from-[#6D0F2A]/12 via-[#8B1438]/8 to-transparent rounded-full blur-xl pointer-events-none z-0" />

            {/* Corner ornaments */}
            <FloralOrnament position="bottom-left" opacity={0.25} />
            <FloralOrnament position="bottom-right" opacity={0.25} />

            {/* Double inner gold arch borders */}
            <div className="absolute inset-[7px] border border-[#D4AF37]/22 rounded-[123px_123px_15px_15px] pointer-events-none" />
            <div className="absolute inset-[10px] border border-dashed border-[#D4AF37]/14 rounded-[120px_120px_12px_12px] pointer-events-none" />
            
            {/* Card Content with Staggered Reveal */}
            <motion.div 
              variants={cardTextStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full flex flex-col items-center relative z-10"
            >
              {/* Top Islamic Star Emblem */}
              <motion.div variants={cardTextItem}>
                <IslamicEmblem />
              </motion.div>

              {/* Refined Integrated Gold Title Banner */}
              <motion.span 
                variants={cardTextItem}
                className="font-cinzel text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.28em] text-[#856124] font-extrabold pb-1.5 mb-5 border-b border-[#D4AF37]/40 select-none"
              >
                Parents of the Groom
              </motion.span>

              {/* Names & Roles Hierarchy */}
              <div className="w-full space-y-3.5 my-1">
                {/* Father */}
                <motion.div variants={cardTextItem}>
                  <h3 className="font-cormorant text-xl sm:text-[22px] md:text-[24px] text-[#4A081B] tracking-wide font-bold leading-tight select-all">
                    Rafiq Zainuddin Kazi
                  </h3>
                  <p className="font-cormorant text-xs italic text-[#856124] font-semibold mt-0.5">
                    Father
                  </p>
                </motion.div>
                
                {/* Thin Gold & Burgundy Accent Line Divider */}
                <motion.div variants={cardTextItem} className="w-14 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 via-[#6D0F2A]/30 to-transparent mx-auto" />
                
                {/* Mother */}
                <motion.div variants={cardTextItem}>
                  <h3 className="font-cormorant text-xl sm:text-[22px] md:text-[24px] text-[#4A081B] tracking-wide font-bold leading-tight select-all">
                    Hajara Rafiq Kazi
                  </h3>
                  <p className="font-cormorant text-xs italic text-[#856124] font-semibold mt-0.5">
                    Mother
                  </p>
                </motion.div>
              </div>

              {/* Blessing Line */}
              <motion.p variants={cardTextItem} className="font-cormorant text-xs sm:text-[13px] italic text-[#856124] font-medium mt-5 max-w-[240px] text-center leading-relaxed select-none">
                “May Allah bless both families with barakah.”
              </motion.p>
            </motion.div>
          </motion.div>

          {/* ==================================================
              STEP 7: BRIDE PARENTS PANEL
              ================================================== */}
          <motion.div
            variants={itemRevealVariants}
            className="card-border-highlight card-border-highlight-delay-2 parent-invitation-card w-full max-w-[295px] sm:max-w-[320px] md:max-w-[340px] bg-gradient-to-br from-[#FFFFFF] via-[#FFFDF9] to-[#F7F2E8] py-7 sm:py-9 md:py-10 px-5 sm:px-6 rounded-[130px_130px_22px_22px] sm:rounded-[150px_150px_26px_26px] border border-[#D4AF37]/50 shadow-[0_10px_28px_rgba(74,8,27,0.05),0_2px_8px_rgba(212,175,55,0.08),inset_0_1.5px_3px_rgba(255,255,255,0.95)] flex flex-col items-center text-center relative group overflow-hidden select-none"
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

            {/* Restrained burgundy glow accent inside card center */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-tr from-[#6D0F2A]/12 via-[#8B1438]/8 to-transparent rounded-full blur-xl pointer-events-none z-0" />

            {/* Corner ornaments */}
            <FloralOrnament position="bottom-left" opacity={0.25} />
            <FloralOrnament position="bottom-right" opacity={0.25} />

            {/* Double inner gold arch borders */}
            <div className="absolute inset-[7px] border border-[#D4AF37]/22 rounded-[123px_123px_15px_15px] pointer-events-none" />
            <div className="absolute inset-[10px] border border-dashed border-[#D4AF37]/14 rounded-[120px_120px_12px_12px] pointer-events-none" />

            {/* Card Content with Staggered Reveal */}
            <motion.div 
              variants={cardTextStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full flex flex-col items-center relative z-10"
            >
              {/* Top Islamic Star Emblem */}
              <motion.div variants={cardTextItem}>
                <IslamicEmblem />
              </motion.div>

              {/* Refined Integrated Gold Title Banner */}
              <motion.span 
                variants={cardTextItem}
                className="font-cinzel text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.28em] text-[#856124] font-extrabold pb-1.5 mb-5 border-b border-[#D4AF37]/40 select-none"
              >
                Parents of the Bride
              </motion.span>

              {/* Names & Roles Hierarchy */}
              <div className="w-full space-y-3.5 my-1">
                {/* Father */}
                <motion.div variants={cardTextItem}>
                  <h3 className="font-cormorant text-xl sm:text-[22px] md:text-[24px] text-[#4A081B] tracking-wide font-bold leading-tight select-all">
                    Hasham Ismail Kazi
                  </h3>
                  <p className="font-cormorant text-xs italic text-[#856124] font-semibold mt-0.5">
                    Father
                  </p>
                </motion.div>
                
                {/* Thin Gold & Burgundy Accent Line Divider */}
                <motion.div variants={cardTextItem} className="w-14 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 via-[#6D0F2A]/30 to-transparent mx-auto" />

                {/* Mother */}
                <motion.div variants={cardTextItem}>
                  <h3 className="font-cormorant text-xl sm:text-[22px] md:text-[24px] text-[#4A081B] tracking-wide font-bold leading-tight select-all">
                    Seemab Hasham Kazi
                  </h3>
                  <p className="font-cormorant text-xs italic text-[#856124] font-semibold mt-0.5">
                    Mother
                  </p>
                </motion.div>
              </div>

              {/* Blessing Line */}
              <motion.p variants={cardTextItem} className="font-cormorant text-xs sm:text-[13px] italic text-[#856124] font-medium mt-5 max-w-[240px] text-center leading-relaxed select-none">
                “May Allah bless both families with barakah.”
              </motion.p>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

export default memo(Parents);
