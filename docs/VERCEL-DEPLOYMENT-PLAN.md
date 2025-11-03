# VERCEL DEPLOYMENT PLAN - Allostasis AI

**Repository:** https://github.com/theship/allostasis
**Vercel Deployment:** https://allostasis-psi.vercel.app/
**Custom Domain:** https://allostasis.ai

**Status:** Phases 1 & 3 Complete - Currently on Phase 5 (Domain Configuration)

---

## Migration Overview

Migrating Allostasis AI website from Namecheap static FTP hosting to Vercel for full Next.js support including API routes for contact form email functionality.

**Current Problem:** Site uses `output: 'export'` which creates static HTML only - API routes don't work. The contact form shows success but emails never send because `/api/contact` doesn't exist in the static build.

**Solution:** Deploy to Vercel with server-side rendering enabled, allowing API routes to function properly.

---

## PHASE 1: PRE-FLIGHT CHECKS ✅ COMPLETED

### Task 1.1: Verify Current Git Status ✅ DONE
**Location:** Terminal
**Commands:**
```bash
cd /Users/julee/GitHub/allostasis
git status
git log --oneline -5
```
**Goal:** Confirm code is committed to Git repository
**Status:** ✅ Code committed and pushed to GitHub

---

### Task 1.2: Check GitHub Repository Exists ✅ DONE
**Location:** Browser
**URL:** https://github.com/theship/allostasis
**Goal:** Verify repository exists and is up to date
**Status:** ✅ Repository exists and synced

---

### Task 1.3: Test Local Development Server ✅ DONE
**Location:** Terminal
**Commands:**
```bash
npm run dev
# Open browser to http://localhost:3000/contact
# Fill out form and test
```
**Goal:** Verify contact form works locally before deployment
**Expected:** Emails should arrive at info@allostasis.ai
**Status:** ✅ Local testing confirmed working

---

## PHASE 2: CODE PREPARATION

### Task 2.1: Update next.config.ts
**Location:** Code editor
**File:** `/Users/julee/GitHub/allostasis/next.config.ts`
**Change:** Remove or comment out `output: 'export'` line if it exists
**Current state:** File shows minimal config, may not need changes
**Goal:** Ensure Next.js uses server-side rendering mode (not static export)
**Status:** ⏸️ PENDING - Need to verify

---

### Task 2.2: Verify .gitignore Includes Sensitive Files
**Location:** Code editor
**File:** `/Users/julee/GitHub/allostasis/.gitignore`
**Ensure these lines exist:**
```
.env*.local
.env
.vercel
node_modules/
.next/
out/
```
**Goal:** Don't commit secrets or build artifacts to Git
**Status:** ⏸️ PENDING - Need to verify

---

### Task 2.3: Archive Deployment Scripts ✅ COMPLETED
**Location:** Terminal/Code editor
**Files:** `deploy.sh`, `deploy-verbose.sh`
**Action:** Archive them to ./archive/
**Command:**
```bash
mkdir archive && mv deploy*.sh archive/
```
**Status:** ✅ DONE - Scripts archived to ./archive/

---

### Task 2.4: Commit All Changes
**Location:** Terminal
**Commands:**
```bash
git add .
git commit -m "Archive FTP deployment scripts, prepare for Vercel"
git push origin main
```
**Goal:** Ensure all code changes are in GitHub
**Status:** ⏸️ PENDING - Need to commit archive changes

---

## PHASE 3: VERCEL ACCOUNT & PROJECT SETUP ✅ COMPLETED

### Task 3.1: Create Vercel Account ✅ DONE
**Location:** Browser
**URL:** https://vercel.com/signup
**Steps:**
1. Click "Continue with GitHub" (recommended for easy integration)
2. Authorize Vercel to access your GitHub account
3. Complete account setup
**Goal:** Have active Vercel account linked to GitHub
**Status:** ✅ Account created and linked

---

