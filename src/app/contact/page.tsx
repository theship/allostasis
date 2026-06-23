import type { Metadata } from "next";
import siteCopy from "@/content/copy";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: { absolute: siteCopy.meta.pages.contact.title },
  description: siteCopy.meta.pages.contact.description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: siteCopy.meta.pages.contact.title,
    description: siteCopy.meta.pages.contact.description,
    url: "/contact",
  },
};

export default function ContactPage() {
  const c = siteCopy.contact;
  const { linkedin } = siteCopy.links;

  return (
    <section className="px-6 pb-24 pt-36 md:px-10 md:pt-44">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tighter2 text-paper-50 md:text-5xl">
          {c.headline}
        </h1>
        <p className="mt-5 max-w-measure font-body text-lg leading-relaxed text-paper-200">
          {c.intro}
        </p>

        <p className="mt-4 font-sans text-sm text-paper-400">
          Prefer LinkedIn?{" "}
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            Connect with me
            <span aria-hidden="true"> ↗</span>
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </p>

        <div className="mt-12">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
