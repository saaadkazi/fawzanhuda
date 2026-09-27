# FAUZAN & HUDA — 3D MASTER SPECIFICATION

Status: BASELINE / IMPLEMENTATION AUTHORITY  
Version: 1.0  
Mode: Progressive 3D Upgrade  
Implementation Status: NOT STARTED  
Source Documents:  
- `wedding_invitation_audit.md`  
- `3d_master_architecture_plan.md`  

"This document is the authoritative specification for all future 3D upgrades of the Fauzan & Huda wedding invitation."

---

## SECTION 1 — PROJECT IDENTITY

### Project Name & Purpose
* **Project Name**: Fauzan & Huda Blessed Nikah Ceremony Invitation (`temp_next` / `fauzanhuda`)
* **Purpose**: A luxury interactive web invitation for the Nikah ceremony of Fauzan & Huda, taking place on **December 9, 2026** at Elly Kadoorie Hall, Mazgaon, Mumbai.
* **Experience Concept**: An illuminated, handcrafted **Royal Islamic Wedding Pavilion** that opens like a physical invitation card and transforms into a cinematic 3D visual world.

### Current State vs Target State

#### CURRENT STATE
* Uses Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, GSAP, Lenis, Web Audio API, and 2D HTML5 Canvas.
* Visual 3D effects are currently simulated via **CSS 3D matrix transforms** (`perspective: 1600px`, `transform-style: preserve-3d`, `rotateX`, `rotateY`) and 2D Canvas erasing.
* **EXPLICIT STATUS**: The project currently contains **NO real Three.js, React Three Fiber (`R3F`), Drei, or WebGL rendering pipeline**.

#### TARGET STATE
* A hybrid **DOM + WebGL Architecture** powered by Three.js, `@react-three/fiber`, and `@react-three/drei`.
* A single persistent background WebGL Canvas rendering 3D environmental architecture (Mihrab arches, PBR gold filigree, swaying 3D lanterns, 3D paper envelope folding, shader date tiles, and fracturing wax seals).
* Text, typography, forms, and navigation buttons remain $100\%$ crisp in the DOM overlay layer, maintaining accessibility and zero mobile input lag.

---

## SECTION 2 — CURRENT TECHNOLOGY BASELINE

| Technology | Verified Version | Current Responsibility | Migration Action |
|---|---|---|---|
| **Next.js** | `16.2.9` | App Router framework, SSR/SSG, layout management, Google Fonts optimization (`Cinzel`, `Cormorant Garamond`, `Inter`, `Amiri`). | **KEEP** |
| **React** | `19.2.4` | Component lifecycle, state machine (`status`), hooks, React Portals (`createPortal`). | **KEEP** |
| **Tailwind CSS** | `^4.0.0` (`@tailwindcss/postcss`) | CSS theme tokens (`@theme`), responsive layout utilities, keyframes, scrollbar styling. | **KEEP** |
| **Framer Motion** | `^12.42.0` | Reactive DOM motion, mouse spring parallax (`useSpring`, `useMotionValue`), list staggers, AnimatePresence transitions. | **KEEP** |
| **GSAP** | `^3.15.0` | Sequenced envelope unsealing timeline animation (`GrandOpening.js`). | **KEEP + EXTEND** |
| **Lenis** | `^1.3.25` | Smooth inertial scroll engine bound to browser RAF loop once opened. | **KEEP** |
| **Web Audio API** | Native Browser API | Programmatic sound synthesis ([audioSynth.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/utils/audioSynth.js)) for taps, lock clicks, hinge creaks, wind hums, and chimes. | **KEEP (Authoritative)** |
| **HTML5 Canvas** | Native Browser API | 2D scratch tile erasing context (`ScratchDate.js`). | **PARTIALLY REPLACE** (Upgrade to R3F Shaders) |
| **canvas-confetti** | `^1.9.4` | High-performance 2D celebration confetti bursts. | **KEEP** |
| **Lucide React** | `^1.21.0` | UI icons (`Volume2`, `VolumeX`, `MapPin`, `Navigation`). | **KEEP** |

---

## SECTION 3 — FUTURE 3D TECHNOLOGY STACK

### Core Approved Dependencies
1. **`three`** (`^0.170.0`): Core WebGL rendering engine.
2. **`@react-three/fiber`** (`^9.0.0`): Declarative React renderer for Three.js.
3. **`@react-three/drei`** (`^9.120.0`): Production utilities (`useGLTF`, `Environment`, `PerspectiveCamera`, `Float`, `InstancedMesh`).

