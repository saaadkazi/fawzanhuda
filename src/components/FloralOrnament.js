"use client";

import { motion } from "framer-motion";

export default function FloralOrnament({ position = "top-left", opacity = 0.45 }) {
  // Apply rotation classes based on target corner position
  const rotationClass = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 scale-x-[-1]",
    "bottom-left": "bottom-0 left-0 scale-y-[-1]",
    "bottom-right": "bottom-0 right-0 scale-x-[-1] scale-y-[-1]",
  }[position];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: opacity, scale: 1 }}
      transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
      className={`absolute w-12 h-12 md:w-16 md:h-16 pointer-events-none z-10 p-1 ${rotationClass}`}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Burgundy Rose Gradients */}
          <linearGradient id="rose-grad-deep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A081B" />
            <stop offset="100%" stopColor="#2D040F" />
          </linearGradient>
          <linearGradient id="rose-grad-royal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D0F2A" />
            <stop offset="100%" stopColor="#4A081B" />
          </linearGradient>
          {/* Luxury Gold Gradients */}
          <linearGradient id="gold-leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8C76A" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B88E44" />
          </linearGradient>
        </defs>

        {/* --- Gold Leaves Sprays --- */}
        {/* Leaf 1 */}
        <path
          d="M 12 12 Q 35 25 55 18 C 45 35 25 35 12 12 Z"
          fill="url(#gold-leaf-grad)"
          fillOpacity="0.8"
          stroke="#D4AF37"
          strokeWidth="0.3"
        />
        {/* Leaf 2 */}
        <path
          d="M 12 12 Q 25 35 18 55 C 35 45 35 25 12 12 Z"
          fill="url(#gold-leaf-grad)"
          fillOpacity="0.6"
          stroke="#D4AF37"
          strokeWidth="0.3"
        />
        {/* Leaf 3 (drifting) */}
        <path
          d="M 12 12 Q 40 40 42 62 C 28 58 24 38 12 12 Z"
          fill="url(#gold-leaf-grad)"
          fillOpacity="0.45"
          stroke="#D4AF37"
          strokeWidth="0.2"
        />

        {/* --- Burgundy Rose Buds --- */}
        {/* Main Rose Bud at the intersection */}
        <path
          d="M 10 10 C 18 2, 28 2, 32 10 C 36 18, 22 28, 10 10 Z"
          fill="url(#rose-grad-royal)"
          stroke="#4A081B"
          strokeWidth="0.4"
        />
        <path
          d="M 14 12 C 18 6, 24 6, 26 12 C 28 18, 20 22, 14 12 Z"
          fill="url(#rose-grad-deep)"
          stroke="#2D040F"
          strokeWidth="0.3"
        />
        
        {/* Secondary Smaller Bud */}
        <path
          d="M 6 22 C 10 18, 15 18, 16 22 C 17 26, 12 30, 6 22 Z"
          fill="url(#rose-grad-deep)"
          stroke="#4A081B"
          strokeWidth="0.3"
        />

        {/* Delicate Swirling Vines */}
        <path d="M 12 12 C 20 45, 45 42, 68 52" stroke="#D4AF37" strokeWidth="0.4" strokeLinecap="round" />
        <path d="M 12 12 C 45 20, 42 45, 52 68" stroke="#D4AF37" strokeWidth="0.4" strokeLinecap="round" />
        <circle cx="68" cy="52" r="1.2" fill="#D4AF37" />
        <circle cx="52" cy="68" r="1.2" fill="#D4AF37" />
      </svg>
    </motion.div>
  );
}
