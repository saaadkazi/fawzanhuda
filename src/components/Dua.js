"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, memo } from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";

// Section curved transition divider (Venue to Dua)
const SectionDivider = () => {
  return (
    <div className="absolute left-0 right-0 w-full h-10 pointer-events-none z-10 text-[#2D040F] top-0">
      <svg className="w-full h-full fill-current" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path d="M 0 0 C 300 100 700 100 1000 0 L 1000 100 L 0 100 Z" />
      </svg>
    </div>
  );
};

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

    // Generate random stars for the background
    const generated = Array.from({ length: 32 }).map((_, i) => {
      const size = Math.random() * 2.5 + 1.2;
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

    // Note: Form persistence on mount is removed per requirements to ensure a fresh empty form on reload.
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
    // Generate coordinate-based ripple effect on button
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
    setRsvpType(null);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
  };

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-[#2D040F] via-[#4A081B] to-[#2D040F] relative overflow-hidden flex flex-col items-center justify-center min-h-[65vh]">
      
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

      {/* Top curved section transition divider */}
      <SectionDivider />

      {/* Paper grain luxury texture overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #FFF8ED 1px, transparent 1px), radial-gradient(circle at 0 0, #FFF8ED 1px, transparent 1px)", backgroundSize: "16px 16px, 8px 8px" }} />

      {/* Radial Champagne Gold Moon Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-brand-gold/5 via-[#FFF8ED]/10 to-brand-gold/5 rounded-full blur-[70px] pointer-events-none" />

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

      <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center text-center px-4 w-full">
        
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-xl bg-gradient-to-br from-[#4A081B]/40 via-[#2D040F]/60 to-[#4A081B]/40 p-8 md:p-12 rounded-[36px] border border-[#D4AF37]/25 shadow-2xl backdrop-blur-md relative overflow-hidden"
            >
              <h2 className="font-cormorant text-3xl md:text-4xl text-[#FFF8ED] tracking-wide mb-3 font-light">
                Confirm Your Presence ✨
              </h2>
              
              <p className="font-cormorant italic text-base md:text-lg text-[#FFF8ED]/85 leading-relaxed max-w-md mx-auto mb-8">
                Your presence, blessings, and duas would mean the world to us.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                {/* Attending Button */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectRSVP("attend")}
                  className="w-full sm:w-auto min-w-[200px] bg-gradient-to-r from-[#D4AF37] via-[#E8C76A] to-[#D4AF37] text-[#4A081B] font-cormorant font-bold uppercase tracking-wider py-4 px-8 rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-shadow duration-300 hover:shadow-[0_4px_30px_rgba(232,199,106,0.6)] cursor-pointer text-sm border-none focus:outline-none"
                >
                  InshaAllah, I’ll Attend
                </motion.button>

                {/* Sending Duas Button */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectRSVP("dua")}
                  className="w-full sm:w-auto min-w-[200px] border-[1.5px] border-[#D4AF37] text-[#FFF8ED] hover:bg-[#D4AF37]/10 font-cormorant font-bold uppercase tracking-wider py-4 px-8 rounded-full transition-colors duration-300 cursor-pointer text-sm focus:outline-none"
                >
                  Sending My Duas
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="rsvp-saved"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-xl bg-gradient-to-br from-[#4A081B]/40 via-[#2D040F]/60 to-[#4A081B]/40 p-8 md:p-12 rounded-[36px] border border-[#D4AF37]/25 shadow-2xl backdrop-blur-md text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-6 text-[#E8C76A]">
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
                <div className="bg-[#20030B]/40 rounded-2xl p-5 border border-[#D4AF37]/15 max-w-md mx-auto mb-8 text-left">
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
                className="font-inter text-[10px] uppercase tracking-widest text-[#D4AF37]/80 hover:text-[#E8C76A] transition-colors focus:outline-none cursor-pointer"
              >
                Update Confirmation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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
                className="w-full max-w-md bg-gradient-to-br from-[#3D0615] via-[#2D040F] to-[#3D0615] p-8 rounded-[28px] border border-[#D4AF37]/35 shadow-2xl relative overflow-hidden cursor-default"
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
                      className="w-full bg-[#20030B]/50 text-[#FFF8ED] placeholder-[#FFF8ED]/45 border border-[#D4AF37]/25 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E8C76A] focus:ring-1 focus:ring-[#E8C76A]/30 transition-all font-cormorant text-lg mb-4"
                    />

                    <label className="font-inter text-[9px] uppercase tracking-widest text-[#D4AF37] mb-1.5 font-bold">
                      Optional Message
                    </label>
                    <textarea
                      placeholder="Write your wishes or special notes..."
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#20030B]/50 text-[#FFF8ED] placeholder-[#FFF8ED]/45 border border-[#D4AF37]/25 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E8C76A] focus:ring-1 focus:ring-[#E8C76A]/30 transition-all font-cormorant text-base mb-6 resize-none"
                    />

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={isSubmitting}
                      onClick={handleButtonClick}
                      className="shine-btn-sweep relative overflow-hidden w-full bg-gradient-to-r from-[#B89742] via-[#F3E7C4] to-[#B89742] text-[#4A081B] font-cormorant font-bold uppercase tracking-wider py-4 rounded-full text-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),0_0_30px_rgba(243,231,196,0.65)] transition-all duration-300 disabled:opacity-75 flex items-center justify-center cursor-pointer border border-[#F3E7C4]/65 select-none"
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
                      className="w-full bg-[#20030B]/50 text-[#FFF8ED] placeholder-[#FFF8ED]/45 border border-[#D4AF37]/25 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E8C76A] focus:ring-1 focus:ring-[#E8C76A]/30 transition-all font-cormorant text-lg mb-4"
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
                      className="w-full bg-[#20030B]/50 text-[#FFF8ED] placeholder-[#FFF8ED]/45 border border-[#D4AF37]/25 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E8C76A] focus:ring-1 focus:ring-[#E8C76A]/30 transition-all font-cormorant text-base mb-6 resize-none"
                    />

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={isSubmitting}
                      onClick={handleButtonClick}
                      className="shine-btn-sweep relative overflow-hidden w-full bg-gradient-to-r from-[#B89742] via-[#F3E7C4] to-[#B89742] text-[#4A081B] font-cormorant font-bold uppercase tracking-wider py-4 rounded-full text-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),0_0_30px_rgba(243,231,196,0.65)] transition-all duration-300 disabled:opacity-75 flex items-center justify-center cursor-pointer border border-[#F3E7C4]/65 select-none"
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
                className="w-full max-w-md bg-gradient-to-br from-[#3D0615] via-[#2D040F] to-[#3D0615] p-8 rounded-[28px] border border-[#D4AF37]/35 shadow-2xl relative overflow-hidden cursor-default text-center"
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
                  className="font-inter text-[10px] uppercase tracking-widest bg-gradient-to-r from-[#D4AF37]/15 to-[#E8C76A]/10 text-[#E8C76A] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/45 rounded-full py-2.5 px-6 transition-colors focus:outline-none cursor-pointer"
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

export default memo(Dua);
