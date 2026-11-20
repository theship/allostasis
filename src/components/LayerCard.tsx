import type { Experiment, Layer, LayerBlock } from "@/content/copy";

/**
 * A Field Guide layer (one of three) and the experiments it carries.
 *
 * Experiments are numbered 1-7 across the whole guide, so the numbering stays
 * flat even though they nest inside layers here. The procedure sub-block is
 * foregrounded: the experiments are the reason the page exists.
 *
 * Heading levels: layer names are h3, experiment names h4. Sub-block labels are
 * styled paragraphs, which keeps the outline free of skipped levels.
 */

function SubBlock({
  block,
  variant = "default",
}: {
  block: LayerBlock;
  variant?: "default" | "procedure";
}) {
  if (variant === "procedure") {
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

function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <section className="border-t border-ink-700 pt-6">
      <h4 className="font-display text-lg font-semibold leading-snug tracking-tightish text-paper-50">
        <span className="font-mono text-sm font-normal text-accent-text">
          Experiment {experiment.number}
        </span>{" "}
        {experiment.name}
      </h4>
      {experiment.tagline && (
        <p className="mt-2 max-w-measure font-body text-base italic leading-relaxed text-paper-300">
          {experiment.tagline}
        </p>
      )}
      <p className="mt-3 max-w-measure font-body text-base leading-relaxed text-paper-200">
        {experiment.intro}
      </p>
      <SubBlock block={experiment.failurePattern} />
      <SubBlock block={experiment.procedure} variant="procedure" />
      <SubBlock block={experiment.good} />
    </section>
  );
}

export default function LayerCard({ layer }: { layer: Layer }) {
  return (
    <article className="border-t border-ink-600 pt-8">
      <header>
        <div className="flex items-baseline gap-4">
          <span aria-hidden="true" className="font-mono text-sm text-accent-text/80">
            {layer.number}
          </span>
          <h3 className="font-display text-2xl font-semibold leading-tight tracking-tightish text-paper-50 md:text-3xl">
            {layer.name}
          </h3>
        </div>
        <p className="mt-3 max-w-measure font-body text-lg italic leading-relaxed text-paper-300">
          {layer.tagline}
        </p>
      </header>

      <p className="mt-6 max-w-measure font-body text-lg leading-relaxed text-paper-200">
        {layer.intro}
      </p>

      <div className="mt-10 space-y-10 md:pl-6">
        {layer.experiments.map((experiment) => (
          <ExperimentCard key={experiment.number} experiment={experiment} />
        ))}
      </div>
    </article>
  );
}
