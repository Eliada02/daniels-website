"use client";

import { useEffect, useState } from "react";
import { LoaderVisual } from "@/components/chrome/loader-visual";
import { siteConfig } from "@/lib/site-config";

const { loader } = siteConfig;

/**
 * Full-screen intro loader — treasure chest opens + liquidity bars grow.
 * Hides after window load + fonts, with a short minimum display for polish.
 */
export function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  useEffect(() => {
    let cancelled = false;
    const started = performance.now();
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minMs = reduce ? 320 : 1500;
    const exitMs = reduce ? 0 : 520;
    const maxMs = 4500;

    const dismiss = () => {
      if (cancelled) return;
      const wait = Math.max(0, minMs - (performance.now() - started));
      window.setTimeout(() => {
        if (cancelled) return;
        setExiting(true);
        window.setTimeout(() => {
          if (!cancelled) setVisible(false);
        }, exitMs);
      }, wait);
    };

    const maxTimer = window.setTimeout(dismiss, maxMs);

    const onReady = () => {
      void (document.fonts?.ready ?? Promise.resolve()).then(dismiss);
    };

    if (document.readyState === "complete") onReady();
    else window.addEventListener("load", onReady, { once: true });

    return () => {
      cancelled = true;
      window.clearTimeout(maxTimer);
      window.removeEventListener("load", onReady);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="dg-loader fixed inset-0 z-[500] grid place-items-center bg-forest px-5 text-cream"
      data-exiting={exiting || undefined}
      role="status"
      aria-live="polite"
      aria-busy={!exiting}
      aria-label={loader.status}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-[min(72vw,420px)] w-[min(72vw,420px)] rounded-full border border-sage/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 left-8 h-[min(50vw,280px)] w-[min(50vw,280px)] rounded-full border border-sage/10"
        aria-hidden
      />

      <div className="relative z-[1] flex w-full max-w-[min(92vw,400px)] flex-col items-center text-center">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-sage">
          {loader.kicker}
        </p>

        <LoaderVisual />

        <p className="mt-8 font-serif text-[clamp(26px,6.5vw,38px)] font-semibold leading-[1.05] tracking-[-0.02em]">
          {loader.headline}{" "}
          <em className="italic text-sage">{loader.headlineEm}</em>
        </p>

        <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/55">
          {loader.status}
        </p>
      </div>
    </div>
  );
}
