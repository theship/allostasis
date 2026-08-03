# Architecture & Development Guide

> **Positioning (build spec v2.1 — the field-guide inversion):** A well-fed agent is more alert.
> Agents act on the data objects they can reach. Where those objects don't carry your vision, agents guess. The
> spine is **the vision gap / data objects / data contracts**, and the canonical artifact is the
> **Agent-Readiness Field Guide** at `/agent-readiness` — six layers in process order, seven tests.
> This guide reflects the July 2026 field-guide inversion, on top of the v06 copy pass and the May
> 2026 redo. The pre-redo guide is archived at
> [`archive/ARCHITECTURE_DEVELOPMENT.2025-08.md`](archive/ARCHITECTURE_DEVELOPMENT.2025-08.md).

## 📁 Project Structure

```
allostasis/
├── src/
│   ├── app/
│   │   ├── api/contact/        # SMTP contact API (route.ts + rate-limit.ts) — UNCHANGED
│   │   ├── agent-readiness/    # /agent-readiness — the Field Guide (+ route OG image)
│   │   ├── about/page.tsx      # /about
│   │   ├── contact/page.tsx    # /contact (server) → ContactForm (client)
│   │   ├── page.tsx            # / (Home — the slim router)
│   │   ├── layout.tsx          # fonts, site metadata, JSON-LD
│   │   ├── sitemap.ts          # /sitemap.xml (4 routes)
│   │   ├── robots.ts           # /robots.txt
│   │   ├── opengraph-image.tsx # site-wide OG/Twitter card
│   │   └── globals.css
│   ├── components/             # Navbar, Footer, ContactForm, ExternalLink,
│   │                           # LayerCard (guide), OfferCards (shared home + guide)
│   └── content/copy.ts         # ⭐ SINGLE SOURCE OF TRUTH for all copy + links + metadata
├── .playwright/                # E2E specs (a11y, field-guide, redirects, external-links)
├── docs/                       # documentation (+ archive/)
├── next.config.mjs             # MDX wiring + 301 redirects (active config)
└── tailwind.config.js          # design tokens (palette, type scale, fonts)
```

## 🧭 Information architecture

**Four built routes plus one external link.** The May 2026 redo consolidated eight legacy routes to
three; the field-guide inversion then added `/agent-readiness` as the canonical point-of-view
destination, moving it **on-domain** from the external Ghost blog.

| Built route | Page |
|---|---|
| `/` | Home — the slim router: hero · the vision gap (thesis) · how we engage · closing CTA |
| `/agent-readiness` | **Field Guide** — header · opening · the reframe · six layers in three groups (2–3–1) with seven tests · mid-CTA band · the honest problem · pull-quote · how to work with us · bio · closing CTA |
| `/about` | About Julee Burdekin |
| `/contact` | Contact — qualifying form wrapping the existing SMTP API |

Nav order: **Home · Field Guide · Writing↗ · About · Contact** + the audit CTA button.