### Task 3.2: Import GitHub Repository ✅ DONE
**Location:** Browser (Vercel Dashboard)
**Steps:**
1. After login, click "Import Project" or "New Project"
2. Click "Import Project"
3. If asked, authorize Vercel to access repositories:
   - From Profile icon, select Settings > Applications > Vercel
   - Or visit: https://github.com/settings/installations
   - Grant access to theship/allostasis repository
4. Find `allostasis` repository in list
5. Click "Import" next to it
**Goal:** Connect GitHub repo to Vercel project
**Status:** ✅ Repository imported

---

### Task 3.3: Configure Build Settings ✅ DONE
**Location:** Browser (Vercel import wizard)
**Settings:**
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** ./ (default)
- **Build Command:** `npm run build` (auto-filled)
- **Output Directory:** .next (auto-filled)
- **Install Command:** `npm install` (auto-filled)

**Do NOT deploy yet** - Continue to environment variables
**Goal:** Proper build configuration
**Status:** ✅ Build settings configured

---

### Task 3.4: Add Environment Variables ✅ DONE
**Location:** Browser (Vercel project settings, during import or after)
**Navigate to:** Environment Variables section during import setup

**Added variables:**

| Key | Value | Environment |
|-----|-------|-------------|
| `SMTP_HOST` | `smtp.gmail.com` | Production, Preview, Development |
| `SMTP_PORT` | `587` | Production, Preview, Development |
| `SMTP_SECURE` | `false` | Production, Preview, Development |
| `SMTP_USER` | `info@allostasis.ai` | Production, Preview, Development |
| `SMTP_PASS` | `opzv drri dgbb hyma` | Production, Preview, Development |
| `SMTP_FROM` | `info@allostasis.ai` | Production, Preview, Development |
| `SMTP_TO` | `info@allostasis.ai` | Production, Preview, Development |
| `MAX_REQUESTS_PER_HOUR` | `10` | Production, Preview, Development |

**Important:** All environment variables configured for all three environments
**Goal:** Configure SMTP settings for email functionality
**Status:** ✅ All environment variables configured

---

### Task 3.5: Deploy to Vercel ✅ DONE
**Location:** Browser (Vercel dashboard)
**Steps:**
1. After adding environment variables, click "Deploy"
2. Wait for build process (1-3 minutes)
3. Watch build logs for any errors
4. Wait for "Deployment Ready" message

**Deployment URL:** https://allostasis-psi.vercel.app/

**Expected outcome:** Deployment succeeds
**Goal:** First successful deployment to Vercel
**Status:** ✅ Successfully deployed to Vercel

---

## PHASE 4: INITIAL TESTING

### Task 4.1: Test Deployed Site
**Location:** Browser
**URL:** https://allostasis-psi.vercel.app/
**Steps:**
1. Visit the URL
2. Navigate to `/contact` page
3. Fill out contact form with your real email
4. Submit form
5. Watch for success message

**Goal:** Verify site loads and form submits
**Status:** ⏸️ PENDING - Need to test

---

### Task 4.2: Verify Email Delivery
**Location:** Email inbox
**Check two inboxes:**
1. `info@allostasis.ai` - Should receive admin notification
2. Your test email - Should receive confirmation email

**Timeline:** Emails should arrive within 1-2 minutes

**If emails don't arrive:** Check Vercel function logs
**Goal:** Confirm email functionality works on Vercel
**Status:** ⏸️ PENDING - Need to verify

---

## PHASE 5: CUSTOM DOMAIN SETUP

### Task 5.1: Add Custom Domain in Vercel
**Location:** Browser (Vercel Dashboard)
**Navigate to:**
1. Your project → Settings → Domains
2. Or Project Overview → "View Domains"

**Steps:**
1. Click "Add Domain"
2. Enter: `allostasis.ai`
3. Click "Add"
4. Vercel will show DNS configuration instructions
5. **Important:** Take note of the A record and CNAME values shown

