import type { CSSProperties } from "react";

/**
 * Build a style object that may contain CSS custom properties (e.g.
 * `--reveal-delay`, `--tilt-base`, `--h`). React/TS doesn't type custom
 * properties, so this narrows the cast to one place.
 */
export function cssVars(
  style: Record<string, string | number>,
): CSSProperties {
  return style as CSSProperties;
}

/** Convenience: a reveal style with an optional stagger delay (seconds). */
export function reveal(delay = 0): CSSProperties {
  return delay ? cssVars({ "--reveal-delay": `${delay}s` }) : {};
}
