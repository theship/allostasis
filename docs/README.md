# Allostasis AI — Documentation

## 📚 Index

### Architecture & Development
- [**ARCHITECTURE_DEVELOPMENT.md**](ARCHITECTURE_DEVELOPMENT.md) — project structure, information architecture, 301 redirects, the `copy.ts` content model, design system, SEO
- [**CHANGELOG.md**](CHANGELOG.md) — dated record of structural/positioning changes

### Deployment
- [**VERCEL-DEPLOYMENT-PLAN.md**](VERCEL-DEPLOYMENT-PLAN.md) — Vercel deployment guide & troubleshooting

### Email / contact form
- [**EMAIL_SETUP.md**](EMAIL_SETUP.md) — direct-SMTP configuration for the contact form
- [**GOOGLE_WORKSPACE_EMAIL_SETUP.md**](GOOGLE_WORKSPACE_EMAIL_SETUP.md) — Google Workspace specifics
- [**QUICK_EMAIL_TEST.md**](QUICK_EMAIL_TEST.md) — quick test of email functionality

### Archive
- [**archive/**](archive/) — superseded docs, kept for history (e.g. the pre-redo architecture guide)

## 🎯 Key concepts

### Single-source content (`/src/content/copy.ts`)
All user-facing copy lives in one file — headlines, the Field Guide's three layers and seven experiments,
CTAs, form labels, footer, and per-route SEO metadata. Internal destinations live in `routes`;
the only external one (LinkedIn) in `links`. Components never hardcode strings.

```
copy.ts
├── routes     (home, fieldGuide, about, contact)
├── links      (EXTERNAL only: linkedin)
├── cta        (CTA labels)
├── nav        (Home, Field Guide, About, Contact)
├── meta       (siteTitle/Description + per-route metadata)
├── offers     (⭐ the three engagement offers — SINGLE SOURCE: home AND guide)
├── home       (hero, thesis, engage, closingCta)
├── fieldGuide (opening, reframe, layersIntro, layers[3] each with experiments,
│               midCta, honestProblem, pullQuote, offersSection, bioBlock, closingCta)
├── about      (heading, paragraphs, links)
├── contact    (headline/intro + form schema [field/API contract unchanged] + messages)
└── footer     (tagline [locked], copyright, links)
```

The guide is **three layers, seven experiments** — content, domain of interest, operations, with
experiments numbered 1-7 flat.
Bump `fieldGuide.updatedISO` when editing the guide: it drives the visible "Updated" line, the
`TechArticle` `dateModified`, and the sitemap's `lastModified`.

### Information architecture
Four built routes: `/`, `/agent-readiness`, `/about`, `/contact`. The Field Guide at
`/agent-readiness` is the canonical point-of-view destination, on-domain. Nothing links out to the
Ghost blog.
The previous eight routes are consolidated via 301 redirects. Details and the redirect table are in
[ARCHITECTURE_DEVELOPMENT.md](ARCHITECTURE_DEVELOPMENT.md).

### Why direct SMTP?
Privacy (no third-party services), control over the email flow, no per-email cost, GDPR-friendly.
The API route, rate limiting, and sanitization are unchanged by the redo.

## 🚀 Deployment checklist
- [ ] Update content in `src/content/copy.ts`
- [ ] `npm run build` passes
- [ ] `npm test` (Playwright) passes — `--reporter=line` for non-interactive runs
- [ ] Verify contact form sends end-to-end
- [ ] Check responsive + accessibility (AA)
- [ ] Push branch → review Vercel preview → merge to `main` (auto-deploys)

---
For the project overview see the root [README.md](../README.md).
