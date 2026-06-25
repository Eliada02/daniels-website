import { ContactForm } from "@/components/contact-form";
import { reveal } from "@/lib/css";
import { ctaBenefits, contactForm, siteConfig } from "@/lib/site-config";

export function Cta() {
  const whatsappHref = `https://wa.me/${contactForm.whatsapp.wa}?text=${encodeURIComponent(contactForm.whatsapp.preset)}`;

  return (
    <section
      id="cta"
      data-screen-label="CTA"
      className="relative flex min-h-0 flex-col justify-center overflow-hidden bg-olive py-24 text-cream md:min-h-[90vh] md:py-0"
    >
      <canvas data-particles="cta" className="absolute inset-0 z-[1] h-full w-full" />

      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      >
        <path
          data-cta-path
          d="M-50 700 C 360 640, 520 360, 820 320 S 1240 220, 1500 90"
          fill="none"
          stroke="url(#dgGold)"
          strokeWidth={3}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          style={{ filter: "drop-shadow(0 0 10px rgba(0,84,166,.45))" }}
        />
      </svg>

      <div className="relative z-[4] mx-auto w-full max-w-[1240px] px-5 pb-8 sm:px-10 md:pb-36 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14 xl:gap-20">
          <div className="lg:pr-2">
            <span
              data-reveal
              className="font-mono text-xs uppercase tracking-[0.22em] text-sage"
            >
              Parliamone
            </span>
            <h2
              data-reveal
              className="mt-[18px] font-serif text-[clamp(40px,5vw,76px)] font-semibold leading-[1.02] tracking-[-0.02em]"
            >
              Sblocchiamo
              <br />
              il tuo capitale.
              <br />
              <em className="italic text-sage">Insieme.</em>
            </h2>
            <p
              data-reveal
              style={reveal(0.1)}
              className="mt-6 max-w-[440px] text-lg leading-[1.65] text-cream/80"
            >
              Una conversazione, nessun impegno. Analizziamo i tuoi crediti e ti
              mostriamo quanta liquidità è già tua — solo, bloccata.
            </p>

            <div data-reveal style={reveal(0.2)} className="mt-8">
              <div className="font-serif text-[clamp(20px,4vw,24px)] font-semibold text-sage">
                Cosa otterrai
              </div>
              <ul className="mt-4 flex flex-col gap-3">
                {ctaBenefits.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-[15px] leading-normal text-cream/86"
                  >
                    <span className="font-bold text-sage">→</span> {b}
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-reveal
              style={reveal(0.3)}
              className="mt-8 flex w-full flex-col items-stretch gap-3 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center min-[420px]:gap-5"
            >
              <a
                href="#contatto"
                data-breathe
                className="rounded-full bg-cream px-9 py-[17px] text-center text-base font-bold text-olive no-underline shadow-[0_8px_28px_rgba(0,0,0,0.22)] transition-colors hover:bg-sage"
              >
                Prenota una consulenza
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-sage/45 px-5 py-2.5 text-center text-sm font-semibold text-sage no-underline transition-colors hover:bg-sage/10"
              >
                {contactForm.whatsapp.label}
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>

      <footer className="z-[4] mt-12 flex w-full flex-col items-start gap-3 border-t border-sage/[0.14] px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:px-10 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:pb-6 lg:px-16">
        <div className="flex min-w-0 items-baseline gap-2.5">
          <span className="shrink-0 font-serif text-2xl font-bold">
            {siteConfig.brand.initials}
          </span>
          <span className="min-w-0 truncate font-serif text-xs uppercase tracking-[0.3em] opacity-80">
            {siteConfig.brand.name}
          </span>
        </div>
        <span className="font-mono text-[10px] leading-relaxed text-cream/50 sm:text-[11px]">
          Finanza strutturata · Cessione del credito · © 2026
        </span>
      </footer>
    </section>
  );
}
