# Changelog

All notable structural, positioning, and architectural changes to the Allostasis AI site.

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
