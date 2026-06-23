"use client";

import { useEffect, useState } from "react";
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

  return (
    <nav className="fixed inset-x-0 top-0 z-[160] border-b border-transparent bg-forest pt-[env(safe-area-inset-top)] text-cream transition-[background-color,color,box-shadow,border-color] duration-300">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3 sm:px-10 sm:py-3.5">
        {/* logo + monogram */}
        <a
          href="#hero"
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
        </a>

        {/* desktop links */}
        <div
          data-nav-links
          className="hidden items-center gap-1 text-inherit transition-colors duration-300 md:flex"
        >
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative px-3 py-2 text-[13px] font-semibold tracking-[0.01em] no-underline opacity-80 transition-opacity duration-200 hover:opacity-100"
            >
              {item.label}
              <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
          <a
            href="#cta"
            className="ml-3 rounded-full border border-current px-5 py-2 text-[13px] font-bold tracking-[0.02em] no-underline transition-colors duration-300 hover:border-sage hover:bg-sage hover:text-forest"
          >
            Parliamone
          </a>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative h-10 w-10 text-current md:hidden"
        >
          <span
            className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-current transition-all duration-300 ${
              open ? "rotate-45" : "-translate-y-[5px]"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-current transition-all duration-300 ${
              open ? "-rotate-45" : "translate-y-[5px]"
            }`}
          />
        </button>
      </div>

      {/* mobile panel */}
      <div
        data-nav-panel
        className={`absolute inset-x-0 top-full origin-top overflow-hidden border-b transition-[max-height,opacity,background-color,color,border-color] duration-300 ease-out md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-5 py-4 sm:px-6">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-[15px] font-semibold no-underline opacity-90 transition-colors hover:bg-sage/10 hover:opacity-100"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-sage px-5 py-3 text-center text-[14px] font-bold text-forest no-underline"
          >
            Parliamone
          </a>
        </div>
      </div>
    </nav>
  );
}
