"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import FloralOrnament from "./FloralOrnament";

export default function Venue() {
  const mapLink = "https://maps.app.goo.gl/mqkn5eL4ZUfMuXE86";

  const openMaps = (e) => {
    if (e) e.stopPropagation();
    window.open(mapLink, "_blank");
  };

  return (
    <section className="py-20 px-6 bg-[#F6EBDD] relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background glow ornament */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-brand-secondary/30 rounded-full blur-[75px] pointer-events-none" />

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
          className="w-full bg-gradient-to-br from-[#FFFDF9] via-[#FFFBF5] to-[#FFF9F0] px-6 py-10 md:px-10 rounded-[140px_140px_20px_20px] border-[2px] border-[#D4AF37]/45 shadow-[0_15px_40px_rgba(75,58,50,0.12)] shadow-[inset_0_0_20px_rgba(212,175,55,0.06)] flex flex-col items-center text-center relative overflow-hidden"
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

          {/* Map Pin Icon */}
          <div className="w-10 h-10 bg-[#D4AF37]/15 rounded-full flex items-center justify-center text-brand-gold border border-brand-gold/35 mb-5 z-10">
            <MapPin className="w-4.5 h-4.5 text-brand-gold" />
          </div>

          {/* Venue Details */}
          <h3 className="font-cormorant text-xl md:text-2xl text-[#4A081B] tracking-wide font-semibold mb-2 z-10 select-all">
            Elly Kadoorie Hall
          </h3>

          <p className="font-inter text-[11px] md:text-xs text-brand-body leading-relaxed max-w-[280px] mb-6 z-10 font-semibold select-all">
            Opposite Chaitya Temple, Tadwadi, Mazgaon, Mumbai 400010
          </p>

          {/* Fully Clickable Realistic Map Preview Card */}
          <motion.div
            onClick={openMaps}
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.985 }}
            className="w-full max-w-[320px] h-40 md:h-44 rounded-2xl overflow-hidden border border-[#D4AF37]/45 relative group mb-6 shadow-[0_12px_28px_rgba(29,3,8,0.12)] cursor-pointer pointer-events-auto z-10"
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
            className="relative overflow-hidden rounded-full shadow-[0_8px_18px_rgba(74,8,27,0.22)] border border-[#FFF8ED]/30 pointer-events-auto cursor-pointer z-10 flex items-center gap-2 group p-[0.8px] bg-gradient-to-r from-[#856124] via-[#D4AF37] to-[#FFF8ED] transition-shadow duration-300 hover:shadow-[0_10px_24px_rgba(212,175,55,0.25)]"
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
      </div>
    </section>
  );
}
