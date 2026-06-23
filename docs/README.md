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
All user-facing copy lives in one file — headlines, the symptom list, CTAs, form labels, footer, and
per-route SEO metadata. External destinations (Writing, Point of View, LinkedIn) live in the `links`
export so they're swappable when content moves in-house. Components never hardcode strings.

```
copy.ts
├── links     (writing, pov, linkedin)
├── cta       (CTA labels)
├── nav       (items; `external` flag for Writing)
├── meta      (siteTitle/Description + per-route metadata: home, about, contact)
├── home      (hero, soundFamiliar, meaning, whatWeDo, whatYouGet, noMegaproject, toolsFit, engage, closingCta)
├── about     (heading, paragraphs, pullquote, closing, links)
├── contact   (headline/intro + form schema [field/API contract unchanged] + messages)
└── footer    (tagline [locked], copyright)
```

### Information architecture
Three built routes (`/`, `/about`, `/contact`) + an external **Writing** link to the Ghost blog.
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
