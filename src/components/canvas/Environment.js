"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AmbientParticles() {
  const pointsRef = useRef();
  const [particleCount, setParticleCount] = useState(600);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);

    // Responsive budget allocation per specification:
    // Desktop <= 1200, Tablet <= 600, Mobile <= 250
    const updateBudget = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setParticleCount(250);
      } else if (width < 1024) {
        setParticleCount(600);
      } else {
        setParticleCount(1200);
      }
    };

    updateBudget();
    window.addEventListener("resize", updateBudget);
    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", updateBudget);
    };
  }, []);

  // Generate soft circular particle texture dynamically
  const particleTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(252, 246, 186, 0.95)"); // Champagne gold core
    gradient.addColorStop(0.4, "rgba(232, 199, 106, 0.4)"); // Warm gold glow
    gradient.addColorStop(1, "rgba(232, 199, 106, 0)"); // Soft edge fade

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Generate initial particle positions and individual GPU animation attributes
  const [positions, speeds, factors] = useMemo(() => {
    const pos = new Float32Array(1200 * 3);
    const spd = new Float32Array(1200);
    const fct = new Float32Array(1200);

    for (let i = 0; i < 1200; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

      spd[i] = 0.2 + Math.random() * 0.3;
      fct[i] = Math.random() * 100;
    }

    return [pos, spd, fct];
  }, []);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 18.0 },
        uTexture: { value: particleTexture },
        uColor: { value: new THREE.Color("#FCF6BA") },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uSize;
        attribute float aSpeed;
        attribute float aFactor;

        void main() {
          vec3 pos = position;
          float yOffset = uTime * aSpeed;
          pos.y = mod(pos.y + yOffset + 8.0, 16.0) - 8.0;
          pos.x += sin(uTime * 0.4 + aFactor) * 0.12;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = uSize * (30.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec3 uColor;

        void main() {
          vec4 texColor = texture2D(uTexture, gl_PointCoord);
          gl_FragColor = vec4(uColor, texColor.a * 0.65);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [particleTexture]);

  // Update draw range when particle count budget changes
  useEffect(() => {
    if (pointsRef.current && pointsRef.current.geometry) {
      pointsRef.current.geometry.setDrawRange(0, particleCount);
    }
  }, [particleCount]);

  // GPU Shader Time Uniform update (Single float update per frame)
  useFrame((state) => {
    if (shaderMaterial && !prefersReducedMotion) {
      shaderMaterial.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1200}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          count={1200}
          array={speeds}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aFactor"
          count={1200}
          array={factors}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} attach="material" />
    </points>
  );
}

export default function Environment() {
  return (
    <group name="global-environment">
      {/* 1. Global Warm Ambient Base Light */}
      <ambientLight color="#3A1A24" intensity={0.6} />

      {/* 2. Key Light — Directional Warm Gold (3000K target) */}
      <directionalLight
        color="#FCF6BA"
        intensity={2.0}
        position={[5, 10, 7]}
      />

      {/* 3. Rim Light — Champagne Gold (4500K target) */}
      <directionalLight
        color="#FFF0D6"
        intensity={1.5}
        position={[-5, 5, -5]}
      />

      {/* 4. Fill Light — Subtle Burgundy Fill */}
      <directionalLight
        color="#4A081B"
        intensity={0.4}
        position={[0, -5, 5]}
      />

      {/* 5. Ambient Floating Gold Dust Particles */}
      <AmbientParticles />
    </group>
  );
}
