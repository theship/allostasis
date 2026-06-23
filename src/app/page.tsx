import type { Metadata } from "next";
import Link from "next/link";
import siteCopy from "@/content/copy";
import ExternalLink from "@/components/ExternalLink";

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
              {c.hero.primaryCta.label}
            </Link>
            <ExternalLink href={c.hero.secondaryCta.href} className="btn-secondary">
              {c.hero.secondaryCta.label} →
            </ExternalLink>
          </div>
        </div>
      </section>

      {/* ---------- Sound familiar? (symptom list) ---------- */}
      <section className="border-t border-ink-800 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tightish text-paper-50 md:text-4xl">
            {c.soundFamiliar.heading}
          </h2>
          <p className="mt-6 max-w-measure font-body text-lg leading-relaxed text-paper-200">
            {c.soundFamiliar.intro}
          </p>
          <ul className="mt-8 max-w-3xl space-y-4">
            {c.soundFamiliar.items.map((item, i) => (
              <li
                key={i}
                className="border-l-2 border-accent/50 pl-5 font-body text-lg italic leading-relaxed text-paper-200"
              >
                “{item}”
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-measure font-display text-xl font-semibold leading-snug tracking-tightish text-paper-50">
            {c.soundFamiliar.closing}
          </p>
        </div>
      </section>

      {/* ---------- It is not the AI. It is the meaning. ---------- */}
      <section className="border-t border-ink-800 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tightish text-paper-50 md:text-4xl">
            {c.meaning.heading}
          </h2>
          <div className="mt-8 max-w-measure space-y-6">
            {c.meaning.paragraphs.map((p, i) => (
              <p key={i} className="font-body text-lg leading-relaxed text-paper-200">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- What we do ---------- */}
      <section className="border-t border-ink-800 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <span className="eyebrow">{c.whatWeDo.heading}</span>
          <p className="mt-5 max-w-measure font-display text-2xl font-semibold leading-snug tracking-tightish text-paper-50">
            {c.whatWeDo.intro}
          </p>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
            {c.whatWeDo.items.map((item) => (
              <div key={item.number}>
                <span aria-hidden="true" className="font-mono text-sm text-accent-text/80">
                  {item.number}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tightish text-paper-50">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-base leading-relaxed text-paper-300">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- What you get / You do not need a megaproject ---------- */}
      <section className="border-t border-ink-800 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-2xl font-semibold leading-tight tracking-tightish text-paper-50 md:text-3xl">
              {c.whatYouGet.heading}
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-paper-200">
              {c.whatYouGet.body}
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold leading-tight tracking-tightish text-paper-50 md:text-3xl">
              {c.noMegaproject.heading}
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-paper-200">
              {c.noMegaproject.body}
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Where the tools fit ---------- */}
      <section className="border-t border-ink-800 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tightish text-paper-50 md:text-4xl">
            {c.toolsFit.heading}
          </h2>
          <p className="mt-8 max-w-measure font-body text-lg leading-relaxed text-paper-200">
            {c.toolsFit.body}
          </p>
        </div>
      </section>

      {/* TODO: Proof/Results section — add when first case study lands */}

      {/* ---------- How we engage ---------- */}
      <section id="engage" className="border-t border-ink-800 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tightish text-paper-50 md:text-4xl">
            {c.engage.heading}
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
            {c.engage.offers.map((offer) => (
              <div key={offer.title} className="flex flex-col border-t border-accent/40 pt-5">
                <h3 className="font-display text-xl font-semibold leading-snug tracking-tightish text-paper-50">
                  {offer.title}
                </h3>
                <p className="mt-3 font-body text-base leading-relaxed text-paper-300">
                  {offer.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-measure font-body text-base italic leading-relaxed text-paper-300">
            {c.engage.note}
          </p>
          <Link href={c.engage.cta.href} className="btn-secondary mt-10">
            {c.engage.cta.label} →
          </Link>
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
