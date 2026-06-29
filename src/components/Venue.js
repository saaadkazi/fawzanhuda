"use client";

import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import FloralOrnament from "./FloralOrnament";

// Code-generated gold foil line-art map graphic (looks like high-end printed invitation card)
const GoldenMapGraphic = () => (
  <svg className="w-full h-full bg-[#3D0615] stroke-[#D4AF37]/55 fill-none pointer-events-none" viewBox="0 0 400 200" strokeWidth="0.8">
    {/* Road contours */}
    <path d="M 0,40 L 400,40" />
    <path d="M 0,110 L 400,110 M 0,113 L 400,113" strokeDasharray="3,3" strokeWidth="0.4" />
    <path d="M 0,170 L 400,170" />
    <path d="M 80,0 L 80,200" />
    <path d="M 220,0 L 220,200 M 223,0 L 223,200" strokeDasharray="3,3" strokeWidth="0.4" />
    <path d="M 320,0 L 320,200" />
    <path d="M 40,0 Q 140,80 280,200" />
    
    {/* Map Pin Target */}
    <g transform="translate(220, 110)">
      <circle cx="0" cy="0" r="14" className="fill-[#4A081B] stroke-[#D4AF37] stroke-[1.2]" />
      <path d="M-4,-4 L4,4 M-4,4 L4,-4" stroke="#D4AF37" strokeWidth="1.2" />
      <circle cx="0" cy="0" r="3" className="fill-[#E8C76A]" />
      {/* Ping radar ring */}
      <circle cx="0" cy="0" r="22" className="stroke-[#D4AF37]/25 animate-ping" />
    </g>

    {/* Compass Ornament in corner */}
    <g transform="translate(350, 45) scale(0.65)" className="opacity-35">
      <circle cx="0" cy="0" r="20" />
      <path d="M 0,-25 L 5,-5 L 25,0 L 5,5 L 0,25 L -5,5 L -25,0 L -5,-5 Z" className="fill-[#D4AF37]" />
      <path d="M 0,-25 L 0,25 M -25,0 L 25,0" />
    </g>

    {/* Aesthetic Grid Line Details */}
    <path d="M 0,20 L 400,20 M 0,60 L 400,60 M 0,80 L 400,80 M 0,130 L 400,130 M 0,150 L 400,150 M 0,190 L 400,190" stroke="rgba(212,175,55,0.04)" />
    <path d="M 20,0 L 20,200 M 60,0 L 60,200 M 100,0 L 100,200 M 140,0 L 140,200 M 180,0 L 180,200 M 240,0 L 240,200 M 280,0 L 280,200 M 340,0 L 340,200 M 380,0 L 380,200" stroke="rgba(212,175,55,0.04)" />
  </svg>
);

