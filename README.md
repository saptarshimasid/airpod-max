# AirPods Max — Sound in Form (Modern Full-Stack)

A state-of-the-art interactive design study of the Apple AirPods Max 2, converted to the latest versions of **Next.js**, **React.js**, **Node.js**, **Express.js**, **Tailwind CSS**, **GSAP**, **Lenis**, and **Framer Motion**.

---

## 🛠 Tech Stack & Versions

- **Next.js**: `v16.3+` (App Router, Turbopack, SSR/SSG ready)
- **React.js**: `v19.3+` (Latest React 19 architecture)
- **Node.js**: `v22.22+` (Modern Node LTS)
- **Express.js**: `v5.2+` (Modern Express backend REST API)
- **Tailwind CSS**: `v4.3+` (Modern styling & custom token system)
- **GSAP**: `v3.15+` (ScrollTrigger text scrub reveals & image parallax)
- **Lenis**: `v1.3+` (Inertial smooth scrolling synced with GSAP ticker)
- **Framer Motion**: `v14.0+` (Interactive layout morphing, modals & gesture drawers)
- **Web Audio API**: Real-time synthesized acoustic simulator (Noise Cancellation vs Transparency vs Spatial Audio)

---

## 🚀 Getting Started

### 1. Run Development (Frontend + Backend Concurrently)
```bash
npm run dev
```
- **Next.js Frontend**: [http://localhost:3000](http://localhost:3000)
- **Express.js API**: [http://localhost:5001](http://localhost:5001)

### 2. Run Individually
- Next.js Client only: `npm run dev:client`
- Express API Server only: `npm run dev:server`

### 3. Production Build
```bash
npm run build
npm start
```

---

## 🎧 Express.js Backend Endpoints

- `GET /api/health` — System status, uptime, Node version
- `GET /api/product` — Product specifications, hero text, pricing
- `GET /api/modes` — Active Noise Cancellation, Transparency, and Spatial Audio acoustic parameters
- `GET /api/finishes` — 5 finish colorways (Midnight, Starlight, Blue, Purple, Orange)
- `GET /api/gestures` — Complete tactile Digital Crown & button interactions
- `GET /api/gallery` — Editorial photography assets and design notes
- `POST /api/newsletter` — Newsletter subscription for acoustic updates
- `POST /api/interaction` — Audio telemetry and interaction logger

---

## ✨ Features

1. **Lenis & GSAP Sync**: Ultra-smooth 60/120fps scrolling with scrubbed word-by-word text reveals and depth parallax.
2. **Interactive Acoustic Simulator**: Built-in browser audio synthesis letting you test Active Noise Cancellation attenuation, Transparency pass-through, and Spatial 3D stereo panning with a live canvas visualizer.
3. **Interactive Finish Configurator**: Live preview of Midnight, Starlight, Blue, Purple, and Orange finishes with dynamic glow.
4. **Interactive Gesture Controls**: Smooth expandable accordion showcasing Digital Crown controls.
5. **Full-Screen Lightbox**: Editorial photo gallery with smooth modal transitions.
6. **Dynamic Theme Engine**: Seamless switching between light and dark mode with persistent user preference.
