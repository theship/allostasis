# Allostasis AI Site Documentation

## 📚 Documentation Index

### Architecture & Development
- [**ARCHITECTURE_DEVELOPMENT.md**](ARCHITECTURE_DEVELOPMENT.md) - Project structure, technical stack, development guide

### Configuration & Setup
- [**EMAIL_SETUP.md**](EMAIL_SETUP.md) - Complete email configuration guide with direct SMTP setup
- [**GOOGLE_WORKSPACE_EMAIL_SETUP.md**](GOOGLE_WORKSPACE_EMAIL_SETUP.md) - Specific instructions for Google Workspace accounts
- [**QUICK_EMAIL_TEST.md**](QUICK_EMAIL_TEST.md) - Quick guide to test email functionality

## 🎯 Key Concepts

### Single-Source Content Management

**All site content is managed in `/src/content/copy.ts`**

This revolutionary approach means:
- ✅ No hunting through components for text
- ✅ Single file to update all content
- ✅ Consistent messaging across the site
- ✅ Easy to maintain and version control
- ✅ Clear separation of content and code

### Content Categories in copy.ts

1. **Meta Content** - SEO titles, descriptions
2. **Navigation** - Menu items, links
3. **Page Content** - Headlines, body text, CTAs
4. **Form Content** - Labels, placeholders, validation messages
5. **Component Text** - Buttons, footer, diagrams
6. **Dynamic Content** - Methods articles, FAQ items

## 🏗 Architecture Decisions

### Why Single-Source Content?

1. **Maintainability** - One place to update everything
2. **Consistency** - No duplicate or conflicting text
3. **Localization Ready** - Easy to swap copy.ts for different languages
4. **Version Control** - Track all content changes in one file
5. **Developer Experience** - Clear separation of concerns

### Why Direct SMTP?

1. **Privacy** - No third-party services storing data
2. **Control** - Complete ownership of email flow
3. **Cost** - No per-email charges
4. **Compliance** - GDPR/privacy friendly
5. **Reliability** - Direct connection to mail server

### Why Static Export?

1. **Performance** - No server-side rendering needed
2. **Security** - No attack surface
3. **Cost** - Free hosting on GitLab/GitHub Pages
4. **Reliability** - No server to maintain
5. **Scalability** - CDN-ready

## 🔧 Development Workflows

### Adding New Content

1. Open `/src/content/copy.ts`
2. Add your content to the appropriate section
3. Import and use in your component: `siteCopy.section.property`
4. No hardcoded strings in components!

### Creating New Pages

1. Create `/src/app/your-page/page.tsx`
2. Import siteCopy: `import siteCopy from "@/content/copy"`
3. Add page content to copy.ts
4. Use content: `{siteCopy.yourPage.headline}`

### Updating Styles

1. Use Tailwind classes exclusively
2. Custom styles go in `/src/app/globals.css`
3. Component-specific styles use Tailwind @apply
4. Dark theme colors: `dark-50` to `dark-950`

## 📊 Content Structure Map

```
copy.ts
├── meta
│   ├── siteTitle
│   ├── siteDescription
│   └── pages (SEO for each page)
├── nav (navigation items)
├── cta (call-to-action buttons)
├── home
│   ├── headline (3 lines)
│   ├── subhead
│   ├── bullets
│   └── ctaSection
├── specializations
│   ├── headline
│   ├── intro
│   └── cards (industry verticals)
├── approach
│   ├── headline
│   ├── framing
│   └── loops (methodology steps)
├── results (case studies)
├── governance (compliance content)
├── engagement (working models)
├── methods
│   ├── headline
│   ├── intro
│   └── articles (expandable content)
├── contact
│   ├── form fields
│   ├── messages
│   └── validation
├── footer
├── diagram
└── faq
```

## 🚀 Deployment Checklist

- [ ] Update all content in copy.ts
- [ ] Test all pages locally
- [ ] Configure SMTP credentials
- [ ] Test contact form
- [ ] Run `npm run build`
- [ ] Deploy /out folder to hosting
- [ ] Verify email delivery
- [ ] Check mobile responsiveness

## 📧 Email System Architecture

```
User Submits Form
       ↓
   Validation
       ↓
  Sanitization
       ↓
  Rate Limiting
       ↓
   SMTP Send
    ↙     ↘
Admin    User
Email    Confirmation
```

## 🔒 Security Measures

1. **Input Sanitization** - XSS prevention
2. **Rate Limiting** - DDoS protection  
3. **Email Validation** - Format checking
4. **No Cookies** - Privacy first
5. **Static Site** - Minimal attack surface

---

For questions or issues, refer to the main [README.md](../README.md) or check the specific documentation files above.