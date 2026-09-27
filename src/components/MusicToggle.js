"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

// Single shared global audio instance to prevent duplicates and desync
let globalAudio = null;

export function getGlobalAudio() {
  if (typeof window === "undefined") return null;
  if (!globalAudio) {
    globalAudio = new Audio("/song.mp3");
    globalAudio.loop = true;
    globalAudio.preload = "auto";
    globalAudio.volume = 0; // Start at 0 and fade in programmatically
  }
  return globalAudio;
}

export default function MusicToggle({ isPlaying, setIsPlaying }) {
  const [mounted, setMounted] = useState(false);
  const [isThemeDark, setIsThemeDark] = useState(true); // Default to dark section (Hero)
  const fadeIntervalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const audio = getGlobalAudio();
    if (audio) {
      const isActuallyPlaying = Boolean(!audio.paused);
      if (isActuallyPlaying !== isPlaying) {
        setIsPlaying(isActuallyPlaying);
      }
    }

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  // Sync actual HTML5 Audio playback state with the React isPlaying prop
  useEffect(() => {
    const audio = getGlobalAudio();
    if (!audio) return;

    audio.dataset.playing = isPlaying ? "true" : "false";
    const targetVolume = 0.35; // Soft background level

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    let isListening = false;

    // Passive listener for any user interaction (scroll/touch) to resume audio if blocked earlier
    const handlePassiveUnlock = () => {
      if (!audio) return;
      if (audio.paused && audio.dataset.playing === "true") {
        const p = audio.play();
        if (p !== undefined) {
          p.then(() => {
            setIsPlaying(true);
            removeInteractionListeners();
          }).catch(() => {});
        }
      }
    };

    const addInteractionListeners = () => {
      if (isListening) return;
      isListening = true;
      window.addEventListener("pointerdown", handlePassiveUnlock, { capture: true, passive: true });
      window.addEventListener("touchstart", handlePassiveUnlock, { capture: true, passive: true });
      window.addEventListener("click", handlePassiveUnlock, { capture: true, passive: true });
      window.addEventListener("scroll", handlePassiveUnlock, { capture: true, passive: true });
    };

    const removeInteractionListeners = () => {
      if (!isListening) return;
      isListening = false;
      window.removeEventListener("pointerdown", handlePassiveUnlock, { capture: true });
      window.removeEventListener("touchstart", handlePassiveUnlock, { capture: true });
      window.removeEventListener("click", handlePassiveUnlock, { capture: true });
      window.removeEventListener("scroll", handlePassiveUnlock, { capture: true });
    };

    if (isPlaying) {
      if (audio.paused) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              audio.dataset.playing = "true";
              removeInteractionListeners();
            })
            .catch((err) => {
              console.log("Autoplay waiting for user gesture:", err);
              audio.dataset.playing = "true"; // Keep intent to play on gesture
              addInteractionListeners();
            });
        }
      }

      // Smooth volume fade-in
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume < targetVolume) {
          audio.volume = Math.min(audio.volume + 0.02, targetVolume);
        } else {
          clearInterval(fadeIntervalRef.current);
        }
      }, 50);
    } else {
      removeInteractionListeners();
      
      // Smooth volume fade-out and pause
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > 0.03) {
          audio.volume = Math.max(audio.volume - 0.04, 0);
        } else {
          audio.volume = 0;
          audio.pause();
          clearInterval(fadeIntervalRef.current);
        }
      }, 30);
    }

    return () => {
      removeInteractionListeners();
    };
  }, [isPlaying, setIsPlaying]);

  // Centralized tab visibility change listener to pause background audio when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = getGlobalAudio();
      if (!audio) return;

      if (document.hidden) {
        audio.pause();
      } else {
        if (isPlaying && audio.paused) {
          audio.play().catch((e) => console.log("Visibility resume failed:", e));
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  // Theme detection using IntersectionObserver to eliminate scroll-driven reflows
  useEffect(() => {
    const lightSection = document.getElementById("parents-section");
    if (!lightSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsThemeDark(!entry.isIntersecting);
      },
      {
        rootMargin: "-60px 0px -40% 0px",
        threshold: 0,
      }
    );

    observer.observe(lightSection);
    return () => observer.disconnect();
  }, []);

  // Direct toggle click handler - executes audio.play() synchronously inside user click
  const handleToggleClick = () => {
    const audio = getGlobalAudio();
    if (!audio) return;

    if (!isPlaying || audio.paused) {
      audio.dataset.playing = "true";
      audio.volume = 0.35;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log("User toggle play failed:", err);
            setIsPlaying(false);
          });
      } else {
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(false);
    }
  };

  if (!mounted) return null;

  // Resolve dynamic styles based on background theme for inverted contrast
  const buttonStyle = isThemeDark
    ? {
      // Background is dark -> Button is light (ivory pill with burgundy/gold accents)
      container: `bg-[#FFF8ED]/95 border-[#D4AF37]/60 ${isPlaying
          ? "shadow-[0_0_20px_rgba(212,175,55,0.35),_0_6px_24px_rgba(74,8,27,0.2)]"
          : "shadow-[0_6px_20px_rgba(74,8,27,0.14)]"
        }`,
      badgeBg: "bg-[#4A081B] border-[#D4AF37]/50",
      titleText: "text-[#4A081B]",
      statusText: isPlaying ? "text-[#856124]" : "text-[#4A081B]/55",
      icon: "text-[#FCF6BA]",
      eqBar: "bg-[#D4AF37]",
      pingBorder: "border-[#D4AF37]/40",
    }
    : {
      // Background is light -> Button is dark (burgundy velvet pill with gold accents)
      container: `bg-[#4A081B]/95 border-[#D4AF37]/60 ${isPlaying
          ? "shadow-[0_0_24px_rgba(232,199,106,0.4),_0_6px_24px_rgba(0,0,0,0.3)]"
          : "shadow-[0_6px_20px_rgba(0,0,0,0.22)]"
        }`,
      badgeBg: "bg-[#310411] border-[#D4AF37]/60",
      titleText: "text-[#FCF6BA]",
      statusText: isPlaying ? "text-[#E8C76A]" : "text-[#FFF8ED]/50",
      icon: "text-[#FCF6BA]",
      eqBar: "bg-[#E8C76A]",
      pingBorder: "border-[#E8C76A]/40",
    };

  return (
    <div className="fixed top-4 right-4 z-50 select-none">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleToggleClick}
        className={`h-9 px-3 rounded-full md:backdrop-blur-md flex items-center gap-2 cursor-pointer border transition-all duration-500 ease-in-out relative group ${buttonStyle.container}`}
        aria-label="Toggle music"
      >
        {/* Left Circular Medallion Badge */}
        <div className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-inner transition-colors duration-500 relative z-10 ${buttonStyle.badgeBg}`}>
          {isPlaying ? (
            /* Animated Equalizer Bars when ON */
            <div className="flex gap-[2px] items-end h-3 w-3 justify-center">
              <span className={`w-[1.5px] rounded-full animate-[bounce_0.8s_infinite_0.1s] h-3 transition-all duration-500 ${buttonStyle.eqBar}`} />
              <span className={`w-[1.5px] rounded-full animate-[bounce_0.5s_infinite_0.3s] h-3.5 transition-all duration-500 ${buttonStyle.eqBar}`} />
              <span className={`w-[1.5px] rounded-full animate-[bounce_0.7s_infinite_0s] h-2 transition-all duration-500 ${buttonStyle.eqBar}`} />
            </div>
          ) : (
            /* Muted Speaker Icon when OFF */
            <VolumeX className={`w-3 h-3 transition-colors duration-500 ${buttonStyle.icon}`} />
          )}
        </div>

        {/* Right Label & Status Text */}
        <div className="flex flex-col items-start text-left leading-none pr-0.5 relative z-10">
          <span className={`font-cormorant text-[10.5px] font-bold tracking-[0.22em] uppercase transition-colors duration-500 ${buttonStyle.titleText}`}>
            Music
          </span>
          <span className={`font-inter text-[7.5px] tracking-[0.18em] uppercase font-semibold transition-colors duration-500 ${buttonStyle.statusText}`}>
            {isPlaying ? "Playing" : "Muted"}
          </span>
        </div>

        {/* Active Soft Pulse Ring when playing */}
        {isPlaying && (
          <span className={`absolute inset-0 rounded-full border animate-pulse opacity-40 pointer-events-none transition-colors duration-500 ${buttonStyle.pingBorder}`} />
        )}
      </motion.button>
    </div>
  );
}
