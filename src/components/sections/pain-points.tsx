import { reveal } from "@/lib/css";
import { painCards, type PainCard } from "@/lib/site-config";

function PainTile({ card, delay }: { card: PainCard; delay: number }) {
  const spanClass =
    card.span === "row" ? "sm:row-span-2" : card.span === "col" ? "sm:col-span-2" : "";

  const dot = card.dot ? (
    <span
      data-pain-dot
      className="mb-[18px] inline-block h-2.5 w-2.5 rounded-full bg-clay shadow-[0_0_0_4px_rgba(194,104,63,0.16)]"
    />
  ) : null;

  if (card.variant === "feature") {
    return (
      <article
        data-reveal
        data-tilt
        style={reveal(delay)}
        className={`${spanClass} flex min-h-0 flex-col justify-between rounded-lg border border-forest/[0.08] bg-gradient-to-b from-white to-[#f3efe6] p-6 shadow-[0_10px_40px_rgba(8,56,51,0.05)] sm:min-h-[330px] sm:p-9`}
      >
        <span
          data-pain-dot
          className="h-3 w-3 rounded-full bg-clay shadow-[0_0_0_5px_rgba(194,104,63,0.16)]"
        />
        <div>
          <h3 className="font-serif text-[clamp(26px,7vw,34px)] font-semibold leading-[1.1]">
            {card.title}
          </h3>
          <p className="mt-3.5 text-[15.5px] leading-[1.6] text-forest/[0.66]">
            {card.body}
          </p>
        </div>
      </article>
    );
  }

  if (card.variant === "dark") {
    return (
      <article
        data-reveal
        data-tilt
        style={reveal(delay)}
        className="flex flex-col justify-center rounded-lg bg-forest p-6 text-cream shadow-[0_16px_44px_rgba(8,56,51,0.18)] sm:p-[30px]"
      >
        <h3 className="font-serif text-[clamp(22px,5.5vw,28px)] font-semibold leading-[1.12] text-sage">
          {card.title}
        </h3>
        <p className="mt-2.5 text-[14.5px] leading-[1.55] text-cream/[0.78]">
          {card.body}
        </p>
      </article>
    );
  }

  // plain
  return (
    <article
      data-reveal
      data-tilt
      style={reveal(delay)}
      className="rounded-lg border border-forest/[0.08] bg-gradient-to-b from-white to-[#f3efe6] p-6 shadow-[0_10px_40px_rgba(8,56,51,0.05)] sm:p-[30px]"
    >
      {dot}
      <h3 className="font-serif text-[clamp(22px,5.5vw,26px)] font-semibold leading-[1.12]">
        {card.title}
      </h3>
      <p className="mt-2.5 text-[14.5px] leading-[1.55] text-forest/[0.66]">
        {card.body}
      </p>
    </article>
  );
}

export function PainPoints() {
  return (
    <section
      id="problema"
      data-screen-label="Pain points"
      className="relative overflow-hidden bg-cream px-5 py-24 sm:px-10 lg:px-16 lg:py-[140px]"
    >
      {/* heartbeat line */}
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-[90px] h-20 w-full opacity-50"
      >
        <path
          data-heartbeat
          d="M0 40 H300 l18 -26 l20 52 l16 -40 l14 14 H560 l18 -30 l22 60 l16 -46 l12 16 H900 l18 -26 l20 52 l16 -40 l14 14 H1200"
          fill="none"
          stroke="#50772F"
          strokeWidth={2}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
        />
      </svg>

      <div className="relative z-[2] mx-auto max-w-[1240px]">
        <div className="mb-16 max-w-[720px]">
          <span
            data-reveal
            className="font-mono text-xs uppercase tracking-[0.22em] text-olive"
          >
            Il problema reale
          </span>
          <h2
            data-reveal
            className="mt-[18px] font-serif text-[clamp(36px,4.4vw,64px)] font-semibold leading-[1.05] tracking-[-0.02em]"
          >
            Sei profittevole.
            <br />
            Eppure la liquidità non arriva mai.
          </h2>
          <p
            data-reveal
            style={reveal(0.1)}
            className="mt-[22px] text-lg leading-[1.65] text-forest/70"
          >
            Le fatture verso la Pubblica Amministrazione richiedono{" "}
            <strong
              data-count
              data-from="0"
              data-to="360"
              data-suffix=" giorni"
              className="text-forest"
            >
              0 giorni
            </strong>{" "}
            per essere pagate. Nel frattempo, la crescita diventa stress invece
            di stabilità.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr] lg:[grid-auto-rows:minmax(150px,auto)]">
          {painCards.map((card, i) => (
            <PainTile key={card.title} card={card} delay={i * 0.08} />
          ))}

          {/* wide closing tile */}
          <article
            data-reveal
            style={reveal(0.18)}
            className="flex flex-col gap-5 rounded-lg bg-sage p-6 shadow-[0_10px_40px_rgba(8,56,51,0.06)] sm:col-span-2 sm:flex-row sm:items-center sm:justify-between sm:gap-[30px] sm:p-9"
          >
            <div>
              <h3 className="font-serif text-[clamp(24px,6vw,32px)] font-semibold leading-[1.08]">
                La crescita crea stress,
                <br />
                non stabilità.
              </h3>
              <p className="mt-3 max-w-[440px] text-[15px] leading-[1.6] text-forest/[0.72]">
                Più fatturi verso la PA, più capitale resta intrappolato. È un
                problema strutturale — e va risolto con una struttura.
              </p>
            </div>
            <span className="self-end font-serif text-[48px] font-bold leading-none text-forest/[0.18] sm:self-auto sm:text-[64px]">
              € →
            </span>
          </article>
        </div>
      </div>
    </section>
  );
}
