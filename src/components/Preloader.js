"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { playChime } from "@/utils/audioSynth";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [particles, setParticles] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Generate drift sparks client-side
    const generated = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1.5, // 1.5px to 3.5px
      delay: Math.random() * 3,
      duration: Math.random() * 5 + 4,
    }));
    setParticles(generated);

    // Organic loading timing: Ease-out cubic progress curve
    // Fast initial surge, slows down toward the end to build anticipation, then finishes
    const duration = 3500; // 3.5 seconds
    const intervalTime = 35;
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const t = currentStep / totalSteps; // 0 to 1
      
      // easeOutCubic: starts quickly, slows down exponentially as it approaches 1
      const easedT = 1 - Math.pow(1 - t, 3.5);
      const nextProgress = Math.min(Math.round(easedT * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        // Play spiritual chime chord on completion
        playChime();
        onComplete();
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // SVG Progress Arc Math
  const radius = 64;
  const stroke = 2.5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Trigonometrical lead-edge coordinates for the progress spark
  // Progress starts at -90deg (top center) and sweeps clockwise 360deg
  const angle = (progress / 100) * 360 - 90;
  const radians = (angle * Math.PI) / 180;
  const sparkX = 64 + normalizedRadius * Math.cos(radians);
  const sparkY = 64 + normalizedRadius * Math.sin(radians);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        filter: "blur(25px)",
        scale: 1.12,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#4A081B] overflow-hidden"
    >
      {/* Moving Golden Rays backdrop (hydration guarded, rounded to 4 decimals) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 z-0 flex items-center justify-center">
        <svg className="w-[180%] h-[180%] text-[#D4AF37]/5 moving-rays-bg" viewBox="0 0 100 100" preserveAspectRatio="none">
          {mounted && Array.from({ length: 18 }).map((_, idx) => {
            const rayAngle = idx * 20;
            const x2Val = Number((50 + 80 * Math.cos((rayAngle * Math.PI) / 180)).toFixed(4));
            const y2Val = Number((50 + 80 * Math.sin((rayAngle * Math.PI) / 180)).toFixed(4));
            return (
              <line
                key={idx}
                x1="50"
                y1="50"
                x2={x2Val}
                y2={y2Val}
                stroke="currentColor"
                strokeWidth="0.8"
              />
            );
          })}
        </svg>
      </div>

      {/* Cinematic Fog & Vignette Shadows */}
      <div className="absolute inset-0 pointer-events-none vignette-overlay z-10" />

      {/* Drifting Spark Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "105vh", opacity: 0 }}
            animate={{
              y: "-10vh",
              opacity: [0, 0.75, 0.75, 0],
              x: ["0px", `${Math.random() * 50 - 25}px`],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
            className="absolute rounded-full bg-gradient-to-b from-[#FFF0D6] to-[#D4AF37]"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 6px rgba(212, 175, 55, 0.5)",
            }}
          />
        ))}
      </div>

      {/* Central Monogram and Eased Circular Loader */}
      <div className="relative z-20 flex flex-col items-center select-none">
        
        {/* Progress Circular Casing */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-10">
          
          {/* Rotating Circular Progress Ring SVG */}
          <svg className="absolute w-full h-full transform -rotate-90 z-20" viewBox="0 0 128 128">
            {/* Background thin track */}
            <circle
              className="text-[#D4AF37]/5"
              stroke="currentColor"
              fill="transparent"
              strokeWidth={1}
              r={normalizedRadius}
              cx={64}
              cy={64}
            />
            {/* Shimmer progress arc */}
            <circle
              className="text-[#D4AF37]"
              stroke="currentColor"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + " " + circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={64}
              cy={64}
              style={{
                filter: "drop-shadow(0 0 5px rgba(212,175,55,0.4))",
                transition: "stroke-dashoffset 0.1s linear"
              }}
            />
            {/* Orbiting Spark (glides exactly at the leading edge of progress) */}
            {mounted && progress > 0 && (
              <circle
                cx={sparkX}
                cy={sparkY}
                r={2}
                fill="#FFF0D6"
                style={{
                  filter: "drop-shadow(0 0 4px #D4AF37) drop-shadow(0 0 8px #D4AF37)",
                  transition: "cx 0.1s linear, cy 0.1s linear"
                }}
              />
            )}
          </svg>

          {/* Logo / Monogram inside circular loader */}
          <motion.div
            initial={{ opacity: 0, scale: 0.72, filter: "blur(12px)" }}
            animate={{ 
              opacity: 1, 
              scale: 1.0, 
              filter: "blur(0px)",
              transition: { duration: 1.6, delay: 0.3, ease: [0.25, 1, 0.5, 1] }
            }}
            className="flex flex-col items-center justify-center font-cormorant z-10"
          >
            {/* Soft inner glow backplate */}
            <div className="absolute w-28 h-28 bg-[#D4AF37]/5 rounded-full blur-xl pointer-events-none z-0" />

            {/* Monogram letters in shimmering gold */}
            <h1 className="text-4xl md:text-5xl font-semibold tracking-wider gold-shimmer-text font-cormorant relative z-10">
              F & H
            </h1>
            
            <span className="text-[9px] uppercase tracking-[0.45em] text-[#D4AF37]/75 mt-[2px] font-bold relative z-10">
              Nikah
            </span>
          </motion.div>
        </div>

        {/* Loading text with dynamic breathing spacing */}
        <motion.p
          animate={{
            opacity: [0.55, 1, 0.55],
            letterSpacing: ["0.32em", "0.36em", "0.32em"],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="font-cormorant text-xs uppercase text-[#F7E8C8] tracking-[0.32em] font-medium"
        >
          Loading Your Invitation
        </motion.p>
        
        {/* Progress Percentage */}
        <span className="font-inter text-[8px] tracking-[0.25em] text-[#D4AF37]/50 mt-3.5 uppercase font-bold">
          {progress}%
        </span>
      </div>


    </motion.div>
  );
}
