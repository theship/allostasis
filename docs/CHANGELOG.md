# Changelog

All notable structural, positioning, and architectural changes to the Allostasis AI site.

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
