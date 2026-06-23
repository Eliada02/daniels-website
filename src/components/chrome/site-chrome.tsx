import { siteConfig } from "@/lib/site-config";

/** Shared SVG gradient used by the path rail and CTA path. */
export function GoldGradientDef() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <linearGradient id="dgGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9E9AA" />
          <stop offset="0.5" stopColor="#50772F" />
          <stop offset="1" stopColor="#083833" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Fixed scroll-progress bar pinned to the top of the viewport. */
export function ProgressBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[200] h-1 bg-forest/10">
      <div
        data-progress
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-olive to-forest"
      />
    </div>
  );
}

/** Vertical "knowledge barometer" that fills while the education section scrolls. */
export function Barometer() {
  return (
    <div
      data-barometer
      className="fixed right-[26px] top-1/2 z-[150] hidden -translate-y-1/2 flex-col items-center gap-3 opacity-0 transition-opacity duration-500 lg:flex"
    >
      <span className="rotate-180 font-mono text-[10px] uppercase tracking-[0.18em] text-olive [writing-mode:vertical-rl]">
        {siteConfig.barometerLabel}
      </span>
      <div className="flex h-[170px] w-1.5 flex-col justify-end overflow-hidden rounded-md bg-forest/10">
        <div
          data-baro-fill
          className="h-0 w-full bg-gradient-to-b from-sage via-olive to-forest"
        />
      </div>
      <span
        data-baro-num
        className="font-mono text-[11px] font-medium text-forest"
      >
        0%
      </span>
    </div>
  );
}

/** Liquid gold rail drawn down the left edge as the page scrolls. */
export function PathRail() {
  return (
    <svg
      data-path-rail
      viewBox="0 0 40 1000"
      preserveAspectRatio="none"
      className="pointer-events-none fixed left-6 top-0 z-[140] hidden h-screen w-10 opacity-90 lg:block"
    >
      <path
        d="M20 0 C 6 140, 34 280, 20 420 S 6 700, 20 1000"
        fill="none"
        stroke="rgba(8,56,51,.08)"
        strokeWidth={2}
      />
      <path
        data-path-line
        d="M20 0 C 6 140, 34 280, 20 420 S 6 700, 20 1000"
        fill="none"
        stroke="url(#dgGold)"
        strokeWidth={2.5}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
      />
    </svg>
  );
}
