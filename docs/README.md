# Luxury Invitation Framework Documentation

Welcome to the **Luxury Invitation Framework**, a premium, high-performance, and responsive framework for building luxury event invitations. This framework has been optimized for cinematic transitions, buttery-smooth interactions, and mobile performance.

This documentation serves as a complete developer handover package to transform this project into a reusable baseline template. You can duplicate and customize this template to build premium invitation websites for a wide range of luxury events (Wedding, Nikah, Walima, Reception, Engagement, Birthday, Anniversary, Corporate, etc.).

---

## Documentation Navigation

This documentation is split into modular guides, each targeting a key area of the framework:

1. **[Framework Customization Guide](file:///c:/The%20Og%20Folder/fauzanhuda/docs/framework_guide.md)**
   *The primary guide for duplicating, changing colors, names, dates, maps, text, asset files, and modifying sections for a new client.*
2. **[Architecture and Structure Guide](file:///c:/The%20Og%20Folder/fauzanhuda/docs/architecture.md)**
   *Explains directory structure, component hierarchy, responsive layouts, and screen transition lifecycles.*
3. **[Design and Animation Manual](file:///c:/The%20Og%20Folder/fauzanhuda/docs/design_and_animation.md)**
   *Breakdown of the color system, styling tokens (Tailwind v4), GSAP timelines, Framer Motion springs, and keyframe animations.*
4. **[Operations and Performance Guide](file:///c:/The%20Og%20Folder/fauzanhuda/docs/operations_and_perf.md)**
   *Covers hardware-accelerated CSS, GPU parallax, asset optimization, naming conventions, deployment, and best practices.*

---

## Core Technology Stack

The framework leverages a modern front-end stack to guarantee 60 FPS transitions and rich aesthetics:

| Technology | Role | Version |
| :--- | :--- | :--- |
| **Next.js** | Core React SSR/SSG Framework | `16.2.9` |
| **React** | Component Library | `19.2.4` |
| **Tailwind CSS** | Styling engine with `@import` configuration | `v4.0.0` |
| **GSAP** | Precise sequencing for complex door/envelope splits | `3.15.0` |
| **Framer Motion** | Declarative page entrance, list stagger, and spring physics | `12.42.0` |
| **Lenis** | Smooth scrolling engine | `1.3.25` |

---

## Key Features of the Base Template

* **Two-Step Transition Gate**:
  1. *Entrance Envelope Gate* (`GrandOpening.js`): Fully interactive wax seal button which plays a clean transition on mobile and a 3D door unfolding on desktop.
  2. *Landing Card* (`Hero.js`): High-end invitation card with GPU-accelerated cursor spring parallax and entrance staggers.
* **Liquid Scratch-off Date**: An interactive wax canvas element that lets users scratch off the surface to reveal the countdown and ceremony date.
* **RSVP & Wishes Gateways**: Custom database-ready form elements with validation and premium UI states.
* **Music Controller**: Autoplay-fallback audio player syncing background music across views with visualizer animations.
