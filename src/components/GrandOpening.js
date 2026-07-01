"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, memo } from "react";
import { gsap } from "gsap";
import { 
  startAmbience, 
  playHingeCreak, 
  playMetallicTap, 
  playLockClick, 
  playWhoosh 
} from "@/utils/audioSynth";
import { getGlobalAudio } from "./MusicToggle";

function GrandOpening({ isOpen, onOpen, onStartOpening, children }) {
  const [stage, setStage] = useState("closed"); 
  // Stages: "closed" | "cracking" | "breaking" | "opening" | "flapsOpen" | "reveal" | "transitioning" | "opened"

  const [showDoorsOverlay, setShowDoorsOverlay] = useState(true);
  const [ambientWind, setAmbientWind] = useState(null);
  const [idleParticles, setIdleParticles] = useState([]);
  const [sparkParticles, setSparkParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tapTriggered, setTapTriggered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const envelopeRef = useRef(null);
  const cameraContainerRef = useRef(null);
  const medallionRef = useRef(null);
  const topFlapRef = useRef(null);
  const leftFlapRef = useRef(null);
  const rightFlapRef = useRef(null);
  const bottomFlapRef = useRef(null);
  const cardRef = useRef(null);
  const radialBloomRef = useRef(null);
  const depthBlurOverlayRef = useRef(null);

  useEffect(() => {
    let checkMobile = false;
    if (typeof window !== "undefined") {
      checkMobile = window.innerWidth < 768;
      setIsMobile(checkMobile);
    }

    // Generate slow drifting ambient dust and sparks
    const idleCount = checkMobile ? 12 : 30;
    const generatedIdle = Array.from({ length: idleCount }).map((_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      top: `${10 + Math.random() * 80}%`,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.2,
      driftX: Math.random() * 40 - 20,
      driftY: -(Math.random() * 60 + 30),
      duration: Math.random() * 8 + 7,
    }));
    setIdleParticles(generatedIdle);

    // Start palace ambient wind hum
    const wind = startAmbience();
    setAmbientWind(wind);

    return () => {
      if (wind) wind.stop();
    };
  }, []);

  // Parallax tracking on desktop
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 12;
      const y = (clientY / window.innerHeight - 0.5) * -12;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  const triggerSparkBurst = () => {
    const count = isMobile ? 14 : 24;
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 5 + 3,
      scale: Math.random() * 0.7 + 0.3,
      angle: Math.random() * 2 * Math.PI,
      distance: Math.random() * 150 + 90,
      duration: Math.random() * 0.6 + 0.4, // completes in ~500-900ms
    }));
    setSparkParticles(generated);
  };

  const handleMedallionTap = (e) => {
    if (e) e.stopPropagation();
    if (stage !== "closed" || isTransitioning) return;

    // Direct trigger for background music to bypass browser autoplay blocks
    const audio = getGlobalAudio();
    if (audio) {
      audio.volume = 0; 
      audio.play().catch((err) => {
        console.log("Audio play failed synchronously inside tap:", err);
      });
    }

    setIsTransitioning(true);
    setTapTriggered(true);
    setStage("cracking");
    
    // Play metallic tap sound at click onset
    playMetallicTap();

    if (onStartOpening) {
      onStartOpening();
    }

    // GSAP sequencing for cinematic envelope opening flow
    const tl = gsap.timeline({
      onComplete: () => {
        setStage("opened");
        onOpen(); // Mount main scroll sections
        setTimeout(() => {
          setShowDoorsOverlay(false);
        }, 800);
        if (ambientWind) ambientWind.stop();
      }
    });

    // 1. Tactile 3D press feedback - compress inward (0.0s - 0.2s)
    tl.to(medallionRef.current, {
      scale: 0.86,
      z: -30,
      rotateX: -10,
      duration: 0.2,
      ease: "power2.out"
    });

    // Elastic bounce release (0.2s - 0.5s)
    tl.to(medallionRef.current, {
      scale: 1.05,
      z: 15,
      rotateX: 0,
      duration: 0.3,
      ease: "elastic.out(1, 0.45)"
    }, 0.2);

    // Camera push-in 3D effect (0.0s - 0.7s) - scale 1 -> 1.04 using cubic-bezier(0.22, 1, 0.36, 1) equivalent
    tl.to(envelopeRef.current, {
      scale: 1.04,
      duration: 0.7,
      ease: "power2.out"
    }, 0.0);

    // 2. AFTER GLOW PULSE COMPLETES (0.7s - 1.5s: 800ms Unlocking Sequence)
    tl.add(() => {
      setStage("breaking");
      playLockClick(); // mechanical click sound
      triggerSparkBurst(); // tiny gold spark burst
    }, 0.7);

    // Soft rotation: -8deg -> +8deg -> center (rotateZ/rotate)
    tl.to(medallionRef.current, {
      rotate: -8,
      y: 4, // start downward drop
      duration: 0.25,
      ease: "power1.inOut"
    }, 0.7);

    tl.to(medallionRef.current, {
      rotate: 8,
      y: 8,
      duration: 0.3,
      ease: "power1.inOut"
    }, 0.95);

    tl.to(medallionRef.current, {
      rotate: 0,
      y: 12, // final drops to translateY 12px
      duration: 0.25,
      ease: "power2.out"
    }, 1.25);

    // Top flap begins to loosen: rotateX 0 -> -15 over 800ms
    tl.to(topFlapRef.current, {
      rotateX: -15,
      duration: 0.8,
      ease: "power1.out"
    }, 0.7);

    // 3. Flaps fully open (1.5s onwards - slow and luxurious 1.2s duration)
    tl.add(() => {
      setStage("opening");
      playHingeCreak(); // paper creak unfolding sound
    }, 1.5);

    tl.to(topFlapRef.current, {
      rotateX: -165,
      duration: 1.2,
      ease: "power2.inOut"
    }, 1.5);

    // Fade out/scale down seal medallion as flap opens
    tl.to(medallionRef.current, {
      scale: 0.15,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    }, 1.5);

    // Camera push-in further in 3D (1.5s - 2.7s)
    tl.to(envelopeRef.current, {
      scale: 1.08,
      z: 40,
      rotateX: 4,
      duration: 1.2,
      ease: "power2.out"
    }, 1.5);

    // Side flaps slide/unfold outward slightly (2.2s - 3.4s - slow and luxurious 1.2s duration)
    tl.add(() => {
      setStage("flapsOpen");
    }, 2.2);

    tl.to(leftFlapRef.current, {
      x: -16,
      rotateY: -30,
      duration: 1.2,
      ease: "power2.out"
    }, 2.2);

    tl.to(rightFlapRef.current, {
      x: 16,
      rotateY: 30,
      duration: 1.2,
      ease: "power2.out"
    }, 2.2);

    tl.to(bottomFlapRef.current, {
      y: 12,
      rotateX: -20,
      duration: 1.2,
      ease: "power2.out"
    }, 2.2);

    // 4. Card rises up & blessing dua reveal (3.3s - 4.3s - duration 1.0s exactly)
    tl.add(() => {
      setStage("reveal");
    }, 3.3);

    tl.to(cardRef.current, {
      y: 0,
      scale: 1.0,
      opacity: 1,
      duration: 1.0,
      ease: "power2.out"
    }, 3.3);

    // Pull camera to final invite framing state
    tl.to(envelopeRef.current, {
      scale: 1.02,
      z: 10,
      rotateX: 0,
      duration: 1.0,
      ease: "power1.inOut"
    }, 3.3);

    // 5. CINEMATIC CAMERA PUSH-IN / PORTAL ZOOM (4.3s - 5.7s - duration 1.4s exactly)
    tl.add(() => {
      setStage("transitioning");
      playWhoosh();
    }, 4.3);

    // Zoom scene from scale 1 to 3 and fade out container
    tl.to(cameraContainerRef.current, {
      scale: 3.0,
      opacity: 0,
      duration: 1.4,
      ease: "power2.in"
    }, 4.3);

    // Radial gold light bloom fades in and expands behind card
    tl.to(radialBloomRef.current, {
      opacity: 0.92,
      scale: 1.8,
      duration: 1.2,
      ease: "power2.out"
    }, 4.3);

    // Depth blur overlay fades in (edges blur, center remains sharp)
    tl.to(depthBlurOverlayRef.current, {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut"
    }, 4.3);
  };

  const depthBlurStyle = {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(circle, transparent 20%, rgba(26,2,8,0.7) 60%, rgba(26,2,8,0.98) 100%)",
    backdropFilter: "blur(7px)",
    WebkitBackdropFilter: "blur(7px)",
    mask: "radial-gradient(circle at center, transparent 25%, black 75%)",
    WebkitMask: "radial-gradient(circle at center, transparent 25%, black 75%)",
    willChange: "opacity",
    pointerEvents: "none",
    zIndex: 35
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-brand-bg door-perspective-container">
      {/* Scrollable Main Content (visible underneath overlay) */}
      <div className="w-full relative z-0">
        {children}
      </div>

      {/* Sacred Envelope Overlay */}
      {showDoorsOverlay && (
        <div
          ref={cameraContainerRef}
          className="fixed inset-0 z-40 flex items-center justify-center bg-[#1A0208] door-preserve-3d pointer-events-auto"
          style={{ willChange: "transform, opacity", transform: "scale(1)", perspective: "1800px" }}
        >
          {/* BASE GRADIENT BACKGROUND - Matches website dark burgundy theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#5A0018] via-[#730925] to-[#8B1234] pointer-events-none z-0" />

          {/* Multiple Blurred Gradient Layers for Atmospheric Depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] md:w-[900px] h-[550px] md:h-[900px] bg-[radial-gradient(circle_at_center,rgba(139,18,52,0.45)_0%,rgba(90,0,24,0.15)_45%,transparent_100%)] rounded-full blur-[90px] pointer-events-none z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[550px] h-[350px] md:h-[550px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,rgba(212,175,55,0.01)_60%,transparent_100%)] rounded-full blur-[80px] pointer-events-none z-0" />

          <motion.div 
            animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.28, 0.15] }} 
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute -top-[15%] -left-[15%] w-[60%] h-[60%] rounded-full bg-[#7A1230] blur-[140px] pointer-events-none z-0" 
          />
          <motion.div 
            animate={{ scale: [1.12, 1, 1.12], opacity: [0.12, 0.24, 0.12] }} 
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute -bottom-[15%] -right-[15%] w-[60%] h-[60%] rounded-full bg-[#4A081B] blur-[150px] pointer-events-none z-0" 
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,0,2,0.96)_100%)] pointer-events-none z-10" />

          {/* Depth blur overlay (cinematic edge blur while center stays sharp) */}
          <div 
            ref={depthBlurOverlayRef}
            style={depthBlurStyle}
          />

          {/* Gold light bloom behind invitation */}
          <div 
            ref={radialBloomRef}
            style={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.22)_0%,rgba(212,175,55,0.05)_50%,transparent_100%)] rounded-full blur-[70px] pointer-events-none z-10"
          />

          {/* Low-opacity repeating Islamic geometric pattern watermark (highly blended, 1.4% opacity) */}
          <div className="absolute inset-0 opacity-[0.014] pointer-events-none z-0" 
               style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%238A6D3B' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%238A6D3B' stroke-width='1'/%3E%3C/svg%3E")`, 
                 backgroundSize: "60px 60px" 
               }} />

          {/* Slowly shifting background fog/mist layer */}
          <motion.div
            animate={{
              x: ["-4%", "4%", "-4%"],
              y: ["-4%", "4%", "-4%"],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[-10%] bg-[radial-gradient(circle_at_center,rgba(74,8,27,0.12)_0%,transparent_60%)] filter blur-3xl pointer-events-none z-0"
          />

          {/* Floating Gold Sparks & Dust */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden flex items-center justify-center">
            {idleParticles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ y: "110%", opacity: 0 }}
                animate={{
                  y: "-10%",
                  opacity: [0, p.opacity, p.opacity, 0],
                  x: ["0px", `${p.driftX}px`],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute rounded-full bg-[#E8C76A] shadow-[0_0_5px_rgba(212,175,55,0.4)]"
                style={{
                  left: p.left,
                  width: p.size,
                  height: p.size,
                }}
              />
            ))}
          </div>

          {/* Spark Particles burst on seal break */}
          {stage === "breaking" && (
            <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
              {sparkParticles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ x: 0, y: 0, scale: p.scale, opacity: 1, rotate: 0 }}
                  animate={{
                    x: Math.cos(p.angle) * p.distance,
                    y: Math.sin(p.angle) * p.distance,
                    scale: 0.15,
                    opacity: 0,
                    rotate: 360
                  }}
                  transition={{ duration: p.duration, ease: "easeOut" }}
                  className="absolute rounded-full bg-gradient-to-b from-[#FFFDF9] to-[#D4AF37]"
                  style={{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    boxShadow: "0 0 8px #FCF6BA, 0 0 15px #D4AF37",
                    willChange: "transform, opacity"
                  }}
                />
              ))}
            </div>
          )}

          {/* Fullscreen Tall Portrait Envelope Wrapper Frame (9:16 proportions) */}
          <div className="relative w-full md:w-[88vw] md:max-w-[420px] h-full md:h-[80vh] md:max-h-[730px] flex items-center justify-center z-20" style={{ willChange: "transform, opacity" }}>
            
            {/* ENVELOPE 3D FRAME with mouse coordinate parallax tilt & idle breathing */}
            <motion.div
              ref={envelopeRef}
              style={!isMobile ? {
                rotateY: mousePos.x,
                rotateX: mousePos.y,
                transformStyle: "preserve-3d",
                willChange: "transform, opacity, filter"
              } : {
                transformStyle: "preserve-3d",
                willChange: "transform, opacity, filter"
              }}
              animate={
                stage === "closed"
                  ? { scale: [1, 1.01, 1] }
                  : {}
              }
              transition={{
                duration: 3.0,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full h-full relative door-preserve-3d flex items-center justify-center transition-transform duration-300 ease-out"
            >
              {/* Envelope shadow depth */}
              <div className="absolute inset-0 bg-black/35 rounded-none md:rounded-xl blur-lg translate-y-4 pointer-events-none" />

              {/* Burgundy Ambient Glow behind envelope edges */}
              <div className="absolute inset-[-18px] bg-[#4A081B]/18 rounded-none md:rounded-xl blur-2xl pointer-events-none z-[-1]" />

              {/* Envelope Body (Back Panel - upgraded to warm ivory cream stops) */}
              <div className="absolute inset-0 rounded-none md:rounded-xl bg-gradient-to-br from-[#FDF8F0] via-[#FAF5EC] to-[#F8F2E8] border border-[#D4AF37]/35 overflow-hidden shadow-2xl z-0">
                {/* Fine linen texture pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise" />
                {/* Double gold margins */}
                <div className="absolute inset-4 border border-dashed border-[#D4AF37]/15 rounded-lg pointer-events-none" />

                {/* Repeating Islamic geometric pattern watermark (upgraded opacity to 4.8%) */}
                <div className="absolute inset-0 opacity-[0.048] pointer-events-none z-0" 
                     style={{ 
                       backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23D4AF37' stroke-width='0.85'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23D4AF37' stroke-width='0.85'/%3E%3C/svg%3E")`, 
                       backgroundSize: "60px 60px" 
                     }} />

                {/* Corner Arabesque Florals */}
                <FloralCorner className="top-5 left-5" />
                <FloralCorner className="top-5 right-5 rotate-90" />
                <FloralCorner className="bottom-5 left-5 -rotate-90" />
                <FloralCorner className="bottom-5 right-5 rotate-180" />
              </div>

              {/* Sacred Invitation Card inside (slides up vertically, weights rise) */}
              <div
                ref={cardRef}
                style={{ 
                  willChange: "transform, opacity",
                  opacity: 0,
                  transform: "translateY(80px) scale(0.94)",
                  top: isMobile ? "-28vh" : "-150px" // final resting offset above the envelope slot
                }}
                className="absolute inset-[12px] bg-transparent rounded-lg p-6 flex flex-col items-center justify-center text-center pointer-events-none z-24"
              >
                {/* Elegant Islamic Arch Shape Card Body */}
                <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_15px_35px_rgba(74,8,27,0.35)] drop-shadow-[0_0_25px_rgba(212,175,55,0.25)] pointer-events-none z-0" viewBox="0 0 100 150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="card-ivory-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFFDF9" />
                      <stop offset="60%" stopColor="#FAF5EC" />
                      <stop offset="100%" stopColor="#F5ECE0" />
                    </linearGradient>
                    <linearGradient id="card-gold-border" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#856124" />
                      <stop offset="35%" stopColor="#FCF6BA" />
                      <stop offset="50%" stopColor="#D4AF37" />
                      <stop offset="65%" stopColor="#F5DA8A" />
                      <stop offset="100%" stopColor="#856124" />
                    </linearGradient>
                    <pattern id="islamic-tile-pattern-card" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.05" />
                      <circle cx="20" cy="20" r="6" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.05" />
                    </pattern>
                  </defs>
                  {/* Mihrab/Islamic Arch shape base */}
                  <path 
                    d="M 0,150 L 100,150 L 100,45 C 100,25 80,10 50,0 C 20,10 0,25 0,45 Z" 
                    fill="url(#card-ivory-grad)" 
                  />
                  {/* Watermark Pattern inside Card */}
                  <path 
                    d="M 0,150 L 100,150 L 100,45 C 100,25 80,10 50,0 C 20,10 0,25 0,45 Z" 
                    fill="url(#islamic-tile-pattern-card)" 
                  />
                  {/* Gold border tracing Mihrab profile */}
                  <path 
                    d="M 2.5,147.5 L 97.5,147.5 L 97.5,46 C 97.5,27.5 79,13.5 50,3.5 C 21,13.5 2.5,27.5 2.5,46 Z" 
                    fill="none" 
                    stroke="url(#card-gold-border)" 
                    strokeWidth="1.8" 
                  />
                </svg>

                {/* Card Corner Ornaments at bottom corners */}
                <FloralCorner className="bottom-4 left-4 -rotate-90" />
                <FloralCorner className="bottom-4 right-4 rotate-180" />

                {/* Card Content Overlay */}
                <div className="z-10 flex flex-col items-center justify-center pt-8">
                  {/* Self-Drawing Crescent Moon and Star SVG */}
                  <div className="relative mb-5 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={stage === "reveal" || stage === "transitioning" ? { opacity: 0.35, scale: 1.2 } : {}}
                      transition={{ duration: 1.6, ease: "easeOut", delay: 0.8 }}
                      className="absolute w-24 h-24 rounded-full bg-[#D4AF37]/35 blur-xl pointer-events-none z-0"
                    />

                    <svg className="w-16 h-16 text-[#D4AF37] stroke-current fill-none stroke-[1.6] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] relative z-10" viewBox="0 0 100 100">
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={stage === "reveal" || stage === "transitioning" ? { pathLength: 1 } : {}}
                        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.6 }}
                        d="M 50,15 A 32,32 0 1,0 82,47 A 26,26 0 1,1 50,15"
                      />
                      <motion.path
                        initial={{ pathLength: 0, scale: 0 }}
                        animate={stage === "reveal" || stage === "transitioning" ? { pathLength: 1, scale: 1 } : {}}
                        transition={{ duration: 1.4, ease: "easeInOut", delay: 1.4 }}
                        style={{ transformOrigin: "67px 33px" }}
                        d="M 67,23 L 69,29 L 75,29 L 70,33 L 72,39 L 67,35 L 62,39 L 64,33 L 59,29 L 65,29 Z"
                      />
                    </svg>
                  </div>

                  {/* Dua Texts (Deep Burgundy Typography) */}
                  <AnimatePresence>
                    {(stage === "reveal" || stage === "transitioning") && (
                      <div className="flex flex-col items-center">
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.8 }}
                          className="text-[#4A081B] font-serif text-[1.4rem] md:text-[1.85rem] font-bold leading-none mb-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)] select-none"
                        >
                          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                        </motion.div>
                        <motion.p
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 2.5 }}
                          className="font-cormorant text-[9.5px] md:text-[11.5px] uppercase tracking-[0.25em] text-[#7A1230] font-bold max-w-[240px] md:max-w-[290px] leading-relaxed select-none text-center"
                        >
                          In the name of Allah, the Most Compassionate, the Most Merciful
                        </motion.p>
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 1.0, ease: "easeOut", delay: 2.8 }}
                          className="w-12 h-[0.5px] bg-[#D4AF37]/35 mt-6 relative"
                        >
                          <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Golden spotlight leakage overlay inside slot */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5 pointer-events-none z-10" />
              </div>

              {/* Left Flap */}
              <div
                ref={leftFlapRef}
                className="absolute top-0 bottom-0 left-0 w-1/2 z-22 pointer-events-none"
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform"
                }}
              >
                <svg className="w-full h-full filter drop-shadow-[5px_0_15px_rgba(32,3,10,0.22)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="islamic-tile-pattern-left" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.048" />
                      <circle cx="30" cy="30" r="10" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.048" />
                    </pattern>
                    <linearGradient id="left-flap-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FDF8F0" />
                      <stop offset="85%" stopColor="#F8F2E8" />
                      <stop offset="100%" stopColor="#DFC8A5" />
                    </linearGradient>
                    <linearGradient id="left-crease-shadow-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(133,97,36,0)" />
                      <stop offset="80%" stopColor="rgba(133,97,36,0.02)" />
                      <stop offset="100%" stopColor="rgba(133,97,36,0.22)" />
                    </linearGradient>
                    <linearGradient id="gold-metallic-foil" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#9B7B43" />
                      <stop offset="30%" stopColor="#F3E5AB" />
                      <stop offset="50%" stopColor="#D4AF37" />
                      <stop offset="70%" stopColor="#F5DA8A" />
                      <stop offset="100%" stopColor="#9B7B43" />
                    </linearGradient>
                  </defs>
                  {/* Flap Base */}
                  <path d="M 0,0 L 100,50 L 0,100 Z" fill="url(#left-flap-grad)" />
                  {/* Islamic Watermark */}
                  <path d="M 0,0 L 100,50 L 0,100 Z" fill="url(#islamic-tile-pattern-left)" />
                  {/* Crease shadow for depth */}
                  <path d="M 0,0 L 100,50 L 0,100 Z" fill="url(#left-crease-shadow-grad)" />
                  
                  {/* Embossed gold star near tip */}
                  <path d="M 90,50 L 92,52 L 95,52 L 93,54 L 94,57 L 90,55 L 86,57 L 87,54 L 85,52 L 88,52 Z" fill="#D4AF37" opacity="0.75" className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />

                  {/* DOUBLE-STROKE BEVELED GOLD FOIL CREASES ON BOTH FOLDS */}
                  <path d="M 0,0 L 100,50" fill="none" stroke="rgba(133,97,36,0.18)" strokeWidth="3" />
                  <path d="M -0.5,-0.5 L 99.5,49.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
                  <path d="M 0,0 L 100,50" fill="none" stroke="url(#gold-metallic-foil)" strokeWidth="1.2" />

                  <path d="M 100,50 L 0,100" fill="none" stroke="rgba(133,97,36,0.18)" strokeWidth="3" />
                  <path d="M 99.5,49.5 L -0.5,99.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
                  <path d="M 100,50 L 0,100" fill="none" stroke="url(#gold-metallic-foil)" strokeWidth="1.2" />
                </svg>
              </div>

              {/* Right Flap */}
              <div
                ref={rightFlapRef}
                className="absolute top-0 bottom-0 right-0 w-1/2 z-22 pointer-events-none"
                style={{
                  transformOrigin: "right center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform"
                }}
              >
                <svg className="w-full h-full filter drop-shadow-[-5px_0_15px_rgba(32,3,10,0.22)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="islamic-tile-pattern-right" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.048" />
                      <circle cx="30" cy="30" r="10" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.048" />
                    </pattern>
                    <linearGradient id="right-flap-grad" x1="1" y1="0" x2="0" y2="0">
                      <stop offset="0%" stopColor="#FDF8F0" />
                      <stop offset="85%" stopColor="#F8F2E8" />
                      <stop offset="100%" stopColor="#DFC8A5" />
                    </linearGradient>
                    <linearGradient id="right-crease-shadow-grad" x1="1" y1="0" x2="0" y2="0">
                      <stop offset="0%" stopColor="rgba(133,97,36,0)" />
                      <stop offset="80%" stopColor="rgba(133,97,36,0.02)" />
                      <stop offset="100%" stopColor="rgba(133,97,36,0.22)" />
                    </linearGradient>
                  </defs>
                  {/* Flap Base */}
                  <path d="M 100,0 L 0,50 L 100,100 Z" fill="url(#right-flap-grad)" />
                  {/* Islamic Watermark */}
                  <path d="M 100,0 L 0,50 L 100,100 Z" fill="url(#islamic-tile-pattern-right)" />
                  {/* Crease shadow for depth */}
                  <path d="M 100,0 L 0,50 L 100,100 Z" fill="url(#right-crease-shadow-grad)" />
                  
                  {/* Embossed gold star near tip */}
                  <path d="M 10,50 L 12,52 L 15,52 L 13,54 L 14,57 L 10,55 L 6,57 L 7,54 L 5,52 L 8,52 Z" fill="#D4AF37" opacity="0.75" className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />

                  {/* DOUBLE-STROKE BEVELED GOLD FOIL CREASES ON BOTH FOLDS */}
                  <path d="M 100,0 L 0,50" fill="none" stroke="rgba(133,97,36,0.18)" strokeWidth="3" />
                  <path d="M 100.5,-0.5 L 0.5,49.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
                  <path d="M 100,0 L 0,50" fill="none" stroke="url(#gold-metallic-foil)" strokeWidth="1.2" />

                  <path d="M 0,50 L 100,100" fill="none" stroke="rgba(133,97,36,0.18)" strokeWidth="3" />
                  <path d="M -0.5,49.5 L 99.5,99.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
                  <path d="M 0,50 L 100,100" fill="none" stroke="url(#gold-metallic-foil)" strokeWidth="1.2" />
                </svg>
              </div>

              {/* Bottom Flap */}
              <div
                ref={bottomFlapRef}
                className="absolute bottom-0 left-0 right-0 h-1/2 z-23 pointer-events-none"
                style={{
                  transformOrigin: "bottom center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform"
                }}
              >
                <svg className="w-full h-full filter drop-shadow-[0_-8px_20px_rgba(32,3,10,0.25)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="islamic-tile-pattern-bottom" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.048" />
                      <circle cx="30" cy="30" r="10" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.048" />
                    </pattern>
                    <linearGradient id="bottom-flap-grad" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#FDF8F0" />
                      <stop offset="85%" stopColor="#F8F2E8" />
                      <stop offset="100%" stopColor="#DFC8A5" />
                    </linearGradient>
                    <linearGradient id="bottom-crease-shadow-grad" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="rgba(133,97,36,0)" />
                      <stop offset="80%" stopColor="rgba(133,97,36,0.02)" />
                      <stop offset="100%" stopColor="rgba(133,97,36,0.22)" />
                    </linearGradient>
                  </defs>
                  {/* Flap Base */}
                  <path d="M 0,100 L 50,0 L 100,100 Z" fill="url(#bottom-flap-grad)" />
                  {/* Islamic Watermark */}
                  <path d="M 0,100 L 50,0 L 100,100 Z" fill="url(#islamic-tile-pattern-bottom)" />
                  {/* Crease shadow for depth */}
                  <path d="M 0,100 L 50,0 L 100,100 Z" fill="url(#bottom-crease-shadow-grad)" />
                  
                  {/* Embossed gold star near tip */}
                  <path d="M 50,12 L 52,15 L 55,15 L 53,17 L 54,20 L 50,18 L 46,20 L 47,17 L 45,15 L 48,15 Z" fill="#D4AF37" opacity="0.75" className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />

                  {/* DOUBLE-STROKE BEVELED GOLD FOIL CREASES ON BOTH FOLDS */}
                  <path d="M 0,100 L 50,0" fill="none" stroke="rgba(133,97,36,0.18)" strokeWidth="3" />
                  <path d="M -0.5,100.5 L 49.5,0.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
                  <path d="M 0,100 L 50,0" fill="none" stroke="url(#gold-metallic-foil)" strokeWidth="1.2" />

                  <path d="M 50,0 L 100,100" fill="none" stroke="rgba(133,97,36,0.18)" strokeWidth="3" />
                  <path d="M 49.5,-0.5 L 99.5,99.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
                  <path d="M 50,0 L 100,100" fill="none" stroke="url(#gold-metallic-foil)" strokeWidth="1.2" />
                </svg>
              </div>

              {/* Top Flap */}
              <div
                ref={topFlapRef}
                className="absolute top-0 left-0 right-0 h-1/2 z-25 pointer-events-none"
                style={{
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                  willChange: "transform"
                }}
              >
                {/* Front Side Flap (Cream Ivory) */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <svg className="w-full h-full filter drop-shadow-[0_10px_25px_rgba(32,3,10,0.32)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="islamic-tile-pattern-top" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.048" />
                        <circle cx="30" cy="30" r="10" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.048" />
                      </pattern>
                      <linearGradient id="top-flap-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FDF8F0" />
                        <stop offset="80%" stopColor="#F8F2E8" />
                        <stop offset="100%" stopColor="#DFC8A5" />
                      </linearGradient>
                      <linearGradient id="top-crease-shadow-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(133,97,36,0)" />
                        <stop offset="80%" stopColor="rgba(133,97,36,0.02)" />
                        <stop offset="100%" stopColor="rgba(133,97,36,0.22)" />
                      </linearGradient>
                    </defs>
                    {/* Flap Base */}
                    <path d="M 0,0 L 100,0 L 50,100 Z" fill="url(#top-flap-grad)" />
                    {/* Islamic Watermark */}
                    <path d="M 0,0 L 100,0 L 50,100 Z" fill="url(#islamic-tile-pattern-top)" />
                    {/* Crease shadow for depth */}
                    <path d="M 0,0 L 100,0 L 50,100 Z" fill="url(#top-crease-shadow-grad)" />
                    
                    {/* Embossed gold star near tip */}
                    <path d="M 50,82 L 52,85 L 55,85 L 53,87 L 54,90 L 50,88 L 46,90 L 47,87 L 45,85 L 48,85 Z" fill="#D4AF37" opacity="0.8" className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />

                    {/* DOUBLE-STROKE BEVELED GOLD FOIL CREASES ON BOTH FOLDS */}
                    <path d="M 0,0 L 50,100" fill="none" stroke="rgba(133,97,36,0.18)" strokeWidth="3" />
                    <path d="M -0.5,-0.5 L 49.5,99.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
                    <path d="M 0,0 L 50,100" fill="none" stroke="url(#gold-metallic-foil)" strokeWidth="1.2" />

                    <path d="M 50,100 L 100,0" fill="none" stroke="rgba(133,97,36,0.18)" strokeWidth="3" />
                    <path d="M 49.5,100.5 L 99.5,0.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
                    <path d="M 50,100 L 100,0" fill="none" stroke="url(#gold-metallic-foil)" strokeWidth="1.2" />
                  </svg>
                </div>

                {/* Back Side Flap (Dark Burgundy Velvet Interior with Gold pattern) */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    backfaceVisibility: "hidden",
                    transform: "rotateX(180deg)"
                  }}
                >
                  <svg className="w-full h-full filter drop-shadow-[0_-8px_20px_rgba(0,0,0,0.45)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="islamic-tile-pattern-interior" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="#D4AF37" strokeWidth="0.85" opacity="0.15" />
                        <circle cx="20" cy="20" r="6" fill="none" stroke="#D4AF37" strokeWidth="0.85" opacity="0.15" />
                      </pattern>
                      <linearGradient id="burgundy-velvet-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4A081B" />
                        <stop offset="50%" stopColor="#310411" />
                        <stop offset="100%" stopColor="#1F000A" />
                      </linearGradient>
                    </defs>
                    {/* Base Velvet */}
                    <path d="M 0,0 L 100,0 L 50,100 Z" fill="url(#burgundy-velvet-grad)" />
                    {/* Gold Watermark pattern */}
                    <path d="M 0,0 L 100,0 L 50,100 Z" fill="url(#islamic-tile-pattern-interior)" />
                    {/* Fine gold border lining the interior edge */}
                    <path d="M 0,0 L 50,100 L 100,0" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.75" />
                  </svg>
                </div>
              </div>

            </motion.div>

            {/* Sacred Wax Seal (CTAs) */}
            <AnimatePresence>
              {(stage === "closed" || stage === "cracking" || stage === "breaking") && (
                <div
                  ref={medallionRef}
                  style={{ 
                    transform: "translateZ(35px)", 
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity"
                  }}
                  className="absolute inset-0 m-auto z-40 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center pointer-events-auto cursor-pointer"
                >
                  <motion.div
                    exit={{ 
                      scale: 0.45, 
                      opacity: 0,
                      transition: { duration: 0.4, ease: "easeIn" }
                    }}
                    className={`w-full h-full relative flex items-center justify-center pointer-events-auto ${tapTriggered ? "" : "animate-card-float"}`}
                  >
                    {/* Concentric Glowing Gold Energy Pulsar waves (Expanding on click in exactly 700ms) */}
                    {tapTriggered && (
                      <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
                        {Array.from({ length: 3 }).map((_, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ scale: 0.6, opacity: 1 }}
                            animate={{ scale: 4.8, opacity: 0 }}
                            transition={{
                              duration: 0.7,
                              ease: [0.22, 1, 0.36, 1], // cubic-bezier(0.22, 1, 0.36, 1) exact match
                              delay: idx * 0.1
                            }}
                            className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full border-[2.5px] border-[#FCF6BA] shadow-[0_0_40px_rgba(212,175,55,0.85),inset_0_0_20px_rgba(252,246,186,0.65)]"
                          />
                        ))}
                      </div>
                    )}

                    <motion.button
                      onClick={handleMedallionTap}
                      whileHover={{ scale: 1.06, rotate: 1.5 }}
                      whileTap={{ scale: 0.94 }}
                      animate={
                        stage === "closed"
                          ? { scale: [1, 1.02, 1] }
                          : stage === "cracking" || stage === "breaking"
                          ? { scale: [1, 1.05, 1], opacity: 1 }
                          : { scale: 0.2, opacity: 0 }
                      }
                      transition={
                        stage === "closed"
                          ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                          : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                      }
                      className="w-full h-full rounded-full relative flex items-center justify-center cursor-pointer select-none group focus:outline-none bg-transparent border-none pointer-events-auto shadow-[0_12px_28px_rgba(74,8,27,0.45),0_4px_8px_rgba(0,0,0,0.25)] transform-gpu"
                      style={{ willChange: "transform, opacity" }}
                    >
                      {/* 1. Ambient breathing aura glow (Pulsating gold/burgundy blend) */}
                      <motion.div
                        animate={{
                          scale: [1, 1.18, 1],
                          opacity: [0.35, 0.7, 0.35],
                          boxShadow: ["0 0 25px rgba(212,175,55,0.35)", "0 0 50px rgba(74,8,27,0.65)", "0 0 25px rgba(212,175,55,0.35)"]
                        }}
                        transition={{
                          duration: 3.0,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-[-14px] rounded-full bg-[#D4AF37]/10 blur-xl pointer-events-none z-0"
                      />

                      {/* 2. Brushed Metallic Gold Outer Ring Border (Upgraded to premium luxury gold-bronze stops) */}
                      <div className="absolute inset-0 rounded-full p-[5.5px] bg-gradient-to-tr from-[#856124] via-[#FCF6BA] to-[#B38728] shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_12px_rgba(0,0,0,0.2)] overflow-hidden z-10 flex items-center justify-center">
                        
                        {/* Inner double border outlines */}
                        <div className="absolute inset-[3.5px] rounded-full border-[1.5px] border-double border-[#FFFDF9]/60 pointer-events-none z-10" />

                        {/* Soft light sweep across gold ring */}
                        <motion.div 
                          animate={{
                            left: ["-120%", "220%"],
                          }}
                          transition={{
                            duration: 3.0,
                            repeat: Infinity,
                            repeatDelay: 3.0,
                            ease: "easeInOut"
                          }}
                          className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-[#FFF8ED]/30 to-transparent blur-[2px] -skew-x-[20deg] pointer-events-none z-10" 
                        />

                        {/* 3. Glossy Burgundy Enamel Center (Richer deeper stops with specular glare) */}
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#4A081B] via-[#310411] to-[#1F000A] relative overflow-hidden flex flex-col items-center justify-center text-center p-2 shadow-[inset_0_2px_5px_rgba(0,0,0,0.65),inset_0_4px_10px_rgba(0,0,0,0.9)] z-20">
                          
                          {/* Radial specular dome glaze highlight */}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25)_0%,transparent_60%)] pointer-events-none z-10" />

                          {/* Gold stamped F&H monogram with 3D raise emboss shadow */}
                          <div 
                            style={{ filter: "drop-shadow(0.75px 0.75px 0.5px rgba(255,255,255,0.85)) drop-shadow(-0.75px -0.75px 0.5px rgba(0,0,0,0.85))" }}
                            className="text-[#FFF8ED] font-cormorant text-[1.1rem] md:text-[1.45rem] font-bold tracking-widest leading-none z-10 pointer-events-none"
                          >
                            F&H
                          </div>
                          
                          {/* Fine divider stamp */}
                          <div className="w-4 h-[0.5px] bg-[#D4AF37]/45 my-1 relative z-10 pointer-events-none">
                            <div className="absolute inset-0 m-auto w-0.5 h-0.5 rounded-full bg-[#D4AF37]" />
                          </div>

                          {/* "Tap to Open" ring text */}
                          <span className="font-cormorant text-[6.5px] md:text-[7.5px] font-bold tracking-[0.18em] text-[#FFF8ED]/75 leading-tight z-10 select-none uppercase">
                            Tap to Open
                          </span>

                          {/* Specular Glare reflection glaze overlay */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none z-10" />

                          {/* Shimmer sweep effect */}
                          <motion.div 
                            animate={{
                              left: ["-100%", "200%"],
                            }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              repeatDelay: 3.8,
                              ease: "easeInOut"
                            }}
                            className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-[#FFF8ED]/25 to-transparent blur-[3px] -skew-x-[25deg] pointer-events-none z-20" 
                          />
                          
                        </div>
                      </div>

                      {/* Tiny floating gold dust particles around seal */}
                      {stage === "closed" && Array.from({ length: 6 }).map((_, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ y: 30, x: (idx - 2.5) * 14, opacity: 0, scale: 0.5 }}
                          animate={{
                            y: -45,
                            opacity: [0, 0.7, 0.7, 0],
                            scale: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 3.5 + idx * 0.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: idx * 0.35,
                          }}
                          className="absolute w-1 h-1 rounded-full bg-[#E8C76A] shadow-[0_0_4px_#D4AF37] pointer-events-none z-20"
                        />
                      ))}

                    </motion.button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        </div>
      )}
    </div>
  );
}

// Corner Floral Decoration styled to look beveled/embossed using drop shadows
const FloralCorner = ({ className = "" }) => (
  <svg 
    style={{ filter: "drop-shadow(0.5px 0.5px 0.5px rgba(255,255,255,0.95)) drop-shadow(-0.5px -0.5px 0.5px rgba(117,58,58,0.15))" }}
    className={`absolute w-8 h-8 text-[#D4AF37]/35 pointer-events-none z-10 ${className}`} 
    viewBox="0 0 100 100" 
    fill="none" 
    stroke="currentColor"
  >
    <path d="M 10,10 C 25,10 30,25 30,30 C 30,35 20,40 10,40 C 10,25 25,20 30,10" strokeWidth="1.2" />
    <path d="M 10,10 L 40,10 C 35,20 20,35 10,40" strokeWidth="0.8" strokeDasharray="2,2" />
    <circle cx="10" cy="10" r="3" fill="currentColor" />
  </svg>
);

export default memo(GrandOpening);
