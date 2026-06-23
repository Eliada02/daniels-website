import { cssVars, reveal } from "@/lib/css";
import { solutionAre, solutionNot, solutionFeatures } from "@/lib/site-config";

const bars = [
  { h: "24%", bg: "rgba(249,250,245,.2)", delay: "0s" },
  { h: "40%", bg: "rgba(249,250,245,.28)", delay: ".12s" },
  { h: "58%", bg: "#50772F", delay: ".24s" },
  { h: "78%", bg: "#7da34f", delay: ".36s" },
  { h: "100%", bg: "#D9E9AA", delay: ".48s" },
];

export function Solution() {
  return (
    <section
      id="soluzione"
      data-screen-label="Solution"
      className="relative overflow-hidden bg-forest px-5 pb-24 pt-28 text-cream sm:px-10 sm:pt-28 md:[clip-path:polygon(0_4vw,100%_0,100%_100%,0_100%)] md:-mt-[2vw] lg:px-16 lg:pb-[150px] lg:pt-40"
    >
      <canvas
        data-particles="soln"
        className="absolute inset-0 z-[1] h-full w-full opacity-50"
      />

      <div className="relative z-[2] mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <span
            data-reveal
            className="font-mono text-xs uppercase tracking-[0.22em] text-sage"
          >
            La soluzione
          </span>
          <h2
            data-reveal
            className="mt-[18px] font-serif text-[clamp(34px,4vw,58px)] font-semibold leading-[1.06] tracking-[-0.02em]"
          >
            Strutture di cessione del credito
            <br />
            <em className="italic text-sage">pro-soluto</em> — il rischio non è
            più tuo.
          </h2>
          <p
            data-reveal
            style={reveal(0.1)}
            className="mt-6 max-w-[560px] text-lg leading-[1.7] text-cream/80"
          >
            Trasformiamo i crediti commerciali bloccati in liquidità immediata e
            prevedibile, attraverso soluzioni strutturate focalizzate
            sull&apos;esposizione verso il settore pubblico.
          </p>

          {/* NON / SIAMO */}
          <div
            data-reveal
            style={reveal(0.2)}
            className="mt-[42px] grid grid-cols-1 gap-[18px] sm:grid-cols-2"
          >
            <div className="rounded-lg border border-cream/[0.16] p-6">
              <span className="font-mono text-[11px] tracking-[0.2em] text-cream/50">
                NON SIAMO
              </span>
              <ul className="mt-3.5 flex flex-col gap-2.5">
                {solutionNot.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-[15px] text-cream/[0.66]"
                  >
                    <span className="text-clay">✕</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-sage/40 bg-sage/[0.07] p-6">
              <span className="font-mono text-[11px] tracking-[0.2em] text-sage">
                SIAMO
              </span>
              <ul className="mt-3.5 flex flex-col gap-2.5">
                {solutionAre.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[15px] text-cream">
                    <span className="text-sage">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* growing chart */}
        <div data-reveal style={reveal(0.15)} className="relative mt-4 md:mt-0">
          <div
            data-px="0.35"
            className="mb-2 text-right font-mono text-[10px] text-sage md:absolute md:-top-[30px] md:right-[-10px] md:mb-0 md:text-xs"
          >
            liquidità nel tempo →
          </div>
          <div className="rounded-[10px] border border-cream/[0.14] bg-forest/40 p-5 backdrop-blur-sm sm:p-[30px]">
            <div className="flex h-[180px] items-end gap-2.5 sm:h-[230px] sm:gap-3.5">
              {bars.map((b, i) => (
                <div
                  key={i}
                  data-grow-bar
                  style={cssVars({
                    "--h": b.h,
                    height: 0,
                    background: b.bg,
                    transition: `height 1s cubic-bezier(.23,1,.32,1) ${b.delay}`,
                  })}
                  className="flex-1 rounded-t-[5px]"
                />
              ))}
            </div>
            <div className="mt-3.5 flex justify-between font-mono text-[10px] text-cream/50">
              <span>Oggi</span>
              <span>Cessione</span>
              <span>Stabilità</span>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-3.5">
            <div className="flex-1 rounded-lg border border-sage/20 bg-sage/[0.07] p-4 sm:p-[18px]">
              <div className="font-serif text-[clamp(28px,8vw,38px)] font-bold text-sage">
                <span data-count data-from="0" data-to="100" data-suffix="%">
                  0%
                </span>
              </div>
              <div className="mt-1 text-[12.5px] text-cream/70">
                rischio trasferito (pro-soluto)
              </div>
            </div>
            <div className="flex-1 rounded-lg border border-sage/20 bg-sage/[0.07] p-4 sm:p-[18px]">
              <div className="font-serif text-[clamp(28px,8vw,38px)] font-bold text-sage">
                <span data-count data-from="360" data-to="0" data-suffix="gg">
                  360gg
                </span>
              </div>
              <div className="mt-1 text-[12.5px] text-cream/70">
                attesa azzerata sull&apos;incasso
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* distinctive elements */}
      <div className="relative z-[2] mx-auto mt-20 grid max-w-[1240px] grid-cols-1 gap-[22px] md:grid-cols-3">
        {solutionFeatures.map((f, i) => (
          <div
            key={f.n}
            data-reveal
            style={reveal(i * 0.1)}
            className="border-t border-sage/30 pt-[22px]"
          >
            <span className="font-mono text-[13px] text-sage">{f.n}</span>
            <h4 className="mt-2 font-serif text-2xl font-semibold">{f.title}</h4>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-cream/[0.72]">
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
