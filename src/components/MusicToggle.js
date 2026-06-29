"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Single shared global audio instance to prevent duplicates and desync
let globalAudio = null;

function getGlobalAudio() {
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

  if (!mounted) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-12 h-12 bg-brand-card/85 backdrop-blur-md border border-brand-gold/35 rounded-full shadow-[0_6px_20px_rgba(75,58,50,0.12)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
        aria-label="Toggle music"
      >
        {isPlaying ? (
          <div className="flex items-center justify-center relative">
            {/* Pulsing glow ring */}
            <div className="absolute inset-[-4px] rounded-full border border-brand-gold/40 animate-ping opacity-30" />
            
            {/* Visualizer Equalizer Lines */}
            <div className="flex gap-[2px] items-end h-4 w-4 justify-center mr-[2px]">
              <span className="w-[2px] bg-brand-gold rounded-full animate-[bounce_0.8s_infinite_0.1s] h-3" />
              <span className="w-[2px] bg-brand-gold rounded-full animate-[bounce_0.5s_infinite_0.3s] h-4" />
              <span className="w-[2px] bg-brand-gold rounded-full animate-[bounce_0.7s_infinite_0s] h-2" />
              <span className="w-[2px] bg-brand-gold rounded-full animate-[bounce_0.6s_infinite_0.2s] h-3" />
            </div>
            <Volume2 className="w-4 h-4 text-brand-gold absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        ) : (
          <VolumeX className="w-4 h-4 text-brand-dark/60 group-hover:text-brand-gold transition-colors duration-200" />
        )}
      </button>
    </div>
  );
}