### Technologies EXPLICITLY EXCLUDED from Initial Architecture
* **Heavy Physics Engines** (`@react-three/rapier`, `cannon-es`): Omitted to prevent CPU/memory overhead on mobile devices. Rigid-body physics is replaced with deterministic shader/GSAP keyframing.
* **Heavy Post-Processing** (`@react-three/postprocessing`): Omitted to protect mobile GPU frame rates. Custom GLSL shaders and CSS backdrops handle lighting glow.
* **Unnecessary Shader Complexity**: Excessive Raymarching or complex volumetric noise shaders are prohibited.

---

## SECTION 4 — ARCHITECTURAL PRINCIPLE

The application operates on a **Single Persistent Background WebGL Canvas** anchored behind a crisp DOM UI overlay.

```
                                  ┌─────────────────────────┐
                                  │      USER / BROWSER     │
                                  └────────────┬────────────┘
                                               │
                                               ▼
                                  ┌─────────────────────────┐
                                  │   NEXT.JS / REACT APP   │
                                  └────────────┬────────────┘
                                               │
                                               ▼
                                  ┌─────────────────────────┐
                                  │ APP STATE (src/app/page)│
                                  │ ("loading"/"entrance"/  │
                                  │        "opened")        │
                                  └──────┬───────────┬──────┘
                                         │           │
                     ┌───────────────────┘           └───────────────────┐
                     ▼                                                   ▼
┌───────────────────────────────────────────┐     ┌───────────────────────────────────────────┐
│              DOM UI LAYER                 │     │          PERSISTENT R3F CANVAS            │
│  - MusicToggle (Floating HUD)             │     │  - Master Camera Controller (Lenis Sync)  │
│  - Typography (Names, Dates, Calligraphy) │ ◄───┤  - Unified Warm Lighting Rig              │
│  - RSVP Forms & Glassmorphic Modals       │     │  - Instanced Particle System              │
│  - Google Maps Navigation CTA             │     │  - Section 3D Scene Nodes (0 to 6)        │
└───────────────────────────────────────────┘     └───────────────────────────────────────────┘
                     │                                                   │
                     └───────────────────┬───────────────────────────────┘
                                         │
                                         ▼
                                  ┌─────────────────────────┐
                                  │   NATIVE WEB AUDIO API  │
                                  │  (Chimes, Taps, Creaks) │
                                  └─────────────────────────┘
```

---

## SECTION 5 — DOM VS WEBGL CONTRACT

### Categorization Rules

#### 1. DOM LAYER (Must Always Remain HTML/CSS)
* Bride & Groom Names (`"Fauzan"`, `"Huda"`)
* Arabic Calligraphy & Quranic Blessings (`بِسْمِ ٱللَّٰهِ...`, `بَارَكَ ٱللَّٰهُ...`)
* Wedding Information (Date, Address, Family Names, Timings)
* RSVP Forms, Text Input Fields, and Submit Buttons
* Floating Music Toggle Button
* Google Maps Navigation Link (`"Open Google Maps"`)
* Accessibility ARIA trees and screen reader text

*Reason*: Text rendering in DOM guarantees $100\%$ sharpness across high-DPI screens, enables native text selection, preserves mobile form accessibility, and prevents WebGL resolution blur.

#### 2. WEBGL LAYER (True 3D Elements)
* 3D Envelope Geometry, Folding Flaps, and Interior Pocket
* 3D Mihrab Arch Architecture & Wall Niches
* 3D Swaying Palace Lanterns & Dynamic Point Lights
* Instanced Gold Dust Particles & Ambient Fog
* 3D Carved Marble Plaque Surfaces
* 3D Stylized Location Miniature / Palace Model
* 3D PBR Materials (Gold Filigree, Velvet, Paper Grain, Marble, Wax)

*Reason*: Provides deep physical depth, dynamic light falloff, realistic metallic reflections, and volumetric spatial atmosphere.

#### 3. HYBRID LAYER (DOM Anchored to WebGL Coordinates)
* **Hero Section**: 3D Mihrab Arch & Lantern Scene (WebGL) + Groom/Bride Names Typography (DOM).
* **Scratch Date**: 3D Shader-Masked Tiles (WebGL) + Date Digits & Flip Clock Numbers (DOM).
* **Venue**: 3D Stylized Palace Miniature (WebGL) + Address & Navigation CTA (DOM).
* **Royal Seal**: 3D Wax Medallion Fracture (WebGL) + Arabic Blessing Text Card (DOM).

