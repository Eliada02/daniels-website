"use client";

import { useEffect, type RefObject } from "react";

export type MotionLevel = "Massima" | "Calma";

/**
 * useSiteMotion — faithful port of the original DCLogic.componentDidMount.
 *
 * Drives every scroll/pointer-based effect by querying declarative data-*
 * hooks inside the root element:
 *   [data-reveal]      reveal-on-scroll
 *   [data-tilt]        pointer parallax tilt
 *   [data-px]          scroll parallax (value = strength)
 *   [data-count]       animated number counter (data-from/to/suffix)
 *   [data-grow-bar]    bars that grow to their --h on scroll
 *   [data-particles]   <canvas> financial-symbol particle field
 *   [data-breathe]     pulsing CTA with click ripple
 * plus the fixed chrome: [data-progress] [data-barometer] [data-path-line]
 *   [data-cta-path] [data-heartbeat] [data-time-fill] and the <nav>.
 *
 * All work is DOM-mutating (no React state) so server-rendered sections are
 * untouched by re-renders — exactly as the original component behaved.
 */
export function useSiteMotion(
  rootRef: RefObject<HTMLDivElement | null>,
  motion: MotionLevel = "Massima",
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const calm = motion === "Calma";
    const pxScale = calm ? 0.4 : 1;
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const liteMotion =
      typeof window.matchMedia === "function" &&
      (window.matchMedia("(max-width: 767px)").matches ||
        window.matchMedia("(pointer: coarse)").matches);

    const cleanups: Array<() => void> = [];
    const rafIds = new Set<number>();
    const raf = (cb: FrameRequestCallback) => {
      const id = requestAnimationFrame(cb);
      rafIds.add(id);
      return id;
    };

    // ---------- COUNTERS ----------
    const runCounter = (el: HTMLElement) => {
      if (el.dataset.counted) return;
      el.dataset.counted = "1";
      const from = parseFloat(el.dataset.from || "0");
      const to = parseFloat(el.dataset.to || "0");
      const suffix = el.dataset.suffix || "";
      const dur = 1400;
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(from + (to - from) * e) + suffix;
        if (k < 1) raf(tick);
      };
      raf(tick);
    };

    // ---------- REVEAL ----------
    const revEls = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    const reveal = (el: HTMLElement) => {
      if (el.hasAttribute("data-shown")) return;
      el.setAttribute("data-shown", "");
      if (el.hasAttribute("data-count")) runCounter(el);
      el.querySelectorAll<HTMLElement>("[data-count]").forEach(runCounter);
    };
    const revealSweep = () => {
      const vh = window.innerHeight;
      revEls.forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.92) reveal(el);
      });
    };
    revealSweep();

    // ---------- TILT ----------
    if (!reduce) {
      root.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
        const tiltBase = getComputedStyle(card)
          .getPropertyValue("--tilt-base")
          .trim();
        const base = tiltBase ? tiltBase + " " : "";
        const onMove = (ev: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const rx = ((ev.clientY - r.top) / r.height - 0.5) * -7;
          const ry = ((ev.clientX - r.left) / r.width - 0.5) * 7;
          card.style.transition = "transform .2s ease";
          card.style.transform =
            base + `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
        };
        const onLeave = () => {
          card.style.transform = base + "translateY(0)";
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    // ---------- GROW BARS ----------
    const soln = document.getElementById("soluzione");
    let barsDone = false;
    const growBars = () => {
      if (barsDone || !soln) return;
      if (soln.getBoundingClientRect().top < window.innerHeight * 0.7) {
        barsDone = true;
        root.querySelectorAll<HTMLElement>("[data-grow-bar]").forEach((b) => {
          b.style.transition = reduce
            ? "none"
            : b.style.transition || "height 1s cubic-bezier(.23,1,.32,1)";
          b.style.height = getComputedStyle(b).getPropertyValue("--h");
        });
      }
    };
    growBars();

    // ---------- SCROLL ENGINE ----------
    const pxEls = [...root.querySelectorAll<HTMLElement>("[data-px]")];
    const q = <T extends Element>(sel: string) => root.querySelector<T>(sel);
    const progress = q<HTMLElement>("[data-progress]");
    const baro = q<HTMLElement>("[data-barometer]");
    const baroFill = q<HTMLElement>("[data-baro-fill]");
    const baroNum = q<HTMLElement>("[data-baro-num]");
    const pathLine = q<SVGPathElement>("[data-path-line]");
    const ctaPath = q<SVGPathElement>("[data-cta-path]");
    const heartbeat = q<SVGPathElement>("[data-heartbeat]");
    const timeFill = q<HTMLElement>("[data-time-fill]");
    const timeline = q<HTMLElement>("[data-timeline]");
    const nav = q<HTMLElement>("nav");
    const navLogo = q<HTMLElement>("[data-nav-logo]");
    const navLinks = q<HTMLElement>("[data-nav-links]");
    const navPanel = q<HTMLElement>("[data-nav-panel]");
    const eduSection = document.getElementById("educazione");

    const NAV_SECTIONS = [
      "hero",
      "problema",
      "soluzione",
      "metodo",
      "educazione",
      "testimonianze",
      "cta",
    ] as const;

    type NavSectionId = (typeof NAV_SECTIONS)[number];

    const NAV_THEME: Record<
      NavSectionId,
      { bg: string; ink: string; border: string; shadow: string }
    > = {
      hero: {
        bg: "#083833",
        ink: "#F9FAF5",
        border: "rgba(217,233,170,.14)",
        shadow: "0 12px 30px rgba(0,0,0,.18)",
      },
      problema: {
        bg: "#F9FAF5",
        ink: "#083833",
        border: "rgba(8,56,51,.08)",
        shadow: "0 10px 30px rgba(8,56,51,.06)",
      },
      soluzione: {
        bg: "#083833",
        ink: "#F9FAF5",
        border: "rgba(217,233,170,.14)",
        shadow: "0 12px 30px rgba(0,0,0,.18)",
      },
      metodo: {
        bg: "#F9FAF5",
        ink: "#083833",
        border: "rgba(8,56,51,.08)",
        shadow: "0 10px 30px rgba(8,56,51,.06)",
      },
      educazione: {
        bg: "#eef0e6",
        ink: "#083833",
        border: "rgba(8,56,51,.08)",
        shadow: "0 10px 30px rgba(8,56,51,.06)",
      },
      testimonianze: {
        bg: "#F9FAF5",
        ink: "#083833",
        border: "rgba(8,56,51,.08)",
        shadow: "0 10px 30px rgba(8,56,51,.06)",
      },
      cta: {
        bg: "#083833",
        ink: "#F9FAF5",
        border: "rgba(217,233,170,.14)",
        shadow: "0 12px 30px rgba(0,0,0,.18)",
      },
    };

    const sectionUnderNav = (probeY: number): NavSectionId => {
      let active: NavSectionId = "hero";
      let bestOverlap = -1;
      NAV_SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          const overlap =
            Math.min(r.bottom, probeY + 1) - Math.max(r.top, probeY);
          if (overlap > bestOverlap) {
            bestOverlap = overlap;
            active = id;
          }
        }
      });
      return active;
    };

    let ticking = false;
    const onScroll = () => {
      revealSweep();
      growBars();
      const sy =
        window.scrollY || document.documentElement.scrollTop || 0;
      const vh = window.innerHeight;
      const max = document.body.scrollHeight - vh;
      const p = Math.min(1, Math.max(0, sy / max));

      if (progress) progress.style.transform = `scaleX(${p})`;

      if (!reduce && !liteMotion)
        pxEls.forEach((el) => {
          const sp = parseFloat(el.dataset.px || "0") * pxScale;
          const r = el.getBoundingClientRect();
          const center = r.top + r.height / 2 - vh / 2;
          el.style.transform = `translateY(${(-center * sp).toFixed(1)}px)`;
        });

      if (pathLine) pathLine.style.strokeDashoffset = String(1 - p);
      const ctaEl = document.getElementById("cta");
      if (ctaPath && ctaEl) {
        const cr = ctaEl.getBoundingClientRect();
        const cp = Math.min(1, Math.max(0, (vh - cr.top) / (vh * 0.9)));
        ctaPath.style.strokeDashoffset = String(1 - cp);
      }

      const problemaEl = document.getElementById("problema");
      if (heartbeat && problemaEl) {
        const hr = problemaEl.getBoundingClientRect();
        const hp = Math.min(1, Math.max(0, (vh * 0.9 - hr.top) / (vh * 0.6)));
        heartbeat.style.strokeDashoffset = String(1 - hp);
      }

      if (timeFill && timeline) {
        const tr = timeline.getBoundingClientRect();
        const tp = Math.min(1, Math.max(0, (vh * 0.55 - tr.top) / tr.height));
        timeFill.style.height = tp * 100 + "%";
      }

      if (baro && eduSection) {
        const er = eduSection.getBoundingClientRect();
        const visible = er.top < vh * 0.9 && er.bottom > vh * 0.1;
        baro.style.opacity = visible ? "1" : "0";
        const ep = Math.min(1, Math.max(0, (vh * 0.6 - er.top) / (er.height * 0.8)));
        if (baroFill) baroFill.style.height = ep * 100 + "%";
        if (baroNum) baroNum.textContent = Math.round(ep * 100) + "%";
      }

      const navRect = nav?.getBoundingClientRect();
      const navProbe = navRect ? navRect.top + navRect.height / 2 : 28;
      const activeSection = sectionUnderNav(navProbe);
      const navTheme = NAV_THEME[activeSection];
      const heroImmersive = activeSection === "hero" && sy < 48;

      [navLogo, navLinks].forEach((n) => {
        if (n) n.style.color = navTheme.ink;
      });
      if (nav) {
        // Inherit ink on toggle + mobile links; solid bar matches each section.
        nav.style.color = navTheme.ink;
        if (heroImmersive) {
          nav.style.background = "transparent";
          nav.style.borderBottom = "1px solid transparent";
          nav.style.boxShadow = "none";
        } else {
          nav.style.background = navTheme.bg;
          nav.style.borderBottom = `1px solid ${navTheme.border}`;
          nav.style.boxShadow = navTheme.shadow;
        }
        nav.style.backdropFilter = "none";
      }
      if (navPanel) {
        navPanel.style.background = navTheme.bg;
        navPanel.style.color = navTheme.ink;
        navPanel.style.borderBottomColor = navTheme.border;
      }

      ticking = false;
    };
    const onScrollEvt = () => {
      if (!ticking) {
        ticking = true;
        raf(onScroll);
      }
    };
    window.addEventListener("scroll", onScrollEvt, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    cleanups.push(() => {
      window.removeEventListener("scroll", onScrollEvt);
      window.removeEventListener("resize", onScroll);
    });

    // ---------- PARTICLES ----------
    const particleField = (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const syms = ["€", "$", "%", "180", "360", "€", "%"];
      let W = 0,
        H = 0,
        dpr = 1;
      const mouse = { x: -9999, y: -9999 };
      const count = calm ? 14 : liteMotion ? 10 : 26;
      const resize = () => {
        dpr = Math.min(2, window.devicePixelRatio || 1);
        W = canvas.clientWidth;
        H = canvas.clientHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();
      const parts = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vy: -(0.12 + Math.random() * 0.4),
        vx: (Math.random() - 0.5) * 0.2,
        s: 11 + Math.random() * 18,
        a: 0.08 + Math.random() * 0.22,
        sym: syms[(Math.random() * syms.length) | 0],
      }));
      const onMove = (e: MouseEvent) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
      };
      const onLeave = () => {
        mouse.x = -9999;
        mouse.y = -9999;
      };
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);
      window.addEventListener("resize", resize);
      let alive = true;
      const draw = () => {
        if (!alive) return;
        ctx.clearRect(0, 0, W, H);
        parts.forEach((pt) => {
          const dx = pt.x - mouse.x;
          const dy = pt.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            const f = (14000 - d2) / 14000;
            pt.x += (dx / Math.sqrt(d2 + 1)) * f * 1.4;
            pt.y += (dy / Math.sqrt(d2 + 1)) * f * 1.4;
          }
          pt.x += pt.vx;
          pt.y += pt.vy;
          if (pt.y < -30) {
            pt.y = H + 20;
            pt.x = Math.random() * W;
          }
          if (pt.x < -30) pt.x = W + 20;
          if (pt.x > W + 30) pt.x = -20;
          ctx.font = `${pt.s}px ${getComputedStyle(document.body).getPropertyValue("--font-jetbrains") || "monospace"}, monospace`;
          ctx.fillStyle = `rgba(217,233,170,${pt.a})`;
          ctx.fillText(pt.sym, pt.x, pt.y);
        });
        raf(draw);
      };
      draw();
      cleanups.push(() => {
        alive = false;
        canvas.removeEventListener("mousemove", onMove);
        canvas.removeEventListener("mouseleave", onLeave);
        window.removeEventListener("resize", resize);
      });
    };
    if (!reduce)
      root
        .querySelectorAll<HTMLCanvasElement>("[data-particles]")
        .forEach(particleField);

    // ---------- BREATHE + RIPPLE ----------
    root.querySelectorAll<HTMLElement>("[data-breathe]").forEach((b) => {
      if (!reduce) b.style.animation = "dgBreathe 2.6s ease-in-out infinite";
      const onClick = (e: MouseEvent) => {
        const rip = document.createElement("span");
        const r = b.getBoundingClientRect();
        rip.style.cssText = `position:absolute; left:${e.clientX - r.left}px; top:${e.clientY - r.top}px; width:14px; height:14px; margin:-7px; border-radius:50%; background:rgba(8,56,51,.35); pointer-events:none; animation:dgRipple .7s ease-out forwards;`;
        b.style.position = "relative";
        b.style.overflow = "hidden";
        b.appendChild(rip);
        window.setTimeout(() => rip.remove(), 700);
      };
      b.addEventListener("click", onClick);
      cleanups.push(() => b.removeEventListener("click", onClick));
    });

    // safety net for environments where scroll events are throttled
    const engineTimer = window.setInterval(onScroll, 250);

    return () => {
      cleanups.forEach((fn) => fn());
      rafIds.forEach((id) => cancelAnimationFrame(id));
      window.clearInterval(engineTimer);
    };
  }, [rootRef, motion]);
}
