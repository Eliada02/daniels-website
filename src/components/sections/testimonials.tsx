import { cssVars } from "@/lib/css";
import { testimonials, type Testimonial } from "@/lib/site-config";

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
      className={`relative rounded-[10px] p-6 sm:p-9 mt-0 ${t.offset.replace(/^mt-/, "md:mt-")} ${
        dark
          ? "bg-forest text-cream shadow-[0_22px_60px_rgba(8,56,51,0.2)]"
          : "border border-forest/[0.08] bg-white shadow-[0_18px_50px_rgba(8,56,51,0.07)]"
      }`}
    >
      <span
        data-px={px}
        className={`absolute -top-[16px] left-[18px] font-serif text-[56px] leading-none sm:-top-[22px] sm:left-[22px] sm:text-[80px] ${
          dark ? "text-sage/50" : "text-sage"
        }`}
      >
        &ldquo;
      </span>
      <blockquote
        className={`mt-3 font-serif text-[clamp(18px,4.5vw,22px)] font-medium leading-[1.35] ${
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

        <div className="grid grid-cols-1 items-start gap-[26px] md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={t.author} t={t} delay={i * 0.1} px={px[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
