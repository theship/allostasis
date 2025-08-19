# Google Workspace Email Setup for Allostasis

Since you have Google Workspace for the allostasis.ai domain, you should use that for sending emails - much more professional!

## Setup for Google Workspace (allostasis.ai domain)

### Step 1: Create an App Password in Your Workspace Account

1. **Sign in to your Google Workspace account**
   - Use your `julee@allostasis.ai` account (or whichever account you want to send from)
   - Go to https://myaccount.google.com

2. **Enable 2-Step Verification** (if not already enabled)
   - Go to Security → 2-Step Verification
   - Follow the setup process

3. **Generate an App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" from the dropdown
   - Select "Other (Custom name)" and enter "Allostasis Website"
   - Click "Generate"
   - **Copy the 16-character password** (you won't see it again!)

### Step 2: Configure Your .env.local

```env
# Google Workspace SMTP Settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# Use your Allostasis Google Workspace account
SMTP_USER=julee@allostasis.ai
SMTP_PASS=your-16-character-app-password

# Professional email addresses
SMTP_FROM=noreply@allostasis.ai
SMTP_TO=julee@allostasis.ai
```

### Step 3: Optional - Create a Dedicated Sending Account

For better organization, you might want to create a dedicated account for automated emails:

1. **In Google Admin Console** (admin.google.com):
   - Create a new user like `noreply@allostasis.ai` or `system@allostasis.ai`
   - Give it a license (or use a service account)
   
2. **Set up app password for that account**:
   - Sign in as `noreply@allostasis.ai`
   - Enable 2FA and generate app password
   - Use those credentials in SMTP_USER and SMTP_PASS

### Benefits of Using Google Workspace

- ✅ **Professional sender**: Emails come from @allostasis.ai
- ✅ **Better deliverability**: Your domain, not personal Gmail
- ✅ **SPF/DKIM already configured**: If you've set up Google Workspace properly
- ✅ **Unified inbox**: All emails in your business account
- ✅ **Audit trail**: Google Workspace admin can see sent emails

### Test Your Configuration

1. **Restart the dev server**:
   ```bash
   npm run dev
   ```

2. **Submit a test form** at http://localhost:3000/contact

3. **Check both inboxes**:
   - Admin notification arrives at `julee@allostasis.ai`
   - User confirmation sent to the email they provided
   - Both emails show as from your domain

### Troubleshooting

**"Less secure app access" error?**
- App passwords bypass this - that's why we use them
- Make sure 2FA is enabled

**Authentication failed?**
- Double-check you're using the app password, not your regular password
- Ensure the account has permission to send email
- Check if your Workspace admin has restricted SMTP access

**Emails going to spam?**
- Make sure SPF/DKIM are configured for your domain
- Check Google Workspace admin console for domain verification

### Production Notes

For production deployment:
- Store credentials in environment variables (Vercel, Netlify, etc.)
- Consider Google Workspace sending limits (2,000/day for regular accounts)
- Monitor bounce rates in Google Workspace admin console

### Alternative: Use Google Workspace APIs

For higher volume or more control, consider using:
- Google Workspace Gmail API (more complex setup)
- Google Cloud Platform with service accounts
- Third-party services that integrate with Workspace

But for your current needs, SMTP with app password is perfect!