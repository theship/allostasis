# Allostasis AI

Marketing site for Allostasis AI - a boutique AI studio specializing in knowledge systems with high signal-to-noise focus.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit http://localhost:3000 to see the site.

## 📝 Editing Content

**All site content is in one file:** `/src/content/copy.ts`

Simply edit this file to update any text on the site - headlines, buttons, forms, footer, everything.

## 🌐 Deployment

This site is deployed on Vercel with automatic deployments from GitHub.

**Live Site:** https://allostasis.ai

### Deploying Changes

1. Commit changes to `main` branch
2. Push to GitHub: `git push origin main`
3. Vercel automatically deploys (2-3 minutes)
4. View deployment status: https://vercel.com/theships-projects/allostasis

### Environment Variables

Configure these in Vercel Dashboard (Settings → Environment Variables):
- `SMTP_HOST` - SMTP server (smtp.gmail.com)
- `SMTP_PORT` - SMTP port (587)
- `SMTP_SECURE` - Use SSL (false)
- `SMTP_USER` - Email account (info@allostasis.ai)
- `SMTP_PASS` - App password (Google Workspace app password)
- `SMTP_FROM` - Sender email (info@allostasis.ai)
- `SMTP_TO` - Recipient email (info@allostasis.ai)
- `MAX_REQUESTS_PER_HOUR` - Rate limit (10)

### Custom Domain

- Primary: https://allostasis.ai
- DNS managed in Namecheap
- A record points to Vercel
- Automatic HTTPS via Vercel

## 📚 Documentation

- [**Vercel Deployment Plan**](docs/VERCEL-DEPLOYMENT-PLAN.md) - Complete deployment guide with troubleshooting
- [**Architecture & Development**](docs/ARCHITECTURE_DEVELOPMENT.md) - Technical details, project structure, development guide
- [**Email Setup**](docs/EMAIL_SETUP.md) - Configure contact form emails
- [**All Documentation**](docs/) - Complete documentation index

## 🎨 Key Features

- Dark theme with Pantone Autumn 2025 colors
- Single-source content management (`/src/content/copy.ts`)
- Server-side contact form with direct SMTP email
- Rate limiting and input sanitization for security
- Mobile responsive with hamburger menu
- Deployed on Vercel with automatic deployments
- API routes for serverless email functionality

## 📄 License

© 2025 Allostasis AI. All rights reserved.