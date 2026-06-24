import { cssVars } from "@/lib/css";
import { testimonials, type Testimonial } from "@/lib/site-config";

// Literal md: classes so Tailwind's scanner emits them — a runtime-built
// string (e.g. offset.replace(...)) would never appear in the CSS bundle.
const offsetClass: Record<string, string> = {
  "mt-0": "md:mt-0",
  "mt-5": "md:mt-5",
  "mt-9": "md:mt-9",
};

function Card({ t, delay, px }: { t: Testimonial; delay: number; px: string }) {
  const dark = t.tone === "forest";
  return (
    <figure
      data-reveal
      data-tilt
      style={cssVars({
        "--tilt-base": `rotate(${t.rotate})`,
        "--reveal-delay": `${delay}s`,
      })}
      className={`relative rounded-[10px] p-6 pt-8 sm:p-9 sm:pt-9 mt-0 ${offsetClass[t.offset] ?? ""} ${
        dark
          ? "bg-olive text-cream shadow-[0_22px_60px_rgba(0,84,166,0.28)]"
          : "border border-olive/18 bg-gradient-to-b from-white to-mist shadow-[0_18px_50px_rgba(0,84,166,0.09)]"
      }`}
    >
      <span
        data-px={px}
        className={`pointer-events-none absolute top-1 left-4 font-serif text-[40px] leading-none sm:left-[22px] sm:-top-[22px] sm:text-[80px] ${
          dark ? "text-sage/50" : "text-sage"
        }`}
      >
        &ldquo;
      </span>
      <blockquote
        className={`relative z-[1] pt-5 pl-1 font-serif text-[clamp(18px,4.5vw,22px)] font-medium leading-[1.35] sm:pt-3 sm:pl-0 ${
          dark ? "text-sage" : ""
        }`}
      >
        {t.quote}
      </blockquote>
      <figcaption
        className={`mt-[22px] text-[13.5px] ${dark ? "text-cream/70" : "text-forest/60"}`}
      >
        <strong className={dark ? "text-white" : "text-forest"}>
          {t.author}
        </strong>{" "}
        — {t.role}
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const px = ["0.4", "0.5", "0.45"];
  return (
    <section
      id="testimonianze"
      data-screen-label="Testimonials"
      className="relative overflow-hidden bg-cream px-5 pb-24 pt-24 sm:px-10 lg:px-16 lg:pb-40 lg:pt-[150px]"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto mb-12 max-w-[620px] text-center sm:mb-20">
          <span
            data-reveal
            className="font-mono text-xs uppercase tracking-[0.22em] text-olive"
          >
            Fiducia
          </span>
          <h2
            data-reveal
            className="mt-[18px] font-serif text-[clamp(34px,4.2vw,56px)] font-semibold leading-[1.06] tracking-[-0.02em]"
          >
            Chi ha smesso
            <br />
            di rincorrere gli incassi.
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-3 md:gap-[26px]">
          {testimonials.map((t, i) => (
            <Card key={t.author} t={t} delay={i * 0.1} px={px[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
