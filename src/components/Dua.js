"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Dua() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars for the parallax background
    const generated = Array.from({ length: 32 }).map((_, i) => {
      const size = Math.random() * 2.5 + 1.2; // 1.2px to 3.7px
      // Assign speeds based on size to simulate parallax depth (smaller stars move slower, larger move faster)
      const duration = size < 2 ? Math.random() * 6 + 10 : Math.random() * 4 + 6;
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 85 + 5}%`,
        size: size,
        delay: Math.random() * 5,
        duration: duration,
      };
    });
    setStars(generated);
  }, []);

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-[#FFF8ED] via-[#F6EBDD] to-[#FFF8ED] relative overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
      
      {/* Radial Champagne Gold Moon Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-brand-gold/10 via-[#FFF8ED]/65 to-brand-gold/5 rounded-full blur-[70px] pointer-events-none" />

      {/* Floating Parallax Gold Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            initial={{ y: "100%", opacity: 0 }}
            animate={{
              y: "-150%",
              opacity: [0, 0.7, 0.7, 0],
              x: [0, Math.random() * 30 - 15],
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-[#E8C76A]"
            style={{
              width: s.size,
              height: s.size,
              left: s.left,
              top: s.top,
              boxShadow: "0 0 8px rgba(232, 199, 106, 0.65)",
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center text-center px-4">
        
        {/* Soft Moon Outline / Islamic Motif in gold */}
        <div className="w-16 h-16 border border-brand-gold/25 rounded-full flex items-center justify-center mb-12 opacity-80 shadow-[0_0_15px_rgba(216,178,110,0.1)]">
          <svg className="w-7 h-7 text-brand-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" fillOpacity="0.12" />
          </svg>
        </div>

        {/* Arabic Calligraphy Verse with gold shimmer */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-amiri text-2xl md:text-3.5xl leading-loose tracking-wide mb-10 font-bold max-w-xl text-center gold-shimmer-text"
        >
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
        </motion.p>

        {/* English Translation */}
        <motion.p
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          whileInView={{ opacity: 0.85, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="font-cormorant italic text-base md:text-xl text-brand-body leading-relaxed max-w-lg mb-6"
        >
          “And among His signs is that He created for you mates from among yourselves that you may find tranquility in them; and He placed between you affection and mercy...”
        </motion.p>

        {/* Surah Citation */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-inter text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold"
        >
          Surah Ar-Rum 30:21
        </motion.span>

      </div>
    </section>
  );
}
