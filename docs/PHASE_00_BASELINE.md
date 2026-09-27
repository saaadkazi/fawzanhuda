# FAUZAN & HUDA WEDDING INVITATION — PHASE 00 BASELINE & REGRESSION FOUNDATION

Status: BASELINE LOCK COMPLETE  
Version: 1.0  
Phase: Phase 00 (Regression Baseline)  
Implementation Status: NOT STARTED (Read-Only Baseline Phase)  
Authoritative Specification: `docs/3D_MASTER_SPECIFICATION.md`  
Audit Reference: `wedding_invitation_audit.md`  
Architecture Plan Reference: `3d_master_architecture_plan.md`  

---

## 1. PURPOSE OF THIS DOCUMENT

This document records the exact functional, visual, audio, animation, responsive, and performance baseline of the Fauzan & Huda wedding invitation codebase prior to beginning any WebGL, Three.js, or React Three Fiber (`R3F`) 3D implementation.

Its purpose is to establish an immutable contract answering:
**"What works in the application today, and what must remain 100% working after every future progressive 3D phase?"**

---

## 2. AUTHORITATIVE DOCUMENTS

This baseline document is governed strictly by the following pre-established planning source documents:
1. `docs/3D_MASTER_SPECIFICATION.md`: The primary implementation authority.
2. `wedding_invitation_audit.md`: The complete technical and component breakdown.
3. `3d_master_architecture_plan.md`: The 3D scene architecture and phase roadmap.

---

## 3. CURRENT TECHNOLOGY BASELINE

| Technology | Verified Version | Current Role in Application | Baseline Status |
|---|---|---|---|
| **Next.js** | `16.2.9` | App Router framework (`src/app`), layout, metadata, Google Fonts optimization (`Cinzel`, `Cormorant Garamond`, `Inter`, `Amiri`). | **VERIFIED** |
| **React** | `19.2.4` | Component tree rendering, state machine (`status`), hooks, React Portals (`createPortal`). | **VERIFIED** |
| **Tailwind CSS** | `^4.0.0` (`@tailwindcss/postcss`) | Styling framework, `@theme` variables in `globals.css`, utility layout classes, CSS keyframes. | **VERIFIED** |
| **Framer Motion** | `^12.42.0` | Mouse spring parallax (`useSpring`, `useMotionValue`), list staggers, view reveals, AnimatePresence transitions. | **VERIFIED** |
| **GSAP** | `^3.15.0` | Sequenced envelope unsealing timeline animation (`GrandOpening.js`). | **VERIFIED** |
| **Lenis** | `^1.3.25` | Smooth inertial scroll engine bound to browser RAF loop upon envelope unsealing. | **VERIFIED** |
| **Web Audio API** | Native Browser API | Programmatic sound synthesis ([audioSynth.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/utils/audioSynth.js)) for taps, lock clicks, hinge creaks, wind hums, and chimes. | **VERIFIED** |
| **HTML5 Canvas** | Native Browser API | 2D drag-to-erase scratch context for union date tiles (`ScratchDate.js`). | **VERIFIED** |
| **canvas-confetti** | `^1.9.4` | High-performance 2D celebration confetti bursts on date reveal & RSVP submit. | **VERIFIED** |
| **Lucide React** | `^1.21.0` | UI SVG icons (`Volume2`, `VolumeX`, `MapPin`, `Navigation`). | **VERIFIED** |

---

## 4. PROJECT STRUCTURE

