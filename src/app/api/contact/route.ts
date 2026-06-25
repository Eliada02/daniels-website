import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/contact";
import { siteConfig } from "@/lib/site-config";

async function sendViaResend(payload: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.brand.contactEmail;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey) return false;

  const lines = [
    `Nome: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Telefono: ${payload.phone}` : null,
    "",
    payload.message,
  ].filter(Boolean);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Nuovo contatto dal sito — ${payload.name}`,
      text: lines.join("\n"),
    }),
  });

  return res.ok;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const parsed = validateContactPayload(
    body && typeof body === "object" ? (body as Record<string, unknown>) : {},
  );

  if (!parsed.ok) {
    return NextResponse.json({ errors: parsed.errors }, { status: 400 });
  }

  const sent = await sendViaResend(parsed.data);
  if (!sent) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
