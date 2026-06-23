import { reveal } from "@/lib/css";
import { eduCards, type EduCard } from "@/lib/site-config";

const toneClass: Record<EduCard["tone"], string> = {
  white:
    "bg-white border border-forest/[0.07] shadow-[0_8px_30px_rgba(8,56,51,0.04)]",
  forest: "bg-forest text-cream shadow-[0_12px_34px_rgba(8,56,51,0.16)]",
  sage: "bg-sage",
  olive: "bg-olive text-cream shadow-[0_12px_34px_rgba(80,119,47,0.22)]",
};

const kickerClass: Record<EduCard["tone"], string> = {
  white: "text-olive",
  forest: "text-sage",
  sage: "text-olive",
  olive: "text-sage",
};

const titleClass: Record<EduCard["tone"], string> = {
  white: "",
  forest: "text-sage",
  sage: "",
  olive: "",
};

const bodyClass: Record<EduCard["tone"], string> = {
  white: "text-forest/[0.64]",
  forest: "text-cream/[0.74]",
  sage: "text-forest/70",
  olive: "text-cream/[0.82]",
};

export function Education() {
  return (
    <section
      id="educazione"
      data-screen-label="Education"
      className="relative bg-mist px-5 py-24 sm:px-10 lg:px-16 lg:py-[140px]"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-[60px] flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[620px]">
            <span
              data-reveal
              className="font-mono text-xs uppercase tracking-[0.22em] text-olive"
            >
              Educazione
            </span>
            <h2
              data-reveal
              className="mt-[18px] font-serif text-[clamp(34px,4.2vw,56px)] font-semibold leading-[1.06] tracking-[-0.02em]"
            >
              La finanza strutturata,
              <br />
              resa semplice.
            </h2>
          </div>
          <p
            data-reveal
            style={reveal(0.1)}
            className="max-w-[340px] text-base leading-[1.6] text-forest/[0.66]"
          >
            Concetti complessi trasformati in sistemi chiari. Perché la
            liquidità è struttura, non credito.
          </p>
        </div>

        <div className="gap-[22px] sm:columns-2 lg:columns-3">
          {eduCards.map((card, i) => (
            <article
              key={card.title}
              data-reveal
              data-tilt
              style={reveal((i % 3) * 0.06)}
              className={`mb-[22px] break-inside-avoid rounded-lg p-[30px] ${toneClass[card.tone]}`}
            >
              <span
                className={`font-mono text-[11px] tracking-[0.1em] ${kickerClass[card.tone]}`}
              >
                {card.kicker}
              </span>
              <h3
                className={`mt-3 font-serif text-[26px] font-semibold leading-[1.12] ${titleClass[card.tone]}`}
              >
                {card.title}
              </h3>
              <p className={`mt-3 text-[14.5px] leading-[1.6] ${bodyClass[card.tone]}`}>
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
