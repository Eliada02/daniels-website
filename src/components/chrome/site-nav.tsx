"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cssVars } from "@/lib/css";
import { siteConfig } from "@/lib/site-config";

/**
 * Fixed top navigation. The motion engine drives the per-section ink colour
 * and the scrolled background/blur/border via the data hooks below
 * (`nav`, [data-nav-logo], [data-nav-links]); everything else — layout,
 * hover states and the mobile menu — lives here.
 */
export function SiteNav({ solid = false }: { solid?: boolean } = {}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav
      data-menu-open={open || undefined}
      className={`fixed inset-x-0 top-0 z-[160] border-b border-transparent pt-[env(safe-area-inset-top)] transition-[background-color,color,box-shadow,border-color,backdrop-filter] duration-300 md:block ${
        solid ? "bg-olive text-cream shadow-[0_12px_30px_rgba(0,0,0,0.18)]" : ""
      } ${open ? "flex min-h-dvh flex-col" : ""}`}
    >
      <div
        className={`relative z-[2] mx-auto flex w-full max-w-[1280px] shrink-0 items-center justify-between gap-3 px-4 sm:px-10 ${
          open ? "border-b border-current/10 py-3.5 sm:py-4" : "py-3 sm:py-3.5"
        }`}
      >
        {/* logo + monogram */}
        <Link
          href="/"
          data-nav-logo
          onClick={() => setOpen(false)}
          className="group flex min-w-0 shrink items-center gap-2.5 text-inherit no-underline transition-colors duration-300 sm:gap-3"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-current/30 font-serif text-[17px] font-bold leading-none shadow-[inset_0_1px_0_rgba(249,250,245,0.08)] transition-colors duration-300 group-hover:border-current/70">
            {siteConfig.brand.initials}
          </span>
          <span className="hidden min-w-0 truncate font-serif text-[11px] uppercase tracking-[0.28em] opacity-85 min-[400px]:block sm:text-[12px] sm:tracking-[0.32em]">
            {siteConfig.brand.name}
          </span>
        </Link>

        {/* desktop links */}
        <div
          data-nav-links
          className="hidden items-center gap-1 text-inherit transition-colors duration-300 md:flex"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative px-3 py-2 text-[13px] font-semibold tracking-[0.01em] no-underline opacity-80 transition-opacity duration-200 hover:opacity-100"
            >
              {item.label}
              <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
          <Link
            href="/#cta"
            className="ml-3 rounded-full border border-current px-5 py-2 text-[13px] font-bold tracking-[0.02em] no-underline transition-colors duration-300 hover:border-sage hover:bg-sage hover:text-olive"
          >
            Parliamone
          </Link>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          onClick={() => setOpen((v) => !v)}
          className={`dg-nav-mobile-toggle relative grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-out md:hidden ${
            open
              ? "border-cream/15 bg-cream/[0.06]"
              : "border-current/15 bg-current/[0.05] hover:border-current/25 hover:bg-current/[0.08]"
          }`}
        >
          <span className="relative grid h-5 w-5 place-items-center">
            <span
              className={`absolute left-1/2 h-[1.5px] w-[15px] -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-out ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[calc(50%-4px)]"
              }`}
            />
            <span
              className={`absolute left-1/2 h-[1.5px] w-[15px] -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-out ${
                open ? "top-1/2 -translate-y-1/2 opacity-0" : "top-1/2 -translate-y-1/2"
              }`}
            />
            <span
              className={`absolute left-1/2 h-[1.5px] w-[15px] -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-out ${
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-[calc(50%+4px)]"
              }`}
            />
          </span>
        </button>
      </div>

      {/* mobile panel — full-screen editorial sheet */}
      <div
        id="mobile-nav-panel"
        data-nav-panel
        data-open={open || undefined}
        className={`dg-nav-mobile-panel relative z-[2] md:hidden ${open ? "flex-1" : ""}`}
      >
        <div className="dg-nav-mobile-panel-inner">
          <div className="relative flex min-h-min flex-col">
            {/* ambient decor */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="dg-nav-mobile-decor-glow absolute -right-16 top-[12%] h-56 w-56 rounded-full bg-sage/10 blur-3xl" />
              <div className="absolute -left-20 bottom-[18%] h-44 w-44 rounded-full bg-olive/25 blur-3xl" />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(249,250,245,.9) 1px, transparent 1px), linear-gradient(90deg, rgba(249,250,245,.9) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                  maskImage:
                    "radial-gradient(ellipse 90% 80% at 50% 45%, #000 20%, transparent 78%)",
                }}
              />
              <div className="absolute bottom-[22%] left-6 top-[14%] w-px bg-gradient-to-b from-transparent via-sage/35 to-transparent" />
              <div className="absolute right-8 top-[18%] font-serif text-[clamp(72px,22vw,120px)] font-bold leading-none tracking-[-0.04em] text-cream/[0.04]">
                {siteConfig.brand.initials}
              </div>
            </div>

            <div className="relative flex flex-col px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-1 sm:px-8 sm:pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pt-2">
              <div className="dg-nav-mobile-intro mt-3 max-w-[18rem] sm:mt-5">
                <span className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-sage/75">
                  <span className="h-px w-5 bg-sage/50" />
                  Menu
                </span>
                <p className="mt-3 font-serif text-[clamp(22px,5.5vw,34px)] font-medium leading-[1.12] tracking-[-0.02em] text-cream/92 sm:mt-4">
                  Naviga il percorso verso la liquidità.
                </p>
                <p className="dg-nav-mobile-intro-desc mt-2 text-[13px] leading-[1.5] text-cream/50 sm:mt-3 sm:text-[13.5px] sm:leading-[1.55]">
                  {siteConfig.brand.tagline}
                </p>
              </div>

              <nav
                aria-label="Navigazione principale"
                className="my-5 flex flex-col sm:my-8"
              >
                {siteConfig.nav.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    style={cssVars({ "--nav-i": i })}
                    className="dg-nav-mobile-link group relative block border-b border-cream/[0.08] py-3.5 no-underline transition-colors active:bg-cream/[0.04] sm:py-5"
                  >
                    <div className="flex items-center justify-between gap-3 pr-0.5 sm:items-start sm:gap-4 sm:pr-1">
                      <div className="min-w-0 flex-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-sage/55">
                          0{i + 1}
                        </span>
                        <span className="mt-1.5 block font-serif text-[clamp(22px,6vw,40px)] font-semibold leading-[1.05] tracking-[-0.02em] sm:mt-2 sm:leading-[1.02]">
                          {item.label}
                        </span>
                        <span className="dg-nav-mobile-link-hint mt-1.5 block text-[12.5px] leading-snug text-cream/45 sm:mt-2 sm:text-[13px]">
                          {item.hint}
                        </span>
                      </div>
                      <span
                        aria-hidden
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cream/12 bg-cream/[0.04] text-sm text-sage/70 transition-all duration-300 group-active:border-sage/35 group-active:bg-sage/10 group-active:text-sage sm:mt-5 sm:h-10 sm:w-10"
                      >
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </nav>

              <div className="dg-nav-mobile-footer mt-4 border-t border-cream/10 pt-5 sm:mt-auto sm:pt-7">
                <Link
                  href="/#cta"
                  onClick={() => setOpen(false)}
                  data-breathe
                  style={cssVars({ "--nav-i": siteConfig.nav.length })}
                  className="dg-nav-mobile-cta flex w-full items-center justify-between gap-4 rounded-full border border-sage/40 bg-sage px-5 py-4 text-[14px] font-bold tracking-[0.02em] text-forest no-underline shadow-[0_12px_36px_rgba(126,200,255,0.32)] transition-transform duration-300 active:scale-[0.98]"
                >
                  <span>Parliamone</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-forest/10 font-serif text-base leading-none">
                    →
                  </span>
                </Link>
                <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-cream/35">
                  {siteConfig.brand.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
