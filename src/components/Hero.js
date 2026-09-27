"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
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
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none max-w-full">
      {/* 1a. Dedicated Mobile 9:16 Master Venue Asset (< 768px) */}
      <img 
        src="/hero_palace_bg_mobile.jpg" 
        alt="Luxury Islamic Wedding Pavilion Venue Mobile" 
        className="block md:hidden absolute inset-0 w-full h-full object-cover object-center pointer-events-none transform-gpu" 
      />

      {/* 1b. Photorealistic 8K Master Desktop & Tablet Venue Asset (>= 768px - Untouched Original) */}
      <img 
        src="/hero_palace_bg.jpg" 
        alt="Luxury Islamic Wedding Pavilion Venue Desktop" 
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-[50%_top] pointer-events-none transform-gpu" 
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

// Groom Miniature Luxury Hand-Crafted 2D Wedding Illustration
const GroomIllustration = () => (
  <div className="w-[32px] h-[40px] md:w-[36px] md:h-[44px] relative flex items-center justify-center filter drop-shadow-[0_3px_8px_rgba(212,175,55,0.5)] select-none pointer-events-none">
    <svg className="w-full h-full" viewBox="0 0 70 95" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="groomHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FCF6BA" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#4A081B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sherwaniCream" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="60%" stopColor="#FFF8ED" />
          <stop offset="100%" stopColor="#F5E4C3" />
        </linearGradient>
        <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFF5D1" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9A772B" />
        </linearGradient>
      </defs>

      {/* Soft Backing Glow */}
      <circle cx="35" cy="48" r="34" fill="url(#groomHalo)" />

      {/* Royal Turban / Pagri (Burgundy with Gold Kalgi Feather) */}
      <path d="M 20 25 C 20 12, 28 8, 35 8 C 42 8, 50 12, 50 25 C 50 28, 20 28, 20 25 Z" fill="#4A081B" stroke="#D4AF37" strokeWidth="0.8" />
      <path d="M 22 21 C 28 16, 42 16, 48 21 C 50 25, 20 25, 22 21 Z" fill="url(#goldAccent)" opacity="0.9" />
      {/* Turban Brooch & Feather */}
      <polygon points="35,6 38,12 35,15 32,12" fill="#FCF6BA" stroke="#D4AF37" strokeWidth="0.6" />
      <path d="M 35,6 C 37,1, 40,0, 37,5" fill="none" stroke="#FFF5D1" strokeWidth="1" />

      {/* Face */}
      <ellipse cx="35" cy="30" rx="11" ry="10.5" fill="#FFEAD8" />
      {/* Hair strands */}
      <path d="M 24 27 C 26 23, 31 22, 33 25" fill="none" stroke="#2D1500" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 37 25 C 39 22, 44 23, 46 27" fill="none" stroke="#2D1500" strokeWidth="1.2" strokeLinecap="round" />
      {/* Delicate Eyes & Catchlights */}
      <circle cx="30" cy="30" r="1.5" fill="#2A1200" />
      <circle cx="40" cy="30" r="1.5" fill="#2A1200" />
      <circle cx="30.5" cy="29.5" r="0.5" fill="#FFFFFF" />
      <circle cx="40.5" cy="29.5" r="0.5" fill="#FFFFFF" />
      {/* Rosy Cheeks */}
      <circle cx="27" cy="33" r="1.8" fill="#FFB4A2" opacity="0.6" />
      <circle cx="43" cy="33" r="1.8" fill="#FFB4A2" opacity="0.6" />
      {/* Soft Smile */}
      <path d="M 32.5 35.5 Q 35 38 37.5 35.5" fill="none" stroke="#A84232" strokeWidth="1" strokeLinecap="round" />

      {/* Ivory Sherwani Body */}
      <path d="M 18 42 C 18 38, 52 38, 52 42 L 56 82 C 56 85, 52 87, 48 87 L 22 87 C 18 87, 14 85, 14 82 Z" fill="url(#sherwaniCream)" stroke="#D4AF37" strokeWidth="1" />
      {/* Gold Embroidered Collar */}
      <path d="M 27 40 L 35 46 L 43 40" fill="none" stroke="url(#goldAccent)" strokeWidth="2" strokeLinecap="round" />
      
      {/* Central Placket & Gold Buttons */}
      <line x1="35" y1="46" x2="35" y2="85" stroke="url(#goldAccent)" strokeWidth="1.5" />
      <circle cx="35" cy="52" r="1.2" fill="#FCF6BA" />
      <circle cx="35" cy="60" r="1.2" fill="#FCF6BA" />
      <circle cx="35" cy="68" r="1.2" fill="#FCF6BA" />
      <circle cx="35" cy="76" r="1.2" fill="#FCF6BA" />

      {/* Burgundy Draped Shoulder Sash */}
      <path d="M 18 44 C 15 52, 16 68, 20 83 L 25 83 C 21 68, 20 52, 22 44 Z" fill="#4A081B" stroke="#D4AF37" strokeWidth="0.6" />

      {/* Churidar & Gold Shoes */}
      <path d="M 24 87 L 30 87 L 29 93 L 23 93 Z" fill="#2D030F" />
      <path d="M 40 87 L 46 87 L 47 93 L 41 93 Z" fill="#2D030F" />
      <path d="M 21 93 C 21 91, 29 90, 31 93 C 29 95, 21 95, 21 93 Z" fill="url(#goldAccent)" />
      <path d="M 39 93 C 39 91, 47 90, 49 93 C 47 95, 39 95, 39 93 Z" fill="url(#goldAccent)" />
    </svg>
  </div>
);

