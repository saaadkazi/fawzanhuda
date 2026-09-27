"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import GrandOpening from "@/components/GrandOpening";
import MusicToggle from "@/components/MusicToggle";
import Hero from "@/components/Hero";
import Parents from "@/components/Parents";
import ScratchDate from "@/components/ScratchDate";
import Venue from "@/components/Venue";
import Dua from "@/components/Dua";
import Footer from "@/components/Footer";

const ThreeCanvas = dynamic(() => import("@/components/canvas/ThreeCanvas"), {
  ssr: false,
});

export default function Home() {
  const [status, setStatus] = useState("loading"); // "loading" | "entrance" | "opened"
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Initialize Lenis smooth scroll once the invitation is opened
  useEffect(() => {
    if (status !== "opened") return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easeOutExponential
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
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

  return (
    <div className="relative w-full min-h-screen bg-brand-bg text-brand-dark selection:bg-brand-gold/30 overflow-x-hidden">
      {/* Foundational Persistent R3F WebGL Canvas */}
      <ThreeCanvas />

      {/* 1. Fullscreen Preloader (Automatic timed loading + completion flash) */}
      <AnimatePresence>
        {status === "loading" && (
          <Preloader onComplete={() => {
            setStatus("opened");
            setIsMusicPlaying(true);
          }} />
        )}
      </AnimatePresence>

      {/* 2. Floating Background Music Control */}
      {status === "opened" && (
        <MusicToggle isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />
      )}

      {/* 3. Main Scrollable Content */}
      {status !== "loading" && (
        <GrandOpening>
          <main className="w-full relative flex flex-col min-h-screen">
            <Hero />
            <Parents />
            <ScratchDate />
            <Venue />
            <Dua />
            <Footer />
          </main>
        </GrandOpening>
      )}
      
    </div>
  );
}
