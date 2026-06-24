import { reveal } from "@/lib/css";
import { painCards, type PainCard } from "@/lib/site-config";

function PainDot({ show }: { show?: boolean }) {
  return (
    <span
      data-pain-dot={show || undefined}
      aria-hidden={!show}
      className={`mb-3 block h-2.5 w-2.5 shrink-0 rounded-full sm:mb-5 ${
        show
          ? "bg-clay shadow-[0_0_0_4px_rgba(194,104,63,0.16)]"
          : "invisible"
      }`}
    />
  );
}

function PainTile({ card, delay }: { card: PainCard; delay: number }) {
  const spanClass = card.span === "col" ? "sm:col-span-2" : "";

  const mobileCenter =
    "items-center text-center sm:items-start sm:text-left";

  const tileShell =
    "flex h-full min-h-[168px] flex-col justify-start rounded-lg p-5 sm:min-h-[220px] sm:p-8 lg:min-h-[240px] lg:p-9";

  const titleClass =
    "font-serif text-[clamp(22px,5.5vw,28px)] font-semibold leading-[1.12]";

  const bodyClass =
    "mt-2.5 text-[14.5px] leading-[1.55] sm:mt-3 sm:text-[15px] sm:leading-[1.6]";

  if (card.variant === "dark") {
    return (
      <article
        data-reveal
        data-tilt
        style={reveal(delay)}
        className={`${spanClass} ${mobileCenter} ${tileShell} bg-olive text-cream shadow-[0_16px_44px_rgba(0,84,166,0.24)]`}
      >
        <PainDot />
        <h3 className={`${titleClass} text-sage`}>{card.title}</h3>
        <p className={`${bodyClass} text-cream/[0.78]`}>{card.body}</p>
      </article>
    );
  }

  return (
    <article
      data-reveal
      data-tilt
      style={reveal(delay)}
      className={`${spanClass} ${mobileCenter} ${tileShell} border border-olive/20 bg-gradient-to-b from-olive/[0.04] to-mist shadow-[0_10px_40px_rgba(0,84,166,0.08)]`}
    >
      <PainDot show={card.dot} />
      <h3 className={`${titleClass} text-forest`}>{card.title}</h3>
      <p className={`${bodyClass} text-forest/[0.66]`}>{card.body}</p>
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

          <svg
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            aria-hidden
            className="pointer-events-none mt-7 h-9 w-full opacity-35 sm:mt-8 sm:h-12 sm:opacity-45"
          >
            <path
              data-heartbeat
              d="M0 40 H300 l18 -26 l20 52 l16 -40 l14 14 H560 l18 -30 l22 60 l16 -46 l12 16 H900 l18 -26 l20 52 l16 -40 l14 14 H1200"
              fill="none"
              stroke="#0054A6"
              strokeWidth={2}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
            />
          </svg>

          <p
            data-reveal
            style={reveal(0.1)}
            className="mt-7 text-lg leading-[1.65] text-forest/70 sm:mt-8"
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 sm:[grid-auto-rows:1fr] lg:gap-6">
          {painCards.map((card, i) => (
            <PainTile key={card.title} card={card} delay={i * 0.08} />
          ))}

          <article
            data-reveal
            style={reveal(0.18)}
            className="flex flex-col items-center gap-4 rounded-lg bg-olive p-5 text-center text-cream shadow-[0_12px_40px_rgba(0,84,166,0.22)] sm:col-span-2 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-9 sm:text-left"
          >
            <div className="w-full sm:w-auto">
              <h3 className="font-serif text-[clamp(24px,6vw,32px)] font-semibold leading-[1.08]">
                La crescita crea stress,
                <br />
                non stabilità.
              </h3>
              <p className="mx-auto mt-2.5 max-w-[520px] text-[15px] leading-[1.55] text-cream/85 sm:mx-0 sm:mt-3 sm:leading-[1.6]">
                Più fatturi verso la PA, più capitale resta intrappolato. È un
                problema strutturale — e va risolto con una struttura.
              </p>
            </div>
            <span className="hidden shrink-0 font-serif text-[64px] font-bold leading-none text-cream/25 sm:inline">
              € →
            </span>
          </article>
        </div>
      </div>
    </section>
  );
}
