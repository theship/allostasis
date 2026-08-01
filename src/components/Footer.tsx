import Link from "next/link";
import siteCopy from "@/content/copy";

export default function Footer() {
  const { linkedin } = siteCopy.links;
  return (
    <footer className="border-t border-ink-800 bg-ink-900/40">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-measure">
            <span className="font-display text-2xl font-semibold tracking-tightish text-paper-50">
              Allostasis
            </span>
            <p className="mt-4 font-body text-sm italic leading-relaxed text-paper-400">
              {siteCopy.footer.tagline}
            </p>
            <p className="mt-4 font-mono text-xs text-paper-400">
              {siteCopy.footer.copyright}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-6">
            {siteCopy.footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium text-paper-300 transition-colors hover:text-paper-50"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-sans text-sm font-medium text-paper-300 transition-colors hover:text-paper-50"
            >
              LinkedIn
              <span aria-hidden="true" className="text-paper-400">↗</span>
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
