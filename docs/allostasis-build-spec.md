# Build Spec — allostasis.ai (Full Redo)

**Audience:** Claude Code
**Goal:** Rebuild allostasis.ai as a fast, type-led, SEO-strong site that repositions the practice around the *organizational semantic layer*. This is a content-and-positioning site, not a SaaS app — its job is to be found by people searching for this work and to make the seniority of the practitioner undeniable.

---

**Repo:** `github.com/theship/allostasis` · **Live:** `https://allostasis.ai` · **Deploy:** Vercel (auto-deploy from `main`).

### Confirmed current stack (do not migrate away from this)
- **Next.js (App Router)** + **TypeScript** + **Tailwind CSS**. (Root `mdx-components.tsx` confirms App Router with `@next/mdx`; `next.config.ts/mjs`, `tailwind.config.js`, `tsconfig.json` present.)
- **All site copy lives in a single file: `/src/content/copy.ts`.** This is the project's content-management pattern — keep it.
- **Contact form is a working server-side SMTP API route** (env vars `SMTP_HOST/PORT/SECURE/USER/PASS/FROM/TO`, plus `MAX_REQUESTS_PER_HOUR`), sending to `info@allostasis.ai`, with rate limiting and input sanitization already implemented.
- **Vercel** hosting; custom domain `allostasis.ai` (DNS in Namecheap, A record → Vercel, auto-HTTPS). Vercel project: `theships-projects/allostasis`.
- **Playwright** E2E tests configured (`playwright.config.ts`, `.playwright/`).
- Current theme: **dark, "Pantone Autumn 2025" palette**; mobile-responsive with a hamburger menu.
- Current positioning (to be replaced): README describes "a boutique AI studio specializing in knowledge systems" — this is exactly the mechanism-led framing the redo replaces with the organizational-semantic-layer positioning.
- **External writing (linked, not hosted):** the practitioner's essays live on a Ghost blog, **Gnowledge Karden** (`https://gnowledge-karden.ghost.io/`). On-thesis posts are filtered under the Applied AI tag: `https://gnowledge-karden.ghost.io/tag/appliedai/`. The "Point of View" anchor post is *Build Your Semantic Infrastructure First*: `https://gnowledge-karden.ghost.io/build-your-semantic-infrastructure-first/`.
- **Practitioner name (confirmed):** **Julee Burdekin** — use this everywhere `[Name]` appeared.

## 0. Do this first (before writing any code)

1. **Read the repo's own docs first:** `README.md`, `docs/ARCHITECTURE_DEVELOPMENT.md`, `docs/EMAIL_SETUP.md`, and `docs/VERCEL-DEPLOYMENT-PLAN.md`. Then map the current `src/app` routes and the shape of `/src/content/copy.ts` before changing anything.
2. **Preserve the working infrastructure.** Do **not** touch or rebuild: the Vercel deployment pipeline, the domain/DNS, the SMTP contact API route and its env vars, or the analytics if any is wired. This is a redo of **content, design, and information architecture** on top of the existing app — not a re-platform.
3. **Drive all copy through `/src/content/copy.ts`.** Extend that file's structure to cover the new pages/sections (§4) and reference it from components. Do not hardcode user-facing strings in components.
4. **Resolve placeholders.** The practitioner name is **Julee Burdekin** (confirmed) — use it for every `[Name]`. Contact email is known (`info@allostasis.ai`). Still outstanding: the **LinkedIn URL** (check `copy.ts`/footer; if absent, leave a `// TODO` — do not invent it).
5. **Keep the build green.** `npm run build` must pass and the existing Playwright tests must be updated to match the new routes/content and pass (§8).

---

## 1. Scope

**In scope:** Home, About, Contact (built pages). Global nav, footer, SEO, responsive, accessibility, deployment. **Writing / Point of View are external links** to the existing Ghost blog (see §3) — not built pages, for now.

