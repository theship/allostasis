import { Fragment, type ReactNode } from "react";

/**
 * Render copy that uses Markdown-style **bold** emphasis as <strong> elements.
 * Copy in copy.ts uses `**term**` to mark intended emphasis (spec §4: markdown
 * emphasis indicates hierarchy, not literal characters to render).
 */
export function renderEmphasis(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const match = part.match(/^\*\*([^*]+)\*\*$/);
    if (match) {
      return (
        <strong key={i} className="font-semibold text-paper-50">
          {match[1]}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
