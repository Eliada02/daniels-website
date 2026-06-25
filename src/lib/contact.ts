export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Honeypot — must stay empty. */
  company: string;
};

export type ContactFieldErrors = Partial<
  Record<keyof Omit<ContactPayload, "company">, string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(
  raw: Record<string, unknown>,
): { ok: true; data: ContactPayload } | { ok: false; errors: ContactFieldErrors } {
  const company = String(raw.company ?? "").trim();
  if (company) {
    return { ok: false, errors: { message: "Richiesta non valida." } };
  }

  const name = String(raw.name ?? "").trim();
  const email = String(raw.email ?? "").trim();
  const phone = String(raw.phone ?? "").trim();
  const message = String(raw.message ?? "").trim();

  const errors: ContactFieldErrors = {};

  if (name.length < 2) {
    errors.name = "Inserisci il tuo nome.";
  } else if (name.length > 120) {
    errors.name = "Nome troppo lungo.";
  }

  if (!email) {
    errors.email = "Inserisci la tua email.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Email non valida.";
  }

  if (phone.length > 40) {
    errors.phone = "Numero troppo lungo.";
  }

  if (message.length < 10) {
    errors.message = "Scrivi almeno qualche riga sul tuo caso.";
  } else if (message.length > 4000) {
    errors.message = "Messaggio troppo lungo.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data: { name, email, phone, message, company } };
}
