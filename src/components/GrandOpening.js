"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
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

export default function GrandOpening({ isOpen, onOpen, onStartOpening, children }) {
  const [stage, setStage] = useState("closed"); // "closed" | "tapping" | "swinging" | "opened"
  const [showDoorsOverlay, setShowDoorsOverlay] = useState(true);
  const [ambientWind, setAmbientWind] = useState(null);
  const [particles, setParticles] = useState([]);
  const [waxParticles, setWaxParticles] = useState([]);
  const [idleParticles, setIdleParticles] = useState([]);
  const [scaleFactor, setScaleFactor] = useState(4.5);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // DOM Refs for high-performance direct GSAP animations
  const cameraContainerRef = useRef(null);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const medallionRef = useRef(null);
  const lightLeakRef = useRef(null);
  const godRaysRef = useRef(null);

  useEffect(() => {
    let checkMobile = false;
    if (typeof window !== "undefined") {
      checkMobile = window.innerWidth < 768;
      setIsMobile(checkMobile);
      setScaleFactor(checkMobile ? 3.5 : 4.5);
    }

    // Generate organic rose petals and gold sparks for the portal opening (main particles: 30 -> mobile 10)
    const mainCount = checkMobile ? 10 : 30;
    const generated = Array.from({ length: mainCount }).map((_, i) => ({
      id: i,
      type: Math.random() > 0.45 ? "petal" : "spark",
      x: Math.random() * 60 - 30, // center offset
      y: Math.random() * 40 - 20, 
      scale: Math.random() * 0.55 + 0.45,
      rotation: Math.random() * 360,
      spinSpeed: Math.random() * 150 + 90,
      duration: Math.random() * 3.2 + 2.3,
      delay: Math.random() * 1.0,
      driftX: Math.random() * 240 - 120,
      driftY: - (Math.random() * 350 + 250), // drift up
    }));
    setParticles(generated);

    // Generate slow drifting ambient dust and sparks for the idle state (idle particles: 22 -> mobile 8)
    const idleCount = checkMobile ? 8 : 22;
    const generatedIdle = Array.from({ length: idleCount }).map((_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${15 + Math.random() * 70}%`,
      size: Math.random() * 2.5 + 1.2,
      opacity: Math.random() * 0.45 + 0.25,
      driftX: Math.random() * 50 - 25,
      driftY: - (Math.random() * 60 + 40),
      duration: Math.random() * 8 + 6, // very slow drift (6 to 14 seconds)
    }));
    setIdleParticles(generatedIdle);

    // Start loopable palace ambient wind hum
    const wind = startAmbience();
    setAmbientWind(wind);

    return () => {
      if (wind) wind.stop();
    };
  }, []);

  const triggerWaxMelting = () => {
    // wax particles: 25 -> mobile 10
    const waxCount = isMobile ? 10 : 25;
    const generated = Array.from({ length: waxCount }).map((_, i) => ({
      id: i,
      x: 0,
      y: 0,
      scale: Math.random() * 0.8 + 0.4,
      angle: Math.random() * 2 * Math.PI,
      distance: Math.random() * 140 + 85,
      duration: Math.random() * 0.65 + 0.35,
    }));
    setWaxParticles(generated);
  };

  const handleMedallionTap = (e) => {
    if (e) e.stopPropagation();
    if (stage !== "closed" || isTransitioning) return;

    // Direct synchronous play trigger for background music to bypass browser autoplay policies
    const audio = getGlobalAudio();
    if (audio) {
      audio.volume = 0; // Starts at 0 volume and fades in via MusicToggle component
      audio.play().catch((err) => {
        console.log("Audio play failed synchronously inside tap:", err);
      });
    }

    setIsTransitioning(true);

    setStage("tapping");
    playMetallicTap();
    triggerWaxMelting();

    if (onStartOpening) {
      onStartOpening();
    }

    // Create a high-performance GSAP timeline to sequence the entire opening experience
    const tl = gsap.timeline({
      onComplete: () => {
        setStage("opened");
        onOpen(); // Trigger page state update to mount scroll sections after doors overlay fully resolves
        setTimeout(() => {
          setShowDoorsOverlay(false);
        }, 1200);
        if (ambientWind) ambientWind.stop();
      }
    });

    // 1. CTA Press-in and Lock Click (0.0s - 0.3s)
    tl.to(medallionRef.current, {
      scale: 0.88,
      z: -12,
      rotation: 3,
      duration: 0.3,
      ease: "power2.out"
    });

    // 2. Play lock click sound at 0.3s (starts the 0.5s Tension Pause)
    tl.add(() => {
      playLockClick();
    }, 0.3);

    // Seam light leak brightens and pulses during tension pause (0.3s - 0.8s)
    tl.to(lightLeakRef.current, {
      opacity: 0.75,
      scaleX: 2.5,
      duration: 0.5,
      ease: "sine.inOut"
    }, 0.3);

    // 3. Medallion fades and doors swing open at 0.8s (Tension pause completes)
    tl.to(medallionRef.current, {
      scale: 0.45,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    }, 0.8);

    tl.add(() => {
      playHingeCreak(); // heavy wood/metallic hinge creak
      playWhoosh();
      setStage("swinging");
    }, 0.8);

    // Slow, heavy 3D double door swing rotation (4.5s duration)
    tl.to(leftDoorRef.current, {
      rotateY: -105,
      duration: 4.5,
      ease: "power3.out"
    }, 0.8);

    tl.to(rightDoorRef.current, {
      rotateY: 105,
      duration: 4.5,
      ease: "power3.out"
    }, 0.8);

    // Camera dolly zoom forward (scale up portal overlay container)
    tl.to(cameraContainerRef.current, {
      scale: scaleFactor,
      duration: 4.5,
      ease: "power3.out"
    }, 0.8);

    // Seam golden light expands to engulf screen
    tl.to(lightLeakRef.current, {
      scaleX: 35,
      opacity: 1.0,
      duration: 4.5,
      ease: "power3.in"
    }, 0.8);

    // God rays volumetric bloom
    tl.to(godRaysRef.current, {
      opacity: [0, 0.95, 0],
      scale: [0.6, 2.5, 3.8],
      duration: 4.0,
      ease: "power2.out"
    }, 0.8);

    // 4. Fade out overlay container background in the final 800ms to reveal the invitation (4.5s - 5.3s)
    // This completely eliminates any white/ivory flash by matching overlay resolving with content mounting!
    tl.to(cameraContainerRef.current, {
      filter: "blur(8px)",
      scale: scaleFactor * 1.05,
      duration: 0.8,
      ease: "power2.out"
    }, 4.5);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-brand-bg door-perspective-container">
      
      {/* Revealed Main Invitation Content (cinematic scale-up forward dolly) */}
      <div
        className="w-full min-h-screen"
        style={{
          transform: isOpen ? "scale(1.0)" : "scale(0.85)",
          opacity: isOpen ? 1 : 0,
          transition: "transform 1.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.8s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform, opacity"
        }}
      >
        {children}
      </div>

      {/* Grand Entrance Overlay */}
      {showDoorsOverlay && (
        <div
          ref={cameraContainerRef}
          className="fixed inset-0 z-40 flex items-center justify-center bg-[#4A081B] door-preserve-3d pointer-events-auto"
          style={{ willChange: "transform, opacity", transform: "scale(1)" }}
        >
          
          {/* Subtle slow camera micro zoom container wrapper (paused during swing) */}
          <motion.div 
            animate={stage === "closed" ? {
              scale: [1, 1.012, 1],
            } : {}}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full relative door-preserve-3d flex items-center justify-center"
          >

            {/* PITCH BLACK ROOM INTERIOR BACKGROUND WITH RADIAL DEPTH */}
            <div className="absolute inset-0 velvet-silk-bg z-0 pointer-events-none" />

            {/* Soft radial golden spotlight behind doors */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] md:w-[700px] h-[380px] md:h-[700px] bg-gradient-to-tr from-[#D4AF37]/5 via-[#FFF8ED]/8 to-[#D4AF37]/5 rounded-full blur-[90px] pointer-events-none z-0" />

            {/* Heavenly warm top-down light beam cone */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160vw] md:w-[80vw] h-[100vh] bg-gradient-to-b from-[#FFF8ED]/12 via-[#FFF8ED]/3 to-transparent pointer-events-none z-15"
                 style={{ clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)", filter: "blur(20px)" }} />

            {/* Cinematic vignette overlay around screen edges */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)] pointer-events-none z-25" />

            {/* Slowly shifting background fog/mist layer */}
            <motion.div
              animate={{
                x: ["-5%", "5%", "-5%"],
                y: ["-5%", "5%", "-5%"],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-[-10%] bg-[radial-gradient(circle_at_center,rgba(74,8,27,0.12)_0%,transparent_60%)] filter blur-3xl pointer-events-none z-0"
            />

            {/* VOLUMETRIC DYNAMIC LIGHT REVEAL SYSTEM */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
              {/* Vertical Light Leak Seam */}
              <div 
                ref={lightLeakRef}
                className="absolute inset-y-0 bg-gradient-to-r from-transparent via-[#FFF8ED] to-transparent z-10 w-24 opacity-5"
                style={{ 
                  willChange: "transform, opacity",
                  transform: "scaleX(1)",
                  filter: "blur(20px)"
                }}
              />
              
              {/* God Rays Volumetric Cone */}
              <div 
                ref={godRaysRef}
                className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-brand-gold/30 via-[#FFF8ED]/95 to-brand-gold/20 rounded-full z-10 opacity-0 pointer-events-none"
                style={{
                  willChange: "transform, opacity",
                  transform: "scale(0.8)",
                  filter: "blur(60px)"
                }}
              />
            </div>

            {/* Volumetric Floating Dust Particles & Sparks behind doors (active after click) */}
            {stage !== "closed" && (
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {Array.from({ length: isMobile ? 6 : 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.6, y: 30 }}
                    animate={{
                      opacity: [0, 0.8, 0.8, 0],
                      scale: [0.6, 1.2, 0.6],
                      y: -80,
                      x: Math.random() * 40 - 20,
                    }}
                    transition={{
                      duration: Math.random() * 4 + 4,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeInOut",
                    }}
                    className="absolute rounded-full bg-[#FFF8ED]"
                    style={{
                      left: `${15 + Math.random() * 70}%`,
                      top: `${10 + Math.random() * 80}%`,
                      width: Math.random() * 2 + 1,
                      height: Math.random() * 2 + 1,
                      boxShadow: "0 0 4px #D4AF37",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Emerging Rose Petals & Gold Sparks (Float towards camera during swing) */}
            {(stage === "swinging" || stage === "opened") && (
              <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden flex items-center justify-center">
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ 
                      x: p.x, 
                      y: p.y, 
                      scale: 0.05, 
                      opacity: 0,
                      rotate: p.rotation
                    }}
                    animate={{
                      x: p.x + p.driftX,
                      y: p.y + p.driftY,
                      scale: p.scale,
                      opacity: [0, 1, 1, 0],
                      rotate: p.rotation + p.spinSpeed,
                    }}
                    transition={{
                      duration: p.duration,
                      delay: p.delay,
                      ease: "easeOut"
                    }}
                    className="absolute"
                  >
                    {p.type === "petal" ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path 
                          d="M 12 2 C 7 2 4 6 4 11 C 4 17 8 22 12 22 C 16 22 20 17 20 11 C 20 6 17 2 12 2 Z" 
                          fill="url(#petal-grad-direct)" 
                        />
                        <defs>
                          <radialGradient id="petal-grad-direct" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#8F1C3C" />
                            <stop offset="70%" stopColor="#6D0F2A" />
                            <stop offset="100%" stopColor="#4A081B" />
                          </radialGradient>
                        </defs>
                      </svg>
                    ) : (
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path 
                          d="M 6 0 L 7.5 4.5 L 12 6 L 7.5 7.5 L 6 12 L 4.5 7.5 L 0 6 L 4.5 4.5 Z" 
                          fill="#E8C76A" 
                          className="drop-shadow-[0_0_3px_#D4AF37]"
                        />
                      </svg>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Melting Wax Golden Particles */}
            {stage === "tapping" && (
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

            {/* Volumetric Fog & Bloom around center seal */}
            {(stage === "closed" || stage === "tapping") && (
              <motion.div 
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.35, 0.55, 0.35]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-64 h-64 rounded-full bg-[#FFF8ED]/10 blur-3xl z-30 pointer-events-none"
                style={{ transform: "translateZ(66px)" }}
              />
            )}

            {/* Idle State Slow Floating Dust & Sparks (Drifts in front of closed doors) */}
            {(stage === "closed" || stage === "tapping") && (
              <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                {idleParticles.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 0, 
                      scale: 0.8 
                    }}
                    animate={{
                      x: p.driftX,
                      y: p.driftY,
                      opacity: [0, p.opacity, p.opacity, 0],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: p.duration,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                    className="absolute rounded-full bg-[#FFF8ED]"
                    style={{
                      left: p.left,
                      top: p.top,
                      width: p.size,
                      height: p.size,
                      boxShadow: "0 0 6px rgba(212, 175, 55, 0.8)",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Dynamic Occlusion Floor Shadow Overlay */}
            <motion.div
              animate={{ opacity: stage === "swinging" || stage === "opened" ? 0 : 0.65 }}
              transition={{ duration: 1.8 }}
              className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-15 pointer-events-none"
            />

            {/* Palace Lanterns Left and Right (Kept on outer margins) */}
            <div 
              style={{ transform: "translateZ(30px)" }}
              className="absolute inset-y-0 left-2 md:left-6 w-16 z-35 flex items-center justify-center pointer-events-none"
            >
              <Lantern position="left" />
            </div>
            <div 
              style={{ transform: "translateZ(30px)" }}
              className="absolute inset-y-0 right-2 md:right-6 w-16 z-35 flex items-center justify-center pointer-events-none"
            >
              <Lantern position="right" />
            </div>

            {/* Centered Entrance Portal (with reduced width and taller aspect ratio) */}
            <div className="w-[82vw] md:w-[42vw] max-w-[440px] h-[86vh] max-h-[820px] relative door-preserve-3d z-20 flex items-center justify-center pointer-events-none">
              
              {/* Thin Glowing Golden Seam between doors */}
              {(stage === "closed" || stage === "tapping") && (
                <motion.div
                  animate={stage === "tapping" ? {
                    boxShadow: ["0 0 4px #D4AF37", "0 0 16px #D4AF37, 0 0 24px #E8C76A", "0 0 4px #D4AF37"],
                    opacity: [0.6, 1.0, 0.6]
                  } : {
                    opacity: [0.35, 0.55, 0.35]
                  }}
                  transition={stage === "tapping" ? {
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  } : {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#D4AF37]/20 via-[#E8C76A]/95 to-[#D4AF37]/20 z-30 pointer-events-none shadow-[0_0_8px_#D4AF37]"
                  style={{ transform: "translateZ(66px)" }}
                />
              )}

              {/* Grand Islamic Palace Arch Frame (Pointed Arabic ogee arch) */}
              <div className="absolute inset-0 border-[1.5px] border-[#D4AF37]/25 rounded-[180px_180px_0_0] pointer-events-none z-35">
                <div className="absolute inset-[3px] border border-dashed border-[#D4AF37]/10 rounded-[176px_176px_0_0]" />
                
                {/* Islamic Pointed Arch Path Overlay */}
                <svg className="absolute inset-0 w-full h-full stroke-[#D4AF37]/35 fill-none pointer-events-none stroke-[0.6]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 4,100 L 4,38 C 4,24 22,20 36,15 C 46,11 48.5,5 50,2 C 51.5,5 54,11 64,15 C 78,20 96,24 96,38 L 96,100" />
                  <path d="M 6.5,100 L 6.5,39 C 6.5,25.5 24,21.5 37.5,16.5 C 47,12.5 49,6 50,3.5 C 51,6 53,12.5 62.5,16.5 C 76,21.5 93.5,26.5 93.5,39 L 93.5,100" strokeDasharray="1.5,1.5" strokeWidth="0.3" />
                </svg>
              </div>

              {/* 3D Double Palace Doors in Burgundy Velvet + Wood Grain Texture */}
              <div className="absolute inset-0 flex door-preserve-3d z-10 pointer-events-none">
                
                {/* Left Palace Door 3D Box Panel (hinged to left center) */}
                <div
                  ref={leftDoorRef}
                  style={{ transformOrigin: "left center", willChange: "transform", transform: "rotateY(0deg)" }}
                  className="w-1/2 h-full door-preserve-3d relative pointer-events-none shadow-2xl"
                >
                  <div className="door-3d-box">
                    {/* Front Velvet Face */}
                    <div className="door-face-front burgundy-velvet-wood-door border-r border-[#D4AF37]/50 shadow-2xl flex items-center justify-end overflow-hidden">
                      
                      {/* Glossy specular reflection glare highlight */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.07] pointer-events-none z-10" />
                      
                      {/* Vertical side rim lights */}
                      <div className="absolute inset-y-0 right-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#FFF8ED]/35 to-transparent pointer-events-none z-15" />
                      <div className="absolute inset-y-0 left-0 w-[1.5px] bg-gradient-to-b from-[#FFF8ED]/15 via-[#FFF8ED]/30 to-[#FFF8ED]/15 pointer-events-none z-15" />

                      {/* Gold metallic double outer border contour (Beveled feel) */}
                      <div className="absolute inset-4 border-[3px] border-[#D4AF37] rounded-l-[24px] pointer-events-none shadow-[inset_0_0_12px_rgba(0,0,0,0.6)]" />
                      <div className="absolute inset-[20px] border border-dashed border-[#D4AF37]/45 rounded-l-[20px] pointer-events-none" />
                      
                      {/* Deep Center Seam Crease Shadow */}
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/90 to-transparent pointer-events-none z-10" />

                      {/* DETAILED ISLAMIC ARABESQUE CARVINGS SVG with gold offset shadow emboss */}
                      <svg className="absolute inset-0 w-full h-full text-[#D4AF37]/35 stroke-current fill-none pointer-events-none stroke-[0.8]" viewBox="0 0 100 200" preserveAspectRatio="none" style={{ filter: "drop-shadow(0.5px 0.5px 0px rgba(255,255,255,0.22)) drop-shadow(-0.5px -0.5px 0px rgba(0,0,0,0.65))" }}>
                        {/* Islamic Pointed Mihrab Arch Frame using sharp pointed ogee curves */}
                        <path d="M 8,200 L 8,42 C 8,24 26,20 38,15 C 46,11 48.5,5 50,2 L 50,200" strokeWidth="1.2" />
                        <path d="M 12,200 L 12,43 C 12,27.5 28.5,23.5 39,18.5 C 46.5,14.5 48.5,8 50,5 L 50,200" strokeDasharray="2,2" strokeWidth="0.5" />
                        
                        {/* 8-Pointed Islamic Star (Girih Medallion) in panel center */}
                        <g transform="translate(48, 70) scale(0.24)">
                          <path d="M 0,-50 L 15,-15 L 50,0 L 15,15 L 0,50 L -15,15 L -50,0 L -15,-15 Z M 0,-50 L 35,-35 L 50,0 L 35,35 L 0,50 L -35,35 L -50,0 L -35,-35 Z" strokeWidth="2.5" />
                          <circle cx="0" cy="0" r="10" strokeWidth="1.5" />
                          <path d="M -25,-25 L 25,25 M -25,25 L 25,-25 M 0,-35 L 0,35 M -35,0 L 35,0" strokeWidth="1" strokeDasharray="2,2" />
                        </g>

                        {/* Arabesque floral corner swirls */}
                        <path d="M 8,42 C 16,36 28,42 22,54 C 18,62 10,58 14,50" />
                        <path d="M 8,90 C 20,85 30,95 24,108 C 18,116 10,110 14,102" strokeDasharray="3,3" />
                        <path d="M 8,140 C 16,134 28,140 22,152 C 18,160 10,156 14,148" />

                        {/* Top corner arches */}
                        <path d="M 8,42 Q 24,30 50,30" strokeWidth="0.5" />
                      </svg>
                      
                    </div>
                    {/* Back Face */}
                    <div className="door-face-back burgundy-velvet-wood-door border-l border-black" />
                    {/* 128px Side Thickness Face with Gold Corners */}
                    <div className="door-face-edge-right burgundy-velvet-wood-door border-l border-r border-black/40" />
                  </div>
                </div>

                {/* Right Palace Door 3D Box Panel (hinged to right center) */}
                <div
                  ref={rightDoorRef}
                  style={{ transformOrigin: "right center", willChange: "transform", transform: "rotateY(0deg)" }}
                  className="w-1/2 h-full door-preserve-3d relative pointer-events-none shadow-2xl"
                >
                  <div className="door-3d-box">
                    {/* Front Velvet Face */}
                    <div className="door-face-front burgundy-velvet-wood-door border-l border-[#D4AF37]/50 shadow-2xl flex items-center justify-start overflow-hidden">
                      
                      {/* Glossy specular reflection glare highlight */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.07] pointer-events-none z-10" />
                      
                      {/* Vertical side rim lights */}
                      <div className="absolute inset-y-0 left-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#FFF8ED]/35 to-transparent pointer-events-none z-15" />
                      <div className="absolute inset-y-0 right-0 w-[1.5px] bg-gradient-to-b from-[#FFF8ED]/15 via-[#FFF8ED]/30 to-[#FFF8ED]/15 pointer-events-none z-15" />

                      {/* Gold metallic double outer border contour (Beveled feel) */}
                      <div className="absolute inset-4 border-[3px] border-[#D4AF37] rounded-r-[24px] pointer-events-none shadow-[inset_0_0_12px_rgba(0,0,0,0.6)]" />
                      <div className="absolute inset-[20px] border border-dashed border-[#D4AF37]/45 rounded-r-[20px] pointer-events-none" />

                      {/* Deep Center Seam Crease Shadow */}
                      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/90 to-transparent pointer-events-none z-10" />

                      {/* DETAILED ISLAMIC ARABESQUE CARVINGS SVG with gold offset shadow emboss */}
                      <svg className="absolute inset-0 w-full h-full text-[#D4AF37]/35 stroke-current fill-none pointer-events-none stroke-[0.8]" viewBox="0 0 100 200" preserveAspectRatio="none" style={{ filter: "drop-shadow(0.5px 0.5px 0px rgba(255,255,255,0.22)) drop-shadow(-0.5px -0.5px 0px rgba(0,0,0,0.65))" }}>
                        {/* Islamic Pointed Mihrab Arch Frame using sharp pointed ogee curves */}
                        <path d="M 92,200 L 92,42 C 92,24 74,20 62,15 C 54,11 51.5,5 50,2 L 50,200" strokeWidth="1.2" />
                        <path d="M 88,200 L 88,43 C 88,27.5 71.5,23.5 61,18.5 C 53.5,14.5 51.5,8 50,5 L 50,200" strokeDasharray="2,2" strokeWidth="0.5" />
                        
                        {/* 8-Pointed Islamic Star (Girih Medallion) in panel center */}
                        <g transform="translate(52, 70) scale(0.24)">
                          <path d="M 0,-50 L 15,-15 L 50,0 L 15,15 L 0,50 L -15,15 L -50,0 L -15,-15 Z M 0,-50 L 35,-35 L 50,0 L 35,35 L 0,50 L -35,35 L -50,0 L -35,-35 Z" strokeWidth="2.5" />
                          <circle cx="0" cy="0" r="10" strokeWidth="1.5" />
                          <path d="M -25,-25 L 25,25 M -25,25 L 25,-25 M 0,-35 L 0,35 M -35,0 L 35,0" strokeWidth="1" strokeDasharray="2,2" />
                        </g>

                        {/* Arabesque floral corner swirls */}
                        <path d="M 92,42 C 84,36 72,42 78,54 C 82,62 90,58 86,50" />
                        <path d="M 92,90 C 80,85 70,95 76,108 C 82,116 90,110 86,102" strokeDasharray="3,3" />
                        <path d="M 92,140 C 84,134 72,140 78,152 C 82,160 90,156 86,148" />

                        {/* Top corner arches */}
                        <path d="M 92,42 Q 76,30 50,30" strokeWidth="0.5" />
                      </svg>

                    </div>
                    {/* Back Face */}
                    <div className="door-face-back burgundy-velvet-wood-door border-r border-black" />
                    {/* 128px Side Thickness Face with Gold Corners */}
                    <div className="door-face-edge-left burgundy-velvet-wood-door border-l border-r border-black/40" />
                  </div>
                </div>

              </div>

              {/* Center Royal Medallion */}
              <AnimatePresence>
                {(stage === "closed" || stage === "tapping") && (
                  <div
                    ref={medallionRef}
                    style={{ 
                      transform: "translateZ(114px)", 
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity"
                    }}
                    className="absolute inset-0 m-auto z-50 w-28 h-28 md:w-40 md:h-40 flex items-center justify-center pointer-events-auto cursor-pointer"
                  >
                    <motion.div
                      exit={{ 
                        scale: 0.45, 
                        opacity: 0,
                        transition: { duration: 0.5, ease: "easeIn" }
                      }}
                      className="w-full h-full relative flex items-center justify-center pointer-events-auto"
                    >
                      {/* Physical Click Shockwave Ripple Ring */}
                      {stage === "tapping" && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 1, filter: "blur(0px)" }}
                          animate={{ scale: 3.5, opacity: 0, filter: "blur(6px)" }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="absolute w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-[#FFF8ED] shadow-[0_0_30px_#D4AF37,0_0_60px_#D4AF37] pointer-events-none z-50"
                        />
                      )}

                      <motion.button
                        onClick={handleMedallionTap}
                        whileHover={{ scale: 1.06 }}
                        animate={stage === "closed" ? {
                          scale: [1, 1.03, 1],
                        } : {}}
                        transition={{
                          duration: 2.0, // Breathing pulse every 2s
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-full h-full rounded-full relative flex items-center justify-center cursor-pointer select-none group focus:outline-none bg-transparent border-none pointer-events-auto"
                      >
                        {/* 1. Breathing Glow Pulse (Radial Halo) */}
                        <motion.div
                          animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.25, 0.55, 0.25]
                          }}
                          transition={{
                            duration: 2.0, // breathing glow every 2s
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-[-14px] rounded-full bg-gradient-to-r from-[#D4AF37]/15 to-[#6D0F2A]/10 blur-xl pointer-events-none z-0"
                        />

                        {/* 2. Heavy Royal Medallion Body (Thick Gold Ring with metallic border) */}
                        <div className="absolute inset-0 rounded-full p-[5px] bg-gradient-to-tr from-[#BF953F] via-[#FCF6BA] to-[#B38728] shadow-[0_25px_65px_rgba(29,3,8,0.95),inset_0_2px_3px_rgba(255,255,255,0.7)] z-10 flex items-center justify-center">
                          
                          {/* Fine inner gold bevel ring */}
                          <div className="absolute inset-[3px] rounded-full border-[1.2px] border-[#FFF8ED]/35 pointer-events-none" />

                          {/* 3. Embossed Burgundy Enamel Center Panel */}
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#5C0C22] via-[#4A081B] to-[#20030B] relative overflow-hidden flex flex-col items-center justify-center text-center p-2 md:p-4 shadow-[inset_0_5px_15px_rgba(0,0,0,0.95)]">
                            
                            {/* Lacquered beveled gloss glare reflection */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08] pointer-events-none z-10" />

                            {/* Inner gold circular stamp border */}
                            <div className="absolute inset-[5px] rounded-full border border-[#D4AF37]/25 pointer-events-none z-10" />

                            {/* 4. Elegant Gold Monogram F&H at Top */}
                            <div className="text-[#FFF8ED] drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] font-cormorant text-[1.0rem] md:text-[1.35rem] font-bold tracking-wider leading-none z-10 pointer-events-none mt-1">
                              F&H
                            </div>
                            
                            {/* Fine Gold stamped flourish line */}
                            <div className="w-4 md:w-5 h-[0.8px] bg-[#D4AF37]/45 my-1.0 md:my-1.5 relative z-10 pointer-events-none">
                              <div className="absolute inset-0 m-auto w-0.5 h-0.5 rounded-full bg-[#D4AF37]" />
                            </div>

                            {/* 5. Clear Readable Text "TAP TO CONTINUE" */}
                            <span className="font-cormorant text-[7px] md:text-[8.5px] font-bold tracking-[0.2em] text-[#FFF8ED]/90 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.8)] leading-tight max-w-[75px] md:max-w-[90px] z-10 select-none uppercase">
                              {stage === "closed" && "Tap to Continue"}
                              {stage === "tapping" && "Unlocked"}
                            </span>

                            {/* 6. Subtle Gold Shimmer Sweep (Loops automatically every 4-5 seconds) */}
                            <motion.div 
                              animate={{
                                left: ["-100%", "200%"],
                              }}
                              transition={{
                                duration: 2.2,
                                repeat: Infinity,
                                repeatDelay: 3.8, // plays every 6 seconds total cycle
                                ease: "easeInOut"
                              }}
                              className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-[#FFF8ED]/35 to-transparent blur-[3px] -skew-x-[25deg] pointer-events-none z-20" 
                            />
                            
                          </div>
                        </div>

                        {/* 7. Orbiting Gold Sparks around Seal (Luxury guide) */}
                        {stage === "closed" && Array.from({ length: 4 }).map((_, idx) => (
                          <motion.div
                            key={idx}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4 + idx * 0.8, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-8px] pointer-events-none z-20"
                          >
                            <div 
                              className="w-1.5 h-1.5 rounded-full bg-[#FFF8ED] shadow-[0_0_6px_#D4AF37,0_0_12px_#D4AF37]" 
                              style={{ 
                                position: "absolute",
                                left: "50%",
                                top: "-4px",
                                transform: `translateX(${(isMobile ? 50 : 70) + idx * 3}px)`
                              }}
                            />
                          </motion.div>
                        ))}

                      </motion.button>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

            </div>

          </motion.div>
        </div>
      )}
    </div>
  );
}

// Flicker Lantern Component
function Lantern({ position }) {
  return (
    <div className={`w-8 h-16 flex flex-col items-center text-[#D4AF37]/55 relative ${position === "left" ? "rotate-[5deg]" : "-rotate-[5deg]"}`}>
      {/* Hanging rope */}
      <div className="w-[1.5px] h-6 bg-[#D4AF37]/40" />
      {/* Lantern Frame */}
      <div className="w-6 h-8 border border-[#D4AF37]/65 rounded-t-md relative flex items-center justify-center bg-[#24140E]/80">
        
        {/* Soft glowing ambient radial light cone behind lantern */}
        <div className="absolute w-36 h-36 bg-[#D4AF37]/12 rounded-full blur-2xl -translate-y-4 z-0 pointer-events-none" />

        {/* Glowing Fire Candle with flickering opacity loop */}
        <motion.div
          animate={{
            opacity: [0.6, 0.95, 0.7, 0.9, 0.6],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-3.5 h-3.5 bg-[#FFF0D6] rounded-full blur-[1.5px] shadow-[0_0_8px_#FFF0D6,0_0_15px_#D4AF37] z-10"
        />
        
        {/* Bottom metal support */}
        <div className="absolute bottom-0 w-full h-1 bg-[#D4AF37]/60 z-10" />
      </div>
      {/* Bottom ring ornament */}
      <div className="w-1.5 h-1.5 border-b border-[#D4AF37]/55 rounded-full mt-[2px]" />
    </div>
  );
}
