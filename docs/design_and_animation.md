# Design System and Animation Manual

This manual explains the design tokens, fonts, and animation systems that give the invitation template its luxury, premium feel.

---

## 1. Design System and Colors

The template relies on a strict, curated color palette representing royal burgundy, gold, and ivory paper tones.

### Color Tokens (Tailwind v4 Setup)
All custom colors are mapped inside the Tailwind `@theme` block in [src/app/globals.css](file:///c:/The%20Og%20Folder/fauzanhuda/src/app/globals.css):

```css
@theme {
  --color-brand-bg: #F6EBDD;          /* Ivory/Cream paper base */
  --color-brand-secondary: #FFF8ED;   /* Soft warm white */
  --color-brand-card: #FFF8ED;        /* Inner card background */
  --color-brand-dark: #6D0F2A;        /* Warm Royal Burgundy */
  --color-brand-soft-dark: #4A081B;   /* Deep Velvet Burgundy */
  --color-brand-gold: #D4AF37;        /* Metallic Gold leaf base */
  --color-brand-gold-glow: #E8C76A;   /* Illuminated bright gold */
  --color-brand-heading: #4A081B;     /* Deep Burgundy for typography */
  --color-brand-body: #6D0F2A;        /* Warm Burgundy for details */
}
```

### Typography and Fonts
Four premium fonts are imported via Google Fonts:
* **Cinzel / Cinzel Decorative** (`--font-cinzel`): Stately Serif used for high-end titles, RSVP details, date numbers, and button labels.
* **Cormorant Garamond** (`--font-cormorant`): Elegant Serif with thin italics used for names ("Fauzan & Huda"), headings, Request lines, and descriptions.
* **Inter** (`--font-inter`): Clean sans-serif used for structural labels ("THE GROOM"), body paragraphs, forms, and instructions.
* **Amiri** (`--font-amiri`): Fine Naskh script used for Arabic calligraphy.

---

## 2. Animation Systems

Animations are separated by their complexity and interaction targets:

### A. GSAP Timeline Animation (Sequenced Entrance)
GSAP is used in `GrandOpening.js` for desktop envelope transitions. Since GSAP controls layout coordinates outside React’s render loops, it executes complex 3D paths with absolute timing precision:

* **Medallion compression**: `.to(medallionRef, { scale: 0.86, z: -30, rotateX: -10, duration: 0.2 })` (Tactile button click visual feedback).
* **Medallion spring release**: `.to(medallionRef, { scale: 1.05, z: 15, duration: 0.3 })` (Elastic release bounce).
* **Unlocking sequence**: mechanical clicks and particle bursts trigger synchronously at `0.7s`.
* **Flap unfolds**: `.to(topFlapRef, { rotateX: -165, duration: 1.2 })` (3D paper fold simulation).
* **Card Rise**: `.to(cardRef, { y: 0, scale: 1.0, opacity: 1, duration: 1.0 })` (Card slides out of envelope slot).
* **Portal Zoom**: `.to(cameraContainerRef, { scale: 3.0, opacity: 0, duration: 1.4 })` (Cinematic screen transition zoom).

*Note: On mobile, the entire GSAP timeline is bypassed, executing a simple 2D fade-out in `0.5s` for maximum performance.*

---

### B. Framer Motion (Declarative Layout & Spring Parallax)
Framer Motion is used for layout reveals, list staggers, and buttery-smooth cursor parallax:

#### Spring Hover Parallax
In [Hero.js](file:///c:/The%20Og%20Folder/fauzanhuda/src/components/Hero.js), mouse movements translate components dynamically without triggering React state re-renders, offloading rendering directly to the GPU compositor thread:
```javascript
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 90, damping: 22 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const layer1X = useTransform(smoothX, (x) => x * 4.5);
  const layer1Y = useTransform(smoothY, (y) => y * 4.5);
  const rotateX = useTransform(smoothY, (y) => isMobile ? 0 : -y * 3.5);
  const rotateY = useTransform(smoothX, (x) => isMobile ? 0 : x * 3.5);
```
Binding these values to the element's `style` prop updates the CSS matrix on hover, guaranteeing 60+ FPS interaction speeds.

#### List Staggers
Text splits (like names) are animated letter-by-letter using stagger variants:
```javascript
  const groomStagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: isMobile ? 1.0 : 5.2 }
    }
  };
```
On mobile, the delay is reduced from `5.2s` to `1.0s` to align with the simplified opening fade, eliminating blank-screen delays.

---

## 3. Custom CSS Keyframes and Classes

In [src/app/globals.css](file:///c:/The%20Og%20Folder/fauzanhuda/src/app/globals.css), custom animations are defined for ambient backlighting:

* **`.animate-pulse-slow`**:
  - Oscillates opacity from `0.35` to `0.85` and scales by `1.04` over `3s`. Used for golden star vectors and backlights.
* **`.animate-float-slow`**:
  - Translates `translateY` by `10px` and rotates by `1.5deg` over `8s`. Gives cards a floating, weightless look.
* **`gold-shimmer-text`**:
  - A linear gradient background sweep (`#D4AF37 -> #E8C76A -> #FFF8ED -> #D4AF37`) configured with `background-clip: text` to simulate gold foil shimmer.
* **`walnut-door-texture`**:
  - Integrates double radial gradients to simulate a textured, textured burgundy paper cover.
