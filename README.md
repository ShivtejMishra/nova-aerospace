# NOVA AEROSPACE

> **Beyond the Horizon** — a cinematic, next-generation 3D website for a futuristic space technology company.

Nova Aerospace is a production-grade, single-page web experience built to feel as premium as
SpaceX, Apple, and NASA. It pairs a dark, immersive space theme with fully procedural,
physically-based 3D scenes, smooth scroll-driven storytelling, and a complete light/dark
design system — all engineered to stay at **60+ FPS** across desktop, tablet, and mobile.

---

## ✨ Highlights

- **Full-bleed 3D per section** — every section has its own cinematic scene (no boxed
  placeholders): hero spacecraft, Earth-orbit visualization, launch pad, satellite
  constellation, deep-space galaxy, holographic engineering, orbital timeline, mission
  control, and more.
- **Procedural, asset-free 3D** — planets, spacecraft, satellites, rockets, and stations are
  built from geometry + custom GLSL shaders (simplex noise, fresnel atmospheres, fbm
  nebulae). PBR reflections come from a procedural `Environment` (no external HDR needed).
- **Immersive interaction** — orbit controls, magnetic buttons, custom cursor, animated
  counters, scroll-reveal, parallax, micro-interactions, and page transitions.
- **Light & dark, dynamically** — the entire 3D environment, skybox, lighting, and UI
  transform live when you toggle the theme.
- **Performance-first** — quality tiers, adaptive DPR, lazy section canvases that unmount
  off-screen, tab-visibility pause, and a scroll state store that avoids per-frame React
  re-renders.
- **Accessible & SEO-ready** — semantic HTML, skip link, ARIA, keyboard-navigable nav and
  footer, reduced-motion support, and meta/Open Graph tags.

---

## 🧱 Tech Stack

| Layer        | Choice                                                          |
| ------------ | --------------------------------------------------------------- |
| Framework    | React 18 + TypeScript                                           |
| Build tool   | Vite                                                            |
| Styling      | Tailwind CSS (design tokens via CSS variables)                  |
| 3D           | Three.js · React Three Fiber · @react-three/drei · postprocessing |
| Animation    | GSAP · Framer Motion · Lenis (smooth scroll)                    |
| Lint/Types   | ESLint · TypeScript strict                                     |

---

## 🧭 Sections

`Home · Mission · Launch Services · Spacecraft · Satellite Solutions · Deep Space ·
Technology · Timeline · Global Impact · Careers · News · Contact`

Each section is a `SceneSection` whose 3D scene fills the background while content is
overlaid with readability scrims. The hero is a dedicated interactive canvas; the
persistent cosmic background provides continuity between sections.

---

## 📁 Project Structure

```
src/
├─ main.tsx                 # entry
├─ App.tsx                  # layout, scroll/theme wiring
├─ index.css               # design tokens, glass, cursor, reduced-motion
├─ store/
│  ├─ useStore.ts           # context + theme/quality/active-section state
│  ├─ AppProvider.tsx       # provider + device quality detection
│  └─ scroll.ts             # external scroll-progress store (no re-render storm)
├─ hooks/                   # useLenis, useInView, useCountUp, useMediaQuery, ...
├─ three/
│  ├─ SceneCanvas.tsx       # shared full-bleed, lazy, quality-gated 3D layer
│  ├─ BackgroundCanvas.tsx  # persistent cosmic backdrop
│  ├─ shaders.ts            # GLSL: nebula, stars, planet, atmosphere
│  ├─ Earth.tsx / Planet.tsx / Spacecraft.tsx / Satellite.tsx / RocketModel.tsx ...
│  └─ scenes/               # MissionScene, LaunchScene, SatelliteScene, ...
├─ components/
│  ├─ ui/                   # Navbar, Footer, SceneSection, GlassPanel, MagneticButton, ...
│  └─ sections/             # Hero, Mission, Launch, Spacecraft, ... (one per section)
└─ data/nav.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or pnpm/yarn)

### Install

```bash
npm install
```

### Development

```bash
npm run dev      # http://localhost:5173
```

### Production build

```bash
npm run build    # type-check (tsc) + Vite production bundle -> dist/
npm run preview  # serve the built dist/ locally
```

### Lint

```bash
npm run lint
```

---

## 🎛 Scripts

| Script            | Description                                  |
| ----------------- | -------------------------------------------- |
| `dev`             | Start Vite dev server with HMR               |
| `build`           | `tsc -b && vite build` (strict types + prod) |
| `preview`         | Preview the production build                 |
| `lint`            | ESLint over `.ts`/`.tsx` (zero warnings)    |
| `typecheck`       | `tsc -b --noEmit`                            |

---

## 🏗 Architecture Notes

- **3D layering** — A fixed `BackgroundCanvas` renders stars/nebula/depth. Each section
  renders a transparent `SceneCanvas` on top so the cosmic backdrop shows through;
  scenes are offset to the opposite side of the text for balanced composition.
- **Performance** — `SceneCanvas` mounts only while near the viewport (IntersectionObserver)
  and pauses (`frameloop="never"`) when the tab is hidden. `scroll.ts` keeps scroll progress
  out of React state so the tree doesn't re-render on every scroll frame. Quality tiers
  (low/medium/high) are chosen from device cores/memory and lower DPR + effect cost on weak
  hardware.
- **Theming** — `useStore` holds `theme`; toggling it updates `<html>` classes and the 3D
  palette (background, fog, sun, stars, nebula) without a reload. A transition flash makes
  the swap feel intentional.
- **Responsiveness** — Scenes read `useMediaQuery` to shift camera position, model scale,
  and particle counts per breakpoint, so compositions hold on phone, tablet, and desktop
  rather than merely scaling down.
- **Accessibility** — Respect `prefers-reduced-motion` (disables auto-rotate, uses
  `frameloop="demand"`, drops entrance animations), provides a skip link, focus-visible
  styles, and ARIA on interactive widgets.

---

## 🌐 Deployment

The app is a static SPA. Build with `npm run build` and serve the `dist/` folder on any
static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, S3 + CloudFront, etc.).
No server-side rendering or backend is required.

> **Note:** 3D scenes are fully procedural, so there are no large model/texture downloads.
> If you later add GLTF models or HDR environment maps, place them in `public/` and lazy-load
> them with `useGLTF` / `Environment files=...`.

---

## 🧩 Customization

- **Colors / theme tokens** — `src/index.css` (`:root` + `.light`) and
  `src/three/themePresets.ts` (3D palette per theme).
- **Navigation** — `src/data/nav.ts` and the group structure in
  `src/components/ui/Navbar.tsx` (top-level items + mega-menu groups).
- **Scenes** — add a component under `src/three/scenes/` and wrap a section in
  `SceneSection` (`src/components/ui/SceneSection.tsx`).

---

## 📄 License

This project is provided as a demonstration / template. Adjust the license as needed for
your organization.