**Typical values Vercel provides:**
```
A Record:
  Name: @
  Value: 76.76.21.21 (or similar Vercel IP)

CNAME Record:
  Name: www
  Value: cname.vercel-dns.com
```

**Goal:** Register your custom domain with Vercel
**Status:** ⏸️ PENDING - Need to configure

---

### Task 5.2: Add www Subdomain
**Location:** Browser (Vercel Dashboard, same Domains page)
**Steps:**
1. Click "Add Domain" again
2. Enter: `www.allostasis.ai`
3. Click "Add"
4. Vercel will show CNAME configuration

**Goal:** Support both apex and www versions
**Status:** ⏸️ PENDING - Need to configure

---

### Task 5.3: Update DNS Records in Namecheap
**Location:** Browser (Namecheap Dashboard)
**Navigate to:**
1. Go to https://www.namecheap.com/
2. Sign in
3. Domain List → allostasis.ai → Manage
4. Advanced DNS tab

**Current A Record (find and UPDATE):**
- Type: A Record
- Host: `@`
- Value: [old Namecheap IP]
- TTL: Automatic

**Change to:**
- Type: A Record
- Host: `@`
- Value: `76.76.21.21` (use the exact IP Vercel gave you)
- TTL: Automatic or 300 (5 minutes)

**Current CNAME Record (find and UPDATE):**
- Type: CNAME Record
- Host: `www`
- Value: [old Namecheap value]
- TTL: Automatic

**Change to:**
- Type: CNAME Record
- Host: `www`
- Value: `cname.vercel-dns.com` (use exact value Vercel gave you)
- TTL: Automatic or 300

**DO NOT TOUCH:**
- ✅ MX Records (Google Workspace mail)
- ✅ TXT Record: `google._domainkey` (DKIM)
- ✅ TXT Record: SPF (`v=spf1...`)
- ✅ TXT Record: DMARC (`v=DMARC1...`)
- ✅ Any other email-related records

**Goal:** Point domain to Vercel servers
**Status:** ⏸️ PENDING - Need to update DNS

---

### Task 5.4: Wait for DNS Propagation
**Location:** Terminal or online tool
**Time:** 5 minutes - 48 hours (usually 15-30 minutes)

**Check propagation:**
```bash
dig allostasis.ai A
# Should show Vercel IP

dig www.allostasis.ai CNAME
# Should show cname.vercel-dns.com
```

**Or use online tool:**
https://www.whatsmydns.net/
- Enter: `allostasis.ai`
- Type: A
- Should see Vercel IP propagating globally

**Goal:** DNS changes propagate globally
**Status:** ⏸️ PENDING - Will need to wait

---

### Task 5.5: Verify Domain in Vercel
**Location:** Browser (Vercel Dashboard)
**Navigate to:** Project → Settings → Domains

**Check status:**
- `allostasis.ai` should show "Valid Configuration" ✅
- `www.allostasis.ai` should show "Valid Configuration" ✅

**If still pending:** DNS hasn't propagated yet, wait longer

**Goal:** Vercel confirms domain ownership
**Status:** ⏸️ PENDING - After DNS propagation

---

## PHASE 6: PRODUCTION TESTING

### Task 6.1: Test Custom Domain Site
**Location:** Browser
**URLs to test:**
- https://allostasis.ai
- https://www.allostasis.ai
- https://allostasis.ai/contact
- https://allostasis.ai/approach
- https://allostasis.ai/engagement
- https://allostasis.ai/governance

**Check:**
- ✅ HTTPS works (should be automatic)
- ✅ All pages load correctly
- ✅ Images display
- ✅ Styling looks correct
- ✅ No console errors

**Goal:** Verify site fully functional on custom domain
**Status:** ⏸️ PENDING - After DNS propagation

---

### Task 6.2: Test Production Contact Form
**Location:** Browser
**URL:** https://allostasis.ai/contact

**Steps:**
1. Fill out contact form completely
2. Use your real email address
3. Submit form
4. Verify success message appears
5. Check `info@allostasis.ai` inbox for admin notification
6. Check your email for confirmation

