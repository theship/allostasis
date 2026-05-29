import type { Metadata } from "next";
import Link from "next/link";
import siteCopy from "@/content/copy";
import ExternalLink from "@/components/ExternalLink";

export const metadata: Metadata = {
  title: siteCopy.meta.pages.about.title,
  description: siteCopy.meta.pages.about.description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: siteCopy.meta.pages.about.title,
    description: siteCopy.meta.pages.about.description,
    url: "/about",
  },
};

export default function AboutPage() {
  const c = siteCopy.about;
  return (
    <article className="px-6 pb-28 pt-36 md:px-10 md:pt-44">
      <div className="mx-auto max-w-3xl">
        <span className="eyebrow">About</span>
        <h1 className="reveal mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tighter2 text-paper-50 md:text-5xl">
          {c.heading}
        </h1>

        <div className="mt-10 max-w-measure space-y-6">
          {c.paragraphs.map((p, i) => (
            <p key={i} className="font-body text-lg leading-relaxed text-paper-200">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          {c.links.map((link) =>
            link.external ? (
              <ExternalLink key={link.href} href={link.href} className="link-accent">
                {link.label} →
              </ExternalLink>
            ) : (
              <Link key={link.href} href={link.href} className="link-accent">
                {link.label} →
              </Link>
            )
          )}
        </div>
      </div>
    </article>
  );
}