**Out of scope / explicitly excluded:**
- **The "Proof / Results" section is omitted entirely** — no case study exists yet. Do **not** scaffold an empty or placeholder Proof section on the homepage. Instead, leave a single clearly-labeled JSX comment where it would go (`{/* TODO: Proof/Results section — add when first case study lands */}`) so it's trivial to slot in later. The site must read as complete without it.
- **No on-site articles / blog for now.** Essays live on the external Ghost blog and are linked out (§3, §4.3). The repo's `@next/mdx` wiring can stay in place but is unused until content is brought in-house later — do not build a `/writing` index, `[slug]` routes, MDX article pages, or an RSS feed.
- No e-commerce, no auth, no third-party CMS.
- No logo/brand-identity work beyond typographic treatment of the wordmark "Allostasis" (the live brand; see §7 naming note).

---

## 2. Tech stack

**Stay on the existing stack: Next.js (App Router) + TypeScript + Tailwind, deployed on Vercel.** Do not switch frameworks — a migration would discard the working SMTP contact pipeline, the Vercel deploy automation, and the `copy.ts` content pattern for zero benefit. Next.js App Router covers every requirement in this spec (static-first rendering, the Metadata API for SEO, `sitemap.ts`/`robots.ts`, Vercel-native OG images).

Implementation requirements:
- **Render static-first.** Use Server Components and static generation (SSG) for all marketing/content pages; the only server-side code is the existing contact API route. Ship minimal client JS — add `"use client"` and vanilla interactivity only where needed (mobile nav toggle, optional reveal animations).
- **Content source of truth:** extend `/src/content/copy.ts` for all page/section copy (§4). Components read from it; no hardcoded strings.
- **Articles:** none on-site for now — "Writing" / "Point of View" are **external links** to the Ghost blog (§3, §4.3). Leave the existing `@next/mdx` wiring untouched for a future in-house move, but build no article routes now.
- **Styling:** Tailwind, with the design tokens (type scale, colors, spacing) defined centrally in `tailwind.config.js` / CSS variables so the aesthetic in §5 is consistent and themeable.
- **Deploy:** unchanged — commit to `main`, Vercel auto-deploys. Verify a Vercel preview build before merging.

---

## 3. Information architecture

Nav (left-to-right): **Home · Writing · About · Contact** — where **Writing** is an *external* link to the Ghost blog's Applied AI tag (opens in a new tab; see §4.3). (Label can be "Point of View" or "Essays" per preference; it points to the same external destination.)

Implement as App Router segments under `src/app/`, preserving the contact API route under `app/api/`. **The current site has eight routes** (`/`, `/specializations`, `/approach`, `/results`, `/governance`, `/engagement`, `/methods`, `/contact`); the redo **consolidates to three built routes plus one external link**. Because the old URLs are live and may be indexed, add **301 redirects** (in `next.config` `redirects()` or middleware) so inbound links and search equity don't 404:

| Old route | Fate | Redirect target |
|---|---|---|
| `/` | Rewritten | — |
| `/specializations` | Removed (content retired) | `/` |
| `/approach` | Removed (folded into Home "What we do" + the framework) | `/` |
| `/results` | **Removed** (no case study yet — see §1) | `/` |
| `/governance` | Removed (folded into Home item 03) | `/` |
| `/engagement` | Removed (folded into Home "How we engage") | `/#engage` |
| `/methods` | Removed (essays now external) | `https://gnowledge-karden.ghost.io/tag/appliedai/` (external 301) |
| `/contact` | Kept (rewritten UI, same API) | — |
| — | New: `/about` | — |

Built routes: `/` (Home), `/about`, `/contact`. There is **no** on-site `/point-of-view` or `/writing` route — those nav/CTA links point to the external Ghost blog.

- `/` — Home (`app/page.tsx`)
- `/about` — the About page (`app/about/page.tsx`)
- `/contact` — contact page wrapping the **existing** contact form/API (do not rebuild the API)
- **Writing / Point of View** — *external* links to the Ghost blog (§4.3); no on-site route.

Footer on every page: wordmark, the tagline line (see §6 footer copy), copyright, and a link to Contact and LinkedIn.

---

## 4. Page-by-page content (source of truth)

> Use this copy verbatim. Markdown emphasis below indicates intended hierarchy, not literal characters to render. `[Name]` is a placeholder — resolve per §0.4.

### 4.0 Content model — `copy.ts` migration map

