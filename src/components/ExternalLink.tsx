import type { ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Show the ↗ glyph affordance after the label (default true). */
  showGlyph?: boolean;
  "aria-current"?: "page" | undefined;
};

/**
 * Outbound link helper. Every external link opens in a new tab with
 * rel="noopener noreferrer" and carries an external affordance:
 *  - a ↗ glyph (decorative, aria-hidden)
 *  - an "(opens in new tab)" suffix in the accessible name
 * See spec §4.3 / §6.
 */
export default function ExternalLink({
  href,
  children,
  className,
  showGlyph = true,
  ...rest
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...rest}
    >
      {children}
      {showGlyph && (
        <span aria-hidden="true" className="external-glyph">
          {" "}
          ↗
        </span>
      )}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
