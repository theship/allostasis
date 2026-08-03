import siteCopy from "@/content/copy";

/**
 * The three engagement offers, rendered from the single `offers` source in
 * copy.ts (build spec v2.1 §6). Used by BOTH the homepage and the Field Guide —
 * do not fork this copy into either page.
 */
export default function OfferCards() {
  return (
    <div className="grid gap-10 md:grid-cols-3 md:gap-8">
      {siteCopy.offers.map((offer) => (
        <div
          key={offer.kicker}
          className="flex flex-col border-t border-accent/40 pt-5"
        >
          <span className="eyebrow">{offer.kicker}</span>
          <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tightish text-paper-50">
            {offer.name}
          </h3>
          <p className="mt-3 font-body text-base leading-relaxed text-paper-300">
            {offer.body}
          </p>
          {offer.meta && (
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-paper-400">
              {offer.meta}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
