# Majemu Olowodola — Portfolio

A cinematic, editorial portfolio for an Event Host / MC / Compère / Moderator. Built as a premium digital experience: the homepage is structured like a live event — curtains open, meet your host, the performance, trusted voices, backstage access, encore.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — design tokens in `tailwind.config.ts` (`blood` #A81408, `ink`, `bone`, `cream`)
- **GSAP + ScrollTrigger** — all scroll animations, pinned sections, scrubbed timelines
- **Lenis** — smooth scrolling (synced to ScrollTrigger via the GSAP ticker)
- **react-icons** — footer/contact icons
- Self-hosted variable fonts (`public/fonts`): Archivo (display), Fraunces (editorial serif), Ephesis (signature script) — no external font requests

> Note: Framer Motion was intentionally omitted. GSAP covers every interaction on the site, and shipping two animation runtimes would only add bundle weight.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

Deploy anywhere Next.js runs — Vercel is zero-config: push the repo and import it.

## Structure

```
app/
  layout.tsx        # metadata/SEO, preloader, cursor, smooth scroll
  page.tsx          # section order
  globals.css       # fonts, type utilities, marquee, grain overlay
components/
  Preloader.tsx     # letter reveal + counter + column wipe
  Cursor.tsx        # custom cursor (dot + ring + contextual labels)
  Nav.tsx           # mix-blend nav + fullscreen red menu
  Hero.tsx          # overlapping typography, scroll-split, parallax portrait
  Manifesto.tsx     # "I don't host events" statement + word reveals
  Brands.tsx        # infinite text marquee (two rows, opposite directions)
  Events.tsx        # editorial masonry gallery with hover metadata
  Energy.tsx        # pinned fullscreen word sequence w/ background transitions
  Numbers.tsx       # animated count-up stats
  Process.tsx       # timeline with scroll-drawn line
  Testimonials.tsx  # editorial quotes, scrub word-by-word ink-in
  Backstage.tsx     # horizontal pinned B&W strip (color on hover)
  FAQ.tsx           # animated accordion
  FinalCTA.tsx      # fullscreen red encore + booking CTA
  Footer.tsx
  FloatingBook.tsx  # floating "Book Majemu" pill
lib/
  data.ts           # ALL site copy/content — edit here
  gsap.ts           # plugin registration
public/images/      # optimized photography
```

## Hosting images on Cloudinary

The site is pre-wired for Cloudinary via a custom `next/image` loader (`lib/cloudinary-loader.js`). No component changes needed — flip it on with one env var.

1. Create a free account at cloudinary.com and note your **cloud name** (dashboard, top-left).
2. Upload the images (keeps filenames as public IDs, in a `majemu/` folder):
   ```bash
   npm i -D cloudinary
   export CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>   # from dashboard
   node scripts/upload-cloudinary.mjs
   ```
   (Or drag the files from `public/images` into a `majemu` folder in the Media Library — enable "Use filename as public ID" in Settings → Upload first.)
3. Copy `.env.example` to `.env.local` and set:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD=<your cloud name>
   ```
4. Restart `npm run dev`. Every image now serves from Cloudinary's CDN with `f_auto` (AVIF/WebP), `q_auto`, and the exact width each viewport needs. On Vercel, add the same env var in Project Settings → Environment Variables.

With the env var **unset**, images fall back to local `/public/images` — so dev works with zero setup. Once you're fully on Cloudinary you can delete `public/images` from the deployed repo to slim it down.

## Editing content

Everything user-facing (brands, events, testimonials, FAQs, stats, contact details) lives in **`lib/data.ts`**. Swap the placeholder email/phone/socials there before going live.

## Accessibility & performance

- `prefers-reduced-motion` disables smooth scroll, pinning and heavy animation
- Custom cursor only activates on fine pointers (desktop)
- `next/image` with responsive `sizes` on all photography; fonts subset + `font-display: swap`
- Semantic HTML (`section`, `figure`, `blockquote`, `nav`), aria labels on toggles
- Static export-friendly: the whole page prerenders (First Load JS ≈ 149 kB)

## Adding video later

When you have showreel/event footage, the natural slots are: the Hero background (swap the portrait for a muted looping `<video>`), a Showreel section after Manifesto, and entries in `EVENTS` (extend `EventItem` with a `video` field and render `<video muted loop>` on hover).