**CRITICAL RULE**: Never move critical readable text into WebGL geometry purely for 3D effect.

---

## SECTION 6 — VISUAL DESIGN LANGUAGE

### Color Palette
* **Deep Burgundy / Royal Maroon**: `#4A081B` (Deep Velvet), `#6D0F2A` (Royal Burgundy), `#2A000C` (Dark Wine Void), `#1A0208` (Palace Base).
* **Warm Ivory / Cream**: `#F6EBDD` (Ivory Base), `#FFF8ED` (Warm White), `#FFFDF9` (Card Surface), `#FAF5EC` (Parchment).
* **Champagne Gold**: `#D4AF37` (Metallic Gold), `#E8C76A` (Illuminated Gold Glow), `#FCF6BA` (Champagne Highlight), `#FFF0D6` (Golden Spark).
* **Antique Bronze**: `#856124` (Engraved Inset), `#B38728` (Brushed Gold), `#BF953F` (Bevel Stop).

### Material Aesthetics
* **Ivory Paper**: Fine linen bump map ($0.02$ scale), matte roughness ($0.65$), warm white diffuse.
* **Burgundy Velvet**: Soft ruby micro-fiber sheen falloff, high roughness ($0.85$), deep wine diffuse.
* **Brushed Champagne Gold**: High metallic ($0.95$), low roughness ($0.15$), clearcoat ($1.0$).
* **Carved Marble**: White alabaster base with subtle gold veining texture maps.
* **Stamp Wax**: Translucent subsurface scattering ($0.1$), dark red wine hue (`#4A081B`).

### Architectural & Atmospheric Language
* **Geometry**: Pointed Mihrab arches, Rub el Hizb 8-pointed star rosettes, arabesque filigree.
* **Lighting**: Warm key light ($3000\text{K}$), gold rim light ($4500\text{K}$), ruby fill light ($2200\text{K}$), flickering lantern cores.

---

## SECTION 7 — STRICT VISUAL RULES

1. Gold must look metallic with specular reflections (`metalness: 0.95`, `roughness: 0.15`), never flat yellow plastic.
2. Burgundy must remain deep and velvet-like (`#4A081B`), never bright neon red.
3. Ivory paper must remain warm (`#FFFDF9`), never cool blue-white.
4. 3D geometry must support typography, never overpower or obscure it.
5. Islamic geometric patterns must remain elegant, restrained, and authentic.
6. No generic sci-fi, HUD, or cyber WebGL visual effects.
7. No random floating 3D objects unrelated to the wedding theme.
8. No excessive bloom or blinding lens flares.
9. No disorienting $360^\circ$ camera spins or camera shake exceeding $\pm 3^\circ$.
10. No visual effect may reduce text readability or accessibility.
11. Wedding content (names, dates, address, family titles) must not be altered.
12. No 3D feature should be added merely because it is technically possible.
13. Physical materials must use believable PBR lighting.
14. All motion must feel cinematic, smooth, and physical.
15. Mobile usability always takes precedence over 3D visual complexity.

---

## SECTION 8 — GLOBAL 3D SCENE ARCHITECTURE

The global 3D scene consists of:
* **Persistent R3F Canvas**: Mounted behind DOM in `src/app/page.js`.
* **Master Camera Controller**: `PerspectiveCamera` ($FOV = 45^\circ$, `near = 0.1`, `far = 1000`) with Y-axis translation bound to Lenis scroll progress via `THREE.MathUtils.lerp`.
* **Unified Lighting Rig**: Directional warm key light + champagne rim light + burgundy ambient fill.
* **Instanced Particle System**: Single `InstancedMesh` buffer rendering floating gold dust particles globally across all sections.
* **State Bridge**: React Context / Zustand store connecting Next.js `status` state (`"loading"` -> `"entrance"` -> `"opened"`) to WebGL scene visibility.

---

## SECTION 9 — SECTION-BY-SECTION 3D SPECIFICATION

### Summary Scene Map

```
Y =  100  -> Node 0: Preloader / Entrance Envelope
Y =    0  -> Node 1: Hero Mihrab Arch Pavilion
Y =  -30  -> Node 2: Family Memorial Niche
Y =  -60  -> Node 3: Union Date Scratch Altar
Y =  -90  -> Node 4: Venue Miniature Courtyard
Y = -120  -> Node 5: Prayer Chamber (RSVP)
Y = -150  -> Node 6: Royal Seal Footpiece
```

---

## SECTION 10 — GRAND OPENING SPECIFICATION

