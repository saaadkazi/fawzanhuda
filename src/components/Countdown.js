"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Countdown() {
  const targetDate = new Date("2026-12-09T00:00:00").getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

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
      <section className="py-20 px-6 bg-gradient-to-b from-[#EDE3D4]/40 to-[#F6F0E8] flex flex-col items-center">
        <div className="flex gap-4">
          {["DAYS", "HOURS", "MINS", "SECS"].map((label) => (
            <div key={label} className="w-[72px] h-20 bg-brand-card/85 border border-brand-gold/15 rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#EDE3D4]/30 to-[#F6F0E8] relative overflow-hidden flex flex-col items-center justify-center">
      {/* Decorative top dividing line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
      
      {/* Background glow behind timer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[200px] bg-brand-gold/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="text-center mb-14">
        <span className="font-cormorant text-xs md:text-sm uppercase tracking-[0.3em] text-brand-gold font-semibold">
          Counting the Moments
        </span>
        <h2 className="font-cormorant text-3xl md:text-4xl text-brand-heading mt-2 tracking-wide font-light">
          Until the Nikah
        </h2>
        <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4" />
      </div>

      {/* Timer Grid with separator colons */}
      <div className="flex items-center gap-2 md:gap-4 justify-center max-w-lg w-full px-4">
        
        <CountdownCard value={timeLeft.days} label="Days" format={formatNumber} />
        
        <SeparatorColon />

        <CountdownCard value={timeLeft.hours} label="Hours" format={formatNumber} />
        
        <SeparatorColon />

        <CountdownCard value={timeLeft.minutes} label="Minutes" format={formatNumber} />
        
        <SeparatorColon />

        <CountdownCard value={timeLeft.seconds} label="Seconds" format={formatNumber} />
        
      </div>
    </section>
  );
}

// Separator Colon with slow pulsing opacity
function SeparatorColon() {
  return (
    <motion.div 
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="flex flex-col gap-2 pb-6 text-brand-gold/60 font-semibold text-lg md:text-xl"
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
      
      {/* Clock Casing with Gold Borders */}
      <div className="relative w-full h-[76px] md:h-[88px] bg-brand-card/95 backdrop-blur-sm border border-brand-gold/25 rounded-2xl luxury-shadow-card flex items-center justify-center overflow-hidden">
        
        {/* Double Inner Frame details */}
        <div className="absolute inset-[3px] border border-brand-gold/10 rounded-xl pointer-events-none" />

        {/* Physical center-split line simulating mechanical flip clock */}
        <div className="absolute left-0 right-0 top-1/2 h-[0.5px] bg-brand-gold/20 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.1)]" />
        
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
              className="font-cormorant text-3xl md:text-4xl font-semibold text-brand-gold tracking-widest block drop-shadow-[0_1px_2px_rgba(216,178,110,0.25)]"
            >
              {formattedVal}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Card Label */}
      <span className="font-inter text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#7B685D] mt-4 font-bold">
        {label}
      </span>
    </div>
  );
}
