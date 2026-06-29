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

export default function GrandOpening({ isOpen, onOpen, children }) {
  const [stage, setStage] = useState("closed"); // "closed" | "tapping" | "swinging" | "opened"
  const [showDoorsOverlay, setShowDoorsOverlay] = useState(true);
  const [ambientWind, setAmbientWind] = useState(null);
  const [particles, setParticles] = useState([]);
  const [waxParticles, setWaxParticles] = useState([]);
  const [idleParticles, setIdleParticles] = useState([]);
  const [scaleFactor, setScaleFactor] = useState(4.5);

  // DOM Refs for high-performance direct GSAP animations
  const cameraContainerRef = useRef(null);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const medallionRef = useRef(null);
  const lightLeakRef = useRef(null);
  const godRaysRef = useRef(null);

  useEffect(() => {
    // Dynamic scale factor calculation client-side to prevent hydration mismatch
    if (typeof window !== "undefined") {
      setScaleFactor(window.innerWidth < 768 ? 3.5 : 4.5);
    }

    // Generate organic rose petals and gold sparks for the portal opening
    const generated = Array.from({ length: 30 }).map((_, i) => ({
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

    // Generate slow drifting ambient dust and sparks for the idle state (in front of closed doors)
    const generatedIdle = Array.from({ length: 22 }).map((_, i) => ({
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
    const generated = Array.from({ length: 25 }).map((_, i) => ({
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
    if (stage !== "closed") return;

    setStage("tapping");
    playMetallicTap();
    triggerWaxMelting();

    // Create a high-performance GSAP timeline to sequence the entire opening experience
    const tl = gsap.timeline({
      onComplete: () => {
        setStage("opened");
        onOpen(); // Trigger page state update to mount scroll sections after doors overlay fully resolves
        setShowDoorsOverlay(false);
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
      opacity: 0,
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
          
          <div className="w-full h-full relative door-preserve-3d flex items-center justify-center">

            {/* PITCH BLACK ROOM INTERIOR BACKGROUND */}
            <div className="absolute inset-0 bg-[#2D040F] z-0 pointer-events-none" />

            {/* VOLUMETRIC DYNAMIC LIGHT REVEAL SYSTEM */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
              {/* Vertical Light Leak Seam */}
              <div 
                ref={lightLeakRef}
                className="absolute inset-y-0 bg-gradient-to-r from-transparent via-[#FFF8ED] to-transparent z-10 w-24 opacity-5"
                style={{ 
                  willChange: "transform, opacity",
                  transform: "scaleX(1)",
                  filter: "blur(20px)" // Static blur to prevent dynamic recalculation lag
                }}
              />
              
              {/* God Rays Volumetric Cone */}
              <div 
                ref={godRaysRef}
                className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-brand-gold/30 via-[#FFF8ED]/95 to-brand-gold/20 rounded-full z-10 opacity-0 pointer-events-none"
                style={{
                  willChange: "transform, opacity",
                  transform: "scale(0.8)",
                  filter: "blur(60px)" // Static blur to prevent dynamic recalculation lag
                }}
              />
            </div>

            {/* Volumetric Floating Dust Particles & Sparks behind doors (active after click) */}
            {stage !== "closed" && (
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
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
                      // Crimson Burgundy Rose Petal
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
                      // Gold Shimmer Spark
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

            {/* Grand Islamic Palace Arch Frame */}
            <div className="absolute inset-x-2.5 inset-y-6 md:inset-x-16 md:inset-y-16 border-[1.5px] border-[#D4AF37]/25 rounded-[160px_160px_0_0] pointer-events-none z-35 flex items-center justify-center">
              <div className="absolute inset-[3px] border border-dashed border-[#D4AF37]/10 rounded-[156px_156px_0_0]" />
              
              {/* Islamic Pointed Arch Path Overlay */}
              <svg className="absolute inset-0 w-full h-full stroke-[#D4AF37]/35 fill-none pointer-events-none stroke-[0.6]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 4,100 L 4,32 C 4,10 32,2 50,2 C 68,2 96,10 96,32 L 96,100" />
                <path d="M 6.5,100 L 6.5,33 C 6.5,12 34,4.5 50,4.5 C 66,4.5 93.5,12 93.5,33 L 93.5,100" strokeDasharray="1.5,1.5" strokeWidth="0.3" />
              </svg>
            </div>

            {/* Palace Lanterns Left and Right */}
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

            {/* 3D Double Palace Doors in Burgundy Velvet + Wood Grain Texture */}
            <div className="absolute inset-0 flex door-preserve-3d z-10 pointer-events-none">
              
              {/* Left Palace Door 3D Box Panel (transform-origin hinged to left center) */}
              <div
                ref={leftDoorRef}
                style={{ transformOrigin: "left center", willChange: "transform", transform: "rotateY(0deg)" }}
                className="w-1/2 h-full door-preserve-3d relative pointer-events-none shadow-2xl"
              >
                <div className="door-3d-box">
                  {/* Front Velvet Face */}
                  <div className="door-face-front burgundy-velvet-wood-door border-r border-[#D4AF37]/50 shadow-2xl flex items-center justify-end overflow-hidden">
                    {/* Gold metallic double outer border contour (Beveled feel) */}
                    <div className="absolute inset-4 border-[3px] border-[#D4AF37] rounded-l-[24px] pointer-events-none shadow-[inset_0_0_12px_rgba(0,0,0,0.6)]" />
                    <div className="absolute inset-[20px] border border-dashed border-[#D4AF37]/45 rounded-l-[20px] pointer-events-none" />
                    
                    {/* Deep Center Seam Crease Shadow */}
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/90 to-transparent pointer-events-none z-10" />

                    {/* DETAILED ISLAMIC ARABESQUE CARVINGS SVG */}
                    <svg className="absolute inset-0 w-full h-full text-[#D4AF37]/35 stroke-current fill-none pointer-events-none stroke-[0.8]" viewBox="0 0 100 200" preserveAspectRatio="none">
                      {/* Islamic Pointed Mihrab Arch Frame */}
                      <path d="M 8,200 L 8,36 C 8,16 42,6 50,6 L 50,200" strokeWidth="1.2" />
                      <path d="M 12,200 L 12,38 C 12,20 44,10 50,10 L 50,200" strokeDasharray="2,2" strokeWidth="0.5" />
                      
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
                      <path d="M 8,36 Q 24,24 50,24" strokeWidth="0.5" />
                    </svg>
                    
                  </div>
                  {/* Back Face */}
                  <div className="door-face-back burgundy-velvet-wood-door border-l border-black" />
                  {/* 128px Side Thickness Face with Gold Corners */}
                  <div className="door-face-edge-right burgundy-velvet-wood-door border-l border-r border-black/40" />
                </div>
              </div>

              {/* Right Palace Door 3D Box Panel (transform-origin hinged to right center) */}
              <div
                ref={rightDoorRef}
                style={{ transformOrigin: "right center", willChange: "transform", transform: "rotateY(0deg)" }}
                className="w-1/2 h-full door-preserve-3d relative pointer-events-none shadow-2xl"
              >
                <div className="door-3d-box">
                  {/* Front Velvet Face */}
                  <div className="door-face-front burgundy-velvet-wood-door border-l border-[#D4AF37]/50 shadow-2xl flex items-center justify-start overflow-hidden">
                    {/* Gold metallic double outer border contour (Beveled feel) */}
                    <div className="absolute inset-4 border-[3px] border-[#D4AF37] rounded-r-[24px] pointer-events-none shadow-[inset_0_0_12px_rgba(0,0,0,0.6)]" />
                    <div className="absolute inset-[20px] border border-dashed border-[#D4AF37]/45 rounded-r-[20px] pointer-events-none" />

                    {/* Deep Center Seam Crease Shadow */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/90 to-transparent pointer-events-none z-10" />

                    {/* DETAILED ISLAMIC ARABESQUE CARVINGS SVG */}
                    <svg className="absolute inset-0 w-full h-full text-[#D4AF37]/35 stroke-current fill-none pointer-events-none stroke-[0.8]" viewBox="0 0 100 200" preserveAspectRatio="none">
                      {/* Islamic Pointed Mihrab Arch Frame */}
                      <path d="M 92,200 L 92,36 C 92,16 58,6 50,6 L 50,200" strokeWidth="1.2" />
                      <path d="M 88,200 L 88,38 C 88,20 56,10 50,10 L 50,200" strokeDasharray="2,2" strokeWidth="0.5" />
                      
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
                      <path d="M 92,36 Q 76,24 50,24" strokeWidth="0.5" />
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
                  onClick={handleMedallionTap}
                  style={{ 
                    transform: "translateZ(114px)", 
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity"
                  }}
                  className="absolute inset-0 m-auto z-50 w-32 h-32 md:w-48 md:h-48 flex items-center justify-center pointer-events-auto cursor-pointer"
                >
                  <motion.div
                    exit={{ 
                      scale: 0.45, 
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeIn" }
                    }}
                    className="w-full h-full relative flex items-center justify-center pointer-events-auto"
                  >
                    {/* Physical Click Ripple Wave */}
                    {stage === "tapping" && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        transition={{ duration: 0.75 }}
                        className="absolute inset-0 rounded-full border-2 border-[#D4AF37] z-0"
                      />
                    )}

                    <motion.button
                      onClick={handleMedallionTap}
                      whileHover={{ scale: 1.05 }}
                      animate={stage === "closed" ? {
                        scale: [1, 1.03, 1],
                      } : {}}
                      transition={{
                        duration: 3.5,
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
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-[-14px] rounded-full bg-gradient-to-r from-[#D4AF37]/12 to-[#6D0F2A]/8 blur-xl pointer-events-none z-0"
                      />

                      {/* 2. Heavy Royal Medallion Body (Outer Gold Frame with soft bevel highlights) */}
                      <div className="absolute inset-0 rounded-full p-[5px] bg-gradient-to-tr from-[#856124] via-[#D4AF37] to-[#FFF8ED] shadow-[0_25px_65px_rgba(29,3,8,0.95)] z-10 flex items-center justify-center">
                        
                        {/* Fine inner gold bevel ring */}
                        <div className="absolute inset-[3px] rounded-full border-[1.2px] border-[#FFF8ED]/35 pointer-events-none" />

                        {/* 3. Embossed Burgundy Enamel Center Panel */}
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#5C0C22] via-[#4A081B] to-[#20030B] relative overflow-hidden flex flex-col items-center justify-center text-center p-2 md:p-4 shadow-[inset_0_5px_15px_rgba(0,0,0,0.95)]">
                          
                          {/* Inner gold circular stamp border */}
                          <div className="absolute inset-[5px] rounded-full border border-[#D4AF37]/25 pointer-events-none z-10" />

                          {/* 4. Elegant Gold Monogram F&H at Top */}
                          <div className="text-[#FFF8ED] drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] font-cormorant text-[1.1rem] md:text-[1.55rem] font-bold tracking-wider leading-none z-10 pointer-events-none mt-1">
                            F&H
                          </div>
                          
                          {/* Fine Gold stamped flourish line */}
                          <div className="w-5 md:w-6 h-[0.8px] bg-[#D4AF37]/45 my-1.5 md:my-2 relative z-10 pointer-events-none">
                            <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-[#D4AF37]" />
                          </div>

                          {/* 5. Clear Readable Text "TAP TO CONTINUE" */}
                          <span className="font-cormorant text-[7.5px] md:text-[9.5px] font-bold tracking-[0.2em] text-[#FFF8ED]/90 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.8)] leading-tight max-w-[85px] md:max-w-[100px] z-10 select-none uppercase">
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

                      {/* 7. Orbiting Gold Spark on Rim (Idle Visual Guide) */}
                      {stage === "closed" && (
                        <div className="absolute inset-[-4px] pointer-events-none z-30 orbiting-spark-el">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FFF8ED] shadow-[0_0_8px_#D4AF37,0_0_15px_#D4AF37]" />
                        </div>
                      )}

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