`/src/content/copy.ts` is the single source of truth and currently exports: `cta, nav, meta, home, specializations, approach, results, governance, engagement, methods, contact, footer, diagram, faq` (plus the `Copy` type and `siteCopy` default). Restructure it as follows; update the `Copy` type and `siteCopy` default to match the final export set.

| Export | Action |
|---|---|
| `cta` | **Rewrite.** `primaryLabel: "Request an Agent-Readiness Audit"`; keep a secondary (`"Read the point of view"` on hero / `"Book a 25-min intro"` globally). |
| `nav` | **Replace** with: Home `/`, Writing (external → Ghost Applied AI tag), About `/about`, Contact `/contact`. Mark the Writing item as external so the component renders it with `target="_blank"` + `rel="noopener noreferrer"` and an external affordance. |
| `links` *(new)* | **Add** a small export holding the external destinations so they live with the rest of the copy: `writing: "https://gnowledge-karden.ghost.io/tag/appliedai/"`, `pov: "https://gnowledge-karden.ghost.io/build-your-semantic-infrastructure-first/"`, plus `linkedin` (resolve per §0.4). Reference these from nav and the Home CTAs. |
| `meta` | **Rewrite.** Keep `siteTitle: "Allostasis AI"`. New `siteDescription`: *"We architect the organizational semantic layer — the principles, workflows, vocabulary, and reference knowledge AI agents need to act correctly."* Replace `pages` keys with the built routes only — `home, about, contact` — each with a hand-written `title`/`description` per §6 targets. |
| `home` | **Rewrite & expand** to hold the §4.1 sections: `hero`, `problem`, `whatWeDo` (3 items), `framework` (the 5 layers — moved here from `diagram`), `toolsFit` (the "Where this fits the tools you already know" block), `engage` (3 offers), `closingCta`. The old `bullets`/`ctaSection` are superseded. |
| `specializations` | **Remove.** The vertical cards (Civic, Life Sciences, Media, R&D) are off-message for the new positioning; do not carry them over. |
| `approach` | **Remove as a route.** The Frame→Secure→Validate→Transfer loop is replaced by the five-layer framework. (Material can seed the POV essay later, but no export/route.) |
| `results` | **Remove** (export + route). No case study yet (§1). |
| `governance` | **Remove as a route;** fold the durable ideas (versioning, access control, change management, resilience) into Home item 03 ("We build it to hold under scrutiny"), which already references versioning/lineage/certification/evals. |
| `engagement` | **Remove as a route;** the three new offers (Audit / Semantic Architecture Engagement / Fractional Knowledge Engineering) live in Home `engage`. The old Build-with/Build-for/Advisory models are superseded. |
| `methods` | **Remove** (export + route). Essays now live on the external Ghost blog and are linked out (§3, §4.3). The two existing memos (`golden-sets`, `hitl`) will **no longer be hosted on-site** — if you want them public, repost them to the Ghost blog. Drop the nested-JSON article schema entirely. |
| `contact` | **Keep the form schema and API contract** (see §4.5); rewrite `headline`/`intro` and refresh the `challenge` select options to the new positioning. |
| `footer` | **Update.** `disclaimer` → the fuller tagline (§4.6); bump copyright to 2026. |
| `diagram` | **Replace with `framework`** (the five layers + glosses) as the signature visual. Retire the Data→Labeling→Eval→Release rail (or demote to a minor element on the POV page). |
| `faq` | **Optional.** Drop, or rewrite to the new positioning (the current Qs reference "Apply AI Today" and data hand-off — retire those framings). Not required by this spec. |

### 4.1 Home

**Hero**
- Headline: *Build the semantic layer your agents are already trying to read.*
- Subhead: *Every AI agent inside your organization forms a model of how you work from whatever context it can find — your docs, your code, your half-written norms. Allostasis is knowledge engineering for that reality: we architect the organizational semantic layer — the principles, workflows, vocabulary, and reference knowledge agents need to act correctly — so they stop guessing.*
- Primary CTA button: **Request an Agent-Readiness Audit** → links to /contact.
- Secondary CTA: **Read the point of view →** → external link to the POV anchor post (`links.pov`), new tab + `rel="noopener noreferrer"`.

