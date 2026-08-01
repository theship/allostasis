import type { Metadata } from "next";
import Link from "next/link";
import siteCopy from "@/content/copy";
import LayerCard from "@/components/LayerCard";
import OfferCards from "@/components/OfferCards";

const SITE_URL = "https://allostasis.ai";
const g = siteCopy.fieldGuide;

export const metadata: Metadata = {
  title: { absolute: g.meta.title },
  description: g.meta.description,
  alternates: { canonical: "/agent-readiness" },
  openGraph: {
    type: "article",
    title: g.meta.ogTitle,
    description: g.meta.description,
    url: "/agent-readiness",
    modifiedTime: g.updatedISO,
  },
  twitter: {
    card: "summary_large_image",
    title: g.meta.ogTitle,
    description: g.meta.description,
  },
};

// TechArticle JSON-LD, with dateModified synced to the "Updated" line (spec §7).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${SITE_URL}/agent-readiness#article`,
  headline: g.title,
  description: g.meta.description,
  url: `${SITE_URL}/agent-readiness`,
  dateModified: g.updatedISO,
  inLanguage: "en",
  author: { "@id": `${SITE_URL}/#julee-burdekin` },
  publisher: { "@id": `${SITE_URL}/#allostasis` },
  mainEntityOfPage: `${SITE_URL}/agent-readiness`,
};

export default function AgentReadinessPage() {
  // Index of the first layer in each group, so a group heading renders exactly once.
  const firstOfGroup = new Map(
    g.layerGroups.map((group) => [
      group.id,
      g.layers.findIndex((layer) => layer.group === group.id),
    ])
  );

  return (
    <article className="px-6 pb-24 pt-36 md:px-10 md:pt-44">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---------- Header block ---------- */}
      <header className="mx-auto max-w-5xl">
        <span className="eyebrow">{g.kicker}</span>
        <h1 className="reveal mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tighter2 text-paper-50 md:text-6xl">
          {g.title}
        </h1>
        <p
          className="reveal mt-8 max-w-measure font-body text-lg leading-relaxed text-paper-200 md:text-xl"
          style={{ animationDelay: "120ms" }}
        >
          {g.subtitle}
        </p>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-paper-400">
          <span>Updated {g.updated}</span>
          <span className="px-2 text-paper-500">·</span>
          <span>{g.readingTimeMinutes} min read</span>
        </p>
      </header>

      {/* ---------- Opening ---------- */}
      <section className="mx-auto mt-16 max-w-5xl">
        <div className="max-w-measure space-y-6">
          {g.opening.paragraphs.map((p, i) => (
            <p key={i} className="font-body text-lg leading-relaxed text-paper-200">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ---------- The reframe ---------- */}
      <section className="mx-auto mt-20 max-w-5xl border-t border-ink-800 pt-16 md:mt-28 md:pt-20">
        <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tightish text-paper-50 md:text-4xl">
          {g.reframe.heading}
        </h2>
        <div className="mt-8 max-w-measure space-y-6">
          {g.reframe.paragraphs.map((p, i) => (
            <p key={i} className="font-body text-lg leading-relaxed text-paper-200">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ---------- The six layers ---------- */}
      <section className="mx-auto mt-20 max-w-5xl border-t border-ink-800 pt-16 md:mt-28 md:pt-20">
        <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tightish text-paper-50 md:text-4xl">
          {g.layersIntro.heading}
        </h2>
        <p className="mt-8 max-w-measure font-body text-lg leading-relaxed text-paper-200">
          {g.layersIntro.body}
        </p>

        <div className="mt-16 space-y-16">
          {g.layers.map((layer, i) => {
            const group = g.layerGroups.find((gr) => gr.id === layer.group);
            const showGroupHeading =
              group && firstOfGroup.get(group.id) === i;

            return (
              <div key={layer.number}>
                {showGroupHeading && (
                  <h3 className="mb-10 max-w-3xl font-display text-xl font-semibold leading-snug tracking-tightish text-accent-text md:text-2xl">
                    {group.heading}
                  </h3>
                )}
                <LayerCard layer={layer} />
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- Mid-page CTA band (quiet: one line + button) ---------- */}
      <section className="mx-auto mt-20 max-w-5xl border-y border-ink-700 py-8 md:mt-24">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-measure font-body text-lg leading-relaxed text-paper-200">
            {g.midCta.body}
          </p>
          <Link href={g.midCta.href} className="btn-secondary shrink-0">
            {g.midCta.buttonLabel} →
          </Link>
        </div>
      </section>

      {/* ---------- The honest problem ---------- */}
      <section className="mx-auto mt-20 max-w-5xl md:mt-28">
        <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tightish text-paper-50 md:text-4xl">
          {g.honestProblem.heading}
        </h2>
        <div className="mt-8 max-w-measure space-y-6">
          {g.honestProblem.paragraphs.map((p, i) => (
            <p key={i} className="font-body text-lg leading-relaxed text-paper-200">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ---------- Pull-quote ---------- */}
      <section className="mx-auto mt-20 max-w-5xl md:mt-24">
        <figure className="max-w-measure border-l-2 border-accent pl-6 md:pl-8">
          <blockquote>
            <p className="font-display text-2xl font-semibold leading-snug tracking-tightish text-paper-50 md:text-3xl">
              {g.pullQuote.quote}
            </p>
          </blockquote>
          <figcaption className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-paper-400">
            {g.pullQuote.attribution}
          </figcaption>
        </figure>
      </section>

      {/* ---------- How to work with us (shared offers) ---------- */}
      <section
        id="engage"
        className="mx-auto mt-20 max-w-5xl border-t border-ink-800 pt-16 md:mt-28 md:pt-20"
      >
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tightish text-paper-50 md:text-4xl">
          {g.offersSection.heading}
        </h2>
        <p className="mt-6 max-w-measure font-body text-lg leading-relaxed text-paper-200">
          {g.offersSection.intro}
        </p>
        <div className="mt-12">
          <OfferCards />
        </div>
        <Link href={g.offersSection.cta.href} className="btn-secondary mt-12">
          {g.offersSection.cta.label} →
        </Link>
      </section>

      {/* ---------- Bio block ---------- */}
      <section className="mx-auto mt-20 max-w-5xl border-t border-ink-800 pt-10 md:mt-24">
        <p className="max-w-measure font-body text-base leading-relaxed text-paper-300">
          <strong className="font-semibold text-paper-50">
            {g.bioBlock.name}
          </strong>
          , {g.bioBlock.title}.
          {g.bioBlock.body ? ` ${g.bioBlock.body}` : ""}
        </p>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className="mx-auto mt-20 max-w-3xl border-t border-ink-800 pt-16 text-center md:mt-28 md:pt-20">
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tightish text-paper-50 md:text-4xl">
          {g.closingCta.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-paper-200">
          {g.closingCta.body}
        </p>
        <Link href={g.closingCta.href} className="btn-primary mt-10">
          {g.closingCta.buttonLabel}
        </Link>
      </section>
    </article>
  );
}