**Timeline:** Both emails should arrive within 1-2 minutes

**Goal:** Confirm email functionality works on production domain
**Status:** ⏸️ PENDING - After DNS propagation

---

### Task 6.3: Test from Different Locations/Devices
**Location:** Multiple devices (optional but recommended)

**Test on:**
- Desktop browser (already done)
- Mobile phone
- Tablet (if available)
- Different browsers (Chrome, Safari, Firefox)

**Goal:** Verify responsive design and cross-browser compatibility
**Status:** ⏸️ PENDING - Optional enhancement

---

## PHASE 7: CLEANUP & DOCUMENTATION

### Task 7.1: Update README or Documentation
**Location:** Code editor
**File:** `/Users/julee/GitHub/allostasis/README.md`

**Add deployment section:**
```markdown
## Deployment

This site is deployed on Vercel.

### Deploying Changes
1. Commit changes to `main` branch
2. Push to GitHub: `git push origin main`
3. Vercel automatically deploys (2-3 minutes)
4. View deployment status: https://vercel.com/theship/allostasis

### Environment Variables
Configure these in Vercel dashboard (Settings → Environment Variables):
- SMTP_HOST
- SMTP_PORT
- SMTP_SECURE
- SMTP_USER
- SMTP_PASS
- SMTP_FROM
- SMTP_TO
- MAX_REQUESTS_PER_HOUR

### Custom Domain
- Primary: https://allostasis.ai
- DNS managed in Namecheap
- A record points to Vercel
```

**Goal:** Document deployment process for future reference
**Status:** ⏸️ PENDING

---

### Task 7.2: Clean Up Archived Scripts
**Location:** Terminal

**Already completed:**
```bash
# Archived to ./archive/
deploy.sh → ./archive/deploy.sh
deploy-verbose.sh → ./archive/deploy-verbose.sh
```

**Future cleanup (after 30 days):**
```bash
rm -rf archive/
```

**Goal:** Clean up obsolete files
**Status:** ✅ Archived (can delete after 30 days)

---

### Task 7.3: Update .env.local.example
**Location:** Code editor
**File:** `/Users/julee/GitHub/allostasis/.env.local.example`

**Add note at top:**
```bash
# Local Development Environment Variables
# Copy this file to .env.local and fill in actual values
#
# For production, configure these in Vercel Dashboard:
# Project Settings → Environment Variables

[rest of file...]
```

**Goal:** Clarify where production environment variables are configured
**Status:** ⏸️ PENDING

---

### Task 7.4: Monitor Vercel Deployment
**Location:** Browser (Vercel Dashboard)
**Navigate to:** Project Overview

**Set up monitoring (optional):**
1. Enable deployment notifications (Settings → Notifications)
2. Add your email for deployment alerts
3. Enable GitHub integration notifications

**Goal:** Stay informed of deployment status
**Status:** ⏸️ PENDING - Optional

---

## PHASE 8: OPTIONAL ENHANCEMENTS (Future)

### Task 8.1: Set Up Preview Deployments
**Already automatic!** Vercel creates preview deployments for:
- Pull requests
- Non-main branches

**Access:** Each PR gets a unique URL for testing

---

### Task 8.2: Configure Analytics (Optional)
**Location:** Vercel Dashboard → Analytics
**Steps:**
1. Enable Vercel Analytics
2. Add analytics snippet if needed (may be automatic)

**Cost:** Free tier included

---

### Task 8.3: Set Up Custom Error Pages (Optional)
**Future enhancement:** Create custom 404/500 pages

---

## PHASE 9: ROLLBACK PLAN (If Needed)

### If Something Goes Wrong

**Option A: Revert DNS (Quick Fix)**
**Time:** 5 minutes
**Steps:**
1. Go to Namecheap DNS settings
2. Change A record back to old Namecheap IP
3. Change CNAME back to old value
4. Wait for DNS propagation (15-30 min)
5. Site back on Namecheap (but form still broken due to static export)