**Writing is the only external content link** (stored in `copy.ts` `links`); "point of view" now
resolves on-domain to the Field Guide:
- **Writing** (nav, demoted after Field Guide) → `https://gnowledge-karden.ghost.io/tag/appliedai/`
- **Point of View** → `/agent-readiness` (was a Ghost URL; retired)
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
  routes,     // internal destinations (home, fieldGuide, about, contact)
  links,      // EXTERNAL destinations only (writing, linkedin)
  cta,        // CTA labels
  nav,        // nav items (with `external` flag)
  meta,       // siteTitle/siteDescription + per-route title/description
  offers,     // ⭐ the three engagement offers — SINGLE SOURCE, used by home AND guide
  home,       // hero, thesis, engage, closingCta
  fieldGuide, // meta, kicker/title/subtitle, updated(+ISO), readingTimeMinutes, opening,
              // reframe, layersIntro, layerGroups[3], layers[6], midCta, honestProblem,
              // pullQuote, offersSection, bioBlock, closingCta
  about,      // heading, paragraphs, links
  contact,    // headline/intro + form schema (UNCHANGED field/API contract) + messages
  footer,     // tagline (locked: "allostasis: stability through change."), copyright, links
}
```

**Typed guide model** (`LayerBlock`, `LayerPart`, `Layer`, `LayerGroupId` are exported from
`copy.ts`). Each layer carries `number`, `name`, `tagline`, `group`, and a required `intro`. Layer 01
uses `parts` (01a Vision & principles, 01b Vocabulary & contracts) instead of flat sub-blocks;
layers 02–06 use `failurePattern` / `test` / `good`. **Seven tests total** — Layer 01 carries two.

> The three offers exist **once**, in `offers`. `OfferCards.tsx` renders them on both `/` and
> `/agent-readiness` — never fork the offer copy into a page.

## 🎨 Design system

Refined **dark-editorial** direction (build spec §5). Tokens live in `tailwind.config.js` + CSS variables.

- **Typography (the design):** display serif **Fraunces** (`--font-display`) + readable body serif
  **Newsreader** (`--font-body`), self-hosted via `next/font/google`. Mono **JetBrains Mono** for small
  eyebrow labels / layer numbers. (No Inter/Roboto/Arial/system stacks; no Space Grotesk.)
- **Palette:** warm deep-ink base (`ink.*`), warm paper foreground (`paper.*`), one disciplined
  Winterberry **accent** in two tunings — `accent.DEFAULT`/`accent.fill` for CTAs (white text) and
  `accent.text` (lighter, AA-safe) for links on the dark ground.
- **Field Guide (signature):** numbered layer cards (01–06) under three quieter group headings that
  carry the 2–3–1 arc. Layer 01 nests its 01a/01b parts visibly inside one card. The **test**
  sub-block is foregrounded with an accent left rule + panel — the tests are why the page exists.
  Register is a maintained reference document, not a landing page: no sticky CTAs, no popups.
- **Heading levels on the guide:** h1 title → h2 sections → h3 group headings → h4 layer names →
  h5 part names. Sub-block labels are styled paragraphs, keeping the outline free of skipped levels.
- **Motion:** staggered `fade-up` page-load reveals on the hero; `prefers-reduced-motion` disables them.

## 🔍 SEO

- Semantic HTML5 (`header`/`nav`/`main`/`article`/`section`), one `<h1>` per route.
- Per-route metadata via the Metadata API (`export const metadata`), canonical URLs.
- OpenGraph + Twitter cards; site-wide `opengraph-image.tsx` plus a route-specific card at
  `agent-readiness/opengraph-image.tsx` (`next/og`).
- JSON-LD `Person` (Julee Burdekin) + `ProfessionalService` in the root layout; **`TechArticle`** on
  `/agent-readiness`, with `dateModified` synced to `fieldGuide.updatedISO` (which also drives the
  visible "Updated" line and `sitemap.ts` `lastModified` — bump it when the guide is edited).
- `sitemap.ts` (4 routes) + `robots.ts`.
- Targets woven into copy/metadata: agent-readiness, organizational legibility, the vision gap,
  data objects, data contracts, enterprise ontology, knowledge graph for AI, semantic layer,
  agent evals.

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
- `a11y.spec.ts` — landmark **roles** (banner/main/contentinfo — the guide nests `<header>` inside
  `<article>`, so tag selectors would be ambiguous), single `<h1>`, primary CTA, the slim home,
  hero CTA targets, nav/footer Field Guide links, offer parity across `/` and the guide, field schema.
- `field-guide.spec.ts` — H1, all six layer headings, three group headings **in order**, the nested
  01a/01b parts, per-layer intro paragraphs, all seven test labels, mid-CTA band, pull-quote,
  offers, no user-visible TODO/placeholder text, and six/seven (never five) language.
- `redirects.spec.ts` — the 301 consolidation (incl. external `/methods`); retired routes don't 404.
- `external-links.spec.ts` — `target`/`rel`/`href` on outbound links; no on-site `/writing` route.

> Playwright's `html` reporter opens a blocking report server; run with `--reporter=line`
> (and `PW_TEST_HTML_REPORT_OPEN=never`) for CI/non-interactive runs.
