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
export function SiteNav() {
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
      className="fixed inset-x-0 top-0 z-[160] border-b border-transparent bg-olive pt-[env(safe-area-inset-top)] text-cream transition-[background-color,color,box-shadow,border-color,backdrop-filter] duration-300"
    >
      <div className="relative z-[2] mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3 sm:px-10 sm:py-3.5">
        {/* logo + monogram */}
        <Link
          href="/"
          data-nav-logo
          onClick={() => setOpen(false)}
          className="group flex min-w-0 items-center gap-2.5 text-inherit no-underline transition-colors duration-300 sm:gap-3"
        >
          <span className="grid h-9 w-9 place-items-center rounded-md border border-current/30 font-serif text-[17px] font-bold leading-none transition-colors duration-300 group-hover:border-current/70">
            {siteConfig.brand.initials}
          </span>
          <span className="max-w-[9.5rem] truncate font-serif text-[10px] uppercase tracking-[0.22em] opacity-85 sm:hidden">
            {siteConfig.brand.name}
          </span>
          <span className="hidden font-serif text-[12px] uppercase tracking-[0.32em] opacity-85 sm:block">
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
            className="ml-3 rounded-full border border-current px-5 py-2 text-[13px] font-bold tracking-[0.02em] no-underline transition-colors duration-300 hover:border-olive hover:bg-olive hover:text-cream"
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
          className={`relative grid h-11 w-11 place-items-center rounded-full transition-all duration-300 ease-out md:hidden ${
            open ? "bg-current/[0.08] ring-1 ring-current/15" : "bg-transparent"
          }`}
        >
          <span
            className={`absolute left-1/2 h-[1.5px] w-[22px] -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-out ${
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[calc(50%-5px)]"
            }`}
          />
          <span
            className={`absolute left-1/2 h-[1.5px] w-[22px] -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-out ${
              open ? "top-1/2 -translate-y-1/2 opacity-0" : "top-1/2 -translate-y-1/2"
            }`}
          />
          <span
            className={`absolute left-1/2 h-[1.5px] w-[22px] -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-out ${
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-[calc(50%+5px)]"
            }`}
          />
        </button>
      </div>

      {/* mobile backdrop */}
      <button
        type="button"
        aria-label="Chiudi menu"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
        className={`dg-nav-mobile-backdrop fixed inset-0 top-0 z-[1] bg-forest/55 backdrop-blur-[6px] transition-[opacity,visibility] duration-500 ease-out md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      />

      {/* mobile panel */}
      <div
        id="mobile-nav-panel"
        data-nav-panel
        data-open={open || undefined}
        className="dg-nav-mobile-panel relative z-[2] md:hidden"
      >
        <div className="dg-nav-mobile-panel-inner overflow-hidden">
          <div className="border-t border-current/[0.08] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] opacity-50">
              Navigazione
            </p>
            <div className="flex flex-col gap-1">
              {siteConfig.nav.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={cssVars({ "--nav-i": i })}
                  className="dg-nav-mobile-link group flex items-center gap-4 rounded-xl px-3 py-3.5 no-underline transition-colors active:bg-current/[0.06]"
                >
                  <span className="font-mono text-[11px] tracking-[0.16em] opacity-40">
                    0{i + 1}
                  </span>
                  <span className="font-serif text-[clamp(20px,5.5vw,24px)] font-semibold leading-none tracking-[-0.01em]">
                    {item.label}
                  </span>
                  <span className="ml-auto translate-x-1 text-sm opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-50">
                    →
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href="/#cta"
              onClick={() => setOpen(false)}
              className="dg-nav-mobile-link mt-4 flex w-full items-center justify-center rounded-full bg-olive px-5 py-3.5 text-center text-[14px] font-bold tracking-[0.02em] text-cream no-underline shadow-[0_8px_24px_rgba(0,84,166,0.32)] transition-transform duration-300 active:scale-[0.98]"
              style={cssVars({ "--nav-i": siteConfig.nav.length })}
            >
              Parliamone
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
