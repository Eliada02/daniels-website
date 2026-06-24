import { reveal } from "@/lib/css";
import { TreasureChest } from "@/components/hero/treasure-chest";

const floatChip =
  "absolute z-[3] hidden whitespace-nowrap rounded-full border border-cream/25 bg-cream/[0.08] px-3.5 py-2 font-mono text-[13px] text-sage backdrop-blur-sm xl:block";

// Positioned in the empty outer gutters so they frame the composition
// without ever sitting on top of the headline or portrait.
const chips = [
  { text: "€ 1.2M sbloccati", pos: "left-[3%] top-[26%]", px: "0.55", anim: "dgFloat 7s ease-in-out infinite" },
  { text: "180 → 0 giorni", pos: "left-[6%] bottom-[20%]", px: "0.8", anim: "dgFloat 9s ease-in-out infinite .8s" },
  { text: "+ liquidità, − debito", pos: "right-[4%] top-[16%]", px: "0.65", anim: "dgFloat 8s ease-in-out infinite .4s" },
];

export function Hero() {
  return (
    <section
      id="hero"
      data-screen-label="Hero"
      className="relative flex min-h-[100svh] flex-col justify-start overflow-hidden bg-olive pt-[calc(env(safe-area-inset-top)+4.75rem)] pb-24 text-cream sm:justify-center sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32"
    >
      <canvas data-particles="hero" className="absolute inset-0 z-[1] h-full w-full" />

      {/* geometric background rings */}
      <div
        data-px="0.12"
        className="pointer-events-none absolute -right-[60px] -top-10 z-[1] h-[280px] w-[280px] rounded-full border border-cream/20 sm:-right-[120px] sm:-top-20 sm:h-[560px] sm:w-[560px]"
      />
      <div
        data-px="0.2"
        className="pointer-events-none absolute -bottom-24 right-8 z-[1] h-[200px] w-[200px] rounded-full border border-cream/15 sm:-bottom-40 sm:right-[120px] sm:h-[360px] sm:w-[360px]"
      />

      {/* floating value chips (wide screens only, in the side gutters) */}
      {chips.map((c) => (
        <div
          key={c.text}
          data-px={c.px}
          className={`${floatChip} ${c.pos}`}
          style={{ animation: c.anim }}
        >
          {c.text}
        </div>
      ))}

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-5 sm:gap-10 sm:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-16">
        {/* headline — first on mobile, right column on desktop */}
        <div className="relative isolate z-10 order-1 lg:order-2">
          <span
            data-reveal
            className="mb-5 inline-flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-sage sm:mb-6 sm:text-xs sm:tracking-[0.22em]"
          >
            <span className="h-px w-6 shrink-0 bg-sage sm:w-[30px]" />
            Finanza strutturata · Cessione del credito
          </span>
          <h1
            data-reveal
            style={reveal(0.1)}
            className="font-serif text-[clamp(32px,8.5vw,84px)] font-semibold leading-[1.04] tracking-[-0.02em] 2xl:-ml-10"
          >
            Il capitale bloccato
            <br />
            nelle tue fatture,
            <br />
            <em className="italic text-sage">trasformato</em> in flusso
            <br />
            di cassa prevedibile.
          </h1>
          <p
            data-reveal
            style={reveal(0.3)}
            className="mt-5 max-w-[480px] text-base leading-[1.65] text-cream/[0.78] sm:mt-7 sm:text-lg"
          >
            Non una banca. Non un&apos;app. Un consulente che struttura la
            cessione dei tuoi crediti — con focus sulla Pubblica Amministrazione
            e sul settore sanitario.
          </p>
          <div
            data-reveal
            style={reveal(0.45)}
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 sm:mt-8 sm:gap-x-[18px] sm:gap-y-4 lg:mt-7"
          >
            <a
              href="#cta"
              data-breathe
              className="rounded-full bg-cream px-7 py-3.5 text-[14px] font-bold tracking-[0.01em] text-olive no-underline shadow-[0_8px_28px_rgba(0,0,0,0.22)] transition-colors hover:bg-sage sm:px-8 sm:py-4 sm:text-[15px]"
            >
              Prenota una consulenza
            </a>
            <a
              href="#problema"
              className="inline-flex items-center gap-2 rounded-full border border-sage/45 px-5 py-2.5 text-sm font-semibold text-sage no-underline transition-colors hover:bg-sage/10"
            >
              Scopri come ↓
            </a>
          </div>
        </div>

        {/* treasure chest — below headline on mobile */}
        <div data-px="-0.18" className="relative order-2 z-0 mx-auto mt-2 w-full max-w-[min(100%,280px)] sm:mt-0 sm:max-w-[360px] lg:order-1 lg:mx-0 lg:max-w-none">
          <div
            data-reveal
            className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-md border border-olive/35 shadow-[0_40px_90px_rgba(0,0,0,0.4)] sm:aspect-[4/5] lg:overflow-visible"
            style={{
              background:
                "radial-gradient(circle at 50% 38%, #1a6fc0 0%, #0054A6 45%, #06294c 100%)",
            }}
          >
            {/* subtle inner vignette + grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,84,166,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(0,84,166,.08) 1px,transparent 1px)",
                backgroundSize: "32px 32px",
                maskImage:
                  "radial-gradient(circle at 50% 40%,#000,transparent 75%)",
              }}
            />
            <div className="scale-[0.82] sm:scale-110 lg:scale-125">
              <TreasureChest />
            </div>
            <span className="absolute bottom-[18px] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.28em] text-sage/55">
              Capitale sbloccato
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[26px] left-1/2 z-10 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-sage/60 sm:block">
        Scorri
      </div>
    </section>
  );
}
