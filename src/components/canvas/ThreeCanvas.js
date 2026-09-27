"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import Environment from "./Environment";

export default function ThreeCanvas() {
  const [dpr, setDpr] = useState(1);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    // Dynamic DPR setup respecting specification quality contract
    const updateDpr = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDpr(1); // Mobile: Fixed 1.0 DPR
      } else if (width < 1024) {
        setDpr(Math.min(window.devicePixelRatio || 1, 1.5)); // Tablet: Max 1.5 DPR
      } else {
        setDpr(Math.min(window.devicePixelRatio || 1, 2)); // Desktop: Max 2.0 DPR
      }
    };

    updateDpr();
    window.addEventListener("resize", updateDpr);
    return () => window.removeEventListener("resize", updateDpr);
  }, []);

  useEffect(() => {
    const heroEl = document.getElementById("hero-section");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      style={{ display: isHeroVisible ? "block" : "none" }}
    >
      <Canvas
        frameloop={isHeroVisible ? "always" : "never"}
        dpr={dpr}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <PerspectiveCamera
          makeDefault
          fov={45}
          near={0.1}
          far={1000}
          position={[0, 0, 5]}
        />
        <Environment />
      </Canvas>
    </div>
  );
}
