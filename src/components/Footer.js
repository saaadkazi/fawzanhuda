"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, memo } from "react";
import confetti from "canvas-confetti";

// Reusable Custom Premium Social Button component with breathing glow, coordinate ripple, and radial sparks
const SocialButton = ({ href, children, ariaLabel }) => {
  const [ripples, setRipples] = useState([]);
  const [sparks, setSparks] = useState([]);

  const handleTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rippleId = Date.now() + Math.random();
    setRipples((prev) => [...prev, { id: rippleId, x, y }]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippleId));
    }, 850);

    const sparkCount = 8;
    const newSparks = Array.from({ length: sparkCount }).map((_, i) => {
      const angle = (i * 2 * Math.PI) / sparkCount + (Math.random() * 0.3 - 0.15);
      const distance = Math.random() * 30 + 25;
      return {
        id: Date.now() + i + Math.random(),
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: Math.random() * 0.45 + 0.45,
      };
    });
    setSparks(newSparks);
    
    setTimeout(() => {
      setSparks([]);
    }, 900);
  };

  return (
    <div className="relative">
      <motion.a
        whileHover={{ 
          scale: 1.08, 
          y: -3, 
          boxShadow: "0 0 25px rgba(232, 199, 106, 0.65)" 
        }}
        whileTap={{ scale: 0.92 }}
        animate={{
          boxShadow: [
            "0 0 10px rgba(212,175,55,0.15)",
            "0 0 18px rgba(212,175,55,0.4)",
            "0 0 10px rgba(212,175,55,0.15)"
          ]
        }}
        transition={{
          boxShadow: {
            repeat: Infinity,
            duration: 3.5,
            ease: "easeInOut"
          }
        }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleTap}
        className="w-10 h-10 rounded-full border border-[#D4AF37]/50 bg-gradient-to-b from-[#4A081B]/95 to-[#2D040F]/95 flex items-center justify-center text-[#E8C76A] hover:text-[#FFF8ED] transition-colors duration-300 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.22),0_4px_12px_rgba(0,0,0,0.3)] relative overflow-hidden cursor-pointer"
        aria-label={ariaLabel}
      >
        {/* Click ripple animation */}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full bg-[#E8C76A]/40 pointer-events-none animate-ripple"
            style={{
              left: r.x,
              top: r.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        <span className="relative z-10 select-none pointer-events-none">
          {children}
        </span>
      </motion.a>

      {/* Shooting Radial Sparks overlay */}
      <AnimatePresence>
        {sparks.map((s) => (
          <motion.span
            key={s.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.15 }}
            animate={{ x: s.x, y: s.y, opacity: 0, scale: s.scale }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#E8C76A] pointer-events-none z-20"
            style={{
              boxShadow: "0 0 8px rgba(232, 199, 106, 0.85)",
              top: "50%",
              left: "50%",
              marginTop: "-3px",
              marginLeft: "-3px",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Premium Blessing Orb Experience component
const BlessingOrb = () => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  
  const [showFlash, setShowFlash] = useState(false);
  const [burstRipples, setBurstRipples] = useState([]);
  const [burstSparks, setBurstSparks] = useState([]);

  const holdIntervalRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  const startHold = (e) => {
    if (e.cancelable) e.preventDefault();
    if (unlocked) return;
    
    setIsHolding(true);
    startTimeRef.current = Date.now() - (progress / 100) * 1500;
    
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    
    holdIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / 1500) * 100, 100);
      setProgress(pct);
      
      if (pct >= 100) {
        clearInterval(holdIntervalRef.current);
        triggerBurst();
      }
    }, 16);
  };

  const endHold = () => {
    setIsHolding(false);
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    
    holdIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(holdIntervalRef.current);
          return 0;
        }
        return Math.max(prev - 3, 0);
      });
    }, 15);
  };

  const triggerBurst = () => {
    setShowFlash(true);
    setIsHolding(false);
    
    const waveId = Date.now();
    setBurstRipples([{ id: waveId }]);
    setTimeout(() => {
      setBurstRipples([]);
      setShowFlash(false);
    }, 600);

    const sparkCount = 20;
    const generated = Array.from({ length: sparkCount }).map((_, i) => {
      const angle = (i * 2 * Math.PI) / sparkCount + (Math.random() * 0.3 - 0.15);
      const distance = Math.random() * 110 + 70;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: Math.random() * 0.7 + 0.45,
      };
    });
    setBurstSparks(generated);
    setTimeout(() => {
      setBurstSparks([]);
    }, 1000);

    setUnlocked(true);
  };

  const handleAmeen = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.75 },
      colors: ["#E8C76A", "#D4AF37", "#FFF8ED", "#4A081B"],
    });

    setTimeout(() => {
      setUnlocked(false);
      setProgress(0);
      setIsHolding(false);
    }, 1000);
  };

  const particleConfig = [
    { delay: 0, duration: 3.6, radiusX: 68, radiusY: 30 },
    { delay: 0.6, duration: 3.0, radiusX: -58, radiusY: 38 },
    { delay: 1.2, duration: 4.2, radiusX: 74, radiusY: -22 },
    { delay: 1.8, duration: 3.4, radiusX: -64, radiusY: -32 },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      
      {/* Flash overlay during burst */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-gradient-to-r from-[#E8C76A] via-[#FFF8ED] to-[#E8C76A] mix-blend-screen pointer-events-none z-40 rounded-3xl"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="orb-stage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-6 select-none"
          >
            {/* Section Headings */}
            <span className="font-cormorant text-xs md:text-sm uppercase tracking-[0.3em] text-[#E8C76A] font-semibold mb-3">
              Unlock a Blessing ✨
            </span>
            <p className="font-cormorant italic text-sm text-[#FFF8ED]/75 tracking-wider mb-10 max-w-xs text-center">
              Touch and hold the sacred orb to send your blessings.
            </p>

            {/* Hold Element Container */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              
              {/* Outer Shockwave Ripple on Burst */}
              {burstRipples.map((r) => (
                <span
                  key={r.id}
                  className="absolute w-32 h-32 rounded-full border-2 border-[#E8C76A]/80 pointer-events-none animate-shockwave z-20"
                />
              ))}

              {/* Gold Sparks on Burst */}
              <AnimatePresence>
                {burstSparks.map((s) => (
                  <motion.span
                    key={s.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.2 }}
                    animate={{ x: s.x, y: s.y, opacity: 0, scale: s.scale }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="absolute w-2 h-2 rounded-full bg-[#E8C76A] pointer-events-none z-30"
                    style={{
                      boxShadow: "0 0 10px rgba(232, 199, 106, 0.9)",
                      top: "50%",
                      left: "50%",
                      marginTop: "-4px",
                      marginLeft: "-4px",
                    }}
                  />
                ))}
              </AnimatePresence>

              {/* Orbiting particles */}
              {particleConfig.map((p, i) => {
                const currentRadiusX = p.radiusX * (1 - (progress / 100) * 0.55);
                const currentRadiusY = p.radiusY * (1 - (progress / 100) * 0.55);
                const speedMultiplier = 1 - (progress / 100) * 0.65;
                const currentDuration = p.duration * speedMultiplier;

                return (
                  <motion.div
                    key={i}
                    animate={{
                      x: [0, currentRadiusX, 0, -currentRadiusX, 0],
                      y: [currentRadiusY, 0, -currentRadiusY, 0, currentRadiusY],
                      scale: [0.8, 1.1, 0.9, 1.2, 0.8],
                      opacity: [0.3, 0.85, 0.3, 0.85, 0.3],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: currentDuration,
                      ease: "easeInOut",
                      delay: p.delay,
                    }}
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#E8C76A] pointer-events-none z-10"
                    style={{
                      boxShadow: "0 0 8px #E8C76A",
                      top: "50%",
                      left: "50%",
                      marginTop: "-3px",
                      marginLeft: "-3px",
                    }}
                  />
                );
              })}

              {/* Floating Animation Wrapper */}
              <motion.div
                animate={{
                  y: isHolding ? 0 : [0, -6, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
                onMouseDown={startHold}
                onMouseUp={endHold}
                onMouseLeave={endHold}
                onTouchStart={startHold}
                onTouchEnd={endHold}
                className="w-32 h-32 md:w-36 md:h-36 rounded-full border border-[#D4AF37]/50 bg-gradient-to-tr from-[#E8C76A]/20 via-[#4A081B]/40 to-[#FFF8ED]/30 backdrop-blur-md shadow-[inset_0_4px_12px_rgba(255,255,255,0.4),inset_0_-4px_12px_rgba(212,175,55,0.3)] relative flex items-center justify-center cursor-pointer transition-transform duration-300 ease-out active:scale-[0.98]"
                style={{
                  boxShadow: isHolding 
                    ? `0 0 ${25 + (progress * 0.55)}px rgba(232, 199, 106, ${0.35 + (progress * 0.005)})`
                    : "0 0 15px rgba(232, 199, 106, 0.22)",
                  transform: isHolding ? "scale(1.03)" : "scale(1)"
                }}
              >
                {/* SVG Progress Ring */}
                <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    className="stroke-[#FFF8ED]/10 fill-none"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    className="stroke-[#E8C76A] fill-none"
                    strokeWidth="2.5"
                    strokeDasharray={2 * Math.PI * 44}
                    strokeDashoffset={2 * Math.PI * 44 * (1 - progress / 100)}
                    strokeLinecap="round"
                    style={{
                      filter: "drop-shadow(0 0 5px #E8C76A)",
                    }}
                  />
                </svg>

                {/* Golden Energy Core */}
                <motion.div
                  animate={{
                    scale: isHolding ? [1, 1.2, 1] : [1, 1.08, 1],
                    opacity: isHolding ? 0.95 : 0.65,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: isHolding ? 0.65 : 2.5,
                    ease: "easeInOut"
                  }}
                  className="absolute w-12 h-12 rounded-full bg-[#E8C76A] blur-[8px]"
                  style={{
                    boxShadow: `0 0 ${18 + (progress * 0.35)}px ${6 + (progress * 0.15)}px #E8C76A`,
                  }}
                />

                <div className="absolute inset-2 border border-dashed border-[#FFF8ED]/20 rounded-full animate-[spin_12s_linear_infinite]" />
              </motion.div>
            </div>

            {/* Instruction / Loading State */}
            <span className="font-cormorant tracking-[0.15em] text-xs font-semibold text-[#E8C76A] mt-6 transition-all duration-300">
              {isHolding ? (
                <span className="flex items-center gap-1.5 animate-pulse">
                  Charging Blessings... {Math.round(progress)}%
                </span>
              ) : (
                "Hold Orb"
              )}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="card-stage"
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -15 }}
            transition={{ type: "spring", stiffness: 130, damping: 14 }}
            className="w-full max-w-md bg-gradient-to-b from-[#4A081B]/95 to-[#2D040F]/95 border border-[#D4AF37]/50 rounded-3xl p-8 shadow-[0_20px_50px_rgba(29,3,8,0.5),inset_0_1.5px_3px_rgba(255,255,255,0.22)] backdrop-blur-md relative z-10 flex flex-col items-center text-center mt-6 mx-4"
          >
            <span className="font-cormorant text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#E8C76A] font-semibold mb-4">
              A Blessed Dua
            </span>

            {/* Sacred Arabic Calligraphy */}
            <p className="font-amiri text-[1.8rem] md:text-[2.2rem] leading-none tracking-wide text-center text-[#E8C76A] font-bold mb-4 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.5)]">
              بَارَكَ ٱللَّٰهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا
            </p>

            {/* Transliteration */}
            <p className="font-cormorant italic text-sm text-[#FFF8ED]/85 tracking-wider mb-2 font-medium">
              “BarakAllahu Lakuma wa Baraka Alaikuma”
            </p>

            {/* Translation */}
            <p className="font-cormorant text-[#FFF8ED]/75 text-sm md:text-base leading-relaxed max-w-xs mb-8">
              “May Allah bless your union and shower mercy upon you.”
            </p>

            {/* Ameen CTA button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 18px rgba(232, 199, 106, 0.55)" }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: ["0 0 8px rgba(212,175,55,0.15)", "0 0 15px rgba(212,175,55,0.35)", "0 0 8px rgba(212,175,55,0.15)"]
              }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              onClick={handleAmeen}
              className="px-8 py-2.5 rounded-full border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#E8C76A] text-[#2D040F] font-cinzel text-xs font-bold tracking-[0.2em] shadow-[0_4px_12px_rgba(0,0,0,0.3)] cursor-pointer animate-pulse"
            >
              Ameen 🤍
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function Footer() {
  return (
    <footer className="py-36 px-6 bg-gradient-to-b from-[#2D040F] via-[#4A081B] to-[#2D040F] relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Custom Styles for social click ripples and shockwave bursts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ripple {
          0% {
            width: 0px;
            height: 0px;
            opacity: 0.8;
          }
          100% {
            width: 250px;
            height: 250px;
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }

        @keyframes shockwave {
          0% {
            transform: scale(1);
            opacity: 0.95;
          }
          100% {
            transform: scale(3.5);
            opacity: 0;
          }
        }
        .animate-shockwave {
          animation: shockwave 0.65s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
      `}} />

      {/* Paper grain luxury texture overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #FFF8ED 1px, transparent 1px), radial-gradient(circle at 0 0, #FFF8ED 1px, transparent 1px)", backgroundSize: "16px 16px, 8px 8px" }} />

      {/* Cinematic ambient gold spotlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-brand-gold/8 via-[#E8C76A]/4 to-transparent rounded-full blur-[70px] pointer-events-none" />

      {/* Animated Golden Divider with sheen sweep */}
      <div className="w-56 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mb-16 relative z-10 overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
          className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#FFF8ED]/50 to-transparent"
        />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Subtle Glowing Islamic Crescent / Ornament */}
        <div className="relative w-16 h-16 flex items-center justify-center mb-8">
          <div className="absolute inset-0 bg-[#D4AF37]/8 rounded-full blur-[12px] animate-pulse" />
          <svg className="w-10 h-10 text-[#E8C76A] drop-shadow-[0_0_8px_rgba(232,199,106,0.45)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 3a9 9 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" fillOpacity="0.08" />
            <path d="M12.5 7.5l.8 1.6 1.7.3-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.3.8-1.6z" fill="currentColor" />
          </svg>
        </div>

        {/* Interactive Blessing Orb Experience */}
        <div className="mb-12 w-full">
          <BlessingOrb />
        </div>

        {/* Minimal Premium Developer Signature for Saad Kazi */}
        <div className="flex flex-col items-center gap-2 mt-8 z-10">
          <span className="font-cormorant text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#FFF8ED]/60 font-semibold">
            Handcrafted with love by
          </span>
          <span className="font-cormorant text-sm md:text-base font-semibold tracking-widest text-[#E8C76A] drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.4)]">
            Saad Kazi
          </span>
          
          {/* Luxury gold social icons with hover glow + rotation + click ripples and sparks */}
          <div className="flex gap-4 items-center mt-3">
            {/* WhatsApp */}
            <SocialButton 
              href="https://wa.me/918788940660?text=Hello%20Saad%2C%0AI%20also%20want%20a%20premium%20cinematic%20wedding%20invitation%20website%20like%20this.%20Please%20share%20details."
              ariaLabel="WhatsApp Saad Kazi"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.012 1.012C6.012 1.012 1 6.024 1 12.024c0 2.184.66 4.224 1.788 5.928L1.084 23l5.22-1.368a10.975 10.975 0 0 0 5.708 1.584c6.012 0 11.012-5.012 11.012-11.012.012-6-4.988-11.216-11.012-11.216zm5.82 15.3c-.228.66-1.164 1.212-1.92 1.284-.516.048-1.188.084-3.48-.864-2.928-1.2-4.812-4.188-4.956-4.38-.144-.192-1.176-1.572-1.176-3.012 0-1.44.756-2.148 1.02-2.436.264-.288.588-.36.78-.36.192 0 .384 0 .552.012.18 0 .42-.072.66.504.24.576.816 1.992.888 2.136.072.144.12.312.024.504-.096.192-.144.312-.288.48-.144.168-.312.384-.444.516-.144.144-.3.3-.132.588.168.288.756 1.248 1.62 2.016.92.816 1.7 1.068 2.004 1.224.3.156.48.132.66-.072.18-.204.78-.912.984-1.224.204-.3.408-.252.684-.144.276.108 1.764.828 2.064.984.3.156.504.228.576.36.072.132.072.768-.156 1.428z" />
              </svg>
            </SocialButton>

            {/* Instagram */}
            <SocialButton 
              href="https://instagram.com/saad_kazi0001"
              ariaLabel="Instagram Saad Kazi"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </SocialButton>
          </div>
        </div>

        {/* Final Copyright Text with Tiny Twinkling Sparkles */}
        <div className="relative mt-12 flex items-center justify-center z-10">
          {/* Left Twinkling Sparkle */}
          <motion.span
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.7, 1.2, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="text-[9px] text-[#E8C76A] mr-2"
          >
            ✦
          </motion.span>
          
          <span className="font-inter text-[8px] uppercase tracking-[0.3em] text-[#FFF8ED]/35 select-none">
            Fauzan & Huda • 2026
          </span>

          {/* Right Twinkling Sparkle */}
          <motion.span
            animate={{ opacity: [0.9, 0.2, 0.9], scale: [1.2, 0.7, 1.2] }}
            transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut" }}
            className="text-[9px] text-[#E8C76A] ml-2"
          >
            ✦
          </motion.span>
        </div>

      </div>
    </footer>
  );
}

export default memo(Footer);