```
fauzanhuda/
├── docs/                                # Project documentation directory
│   ├── 3D_MASTER_SPECIFICATION.md       # Authoritative implementation specification
│   ├── PHASE_00_BASELINE.md             # This document (Phase 00 baseline lock)
│   ├── README.md                        # Documentation overview
│   ├── architecture.md                  # Component hierarchy and state machine docs
│   ├── design_and_animation.md          # Design system tokens and animation guide
│   ├── framework_guide.md               # Developer framework guide
│   └── operations_and_perf.md           # Operational & performance guidelines
├── public/                              # Static public assets
│   ├── map_preview.png                  # Static Google Maps preview tile (737 KB)
│   ├── song.mp3                          # Background instrumental music track (227 KB)
│   └── wedding_palace_hall.png           # Background image asset (1.16 MB)
├── src/
│   ├── app/
│   │   ├── globals.css                  # Tailwind v4 tokens, CSS 3D & custom keyframe rules
│   │   ├── layout.js                    # Google Fonts setup, metadata & viewport config
│   │   └── page.js                      # Root controller, state machine & Lenis scroll setup
│   ├── components/                      # Core visual components
│   │   ├── Dua.js                       # Presence confirmation (RSVP) & blessing modal system
│   │   ├── FloralOrnament.js            # Reusable SVG corner ornaments with gold/burgundy gradients
│   │   ├── Footer.js                    # Hold-to-break Royal Seal & author signature plate
│   │   ├── GrandOpening.js              # 3D interactive envelope unsealing experience
│   │   ├── Hero.js                      # Invitation card centerpiece with spring parallax tilt
│   │   ├── MusicToggle.js               # Global floating background music toggle button
│   │   ├── Parents.js                   # Parent arched cards & Marhoom grandfather legacy plaque
│   │   ├── Preloader.js                 # Circular progress arc loader with particle drift
│   │   ├── ScratchDate.js               # 2D Canvas scratch date tiles & flip countdown clock
│   │   └── Venue.js                     # Location details & interactive Google Maps preview
│   └── utils/
│       └── audioSynth.js                # Programmatic Web Audio sound synthesizer engine
└── package.json                         # Project dependency manifest
```

---

## 5. COMPONENT RESPONSIBILITY MAP

### Component Matrix

