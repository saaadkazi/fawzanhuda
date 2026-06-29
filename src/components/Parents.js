"use client";

import { motion } from "framer-motion";
import FloralOrnament from "./FloralOrnament";

export default function Parents() {
  const cardVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
    visible: (customDelay) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        delay: customDelay,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="py-28 px-6 bg-gradient-to-b from-[#FFF8ED] via-[#F6EBDD] to-[#FFF8ED] relative overflow-hidden flex flex-col items-center">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-96 bg-brand-gold/8 rounded-r-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-48 h-96 bg-brand-dark/5 rounded-l-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <span className="font-cormorant text-xs md:text-sm uppercase tracking-[0.3em] text-brand-gold font-semibold">
            With Praise to Allah
          </span>
          <h2 className="font-cormorant text-3xl md:text-4xl text-brand-heading mt-2 tracking-wide font-light">
            The Beloved Parents
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 px-4 w-full justify-items-center">
          
          {/* Groom Parents Card */}
          <motion.div
            custom={0.15}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ y: -6, scale: 1.015 }}
            className="w-full max-w-[340px] bg-brand-card/90 backdrop-blur-sm px-6 py-12 rounded-[140px_140px_20px_20px] border border-brand-gold/20 luxury-shadow-card flex flex-col items-center text-center relative group overflow-hidden transition-shadow duration-500 hover:shadow-[0_15px_40px_rgba(109,15,42,0.15)]"
          >
            {/* Corner ornaments */}
            <FloralOrnament position="bottom-left" opacity={0.25} />
            <FloralOrnament position="bottom-right" opacity={0.25} />

            {/* Subtle inner gold arch borders */}
            <div className="absolute inset-[8px] border border-brand-gold/15 rounded-[132px_132px_14px_14px] pointer-events-none" />
            <div className="absolute inset-[11px] border border-dashed border-brand-gold/5 rounded-[129px_129px_11px_11px] pointer-events-none" />
            
            <span className="font-inter text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold mb-6 bg-brand-secondary/45 px-3 py-1 rounded-full border border-brand-gold/10">
              Parents of the Groom
            </span>

            {/* SVG Islamic motif inside card */}
            <div className="w-8 h-8 text-brand-gold/40 mb-6 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" />
                <circle cx="50" cy="50" r="10" />
              </svg>
            </div>

            <div className="my-2 space-y-5 z-10 relative">
              <div>
                <p className="font-cormorant text-xl md:text-2xl text-brand-heading tracking-wide font-semibold transition-colors duration-300 group-hover:text-brand-gold">
                  Rafiq Zainuddin Kazi
                </p>
                <p className="font-cormorant text-xs italic text-brand-body mt-1">Father</p>
              </div>
              <div className="w-8 h-[0.5px] bg-brand-gold/30 mx-auto" />
              <div>
                <p className="font-cormorant text-xl md:text-2xl text-brand-heading tracking-wide font-semibold transition-colors duration-300 group-hover:text-brand-gold">
                  Hajara Rafiq Kazi
                </p>
                <p className="font-cormorant text-xs italic text-brand-body mt-1">Mother</p>
              </div>
            </div>
          </motion.div>

          {/* Bride Parents Card */}
          <motion.div
            custom={0.3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ y: -6, scale: 1.015 }}
            className="w-full max-w-[340px] bg-brand-card/90 backdrop-blur-sm px-6 py-12 rounded-[140px_140px_20px_20px] border border-brand-gold/20 luxury-shadow-card flex flex-col items-center text-center relative group overflow-hidden transition-shadow duration-500 hover:shadow-[0_15px_40px_rgba(109,15,42,0.15)]"
          >
            {/* Corner ornaments */}
            <FloralOrnament position="bottom-left" opacity={0.25} />
            <FloralOrnament position="bottom-right" opacity={0.25} />

            {/* Subtle inner gold arch borders */}
            <div className="absolute inset-[8px] border border-brand-gold/15 rounded-[132px_132px_14px_14px] pointer-events-none" />
            <div className="absolute inset-[11px] border border-dashed border-brand-gold/5 rounded-[129px_129px_11px_11px] pointer-events-none" />

            <span className="font-inter text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold mb-6 bg-brand-secondary/45 px-3 py-1 rounded-full border border-brand-gold/10">
              Parents of the Bride
            </span>

            {/* SVG Islamic motif inside card */}
            <div className="w-8 h-8 text-brand-gold/40 mb-6 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" />
                <circle cx="50" cy="50" r="10" />
              </svg>
            </div>

            <div className="my-2 space-y-5 z-10 relative">
              <div>
                <p className="font-cormorant text-xl md:text-2xl text-brand-heading tracking-wide font-semibold transition-colors duration-300 group-hover:text-brand-gold">
                  Hasham Ismail Kazi
                </p>
                <p className="font-cormorant text-xs italic text-brand-body mt-1">Father</p>
              </div>
              <div className="w-8 h-[0.5px] bg-brand-gold/30 mx-auto" />
              <div>
                <p className="font-cormorant text-xl md:text-2xl text-brand-heading tracking-wide font-semibold transition-colors duration-300 group-hover:text-brand-gold">
                  Seemab Hasham Kazi
                </p>
                <p className="font-cormorant text-xs italic text-brand-body mt-1">Mother</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
