import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/chrome/site-nav";
import { AboutCv } from "@/components/sections/about-cv";

export const metadata: Metadata = {
  title: "Chi sono — Daniele Di Giorgio · Finanza strutturata",
  description:
    "Il percorso professionale di Daniele Di Giorgio: oltre quindici anni nella finanza strutturata e nella cessione del credito pro-soluto, con focus su PA e sanità.",
};

export default function ChiSonoPage() {
  return (
    <>
      <SiteNav solid />
      <main className="min-h-screen bg-cream pt-[calc(env(safe-area-inset-top)+4.5rem)] sm:pt-[calc(env(safe-area-inset-top)+5.25rem)]">
        <AboutCv />

        <div className="mx-auto max-w-[1180px] px-5 pb-16 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-olive no-underline transition-opacity hover:opacity-70"
          >
            <span aria-hidden>←</span> Torna alla home
          </Link>
        </div>
      </main>
    </>
  );
}
