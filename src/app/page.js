"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Preloader from "@/components/Preloader";
import GrandOpening from "@/components/GrandOpening";
import MusicToggle from "@/components/MusicToggle";
import Hero from "@/components/Hero";
import Parents from "@/components/Parents";
import ScratchDate from "@/components/ScratchDate";
import Countdown from "@/components/Countdown";
import Venue from "@/components/Venue";
import Dua from "@/components/Dua";
import Footer from "@/components/Footer";

export default function Home() {
  const [status, setStatus] = useState("loading"); // "loading" | "entrance" | "opened"
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Initialize Lenis smooth scroll once the invitation is opened
  useEffect(() => {
    if (status !== "opened") return;

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easeOutExponential
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [status]);

  const handleOpenInvitation = () => {
    setStatus("opened");
    // Start background music immediately upon unlocking
    setIsMusicPlaying(true);
  };

  return (
    <div className="relative w-full min-h-screen bg-brand-bg text-brand-dark selection:bg-brand-gold/30 overflow-x-hidden">
      
      {/* 1. Fullscreen Preloader (Automatic timed loading + completion flash) */}
      <AnimatePresence>
        {status === "loading" && (
          <Preloader onComplete={() => setStatus("entrance")} />
        )}
      </AnimatePresence>

      {/* 2. Floating Background Music Control (Visible after doors swing open) */}
      {status === "opened" && (
        <MusicToggle isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />
      )}

      {/* 3. Grand Entrance double doors split wrapping Scrollable Content */}
      {status !== "loading" && (
        <GrandOpening isOpen={status === "opened"} onOpen={handleOpenInvitation}>
          {status === "opened" && (
            <main className="w-full relative flex flex-col min-h-screen">
              {/* Wedding sections */}
              <Hero />
              <Parents />
              <ScratchDate />
              <Countdown />
              <Venue />
              <Dua />
              <Footer />
            </main>
          )}
        </GrandOpening>
      )}
      
    </div>
  );
}
