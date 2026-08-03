import type { Metadata } from "next";
import Link from "next/link";
import siteCopy from "@/content/copy";
import OfferCards from "@/components/OfferCards";

export const metadata: Metadata = {
  title: { absolute: siteCopy.meta.pages.home.title },
  description: siteCopy.meta.pages.home.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteCopy.meta.pages.home.title,
    description: siteCopy.meta.pages.home.description,
    url: "/",
  },
};

export default function HomePage() {
  const c = siteCopy.home;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36 md:px-10 md:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_20%_0%,rgba(192,68,92,0.10),transparent_70%)]"
        />
        <div className="mx-auto max-w-5xl">
          <h1 className="reveal max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tighter2 text-paper-50 sm:text-5xl md:text-6xl">
            {c.hero.headline}
          </h1>
          <p
            className="reveal mt-8 max-w-measure font-body text-lg leading-relaxed text-paper-200 md:text-xl"
            style={{ animationDelay: "120ms" }}
          >
            {c.hero.subhead}
          </p>
          <div
            className="reveal mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: "240ms" }}
          >
            <Link href={c.hero.primaryCta.href} className="btn-primary">
              {c.hero.primaryCta.label} →
            </Link>
            <Link href={c.hero.secondaryCta.href} className="btn-secondary">
              {c.hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- The thesis: the vision gap ---------- */}
      <section className="border-t border-ink-800 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tightish text-paper-50 md:text-4xl">
            {c.thesis.heading}
          </h2>
          <div className="prose-flow mt-8 max-w-measure space-y-6">
            {c.thesis.paragraphs.map((p, i) => (
              <p key={i} className="font-body text-lg leading-relaxed text-paper-200">
                {p}
              </p>
            ))}
          </div>
          <Link href={c.thesis.link.href} className="link-accent mt-8">
            {c.thesis.link.label} →
          </Link>
        </div>
      </section>

      {/* TODO: Proof/Results section — add when first case study lands */}

      {/* ---------- How we engage (shared offers) ---------- */}
      <section id="engage" className="border-t border-ink-800 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tightish text-paper-50 md:text-4xl">
            {c.engage.heading}
          </h2>
          <div className="mt-12">
            <OfferCards />
          </div>
        </div>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className="border-t border-ink-800 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tightish text-paper-50 md:text-5xl">
            {c.closingCta.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-paper-200">
            {c.closingCta.body}
          </p>
          <Link href={c.closingCta.cta.href} className="btn-primary mt-10">
            {c.closingCta.cta.label}
          </Link>
        </div>
      </section>
    </>
  );
}
