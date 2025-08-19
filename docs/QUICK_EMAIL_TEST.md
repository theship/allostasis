# Quick Email Testing Guide

Right now, emails are only being logged to the console because SMTP isn't configured. Here's how to actually send emails:

## Option 1: Use Gmail (Fastest for Testing)

1. **Enable 2-factor authentication** on your Gmail account
   - Go to https://myaccount.google.com/security
   - Turn on 2-Step Verification

2. **Generate an app password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Copy the 16-character password

3. **Create `.env.local` file** in project root:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your.email@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM=your.email@gmail.com
SMTP_TO=julee@allostasis.ai
```

4. **Restart the dev server**
```bash
npm run dev
```

5. **Test the form**
   - Submit a form at http://localhost:3000/contact
   - You'll receive a confirmation email at the address you provide
   - Admin notification goes to julee@allostasis.ai

## Option 2: Use a Test Email Service

For testing without using your personal email:

### Mailtrap (Free tier available)
1. Sign up at https://mailtrap.io
2. Get SMTP credentials from your inbox settings
3. Configure `.env.local`:
```env
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-username
SMTP_PASS=your-mailtrap-password
SMTP_FROM=noreply@allostasis.ai
SMTP_TO=julee@allostasis.ai
```

Mailtrap captures all emails in a test inbox - they don't actually get delivered, but you can see them in the Mailtrap dashboard.

## What Happens When Configured

When SMTP is properly configured:

1. **User submits form**
2. **Two emails are sent:**
   - **To Admin (julee@allostasis.ai):**
     - Subject: "Architecture Intro Request from [Name]"
     - Contains full form details and JSON data
     - Reply-to set to user's email
   
   - **To User (their email):**
     - From: noreply@allostasis.ai
     - Subject: "Thank you for your interest in Allostasis AI"
     - Contains submission summary and confirmation
     - Professional HTML template

## Current Status (No SMTP)

Without SMTP configured, when you submit the form:
- ✅ Form validates and sanitizes input
- ✅ Rate limiting works
- ✅ Success message shows to user
- ⚠️ Emails are logged to console only (check terminal)
- ❌ No actual emails are sent

## Security Note

- Never commit `.env.local` to git
- Use app-specific passwords, not your real email password
- In production, use environment variables from your hosting platform