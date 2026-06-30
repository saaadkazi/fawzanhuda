"use client";

import { useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Section curved transition divider (Countdown to Venue)
const SectionDivider = () => {
  return (
    <div className="absolute left-0 right-0 w-full h-10 pointer-events-none z-10 bottom-0">
      <svg className="w-full h-full text-[#FFFDF9] fill-current" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path d="M 0 100 C 300 0 700 0 1000 100 L 1000 100 Z" />
      </svg>
      <svg className="absolute inset-0 w-full h-full text-[#D4AF37]/50 fill-none pointer-events-none stroke-current" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path d="M 0 100 C 300 0 700 0 1000 100" strokeWidth="2" />
      </svg>
    </div>
  );
};

function Countdown() {
  const targetDate = new Date("2026-12-09T00:00:00").getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);
  const [bgStars, setBgStars] = useState([]);

  useEffect(() => {
    setMounted(true);

    // Generate gold stars
    const generated = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 95}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 7 + 7,
    }));
    setBgStars(generated);

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <section className="py-20 px-6 velvet-silk-bg flex flex-col items-center justify-center">
        <div className="flex gap-4">
          {["DAYS", "HOURS", "MINS", "SECS"].map((label) => (
            <div key={label} className="w-[72px] h-20 bg-brand-card/85 border border-[#D4AF37]/25 rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <section className="py-24 px-6 velvet-silk-bg relative overflow-hidden flex flex-col items-center justify-center">
      {/* Curved section transition divider at the bottom */}
      <SectionDivider />

      {/* Low-opacity repeating Islamic geometric pattern watermark */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none z-0" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`, 
             backgroundSize: "60px 60px" 
           }} />

      {/* Ambient dynamic diagonal light sweep */}
      <div className="ambient-light-sweep" />

      {/* Paper grain luxury texture overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #FFF8ED 1px, transparent 1px), radial-gradient(circle at 0 0, #FFF8ED 1px, transparent 1px)", backgroundSize: "16px 16px, 8px 8px" }} />

      {/* Slow ambient light sweep across background */}
      <motion.div
        animate={{
          x: ["-10%", "10%", "-10%"],
          y: ["-10%", "10%", "-10%"],
          opacity: [0.12, 0.25, 0.12]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-[#D4AF37]/10 to-transparent rounded-full blur-[100px] pointer-events-none z-0"
        style={{ top: "15%", left: "10%" }}
      />

      {/* Soft radial golden glow behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-brand-gold/5 via-[#FFF8ED]/10 to-brand-gold/5 rounded-full blur-[80px] pointer-events-none z-0" />

      {/* Floating gold background stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {bgStars.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "110%", opacity: 0 }}
            animate={{
              y: "-10%",
              opacity: [0, 0.6, 0.6, 0],
              x: ["0px", `${Math.random() * 40 - 20}px`],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
            className="absolute rounded-full bg-[#E8C76A] shadow-[0_0_5px_rgba(212,175,55,0.5)]"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* Heading Viewport Reveal */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(12px)", y: 25 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="text-center mb-14 relative z-10"
      >
        <span className="font-cormorant text-xs md:text-sm uppercase tracking-[0.3em] text-[#E8C76A] font-semibold flex items-center justify-center gap-1.5">
          Counting the Moments
          <motion.span 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="inline-block"
          >
            ✦
          </motion.span>
        </span>
        <h2 className="font-cormorant text-3xl md:text-4xl text-[#FFF8ED] mt-2 tracking-wide font-light">
          Until the Nikah
        </h2>
        <div className="w-12 h-[1px] bg-[#D4AF37]/60 mx-auto mt-4" />
      </motion.div>

      {/* Timer Grid Viewport Reveal */}
      <motion.div 
        initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.85, ease: "easeOut", delay: 0.15 }}
        className="flex items-center gap-2 md:gap-4 justify-center max-w-lg w-full px-4 relative z-10"
      >
        <CountdownCard value={timeLeft.days} label="Days" format={formatNumber} />
        <SeparatorColon />
        <CountdownCard value={timeLeft.hours} label="Hours" format={formatNumber} />
        <SeparatorColon />
        <CountdownCard value={timeLeft.minutes} label="Minutes" format={formatNumber} />
        <SeparatorColon />
        <CountdownCard value={timeLeft.seconds} label="Seconds" format={formatNumber} />
      </motion.div>
    </section>
  );
}

// Separator Colon with slow pulsing opacity
function SeparatorColon() {
  return (
    <motion.div 
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="flex flex-col gap-2 pb-6 text-[#E8C76A] drop-shadow-[0_0_8px_rgba(232,199,106,0.6)] font-semibold text-lg md:text-xl"
    >
      <span>•</span>
      <span>•</span>
    </motion.div>
  );
}

function CountdownCard({ value, label, format }) {
  const formattedVal = format(value);

  return (
    <div className="flex flex-col items-center flex-1 max-w-[76px] md:max-w-[88px]">
      
      {/* Clock Casing with Gold Borders (Ivory panel on dark backdrop) */}
      <div className="relative w-full h-[76px] md:h-[88px] bg-gradient-to-br from-[#FFFDF9] via-[#FFFBF5] to-[#FFF9F0] border border-[#D4AF37]/50 rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.35)] shadow-[inset_0_0_12px_rgba(212,175,55,0.05)] flex items-center justify-center overflow-hidden">
        
        {/* Double Inner Frame details */}
        <div className="absolute inset-[3px] border border-[#D4AF37]/15 rounded-xl pointer-events-none" />

        {/* Physical center-split line simulating mechanical flip clock */}
        <div className="absolute left-0 right-0 top-1/2 h-[0.5px] bg-[#D4AF37]/25 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.1)]" />
        
        {/* Shading gradients top and bottom to create physical depth */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black/[0.02] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/[0.015] to-transparent pointer-events-none" />

        {/* Rolling Number */}
        <div className="relative overflow-hidden h-10 flex items-center justify-center z-20">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={formattedVal}
              initial={{ y: 24, opacity: 0, filter: "blur(3px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -24, opacity: 0, filter: "blur(3px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-cormorant text-3xl md:text-4xl font-semibold text-[#4A081B] tracking-widest block drop-shadow-[0_0.5px_1px_rgba(255,255,255,0.7)]"
            >
              {formattedVal}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Card Label */}
      <span className="font-inter text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#FFF8ED]/75 mt-4 font-bold">
        {label}
      </span>
    </div>
  );
}

export default memo(Countdown);
