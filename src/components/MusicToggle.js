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
      audio.dataset.playing = isPlaying ? "true" : "false";
    }

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      // Clean up / pause the audio on HMR or component unmount
      const audioToPause = getGlobalAudio();
      if (audioToPause) {
        audioToPause.pause();
      }
    };
  }, []);

  // Sync actual HTML5 Audio playback state with the React isPlaying prop
  useEffect(() => {
    const audio = getGlobalAudio();
    if (!audio) return;

    // Track state on custom DOM property for event listener check
    audio.dataset.playing = isPlaying ? "true" : "false";
    const targetVolume = 0.35; // Soft background level

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    if (isPlaying) {
      // Trigger play if paused
      if (audio.paused) {
        audio.play().catch((err) => {
          console.log("Audio play blocked by browser autoplay policy:", err);
          setIsPlaying(false);
        });
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

  // Scroll background color brightness listener (Theme Adaptive)
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll("section, footer");
      let currentBgIsDark = true; // Default to dark (Hero)

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Check if this element covers the top-right viewport corner (y = 40px)
        if (rect.top <= 40 && rect.bottom >= 40) {
          const className = el.className || "";
          // Ivory light backgrounds contain from-[#FFFDF9] or similar light stop classes
          if (className.includes("from-[#FFFDF9]") || className.includes("from-[#FFFDF5]")) {
            currentBgIsDark = false; // Background is light
          } else {
            currentBgIsDark = true; // Background is dark
          }
        }
      });

      setIsThemeDark(currentBgIsDark);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run immediately on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  // Resolve dynamic styles based on background theme for inverted contrast
  const buttonStyle = isThemeDark
    ? {
        // Background is dark -> Button is light (ivory glass)
        container: `bg-[#FFF8ED]/85 border-[#D4AF37]/50 ${
          isPlaying 
            ? "shadow-[0_0_20px_rgba(212,175,55,0.35),_0_8px_32px_rgba(74,8,27,0.18)]" 
            : "shadow-[0_8px_32px_rgba(74,8,27,0.12)]"
        }`,
        subText: "text-[#4A081B]/60",
        mainText: isPlaying ? "text-[#856124]" : "text-[#4A081B]/80",
        icon: "text-[#4A081B]",
        eqBar: "bg-[#856124]",
        ping: "bg-[#D4AF37]",
        pingBorder: "border-[#D4AF37]",
      }
    : {
        // Background is light -> Button is dark (mocha/burgundy glass)
        container: `bg-[#4A081B]/95 border-[#E8C76A]/60 ${
          isPlaying 
            ? "shadow-[0_0_20px_rgba(232,199,106,0.45),_0_8px_32px_rgba(0,0,0,0.3)]" 
            : "shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        }`,
        subText: "text-[#FFF8ED]/60",
        mainText: isPlaying ? "text-[#E8C76A] drop-shadow-[0_0_8px_rgba(232,199,106,0.5)]" : "text-[#FFF8ED]/70",
        icon: "text-[#FFF8ED]",
        eqBar: "bg-[#E8C76A]",
        ping: "bg-[#E8C76A]",
        pingBorder: "border-[#E8C76A]",
      };

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center cursor-pointer border transition-all duration-500 ease-in-out ${buttonStyle.container}`}
        aria-label="Toggle music"
      >
        {/* Equalizer / Icon side */}
        <div className="flex items-center justify-center w-5 h-5 relative transition-colors duration-500">
          {isPlaying ? (
            /* Animated Equalizer Bars when ON */
            <div className="flex gap-[2px] items-end h-3.5 w-4 justify-center">
              <span className={`w-[1.5px] rounded-full animate-[bounce_0.8s_infinite_0.1s] h-3 transition-all duration-500 ${buttonStyle.eqBar}`} />
              <span className={`w-[1.5px] rounded-full animate-[bounce_0.5s_infinite_0.3s] h-3.5 transition-all duration-500 ${buttonStyle.eqBar}`} />
              <span className={`w-[1.5px] rounded-full animate-[bounce_0.7s_infinite_0s] h-2.2 transition-all duration-500 ${buttonStyle.eqBar}`} />
              <span className={`w-[1.5px] rounded-full animate-[bounce_0.6s_infinite_0.2s] h-2.8 transition-all duration-500 ${buttonStyle.eqBar}`} />
            </div>
          ) : (
            /* Muted Speaker Icon when OFF */
            <VolumeX className={`w-3.5 h-3.5 transition-colors duration-500 ${buttonStyle.icon}`} />
          )}
        </div>

        {/* Active Ping Glow indicator */}
        {isPlaying && (
          <span className={`absolute inset-0 rounded-full border animate-ping opacity-35 pointer-events-none transition-colors duration-500 ${buttonStyle.pingBorder}`} />
        )}
      </motion.button>
    </div>
  );
}