**Section — The problem** (heading: *Your organization is already being interpreted. The only question is how well.*)
Body (two short paragraphs):
1. *The semantic-platform vendors have it half right: a knowledge graph is a kind of GPS for AI — it steers a model toward grounded, explainable answers instead of confident guesses. But a graph over your data is only half the map. Agents don't just need your records structured; they need to know how decisions get made here, which workflow is canonical, what a term actually means in your business, and why you do things the way you do.*
2. *That layer — the organizational one — is the part nobody has owned. When it's thin or contradictory, the agent doesn't stop. It fills the gap with its best guess, and the cost of those guesses compounds quietly across every task. We call the accumulated cost **context debt**: like tech debt, but it shows up as decisions made on stale, incomplete, or invented context. Agent-readiness isn't a documentation problem. It's a semantic-layer problem at the level of the whole organization.*

**Section — What we do** (three items, numbered 01/02/03)
- **01 — We map the organizational semantic layer.** *We assess how legible your organization actually is to an agent: where vision and principles live, how operating norms are encoded, whether workflows are documented well enough to be executed rather than merely described, how reference knowledge holds up when something acts on it, and whether your vocabulary is consistent enough to be trusted. You get a clear, scored picture of where agents are guessing — and what it's costing.*
- **02 — We architect it, not just document it.** *A semantic layer is a design discipline, not transcription. We model the entities, relationships, controlled vocabulary, and canonical definitions an agent needs, and we structure the five layers so they reinforce each other and stay correct as the organization changes. This is ontology and knowledge-graph thinking applied to how an organization works — drawn from years of engineering management and strategic planning, not a style guide.*
- **03 — We build it to hold under scrutiny.** *Governed context: versioning, lineage, certification of new terms and relationships, and evaluation loops wired into how you already work — so improvements are measurable, not anecdotal, and your team owns the system after we leave.*

**Section — The framework** (heading: *The five layers of an agent-ready organization*)
Render as a visually distinct, ordered set (see §5 design — this is the signature visual element). The five layers, each with its gloss:
1. **Vision & principles** — *the why, so an agent can reason about tradeoffs the way you would*
2. **Operating norms** — *the how-we-do-things-here that's usually unwritten*
3. **Workflows** — *processes documented well enough to be executed, not just described*
4. **Reference knowledge** — *durable facts, structured for retrieval and correct interpretation — where ontology, controlled vocabulary, and knowledge graphs live*
5. **Evals & feedback** — *how you know any of the above is actually working*
Closing line under the layers: *Most organizations have layers 3 and 4 in some form. Almost none have 1, 2, and 5. That gap is where agents fail — and it's the gap a data-only semantic layer can't close.*
Link: **Read the full point of view →** → external POV anchor post (`links.pov`), new tab + `rel="noopener noreferrer"`.

**Section — Where this fits the tools you already know**
Body: *If you're evaluating a semantic platform — Progress Semaphore, Graphwise (the merged PoolParty + Ontotext GraphDB), Collibra, or building on an RDF graph yourself — you're solving the right problem with the right category of tool. But the platform models the last 20%. The 80% that determines whether any of it works is the ontology, the governed vocabulary, and the organizational knowledge that feeds it. We do that 80% — and we'll help you choose and stand up the platform so it's modeling something worth modeling.*
Link: **Read the writing →** → external Ghost Applied AI tag (`links.writing`), new tab + `rel="noopener noreferrer"`. (When dedicated platform/knowledge-graph essays exist on the blog, this can split into two specific links.)

`{/* TODO: Proof/Results section — add when first case study lands */}`

**Section — How we engage** (three offers)
- **Agent-Readiness Audit** — *A fixed-scope, fixed-price diagnostic. We assess your organizational semantic layer against the five-layer framework — including knowledge architecture, vocabulary consistency, and agent-consumability of your existing surfaces — and deliver a scored report with prioritized, concrete fixes. The fastest way to know where you stand.*
- **Semantic Architecture Engagement** — *A defined project to design and build the missing layers — principles, norms, workflows, ontology, evals — into a system your team can maintain, and to integrate it with whatever platform you run.*
- **Fractional Knowledge Engineering** — *Ongoing senior partnership for organizations scaling agent use, where the semantic layer needs continuous architecture and governance, not a one-time fix.*
CTA: **Request an Audit** → /contact