function Venue() {
  const mapLink = "https://maps.app.goo.gl/mqkn5eL4ZUfMuXE86";
  const [bgParticles, setBgParticles] = useState([]);

  useEffect(() => {
    // Generate slow floating gold particles inside section background
    const generated = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 8 + 8,
    }));
    setBgParticles(generated);
  }, []);

  const openMaps = (e) => {
    if (e) e.stopPropagation();
    window.open(mapLink, "_blank");
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#FFFDF9] via-[#F6EBDD] to-[#FFFDF9] relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Paper grain luxury texture overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #4A081B 1px, transparent 1px), radial-gradient(circle at 0 0, #4A081B 1px, transparent 1px)", backgroundSize: "16px 16px, 8px 8px" }} />

      {/* Soft burgundy radial glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,8,27,0.06)_0%,transparent_75%)] pointer-events-none" />

      {/* Background glow ornament */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-brand-secondary/30 rounded-full blur-[75px] pointer-events-none" />

      {/* Slow floating gold particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {bgParticles.map((p) => (
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

      <div className="max-w-md w-full relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="font-cormorant text-xs md:text-sm uppercase tracking-[0.3em] text-brand-gold font-semibold">
            The Celebration
          </span>
          <h2 className="font-cormorant text-3xl md:text-4xl text-brand-heading mt-2 tracking-wide font-light">
            Venue & Location
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Content Card (Luxury Pearl Printed style with Arch Top) */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-gradient-to-br from-[#FFFDF9] via-[#FFFBF5] to-[#FFF9F0] px-6 py-10 md:px-10 rounded-[140px_140px_20px_20px] border-[2px] border-[#D4AF37]/45 shadow-[0_15px_40px_rgba(75,58,50,0.12)] shadow-[inset_0_0_20px_rgba(212,175,55,0.06)] flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 hover:shadow-[0_16px_36px_rgba(212,175,55,0.22)]"
        >
          {/* Embossed ivory texture grid pattern */}
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" 
               style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #4A081B 1px, transparent 1px), radial-gradient(circle at 0 0, #4A081B 1px, transparent 1px)", backgroundSize: "16px 16px, 8px 8px" }} />

          {/* Corner ornaments */}
          <FloralOrnament position="bottom-left" opacity={0.25} />
          <FloralOrnament position="bottom-right" opacity={0.25} />

          {/* Subtle inner gold arch borders */}
          <div className="absolute inset-[8px] border border-[#D4AF37]/25 rounded-[132px_132px_14px_14px] pointer-events-none" />
          <div className="absolute inset-[11px] border border-dashed border-[#D4AF37]/15 rounded-[129px_129px_11px_11px] pointer-events-none" />

          {/* Nested floating loop wrapper */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6.0, repeat: Infinity, ease: "easeInOut" }}
            className="w-full flex flex-col items-center z-10"
          >
            {/* Map Pin Icon */}
            <div className="w-10 h-10 bg-[#D4AF37]/15 rounded-full flex items-center justify-center text-brand-gold border border-brand-gold/35 mb-5">
              <MapPin className="w-4.5 h-4.5 text-brand-gold" />
            </div>

            {/* Venue Details */}
            <h3 className="font-cormorant text-xl md:text-2xl text-[#4A081B] tracking-wide font-semibold mb-2 select-all">
              Elly Kadoorie Hall
            </h3>

            <p className="font-inter text-[11px] md:text-xs text-brand-body leading-relaxed max-w-[280px] mb-6 font-semibold select-all">
              Opposite Chaitya Temple, Tadwadi, Mazgaon, Mumbai 400010
            </p>

            {/* Fully Clickable Realistic Map Preview Card */}
            <motion.div
              onClick={openMaps}
              whileHover={{ scale: 1.025, y: -2 }}
              whileTap={{ scale: 0.985 }}
              className="w-full max-w-[320px] h-40 md:h-44 rounded-2xl overflow-hidden border border-[#D4AF37]/45 relative group mb-6 shadow-[0_12px_28px_rgba(29,3,8,0.12)] cursor-pointer pointer-events-auto"
            >
              <img 
                src="/map_preview.png" 
                alt="Google Maps Location Preview" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />

              {/* Subtle glass reflection overlay */}
              <div className="absolute inset-0 bg-black/5 backdrop-blur-[0.2px] pointer-events-none z-10 group-hover:bg-transparent transition-colors duration-300" />

              {/* Tap to Open Maps Badge */}
              <div className="absolute bottom-3 right-3 bg-[#4A081B]/95 border border-[#D4AF37]/50 rounded-full px-2.5 py-1.5 shadow-[0_3px_8px_rgba(0,0,0,0.5)] z-20 pointer-events-none flex items-center gap-1">
                <Navigation className="w-2.5 h-2.5 text-[#E8C76A] animate-pulse" />
                <span className="font-cormorant text-[8.5px] uppercase tracking-[0.15em] font-bold text-[#FFF8ED]">Open Maps</span>
              </div>
            </motion.div>

            {/* Reduced-Size Slim Pill CTA Button */}
            <motion.a
              onClick={openMaps}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden rounded-full shadow-[0_8px_18px_rgba(74,8,27,0.22)] border border-[#FFF8ED]/30 pointer-events-auto cursor-pointer flex items-center gap-2 group p-[0.8px] bg-gradient-to-r from-[#856124] via-[#D4AF37] to-[#FFF8ED] transition-shadow duration-300 hover:shadow-[0_10px_24px_rgba(212,175,55,0.25)]"
            >
              <div className="rounded-full bg-gradient-to-br from-[#5C0C22] via-[#4A081B] to-[#20030B] px-5 py-2 flex items-center justify-center gap-2 shadow-[inset_0_1.5px_4px_rgba(212,175,55,0.2)] text-[#FFF8ED]">
                {/* Inner gold dashed outline */}
                <div className="absolute inset-[3px] border border-dashed border-[#D4AF37]/35 rounded-full pointer-events-none" />
                <Navigation className="w-3 h-3 text-[#E8C76A] group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-cormorant uppercase tracking-[0.2em] text-[9.5px] font-bold">Open Google Maps</span>
                
                {/* Gold Shimmer Sweep */}
                <motion.div 
                  animate={{
                    left: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2.0,
                    repeat: Infinity,
                    repeatDelay: 3.5,
                    ease: "easeInOut"
                  }}
                  className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-[#FFF8ED]/20 to-transparent blur-[2px] -skew-x-[25deg] pointer-events-none" 
                />
              </div>
            </motion.a>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Venue);
