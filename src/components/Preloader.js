"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { playChime } from "@/utils/audioSynth";
import { getGlobalAudio } from "@/components/MusicToggle";

// Corner Gold Ornament subcomponent matching invitation card style
const PreloaderCornerOrnament = ({ position }) => {
  const classMap = {
    "top-left": "top-6 left-6 rotate-0",
    "top-right": "top-6 right-6 rotate-90",
    "bottom-left": "bottom-6 left-6 -rotate-90",
    "bottom-right": "bottom-6 right-6 rotate-180",
  };
  return (
    <div className={`absolute w-8 h-8 md:w-10 md:h-10 text-[#D4AF37]/40 pointer-events-none z-10 ${classMap[position]}`}>
      <svg className="w-full h-full" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M 0,0 L 40,0 M 0,0 L 0,40" />
        <path d="M 6,6 C 12,6 16,12 16,16 C 16,20 20,24 24,24" strokeDasharray="1.5,1.5" />
        <circle cx="6" cy="6" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
};

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Asynchronously preload critical assets with fallback timeout
    const preloadAssets = async () => {
      try {
        getGlobalAudio(); // Pre-warm audio instance and buffer
        const fontPromise = typeof document !== "undefined" && document.fonts
          ? document.fonts.ready
          : Promise.resolve();

        const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 800));

        const imageUrls = ["/map_preview.png"];
        const imagePromises = imageUrls.map((url) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = resolve;
          });
        });

        await Promise.all([
          Promise.race([fontPromise, timeoutPromise]),
          ...imagePromises
        ]);
      } catch (err) {
        console.warn("Asset preloading encountered issues:", err);
      }
    };

    preloadAssets().then(() => {
      setAssetsReady(true);
    });

    // Elegant, smooth cubic ease-out loading curve (2.2s duration)
    const duration = 2200;
    const intervalTime = 40;
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const t = currentStep / totalSteps;
      const easedT = 1 - Math.pow(1 - t, 3.2);
      const nextProgress = Math.min(Math.round(easedT * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        playChime();
        // Short intentional delay at 100% for a polished completion feel
        setTimeout(() => {
          setIsFinished(true);
        }, 350);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Complete preloader when both progress and assets resolve
  useEffect(() => {
    if (isFinished && assetsReady) {
      onComplete();
    }
  }, [isFinished, assetsReady, onComplete]);

  // SVG Progress Arc Math
  const radius = 72;
  const stroke = 2.5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Orbiting spark lead-edge coordinates
  const angle = (progress / 100) * 360 - 90;
  const radians = (angle * Math.PI) / 180;
  const sparkX = 72 + normalizedRadius * Math.cos(radians);
  const sparkY = 72 + normalizedRadius * Math.sin(radians);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.03,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F6EBDD] overflow-hidden select-none"
    >
      {/* 1. Cream Light Background with Faint Golden Islamic Diamond & Circle Motif */}
      <div 
        className="absolute inset-0 opacity-[0.055] pointer-events-none z-0" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`, 
          backgroundSize: "60px 60px" 
        }} 
      />

      {/* 2. Soft Ambient Radial Vignette & Central Gold Warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,248,237,0.85)_0%,rgba(246,235,221,0.95)_60%,rgba(235,218,198,1)_100%)] pointer-events-none z-0" />

      {/* 3. Luxury Gold Corner Frame Ornaments */}
      <PreloaderCornerOrnament position="top-left" />
      <PreloaderCornerOrnament position="top-right" />
      <PreloaderCornerOrnament position="bottom-left" />
      <PreloaderCornerOrnament position="bottom-right" />

      {/* 4. Central Visual Focal Point: Dark Maroon Seal & Circular Progress Arc */}
      <div className="relative z-20 flex flex-col items-center">
        
        {/* Circular Casing for Progress Arc and Dark Maroon Medallion */}
        <div className="relative w-52 h-52 md:w-60 md:h-60 flex items-center justify-center mb-8">
          
          {/* Outer Soft Gold Ambient Glow */}
          <div className="absolute w-44 h-44 md:w-48 md:h-48 rounded-full bg-[#D4AF37]/15 blur-2xl pointer-events-none z-0" />

          {/* Rotating Gold Progress Ring Arc */}
          <svg className="absolute w-full h-full transform -rotate-90 z-20" viewBox="0 0 144 144">
            {/* Background track */}
            <circle
              className="text-[#D4AF37]/15"
              stroke="currentColor"
              fill="transparent"
              strokeWidth={1.5}
              r={normalizedRadius}
              cx={72}
              cy={72}
            />
            {/* Active Gold Progress Arc */}
            <circle
              className="text-[#D4AF37]"
              stroke="currentColor"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + " " + circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={72}
              cy={72}
              style={{
                filter: "drop-shadow(0 0 6px rgba(212,175,55,0.5))",
                transition: "stroke-dashoffset 0.1s linear"
              }}
            />
            {/* Leading Edge Spark Node */}
            {mounted && progress > 0 && (
              <circle
                cx={sparkX}
                cy={sparkY}
                r={2.5}
                fill="#FFF8ED"
                style={{
                  filter: "drop-shadow(0 0 5px #D4AF37) drop-shadow(0 0 10px #D4AF37)",
                  transition: "cx 0.1s linear, cy 0.1s linear"
                }}
              />
            )}
          </svg>

          {/* Focal Point: Luxury Dark Maroon Enamel Seal Medallion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ 
              opacity: 1, 
              scale: 1.0, 
              transition: { duration: 1.0, ease: [0.25, 1, 0.5, 1] }
            }}
            className="w-36 h-36 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#4A081B] via-[#310411] to-[#1F000A] p-[4px] shadow-[0_12px_32px_rgba(74,8,27,0.35),0_4px_12px_rgba(0,0,0,0.25)] flex items-center justify-center relative z-10"
          >
            {/* Double Gold Ring Emboss */}
            <div className="w-full h-full rounded-full border-[1.5px] border-[#FCF6BA]/60 p-[3px] flex items-center justify-center relative overflow-hidden">
              <div className="w-full h-full rounded-full border border-[#D4AF37]/40 flex flex-col items-center justify-center text-center p-2 relative">
                
                {/* Radial Glaze Specular Highlight */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.2)_0%,transparent_60%)] pointer-events-none z-10" />

                {/* Monogram letters in shimmering gold script */}
                <h1 className="text-3xl md:text-4xl font-bold tracking-wider gold-shimmer-text font-cormorant relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  F & H
                </h1>
                
                {/* Fine gold divider line */}
                <div className="w-6 h-[0.5px] bg-[#D4AF37]/50 my-1 relative z-10">
                  <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-[#D4AF37]" />
                </div>

                <span className="text-[7.5px] md:text-[8.5px] uppercase tracking-[0.35em] text-[#FFF8ED]/80 font-bold font-cormorant relative z-10">
                  Nikah Ceremony
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Loading status caption */}
        <motion.p
          animate={{
            opacity: [0.65, 1, 0.65],
            letterSpacing: ["0.32em", "0.36em", "0.32em"],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="font-cormorant text-xs md:text-sm uppercase text-[#4A081B] tracking-[0.32em] font-semibold mb-1"
        >
          Loading Your Invitation
        </motion.p>
        
        {/* Progress Percentage */}
        <span className="font-inter text-[9px] tracking-[0.25em] text-[#856124] uppercase font-bold">
          {progress}%
        </span>
      </div>
    </motion.div>
  );
}