**Closing CTA** (heading: *Find out how legible your organization really is.*)
*The audit takes a week and tells you exactly where your agents are guessing — and what it's costing you.*
Button: **Request an Agent-Readiness Audit** → /contact

### 4.2 About (`/about`)

Heading: *Knowledge engineering, from someone who's run the engineering — and built the graphs.*

Body:
- *I'm Julee Burdekin. Before agents made organizational legibility urgent, I spent years in engineering management and strategic planning, and I built knowledge graphs and information architecture when "semantic layer" was still a back-office concern. That combination is the point. Making an organization legible to its agents isn't a writing task and it isn't pure data plumbing — it's an org-design and systems problem that happens to produce structured artifacts.*
- *The discipline the market now calls the semantic layer — taxonomies, ontologies, knowledge graphs that ground AI in real meaning — is the same discipline I've practiced, applied one level up: not just to your data, but to how your organization actually decides, operates, and knows things. That's the layer agents stand on. It's also the layer nobody has owned.*
- *Allostasis is that discipline, offered as a practice. I work with teams who've realized their agents are only as good as the context they're given — and that the context is the part no one has architected yet.*
Links: **Read the point of view →** (external, `links.pov`) and **Get in touch →** (/contact).

### 4.3 Writing / Point of View (external — not built)
There is **no on-site Writing or Point of View route.** These nav items and the Home CTAs link out to the existing Ghost blog:
- **Writing** (nav, and Home "Read the writing →") → `https://gnowledge-karden.ghost.io/tag/appliedai/` — the Applied AI tag, which filters to the on-thesis professional posts. **Default to the tag, not the blog root**, so buyers arriving from the audit pitch don't land in the mixed personal/creative feed. (Operator may choose the root `https://gnowledge-karden.ghost.io/` instead — that's a positioning call, noted in §7.)
- **Point of View** (hero + framework + About "Read the point of view →") → `https://gnowledge-karden.ghost.io/build-your-semantic-infrastructure-first/` — the closest existing POV anchor post.

External-link requirements: every outbound link opens in a new tab with `target="_blank"` and `rel="noopener noreferrer"`, and carries a small external-link affordance (e.g. a ↗ glyph or `aria-label` suffix "(opens in new tab)"). Store the URLs in `copy.ts` `links` (§4.0), not inline, so they're swappable when content moves in-house.

### 4.5 Contact (`/contact`)
The existing contact form is a **multi-field qualifying form** (name, email, company, role, primary-challenge select, timeline select, budget select, details) wired to the **server-side SMTP API route** (`SMTP_*` env vars, `MAX_REQUESTS_PER_HOUR`, sanitization, rate limiting) sending to `info@allostasis.ai`. **Keep that field schema and API contract intact** — stripping fields would break the API; the qualifying fields are appropriate for high-ticket advisory and worth keeping. Build a fresh page UI around it and:
- Rewrite `headline`/`intro` to the new positioning, e.g. heading *"Find out how legible your organization is"*, intro *"Tell me where your agents are guessing, and I'll tell you what it's costing."*
- Refresh the `challenge` select **options** to the new positioning (replace the old data-quality/HITL options): *Agent-readiness / semantic-layer audit · Ontology & knowledge-graph design · Agents acting on missing or stale context · Governance & versioning of knowledge · Choosing a semantic platform (Semaphore / Graphwise / etc.) · Scaling agent use · Other.*
- Keep `timeline`, `budget`, `company`, `role`, `details` as-is. Add a LinkedIn link near the form.
- Verify the form still sends end-to-end after the redo (§8).

### 4.6 Footer (all pages)
- Wordmark.
- Tagline line: *allostasis: maintaining stability through change — including the change of handing work to agents.*
- *© 2026 Allostasis AI.*
- Links: Contact, LinkedIn.

---

## 5. Design direction

Apply the frontend-design skill. Commit to a clear, intentional aesthetic — **refined editorial / typographic**, the register of a serious essay or a design-led publication, not a generic SaaS landing page. The work is intellectual and senior; the design should signal that through restraint, typographic confidence, and generous space, not through gradients and stock illustration.

