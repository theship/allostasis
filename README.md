# Allostasis AI

Marketing site for **Allostasis AI** — a knowledge-engineering practice for agent-readiness.

Every agent builds its picture of how a company works from the **data objects** it can reach. Almost
none of those objects were designed to carry the leadership vision that produced them, so they drift
— and where an object doesn't carry the vision, the agent fills the gap with a confident guess. We
call that distance **the vision gap**. Closing it is architecture work, not transcription work, and
it's the part of agent-readiness no one in the org chart currently owns.

The site's substantive artifact is the **[Agent-Readiness Field Guide](src/app/agent-readiness/page.tsx)**
at `/agent-readiness` — six layers in process order, seven tests a team can run in-house — and the
homepage is a router that points at it and at the audit.

## 🚀 Quick Start

```bash
npm install     # install dependencies
npm run dev     # development server on http://localhost:3000
npm run build   # production build
npm test        # Playwright E2E tests

# For CI / non-interactive runs, use the line reporter — the default `html`
# reporter opens a blocking report server that won't return on its own:
PW_TEST_HTML_REPORT_OPEN=never npx playwright test --reporter=line
```

## 🧭 Information architecture

Four built routes plus one external link. Nav order: **Home · Field Guide · Writing↗ · About · Contact**.

| Route | Page |
|---|---|
| `/` | Home — the slim router: hero, the vision gap (thesis), how we engage, closing CTA |
| `/agent-readiness` | **Field Guide** — six layers in process order (grouped 2–3–1) with seven tests, the honest problem, offers, closing CTA |
| `/about` | About Julee Burdekin |
| `/contact` | Contact (qualifying form → SMTP API) |
| **Writing** (nav) | _External_ → the Ghost blog's [Applied AI tag](https://gnowledge-karden.ghost.io/tag/appliedai/) |

The May 2026 redo consolidated the previous eight routes (`/specializations`, `/approach`,
`/results`, `/governance`, `/engagement`, `/methods`, …); the retired URLs **301-redirect** to their
new homes (see `next.config.mjs` and [docs/ARCHITECTURE_DEVELOPMENT.md](docs/ARCHITECTURE_DEVELOPMENT.md)).
The "point of view" destination is now **on-domain** at `/agent-readiness` — Writing is the only
remaining external content link. There is no on-site `/writing` or `/point-of-view` route.

> Note: there is no Proof/Results section yet (no case study exists). A placeholder JSX comment
> marks where it slots in once the first case study lands.

## 📝 Editing Content

**All site copy lives in one file:** [`/src/content/copy.ts`](src/content/copy.ts)

Edit it to update any text — headlines, CTAs, the Field Guide's layers and tests, form labels,
footer, SEO metadata. Internal destinations live in `routes`; external ones (Writing, LinkedIn) in
`links`. Components never hardcode user-facing strings.

Two rules worth knowing:
- **The three engagement offers exist once**, in the `offers` export, and are rendered on both `/`
  and `/agent-readiness` by `OfferCards.tsx`. Never fork that copy into a page.
- **The guide is six layers and seven tests.** Layer 01 splits into 01a/01b and carries two of the
  tests. If you edit the guide, bump `fieldGuide.updatedISO` — it drives the visible "Updated" line,
  the `TechArticle` `dateModified`, and the sitemap's `lastModified`.

## 🎨 Design

Refined dark-editorial direction (spec §5):
- **Type is the design** — display serif **Fraunces** + readable body serif **Newsreader**, self-hosted via `next/font`. (No Inter/Roboto/Arial/system stacks.)
- Warm deep-ink base + warm paper foreground, **one** disciplined Winterberry accent. Tokens in [`tailwind.config.js`](tailwind.config.js).
- Signature element: the Field Guide's numbered layer cards (01–06) under three quieter group headings, with the **test** sub-block foregrounded behind an accent rule. Layer 01 nests its 01a/01b parts inside one card.
- Reference-document register on the guide — no sticky CTAs, no popups, one quiet mid-page CTA band.
- Subtle staggered page-load reveals; `prefers-reduced-motion` honored.

## 🔍 SEO

Per-route Metadata API titles/descriptions, OpenGraph + Twitter cards, a site-wide `opengraph-image`
plus a route-specific card for the Field Guide, `Person` + `ProfessionalService` JSON-LD (root
layout) and `TechArticle` JSON-LD on `/agent-readiness`,
[`sitemap.ts`](src/app/sitemap.ts) (four routes), [`robots.ts`](src/app/robots.ts), and canonical URLs.

## 🌐 Deployment

Deployed on **Vercel** with automatic deployments from GitHub.

**Live Site:** https://allostasis.ai

### Deploying Changes

1. Commit changes to `main`
2. Push to GitHub: `git push origin main`
3. Vercel auto-deploys (2-3 minutes)
4. Status: https://vercel.com/theships-projects/allostasis

### Environment Variables

Configure in the Vercel Dashboard (Settings → Environment Variables):
- `SMTP_HOST` — SMTP server (smtp.gmail.com)
- `SMTP_PORT` — SMTP port (587)
- `SMTP_SECURE` — Use SSL (false)
- `SMTP_USER` — Email account (info@allostasis.ai)
- `SMTP_PASS` — App password (Google Workspace app password)
- `SMTP_FROM` — Sender email (info@allostasis.ai)
- `SMTP_TO` — Recipient email (info@allostasis.ai)
- `MAX_REQUESTS_PER_HOUR` — Rate limit (10)

The contact form posts to the server-side route `src/app/api/contact/route.ts` (rate-limited,
input-sanitized, dual-email). **Do not** add `output: 'export'` to the Next config — it breaks the API route.

### Custom Domain

- Primary: https://allostasis.ai · DNS in Namecheap · A record → Vercel · automatic HTTPS

## 📚 Documentation

- [**Architecture & Development**](docs/ARCHITECTURE_DEVELOPMENT.md) — structure, IA, redirects, content model
- [**Vercel Deployment Plan**](docs/VERCEL-DEPLOYMENT-PLAN.md) — deployment guide & troubleshooting
- [**Email Setup**](docs/EMAIL_SETUP.md) — contact-form SMTP configuration
- [**All Documentation**](docs/) — index + changelog

## 📄 License

© 2026 Allostasis AI. All rights reserved.
