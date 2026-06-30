"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, memo } from "react";
import { gsap } from "gsap";
import { 
  startAmbience, 
  stopAmbience, 
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
  const [waxParticles, setWaxParticles] = useState([]);
  const [idleParticles, setIdleParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Parallax tilt position tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // GSAP Refs
  const cameraContainerRef = useRef(null);
  const envelopeRef = useRef(null);
  const medallionRef = useRef(null);

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
      driftY: - (Math.random() * 60 + 30),
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

  const triggerWaxMelting = () => {
    const waxCount = isMobile ? 12 : 28;
    const generated = Array.from({ length: waxCount }).map((_, i) => ({
      id: i,
      x: 0,
      y: 0,
      scale: Math.random() * 0.8 + 0.4,
      angle: Math.random() * 2 * Math.PI,
      distance: Math.random() * 150 + 90,
      duration: Math.random() * 0.7 + 0.45,
    }));
    setWaxParticles(generated);
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
    setStage("cracking");
    
    // Play lock click & metallic tap sounds at click onset
    playMetallicTap();
    playLockClick();

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
        }, 1200);
        if (ambientWind) ambientWind.stop();
      }
    });

    // 1. Press effect compress & crack phase (0.0s - 0.6s)
    tl.to(medallionRef.current, {
      scale: 0.85,
      z: -18,
      duration: 0.4,
      ease: "power2.out"
    });

    tl.to(medallionRef.current, {
      scale: 1.0,
      z: 0,
      duration: 0.2,
      ease: "power2.inOut"
    }, 0.4);

    // 2. Seal breaks & dissolves into particles (0.6s - 1.1s)
    tl.add(() => {
      setStage("breaking");
      triggerWaxMelting();
      playWhoosh(); 
    }, 0.6);

    tl.to(medallionRef.current, {
      scale: 0.2,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    }, 0.6);

    // 3. Top flap opens (1.1s - 2.3s)
    tl.add(() => {
      setStage("opening");
      playHingeCreak(); // paper creak unfolding sound
    }, 1.1);

    // 4. Side flaps open/slide (2.3s - 3.1s)
    tl.add(() => {
      setStage("flapsOpen");
    }, 2.3);

    // 5. Card rises up & blessing dua reveal (3.1s - 4.5s)
    tl.add(() => {
      setStage("reveal");
    }, 3.1);

    // 6. Transition: dissolve overlay & transition to site (4.5s - 5.4s)
    tl.add(() => {
      setStage("transitioning");
      playWhoosh();
    }, 4.5);

    tl.to(cameraContainerRef.current, {
      scale: 1.15,
      filter: "blur(20px)",
      opacity: 0,
      duration: 0.9,
      ease: "power2.inOut"
    }, 4.55);
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
          style={{ willChange: "transform, opacity", transform: "scale(1)" }}
        >
          {/* BASE GRADIENT BACKGROUND - Matches Preloader styling */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A000D] via-[#4A081B] to-[#1A0208] pointer-events-none z-0" />

          {/* Multiple Blurred Gradient Layers for Atmospheric Depth */}
          {/* 1. Large soft radial burgundy/crimson bloom spotlight behind envelope */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] md:w-[900px] h-[550px] md:h-[900px] bg-[radial-gradient(circle_at_center,rgba(168,26,67,0.42)_0%,rgba(74,8,27,0.12)_45%,transparent_100%)] rounded-full blur-[90px] pointer-events-none z-0" />

          {/* 2. Very subtle warm golden radial glow centered behind envelope */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[550px] h-[350px] md:h-[550px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,rgba(212,175,55,0.01)_60%,transparent_100%)] rounded-full blur-[80px] pointer-events-none z-0" />

          {/* 3. Slow-breathing Top-Left Crimson Atmospheric Bloom */}
          <motion.div 
            animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.28, 0.15] }} 
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute -top-[15%] -left-[15%] w-[60%] h-[60%] rounded-full bg-[#7A1230] blur-[140px] pointer-events-none z-0" 
          />

          {/* 4. Slow-breathing Bottom-Right Deep Wine Atmospheric Bloom */}
          <motion.div 
            animate={{ scale: [1.12, 1, 1.12], opacity: [0.12, 0.24, 0.12] }} 
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute -bottom-[15%] -right-[15%] w-[60%] h-[60%] rounded-full bg-[#4A081B] blur-[150px] pointer-events-none z-0" 
          />

          {/* Cinematic Vignette Overlay around screen corners to darken outer edges */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,0,2,0.96)_100%)] pointer-events-none z-10" />

          {/* Background Dimming Mask Overlay (softly dims to deep wine-black on blessing reveal) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={
              stage === "reveal" || stage === "transitioning"
                ? { opacity: 0.85 }
                : { opacity: 0 }
            }
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,2,4,0.95)_20%,rgba(5,0,2,0.98)_100%)] pointer-events-none z-20"
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
                animate={
                  stage === "reveal" || stage === "transitioning"
                    ? { x: 0, y: 0, opacity: 0 }
                    : {
                        y: "-10%",
                        opacity: [0, p.opacity, p.opacity, 0],
                        x: ["0px", `${p.driftX}px`],
                      }
                }
                transition={
                  stage === "reveal" || stage === "transitioning"
                    ? { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
                    : {
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                      }
                }
                className="absolute rounded-full bg-[#E8C76A] shadow-[0_0_5px_rgba(212,175,55,0.4)]"
                style={{
                  left: p.left,
                  width: p.size,
                  height: p.size,
                }}
              />
            ))}
          </div>

          {/* Melting Wax Particles (burst on seal break) */}
          {stage === "breaking" && (
            <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
              {waxParticles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ x: 0, y: 0, scale: p.scale, opacity: 1 }}
                  animate={{
                    x: Math.cos(p.angle) * p.distance,
                    y: Math.sin(p.angle) * p.distance,
                    scale: 0.1,
                    opacity: 0,
                  }}
                  transition={{ duration: p.duration, ease: "easeOut" }}
                  className="absolute w-4 h-4 rounded-full bg-[#E8C76A]"
                  style={{ boxShadow: "0 0 10px #D4AF37, 0 0 20px #D4AF37" }}
                />
              ))}
            </div>
          )}

          {/* Fullscreen Tall Portrait Envelope Wrapper Frame (9:16 proportions) */}
          <div className="relative w-[88vw] max-w-[400px] h-[78vh] max-h-[710px] flex items-center justify-center z-20" style={{ willChange: "transform, opacity" }}>
            
            {/* ENVELOPE 3D FRAME with mouse coordinate parallax tilt */}
            <motion.div
              ref={envelopeRef}
              style={!isMobile && stage === "closed" ? {
                rotateY: mousePos.x,
                rotateX: mousePos.y,
                transformStyle: "preserve-3d",
                willChange: "transform, opacity, filter"
              } : {
                transformStyle: "preserve-3d",
                willChange: "transform, opacity, filter"
              }}
              animate={
                stage === "reveal" || stage === "transitioning"
                  ? { 
                      filter: stage === "transitioning" ? "blur(7px)" : "blur(4px)", 
                      opacity: stage === "transitioning" ? 0.2 : 0.5, 
                      scale: stage === "transitioning" ? 0.92 : 0.96 
                    }
                  : { filter: "blur(0px)", opacity: 1, scale: 1 }
              }
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full relative door-preserve-3d flex items-center justify-center transition-transform duration-300 ease-out"
            >
              {/* Envelope shadow depth */}
              <div className="absolute inset-0 bg-black/35 rounded-xl blur-lg translate-y-4 pointer-events-none" />

              {/* Burgundy Ambient Glow behind envelope edges */}
              <div className="absolute inset-[-18px] bg-[#4A081B]/18 rounded-xl blur-2xl pointer-events-none z-[-1]" />

              {/* Envelope Body (Back Panel - upgraded to warm ivory cream stops) */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FDF8F0] via-[#FAF5EC] to-[#F8F2E8] border border-[#D4AF37]/35 overflow-hidden shadow-2xl z-0">
                {/* Fine linen texture pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise" />
                {/* Double gold margins */}
                <div className="absolute inset-4 border border-dashed border-[#D4AF37]/15 rounded-lg pointer-events-none" />

                {/* Repeating Islamic geometric pattern watermark (upgraded opacity to 4.8%) */}
                <div className="absolute inset-0 opacity-[0.048] pointer-events-none z-0" 
                     style={{ 
                       backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`, 
                       backgroundSize: "60px 60px" 
                     }} />

                {/* Soft Radial Ivory Lighting Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,253,249,0.95)_0%,transparent_90%)] pointer-events-none z-0" />

                {/* Corner Arabesque Florals */}
                <FloralCorner className="top-5 left-5" />
                <FloralCorner className="top-5 right-5 rotate-90" />
                <FloralCorner className="bottom-5 left-5 -rotate-90" />
                <FloralCorner className="bottom-5 right-5 rotate-180" />
              </div>

              {/* Left Flap */}
              <motion.div
                initial={{ rotateY: 0, x: 0 }}
                animate={["flapsOpen", "reveal", "transitioning"].includes(stage) ? { x: -16, rotateY: -10 } : { x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 bottom-0 left-0 w-1/2 z-22 pointer-events-none"
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform"
                }}
              >
                <svg className="w-full h-full filter drop-shadow-[4px_0_12px_rgba(0,0,0,0.15)]" viewBox="0 0 100 100" preserveAspectRatio="none">
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

                  {/* DOUBLE-STROKE BEVELED GOLD FOIL CREASES */}
                  <path d="M 100,50 L 0,100" fill="none" stroke="rgba(133,97,36,0.18)" strokeWidth="3" />
                  <path d="M 99.5,49.5 L -0.5,99.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
                  <path d="M 100,50 L 0,100" fill="none" stroke="url(#gold-metallic-foil)" strokeWidth="1.2" />
                </svg>
              </motion.div>

              {/* Right Flap */}
              <motion.div
                initial={{ rotateY: 0, x: 0 }}
                animate={["flapsOpen", "reveal", "transitioning"].includes(stage) ? { x: 16, rotateY: 10 } : { x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 bottom-0 right-0 w-1/2 z-22 pointer-events-none"
                style={{
                  transformOrigin: "right center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform"
                }}
              >
                <svg className="w-full h-full filter drop-shadow-[-4px_0_12px_rgba(0,0,0,0.15)]" viewBox="0 0 100 100" preserveAspectRatio="none">
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

                  {/* DOUBLE-STROKE BEVELED GOLD FOIL CREASES */}
                  <path d="M 0,50 L 100,100" fill="none" stroke="rgba(133,97,36,0.18)" strokeWidth="3" />
                  <path d="M -0.5,49.5 L 99.5,99.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
                  <path d="M 0,50 L 100,100" fill="none" stroke="url(#gold-metallic-foil)" strokeWidth="1.2" />
                </svg>
              </motion.div>

              {/* Bottom Flap */}
              <motion.div
                initial={{ rotateX: 0, y: 0 }}
                animate={["flapsOpen", "reveal", "transitioning"].includes(stage) ? { y: 12, rotateX: -8 } : { y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0 right-0 h-1/2 z-23 pointer-events-none"
                style={{
                  transformOrigin: "bottom center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform"
                }}
              >
                <svg className="w-full h-full filter drop-shadow-[0_-5px_15px_rgba(0,0,0,0.12)]" viewBox="0 0 100 100" preserveAspectRatio="none">
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

                  {/* DOUBLE-STROKE BEVELED GOLD FOIL CREASES */}
                  <path d="M 0,100 L 50,0 L 100,100" fill="none" stroke="rgba(133,97,36,0.18)" strokeWidth="3" />
                  <path d="M -0.5,99.5 L 49.5,-0.5 L 99.5,99.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
                  <path d="M 0,100 L 50,0 L 100,100" fill="none" stroke="url(#gold-metallic-foil)" strokeWidth="1.2" />
                </svg>
              </motion.div>

              {/* Top Flap */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={["opening", "flapsOpen", "reveal", "transitioning"].includes(stage) ? { rotateX: 180 } : {}}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0 }}
                className="absolute top-0 left-0 right-0 h-1/2 z-25 pointer-events-none"
                style={{
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform"
                }}
              >
                <svg className="w-full h-full filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.22)]" viewBox="0 0 100 100" preserveAspectRatio="none">
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

                  {/* DOUBLE-STROKE BEVELED GOLD FOIL CREASES */}
                  <path d="M 0,0 L 50,100 L 100,0" fill="none" stroke="rgba(133,97,36,0.18)" strokeWidth="3" />
                  <path d="M -0.5,-0.5 L 49.5,99.5 L 99.5,-0.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
                  <path d="M 0,0 L 50,100 L 100,0" fill="none" stroke="url(#gold-metallic-foil)" strokeWidth="1.4" />
                </svg>
              </motion.div>

            </motion.div>

            {/* Sacred Invitation Card inside (slides up vertically, weights rise) */}
            <motion.div
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={
                stage === "reveal" || stage === "transitioning"
                  ? { 
                      y: stage === "transitioning" ? (isMobile ? "-45vh" : "-260px") : (isMobile ? "-32vh" : "-180px"), 
                      scale: stage === "transitioning" ? 2.0 : 1.04, 
                      opacity: stage === "transitioning" ? 0 : 1 
                    }
                  : { y: 50, scale: 0.95, opacity: 0 }
              }
              transition={{
                y: { 
                  duration: stage === "transitioning" ? 0.8 : 1.4, 
                  ease: [0.22, 1, 0.36, 1] 
                },
                scale: { 
                  duration: stage === "transitioning" ? 0.8 : 1.4, 
                  ease: [0.22, 1, 0.36, 1] 
                },
                opacity: { 
                  duration: stage === "transitioning" ? 0.8 : 1.0 
                }
              }}
              style={{ willChange: "transform, opacity" }}
              className="absolute inset-[12px] bg-gradient-to-br from-[#FDF8F0] via-[#FAF5EC] to-[#F8F2E8] border border-[#D4AF37]/35 rounded-lg shadow-2xl p-6 flex flex-col items-center justify-center text-center pointer-events-none z-24"
            >
              {/* Gold inner frame */}
              <div className="absolute inset-2 border border-[#D4AF37]/25 rounded pointer-events-none" />

              {/* Card Corner Ornaments */}
              <FloralCorner className="top-4 left-4" />
              <FloralCorner className="top-4 right-4 rotate-90" />
              <FloralCorner className="bottom-4 left-4 -rotate-90" />
              <FloralCorner className="bottom-4 right-4 rotate-180" />

              {/* Repeating Islamic geometric pattern watermark inside invitation card too */}
              <div className="absolute inset-0 opacity-[0.048] pointer-events-none z-0" 
                   style={{ 
                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`, 
                     backgroundSize: "60px 60px" 
                   }} />

              {/* POST-OPEN BLESSING ANIMATION (Crescent Moon, Star, Arabic Dua & English Translation) */}
              <div className="z-10 flex flex-col items-center justify-center">
                {/* 1. Self-Drawing Crescent Moon and Star SVG */}
                <div className="relative mb-5 flex items-center justify-center">
                  {/* Soft golden bloom glow behind crescent */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={stage === "reveal" || stage === "transitioning" ? { opacity: 0.35, scale: 1.2 } : {}}
                    transition={{ duration: 1.6, ease: "easeOut", delay: 0.8 }}
                    className="absolute w-24 h-24 rounded-full bg-[#D4AF37]/35 blur-xl pointer-events-none z-0"
                  />

                  <svg className="w-16 h-16 text-[#D4AF37] stroke-current fill-none stroke-[1.6] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] relative z-10" viewBox="0 0 100 100">
                    {/* Crescent outline */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={stage === "reveal" || stage === "transitioning" ? { pathLength: 1 } : {}}
                      transition={{ duration: 1.8, ease: "easeInOut", delay: 0.6 }}
                      d="M 50,15 A 32,32 0 1,0 82,47 A 26,26 0 1,1 50,15"
                    />
                    {/* Star outline */}
                    <motion.path
                      initial={{ pathLength: 0, scale: 0 }}
                      animate={stage === "reveal" || stage === "transitioning" ? { pathLength: 1, scale: 1 } : {}}
                      transition={{ duration: 1.4, ease: "easeInOut", delay: 1.4 }}
                      style={{ transformOrigin: "67px 33px" }}
                      d="M 67,23 L 69,29 L 75,29 L 70,33 L 72,39 L 67,35 L 62,39 L 64,33 L 59,29 L 65,29 Z"
                    />
                  </svg>
                </div>

                {/* 2. Dua Texts with slow upward float and fade-in opacity */}
                <AnimatePresence>
                  {(stage === "reveal" || stage === "transitioning") && (
                    <div className="flex flex-col items-center">
                      {/* Arabic Dua */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.8 }}
                        className="text-[#856124] font-serif text-[1.55rem] md:text-[2.1rem] font-bold leading-none mb-5 drop-shadow-[0_1px_2.5px_rgba(0,0,0,0.15)] select-none"
                      >
                        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                      </motion.div>
                      {/* English translation */}
                      <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 2.5 }}
                        className="font-cormorant text-[10px] md:text-[13px] uppercase tracking-[0.25em] text-[#753A3A] font-bold max-w-[260px] md:max-w-[320px] leading-relaxed select-none text-center"
                      >
                        In the name of Allah, the Most Compassionate, the Most Merciful
                      </motion.p>
                      {/* Gold stamped flourish */}
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
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#D4AF37]/5 to-transparent pointer-events-none z-10" />
            </motion.div>

            {/* Sacred Wax Seal (CTAs) */}
            <AnimatePresence>
              {(stage === "closed" || stage === "cracking") && (
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
                    className="w-full h-full relative flex items-center justify-center pointer-events-auto"
                  >
                    {/* Expanding Shockwave Ripple on tap */}
                    {stage === "cracking" && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 1, filter: "blur(0px)" }}
                        animate={{ scale: 3.5, opacity: 0, filter: "blur(6px)" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#FFF8ED] shadow-[0_0_30px_#D4AF37,0_0_60px_#D4AF37] pointer-events-none z-50"
                      />
                    )}

                    <motion.button
                      onClick={handleMedallionTap}
                      whileHover={{ scale: 1.05 }}
                      animate={
                        stage === "closed"
                          ? { scale: [1, 1.02, 1] }
                          : stage === "cracking"
                          ? { scale: [1, 1.05, 1], opacity: 1 }
                          : { scale: 0.2, opacity: 0 }
                      }
                      transition={
                        stage === "closed"
                          ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                          : stage === "cracking"
                          ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                          : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                      }
                      className="w-full h-full rounded-full relative flex items-center justify-center cursor-pointer select-none group focus:outline-none bg-transparent border-none pointer-events-auto shadow-[0_12px_28px_rgba(74,8,27,0.45),0_4px_8px_rgba(0,0,0,0.25)]"
                      style={{ willChange: "transform, opacity" }}
                    >
                      {/* 1. Breathing Glow Pulse every 3 seconds */}
                      <motion.div
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.25, 0.55, 0.25]
                        }}
                        transition={{
                          duration: 3.0,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-[-14px] rounded-full bg-[#D4AF37]/20 blur-xl pointer-events-none z-0"
                      />

                      {/* 2. Brushed Matte Gold Outer Ring Border (Upgraded gold-bronze stops) */}
                      <div className="absolute inset-0 rounded-full p-[5.5px] bg-gradient-to-tr from-[#8E7037] via-[#F3DA90] to-[#8E7037] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7)] overflow-hidden z-10 flex items-center justify-center">
                        
                        {/* Inner double border outlines */}
                        <div className="absolute inset-[3.5px] rounded-full border border-dashed border-[#FFF8ED]/35 pointer-events-none z-10" />

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

                        {/* 3. Glossy Burgundy Enamel Center (Richer deeper stops) */}
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#3D0212] via-[#240008] to-[#0A0002] relative overflow-hidden flex flex-col items-center justify-center text-center p-2 shadow-[inset_0_4px_10px_rgba(0,0,0,0.9)] z-20">
                          
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
                            {stage === "closed" && "Tap to Open"}
                            {stage === "cracking" && "Unlocking"}
                          </span>

                          {/* Specular Glare reflection glaze overlay */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none z-10" />

                          {/* Cracking lines on click */}
                          {stage === "cracking" && (
                            <svg className="absolute inset-0 w-full h-full text-[#FFF8ED] z-20 stroke-current stroke-[1.8] fill-none" viewBox="0 0 100 100">
                              <motion.path 
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                d="M 50,50 L 50,20 M 50,50 L 80,70 M 50,50 L 20,70 M 50,50 L 65,30 M 50,50 L 35,30" 
                                className="drop-shadow-[0_0_8px_#D4AF37]"
                              />
                            </svg>
                          )}

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
