import siteCopy from "@/content/copy";

/**
 * Signature visual (spec §5): the five layers of an agent-ready organization
 * rendered as a stack standing on a foundation. Layer 1 (Vision & principles)
 * sits at the BASE consistently; the stack builds upward to Evals & feedback.
 * Renders top→bottom as 05 … 01 so the foundation reads at the bottom.
 * Staggered fade-up reveal; honors prefers-reduced-motion via globals.css.
 * Legible and ordered on mobile (vertical stack, never crushed).
 */
export default function FrameworkLayers() {
  const { layers } = siteCopy.home.framework;
  // Display from top of the stack (last layer) down to the foundation (first layer).
  const ordered = layers
    .map((layer, i) => ({ ...layer, n: i + 1 }))
    .reverse();

  return (
    <ol className="relative flex flex-col" aria-label="The five layers, foundation first">
      {ordered.map((layer, idx) => {
        const isFoundation = layer.n === 1;
        return (
          <li
            key={layer.n}
            className={`reveal group relative border-l-2 border-accent/50 bg-ink-900/40 px-5 py-5 transition-colors hover:bg-ink-800/60 sm:px-7 sm:py-6 ${
              idx === 0 ? "rounded-t-xl border-t border-r border-ink-800" : "border-r border-ink-800"
            } ${
              isFoundation
                ? "rounded-b-xl border-b-2 border-b-accent/60 border-r border-ink-800"
                : "border-b border-ink-800/70"
            }`}
            style={{ animationDelay: `${idx * 90}ms` }}
          >
            <div className="flex items-baseline gap-4 sm:gap-6">
              <span
                aria-hidden="true"
                className="font-mono text-sm font-medium tabular-nums text-accent-text/80"
              >
                0{layer.n}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-xl font-semibold tracking-tightish text-paper-50 sm:text-2xl">
                  {layer.title}
                </h3>
                <p className="mt-1.5 max-w-prose font-body text-base leading-relaxed text-paper-300">
                  {layer.gloss}
                </p>
              </div>
            </div>
          </li>
        );
      })}
      {/* Ground line under the foundation */}
      <span
        aria-hidden="true"
        className="mt-1 h-px w-full bg-gradient-to-r from-accent/40 via-ink-700 to-transparent"
      />
    </ol>
  );
}
