import type { ReactNode } from "react";
import {
  aboutCertificazioni,
  aboutCompetenze,
  aboutFormazione,
  aboutHero,
  aboutStats,
  aboutTimeline,
  type CvIcon,
  type CvMilestone,
  siteConfig,
} from "@/lib/site-config";

/* ------------------------------------------------------------------ */
/* Inline line-icon set. Stroke uses currentColor so each call site
   controls colour via text-* utilities. Keys mirror CvIcon.          */
/* ------------------------------------------------------------------ */
const ICON_PATHS: Record<CvIcon, ReactNode> = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
    </>
  ),
  flag: (
    <>
      <path d="M4 21V4a1 1 0 0 1 1-1h12l-2 4 2 4H5" />
    </>
  ),
  cap: (
    <>
      <path d="M22 9 12 5 2 9l10 4 10-4Z" />
      <path d="M6 11v5c0 1 2.5 2.5 6 2.5s6-1.5 6-2.5v-5" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="m7 14 3-4 3 3 5-7" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </>
  ),
  users: (
    <>
      <path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="3" />
      <path d="M22 20v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
    </>
  ),
  star: (
    <path d="m12 2 2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  rocket: (
    <>
      <path d="M5 14c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8a2 2 0 0 0-3 .8Z" />
      <path d="M9 12c2-4 5-7 11-7 0 6-3 9-7 11l-4-4Z" />
      <path d="M9 12 5.5 11 9 12Zm3 3 1 3.5L12 15Z" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="5" />
      <path d="M8.5 12.5 7 22l5-3 5 3-1.5-9.5" />
    </>
  ),
};

