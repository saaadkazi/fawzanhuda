"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, memo } from "react";
import confetti from "canvas-confetti";

// Reusable Custom Premium Social Button component with transparent glass, gold borders, and burgundy hover fill
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
          boxShadow: "0 0 20px rgba(212,175,55,0.4)" 
        }}
        whileTap={{ scale: 0.92 }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleTap}
        className="w-10 h-10 rounded-full border border-[#D4AF37]/45 bg-[#FFFDF9]/50 hover:bg-[#4A081B] text-[#856124] hover:text-[#FFF8ED] flex items-center justify-center transition-all duration-500 ease-in-out shadow-[0_4px_12px_rgba(74,8,27,0.04)] relative overflow-hidden cursor-pointer"
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

        <span className="relative z-10 select-none pointer-events-none transition-colors duration-500">
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

// Premium Interactive Royal Blessing Seal component
const RoyalSeal = ({ setGlobalStage }) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [stage, setStage] = useState("locked"); // "locked" | "charging" | "freeze" | "broken" | "unlocked"
  const [unlocked, setUnlocked] = useState(false);
  
  const [burstRipples, setBurstRipples] = useState([]);
  const [burstSparks, setBurstSparks] = useState([]);
  const [ameenClicked, setAmeenClicked] = useState(false);
  const [risingParticles, setRisingParticles] = useState([]);
  const [settleParticlesList, setSettleParticlesList] = useState([]);

  const holdIntervalRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  const startHold = (e) => {
    if (e.cancelable) e.preventDefault();
    if (unlocked || stage !== "locked") return;
    
    setIsHolding(true);
    setStage("charging");
    setGlobalStage("charging");
    startTimeRef.current = Date.now() - (progress / 100) * 1500;
    
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    
    holdIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / 1500) * 100, 100);
      setProgress(pct);
      
      if (pct >= 100) {
        clearInterval(holdIntervalRef.current);
        triggerAnticipationFreeze();
      }
    }, 16);
  };

  const endHold = () => {
    if (unlocked || stage !== "charging") return;
    setIsHolding(false);
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    
    holdIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const nextVal = Math.max(prev - 4, 0);
        if (nextVal <= 0) {
          clearInterval(holdIntervalRef.current);
          setTimeout(() => {
            setStage("locked");
            setGlobalStage("locked");
          }, 0);
        }
        return nextVal;
      });
    }, 15);
  };

  const triggerAnticipationFreeze = () => {
    setIsHolding(false);
    setStage("freeze");
    setGlobalStage("freeze");
    
    // 200ms Anticipation Freeze
    setTimeout(() => {
      triggerBreakSequence();
    }, 200);
  };

  const triggerBreakSequence = () => {
    setStage("broken");
    setGlobalStage("broken");

    // Spawn shockwave ripples
    setBurstRipples([{ id: Date.now() }]);

    // Explode wax sparks in all directions
    const sparkCount = 28;
    const generatedSparks = Array.from({ length: sparkCount }).map((_, i) => {
      const angle = (i * 2 * Math.PI) / sparkCount + (Math.random() * 0.2 - 0.1);
      const distance = Math.random() * 120 + 80;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: Math.random() * 0.75 + 0.5,
      };
    });
    setBurstSparks(generatedSparks);

    // Cross-fade reveal the Blessing Card after 650ms
    setTimeout(() => {
      setStage("unlocked");
      setGlobalStage("unlocked");
      setUnlocked(true);

      // Generate 12 slow-drifting gold sparks that settle down over the card
      const generatedSettle = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        x: Math.random() * 260 - 130,
        startY: -120 - Math.random() * 60,
        endY: 80 + Math.random() * 80,
        scale: Math.random() * 0.5 + 0.4,
        duration: Math.random() * 2.5 + 2.0,
      }));
      setSettleParticlesList(generatedSettle);
      setTimeout(() => {
        setSettleParticlesList([]);
      }, 4500);

    }, 650);
  };

  const handleAmeen = () => {
    setAmeenClicked(true);

    // Confetti spray
    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.75 },
      colors: ["#E8C76A", "#D4AF37", "#FFF8ED", "#4A081B"],
    });

    // 12 rising particles that float upwards and fade out
    const generatedRising = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 160 - 80,
      startY: 40,
      endY: -220 - Math.random() * 80,
      scale: Math.random() * 0.6 + 0.45,
      duration: Math.random() * 1.5 + 1.2,
    }));
    setRisingParticles(generatedRising);

    // After 2.8s, softly dissolve card and reset back to seal
    setTimeout(() => {
      setStage("locked");
      setGlobalStage("locked");
      setProgress(0);
      setUnlocked(false);
      setAmeenClicked(false);
      setRisingParticles([]);
      setSettleParticlesList([]);
    }, 2800);
  };

  const particleConfig = [
    { delay: 0, duration: 4.2, radiusX: 84, radiusY: 34, size: 2 },
    { delay: 0.5, duration: 3.6, radiusX: -72, radiusY: 44, size: 1.5 },
    { delay: 1.0, duration: 4.8, radiusX: 90, radiusY: -28, size: 2.5 },
    { delay: 1.5, duration: 4.0, radiusX: -78, radiusY: -38, size: 1.8 },
    { delay: 2.0, duration: 4.5, radiusX: 96, radiusY: 24, size: 1.2 },
    { delay: 2.5, duration: 3.8, radiusX: -82, radiusY: -48, size: 2.2 },
    { delay: 3.0, duration: 5.0, radiusX: 74, radiusY: -42, size: 1.6 },
    { delay: 3.5, duration: 3.4, radiusX: -92, radiusY: 32, size: 2.0 },
  ];

  const crackOpacity = progress >= 40 ? (progress - 40) / 60 : 0;

  // Render internal seal geometry and star details
  const renderSealContent = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Specular Glare Crescent for 3D depth */}
      <div className="absolute top-1.5 left-8 right-8 h-5 bg-gradient-to-b from-white/20 to-transparent rounded-full opacity-65 pointer-events-none" />
      {/* Inner shadowing depth ring */}
      <div className="absolute inset-0 rounded-full shadow-[inset_0_4px_10px_rgba(255,255,255,0.25),inset_0_-4px_10px_rgba(0,0,0,0.5)] pointer-events-none" />
      
      {/* Thick double metallic gold rim inside */}
      <div className="absolute inset-1 rounded-full border-[3px] border-[#D4AF37] pointer-events-none" style={{ boxShadow: "inset 0 0 10px rgba(0,0,0,0.6)" }} />

      <svg className="w-22 h-22 text-[#E8C76A] drop-shadow-[0_2.5px_5px_rgba(0,0,0,0.6)]" viewBox="0 0 100 100" fill="currentColor">
        {/* Rub el Hizb 8-pointed star shape outline */}
        <path d="M50 5 L63 25 L85 25 L75 47 L95 60 L73 73 L75 95 L50 82 L25 95 L27 73 L5 60 L25 47 L15 25 L37 25 Z" fillOpacity="0.25" stroke="currentColor" strokeWidth="2.2" />
        {/* Geometric circles & lines inside seal */}
        <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3,2" />
        <path d="M50 34 L50 66 M34 50 L66 50" stroke="currentColor" strokeWidth="1" />
        <path d="M50 20 L80 50 L50 80 L20 50 Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2,2" />
        <circle cx="50" cy="50" r="10" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Jagged golden cracks that appear after 40% hold progress */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="#E8C76A" strokeWidth="2.8" strokeLinecap="round">
        <path 
          d="M 50 50 L 32 38 L 22 45 M 50 50 L 64 35 L 78 30 M 50 50 L 45 68 L 28 78 M 50 50 L 68 64 L 82 72" 
          style={{
            opacity: crackOpacity,
            filter: "drop-shadow(0 0 4px #E8C76A) drop-shadow(0 0 8px #BF953F)",
            transition: "opacity 0.05s linear"
          }}
        />
      </svg>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center justify-center relative select-none">
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="seal-stage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-6 select-none"
          >
            {/* Section Headings - Antique gold and burgundy */}
            <span 
              className="font-cormorant text-xs md:text-sm uppercase tracking-[0.34em] text-[#856124] font-bold mb-3"
              style={{ textShadow: "0 1px 1px rgba(255, 255, 255, 0.75), 0 1px 3px rgba(133, 97, 36, 0.12)" }}
            >
              Break the Sacred Seal ✨
            </span>
            <p className="font-cormorant italic text-sm text-[#4A081B] tracking-wider mb-10 max-w-xs text-center font-semibold opacity-90">
              Touch and hold to unlock a hidden blessing.
            </p>

            {/* Medallion Hold Container */}
            <div className="relative w-56 h-56 flex items-center justify-center">
              
              {/* Outer radial aura fading smoothly into background */}
              <div className="absolute w-[380px] h-[380px] rounded-full pointer-events-none z-0"
                   style={{
                     background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0) 75%)"
                   }} />

              {/* Inner soft golden bloom directly behind seal center (intensifies during hold) */}
              <div className="absolute rounded-full pointer-events-none z-0 transition-all duration-75"
                   style={{
                     width: `${200 + progress * 0.5}px`,
                     height: `${200 + progress * 0.5}px`,
                     background: `radial-gradient(circle, rgba(212,175,55,${0.22 + (progress/100)*0.18}) 0%, rgba(212,175,55,0) 70%)`
                   }} />

              {/* Subtle circular shadow under seal for depth */}
              <div className="absolute w-[160px] h-[160px] md:w-[180px] md:h-[180px] rounded-full bg-black/20 blur-md pointer-events-none z-0" />

              {/* Outer Shockwave Ripple on Seal Break */}
              {burstRipples.map((r) => (
                <span
                  key={r.id}
                  className="absolute w-36 h-36 rounded-full border-2 border-[#E8C76A]/80 pointer-events-none animate-shockwave z-20"
                />
              ))}

              {/* Exploded Wax Sparks on Burst */}
              <AnimatePresence>
                {burstSparks.map((s) => (
                  <motion.span
                    key={s.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.2 }}
                    animate={{ x: s.x, y: s.y, opacity: 0, scale: s.scale }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.95, ease: "easeOut" }}
                    className="absolute w-2 h-2 rounded-full bg-[#E8C76A] pointer-events-none z-30"
                    style={{
                      boxShadow: "0 0 10px rgba(232, 199, 106, 0.95), 0 0 4px #FFF8ED",
                      top: "50%",
                      left: "50%",
                      marginTop: "-4px",
                      marginLeft: "-4px",
                    }}
                  />
                ))}
              </AnimatePresence>

              {/* Slow Floating Gold Dust Particles around Seal */}
              {stage !== "freeze" && stage !== "broken" && particleConfig.map((p, i) => {
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
                      opacity: [0.3, 0.75, 0.3, 0.75, 0.3],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: currentDuration,
                      ease: "easeInOut",
                      delay: p.delay,
                    }}
                    className="absolute rounded-full bg-[#D4AF37] pointer-events-none z-10"
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      boxShadow: "0 0 6px #E8C76A",
                      top: "50%",
                      left: "50%",
                      marginTop: `-${p.size/2}px`,
                      marginLeft: `-${p.size/2}px`,
                    }}
                  />
                );
              })}

              {/* Medallion scale breath and vibration shake */}
              <motion.div
                animate={{
                  scale: stage === "freeze" 
                    ? 1.06 
                    : isHolding 
                      ? 1.03 
                      : [1, 1.025, 1],
                  x: stage === "charging" && progress >= 70 ? [0, -1.2, 1.2, -1, 1, 0] : 0,
                  y: stage === "charging" && progress >= 70 ? [0, 1, -1.2, 1.2, -1, 0] : 0,
                }}
                transition={{
                  scale: { duration: stage === "freeze" ? 0.2 : 0.3, ease: "easeOut" },
                  x: { repeat: Infinity, duration: 0.08, ease: "linear" },
                  y: { repeat: Infinity, duration: 0.08, ease: "linear" },
                  default: { repeat: Infinity, duration: 3.2, ease: "easeInOut" }
                }}
                className="w-38 h-38 md:w-44 md:h-44 rounded-full relative flex items-center justify-center cursor-pointer select-none touch-none"
              >
                {/* SVG Progress Ring surrounding seal */}
                <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    className="stroke-[#4A081B]/8 fill-none"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    className="stroke-[#D4AF37] fill-none"
                    strokeWidth="2.5"
                    strokeDasharray={2 * Math.PI * 44}
                    strokeDashoffset={2 * Math.PI * 44 * (1 - progress / 100)}
                    strokeLinecap="round"
                    style={{
                      filter: "drop-shadow(0 0 5px #D4AF37)",
                    }}
                  />
                </svg>

                {/* Left Half of Medallion (Physical Split Animation) */}
                <motion.div
                  animate={{
                    x: stage === "broken" ? -100 : 0,
                    rotate: stage === "broken" ? -20 : 0,
                    opacity: stage === "broken" ? 0 : 1,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border border-[#D4AF37]/50 bg-gradient-to-tr from-[#3D0312] via-[#4A081B] to-[#5A0C22] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2),inset_0_-3px_10px_rgba(0,0,0,0.4)] overflow-hidden"
                  style={{ 
                    clipPath: "inset(0 50% 0 0)"
                  }}
                  onMouseDown={startHold}
                  onMouseUp={endHold}
                  onMouseLeave={endHold}
                  onTouchStart={startHold}
                  onTouchEnd={endHold}
                >
                  {renderSealContent()}
                </motion.div>

                {/* Right Half of Medallion (Physical Split Animation) */}
                <motion.div
                  animate={{
                    x: stage === "broken" ? 100 : 0,
                    rotate: stage === "broken" ? 20 : 0,
                    opacity: stage === "broken" ? 0 : 1,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border border-[#D4AF37]/50 bg-gradient-to-tr from-[#3D0312] via-[#4A081B] to-[#5A0C22] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2),inset_0_-3px_10px_rgba(0,0,0,0.4)] overflow-hidden"
                  style={{ 
                    clipPath: "inset(0 0 0 50%)"
                  }}
                  onMouseDown={startHold}
                  onMouseUp={endHold}
                  onMouseLeave={endHold}
                  onTouchStart={startHold}
                  onTouchEnd={endHold}
                >
                  {renderSealContent()}
                </motion.div>
              </motion.div>
            </div>

            {/* Instruction / Loading State */}
            <span className="font-cormorant tracking-[0.15em] text-xs font-semibold text-[#856124] mt-6 transition-all duration-300">
              {isHolding ? (
                <span className="flex items-center gap-1.5 animate-pulse">
                  Unlocking Seal... {Math.round(progress)}%
                </span>
              ) : (
                "Hold Seal"
              )}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="card-stage"
            initial={{ opacity: 0, scale: 0.75, filter: "blur(12px)", y: 30 }}
            animate={{ opacity: 1, scale: [0.75, 1.04, 1], filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, scale: 0.75, filter: "blur(12px)", y: -30 }}
            transition={{ duration: 0.85, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-full max-w-md bg-gradient-to-b from-[#FFFDF9]/95 to-[#F6EBDD]/95 border border-[#D4AF37]/50 rounded-3xl p-8 shadow-[0_24px_60px_rgba(74,8,27,0.12),inset_0_1.5px_3px_rgba(255,255,255,0.7)] backdrop-blur-lg relative z-10 flex flex-col items-center text-center mt-6 mx-4 overflow-hidden"
          >
            {/* Elegant corner ornaments using geometric borders */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#D4AF37]/50 rounded-tl-sm pointer-events-none" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#D4AF37]/50 rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#D4AF37]/50 rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#D4AF37]/50 rounded-br-sm pointer-events-none" />

            {/* Subtle center burgundy radial glow backing */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,8,27,0.045)_0%,transparent_70%)] pointer-events-none" />

            {/* Rising Sparks particles on Ameen Click */}
            {ameenClicked && risingParticles.map((p) => (
              <motion.span
                key={p.id}
                initial={{ x: p.x, y: p.startY, opacity: 0.9, scale: p.scale }}
                animate={{ y: p.endY, opacity: 0, scale: p.scale * 0.5 }}
                transition={{ duration: p.duration, ease: "easeOut" }}
                className="absolute w-1.5 h-1.5 rounded-full bg-[#E8C76A] pointer-events-none z-30"
                style={{
                  boxShadow: "0 0 6px #E8C76A",
                  left: "50%",
                  marginLeft: "-3px",
                }}
              />
            ))}

            {/* Slow Drifting Gold Settle Particles on Card Reveal */}
            {settleParticlesList.map((p) => (
              <motion.span
                key={p.id}
                initial={{ x: p.x, y: p.startY, opacity: 0.85, scale: p.scale }}
                animate={{ y: p.endY, opacity: 0 }}
                transition={{ duration: p.duration, ease: "linear" }}
                className="absolute w-1.2 h-1.2 rounded-full bg-[#E8C76A] pointer-events-none z-10"
                style={{
                  boxShadow: "0 0 6px #E8C76A",
                  left: "50%",
                  marginLeft: "-2px",
                }}
              />
            ))}

            <span className="font-cormorant text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#856124] font-semibold mb-4 relative z-10">
              A Blessed Dua
            </span>

            {/* Sacred Arabic Calligraphy in deep burgundy contrast */}
            <p className={`font-amiri text-[1.8rem] md:text-[2.2rem] leading-none tracking-wide text-center text-[#4A081B] font-bold mb-4 drop-shadow-[0_1px_1px_rgba(212,175,55,0.4)] transition-transform duration-700 relative z-10 ${
              ameenClicked ? "scale-110" : ""
            }`}>
              بَارَكَ ٱللَّٰهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا
            </p>

            {/* Transliteration */}
            <p className="font-cormorant italic text-sm text-[#4A081B]/85 tracking-wider mb-2 font-medium relative z-10">
              “BarakAllahu Lakuma wa Baraka Alaikuma”
            </p>

            {/* Translation */}
            <p className="font-cormorant text-[#4A081B]/70 text-sm md:text-base leading-relaxed max-w-xs mb-8 relative z-10">
              “May Allah bless your union and shower mercy upon you.”
            </p>

            {/* Interactive Ameen CTA Gold Capsule button / success state */}
            <div className="h-12 flex items-center justify-center w-full relative z-10">
              <motion.button
                key="ameen-btn"
                whileHover={{ scale: 1.05, boxShadow: "0 6px 30px rgba(232, 199, 106, 0.75)" }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: ameenClicked
                    ? "0 0 0px transparent"
                    : ["0 4px 18px rgba(212,175,55,0.25)", "0 4px 28px rgba(212,175,55,0.55)", "0 4px 18px rgba(212,175,55,0.25)"]
                }}
                transition={{ repeat: ameenClicked ? 0 : Infinity, duration: 2.2, ease: "easeInOut" }}
                onClick={handleAmeen}
                disabled={ameenClicked}
                className="px-12 py-3.5 rounded-full border border-[#856124]/60 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#2D040F] font-cinzel text-xs font-bold tracking-[0.25em] shadow-[inset_0_2px_3px_rgba(255,255,255,0.85),inset_0_-1.5px_2px_rgba(0,0,0,0.25),0_4px_18px_rgba(212,175,55,0.35)] cursor-pointer relative overflow-hidden flex items-center justify-center gap-2 min-w-[240px]"
              >
                {/* Custom shine sweep */}
                {!ameenClicked && (
                  <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "linear", delay: 1 }}
                      className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/55 to-transparent skew-x-12"
                    />
                  </div>
                )}

                {/* Text transition */}
                <AnimatePresence mode="wait">
                  {!ameenClicked ? (
                    <motion.span
                      key="text-ameen"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-1.5"
                    >
                      AMEEN 🤍
                    </motion.span>
                  ) : (
                    <motion.span
                      key="text-received"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-1.5 text-[#2D040F] drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
                    >
                      Blessing Received ✨
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function Footer() {
  const [globalStage, setGlobalStage] = useState("locked"); // tracks seal stages for wrapper blur styles

  return (
    <footer className={`py-36 px-6 relative overflow-hidden flex flex-col items-center justify-center transition-all duration-1000 ${
      globalStage === "broken" || globalStage === "unlocked" 
        ? "backdrop-blur-[3px] bg-gradient-to-b from-[#FFFDF9]/95 via-[#F6EBDD]/90 to-[#FFFDF9]/95" 
        : "bg-gradient-to-b from-[#FFFDF9] via-[#F6EBDD] to-[#FFFDF9]"
    }`}>
      
      {/* Custom Styles for ripples and shockwaves */}
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

      {/* Repeating light Islamic geometric star tile pattern overlay */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%234A081B' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%234A081B' stroke-width='1'/%3E%3C/svg%3E")`,
             backgroundSize: "60px 60px"
           }} />

      {/* Paper grain luxury texture overlay using burgundy contrast dot grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #4A081B 1px, transparent 1px), radial-gradient(circle at 0 0, #4A081B 1px, transparent 1px)", backgroundSize: "16px 16px, 8px 8px" }} />

      {/* Cinematic ambient gold spotlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-[#D4AF37]/15 via-[#E8C76A]/6 to-transparent rounded-full blur-[70px] pointer-events-none" />

      {/* Animated Golden Divider with sheen sweep */}
      <div className="w-56 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mb-16 relative z-10 overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
          className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/55 to-transparent"
        />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Subtle Glowing Islamic Crescent / Ornament */}
        <div className="relative w-16 h-16 flex items-center justify-center mb-8">
          <div className="absolute inset-0 bg-[#D4AF37]/15 rounded-full blur-[12px] animate-pulse" />
          <svg className="w-10 h-10 text-[#856124] drop-shadow-[0_0_8px_rgba(212,175,55,0.35)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 3a9 9 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" fillOpacity="0.08" />
            <path d="M12.5 7.5l.8 1.6 1.7.3-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.3.8-1.6z" fill="currentColor" />
          </svg>
        </div>

        {/* Interactive Royal Blessing Seal */}
        <div className="mb-12 w-full">
          <RoyalSeal setGlobalStage={setGlobalStage} />
        </div>

        {/* Animated Premium Signature Plate for Saad Kazi */}
        <div className="flex flex-col items-center gap-3 mt-8 z-10">
          <span 
            className="font-cormorant text-[11px] md:text-[12.5px] uppercase tracking-[0.35em] text-[#856124] font-bold"
            style={{ 
              textShadow: "0 1px 1px rgba(255, 255, 255, 0.75), 0 1px 3px rgba(74, 8, 27, 0.08)"
            }}
          >
            A Signature Creation by
          </span>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            animate={{
              boxShadow: [
                "0 4px 12px rgba(74, 8, 27, 0.12), 0 0 10px rgba(212, 175, 55, 0.15)",
                "0 4px 18px rgba(74, 8, 27, 0.18), 0 0 18px rgba(212, 175, 55, 0.35)",
                "0 4px 12px rgba(74, 8, 27, 0.12), 0 0 10px rgba(212, 175, 55, 0.15)"
              ]
            }}
            transition={{
              boxShadow: { repeat: Infinity, duration: 4.0, ease: "easeInOut" }
            }}
            className="px-8 py-2.5 rounded-full border border-[#D4AF37]/50 bg-gradient-to-r from-[#4A081B] via-[#2D040F] to-[#4A081B] flex items-center justify-center gap-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_4px_12px_rgba(74,8,27,0.15)] cursor-pointer relative overflow-hidden"
          >
            {/* Tiny gold star sparkle ornament on left */}
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="text-[#E8C76A] text-xs select-none"
            >
              ✦
            </motion.span>

            {/* Signature Text with metallic sheen gradient animation */}
            <motion.span
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ repeat: Infinity, duration: 5.0, ease: "linear" }}
              className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] via-[#FFF8ED] via-[#FCF6BA] to-[#B38728] bg-[length:200%_auto] bg-clip-text text-transparent font-cinzel font-semibold text-base md:text-lg tracking-[0.2em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] select-none pointer-events-none"
            >
              Saad Kazi
            </motion.span>

            {/* Tiny gold star sparkle ornament on right */}
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="text-[#E8C76A] text-xs select-none"
            >
              ✦
            </motion.span>
          </motion.div>
        </div>
          
          {/* Luxury transparent gold social icons with hover burgundy solid fill */}
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

        {/* Final Copyright Text with Tiny Twinkling Sparkles */}
        <div className="relative mt-12 flex items-center justify-center z-10">
          {/* Left Twinkling Sparkle */}
          <motion.span
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.7, 1.2, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="text-[9px] text-[#856124] mr-2"
          >
            ✦
          </motion.span>
          
          <span className="font-inter text-[8px] uppercase tracking-[0.3em] text-[#4A081B]/45 select-none">
            Fauzan & Huda • 2026
          </span>

          {/* Right Twinkling Sparkle */}
          <motion.span
            animate={{ opacity: [0.9, 0.2, 0.9], scale: [1.2, 0.7, 1.2] }}
            transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut" }}
            className="text-[9px] text-[#856124] ml-2"
          >
            ✦
          </motion.span>
        </div>

      </div>
    </footer>
  );
}

export default memo(Footer);