| File Path | Component Name | Responsibility | State Dependencies | Export Type |
|---|---|---|---|---|
| [src/app/page.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/app/page.js) | `Home` | Root orchestrator. Governs application lifecycle state (`status`: `"loading"` \| `"entrance"` \| `"opened"`), handles background music state, and initializes Lenis smooth scrolling. | `status`, `isMusicPlaying` | Default |
| [src/app/layout.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/app/layout.js) | `RootLayout` | HTML document wrapper, Google Fonts initialization (`Cinzel`, `Cormorant Garamond`, `Inter`, `Amiri`), head metadata and viewport scaling lock. | None | Default |
| [src/app/globals.css](file:///c:/The%20Og%20Folder/fauzanhuda/src/app/globals.css) | Style Manifest | Tailwind v4 `@theme` tokens, luxury card shadows, custom scrollbars, CSS keyframes (`shimmer`, `gold-drift`, `ambient-sweep`, `silk-haze`). | CSS Custom Properties | N/A |
| [src/components/Preloader.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Preloader.js) | `Preloader` | Displays initial timed circular progress loader (0% -> 100% in 3.5s) while preloading images and fonts asynchronously. Triggers completion chime. | `progress`, `isFinished`, `particles`, `mounted`, `assetsReady` | Default |
| [src/components/GrandOpening.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/GrandOpening.js) | `GrandOpening` | 3D CSS interactive envelope barrier. Handles medallion click, unsealing audio sequence, GSAP 3D flap unfolding timeline, card rise, and portal zoom transition. | `stage`, `showDoorsOverlay`, `ambientWind`, `idleParticles`, `sparkParticles`, `isMobile`, `tapTriggered`, `mousePos` | Memoized Default |
| [src/components/MusicToggle.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/MusicToggle.js) | `MusicToggle` | Floating audio toggle button (top-right). Controls global HTML5 Audio (`/song.mp3`), auto-fading volume, tab visibility changes, and dynamic background contrast inversion. | `mounted`, `isThemeDark` | Named + Default (`getGlobalAudio`) |
| [src/components/Hero.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Hero.js) | `Hero` | Landing centerpiece card with Groom & Bride names, wedding date, swaying gold lanterns, illuminated Mihrab arch, and Framer Motion spring tilt parallax. | `particles`, `isMobile`, `isWaveActive`, `isCardTapped`, `scrollY`, `isEntering`, `introPlayed` | Default |
| [src/components/Parents.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Parents.js) | `Parents` | Mughal-inspired arch section featuring the Marhoom Zainuddin Kadir Kazi grandfather legacy plaque, Groom parents card, and Bride parents card with click ripples. | `groomRipple`, `brideRipple`, `bgParticles` | Memoized Default |
| [src/components/ScratchDate.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/ScratchDate.js) | `ScratchDate` | 3 Interactive 2D HTML5 Canvas scratch tiles (Day: 09 \| Month: DEC \| Year: 2026), dissolving canvas particles, celebration modal burst, and live flip countdown clock. | `revealedCards`, `celebrationParticles`, `bgStars`, `shimmerActive`, `showRewardText`, `showCelebrationPopup`, `timeLeft` | Memoized Default |
| [src/components/Venue.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Venue.js) | `Venue` | Event location details (Elly Kadoorie Hall, Mazgaon, Mumbai), custom line-art map preview with animated SVG route tracer, and Google Maps CTA button. | `bgParticles` | Memoized Default |
| [src/components/Dua.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Dua.js) | `Dua` | Presence confirmation (RSVP) card. Opens interactive glassmorphic modal forms for "I'll Attend" or "Sending My Duas", triggering confetti burst and summary card. | `stars`, `showModal`, `showSuccessModal`, `rsvpType`, `name`, `message`, `savedRsvp`, `isSubmitting`, `ripples` | Memoized Default |
| [src/components/Footer.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Footer.js) | `Footer` | Interactive 1.5s hold-to-break Royal Wax Seal. Triggers progress ring, vibration shake, jagged gold cracks, 3D medallion split, hidden Arabic blessing card, and author signature plate. | `globalStage`, `progress`, `isHolding`, `stage`, `unlocked`, `burstRipples`, `burstSparks`, `ameenClicked`, `risingParticles` | Memoized Default |
| [src/components/FloralOrnament.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/FloralOrnament.js) | `FloralOrnament` | Reusable SVG corner decoration rendering gold leaves, burgundy rose buds, and delicate swirling vines. | None | Default |
| [src/utils/audioSynth.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/utils/audioSynth.js) | Synthesizer Engine | Programmatic Web Audio API audio synthesis engine. Generates zero-latency sound effects without external audio file loading. | `audioCtx`, `ambientSource`, `ambientGain` | Named Module Exports |

---

## 6. FUNCTIONAL BASELINE

### Detailed Feature Status Matrix

| ID | Feature | Current Status | Source File | Key Interaction / State | Regression Requirement |
|---|---|---|---|---|---|
| **F-01** | **Circular Preloader** | VERIFIED | `Preloader.js` | Timed 3.5s progress increment (0% -> 100%) + asset preload; blurs out on completion. | Progress arc must fill smoothly; completion chime must play. |
| **F-02** | **Envelope Entrance Overlay** | VERIFIED | `GrandOpening.js` | Displays 3D CSS envelope casing and wax seal medallion over hero section. | Must cover viewport until user taps seal. |
| **F-03** | **Wax Seal Unsealing Tap** | VERIFIED | `GrandOpening.js` | Clicking seal triggers tap sound, starts background music, and launches GSAP timeline. | Tap must trigger audio and opening sequence cleanly. |
| **F-04** | **3D Envelope Flap Unfolding** | VERIFIED | `GrandOpening.js` | GSAP rotates top flap to -165°, slides inner card up, and dollies camera forward. | Sequence timing and card reveal must remain intact. |
| **F-05** | **Mobile Envelope Fallback** | VERIFIED | `GrandOpening.js` | On viewports < 768px, complex 3D flap physics are replaced with a fast 0.5s 2D opacity fade. | Mobile transition must remain instant and free of frame drops. |
| **F-06** | **Background Music Toggle** | VERIFIED | `MusicToggle.js` | Floating top-right button toggles `/song.mp3` with 50ms volume fade-in and 30ms fade-out. | Music state must persist; audio must auto-pause on hidden tab. |
| **F-07** | **Theme-Adaptive Music Button** | VERIFIED | `MusicToggle.js` | Listens to page scroll position; inverts button contrast between light and dark sections. | Contrast inversion must correctly track scroll depth. |
| **F-08** | **Hero Mouse Spring Parallax** | VERIFIED | `Hero.js` | Mouse movement interpolates `mouseX`/`mouseY` via `useSpring` to tilt card $\pm 3.5^\circ$. | Card tilt must operate on GPU without triggering React state re-renders. |
| **F-09** | **Groom & Bride Name Stagger** | VERIFIED | `Hero.js` | Letter-by-letter Framer Motion stagger animation for "Fauzan" and "Huda". | Names must remain 100% crisp and readable in DOM layer. |
| **F-10** | **"TAP TO ENTER" CTA** | VERIFIED | `Hero.js` | Clicking medallion button smooth-scrolls viewport to `#parents-section`. | Must scroll smoothly to parents section. |
| **F-11** | **Grandfather Legacy Plaque** | VERIFIED | `Parents.js` | Displays Marhoom Zainuddin Kadir Kazi legacy plaque with floating animation. | Plaque text and formatting must be preserved. |
| **F-12** | **Parents Arched Cards** | VERIFIED | `Parents.js` | Displays Groom & Bride parent cards; clicking triggers golden ripple rings. | Parent names must remain exact and legible. |
| **F-13** | **Canvas Scratch Tiles** | VERIFIED | `ScratchDate.js` | Mouse/touch dragging on 3 tiles erases 2D foil layer via `destination-out`. | Erasing context must respond instantly to touch/mouse drag. |
| **F-14** | **Date Reveal Celebration** | VERIFIED | `ScratchDate.js` | 25% reveal threshold triggers chime, `canvas-confetti` burst, and celebration modal. | Reveal detection must fire reliably upon tile completion. |
| **F-15** | **Live Countdown Clock** | VERIFIED | `ScratchDate.js` | Calculates days, hours, minutes, seconds remaining until `2026-12-09T00:00:00`. | Countdown digits must update every second accurately. |
| **F-16** | **Venue Location Card** | VERIFIED | `Venue.js` | Displays venue details for Elly Kadoorie Hall, Mazgaon, Mumbai. | Address details must remain intact. |
| **F-17** | **Google Maps Route Graphic** | VERIFIED | `Venue.js` | Custom SVG route line-art overlay with animated route tracer and pulsing map pin. | Interactive map preview card must respond to click. |
| **F-18** | **Google Maps CTA Button** | VERIFIED | `Venue.js` | Clicking "Open Google Maps" opens map link in a new browser tab. | Link must open `https://maps.app.goo.gl/mqkn5eL4ZUfMuXE86`. |
| **F-19** | **RSVP Presence Modals** | VERIFIED | `Dua.js` | Clicking "I'll Attend" or "Sending My Duas" opens a React Portal glassmorphic modal. | Modals must render over document body with active input fields. |
| **F-20** | **RSVP Submission Flow** | VERIFIED | `Dua.js` | Submitting form triggers 1.2s loading state, confetti burst, and summary card. | Form validation and submission state must function. |
| **F-21** | **Hold-to-Break Royal Seal** | VERIFIED | `Footer.js` | Touch and hold for 1.5s fills progress ring, shakes seal, and breaks medallion open. | 1.5s hold timer and fracture sequence must function. |
| **F-22** | **Ameen Blessing Button** | VERIFIED | `Footer.js` | Clicking "AMEEN 🤍" triggers rose petal confetti spray and 12 rising gold sparks. | Button click must spray confetti and show "Blessing Received". |
| **F-23** | **Smooth Inertial Scroll** | VERIFIED | `src/app/page.js` | Initializes Lenis smooth scrolling once status becomes `"opened"`. | Inertial wheel scrolling must remain smooth and jitter-free. |

---

## 7. VISUAL BASELINE

### Section-by-Section Visual Inventory

#### 1. Preloader Visual Baseline
* **Backdrop**: Dark burgundy gradient (`from-[#2A000D] via-[#4A081B] to-[#1A0208]`).
* **Elements**: Central circular SVG progress ring ($128 \times 128\text{px}$), orbiting leading spark, glowing "F & H Nikah" monogram, drifting gold spark particles, and rotating golden rays backdrop ($20^\circ$ line distribution).

#### 2. Grand Opening Visual Baseline
* **Backdrop**: Deep velvet burgundy background (`#1A0208` to `#8B1234` gradient), blurred radial glow spots, low-opacity Islamic geometric watermark ($1.4\%$ opacity).
* **Envelope Casing**: 9:16 portrait ratio envelope frame (`max-w-[420px] max-h-[730px]`), warm ivory paper face (`#FDF8F0` -> `#F8F2E8`), double gold dashed inner margins, corner floral arabesques.
* **Flaps**: 4 triangular flaps with double-stroke beveled gold foil creases.
* **Medallion**: 3D embossed wax seal with brushed metallic gold outer ring, glossy burgundy enamel center, gold F&H stamped monogram, and pulsating gold aura glow.

#### 3. Hero Visual Baseline
* **Backdrop**: Radial ruby velvet silk background (`#7A1237` -> `#5A001E` -> `#2A000C`), deep vignette edge overlay, drifting silk haze overlay.
* **Architecture**: Illuminated Islamic Mihrab Arch frame with top rosette, 2 swaying gold lanterns with internal flame pulse.
* **Centerpiece Card**: Pointed Islamic Arch shape card (`rounded-[162px_162px_22px_22px]`), warm ivory marble texture, double gold border shimmer, diagonal gold foil sweep overlay, corner filigree engravings.
* **Typography**: Groom name ("Fauzan") and Bride name ("Huda") in `Cormorant Garamond` ($56\text{px}$ bold), gold star rosette divider, requested presence lines, and sacred date (`09 • 12 • 2026`).

#### 4. Parents Visual Baseline
* **Backdrop**: Warm ivory cream paper background (`#FFFDF9` -> `#F6EBDD` -> `#EFE3D3`), vignette border overlay, repeating Islamic geometric watermark ($2.5\%$ opacity).
* **Mughal Arch Casing**: Outer curved gold border frame (`rounded-[180px_180px_40px_40px]`), inner dashed gold arch line, 2 hanging gold lanterns.
* **Legacy Plaque**: Capsule card (`max-w-[365px]`), gold beveled border, honoring Marhoom Zainuddin Kadir Kazi.
* **Parent Cards**: 2 arched cards (`max-w-[310px]`) for Groom parents (Rafiq Zainuddin Kazi & Hajara Rafiq Kazi) and Bride parents (Hasham Ismail Kazi & Seemab Hasham Kazi) with gold role badges.

#### 5. Scratch Date Visual Baseline
* **Backdrop**: Deep wine velvet backdrop (`#2A000C` -> `#5A001E`), oversized faint Islamic arch silhouette vector.
* **Scratch Tiles**: 3 Arched gold/burgundy tiles (Day: 09 \| Month: DEC \| Year: 2026) with burgundy foil top layer and embossed Rub el Hizb star pattern.
* **Countdown Clock**: 4 flip-clock boxes (Days, Hours, Minutes, Seconds) with champagne gold borders, ivory inner casing, center split line, and gold colon separators (`•`).

#### 6. Venue Visual Baseline
* **Backdrop**: Light cream paper background (`#FFFDF9` -> `#F6EBDD`), central golden glow spotlight.
* **Venue Card**: Arched ivory glass card (`rounded-[140px_140px_20px_20px]`), map pin badge, location title ("Elly Kadoorie Hall"), address text.
* **Map Tile**: Rounded preview card with static map graphic, animated SVG route tracer, pulsing pin, and "Open Maps" badge.
* **CTA Button**: Slim burgundy pill button with gold border shimmer.

#### 7. Dua & RSVP Visual Baseline
* **Backdrop**: Deep burgundy backdrop (`#7A1237` -> `#2A000C`), Islamic arch silhouette vector, drifting gold dust.
* **RSVP Card**: Dark wine card (`#4a0018` -> `#1F000A`), gold corner ornaments, crescent moon icon.
* **Buttons**: Primary gold gradient button ("InshaAllah, I'll Attend") & outlined gold button ("Sending My Duas").
* **Modals**: Glassmorphic dark burgundy popups with custom form controls and gold borders.

#### 8. Footer Visual Baseline
* **Backdrop**: Light cream footer ground (`#FFFDF9` -> `#F6EBDD`), animated gold divider line.
* **Royal Seal**: Interactive wax seal medallion with concentric gold ring, touch-and-hold progress fill, jagged gold cracks, and 3D split animation.
* **Signature Plate**: Metallic gold gradient signature badge for Saad Kazi with twinkling sparkles, WhatsApp and Instagram social buttons.

---

## 8. ANIMATION BASELINE

| Animation System | Responsibilities in Application | Components Utilizing It |
|---|---|---|
| **GSAP (GreenSock)** | Sequenced 3D envelope unsealing timeline (medallion press -> lock click -> top flap rotate -> card rise -> camera portal zoom). | [GrandOpening.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/GrandOpening.js) |
| **Framer Motion** | Mouse spring parallax (`useSpring`, `useMotionValue`), letter-by-letter staggers, card float breathing, view reveals (`whileInView`), modal popups (`AnimatePresence`). | [Preloader.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Preloader.js), [Hero.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Hero.js), [Parents.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Parents.js), [ScratchDate.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/ScratchDate.js), [Venue.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Venue.js), [Dua.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Dua.js), [Footer.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Footer.js) |
| **Lenis Scroll** | Smooth inertial wheel scrolling initialized on window once status becomes `"opened"`. | [src/app/page.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/app/page.js) |
| **CSS 3D Transforms** | Envelope flap 3D folding (`rotateX`, `rotateY`), card 3D perspective tilt (`perspective: 1600px`). | `GrandOpening.js`, `Hero.js`, `globals.css` |
| **HTML5 Canvas 2D** | Drag-to-erase scratch surface (`destination-out`) + particle dispersal render loop via `requestAnimationFrame`. | [ScratchDate.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/ScratchDate.js) |
| **canvas-confetti** | Popping celebration confetti spray on 100% scratch reveal, RSVP submission, and Ameen button click. | `ScratchDate.js`, `Dua.js`, `Footer.js` |

---

## 9. AUDIO BASELINE

The native Web Audio API synthesizer ([audioSynth.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/utils/audioSynth.js)) provides programmatic zero-latency sound effects without external audio file loading:

### Audio Effect Inventory & Trigger Points
1. **`startAmbience()` / `stopAmbience()`**: Low-frequency palace wind hum ($140\text{Hz}$ lowpass filter with slow $8\text{s}$ LFO modulation). Plays during Grand Opening entrance stage; fades out over $2.5\text{s}$ upon opening.
2. **`playMetallicTap()`**: Short high-frequency triangle wave sweep ($900\text{Hz} \rightarrow 200\text{Hz}$ over $120\text{ms}$). Triggers on wax seal mousedown/touchstart onset.
3. **`playLockClick()`**: Mechanical double click pulse ($1350\text{Hz}$ and $1050\text{Hz}$ pulses). Triggers at $700\text{ms}$ into the envelope opening sequence.
4. **`playHingeCreak()`**: Low frequency sawtooth wood friction vibration ($65\text{Hz}$ with $16\text{Hz}$ square wave stutter). Triggers at $1.5\text{s}$ as the top envelope flap opens.
5. **`playWhoosh()`**: Bandpass filtered white noise sweep ($150\text{Hz} \rightarrow 1200\text{Hz} \rightarrow 100\text{Hz}$ over $1.6\text{s}$). Triggers at $4.3\text{s}$ during camera portal zoom.
6. **`playChime()`**: Harmonic consonant chime cluster ($440\text{Hz}, 660\text{Hz}, 880\text{Hz}, 1100\text{Hz}, 1320\text{Hz}$ with $5.5\text{Hz}$ vibrato). Triggers on Preloader $100\%$ completion and Scratch Date $100\%$ reveal.
7. **HTML5 Audio (`/song.mp3`)**: Instrumental background track managed by `MusicToggle.js` (`globalAudio`). Programmatically fades volume in ($0 \rightarrow 0.35$ over $50\text{ms}$ steps) and out ($0.35 \rightarrow 0$ over $30\text{ms}$ steps). Listens to `visibilitychange` to auto-pause when browser tab is hidden.

---

## 10. RESPONSIVE BASELINE

### Layout & Interaction Behavior Across Viewports

#### Desktop (Width >= 1024px)
* Card elements adopt fixed maximum widths (`md:max-w-[365px]`, `md:max-w-[420px]`) to maintain physical invitation card proportions.
* Framer Motion spring mouse tracking (`mouseX`, `mouseY`) controls 3D card tilt (`rotateX`, `rotateY` up to $\pm 3.5^\circ$).
* GSAP 3D envelope flap unfolding sequence active.
* Full particle densities enabled (e.g., 48 particles in Hero, 32 in ScratchDate).

#### Tablet (Width 768px - 1023px)
* Two-column grid layouts for parent cards (`grid-cols-2`).
* Touch drag and spring tilt active with reduced deflection angles ($\pm 2.0^\circ$).
* Scratch brush size set to 75px.

#### Mobile (Width < 768px)
* Viewport-based fluid scaling (`w-[80vw] h-[64svh]`).
* GSAP 3D envelope opening timeline bypassed -> replaced with clean $0.5\text{s}$ 2D opacity fade for 60 FPS performance.
* Mouse parallax spring tilt disabled (`rotateX: 0`, `rotateY: 0`).
* Scratch brush size set to 60px for effortless single-finger scratching.
* Single-column stacked layouts for parent cards (`grid-cols-1`).
* Particle counts reduced by $50 - 60\%$ to protect mobile GPU/CPU.

---

## 11. PERFORMANCE BASELINE

### Performance-Sensitive Areas Identified (Baseline Observation Only)

1. **Large Binary Images**: `/public/wedding_palace_hall.png` (1.16 MB) and `/public/map_preview.png` (737 KB) are currently uncompressed PNG files.
2. **Backdrop Blurs**: Multiple elements utilize heavy CSS backdrop filters (`backdrop-blur-md`, `backdrop-blur-xl`).
3. **Infinite Keyframe Animations**: CSS infinite keyframes (`gold-drift`, `ambient-sweep`, `silk-haze`) run continuously in background layers.
4. **HTML5 Canvas Loop**: `ScratchDate.js` manages a `requestAnimationFrame` particle loop that correctly clears queues and cancels animation frames upon unmount.
5. **Hydration Protection**: `suppressHydrationWarning` is enabled on `<html>` in `layout.js` to avoid font class mismatches.

---

## 12. REGRESSION MATRIX

| ID | Feature Name | Current Status | Source File | Key Interaction | Must Preserve |
|---|---|---|---|---|---|
| **RM-01** | Preloader Arc Progress | VERIFIED | `Preloader.js` | Timed 3.5s progress fill (0% -> 100%) | Smooth progress arc fill & completion chime sound. |
| **RM-02** | Envelope Wax Seal Tap | VERIFIED | `GrandOpening.js` | Click wax seal medallion | Triggers metallic tap audio & opens invitation sequence. |
| **RM-03** | 3D Flap Unfolding | VERIFIED | `GrandOpening.js` | GSAP 3D flap rotation timeline | Top flap opens -165°, card rises, camera zooms in. |
| **RM-04** | Mobile Opening Fallback | VERIFIED | `GrandOpening.js` | Viewport < 768px detection | Bypasses 3D flaps; executes clean 0.5s 2D opacity fade. |
| **RM-05** | Background Music Toggle | VERIFIED | `MusicToggle.js` | Floating top-right button click | Toggles `/song.mp3` with volume fade & tab pause. |
| **RM-06** | Music Button Theme Adapt | VERIFIED | `MusicToggle.js` | Window scroll position tracking | Inverts button contrast between light and dark sections. |
| **RM-07** | Hero Spring Parallax | VERIFIED | `Hero.js` | Cursor / touch movement | Card tilts $\pm 3.5^\circ$ on GPU without React re-renders. |
| **RM-08** | Bride/Groom Name Text | VERIFIED | `Hero.js` | Framer Motion stagger reveal | Names ("Fauzan" & "Huda") remain 100% sharp DOM text. |
| **RM-09** | "TAP TO ENTER" Button | VERIFIED | `Hero.js` | Medallion button click | Smooth-scrolls viewport to `#parents-section`. |
| **RM-10** | Grandfather Legacy Plaque | VERIFIED | `Parents.js` | Floating card render | Honors Marhoom Zainuddin Kadir Kazi. |
| **RM-11** | Parents Arched Cards | VERIFIED | `Parents.js` | Card click | Displays parent names; triggers golden ripple rings. |
| **RM-12** | Canvas Scratch Date | VERIFIED | `ScratchDate.js` | Mouse / touch drag on 3 tiles | Erases foil layer; releases dissolving gold particles. |
| **RM-13** | Date Reveal Celebration | VERIFIED | `ScratchDate.js` | 25% reveal threshold reach | Plays chime, sprays confetti, shows celebration modal. |
| **RM-14** | Live Countdown Clock | VERIFIED | `ScratchDate.js` | Real-time interval calculation | Calculates days, hours, minutes, seconds until Dec 9, 2026. |
| **RM-15** | Venue & Location Card | VERIFIED | `Venue.js` | Section scroll view | Displays Elly Kadoorie Hall details & address. |
| **RM-16** | Google Maps CTA | VERIFIED | `Venue.js` | Button click | Opens `https://maps.app.goo.gl/mqkn5eL4ZUfMuXE86` in new tab. |
| **RM-17** | RSVP Presence Modals | VERIFIED | `Dua.js` | Click "I'll Attend" or "Sending My Duas" | Opens React Portal glassmorphic modal with form inputs. |
| **RM-18** | RSVP Form Submit | VERIFIED | `Dua.js` | Form submission click | Triggers 1.2s load, confetti spray & summary card. |
| **RM-19** | Hold-to-Break Seal | VERIFIED | `Footer.js` | Touch & hold for 1.5s | Fills progress ring, vibrates, cracks, and splits seal open. |
| **RM-20** | Ameen Blessing Spray | VERIFIED | `Footer.js` | "AMEEN 🤍" button click | Sprays rose confetti & displays "Blessing Received". |
| **RM-21** | Smooth Inertial Scroll | VERIFIED | `src/app/page.js` | Window scroll after opening | Lenis smooth scroll remains active and jitter-free. |

---

## 13. KNOWN EXISTING BEHAVIOUR

* **Preloader Autoplay Safety**: If the user has strict browser audio policies enabled, background music playback catch blocks gracefully prevent console crashes until the user clicks the DOM seal medallion.
* **Lenis Smooth Scroll Activation**: Lenis is initialized strictly when `status === "opened"`, ensuring standard native scroll handles are un-interfered with during the preloader and envelope opening stages.
* **Decoupled Audio Synthesizer**: `audioSynth.js` initializes audio context lazily upon first user interaction to comply with Web Audio API browser standards.

---

## 14. KNOWN EXISTING ISSUES

*(Observed during read-only inspection; not modified during Phase 00)*
1. **Uncompressed Assets**: `/public/wedding_palace_hall.png` (1.16 MB) is present in `/public` but not currently consumed by any component.
2. **Mobile Landscape Height Overflow**: On mobile viewports rotated horizontally (height < 500px), card content in the Preloader and Hero section can experience vertical cropping.

---

## 15. PHASE 00 COMPLETION CRITERIA

Phase 00 is complete:
- [x] Authoritative 3D Master Specification reviewed.
- [x] Project structure and directory files inspected.
- [x] All 10 major UI components mapped to explicit responsibilities.
- [x] Functional, visual, animation, audio, responsive, and performance baselines documented.
- [x] 23-point Regression Matrix established.
- [x] **Zero source code files modified**.
- [x] **Zero dependencies installed**.
- [x] **Phase 1 has NOT been started**.

---

*End of Phase 00 Baseline Lock Document.*
