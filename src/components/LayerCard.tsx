import type { Layer, LayerBlock, LayerPart } from "@/content/copy";

/**
 * A Field Guide layer (build spec v2.1 §3.1).
 *
 * Layers 02–06 render three flat sub-blocks. Layer 01 instead nests its two
 * parts (01a, 01b) visibly inside the one card, each with its own name, intro
 * and three sub-blocks. The `test` sub-block is visually foregrounded — the
 * tests are the reason the page exists.
 *
 * Heading levels: group headings are h3 (set by the page), layer names h4,
 * part names h5. Sub-block labels are styled paragraphs rather than headings —
 * they're repeated field labels, and keeping them out of the outline avoids a
 * skipped-level (h6) chain inside Layer 01.
 */

function SubBlock({
  block,
  variant = "default",
}: {
  block: LayerBlock;
  variant?: "default" | "test";
}) {
  if (variant === "test") {
    return (
      <div className="mt-6 max-w-measure border-l-2 border-accent bg-ink-900/50 px-5 py-4">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-text">
          {block.label}
        </p>
        <p className="mt-2.5 font-body text-base leading-relaxed text-paper-200">
          {block.body}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 max-w-measure">
      <p className="eyebrow">{block.label}</p>
      <p className="mt-2.5 font-body text-base leading-relaxed text-paper-300">
        {block.body}
      </p>
    </div>
  );
}

function PartCard({ part }: { part: LayerPart }) {
  return (
    <section className="border-t border-ink-700 pt-6">
      <h5 className="font-display text-lg font-semibold leading-snug tracking-tightish text-paper-50">
        <span className="font-mono text-sm font-normal text-accent-text">
          {part.id}
        </span>{" "}
        {part.name}
      </h5>
      <p className="mt-3 max-w-measure font-body text-base leading-relaxed text-paper-200">
        {part.intro}
      </p>
      <SubBlock block={part.failurePattern} />
      <SubBlock block={part.test} variant="test" />
      <SubBlock block={part.good} />
    </section>
  );
}

export default function LayerCard({ layer }: { layer: Layer }) {
  return (
    <article className="border-t border-ink-600 pt-8">
      <header>
        <div className="flex items-baseline gap-4">
          <span
            aria-hidden="true"
            className="font-mono text-sm text-accent-text/80"
          >
            {layer.number}
          </span>
          <h4 className="font-display text-2xl font-semibold leading-tight tracking-tightish text-paper-50 md:text-3xl">
            {layer.name}
          </h4>
        </div>
        <p className="mt-3 max-w-measure font-body text-lg italic leading-relaxed text-paper-300">
          {layer.tagline}
        </p>
      </header>

      <p className="mt-6 max-w-measure font-body text-lg leading-relaxed text-paper-200">
        {layer.intro}
      </p>

      {layer.parts ? (
        <div className="mt-10 space-y-10 md:pl-6">
          {layer.parts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      ) : (
        <>
          {layer.failurePattern && <SubBlock block={layer.failurePattern} />}
          {layer.test && <SubBlock block={layer.test} variant="test" />}
          {layer.good && <SubBlock block={layer.good} />}
        </>
      )}
    </article>
  );
}
