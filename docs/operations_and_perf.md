# Operations, Performance, and Deployment Guide

This guide details the framework performance parameters, asset optimization strategies, naming conventions, and instructions for production deployments.

---

## 1. Performance Optimization Framework

To maintain a smooth 60 FPS target across mobile and desktop browsers, follow these guidelines:

### GPU Hardware Acceleration Rules
* **Animate layout properties using compositor-only attributes**: Always animate `x`, `y`, `scale`, `rotate`, and `opacity` instead of properties like `width`, `height`, `top`, or `left`. Compositor properties do not trigger browser reflow/layout invalidations.
* **willChange configuration**: Apply `will-change: transform, opacity` directly on heavy animating containers to force the browser to pre-composite layers in GPU VRAM.

### Memory Optimization for Canvas and Mask Elements
* **Canvas cleanup**: In canvas scratching modules (`ScratchDate.js`), clean up drawing buffers, remove animation frames (`cancelAnimationFrame`), and detach event listeners inside the React unmount lifecycle hook to prevent memory leaks.
* **Component Lazy-loading**: Keep heavy sections below the fold unmounted until `status === "opened"`. This prevents Next.js from hydrating off-screen sections (like Google Maps iframes) during initial envelope loading transitions.

### Framer Motion Best Practice
* Avoid using state-based updates (`useState` / `setState`) inside high-frequency mousemove listeners.
* Use Framer Motion's `useMotionValue`, `useSpring`, and `useTransform` to bind animations directly to inline style transforms, bypassing the React re-render cycle entirely.

---

## 2. Asset Management Guidelines

To keep page load speeds low, follow these guidelines:

* **Audio Compression**: Background music tracks (`background_music.mp3`) should be compressed as mono or joint-stereo MP3s with a bit rate of 96kbps to 128kbps. The total file size should not exceed 1.5MB.
* **Image Assets**: Optimize all background patterns, watermarks, and photos using modern formats like WebP or AVIF. Compress images to a maximum width of 1920px for backgrounds, and keep file sizes under 150KB.
* **SVG Optimization**: Minimize vector shapes. Remove unused tags and coordinates, and ensure all SVGs use CSS variables or `currentColor` for responsive styling.

---

## 3. Naming Conventions

Maintain these folder and code naming standards to keep layouts clean and structured:

* **Components**: PascalCase (e.g., `Preloader.js`, `GrandOpening.js`, `FloralOrnament.js`).
* **Layouts**: kebab-case for custom CSS classes (e.g., `door-perspective-container`, `gold-sweep-overlay`).
* **State variables**: camelCase (e.g., `isEntering`, `introPlayed`, `scrollRatio`).
* **Motion variants**: camelCase (e.g., `groomStagger`, `brideStagger`).

---

## 4. Deployment Guide

The framework is optimized for static hosting (Server-Side Generation / Static Exports):

### Production Build Command
Run a production build check locally:
```bash
npm run build
```

### Static Hosting Deployments (Vercel / Netlify / Cloudflare Pages)
1. **GitHub Integration**: Push your project repository to GitHub.
2. **Project Setup**: Import the repository into the hosting service dashboard.
3. **Build settings**:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next` or `out` (if static exports are enabled in `next.config.mjs`)
4. **Environment Variables**: Configure variables for database endpoints or RSVP notification hooks in the hosting dashboard.
