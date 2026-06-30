"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, memo } from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";

function Dua() {
  const [stars, setStars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [rsvpType, setRsvpType] = useState(null); // "attend" | "dua"
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [savedRsvp, setSavedRsvp] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    setMounted(true);

    // Generate gold sparks dust
    const generated = Array.from({ length: 32 }).map((_, i) => {
      const size = Math.random() * 2.2 + 1.2;
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

  // Prevent scroll when modal is active
  useEffect(() => {
    if (showModal || showSuccessModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal, showSuccessModal]);

  const handleSelectRSVP = (type) => {
    setRsvpType(type);
    setShowModal(true);
  };

  const handleButtonClick = (e) => {
    // Generate coordinate-based ripple effect on button click
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
    };
    
    setRipples((prev) => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 850);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (rsvpType === "dua" && !message.trim()) return;

    setIsSubmitting(true);
    
    // Simulate premium gamified loading duration of 1.2s
    setTimeout(() => {
      const submission = {
        rsvp: rsvpType,
        name: name.trim(),
        message: message.trim(),
        timestamp: Date.now(),
      };
      
      // Save details to in-memory state and localStorage (not loaded on mount)
      localStorage.setItem("wedding_rsvp", JSON.stringify(submission));
      setSavedRsvp(submission);
      setIsSubmitting(false);
      setShowModal(false);
      setShowSuccessModal(true);

      // Trigger royal gold/burgundy confetti burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#E8C76A", "#FFF8ED", "#8F1C3C", "#6D0F2A"],
      });
    }, 1200);
  };

  const handleReset = () => {
    localStorage.removeItem("wedding_rsvp");
    setSavedRsvp(null);
    setName("");
    setMessage("");
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
  };

  return (
    <section 
      style={{
        background: `radial-gradient(circle at center, #7A1237 0%, #5A001E 50%, #2A000C 100%)`
      }}
      className="py-32 px-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[65vh] shadow-[inset_0_0_140px_rgba(10,0,2,0.98),inset_0_0_60px_rgba(0,0,0,0.9)]"
    >
      
      {/* Custom Styles for magical CTA sheen sweep and ripple ring animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shine-sweep {
          0% { left: -100%; }
          35% { left: 200%; }
          100% { left: 200%; }
        }
        .shine-btn-sweep {
          position: relative;
          overflow: hidden;
        }
        .shine-btn-sweep::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -100%;
          width: 50%;
          height: 200%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.45) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(25deg);
          animation: shine-sweep 4s infinite ease-in-out;
        }
        @keyframes ripple {
          0% {
            width: 0px;
            height: 0px;
            opacity: 0.8;
          }
          100% {
            width: 500px;
            height: 500px;
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.85s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
      `}} />

      {/* Layer 1.1: Velvet fabric grain overlay (2.5% opacity) */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay z-0" 
        style={{ 
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.12) 0.5px, transparent 0.5px)`, 
          backgroundSize: "2px 2px" 
        }} 
      />

      {/* Top Gold Arch Section Divider */}
      <LuxuryDivider className="absolute top-4 left-0 right-0 z-20 -translate-y-[15px] rotate-180" />

      {/* Low-opacity repeating Islamic geometric pattern watermark (Reduced to 2%) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E")`, 
             backgroundSize: "60px 60px" 
           }} />

      {/* Layer 2: Giant faint Islamic Arch Silhouette Frame with soft glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="absolute w-[420px] h-[650px] md:w-[720px] md:h-[1050px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] blur-[40px] pointer-events-none" />
        <svg className="w-[320px] h-[550px] md:w-[580px] md:h-[950px] text-[#D4AF37] stroke-current fill-none stroke-[1.2] opacity-[0.05] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]" viewBox="0 0 100 150" preserveAspectRatio="none">
          <path d="M 5,150 L 5,60 C 5,30 25,10 50,10 C 75,10 95,30 95,60 L 95,150" />
          <path d="M 10,150 L 10,63 C 10,35 27,16 50,16 C 73,16 90,35 90,63 L 90,150" strokeDasharray="3,3" />
        </svg>
      </div>

      {/* Ambient dynamic diagonal light sweep */}
      <div className="ambient-light-sweep" />

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

      {/* Ambient shifting fog/mist behind the card */}
      <motion.div
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [0.15, 0.28, 0.15]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[300px] bg-[#7A1230]/30 rounded-full blur-[90px] pointer-events-none z-0"
      />

      {/* Layer 4: Subtle Floating Gold Dust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            initial={{ y: "110%", opacity: 0 }}
            animate={{
              y: "-10%",
              opacity: [0, 0.65, 0.65, 0],
              x: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: "linear",
            }}
            className="absolute rounded-full bg-[#E8C76A]"
            style={{
              width: s.size,
              height: s.size,
              left: s.left,
              boxShadow: "0 0 6px rgba(232, 199, 106, 0.5)",
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center text-center px-4 w-full">
        
        {/* Scroll Viewport Reveal Wrapper */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="flex flex-col items-center w-full"
        >
          {/* Soft Moon Outline / Islamic Motif in gold */}
          <div className="w-14 h-14 border border-[#D4AF37]/35 rounded-full flex items-center justify-center mb-8 opacity-80 shadow-[0_0_15px_rgba(216,178,110,0.15)]">
            <svg className="w-6 h-6 text-[#E8C76A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" fillOpacity="0.12" />
            </svg>
          </div>

          <AnimatePresence mode="wait">
            {!savedRsvp ? (
              <motion.div
                key="rsvp-form"
                animate={{
                  y: [0, -6, 0],
                  boxShadow: [
                    "0 24px 50px rgba(0,0,0,0.5), 0 0 15px rgba(122,18,55,0.08)",
                    "0 24px 50px rgba(0,0,0,0.5), 0 0 25px rgba(122,18,55,0.22)",
                    "0 24px 50px rgba(0,0,0,0.5), 0 0 15px rgba(122,18,55,0.08)"
                  ]
                }}
                transition={{
                  y: { repeat: Infinity, duration: 4.8, ease: "easeInOut" },
                  boxShadow: { repeat: Infinity, duration: 4.8, ease: "easeInOut" }
                }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                className="w-full max-w-xl bg-gradient-to-br from-[#5A001E]/75 via-[#2A000C]/80 to-[#1A0008]/85 p-8 md:p-12 rounded-[28px] border border-[#D4AF37]/35 shadow-[0_24px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(122,18,55,0.25),inset_0_1px_3px_rgba(255,255,255,0.15)] backdrop-blur-xl relative overflow-hidden"
              >
                {/* Heading with sparkle pulse + rotation */}
                <h2 className="font-cormorant text-3xl md:text-4xl text-[#FFF8ED] tracking-wide mb-3 font-light flex items-center justify-center gap-2">
                  Confirm Your Presence
                  <motion.span 
                    className="inline-block text-[#E8C76A]"
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                      filter: ["drop-shadow(0 0 2px #E8C76A)", "drop-shadow(0 0 8px #E8C76A)", "drop-shadow(0 0 2px #E8C76A)"]
                    }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  >
                    ✨
                  </motion.span>
                </h2>
                
                <p className="font-cormorant italic text-base md:text-lg text-[#FFF8ED]/85 leading-relaxed max-w-md mx-auto mb-8">
                  Your presence, blessings, and duas would mean the world to us.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                  {/* Attending Button - Gold gradient primary */}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectRSVP("attend")}
                    className="w-full sm:w-auto min-w-[200px] px-8 py-4 rounded-full border border-[#856124]/60 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#2D040F] font-cinzel text-xs font-bold tracking-[0.2em] shadow-[inset_0_2px_3px_rgba(255,255,255,0.85),inset_0_-1.5px_2px_rgba(0,0,0,0.25),0_4px_18px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_25px_rgba(232,199,106,0.6)] cursor-pointer transition-all duration-300 shine-btn-sweep"
                  >
                    InshaAllah, I’ll Attend
                  </motion.button>

                  {/* Sending My Duas Button - Outlined gold */}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectRSVP("dua")}
                    className="w-full sm:w-auto min-w-[200px] border border-[#D4AF37]/65 hover:bg-[#D4AF37]/15 hover:border-[#FCF6BA] text-[#FFFDF9] font-cinzel text-xs font-bold tracking-widest py-4 px-8 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] cursor-pointer focus:outline-none"
                  >
                    Sending My Duas
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="rsvp-saved"
                animate={{
                  y: [0, -6, 0],
                  boxShadow: [
                    "0 24px 50px rgba(0,0,0,0.5), 0 0 15px rgba(122,18,55,0.08)",
                    "0 24px 50px rgba(0,0,0,0.5), 0 0 25px rgba(122,18,55,0.22)",
                    "0 24px 50px rgba(0,0,0,0.5), 0 0 15px rgba(122,18,55,0.08)"
                  ]
                }}
                transition={{
                  y: { repeat: Infinity, duration: 4.8, ease: "easeInOut" },
                  boxShadow: { repeat: Infinity, duration: 4.8, ease: "easeInOut" }
                }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-xl bg-gradient-to-br from-[#5A001E]/75 via-[#2A000C]/80 to-[#1A0008]/85 p-8 md:p-12 rounded-[28px] border border-[#D4AF37]/35 shadow-[0_24px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(122,18,55,0.25),inset_0_1px_3px_rgba(255,255,255,0.15)] backdrop-blur-xl text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/45 flex items-center justify-center mx-auto mb-6 text-[#E8C76A] shadow-[0_0_12px_rgba(212,175,55,0.2)]">
                  <svg className="w-5.5 h-5.5 text-[#E8C76A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>

                <h2 className="font-cormorant text-2xl md:text-3.5xl text-[#FFF8ED] tracking-wide mb-2">
                  JazakAllah Khair!
                </h2>

                <p className="font-cormorant italic text-base md:text-lg text-[#FFF8ED]/85 leading-relaxed max-w-md mx-auto mb-6">
                  {savedRsvp.rsvp === "attend" 
                    ? "Thank you! We are delighted to hear you will be joining us to celebrate this blessed union."
                    : "Thank you for sending your warm prayers and blessings to the couple."}
                </p>

                {savedRsvp.name && (
                  <div className="bg-[#20030B]/40 rounded-2xl p-5 border border-[#D4AF37]/15 max-w-md mx-auto mb-8 text-left shadow-lg">
                    <div className="font-inter text-[9px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1">
                      Guest Name
                    </div>
                    <div className="font-cormorant text-lg text-[#FFF8ED] font-bold mb-3">
                      {savedRsvp.name}
                    </div>

                    {savedRsvp.message && (
                      <>
                        <div className="font-inter text-[9px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1">
                          Your Blessings & Duas
                        </div>
                        <p className="font-cormorant italic text-base text-[#FFF8ED]/90 leading-relaxed">
                          "{savedRsvp.message}"
                        </p>
                      </>
                    )}
                  </div>
                )}

                <button
                  onClick={handleReset}
                  className="font-cinzel text-[10px] uppercase tracking-widest text-[#D4AF37]/80 hover:text-[#FFF8ED] transition-colors focus:outline-none cursor-pointer hover:drop-shadow-[0_0_8px_rgba(232,199,106,0.5)]"
                >
                  Update Confirmation
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Glassmorphic Form Modal (Using React Portal) */}
      {mounted && createPortal(
        <AnimatePresence>
          {showModal && (
            <motion.div
              key="rsvp-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md cursor-pointer"
            >
              <motion.div
                key="rsvp-modal-card"
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-gradient-to-br from-[#5A001E]/95 via-[#2A000C]/95 to-[#1A0008]/95 p-8 rounded-[28px] border border-[#D4AF37]/35 shadow-[0_24px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(122,18,55,0.25),inset_0_1px_3px_rgba(255,255,255,0.15)] relative overflow-hidden cursor-default backdrop-blur-xl"
              >
                {/* Close button X */}
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-[#FFF8ED]/50 hover:text-[#FFF8ED] transition-colors cursor-pointer focus:outline-none z-10"
                >
                  <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Corner Ornaments */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37]/30 rounded-tl-xl pointer-events-none" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#D4AF37]/30 rounded-tr-xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#D4AF37]/30 rounded-bl-xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37]/30 rounded-br-xl pointer-events-none" />

                {rsvpType === "attend" ? (
                  // ATTEND MODAL
                  <form onSubmit={handleSubmit} className="flex flex-col">
                    <h3 className="font-cormorant text-2.5xl text-[#FFF8ED] tracking-wide mb-1 text-center font-semibold">
                      We’ll Be Honored By Your Presence
                    </h3>
                    <p className="font-cormorant italic text-sm text-[#FFF8ED]/75 text-center mb-6">
                      Please let us know your details
                    </p>

                    <label className="font-inter text-[9px] uppercase tracking-widest text-[#D4AF37] mb-1.5 font-bold">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Saad & Family"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#20030B]/50 text-[#FFF8ED] placeholder-[#FFF8ED]/55 border border-[#D4AF37]/25 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E8C76A] focus:ring-1 focus:ring-[#E8C76A]/30 transition-all font-cormorant text-lg mb-4"
                    />

                    <label className="font-inter text-[9px] uppercase tracking-widest text-[#D4AF37] mb-1.5 font-bold">
                      Optional Message
                    </label>
                    <textarea
                      placeholder="Write your wishes or special notes..."
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#20030B]/50 text-[#FFF8ED] placeholder-[#FFF8ED]/55 border border-[#D4AF37]/25 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E8C76A] focus:ring-1 focus:ring-[#E8C76A]/30 transition-all font-cormorant text-base mb-6 resize-none"
                    />

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={isSubmitting}
                      onClick={handleButtonClick}
                      className="px-10 py-4 rounded-full border border-[#856124]/60 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#2D040F] font-cinzel text-xs font-bold tracking-[0.2em] shadow-[inset_0_2px_3px_rgba(255,255,255,0.85),inset_0_-1.5px_2px_rgba(0,0,0,0.25),0_4px_18px_rgba(212,175,55,0.35)] cursor-pointer relative overflow-hidden flex items-center justify-center gap-2 shine-btn-sweep w-full text-center"
                    >
                      {/* Ripple elements inside button */}
                      {ripples.map((r) => (
                        <span
                          key={r.id}
                          className="absolute rounded-full bg-[#FFF8ED]/50 pointer-events-none animate-ripple"
                          style={{
                            left: r.x,
                            top: r.y,
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      ))}
                      
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <svg className="animate-spin h-5.5 w-5.5 text-[#4A081B]" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span className="font-cormorant tracking-widest font-bold">Sealing Your Presence...</span>
                        </div>
                      ) : (
                        <span className="font-cormorant tracking-widest font-bold">Seal My Presence</span>
                      )}
                    </motion.button>
                  </form>
                ) : (
                  // SEND DUA MODAL
                  <form onSubmit={handleSubmit} className="flex flex-col">
                    <h3 className="font-cormorant text-2.5xl text-[#FFF8ED] tracking-wide mb-1 text-center font-semibold">
                      Send Your Dua
                    </h3>
                    <p className="font-cormorant italic text-sm text-[#FFF8ED]/75 text-center mb-6">
                      Leave your blessings for the couple
                    </p>

                    <label className="font-inter text-[9px] uppercase tracking-widest text-[#D4AF37] mb-1.5 font-bold">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Saad & Family"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#20030B]/50 text-[#FFF8ED] placeholder-[#FFF8ED]/55 border border-[#D4AF37]/25 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E8C76A] focus:ring-1 focus:ring-[#E8C76A]/30 transition-all font-cormorant text-lg mb-4"
                    />

                    <label className="font-inter text-[9px] uppercase tracking-widest text-[#D4AF37] mb-1.5 font-bold">
                      Your Blessing / Message
                    </label>
                    <textarea
                      placeholder="BarakAllahu Lakuma wa Baraka Alaikuma..."
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#20030B]/50 text-[#FFF8ED] placeholder-[#FFF8ED]/55 border border-[#D4AF37]/25 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E8C76A] focus:ring-1 focus:ring-[#E8C76A]/30 transition-all font-cormorant text-base mb-6 resize-none"
                    />

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={isSubmitting}
                      onClick={handleButtonClick}
                      className="px-10 py-4 rounded-full border border-[#856124]/60 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-[#2D040F] font-cinzel text-xs font-bold tracking-[0.2em] shadow-[inset_0_2px_3px_rgba(255,255,255,0.85),inset_0_-1.5px_2px_rgba(0,0,0,0.25),0_4px_18px_rgba(212,175,55,0.35)] cursor-pointer relative overflow-hidden flex items-center justify-center gap-2 shine-btn-sweep w-full text-center"
                    >
                      {/* Ripple elements inside button */}
                      {ripples.map((r) => (
                        <span
                          key={r.id}
                          className="absolute rounded-full bg-[#FFF8ED]/50 pointer-events-none animate-ripple"
                          style={{
                            left: r.x,
                            top: r.y,
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      ))}
                      
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <svg className="animate-spin h-5.5 w-5.5 text-[#4A081B]" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span className="font-cormorant tracking-widest font-bold">Sending Blessings...</span>
                        </div>
                      ) : (
                        <span className="font-cormorant tracking-widest font-bold">Send My Blessing</span>
                      )}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Glassmorphic Success Confirmation Modal (Using React Portal) */}
      {mounted && createPortal(
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              key="rsvp-success-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseSuccess}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md cursor-pointer"
            >
              <motion.div
                key="rsvp-success-card"
                initial={{ opacity: 0, scale: 0.93, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-gradient-to-br from-[#5A001E]/95 via-[#2A000C]/95 to-[#1A0008]/95 p-8 rounded-[28px] border border-[#D4AF37]/35 shadow-2xl relative overflow-hidden cursor-default text-center backdrop-blur-xl"
              >
                {/* Close button X */}
                <button
                  type="button"
                  onClick={handleCloseSuccess}
                  className="absolute top-4 right-4 text-[#FFF8ED]/50 hover:text-[#FFF8ED] transition-colors cursor-pointer focus:outline-none z-10"
                >
                  <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Corner Ornaments */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37]/30 rounded-tl-xl pointer-events-none" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#D4AF37]/30 rounded-tr-xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#D4AF37]/30 rounded-bl-xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37]/30 rounded-br-xl pointer-events-none" />

                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-5 text-[#E8C76A]">
                  <svg className="w-5.5 h-5.5 text-[#E8C76A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>

                <h3 className="font-cormorant text-3xl text-[#FFF8ED] tracking-wide mb-2 font-semibold">
                  JazakAllah Khair!
                </h3>
                
                <p className="font-cormorant italic text-base text-[#FFF8ED]/85 leading-relaxed mb-6">
                  Thank you for confirming your presence. Your blessings and duas mean a lot to us.
                </p>

                {savedRsvp && (
                  <div className="bg-[#20030B]/40 rounded-2xl p-5 border border-[#D4AF37]/15 max-w-sm mx-auto mb-6 text-left">
                    <div className="font-inter text-[9px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1">
                      Guest Name
                    </div>
                    <div className="font-cormorant text-lg text-[#FFF8ED] font-bold mb-3">
                      {savedRsvp.name}
                    </div>

                    {savedRsvp.message && (
                      <>
                        <div className="font-inter text-[9px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1">
                          Your Blessings & Duas
                        </div>
                        <p className="font-cormorant italic text-base text-[#FFF8ED]/90 leading-relaxed">
                          "{savedRsvp.message}"
                        </p>
                      </>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleCloseSuccess}
                  className="font-cinzel text-[10px] uppercase tracking-widest bg-gradient-to-r from-[#D4AF37]/15 to-[#E8C76A]/10 text-[#E8C76A] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/45 rounded-full py-2.5 px-6 transition-colors focus:outline-none cursor-pointer"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </section>
  );
}

// Pointed Islamic Gold Divider Component
const LuxuryDivider = ({ className = "" }) => (
  <div className={`w-full flex items-center justify-center pointer-events-none ${className}`}>
    <div className="flex-1 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
    <svg className="w-16 h-8 text-[#D4AF37] fill-none stroke-current" viewBox="0 0 100 50">
      <path d="M 10,25 C 30,25 35,10 50,5 C 65,10 70,25 90,25" strokeWidth="1.5" />
      <path d="M 20,25 Q 50,40 80,25" strokeWidth="0.8" strokeDasharray="2,2" />
      <circle cx="50" cy="20" r="3" fill="currentColor" />
    </svg>
    <div className="flex-1 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
  </div>
);

export default memo(Dua);