// Bride Miniature Luxury Hand-Crafted 2D Wedding Illustration
const BrideIllustration = () => (
  <div className="w-[32px] h-[40px] md:w-[36px] md:h-[44px] relative flex items-center justify-center filter drop-shadow-[0_3px_8px_rgba(212,175,55,0.5)] select-none pointer-events-none">
    <svg className="w-full h-full" viewBox="0 0 70 95" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="brideHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FCF6BA" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#4A081B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lehengaIvory" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="50%" stopColor="#FFF8ED" />
          <stop offset="100%" stopColor="#EAD3B3" />
        </linearGradient>
        <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFF5D1" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9A772B" />
        </linearGradient>
      </defs>

      {/* Soft Backing Glow */}
      <circle cx="35" cy="48" r="34" fill="url(#brideHalo)" />

      {/* Back Flowing Sheer Veil Shadow */}
      <path d="M 14 28 C 8 48, 10 75, 15 88 L 55 88 C 60 75, 62 48, 56 28 Z" fill="#4A081B" opacity="0.3" />

      {/* Face */}
      <ellipse cx="35" cy="30" rx="10.5" ry="10" fill="#FFEAD8" />

      {/* Elegant Burgundy Head Hijab / Veil */}
      <path d="M 20 22 C 20 12, 27 8, 35 8 C 43 8, 50 12, 50 22 C 50 32, 47 38, 45 40 C 40 42, 30 42, 25 40 C 23 38, 20 32, 20 22 Z" fill="#4A081B" />
      {/* Hijab Gold Scalloped Lace Edge */}
      <path d="M 20 22 C 22 13, 27 10, 35 10 C 43 10, 48 13, 50 22" fill="none" stroke="url(#goldAccent)" strokeWidth="1.6" />

      {/* Forehead Gold Jewelry (Matha Patti) */}
      <circle cx="35" cy="15" r="1.5" fill="#FCF6BA" />
      <path d="M 28 20 Q 35 17 42 20" fill="none" stroke="url(#goldAccent)" strokeWidth="0.8" />

      {/* Delicate Eyes & Eyelashes */}
      <circle cx="30" cy="29.5" r="1.4" fill="#2A1200" />
      <circle cx="40" cy="29.5" r="1.4" fill="#2A1200" />
      <circle cx="30.4" cy="29" r="0.4" fill="#FFFFFF" />
      <circle cx="40.4" cy="29" r="0.4" fill="#FFFFFF" />
      <path d="M 28.5 28 L 30 28" stroke="#2A1200" strokeWidth="0.6" />
      <path d="M 40 28 L 41.5 28" stroke="#2A1200" strokeWidth="0.6" />
      {/* Rosy Cheeks */}
      <circle cx="27" cy="32" r="1.8" fill="#FFB4A2" opacity="0.65" />
      <circle cx="43" cy="32" r="1.8" fill="#FFB4A2" opacity="0.65" />
      {/* Soft Smile */}
      <path d="M 32.5 34.5 Q 35 37 37.5 34.5" fill="none" stroke="#A84232" strokeWidth="1" strokeLinecap="round" />

      {/* Bridal Lehenga Flared Skirt */}
      <path d="M 22 44 C 22 40, 48 40, 48 44 L 60 85 C 60 88, 52 90, 35 90 C 18 90, 10 88, 10 85 Z" fill="url(#lehengaIvory)" stroke="url(#goldAccent)" strokeWidth="0.8" />
      {/* Golden Floral Embroidery Lines on Lehenga */}
      <path d="M 10 85 Q 35 81 60 85" fill="none" stroke="url(#goldAccent)" strokeWidth="2.5" />
      <path d="M 14 80 Q 35 76 56 80" fill="none" stroke="url(#goldAccent)" strokeWidth="0.8" strokeDasharray="1.5,1.5" />
      <circle cx="24" cy="65" r="1.2" fill="#D4AF37" />
      <circle cx="35" cy="62" r="1.5" fill="#FCF6BA" />
      <circle cx="46" cy="65" r="1.2" fill="#D4AF37" />

      {/* Burgundy Dupatta Overlay */}
      <path d="M 20 42 C 16 50, 13 65, 15 85 C 18 85, 22 83, 24 70 C 22 55, 24 48, 23 42 Z" fill="#4A081B" stroke="url(#goldAccent)" strokeWidth="0.6" />
      <path d="M 50 42 C 54 50, 57 65, 55 85 C 52 85, 48 83, 46 70 C 48 55, 46 48, 47 42 Z" fill="#4A081B" stroke="url(#goldAccent)" strokeWidth="0.6" />

      {/* Gold Bangles */}
      <rect x="17" y="58" width="3.5" height="5" rx="0.8" fill="url(#goldAccent)" />
      <rect x="49.5" y="58" width="3.5" height="5" rx="0.8" fill="url(#goldAccent)" />
    </svg>
  </div>
);