Concrete direction (Claude Code may refine, but stay within this spirit):
- **Typography is the design.** Pair a distinctive display face (a characterful serif or a strong grotesque with personality) with a highly readable body face. **Do not** use Inter, Roboto, Arial, or system-default stacks, and **do not** default to Space Grotesk. Establish a deliberate type scale with clear hierarchy; long-form pages (POV, articles) get an optimal measure (~62–72ch) and comfortable line height for sustained reading.
- **Palette:** restrained and high-contrast — a paper/ink base (warm off-white *or* a deep ink dark mode — pick one and commit), with **one** disciplined accent used sparingly for links, the layer motif, and CTAs. The current site is already **dark** (a "Pantone Autumn 2025" palette); a refined dark-editorial direction is a natural fit and lets you build on the existing baseline rather than re-theming from zero — but if you commit to light, do it fully and intentionally. Define the palette as CSS variables / Tailwind theme tokens. Avoid purple-on-white and any rainbow of evenly-distributed colors.
- **Signature element — the five layers.** The framework section is the one thing a visitor should remember. Treat it as a deliberate visual motif: a stacked/layered composition that reads as a *stack standing on a foundation* (layer 1 at the base or top, consistently). Subtle, tasteful, not infographic-clipart. This motif can echo lightly elsewhere (e.g., section dividers) for cohesion.
- **Motion:** subtle and high-impact. One well-orchestrated page-load reveal (staggered) on the home hero and the layers section; restrained hover states on links/CTAs. CSS-only where possible. Respect `prefers-reduced-motion` (disable non-essential motion).
- **Spatial composition:** generous negative space; confident, slightly editorial layout (asymmetry is welcome where it serves reading). Avoid the centered-hero-three-cards-equal-grid default.
- **Atmosphere over flat fills:** subtle texture/grain or a restrained gradient mesh is fine *if* it stays quiet and on-brand; never let it compete with the type.

The test: a senior technical buyer should land on it and immediately read "this person thinks rigorously," not "another AI consultancy template."

---

## 6. SEO (high priority — this is how customers find the practice)

This is a primary success metric, not an afterthought. Use Next.js App Router conventions throughout. Implement all of:
- **Semantic HTML5** in the JSX (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, proper heading order, one `<h1>` per route).
- **Per-route metadata via the Metadata API** — `export const metadata` (or `generateMetadata` for articles, sourced from frontmatter). Hand-write titles and descriptions per page; don't ship generic auto-text. Targets to weave naturally into copy, headings, and metadata (do not keyword-stuff): *organizational semantic layer, agent-readiness, knowledge graph for AI, enterprise ontology, context architecture / context engineering, semantic layer consulting, RAG grounding, GraphRAG, semantic platform selection (Semaphore, PoolParty, Graphwise).*
- **OpenGraph + Twitter cards** on every route (via the Metadata API). Generate OG images with Next's `opengraph-image` / `@vercel/og` (Vercel-native — use it). A static, on-brand template per route type is fine; if image generation is deferred, leave a sized placeholder and a `// TODO`.
- **JSON-LD structured data** (script tags in the layout/pages): `Person` (the practitioner — Julee Burdekin) and `ProfessionalService` on home/about. (No `Article` schema — articles are off-site.)
- **`app/sitemap.ts`** and **`app/robots.ts`** (Next file conventions) generated at build, covering the three built routes (`/`, `/about`, `/contact`).
- **Canonical URLs**, clean lowercase slugs, consistent trailing-slash handling.
- **External links:** all outbound links to the Ghost blog use `rel="noopener noreferrer"` and open in a new tab. **SEO tradeoff to be aware of:** with essays hosted off-site, the long-tail search value for the target terms accrues to the `gnowledge-karden.ghost.io` domain, not `allostasis.ai`. The built pages still carry the positioning keywords, but ongoing article SEO benefits the blog. This is acceptable for "for now"; the way to consolidate it later is to bring the writing in-house (re-enable the deferred MDX path) or move the blog onto a branded subdomain (e.g. `writing.allostasis.ai`).
- **Performance budget:** static-first rendering, minimal client JS, `next/image` for any imagery, `next/font` for self-hosted fonts (good for both performance and the distinctive type in §5). Target Lighthouse ≥95 on Performance, Accessibility, Best Practices, SEO.

