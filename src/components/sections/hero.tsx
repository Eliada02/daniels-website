import { TreasureChest } from "@/components/hero/treasure-chest";
import { reveal } from "@/lib/css";

const floatChip =
  "absolute z-[3] hidden whitespace-nowrap rounded-full border border-cream/25 bg-cream/[0.08] px-3.5 py-2 font-mono text-[13px] text-sage backdrop-blur-sm xl:block";

const chips = [
  { text: "€ 1.2M sbloccati", pos: "left-[3%] top-[26%]", px: "0.55", anim: "dgFloat 7s ease-in-out infinite" },
  { text: "180 → 0 giorni", pos: "left-[6%] bottom-[20%]", px: "0.8", anim: "dgFloat 9s ease-in-out infinite .8s" },
  { text: "+ liquidità, − debito", pos: "right-[4%] top-[16%]", px: "0.65", anim: "dgFloat 8s ease-in-out infinite .4s" },
];

const heroCtaClass =
  "rounded-full bg-cream px-8 py-3.5 text-center text-[15px] font-bold tracking-[0.01em] text-olive no-underline shadow-[0_8px_28px_rgba(0,0,0,0.22)] transition-colors hover:bg-sage";

export function Hero() {
  return (
    <section
      id="hero"
      data-screen-label="Hero"
      className="relative isolate flex min-h-[100dvh] flex-col bg-olive text-cream"
    >
      <canvas data-particles="hero" className="absolute inset-0 z-[1] h-full w-full" />

      <div
        data-px="0.12"
        className="pointer-events-none absolute -right-[60px] -top-10 z-[1] h-[280px] w-[280px] rounded-full border border-cream/20 sm:-right-[120px] sm:-top-20 sm:h-[560px] sm:w-[560px]"
      />
      <div
        data-px="0.2"
        className="pointer-events-none absolute -bottom-24 right-8 z-[1] h-[200px] w-[200px] rounded-full border border-cream/15 sm:-bottom-40 sm:right-[120px] sm:h-[360px] sm:w-[360px]"
      />

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

      {/* Full-height stage: content is vertically centred; vertical rhythm uses
          a vh-based clamp so it tightens on short screens without extra rules. */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[calc(env(safe-area-inset-top)+5.5rem)] sm:px-10 lg:px-16">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-[clamp(1.75rem,5vh,3rem)] lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div className="relative isolate z-10 order-1 flex flex-col gap-[clamp(0.85rem,2.4vh,1.5rem)] lg:order-2">
            <span
              data-reveal
              className="inline-flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[clamp(10px,1.4vw,12px)] uppercase tracking-[0.2em] text-sage"
            >
              <span className="h-px w-[30px] shrink-0 bg-sage" />
              Finanza strutturata · Cessione del credito
            </span>
            <h1
              data-reveal
              style={reveal(0.1)}
              className="font-serif text-[clamp(28px,5.6vw,68px)] font-semibold leading-[1.05] tracking-[-0.02em]"
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
              className="max-w-[480px] text-[clamp(15px,1.6vw,18px)] leading-[1.6] text-cream/[0.78]"
            >
              Non una banca. Non un&apos;app. Un consulente che struttura la
              cessione dei tuoi crediti — con focus sulla Pubblica Amministrazione
              e sul settore sanitario.
            </p>
            <div
              data-reveal
              style={reveal(0.45)}
              className="mt-1 hidden w-full flex-col items-stretch gap-3 lg:flex lg:flex-row lg:flex-wrap lg:items-center"
            >
              <a href="#contatto" data-breathe className={heroCtaClass}>
                Prenota una consulenza
              </a>
            </div>
          </div>

          <div
            data-px="-0.18"
            className="relative order-2 z-0 mx-auto w-full max-w-[min(100%,clamp(220px,40vh,320px))] lg:order-1 lg:mx-0 lg:max-w-none"
          >
            <div
              data-reveal
              className="relative flex w-full items-center justify-center overflow-visible"
            >
              <div className="relative z-10 scale-[0.8] py-6 sm:scale-100 sm:py-8 lg:scale-105">
                <TreasureChest />
              </div>
              <span className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.28em] text-sage/55">
                Capitale sbloccato
              </span>
            </div>
            <div
              data-reveal
              style={reveal(0.5)}
              className="mt-5 flex w-full flex-col items-stretch sm:mt-6 lg:hidden"
            >
              <a href="#contatto" data-breathe className={heroCtaClass}>
                Prenota una consulenza
              </a>
            </div>
          </div>
        </div>

        <p className="pointer-events-none mt-[clamp(1.5rem,4vh,3rem)] hidden text-center font-mono text-[10px] uppercase tracking-[0.3em] text-sage/60 sm:block">
          Scorri
        </p>
      </div>
    </section>
  );
}