// Letter-Level Interactive Hotspot Component
const LetterInteractiveName = ({ fullName, isBride = false, isMobile }) => {
  const [activeCharIndex, setActiveCharIndex] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const mobileTimerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  const handleLetterHover = (index) => {
    if (prefersReducedMotion) return;
    setActiveCharIndex(index);
  };

  const handleLetterClick = (index) => {
    if (prefersReducedMotion) return;
    setActiveCharIndex(index);
    if (mobileTimerRef.current) clearTimeout(mobileTimerRef.current);
    // Auto dismiss after 1.8 seconds on touch devices
    mobileTimerRef.current = setTimeout(() => {
      setActiveCharIndex(null);
    }, 1800);
  };

  const handleContainerLeave = () => {
    if (!isMobile) {
      setActiveCharIndex(null);
    }
  };

  const letters = fullName.split("");

  return (
    <div 
      onPointerLeave={handleContainerLeave}
      className={`relative inline-flex items-center justify-center select-none font-cormorant text-[clamp(28px,7.5vw,62px)] sm:text-[clamp(36px,8.5vw,62px)] font-bold text-[#4A081B] tracking-tighter leading-none py-0 sm:py-[clamp(1px,0.4vh,6px)] my-0 ${
        isBride ? "living-gold-name-huda" : "living-gold-name-fawzan"
      }`}
    >
      {/* Living Gold Light Sheen Sweep Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-20">
        <div 
          className={`w-1/2 h-full bg-gradient-to-r from-transparent via-[#FCF6BA]/40 to-transparent ${
            isBride ? "living-sheen-overlay-huda" : "living-sheen-overlay-fawzan"
          }`}
        />
      </div>

      {/* SINGLE ACTIVE FLOATING MINIATURE CHARACTER THAT SLIDES SMOOTHLY BETWEEN LETTERS */}
      <AnimatePresence>
        {activeCharIndex !== null && (
          <motion.div
            key={`sliding-character-${isBride ? 'bride' : 'groom'}`}
            initial={{ 
              opacity: 0, 
              scale: 0.65, 
              y: 6,
              left: `${((activeCharIndex + 0.5) / letters.length) * 100}%`
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: isMobile ? -28 : -40,
              left: `${((activeCharIndex + 0.5) / letters.length) * 100}%`
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.65, 
              y: 6 
            }}
            transition={{
              left: { type: "spring", stiffness: 380, damping: 28 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              y: { duration: 0.25, ease: "easeOut" }
            }}
            className="absolute top-0 -translate-x-1/2 pointer-events-none z-30 flex items-center justify-center"
          >
            {/* Subtle Idle Floating Breathing & Sway Motion */}
            <motion.div
              animate={{ 
                y: [0, -3.2, 0],
                x: [0, 0.6, -0.6, 0],
                rotate: [-0.6, 0.6, -0.6]
              }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              {isBride ? <BrideIllustration /> : <GroomIllustration />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INDIVIDUAL LETTERS OF THE NAME */}
      {letters.map((char, index) => {
        const isActive = activeCharIndex === index;

        return (
          <span
            key={index}
            onPointerEnter={!isMobile ? () => handleLetterHover(index) : undefined}
            onClick={() => handleLetterClick(index)}
            className="relative inline-block px-[1.5px] sm:px-[2.5px] md:px-[3.5px] cursor-pointer transition-colors duration-200"
            style={{
              color: isActive ? "#856124" : "#4A081B",
              textShadow: isActive
                ? "0 0 12px rgba(212, 175, 55, 0.85), 0 0 4px rgba(255, 248, 237, 0.9)"
                : undefined,
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default function Hero() {
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

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
      className="relative h-[100svh] min-h-[100dvh] w-full flex flex-col items-center justify-between px-3 sm:px-6 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] overflow-hidden z-10 max-w-full select-none"
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

        @keyframes living-gold-breath-fawzan {
          0%, 100% {
            filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.85)) drop-shadow(0 0 2px rgba(212, 175, 55, 0.12));
          }
          35% {
            filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 11px rgba(212, 175, 55, 0.55)) drop-shadow(0 0 4px rgba(252, 246, 186, 0.75));
          }
          65% {
            filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.85)) drop-shadow(0 0 4px rgba(212, 175, 55, 0.25));
          }
        }

        @keyframes living-gold-breath-huda {
          0%, 100% {
            filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.85)) drop-shadow(0 0 2px rgba(212, 175, 55, 0.1));
          }
          40% {
            filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 9px rgba(212, 175, 55, 0.45)) drop-shadow(0 0 3px rgba(255, 248, 237, 0.65));
          }
          70% {
            filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.85)) drop-shadow(0 0 3px rgba(212, 175, 55, 0.2));
          }
        }

        .living-gold-name-fawzan {
          animation: living-gold-breath-fawzan 6.2s infinite ease-in-out;
        }

        .living-gold-name-huda {
          animation: living-gold-breath-huda 6.2s infinite ease-in-out 1.8s;
        }

        @keyframes text-sheen-sweep {
          0% {
            transform: translateX(-160%) skewX(-20deg);
            opacity: 0;
          }
          15% {
            opacity: 0.65;
          }
          45% {
            transform: translateX(180%) skewX(-20deg);
            opacity: 0.65;
          }
          60%, 100% {
            transform: translateX(180%) skewX(-20deg);
            opacity: 0;
          }
        }

        .living-sheen-overlay-fawzan {
          animation: text-sheen-sweep 6.2s infinite ease-in-out;
        }

        .living-sheen-overlay-huda {
          animation: text-sheen-sweep 6.2s infinite ease-in-out 1.8s;
        }

        @media (prefers-reduced-motion: reduce) {
          .living-gold-name-fawzan,
          .living-gold-name-huda,
          .living-sheen-overlay-fawzan,
          .living-sheen-overlay-huda {
            animation: none !important;
          }
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
          STABLE RESPONSIVE ARCH-INTEGRATED TEXT CENTERPIECE
          ================================================== */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full text-center select-none my-auto">
        
        {/* Borderless text centerpiece positioned directly inside the architectural arch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8, filter: "blur(2px)" }}
          animate={{ 
            opacity: isEntering ? 0.3 : 1, 
            scale: 1,
            y: 0,
            filter: "blur(0px)"
          }}
          transition={{ 
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="relative w-[78vw] sm:w-[84vw] md:w-[70vw] max-w-[320px] sm:max-w-[460px] px-2 sm:px-4 py-0.5 sm:py-2 flex flex-col items-center justify-center pointer-events-auto select-none my-auto"
        >
          {/* Sequential text reveals positioned inside the background arch */}
          <div className="w-full flex flex-col items-center justify-center text-center z-10">
            {/* Top Islamic star rosette */}
            <div className="w-5 h-5 sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#856124] mb-0.5 sm:mb-[clamp(2px,0.8vh,12px)] relative flex items-center justify-center">
              <svg className="w-full h-full drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" />
                <path d="M 50 25 L 75 50 L 50 75 L 25 50 Z" />
                <circle cx="50" cy="50" r="6" fill="currentColor" />
              </svg>
            </div>

            {/* Families Line */}
            <p className="font-cormorant italic text-[clamp(8.5px,2.2vw,14px)] text-[#5C3D1E] tracking-[0.15em] sm:tracking-[0.26em] uppercase mb-0.5 sm:mb-[clamp(2px,0.8vh,12px)] font-semibold drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] px-1">
              Together with their families
            </p>

            {/* Groom Label */}
            <p className="font-inter text-[clamp(7px,1.8vw,9.5px)] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#856124] font-bold mb-0 sm:mb-0.5 select-none">
              THE GROOM
            </p>

            {/* Groom Name */}
            <LetterInteractiveName 
              fullName="Fawzan" 
              isBride={false} 
              isMobile={isMobile} 
            />

            {/* Star Rosette Divider */}
            <div className="my-0.5 sm:my-[clamp(2px,0.8vh,12px)] w-full flex items-center justify-center gap-2 sm:gap-4 relative pointer-events-none">
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ transformOrigin: "right center" }}
                className="h-[0.5px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-[#856124]/60" 
              />
              <div className="relative flex items-center justify-center">
                <div className="absolute w-6 h-6 sm:w-10 sm:h-10 rounded-full border border-[#856124]/30 pointer-events-none z-30" />
                <div className="text-[#856124] flex items-center justify-center drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] z-10">
                  <svg className="w-4 h-4 sm:w-6.5 sm:h-6.5 animate-pulse-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M 50 12 L 61 39 L 88 50 L 61 61 L 50 88 L 39 61 L 12 50 L 39 39 Z" />
                    <circle cx="50" cy="50" r="7.5" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ transformOrigin: "left center" }}
                className="h-[0.5px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-[#856124]/60" 
              />
            </div>

            {/* Bride Label */}
            <p className="font-inter text-[clamp(7px,1.8vw,9.5px)] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#856124] font-bold mb-0 sm:mb-0.5 select-none">
              THE BRIDE
            </p>

            {/* Bride Name */}
            <LetterInteractiveName 
              fullName="Huda" 
              isBride={true} 
              isMobile={isMobile} 
            />

            {/* Honor request line */}
            <p className="font-inter text-[clamp(7px,1.8vw,10px)] text-[#856124] font-bold uppercase tracking-[0.14em] sm:tracking-[0.25em] mt-1 sm:mt-[clamp(1px,0.5vh,6px)] mb-0.5 sm:mb-[clamp(1px,0.5vh,6px)] px-1">
              Request the honor of your presence
            </p>

            {/* Nikah ceremony description */}
            <p className="font-cormorant italic text-[clamp(11px,2.8vw,20px)] text-[#3D2314] font-medium max-w-[210px] sm:max-w-[300px] leading-tight sm:leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              at their blessed Nikah ceremony
            </p>

            {/* Subtle gold line divider */}
            <div className="w-8 sm:w-12 h-[0.5px] bg-[#856124]/50 my-0.5 sm:my-[clamp(2px,0.6vh,8px)] pointer-events-none" />

            {/* Sacred Date Micro-Detail */}
            <p className="font-cinzel text-[clamp(8px,2.0vw,10.5px)] tracking-[0.2em] sm:tracking-[0.28em] text-[#856124] font-bold mb-0.5 sm:mb-0">
              09 • 12 • 2026
            </p>
          </div>
        </motion.div>

        {/* Premium Medallion CTA Button ("TAP TO ENTER") with Refined Continuous Idle Motion */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="mt-1.5 sm:mt-2.5 md:mt-[clamp(16px,3.5vh,36px)] mb-1 z-20 flex flex-col items-center justify-center pointer-events-auto"
        >
          <motion.button
            onClick={handleEnterClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            animate={{ 
              boxShadow: [
                "0 6px 18px rgba(212,175,55,0.35), 0 0 10px rgba(212,175,55,0.15)",
                "0 8px 24px rgba(232,199,106,0.55), 0 0 16px rgba(212,175,55,0.3)",
                "0 6px 18px rgba(212,175,55,0.35), 0 0 10px rgba(212,175,55,0.15)"
              ]
            }}
            transition={{ 
              boxShadow: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
              scale: { type: "spring", stiffness: 400, damping: 18 }
            }}
            className="w-[clamp(60px,15vw,80px)] h-[clamp(60px,15vw,80px)] md:w-20 md:h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#BF953F] via-[#FCF6BA] to-[#B38728] relative group flex items-center justify-center cursor-pointer select-none focus:outline-none"
          >
            {/* Center Burgundy Core */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#4A081B] via-[#310411] to-[#1F000A] shadow-[inset_0_2px_5px_rgba(0,0,0,0.65)] flex flex-col items-center justify-center p-2 relative overflow-hidden">
              
              {/* Inner Gold Bead Trim Ring */}
              <div className="absolute inset-[3px] border border-dashed border-[#FCF6BA]/35 rounded-full pointer-events-none z-10" />
              
              {/* Gold Light Sweep Across Medallion */}
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 4.0, ease: "linear", delay: 0.5 }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#FCF6BA]/35 to-transparent skew-x-12"
                />
              </div>

              {/* Refined Downward Chevron Movement */}
              <motion.svg 
                animate={{ y: [0, 2.5, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FCF6BA] mb-0.5" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.8" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </motion.svg>

              {/* Engraved Luxury Text */}
              <span className="font-cinzel text-[6.5px] sm:text-[7.5px] md:text-[8px] tracking-[0.2em] font-extrabold text-[#FCF6BA] leading-tight text-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
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
