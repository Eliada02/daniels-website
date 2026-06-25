"use client";

import { useState, type FormEvent } from "react";
import { reveal } from "@/lib/css";
import type { ContactFieldErrors } from "@/lib/contact";
import { contactForm } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const shellClass =
  "relative w-full pt-10 lg:flex lg:min-h-[min(520px,72vh)] lg:flex-col lg:justify-center lg:border-l lg:border-sage/22 lg:pt-0 lg:pl-10 xl:pl-14";

const fieldClass =
  "w-full rounded-md border border-cream/14 bg-forest/35 px-3.5 py-2.5 text-[15px] text-cream placeholder:text-cream/35 outline-none transition-[border-color,background-color] duration-200 focus:border-sage/55 focus:bg-forest/50 focus:ring-0";

const labelClass =
  "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-cream/55";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<ContactFieldErrors>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = (await res.json()) as {
        ok?: boolean;
        errors?: ContactFieldErrors;
        error?: string;
      };

      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        id="contatto"
        data-reveal
        style={reveal(0.15)}
        className={shellClass}
        role="status"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-sage">
          {contactForm.kicker}
        </div>
        <div className="mt-3 font-serif text-[clamp(22px,4vw,28px)] font-semibold leading-[1.08] text-cream">
          {contactForm.success.title}
        </div>
        <p className="mt-3 max-w-[36ch] text-[15px] leading-[1.6] text-cream/80">
          {contactForm.success.body}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-sage/40 px-5 py-2.5 text-sm font-semibold text-sage transition-colors hover:bg-sage/10"
        >
          Invia un altro messaggio
        </button>
      </div>
    );
  }

  return (
    <form
      id="contatto"
      data-reveal
      style={reveal(0.15)}
      onSubmit={onSubmit}
      noValidate
      className={shellClass}
    >
      <div className="flex items-center gap-3 lg:gap-4">
        <span
          className="hidden h-px flex-1 bg-gradient-to-r from-sage/40 to-transparent lg:block"
          aria-hidden
        />
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-sage">
          {contactForm.kicker}
        </span>
      </div>

      <p className="mt-3 max-w-[38ch] text-[14.5px] leading-[1.55] text-cream/72">
        {contactForm.intro}
      </p>

      <div className="mt-5 flex flex-col gap-3.5 sm:mt-6">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            {contactForm.fields.name.label}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder={contactForm.fields.name.placeholder}
            className={fieldClass}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-1 text-sm text-clay">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-email" className={labelClass}>
              {contactForm.fields.email.label}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={contactForm.fields.email.placeholder}
              className={fieldClass}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />
            {errors.email ? (
              <p id="contact-email-error" className="mt-1 text-sm text-clay">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="contact-phone" className={labelClass}>
              {contactForm.fields.phone.label}
              <span className="ml-1.5 normal-case tracking-normal text-cream/40">
                ({contactForm.fields.phone.hint})
              </span>
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder={contactForm.fields.phone.placeholder}
              className={fieldClass}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            />
            {errors.phone ? (
              <p id="contact-phone-error" className="mt-1 text-sm text-clay">
                {errors.phone}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            {contactForm.fields.message.label}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={3}
            placeholder={contactForm.fields.message.placeholder}
            className={cn(fieldClass, "min-h-[96px] resize-y")}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
          />
          {errors.message ? (
            <p id="contact-message-error" className="mt-1 text-sm text-clay">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
          <label htmlFor="contact-company">Azienda</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>

      {status === "error" ? (
        <p className="mt-3.5 text-sm text-clay" role="alert">
          {contactForm.error}
        </p>
      ) : null}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          data-breathe
          disabled={status === "submitting"}
          className="w-full rounded-full bg-cream px-8 py-3 text-[15px] font-bold text-olive shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-colors hover:bg-sage disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? contactForm.submitting : contactForm.submit}
        </button>
        <p className="max-w-[22rem] font-mono text-[10px] leading-relaxed tracking-[0.04em] text-cream/42 sm:text-right">
          {contactForm.privacy}
        </p>
      </div>
    </form>
  );
}
