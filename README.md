# Daniele Di Giorgio — sito

Single-page marketing site for a structured-finance consultant (*cessione del
credito*), built with **Next.js 16 (App Router), Tailwind CSS v4 and
shadcn/ui**. Ported faithfully from the original standalone HTML design,
including every scroll/pointer animation.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## How it's organised

- **Design tokens** (colour, type, motion) → `src/app/globals.css` (`@theme`).
- **Copy & content** → `src/lib/site-config.ts`.
- **Sections** (server components) → `src/components/sections/`.
- **Fixed chrome** (nav, progress bar, barometer, path rail) → `src/components/chrome/`.
- **Motion engine** (reveal, tilt, parallax, counters, particles, scroll-driven
  chrome) → `src/hooks/use-site-motion.ts`, hosted by `src/components/site-motion.tsx`.

Animations are declarative: add a `data-*` hook (`data-reveal`, `data-tilt`,
`data-px`, `data-count`, `data-grow-bar`, `data-particles`, `data-breathe`) in
markup and the engine wires the behaviour.

### Configurable props

`src/lib/site-config.ts` exposes the two original component props:

- `motion`: `"Massima"` (full) or `"Calma"` (reduced parallax & particles).
- `accentWarm`: the warm accent colour (also settable via the `--accent-warm`
  CSS variable in `globals.css`).

## Build rules

Conventions that keep the design system coherent across changes are documented
in **`AGENTS.md`** (imported by `CLAUDE.md`) and mirrored for Cursor in
**`.cursor/rules/design-system.mdc`**. Read them before editing.
