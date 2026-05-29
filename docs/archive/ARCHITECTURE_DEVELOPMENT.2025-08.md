> ⚠️ **SUPERSEDED (archived 2026-05-29).** This describes the pre-redo site
> (eight routes, mechanism-led "knowledge systems" positioning, Inter typography,
> GitHub Pages / static-export notes). It is kept for history only. The current
> architecture is in [`../ARCHITECTURE_DEVELOPMENT.md`](../ARCHITECTURE_DEVELOPMENT.md).

# Architecture & Development Guide (pre-redo, archived)

## 📁 Project Structure

```
allostasis/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/contact/        # Contact form API with email sending
│   │   └── [pages]/           # All site pages
│   ├── components/             # Reusable components (Navbar, Footer, etc.)
│   └── content/
│       └── copy.ts            # ⭐ SINGLE SOURCE OF TRUTH for all site content
├── public/                    # Static assets, images
├── docs/                      # Documentation
├── out/                       # Static export for deployment
└── .env.local.example         # Environment variables template
```

## 🎨 Content Management

**ALL site content is centralized in `/src/content/copy.ts`**

This single file contains:
- Navigation structure
- Page headlines and copy
- Form labels and options  
- Button text and CTAs
- Footer content
- SEO metadata
- Component text

To update any text on the site, edit `src/content/copy.ts`. No need to hunt through components!

### Content Structure in copy.ts

```typescript
{
  meta: {}           // SEO titles and descriptions
  nav: []           // Navigation items
  cta: {}           // Call-to-action buttons
  home: {}          // Homepage content
  specializations: {} // Industry verticals
  approach: {}      // Methodology page
  results: {}       // Case studies
  governance: {}    // Compliance content
  engagement: {}    // Working models
  methods: {}       // Articles/documentation
  contact: {}       // Form labels and messages
  footer: {}        // Footer text
  diagram: {}       // Process diagram labels
  faq: []          // FAQ items
}
```

## 🎨 Design System

### Colors (Pantone Autumn 2025)
- **Roast:** `#6B4C4A`
- **Vapor:** `#B8B5AE`  
- **Crown:** `#3E4A5C`
- **Winterberry:** `#C04A62` (accent)
- **Dark Scale:** `dark-50` through `dark-950`

### Typography
- **UI Text:** Inter
- **Code:** JetBrains Mono
- **Sizes:** Responsive from text-sm to 8xl

## 📧 Email Configuration

The contact form sends emails directly via SMTP (no third-party services).

See [`EMAIL_SETUP.md`](EMAIL_SETUP.md) for configuration instructions.

### Features
- Direct SMTP sending
- Dual email system (admin + user confirmation)
- Input sanitization
- Rate limiting (10 requests/hour/IP)
- No data retention by third parties

## 🚀 Deployment

### GitHub Pages Deployment

The site builds to the `/out` folder which contains all static files ready for deployment.

```bash
npm run build
# Creates static site in /out directory
```

#### Deploy to GitHub Pages:

1. **Build the site**:
   ```bash
   npm run build
   ```

2. **The `/out` folder contains your entire static site**:
   - All HTML pages
   - Optimized JavaScript/CSS
   - Images and assets
   - API routes (Note: contact form requires a server)

3. **For GitHub Pages**:
   - Option 1: Deploy the `/out` folder directly using GitHub Actions
   - Option 2: Use a `gh-pages` branch with the contents of `/out`
   - Option 3: Configure GitHub Pages to serve from a docs folder (copy `/out` contents)

4. **Important**: The contact form requires server-side processing. For static hosting:
   - Consider using a form service like Formspree or Netlify Forms
   - Or deploy to Vercel/Netlify for serverless function support

### Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

```env
# SMTP Settings (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@allostasis.ai
SMTP_TO=julee@allostasis.ai
```

## 🛠 Technical Stack

- **Framework:** Next.js 15.4.7 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v3
- **Email:** Nodemailer (direct SMTP)
- **Testing:** Playwright

## 🔧 Development

### Key Commands

```bash
npm run dev        # Start dev server on :3000
npm run build      # Build for production
npm run lint       # Run ESLint
npm test          # Run tests
```

### Making Changes

1. **Content updates:** Edit `/src/content/copy.ts`
2. **Styling:** Edit Tailwind classes or `/src/app/globals.css`
3. **New pages:** Add to `/src/app/[page-name]/page.tsx`
4. **Components:** Add to `/src/components/`

### Code Style

- TypeScript for type safety
- Tailwind for styling
- No inline styles
- All content from copy.ts
- Mobile-first responsive design

## 🔒 Security

- Input sanitization on all forms
- Rate limiting on API endpoints
- No third-party tracking
- No cookies or local storage
- Direct SMTP (no email service providers)

## 📱 Features

- ✅ Fully responsive design
- ✅ Dark theme with Pantone colors
- ✅ Mobile hamburger navigation
- ✅ Accordion-based methods section
- ✅ Contact form with dual email system
- ✅ Static export ready
- ✅ SEO optimized
- ✅ Accessibility features (ARIA labels, focus states)

## 📋 Future Enhancements

### Email System
- **Configure noreply@ group as sender**: Currently using `julee@allostasis.ai` as sender. Future work includes:
  - Setting up `noreply@allostasis.ai` group with proper send-as permissions
  - Configuring Gmail to allow sending from group alias
  - Alternative: Create dedicated user account for `noreply@` instead of group
  - This will make email communications more professional with consistent branding

## 🤝 Contributing

1. Keep all content in `/src/content/copy.ts`
2. Follow existing code patterns
3. Test on mobile and desktop
4. Ensure build passes before committing