### Envelope & Unsealing Concept
* **Current State**: CSS 3D matrix transform (`rotateX: -165deg`) animated via GSAP.
* **Target 3D State**: Real 3D procedural/hybrid GLTF envelope model with rigged 3D paper flaps, PBR velvet texture, and fracturing wax seal medallion.
* **3D Objects**: Envelope base box, 4 triangular folding flaps with single-bone joints, 3D wax seal medallion.
* **Materials**: Textured Ivory Paper, PBR Burgundy Velvet, Gold Beveled Foil Creases.
* **Lighting**: Focused warm spotlight (`#FCF6BA`, intensity 2.5) + Champagne rim light.
* **Camera**: Pinned at `[0, 0, 4.5]`. Dollies forward to `[0, 0, 1.2]` upon unsealing.
* **Sequence**: Seal tap -> Metallic tap sound -> Lock click & spark burst -> Top flap rotates -165° -> Card rises -> Camera portal zoom.
* **Regression Requirement**: Mobile devices bypass complex 3D flap physics and execute a clean 0.5s 2D opacity fade-out.

---

## SECTION 11 — HERO SPECIFICATION

### Mihrab Arch Pavilion
* **Current State**: Flat card centerpiece with CSS spring tilt and floating CSS particles.
* **Target 3D State**: Extruded 3D Islamic Mihrab Arch pavilion with 2 swaying 3D lanterns casting dynamic point lights, warm light rays, and instanced gold particles.
* **3D Objects**: Extruded 3D Mihrab Arch (`Z: -1.5`), 2 Swaying Lanterns (`X: -2.2` & `X: 2.2`), Centerpiece Card (`Z: 0`).
* **DOM Elements**: Groom & Bride names ("Fauzan" & "Huda"), wedding date, "Together with their families", "TAP TO ENTER" button.
* **Parallax**: Mouse spring tilt clamped to $\pm 3.5^\circ$ on desktop; disabled on mobile.

---

## SECTION 12 — PARENTS SPECIFICATION

### Family Memorial Architecture Niche
* **Current State**: 2 arched cards + Marhoom grandfather legacy plaque.
* **Target 3D State**: 3D Carved White Alabaster Plaque with gold inlay lettering honoring Marhoom Zainuddin Kadir Kazi + 2 symmetrical 3D arched wall panels.
* **Tone**: Formal, respectful, stately. Light warm shadows simulate real marble and gold.
* **DOM Elements**: All parent names and family titles stay $100\%$ DOM text.

---

## SECTION 13 — SCRATCH DATE SPECIFICATION

### Shader-Masked 3D Tiles
* **Current State**: 2D HTML5 Canvas erasing (`destination-out`).
* **Target 3D State**: 3 Beveled 3D Date Tiles (Day, Month, Year). Touch/drag draws onto a WebGL render target texture; fragment shader discards top burgundy wax layer, revealing 3D gold base layer underneath.
* **Interaction**: Scratching releases WebGL gold fragments under gravity. 100% reveal triggers $360^\circ$ Y-axis tile flip + `canvas-confetti` burst.
* **Countdown Clock**: Flip-clock numbers remain crisp DOM text inside 3D casing.

---

## SECTION 14 — VENUE SPECIFICATION

### Stylized Location Miniature
* **Current State**: Static PNG map preview image (`map_preview.png`).
* **Target 3D State**: Low-poly 3D palace building miniature set on a circular marble baseplate with warm sunset key lighting.
* **Functional Guarantee**: Clicking the 3D model rotates it $45^\circ$. The primary **"Open Google Maps"** CTA remains a high-contrast DOM button for instant navigation.

---

## SECTION 15 — RSVP / DUA SPECIFICATION

### Night Prayer Chamber
* **Current State**: Glassmorphic form card with background spark particles.
* **Target 3D State**: Deep ruby-dark night backdrop with floating 3D WebGL prayer light orbs.
* **Form Protection**: Form inputs (`<input>`, `<textarea>`) reside entirely in the DOM layer with a glassmorphic background. 3D geometry exists strictly behind the form, ensuring zero input lag or touch interference.

---

## SECTION 16 — ROYAL SEAL SPECIFICATION

### Controlled 3D Medallion Fracture
* **Current State**: HTML circular button with SVG stroke ring and CSS split.
* **Target 3D State**: 3D Wax Medallion pre-sectioned into two interlocking halves.
* **Interaction**: Touch-and-hold for 1.5s drives a shader progress uniform, increasing vertex vibration shake. At 100%, the two halves rotate and slide outward ($X: -1.5$ & $X: +1.5$), exposing the inner Arabic blessing card (`BarakAllahu Lakuma...`).
* **Physics Note**: Uses deterministic animation keyframing rather than heavy rigid-body physics.