**Option B: Fix Issues on Vercel**
**Check Vercel function logs:**
1. Vercel Dashboard → Project → Deployments
2. Click latest deployment
3. Go to Functions tab
4. Click on `/api/contact` function
5. View logs for errors

**Common issues:**
- Missing environment variables → Add in Settings
- Build errors → Check build logs
- SMTP errors → Verify credentials

---

## SUMMARY CHECKLIST

### Completed Tasks:
- [x] Phase 1: Pre-flight checks (1.1-1.3)
- [x] Phase 3: Vercel account & project setup (3.1-3.5)
- [x] Archived deployment scripts to ./archive/

### Remaining Tasks:
- [ ] Task 2.1: Verify next.config.ts configuration
- [ ] Task 2.2: Verify .gitignore
- [ ] Task 2.4: Commit archive changes
- [ ] Task 4.1-4.2: Test Vercel deployment
- [ ] Task 5.1-5.5: Configure custom domain & DNS
- [ ] Task 6.1-6.3: Production testing
- [ ] Task 7.1-7.4: Documentation & cleanup

---

## WHAT STAYS, WHAT GOES

### KEEP (No changes):
✅ `.env.local` (for local development)
✅ `src/app/api/contact/route.ts` (API route)
✅ Email DKIM configuration (in Namecheap DNS)
✅ Google Workspace email
✅ MX/SPF/DMARC DNS records
✅ Namecheap domain registration
✅ GitHub repository

### ARCHIVED:
📦 `deploy.sh` → `./archive/deploy.sh`
📦 `deploy-verbose.sh` → `./archive/deploy-verbose.sh`
(Can delete after 30 days)

### CHANGES LOCATION:
🔄 Website hosting: Namecheap → Vercel
🔄 Environment variables (production): .env.local → Vercel Dashboard
🔄 DNS A/CNAME records: Namecheap server → Vercel servers
🔄 Deployment method: Manual FTP → Automatic git push

### NO CHANGE:
➡️ Email hosting: Google Workspace (unchanged)
➡️ Email authentication: DKIM/SPF (unchanged)
➡️ Domain registrar: Namecheap (unchanged)
➡️ Code: Same Next.js app (minor config changes)

---

## TIMELINE ESTIMATE

| Phase | Time | Status |
|-------|------|--------|
| 1. Pre-flight | 5 min | ✅ DONE |
| 2. Code prep | 10 min | ⏸️ In Progress |
| 3. Vercel setup | 10 min | ✅ DONE |
| 4. Initial test | 5 min | ⏸️ Pending |
| 5. Domain setup | 15 min | ⏸️ Pending |
| 6. Production test | 10 min | ⏸️ Pending |
| 7. Cleanup | 10 min | ⏸️ Pending |
| 8. Enhancements | Variable | ⏸️ Future |

**Total essential time:** ~55 minutes
**Time remaining:** ~40 minutes

---

## NEXT IMMEDIATE STEPS

1. ✅ Archive deployment scripts → COMPLETE
2. ⏸️ Verify next.config.ts configuration
3. ⏸️ Commit changes to Git
4. ⏸️ Test Vercel deployment at https://allostasis-psi.vercel.app/
5. ⏸️ Configure custom domain in Vercel
6. ⏸️ Update Namecheap DNS records
7. ⏸️ Test production site at https://allostasis.ai

---

## SUPPORT & TROUBLESHOOTING

**Vercel Documentation:** https://vercel.com/docs
**Next.js Documentation:** https://nextjs.org/docs
**DNS Propagation Checker:** https://www.whatsmydns.net/

**Common Issues:**
- Email not sending → Check Vercel function logs
- Build failures → Review build logs in Vercel dashboard
- DNS not propagating → Wait 24-48 hours, use low TTL values
- Environment variables missing → Add in Vercel Settings

---

**Last Updated:** November 3, 2025
**Deployment Status:** In Progress - Phase 5 (Domain Configuration)
