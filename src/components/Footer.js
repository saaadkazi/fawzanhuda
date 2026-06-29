"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-24 px-6 bg-gradient-to-b from-[#FFF8ED] via-[#F6EBDD] to-[#FFF8ED] relative overflow-hidden flex flex-col items-center justify-center">
      {/* Top subtle line */}
      <div className="w-20 h-[0.5px] bg-brand-gold/30 mb-12" />

      <div className="max-w-md mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Gratitude Label */}
        <span className="font-cormorant text-xs md:text-sm uppercase tracking-[0.3em] text-brand-gold font-semibold mb-6">
          With Sincere Gratitude
        </span>

        {/* Jazakallah Calligraphy */}
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-amiri text-[2.25rem] leading-none tracking-wide mb-3 gold-shimmer-text font-bold"
        >
          جَزَاكُمُ ٱللَّٰهُ خَيْرًا
        </motion.p>

        {/* Translation */}
        <p className="font-cormorant italic text-sm text-brand-body tracking-wider mb-8">
          May Allah reward you with goodness
        </p>

        {/* Thank You Note */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.85, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-cormorant text-base md:text-lg text-brand-heading leading-relaxed mb-12 max-w-sm px-4 font-semibold"
        >
          Your presence and prayers are the greatest blessings on our new journey. We look forward to celebrating this beautiful day with you.
        </motion.p>

        {/* Signatures */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex justify-center items-center gap-6 font-cormorant text-lg md:text-xl font-light text-brand-heading tracking-widest uppercase mb-16"
        >
          <span>Kazi Family</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50" />
          <span>Hasham Family</span>
        </motion.div>

        {/* Closing Arabesque End Scroll Motif */}
        <div className="w-24 h-12 text-brand-gold/60 opacity-55 mb-6">
          <svg className="w-full h-full" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M 10 25 Q 30 15 50 25 T 90 25" />
            <path d="M 20 25 Q 35 35 50 25 T 80 25" />
            <circle cx="50" cy="25" r="3" fill="currentColor" />
            <path d="M 50 25 L 50 40" strokeDasharray="2,2" />
            <circle cx="50" cy="42" r="1.5" fill="currentColor" />
          </svg>
        </div>

        {/* Luxury Signature Glass Panel */}
        <div className="w-full max-w-[280px] md:max-w-[320px] bg-[#4A081B]/95 backdrop-blur-md border border-[#D4AF37]/45 rounded-2xl p-4 shadow-[0_12px_28px_rgba(29,3,8,0.35)] flex flex-col items-center gap-2.5 z-10">
          <span className="font-cormorant text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#FFF8ED]/75 font-semibold">
            Made & Developed by
          </span>
          <span className="font-cormorant text-sm md:text-base font-semibold tracking-wider text-[#E8C76A] drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.8)]">
            Saad Kazi
          </span>
          
          {/* Social Icons Links */}
          <div className="flex gap-4 items-center mt-1">
            {/* WhatsApp */}
            <a 
              href="https://wa.me/918788940660?text=Hello%20Saad%2C%0AI%20also%20want%20a%20premium%20cinematic%20wedding%20invitation%20website%20like%20this.%20Please%20share%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#FFF8ED]/5 border border-[#D4AF37]/35 flex items-center justify-center text-[#E8C76A] hover:text-[#FFF8ED] transition-colors duration-300 luxury-hover-lift"
              aria-label="WhatsApp Saad Kazi"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com/saad_kazi0001"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#FFF8ED]/5 border border-[#D4AF37]/35 flex items-center justify-center text-[#E8C76A] hover:text-[#FFF8ED] transition-colors duration-300 luxury-hover-lift"
              aria-label="Instagram Saad Kazi"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright Note */}
        <span className="font-inter text-[8px] uppercase tracking-[0.25em] text-brand-dark/40 mt-8">
          Fauzan & Huda • 2026
        </span>

      </div>
    </footer>
  );
}
