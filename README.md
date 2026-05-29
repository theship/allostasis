# Allostasis AI

Marketing site for **Allostasis AI** — a knowledge-engineering practice that architects the
**organizational semantic layer**: the principles, workflows, vocabulary, and reference knowledge
AI agents need to act correctly. The site's job is to be found by people searching for this work
and to make the seniority of the practitioner (Julee Burdekin) undeniable.

## 🚀 Quick Start

```bash
npm install     # install dependencies
npm run dev     # development server on http://localhost:3000
npm run build   # production build
npm test        # Playwright E2E tests
```

## 🧭 Information architecture

Three built routes plus one external link:

| Route | Page |
|---|---|
| `/` | Home — hero, the problem, what we do, **the five-layer framework**, tools fit, how we engage, closing CTA |
| `/about` | About Julee Burdekin |
| `/contact` | Contact (qualifying form → SMTP API) |
| **Writing** (nav) | _External_ → the Ghost blog's [Applied AI tag](https://gnowledge-karden.ghost.io/tag/appliedai/) |

This consolidated the previous eight routes (`/specializations`, `/approach`, `/results`,
`/governance`, `/engagement`, `/methods`, …). The retired URLs **301-redirect** to their new homes
(see `next.config.mjs` and [docs/ARCHITECTURE_DEVELOPMENT.md](docs/ARCHITECTURE_DEVELOPMENT.md)).
There is **no** on-site `/writing` or `/point-of-view` route — those link out to the Ghost blog.

> Note: there is no Proof/Results section yet (no case study exists). A placeholder JSX comment
> marks where it slots in once the first case study lands.

## 📝 Editing Content

**All site copy lives in one file:** [`/src/content/copy.ts`](src/content/copy.ts)

Edit it to update any text — headlines, CTAs, the five layers, form labels, footer, SEO metadata.
External destinations (Writing, Point of View, LinkedIn) live in the `links` export so they're
swappable when content moves in-house. Components never hardcode user-facing strings.

## 🎨 Design

Refined dark-editorial direction (spec §5):
- **Type is the design** — display serif **Fraunces** + readable body serif **Newsreader**, self-hosted via `next/font`. (No Inter/Roboto/Arial/system stacks.)
- Warm deep-ink base + warm paper foreground, **one** disciplined Winterberry accent. Tokens in [`tailwind.config.js`](tailwind.config.js).
- Signature visual: the **five layers** rendered as a stack standing on a foundation ([`FrameworkLayers.tsx`](src/components/FrameworkLayers.tsx)).
- Subtle staggered page-load reveals; `prefers-reduced-motion` honored.

## 🔍 SEO

Per-route Metadata API titles/descriptions, OpenGraph + Twitter cards, a site-wide
`opengraph-image`, `Person` + `ProfessionalService` JSON-LD (in the root layout),
[`sitemap.ts`](src/app/sitemap.ts) (three routes), [`robots.ts`](src/app/robots.ts), and canonical URLs.

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
