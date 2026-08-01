# Changelog

All notable structural, positioning, and architectural changes to the Allostasis AI site.

## 2026-07-30 — The field-guide inversion (build spec v2.1)

Content + IA delta on the existing app. The site previously sold with homepage assertion and linked
out to the off-brand Ghost blog for its "point of view". This inverts that: a canonical long-form
page becomes the substantive artifact **on-domain**, and the homepage shrinks to a router.

### Positioning
- Spine is now **the vision gap / data objects / data contracts**. Retired "context debt", the
  threat-voice hero, and "the organizational semantic layer" as *the* headline thesis (ontology /
  semantic layer / knowledge graph remain as supporting vocabulary, chiefly in Layer 02 and offers).

### New route — `/agent-readiness` (the Agent-Readiness Field Guide)
- **Six layers in process order, grouped 2–3–1**: the substrate (01 legible substrate, 02 knowledge
  graph as domain bounds), the build decisions (03 deterministic boundary, 04 workflows from
  observation, 05 single owner of judgment), the loop (06 evals & feedback).
- **Seven tests** — Layer 01 splits into 01a (Vision & principles) and 01b (Vocabulary & contracts)
  and carries two. Each layer/part has a failure pattern, a test, and "Passing the bar".
- Statically generated; reference-document register; quiet mid-page CTA band; pull-quote; bio block.
- New components: `LayerCard.tsx` (nested parts + foregrounded test panel), `OfferCards.tsx`.

### Homepage
- Compressed to hero → thesis ("The vision gap") → engage → closing CTA. Removed the v06
  "Sound familiar?", "It is not the AI. It is the meaning.", "What we do", "What you get",
  "You do not need a megaproject", and "Where the tools fit" sections.

### Nav / footer
- Nav is now **Home · Field Guide · Writing↗ · About · Contact** + the audit CTA; Writing is demoted
  to after Field Guide and remains the only external content link. Footer gains a Field Guide link.

### Offers
- The three offers (`01 · DIAGNOSTIC` / `02 · BUILD` / `03 · RETAINER`) now live **once** in
  `copy.ts` `offers` and render on both `/` and the guide via `OfferCards.tsx`.

### SEO
- Route metadata + a route-specific OG card for the guide; **`TechArticle`** JSON-LD with
  `dateModified` synced to `fieldGuide.updatedISO`; `sitemap.ts` extended to four routes;
  homepage/site OG copy regenerated to the vision-gap framing.

### Tests
- New `field-guide.spec.ts`; `a11y.spec.ts` rewritten for the four routes, the slim home, nav/footer
  guide links, and offer parity; `external-links.spec.ts` now asserts the Ghost point-of-view URL is
  gone and Writing is demoted. Landmark assertions moved from tags to **roles** (the guide nests
  `<header>` inside `<article>`). 38 passing.

### Performance
- Pinned the display face (Fraunces, only ever `font-semibold`) and mono (only ever 400) to static
  instances instead of full variable ranges, and dropped Fraunces' unused `opsz` axis. Font payload
  226 KB → 155 KB; webfont-driven LCP was the only thing below target. Lighthouse on `/`,
  `/agent-readiness`, and `/about`: **96 / 100 / 100 / 100** (was 90–91 on performance).

### Deviations from the spec (deliberate)
- **Footer tagline** kept as "allostasis: stability through change." per the operator, rather than
  spec §0.5's "maintaining stability through change" (which predates the v06 lock).
