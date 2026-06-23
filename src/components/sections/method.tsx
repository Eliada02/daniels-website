import { steps, type Step } from "@/lib/site-config";

const markerTone: Record<Step["tone"], string> = {
  forest: "bg-forest text-sage",
  olive: "bg-olive text-cream",
  sage: "bg-sage text-forest",
};

function StepRow({ step }: { step: Step }) {
  const text = (
    <div
      className={`text-left ${
        step.side === "left"
          ? "md:pr-3.5 md:text-right"
          : "md:pl-3.5 md:text-left"
      }`}
    >
      <span className="font-mono text-[13px] text-olive">{step.kicker}</span>
      <h3 className="mt-1.5 font-serif text-[26px] font-semibold sm:text-[30px]">
        {step.title}
      </h3>
      <p className="mt-2 text-[15px] leading-[1.6] text-forest/[0.66]">
        {step.body}
      </p>
    </div>
  );

  const marker = (
    <span
      className={`flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full font-serif text-[22px] font-bold shadow-[0_0_0_8px_#F9FAF5] ${markerTone[step.tone]}`}
    >
      {step.n}
    </span>
  );

  return (
    <div
      data-reveal
      className="relative grid grid-cols-[54px_1fr] items-center gap-x-5 py-7 md:grid-cols-[1fr_80px_1fr] md:gap-x-0 md:py-[30px]"
    >
      {/* marker: left column on mobile, centre column on desktop */}
      <div className="col-start-1 flex justify-center md:col-start-2">
        {marker}
      </div>
      {/* text: right of marker on mobile, alternating side on desktop */}
      <div
        className={`col-start-2 ${
          step.side === "left" ? "md:col-start-1" : "md:col-start-3"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export function Method() {
  return (
    <section
      id="metodo"
      data-screen-label="Method"
      className="relative bg-cream px-5 py-24 sm:px-10 lg:px-16 lg:py-[140px]"
    >
      <div className="mx-auto max-w-[1080px]">
        <div className="mx-auto mb-16 max-w-[640px] text-center md:mb-20">
          <span
            data-reveal
            className="font-mono text-xs uppercase tracking-[0.22em] text-olive"
          >
            Il metodo
          </span>
          <h2
            data-reveal
            className="mt-[18px] font-serif text-[clamp(32px,4.4vw,60px)] font-semibold leading-[1.06] tracking-[-0.02em]"
          >
            Dal problema alla prevedibilità,
            <br />
            in quattro passi.
          </h2>
        </div>

        <div data-timeline className="relative flex flex-col">
          {/* connector + animated fill — left rail on mobile, centre on desktop */}
          <div className="absolute bottom-0 left-[27px] top-0 w-0.5 -translate-x-1/2 bg-forest/10 md:left-1/2" />
          <div
            data-time-fill
            className="absolute left-[27px] top-0 h-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-olive to-forest md:left-1/2"
          />
          {steps.map((step) => (
            <StepRow key={step.n} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
