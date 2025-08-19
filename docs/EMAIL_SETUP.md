# Direct SMTP Email Configuration

The contact form sends emails directly through your SMTP server - **no third-party services storing your data**.

## Features

- ✅ **Direct SMTP sending** - connects directly to your mail server
- ✅ **Dual email system** - sends notification to admin AND confirmation to user
- ✅ **No third-party dependencies** - your data never leaves your control
- ✅ **Input sanitization** - prevents XSS attacks
- ✅ **Rate limiting** - 10 requests/hour per IP (configurable)
- ✅ **Email validation** - ensures valid format
- ✅ **Structured emails** - both HTML and plain text versions

## Quick Setup

1. **Copy the environment template**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Configure your SMTP settings** in `.env.local`

### Option A: Using Gmail (Recommended for testing)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # NOT your regular password!
SMTP_TO=julee@allostasis.ai
```

**To get Gmail app password:**
1. Enable 2-factor authentication on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Generate a new app password for "Mail"
4. Use the 16-character password in SMTP_PASS

### Option B: Using Your Own Mail Server
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-password
SMTP_TO=julee@allostasis.ai
```

### Option C: Using Office 365/Outlook
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
SMTP_TO=julee@allostasis.ai
```

3. **Test the configuration**
   - Restart dev server: `npm run dev`
   - Submit a test form at http://localhost:3000/contact
   - Check the recipient email

## Security Features

### No Third-Party Services
- Emails sent directly via SMTP
- No external APIs or services
- Your data never touches third-party servers
- Complete control over email routing

### Input Sanitization
- Removes HTML/script tags
- Strips JavaScript protocols
- Removes event handlers
- Limits input to 1000 characters
- Validates email format

### Rate Limiting
- Default: 10 requests per hour per IP
- In-memory tracking (no database needed)
- Returns 429 with Retry-After header
- Configurable via MAX_REQUESTS_PER_HOUR

## How It Works

1. User submits form 
2. API validates & sanitizes input
3. Direct SMTP connection established
4. Two emails sent:
   - **Admin notification** to julee@allostasis.ai with full details
   - **User confirmation** to submitter with their submission summary
5. Success response to user

No intermediaries, no data retention by third parties.

## Testing Without SMTP

If you don't have SMTP configured yet:
1. Leave SMTP settings blank in `.env.local`
2. Form submissions will log to console
3. The form still shows success to users

## Production Deployment

1. **Use environment variables** in your hosting platform
   - Don't commit `.env.local` to git
   - Set SMTP credentials securely in production

2. **Use a dedicated email account** for sending
   - Don't use personal email credentials
   - Create a specific account for the application

3. **Monitor failed sends**
   - Check server logs for SMTP errors
   - Consider implementing a retry queue

## Troubleshooting

**Emails not sending?**
- Verify SMTP credentials are correct
- Check firewall allows outbound SMTP (ports 25/465/587)
- For Gmail: ensure using app password, not regular password
- Check spam folder

**Connection refused?**
- Verify SMTP_HOST and SMTP_PORT
- Some hosts block outbound SMTP - check with your provider

**Authentication failed?**
- Double-check username/password
- Gmail/Outlook may need app-specific passwords
- Some servers require full email as username

## Privacy & Compliance

This implementation:
- Sends directly to your SMTP server
- No third-party services involved
- No data retention outside your control
- Suitable for GDPR/privacy-conscious deployments
- IP addresses logged only for rate limiting (in memory, not persisted)