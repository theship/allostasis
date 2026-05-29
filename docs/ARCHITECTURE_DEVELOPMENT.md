# Architecture & Development Guide

> **Positioning:** Allostasis architects the **organizational semantic layer** — the
> principles, workflows, vocabulary, and reference knowledge AI agents need to act correctly.
> This guide reflects the May 2026 redo. The pre-redo guide is archived at
> [`archive/ARCHITECTURE_DEVELOPMENT.2025-08.md`](archive/ARCHITECTURE_DEVELOPMENT.2025-08.md).

## 📁 Project Structure

```
allostasis/
├── src/
│   ├── app/
│   │   ├── api/contact/        # SMTP contact API (route.ts + rate-limit.ts) — UNCHANGED
│   │   ├── about/page.tsx      # /about
│   │   ├── contact/page.tsx    # /contact (server) → ContactForm (client)
│   │   ├── page.tsx            # / (Home)
│   │   ├── layout.tsx          # fonts, site metadata, JSON-LD
│   │   ├── sitemap.ts          # /sitemap.xml (3 routes)
│   │   ├── robots.ts           # /robots.txt
│   │   ├── opengraph-image.tsx # site-wide OG/Twitter card
│   │   └── globals.css
│   ├── components/             # Navbar, Footer, FrameworkLayers, ContactForm, ExternalLink
│   ├── content/copy.ts         # ⭐ SINGLE SOURCE OF TRUTH for all copy + links + metadata
│   └── lib/text.tsx            # renderEmphasis() — **bold** markup → <strong>
├── .playwright/                # E2E specs (a11y, redirects, external-links)
├── docs/                       # documentation (+ archive/)
├── next.config.mjs             # MDX wiring + 301 redirects (active config)
└── tailwind.config.js          # design tokens (palette, type scale, fonts)
```

## 🧭 Information architecture

The redo **consolidated eight routes to three built routes plus one external link.**

| Built route | Page |
|---|---|
| `/` | Home — hero · the problem · what we do · the five-layer framework · tools fit · how we engage · closing CTA |
| `/about` | About Julee Burdekin |
| `/contact` | Contact — qualifying form wrapping the existing SMTP API |

**Writing / Point of View are external links** (not built routes), stored in `copy.ts` `links`:
- **Writing** (nav + "Read the writing →") → `https://gnowledge-karden.ghost.io/tag/appliedai/`
- **Point of View** (hero, framework, About) → `https://gnowledge-karden.ghost.io/build-your-semantic-infrastructure-first/`
- **LinkedIn** (footer + contact) → `https://www.linkedin.com/in/jburdekin/`

Every external link opens in a new tab with `target="_blank"` + `rel="noopener noreferrer"` and an
external affordance (↗ glyph + "(opens in new tab)" for screen readers) via `components/ExternalLink.tsx`.

### 301 redirects (`next.config.mjs` → `redirects()`)

Old URLs are live/indexed, so they 301-redirect to preserve inbound links and search equity:

| Old route | → Target |
|---|---|
| `/specializations` | `/` |
| `/approach` | `/` |
| `/results` | `/` |
| `/governance` | `/` |
| `/engagement` | `/#engage` |
| `/methods` | `https://gnowledge-karden.ghost.io/tag/appliedai/` (external) |

> ⚠️ `next.config.mjs` is the **active** config (takes precedence over `next.config.ts`). It must
> keep the `@next/mdx` wiring and must **not** reintroduce `output: 'export'` — that breaks `/api/contact`.

### Proof/Results

Omitted entirely (no case study yet). A `{/* TODO: Proof/Results section … */}` comment in
`src/app/page.tsx` marks where it slots in later. The MDX wiring (`@next/mdx`, `mdx-components.tsx`)
is left in place but unused — for a future in-house move of the writing.

## 🎨 Content management

**ALL user-facing copy is centralized in [`/src/content/copy.ts`](../src/content/copy.ts).**
Components read from it; no hardcoded strings. Exports:

