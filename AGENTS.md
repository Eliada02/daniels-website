<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Daniele Di Giorgio — site build rules

Single-page marketing site for a structured-finance consultant (credit
assignment / *cessione del credito*). Italian copy. Ported from a standalone
bundled HTML design into **Next.js 16 (App Router) + Tailwind v4 + shadcn/ui**.

**These rules are binding. Apply them to every change — new sections, copy
edits, restyling, or new animations — so the design system stays coherent.**

## Stack & commands

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS **v4** (CSS-first
  config in `src/app/globals.css`, no `tailwind.config`), shadcn/ui (`src/components/ui`).
- `npm run dev` · `npm run build` · `npm run lint`. **Run `npm run lint` and
  `npm run build` before declaring a change done.**

## Project map

| Path | Responsibility |
| --- | --- |
| `src/app/globals.css` | **Design tokens** (color/type/motion) in `@theme`, shadcn token mapping, reveal rules. The single source of truth for the system. |
| `src/app/layout.tsx` | Fonts (Cormorant Garamond, Manrope, JetBrains Mono) + metadata. |
| `src/app/page.tsx` | Composes chrome + the 7 sections inside `<SiteMotion>`. |
| `src/lib/site-config.ts` | **All copy & content data** + the configurable props (`motion`, `accentWarm`). |
| `src/lib/css.ts` | `cssVars()` / `reveal()` helpers for CSS-custom-property styles. |
| `src/hooks/use-site-motion.ts` | The motion engine (scroll/pointer effects). |
| `src/components/site-motion.tsx` | Client wrapper hosting `[data-root]` + the engine. |
| `src/components/chrome/` | Fixed UI: progress bar, barometer, path rail, nav, gradient defs. |
| `src/components/sections/` | The 7 page sections (server components). |

## Design system — change tokens HERE, never hardcode

All brand values live in the `@theme` block of `globals.css`. To retheme,
edit the token; do **not** sprinkle new hex values across components.

### Colour palette (Tailwind utilities `bg-/text-/border-…`)

| Token | Hex | Use for |
| --- | --- | --- |
| `forest` | `#083833` | Dark-section backgrounds, primary ink on light. |
| `cream` | `#F9FAF5` | Light-section backgrounds, text on dark. |
| `sage` | `#D9E9AA` | Accent: highlights, CTAs, italic emphasis, gold-rail top. |
| `olive` | `#50772F` | Mono kicker labels, secondary accent, focus ring. |
| `clay` | `var(--accent-warm)` (`#c2683f`) | Warm accent: pain dots, ✕ marks. Configurable. |
| `mist` | `#eef0e6` | Education section background only. |

- Opacity is expressed with the slash modifier on a token, e.g.
  `text-cream/80`, `border-forest/[0.08]`. Don't introduce new raw `rgba()`
  except inside multi-stop gradients / shadows where a token can't reach.
- Sections alternate **dark (forest)** and **light (cream/mist)**. The nav
  recolours itself per section via `sectionAt()` in the engine — if you add or
  reorder sections, update the `light`/`dark` id lists in
  `use-site-motion.ts`.

### Typography

| Family | Utility | Role |
| --- | --- | --- |
| Cormorant Garamond | `font-serif` | Headings (`h1–h4`), big numbers, blockquotes. Weights 500/600/700, italic for emphasis. |
| Manrope | `font-sans` (default) | Body copy, nav, list text. |
| JetBrains Mono | `font-mono` | Kickers, labels, counters, chips, footer meta — usually uppercase with wide tracking (`tracking-[0.22em]`). |

- Headlines use fluid sizing: `text-[clamp(min,vw,max)]`,
  `leading-[1.0x]`, `tracking-[-0.02em]`. Keep that pattern for new headings.

### Radii & shadows

Cards: `rounded-lg` (≈8px). Pills/CTAs: `rounded-full`. Shadows are bespoke
per tone — copy the closest existing card's `shadow-[…]` rather than inventing.

## Motion system

Effects are **declarative**: you add a `data-*` hook in markup and the engine
(`use-site-motion.ts`) wires the behaviour against `[data-root]`. Server
sections stay server-rendered; the engine only mutates the DOM (no React
state), so never manage these effects with `useState`.

| Hook | Effect | Notes |
| --- | --- | --- |
| `data-reveal` | Fade/slide-up when scrolled into view (≤92% vh). | Stagger via `style={reveal(seconds)}`. Base rotation via `--tilt-base`. |
| `data-tilt` | Pointer 3D tilt. | Pair with `data-reveal`. Resting rotation read from `--tilt-base`. |
| `data-px="0.4"` | Scroll parallax; value = strength (negative = opposite). | |
| `data-count` + `data-from/-to/-suffix` | Number counts up on reveal. | Initial text should equal the `from` value. |
| `data-grow-bar` + `--h` | Bar grows from 0 to `--h` when the solution section nears. | Set `height:0` + a `transition` inline. |
| `data-particles="id"` | `<canvas>` financial-symbol particle field. | |
| `data-breathe` | Pulsing CTA + click ripple. | |

Fixed-chrome hooks (`data-progress`, `data-barometer`/`-baro-fill`/`-baro-num`,
`data-path-line`, `data-cta-path`, `data-heartbeat`, `data-time-fill`,
`data-timeline`, `data-nav-logo`, `data-nav-links`) are owned by the chrome
components — keep exactly one of each.

- Keyframes live in `@theme` (`dgFloat`, `dgBreathe`, `dgPulse`, `dgReveal`,
  `dgRipple`, `dgSpin`). Reusable ones are exposed as `animate-*` utilities.
- **Respect `prefers-reduced-motion`** — the engine and CSS already disable
  parallax, tilt, particles, and reveal. Any new effect must degrade too.
- Configurable props mirror the original component: `siteConfig.motion`
  (`"Massima"` full / `"Calma"` reduced) and `siteConfig.accentWarm`
  (also settable via the `--accent-warm` CSS variable).

## Component conventions

- **Sections are server components** under `src/components/sections/`; only
  `site-motion.tsx` and `hooks/*` are `"use client"`. Don't add `"use client"`
  to a section unless it truly needs browser APIs.
- **Copy and repeated content go in `src/lib/site-config.ts`** as typed data;
  map over it in JSX. Don't inline new lists of cards/steps/testimonials.
- Each section is `<section id="…" data-screen-label="…">` with the id used by
  the nav anchors and the engine. Keep ids stable.
- For inline CSS custom properties use `cssVars({...})` / `reveal()` from
  `src/lib/css.ts` — never cast to `any`.
- Prefer brand utilities over shadcn defaults for bespoke layout; reach for a
  shadcn primitive (`src/components/ui`) only when it genuinely fits, and it
  will already inherit the palette via the mapped tokens.

## Adding a new section (checklist)

1. Create `src/components/sections/<name>.tsx` (server component), `id` + `data-screen-label`.
2. Put its copy/data in `site-config.ts`.
3. Use brand tokens + the heading/kicker patterns above; add `data-reveal`
   (+ stagger) to entrance elements.
4. Register it in `src/app/page.tsx` in scroll order.
5. Add its `id` to the `light`/`dark` lists in `use-site-motion.ts` so the nav
   recolours correctly.
6. `npm run lint && npm run build`.