---

## SECTION 17 — CAMERA SYSTEM

* **Camera Type**: `THREE.PerspectiveCamera` ($FOV = 45^\circ$, `near = 0.1`, `far = 1000`).
* **Scroll Synchronization**: Bound to Lenis scroll progress via `THREE.MathUtils.lerp(cam.position.y, targetY, delta * 4.0)`.
* **Damping**: Smooth lerp damping prevents visual judder.
* **Mobile Adjustments**: Camera pitch/roll disabled on mobile ($0^\circ$).

---

## SECTION 18 — LIGHTING SYSTEM

* **Key Light**: Directional Warm Gold ($3000\text{K}$, intensity $2.0$) at `[5, 10, 7]`.
* **Rim Light**: Champagne Gold ($4500\text{K}$, intensity $3.5$) at `[-5, 5, -5]`.
* **Fill Light**: Ambient Ruby ($2200\text{K}$, intensity $0.4$).
* **Lantern Lights**: Point lights inside lanterns ($15\text{W}$, flickering via noise modulation).

---

## SECTION 19 — MATERIAL SYSTEM

All materials utilize standard PBR parameters:
* `Ivory Paper`: `MeshStandardMaterial` (`roughness: 0.65`, `metalness: 0.05`).
* `Burgundy Velvet`: `MeshStandardMaterial` (`roughness: 0.85`, `metalness: 0.10`, `sheen: 1.0`).
* `Brushed Gold`: `MeshPhysicalMaterial` (`roughness: 0.15`, `metalness: 0.95`, `clearcoat: 1.0`).
* `Carved Marble`: `MeshStandardMaterial` (`roughness: 0.25`, `metalness: 0.05`).
* `Stamp Wax`: `MeshPhysicalMaterial` (`roughness: 0.35`, `metalness: 0.20`, `transmission: 0.1`).

---

## SECTION 20 — PARTICLE SYSTEM

GPU Instanced Mesh Particle Budgets:
* **Desktop (High)**: 1,200 particles + volumetric fog.
* **Tablet (Medium)**: 600 particles + soft fog.
* **Mobile (Low)**: 250 particles (no fog).
* **Reduced Motion**: 0 particles (ambient gradient background).

---

## SECTION 21 — RESPONSIVE QUALITY CONTRACT

| Device Tier | Target Quality | DPR Limit | Shadow Maps | Particle Budget | 3D Flaps |
|---|---|---|---|---|---|
| **Desktop** | High | $2.0$ | $2048 \times 2048$ | 1,200 | Full 3D Fold |
| **Tablet** | Medium | $1.5$ | $1024 \times 1024$ | 600 | Simplified 3D |
| **Mobile** | Low | $1.0$ (Fixed) | Disabled (Baked AO) | 250 | Fast 2D Fade |

---

## SECTION 22 — AUDIO CONTRACT

Native Web Audio API synthesizer ([audioSynth.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/utils/audioSynth.js)) is **authoritative**:
* `playMetallicTap()` -> Medallion click onset.
* `playLockClick()` -> Wax seal break.
* `playHingeCreak()` -> Top 3D flap fold.
* `playWhoosh()` -> Camera portal zoom.
* `playChime()` -> Date reveal flip & preloader 100%.

---

## SECTION 23 — EXISTING TECHNOLOGY PRESERVATION

* **KEEP**: Next.js, React, Tailwind CSS, Framer Motion, GSAP, Lenis, Web Audio API, `canvas-confetti`, Lucide React.
* **EXTEND**: GSAP (bound to R3F camera keyframing).
* **PARTIALLY REPLACE**: HTML5 2D Canvas in `ScratchDate.js` (upgraded to R3F shaders).

---

## SECTION 24 — PERFORMANCE CONTRACT

* Lazy load WebGL Canvas via `next/dynamic` with `{ ssr: false }`.
* Compress all 3D GLTF assets using Draco compression ($< 1.5\text{ MB}$ total budget).
* Enforce instance draw calls (`InstancedMesh`) for repeated geometry.
* Explicitly dispose geometry and textures (`dispose()`) upon unmount.
* Limit DPR on mobile to $1.0$.

---

## SECTION 25 — ASSET PIPELINE