```typescript
{
  links,    // external destinations (writing, pov, linkedin)
  cta,      // CTA labels
  nav,      // nav items (with `external` flag)
  meta,     // siteTitle/siteDescription + per-route title/description (home, about, contact)
  home,     // hero, problem, whatWeDo, framework (5 layers), toolsFit, engage, closingCta
  about,    // heading, paragraphs, links
  contact,  // headline/intro + form schema (UNCHANGED field/API contract) + messages
  footer,   // tagline, copyright
}
```

## 🎨 Design system

Refined **dark-editorial** direction (build spec §5). Tokens live in `tailwind.config.js` + CSS variables.

- **Typography (the design):** display serif **Fraunces** (`--font-display`) + readable body serif
  **Newsreader** (`--font-body`), self-hosted via `next/font/google`. Mono **JetBrains Mono** for small
  eyebrow labels / layer numbers. (No Inter/Roboto/Arial/system stacks; no Space Grotesk.)
- **Palette:** warm deep-ink base (`ink.*`), warm paper foreground (`paper.*`), one disciplined
  Winterberry **accent** in two tunings — `accent.DEFAULT`/`accent.fill` for CTAs (white text) and
  `accent.text` (lighter, AA-safe) for links on the dark ground.
- **Signature visual:** the five layers as a stack standing on a foundation — `FrameworkLayers.tsx`
  (layer 01 at the base, building up; legible/ordered on mobile).
- **Motion:** staggered `fade-up` page-load reveals on hero + layers; `prefers-reduced-motion` disables them.

## 🔍 SEO

- Semantic HTML5 (`header`/`nav`/`main`/`article`/`section`), one `<h1>` per route.
- Per-route metadata via the Metadata API (`export const metadata`), canonical URLs.
- OpenGraph + Twitter cards; site-wide `opengraph-image.tsx` (`next/og`).
- JSON-LD `Person` (Julee Burdekin) + `ProfessionalService` in the root layout.
- `sitemap.ts` (3 routes) + `robots.ts`.
- Targets woven into copy/metadata: organizational semantic layer, agent-readiness, knowledge graph
  for AI, enterprise ontology, context engineering, semantic-platform selection (Semaphore, Graphwise).

## 📧 Email / contact API

The contact form posts to `src/app/api/contact/route.ts` (Nodemailer, direct SMTP, rate-limited,
input-sanitized, dual admin + confirmation emails). **The field schema and API contract are unchanged**
by the redo — only the page UI, headline/intro, and `challenge` options were repositioned. See
[`EMAIL_SETUP.md`](EMAIL_SETUP.md).

## 🚀 Deployment

Vercel, auto-deploy from `main`. See [`VERCEL-DEPLOYMENT-PLAN.md`](VERCEL-DEPLOYMENT-PLAN.md).
Server-side rendering must stay enabled (no `output: 'export'`).

## 🛠 Technical stack

- **Framework:** Next.js 15.5.18 (App Router) · **Language:** TypeScript 5 · **Styling:** Tailwind CSS v3
- **Fonts:** `next/font` (Fraunces, Newsreader, JetBrains Mono) · **Email:** Nodemailer · **Testing:** Playwright

## 🔧 Development

```bash
npm run dev        # dev server on :3000
npm run build      # production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm test           # Playwright E2E
```

### Making changes
1. **Content:** edit `/src/content/copy.ts` (incl. external `links`).
2. **Styling:** Tailwind tokens in `tailwind.config.js`, custom CSS in `src/app/globals.css`.
3. **Routes:** add under `src/app/<route>/page.tsx`; add redirects to `next.config.mjs` if URLs change.
4. **Components:** add to `src/components/`.

### Tests (`.playwright/`)
- `a11y.spec.ts` — landmarks, single `<h1>`, primary CTA, five-layer framework, field schema.
- `redirects.spec.ts` — the 301 consolidation (incl. external `/methods`); retired routes don't 404.
- `external-links.spec.ts` — `target`/`rel`/`href` on outbound links; no on-site `/writing` route.

> Playwright's `html` reporter opens a blocking report server; run with `--reporter=line`
> (and `PW_TEST_HTML_REPORT_OPEN=never`) for CI/non-interactive runs.
