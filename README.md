# Saffron & Spice: Premium Restaurant Website

A fictional South & North Indian fusion restaurant site built with **React 18, Vite 5, Tailwind CSS 3 and Lucide React**.
All names, addresses, phone numbers and reviews are demo content. The reservation form validates input and shows an
on-screen confirmation only; **nothing is sent and no booking is made**.

## Requirements
- Node.js 18+ and npm

## NPM packages
- Runtime: `react`, `react-dom`, `lucide-react`
- Dev: `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`

## Install and run
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # preview the production build
```

## Structure
```
src/
  components/   Navbar, Hero, About, Menu, SpecialOffers, Gallery, Testimonials, Reservation, Contact, Footer
    ui/         Logo, Button, SectionHeading, SmartImage, Reveal
  data/content.js   All copy, prices, photo IDs, contact details
  hooks/        useScrolled, useActiveSection
  pages/Home.jsx
```
Edit `src/data/content.js` to change menu items, prices, offers, hours, address, and the WhatsApp number
(`CONTACT.whatsappNumber`, digits with country code).

## Images
Photography is loaded from Unsplash with responsive `srcset`, lazy loading, and a graceful fallback if a request fails.
For production, download the photos into `src/assets/` (or your CDN) and update `SmartImage`.

## 3D hero ("the dum reveal")
- `public/models/handi.glb`: brass biryani pot modelled in Blender (two nodes: `Pot` and `Lid`).
- `src/components/Hero3D.jsx`: React Three Fiber scene, lazy-loaded so it never blocks first paint.
  The lid drops and seals the pot, then lifts off to reveal a saffron biryani (procedural texture), with steam and
  saffron strands rising. Tap/click the pot to seal or lift the lid; scrolling turns and eases the pot away; the pointer
  tilts it. Rendering pauses when the hero is off-screen, honours `prefers-reduced-motion`, and the hero falls back to
  the photo-only layout if WebGL is unavailable.
- To change the model, re-export a GLB with nodes named `Pot*` and `Lid*` (lid pivot at the rim, Y-up, pot base at y=0).

## Deploy

### Vercel
1. Push the project to GitHub.
2. In Vercel: **Add New → Project**, import the repo. Framework preset: **Vite**.
3. Build command `npm run build`, output directory `dist`. Deploy.
   (CLI alternative: `npm i -g vercel && vercel --prod`.)

### Cloudflare Pages
1. Push the project to GitHub.
2. Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Framework preset **Vite**, build command `npm run build`, output directory `dist`. Deploy.
   (CLI alternative: `npm run build && npx wrangler pages deploy dist`.)

It is a single-page site with anchor navigation, so no rewrite rules are needed.