---

## 7. Accessibility & responsive

- WCAG AA: color contrast on the chosen palette must pass; visible focus states; keyboard-navigable nav and CTAs; `alt` text on any imagery; `prefers-reduced-motion` honored.
- Fully responsive, mobile-first. The nav collapses to an accessible toggle on small screens. The five-layer motif must remain legible and ordered on mobile (stack vertically, don't crush).

> **Naming note for Claude Code:** the site uses **Allostasis** (domain `allostasis.ai`, contact `info@allostasis.ai`) — treat it as the brand. Do **not** introduce "Legible" as a name: it collides head-on with **Legible AI** (`legiblepolicy.com`), an established AI policy-intelligence company in an adjacent space. "Legibility / legible" may appear as a *concept/verb* in copy (e.g. "make your organization legible to its agents"), but not as the brand name or wordmark. If the operator later adopts a different brand, the only changes are the wordmark, footer tagline, route metadata/titles, and in-copy name references in `copy.ts` — the structure and design are name-agnostic. (Domain and SMTP `info@allostasis.ai` persist regardless of display name unless the operator says otherwise.)

> **Brand-seam note (for the operator, not a build task):** the external blog is branded **Gnowledge Karden**, a second name alongside Allostasis. Linking out means a visitor crosses from one brand to another. Defaulting the link to the **Applied AI tag** keeps the destination on-thesis and softens this, but it doesn't resolve the underlying inconsistency. Worth deciding, before long, on one name and ideally hosting the writing under the site's own brand/domain. Not blocking for this build.

---

## 8. Deliverables & acceptance criteria

Done means:
1. The three built routes (`/`, `/about`, `/contact`) build and render with the §4 copy (driven from `/src/content/copy.ts`), **no Proof/Results section present** (only the JSX TODO comment). The eight→three route consolidation is complete and the **301 redirects** in §3 resolve correctly (old URLs don't 404, including `/methods` → the external Ghost tag).
2. **External Writing / Point of View links** (nav + Home CTAs + About) resolve to the correct Ghost URLs from `copy.ts` `links`, open in a new tab, and carry `rel="noopener noreferrer"` + an external affordance. No on-site `/writing` or `/point-of-view` route exists.
3. All SEO items in §6 implemented via App Router conventions; `sitemap.ts` (three routes), `robots.ts`, OG images, and `Person`/`ProfessionalService` JSON-LD verified present.
4. `npm run build` passes cleanly, and the **existing Playwright tests are updated to the new routes/content and pass** (`npm run` test script) — including tests for the old→new redirects and the external-link attributes.
5. **Contact form still sends** via the existing SMTP API route to `info@allostasis.ai` (verify end-to-end, or at minimum that the route and env contract are intact).
6. Vercel preview deploy succeeds before merge; domain, DNS, and any analytics untouched and working.
7. Lighthouse ≥95 across the four categories on Home and the About page.
8. Placeholders resolved (name = **Julee Burdekin**, confirmed) or flagged as `// TODO` (LinkedIn URL, OG image) — never invented.
9. Responsive and AA-accessible per §7; root `README.md` updated to reflect the new positioning and structural changes.
10. **`docs/` updated, versioned, and pruned.** Update `docs/ARCHITECTURE_DEVELOPMENT.md` to reflect the new information architecture (the eight→three route consolidation, the 301 redirects, the external Writing/Point-of-View links, and the `copy.ts` content model), and refresh the `docs/` index/README. **Archive rather than delete** anything now superseded — move stale route/architecture notes into `archive/` (or mark them clearly as superseded) so history is preserved. Record the change with a dated changelog/version entry, and update `docs/EMAIL_SETUP.md` / `docs/VERCEL-DEPLOYMENT-PLAN.md` only if the contact route or routing/redirects actually changed their steps.

Provide, at handoff: the dev command (`npm run dev`), the build command, the external link targets in `copy.ts`, and a short list of any unresolved TODOs.