- **"Updated" line** renders "July 2026" (spec §2's value and the actual edit date) rather than
  §3.1's "August 2026", to avoid post-dating the document.

## 2026-06-23 — Copy repositioning v06 (`redo/semantic-layer`)

Replaced site copy with the v06 brief (`20260623-allostasis-site-copy-v06.md`). Same stack, routes,
nav, 301 redirects, contact field schema, and SMTP API — content/positioning only.

### Positioning
- Reframed from "architecting the organizational semantic layer" to **"your AI gives wrong answers
  because your systems disagree on what your data means — we find where your meaning breaks and make
  it legible."** Lead with the failed-pilot moment; cast a wider net with a symptom list.
- **Locked tagline:** `allostasis: stability through change.` (was "maintaining stability through change").

### Home (rebuilt sections)
- New: hero ("Your AI pilot stalled…"), **Sound familiar?** symptom list, **It is not the AI. It is
  the meaning.** explainer, What we do (3 moves), What you get, You do not need a megaproject,
  Where the tools fit, How we engage (**The Audit** / **The Build** + fractional note), closing CTA.
- **Retired the five-layer framework** (signature visual): removed `home.framework`, deleted
  `components/FrameworkLayers.tsx` and the now-unused `lib/text.tsx` (`renderEmphasis`).
- Primary CTA relabeled **"Request an AI Readiness Audit"**; hero secondary **"See why the pilot
  stalled →"** → POV. Page `<title>`s set absolute (no double-branding).

### About / Contact
- About rewritten in first person (Adobe / Planet / Geospan), with a pullquote and closing line.
- Contact headline/intro + `challenge` options repositioned (field schema + API contract unchanged).

### SEO / metadata
- Rewrote per-route titles/descriptions, `siteDescription`, OG image text, and JSON-LD
  (`Person` description + `ProfessionalService` `knowsAbout`) to the v06 positioning.

### Tests
- Updated `a11y.spec.ts` (v06 home assertions, new CTA label) and `external-links.spec.ts`
  (hero secondary "See why the pilot stalled"; removed the retired "Read the writing" link test).
  22 passing.

### Also
- Bumped Next.js 15.4.7 → **15.5.18** to clear Vercel's security gate (latest 15.x patch).

## 2026-05-29 — Semantic-layer redo (`redo/semantic-layer`)

Full content/design/IA redo on top of the existing Next.js + Vercel + SMTP stack (no re-platform).
Implements `docs/allostasis-build-spec.md`.

### Positioning
- Repositioned from "boutique AI studio specializing in knowledge systems" to **architecting the
  organizational semantic layer** (the principles, workflows, vocabulary, and reference knowledge
  agents need to act correctly). Practitioner name resolved everywhere: **Julee Burdekin**.

### Information architecture
- **Consolidated eight routes → three built routes** (`/`, `/about`, `/contact`) plus one external
  **Writing** link to the Ghost blog's Applied AI tag.
- Added **301 redirects** for retired routes (`/specializations`, `/approach`, `/results`,
  `/governance` → `/`; `/engagement` → `/#engage`; `/methods` → external Ghost Applied AI tag).
- New `/about` page. Contact page UI rebuilt around the **unchanged** SMTP API + field schema.
- **No Proof/Results section** (no case study yet) — placeholder JSX comment only.

### Content model
- Restructured `src/content/copy.ts`: added `links` (writing, pov, linkedin), `about`, and `home.framework`
  (the five layers); rewrote `cta`/`nav`/`meta`/`home`/`contact`/`footer`; removed `specializations`,
  `approach`, `results`, `governance`, `engagement`, `methods`, `diagram`, `faq`.

### Design
- Refined **dark-editorial** direction: Fraunces (display) + Newsreader (body) via `next/font`;
  warm ink/paper palette with one Winterberry accent; the five-layer **stack-on-a-foundation**
  signature visual; staggered reveals honoring `prefers-reduced-motion`.

### SEO
- Per-route Metadata API, OpenGraph/Twitter, site-wide `opengraph-image`, `Person` +
  `ProfessionalService` JSON-LD, `sitemap.ts` (3 routes), `robots.ts`, canonical URLs.

### Tests
- Rewrote `.playwright/a11y.spec.ts` for the three routes; added `redirects.spec.ts` and
  `external-links.spec.ts`. All passing.

### Docs
- Rewrote root `README.md`, `docs/ARCHITECTURE_DEVELOPMENT.md`, `docs/README.md`; archived the
  pre-redo architecture guide to `docs/archive/`; added this changelog.

### Preserved (unchanged)
- Vercel deployment pipeline, domain/DNS, SMTP contact API + env vars (`SMTP_*`,
  `MAX_REQUESTS_PER_HOUR`), `@next/mdx` wiring (unused, kept for a future in-house writing move).

### Outstanding TODOs
- OG image uses `next/og`'s built-in font rather than the Fraunces display face (`src/app/opengraph-image.tsx`).

---

## 2025-11 — Vercel migration
Migrated hosting Namecheap (static FTP) → Vercel to enable the server-side contact API; removed
`output: 'export'` from `next.config.mjs`. See [VERCEL-DEPLOYMENT-PLAN.md](VERCEL-DEPLOYMENT-PLAN.md).