* **Envelope & Flaps**: Procedural `ExtrudeGeometry` ($0\text{ KB}$).
* **Wax Seal Medallion**: Low-poly GLTF asset ($< 120\text{ KB}$).
* **Mihrab Arch Frame**: Extruded SVG path ($0\text{ KB}$).
* **Palace Lantern**: Low-poly GLTF asset ($< 180\text{ KB}$).
* **Environment HDR**: KTX2 / EXR map ($< 450\text{ KB}$).

---

## SECTION 26 — IMPLEMENTATION PHASE ROADMAP

1. **Phase 0 — Baseline Lock**: Verify regression testing suite.
2. **Phase 1 — WebGL Foundation**: Mount persistent R3F `<Canvas>` in `src/app/page.js`.
3. **Phase 2 — Ambient Environment**: Add global lighting rig & instanced gold particles.
4. **Phase 3 — Grand Opening 3D Envelope**: Replace CSS 3D flaps in `GrandOpening.js` with 3D envelope mesh.
5. **Phase 4 — Hero 3D Mihrab Pavilion**: Rebuild Hero background into 3D extruded Mihrab arch.
6. **Phase 5 — Scratch Date 3D Tiles**: Upgrade 2D canvas scratch tiles to 3D shader-masked tiles.
7. **Phase 6 — Royal Seal 3D Shatter**: Upgrade hold-to-break seal in `Footer.js` to 3D wax medallion.
8. **Phase 7 — Mobile Tuning & Final Polish**: Apply responsive quality tiers & DPR limits.

---

## SECTION 27 — PHASE GOVERNANCE

Strict step-by-step governance for future engineering:
1. Read this specification and `wedding_invitation_audit.md`.
2. Implement **ONLY ONE PHASE AT A TIME**.
3. Inspect existing code before editing.
4. Verify regression checklist after phase completion.
5. Report changed files and wait for user approval before starting the next phase.
6. **NEVER SILENTLY COMBINE MULTIPLE PHASES**.

---

## SECTION 28 — CHANGE CONTROL

* This specification is permanently locked.
* Architecture modifications require explicit user approval.
* Visual experimentation does not constitute permission to alter architecture.
* Existing wedding content (names, dates, address, family titles) must not be changed.

---

## SECTION 29 — REGRESSION CHECKLIST

- [ ] Preloader progress arc & completion chime sound
- [ ] Envelope tap-to-open interaction & unsealing audio
- [ ] Background music play/pause & theme contrast switching
- [ ] Bride & Groom names crispness & spring parallax tilt
- [ ] Parent cards & Marhoom grandfather legacy plaque
- [ ] Scratch date tiles drag-to-reveal & completion confetti
- [ ] Countdown timer digit calculation
- [ ] Venue details & Google Maps navigation link
- [ ] RSVP presence form modals & submission state
- [ ] Royal Wax Seal 1.5s hold-to-break & Ameen spray
- [ ] Lenis smooth inertial scrolling
- [ ] Mobile 60 FPS performance

---

## SECTION 30 — ARCHITECTURE LOCK

```
[ARCHITECTURE LOCK SUMMARY]

1. WebGL Architecture    ──►  Single Persistent R3F Background Canvas
2. Scene Management      ──►  Continuous Y-Axis Camera Track synced to Lenis Scroll
3. DOM Layer             ──►  All Typography, Form Inputs, Modals & CTAs stay in DOM
4. WebGL Layer           ──►  Envelopes, Arches, Lanterns, Date Tiles, Seals & Particles
5. Animation Engine      ──►  Framer Motion (DOM) + GSAP (3D Camera Keyframes)
6. Sound Engine          ──►  Native Web Audio API (audioSynth.js)
7. Minimum Dependencies  ──►  three, @react-three/fiber, @react-three/drei
8. First Step            ──►  Phase 0 Baseline Lock & Phase 1 Canvas Mounting
9. Primary Technical Risk──►  Mobile GPU thermal/battery throttling (mitigated by DPR 1.0 limit)
10. Primary Visual Risk  ──►  Over-saturation or illegible text (mitigated by DOM typography lock)
```

---

## SECTION 31 — IMPLEMENTATION AUTHORITY

"Future implementation prompts must reference this document before modifying the project."

"An implementation phase may modify only the scope explicitly defined for that phase."

"Anything outside the defined phase is out of scope unless separately approved."

"Do not treat visual experimentation as permission to alter the architecture."

"Preserve existing functionality unless the current phase explicitly replaces its visual implementation."

---

*End of 3D Master Specification.*