function Icon({ name, className }: { name: CvIcon; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Timeline node — the circular marker on the rail.                   */
/* ------------------------------------------------------------------ */
function TimelineNode({ m }: { m: CvMilestone }) {
  const filled = m.variant === "start" || m.variant === "goal";
  return (
    <span
      className={`relative z-[1] grid h-12 w-12 shrink-0 place-items-center rounded-full ${
        filled
          ? "bg-olive text-cream shadow-[0_8px_20px_rgba(0,84,166,0.28)]"
          : "border-2 border-olive bg-cream text-olive"
      }`}
    >
      <Icon name={m.icon} className="h-5 w-5" />
    </span>
  );
}

function MilestoneText({ m, center }: { m: CvMilestone; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      {m.kicker ? (
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-olive">
          {m.kicker}
        </span>
      ) : null}
      <span className="mt-1 block font-mono text-[12px] tracking-[0.12em] text-olive/70">
        {m.period}
      </span>
      <h3 className="mt-1.5 font-serif text-[clamp(19px,2vw,23px)] font-semibold leading-[1.15] text-forest">
        {m.title}
      </h3>
      {m.subtitle ? (
        <p className="mt-0.5 text-[13.5px] font-medium text-forest/60">
          {m.subtitle}
        </p>
      ) : null}
      <p
        className={`mt-2 text-[14px] leading-[1.6] text-forest/70 ${
          center ? "mx-auto max-w-[15rem]" : ""
        }`}
      >
        {m.body}
      </p>
    </div>
  );
}

export function AboutCv() {
  return (
    <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-10 sm:py-20 lg:py-24">
      {/* ============================ HEADER ============================ */}
      <header className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* profile */}
        <div className="flex flex-col items-start gap-7 sm:flex-row">
          <div className="grid h-28 w-28 shrink-0 place-items-center rounded-full border-2 border-olive bg-white font-serif text-[34px] font-bold tracking-[-0.02em] text-olive shadow-[0_12px_34px_rgba(0,84,166,0.14)] sm:h-32 sm:w-32">
            {siteConfig.brand.initials}
          </div>
          <div>
            <h1 className="font-serif text-[clamp(34px,5.5vw,56px)] font-bold uppercase leading-[0.98] tracking-[-0.01em] text-olive">
              {siteConfig.brand.name}
            </h1>
            <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.26em] text-forest/55">
              {aboutHero.role}
            </p>
            <p className="mt-4 max-w-[34rem] text-[15.5px] leading-[1.65] text-forest/72">
              {aboutHero.summary}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {aboutHero.contact.map((c) => {
                const inner = (
                  <>
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-olive/10 text-olive">
                      <Icon name={c.icon} className="h-4 w-4" />
                    </span>
                    <span className="text-[14px] text-forest/80">{c.value}</span>
                  </>
                );
                return (
                  <li key={c.value}>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="flex items-center gap-2.5 no-underline transition-colors hover:text-olive"
                      >
                        {inner}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2.5">{inner}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* competenze */}
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-olive">
            Competenze
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {aboutCompetenze.map((s) => (
              <div key={s.label}>
                <span className="mb-1.5 block text-[13.5px] font-medium text-forest/80">
                  {s.label}
                </span>
                <span className="block h-1.5 w-full overflow-hidden rounded-full bg-olive/15">
                  <span
                    className="block h-full rounded-full bg-olive"
                    style={{ width: `${s.value}%` }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ============================ TIMELINE ============================ */}
      <section className="mt-20 lg:mt-28">
        <h2 className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.24em] text-olive">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-olive" />
          Il mio percorso professionale
        </h2>

        {/* desktop — horizontal rail */}
        <div className="relative mt-14 hidden lg:block">
          <div className="absolute inset-x-0 top-6 h-0.5 bg-olive/20" />
          <ol className="relative flex justify-between gap-5">
            {aboutTimeline.map((m) => (
              <li
                key={m.title + m.period}
                className="flex flex-1 flex-col items-center"
              >
                <TimelineNode m={m} />
                <div className="mt-5">
                  <MilestoneText m={m} center />
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* mobile / tablet — vertical rail */}
        <ol className="relative mt-10 lg:hidden">
          <span className="absolute bottom-2 left-6 top-2 w-0.5 -translate-x-1/2 bg-olive/20" />
          {aboutTimeline.map((m) => (
            <li
              key={m.title + m.period}
              className="relative flex gap-5 pb-9 last:pb-0"
            >
              <TimelineNode m={m} />
              <div className="pt-0.5">
                <MilestoneText m={m} />
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ===================== FORMAZIONE + CERTIFICAZIONI ===================== */}
      <section className="mt-16 grid grid-cols-1 gap-8 rounded-2xl bg-mist p-8 sm:p-10 md:grid-cols-2 md:gap-12">
        <div>
          <h2 className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-olive">
            <Icon name="cap" className="h-4 w-4" />
            Formazione
          </h2>
          <h3 className="mt-4 font-serif text-[20px] font-semibold leading-[1.2] text-forest">
            {aboutFormazione.degree}
          </h3>
          <p className="mt-1 text-[14px] text-forest/70">{aboutFormazione.school}</p>
          <p className="mt-1 font-mono text-[12px] tracking-[0.12em] text-olive/70">
            {aboutFormazione.period}
          </p>
        </div>
        <div>
          <h2 className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-olive">
            <Icon name="award" className="h-4 w-4" />
            Corsi &amp; Certificazioni
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {aboutCertificazioni.map((c) => (
              <li
                key={c}
                className="flex gap-3 text-[14.5px] leading-[1.5] text-forest/80"
              >
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-olive" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ STATS ============================ */}
      <section className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-forest/10 pt-12 md:grid-cols-4">
        {aboutStats.map((s) => (
          <div key={s.label} className="flex items-center gap-3.5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-olive/10 text-olive">
              <Icon name={s.icon} className="h-5 w-5" />
            </span>
            <div>
              <span className="block font-serif text-[30px] font-bold leading-none text-olive">
                {s.value}
                <span className="text-[20px]">{s.suffix}</span>
              </span>
              <span className="mt-1 block text-[12.5px] leading-snug text-forest/65">
                {s.label}
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
