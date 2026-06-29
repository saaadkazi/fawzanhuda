"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import FloralOrnament from "./FloralOrnament";

export default function Venue() {
  return (
    <section className="py-28 px-6 bg-[#F6EBDD] relative overflow-hidden flex flex-col items-center">
      {/* Background glow ornament */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-brand-secondary/30 rounded-full blur-[75px] pointer-events-none" />

      <div className="max-w-3xl w-full relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="w-full bg-brand-card/90 backdrop-blur-sm px-6 py-12 md:p-14 rounded-[160px_160px_24px_24px] border border-brand-gold/20 luxury-shadow-card flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Corner ornaments */}
          <FloralOrnament position="bottom-left" opacity={0.25} />
          <FloralOrnament position="bottom-right" opacity={0.25} />

          {/* Subtle inner gold arch borders */}
          <div className="absolute inset-[8px] border border-brand-gold/15 rounded-[152px_152px_18px_18px] pointer-events-none" />
          <div className="absolute inset-[11px] border border-dashed border-brand-gold/5 rounded-[149px_149px_15px_15px] pointer-events-none" />

          {/* Map Pin Icon (styled in gold) */}
          <div className="w-12 h-12 bg-brand-secondary/60 rounded-full flex items-center justify-center text-brand-gold border border-brand-gold/30 mb-6 shadow-inner animate-pulse-slow z-10">
            <MapPin className="w-5 h-5 text-brand-gold" />
          </div>

          {/* Venue Details */}
          <h3 className="font-cormorant text-2xl md:text-3xl text-brand-heading tracking-wide font-medium mb-4 z-10">
            Elly Kadoorie Hall
          </h3>

          <p className="font-inter text-xs md:text-sm text-brand-body leading-relaxed max-w-sm mb-8 whitespace-pre-line z-10 font-medium">
            XR8Q+HM5, Shivdas Champsi Rd,{"\n"}
            Opposite Chaitya Temple,{"\n"}
            Tadwadi, Mazgaon,{"\n"}
            Mumbai, Maharashtra 400010
          </p>

          {/* Arch-shaped Map Container (mocha-filtered map) */}
          <div className="w-full max-w-[420px] h-56 md:h-64 rounded-[80px_80px_16px_16px] overflow-hidden border border-brand-gold/25 relative group mb-8 shadow-inner bg-brand-bg z-10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.3101377519504!2d72.84277717604313!3d18.961914182991054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf43666b6c2f%3A0xc48c081e6268cc02!2sSir%20Elly%20Kadoorie%20School%20%26%20Junior%20College!5e0!3m2!1sen!2sin!4v1719560000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ 
                border: 0, 
                filter: "grayscale(0.8) sepia(0.4) saturate(0.8) hue-rotate(-20deg) brightness(1.02)"
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Elly Kadoorie Hall Google Map"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            ></iframe>
            {/* Soft overlay gradient border */}
            <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-[80px_80px_16px_16px]" />
          </div>

          {/* CTA Navigation Button (Matte Walnut Dark Gold Pill) */}
          <motion.a
            href="https://share.google/Cte12NQVMLqWTCnkQ"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.975 }}
            className="px-8 py-4 bg-brand-dark hover:bg-brand-soft-dark text-brand-card font-cormorant uppercase tracking-[0.25em] text-xs md:text-sm font-semibold rounded-full shadow-[0_4px_16px_rgba(109,15,42,0.25)] hover:shadow-[0_6px_22px_rgba(109,15,42,0.38)] transition-all duration-300 flex items-center gap-2 cursor-pointer border border-brand-gold/20 z-10"
          >
            <Navigation className="w-3.5 h-3.5 text-brand-gold-glow animate-pulse-slow" />
            <span>Open Location</span>
          </motion.a>

        </motion.div>
      </div>
    </section>
  );
}
