import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { checkRateLimit } from './rate-limit';

// Helper function to sanitize input
function sanitizeInput(input: string): string {
  // Remove any potential XSS attempts
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 1000); // Limit length
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Create reusable transporter object using SMTP
function createTransporter() {
  // Direct SMTP configuration - no third party service
  // You can use your own SMTP server or your email provider's SMTP
  
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Optional: increase security
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production'
      }
    });
  }
  
  // Fallback for development - just log
  return null;
}

export async function POST(request: Request) {
  try {
    // Check rate limit
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    const { allowed, retryAfter } = checkRateLimit(ip);
    
    if (!allowed) {
      return NextResponse.json(
        { error: `Too many requests. Please try again in ${retryAfter} seconds.` },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'company', 'challenge'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Sanitize all input fields
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email), 
      company: sanitizeInput(body.company),
      role: sanitizeInput(body.role || ''),
      challenge: sanitizeInput(body.challenge),
      timeline: sanitizeInput(body.timeline || ''),
      budget: sanitizeInput(body.budget || ''),
      details: sanitizeInput(body.details || ''),
      submittedAt: new Date().toISOString(),
      source: 'Architecture Intro Form',
      ip: ip
    };

    // Send email directly via SMTP
    const transporter = createTransporter();
    
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'noreply@allostasis.ai',
          to: process.env.SMTP_TO || 'julee@allostasis.ai',
          replyTo: sanitizedData.email,
          subject: `Architecture Intro Request from ${sanitizedData.name}`,
          text: `New Architecture Intro Request

CONTACT INFORMATION
Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Company: ${sanitizedData.company}
Role: ${sanitizedData.role || 'Not specified'}

PROJECT DETAILS
Challenge: ${sanitizedData.challenge}
Timeline: ${sanitizedData.timeline || 'Not specified'}
Budget: ${sanitizedData.budget || 'Not specified'}

ADDITIONAL DETAILS
${sanitizedData.details || 'No additional details provided'}

METADATA
Submitted: ${sanitizedData.submittedAt}
IP Address: ${sanitizedData.ip}
Source: ${sanitizedData.source}

---
RAW JSON DATA
${JSON.stringify(sanitizedData, null, 2)}`,
          html: `
            <h2>New Architecture Intro Request</h2>
            <h3>Contact Information</h3>
            <ul>
              <li><strong>Name:</strong> ${sanitizedData.name}</li>
              <li><strong>Email:</strong> ${sanitizedData.email}</li>
              <li><strong>Company:</strong> ${sanitizedData.company}</li>
              <li><strong>Role:</strong> ${sanitizedData.role || 'Not specified'}</li>
            </ul>
            
            <h3>Project Details</h3>
            <ul>
              <li><strong>Challenge:</strong> ${sanitizedData.challenge}</li>
              <li><strong>Timeline:</strong> ${sanitizedData.timeline || 'Not specified'}</li>
              <li><strong>Budget:</strong> ${sanitizedData.budget || 'Not specified'}</li>
            </ul>
            
            <h3>Additional Details</h3>
            <p>${sanitizedData.details || 'No additional details provided'}</p>
            
            <h3>Metadata</h3>
            <ul>
              <li><strong>Submitted:</strong> ${sanitizedData.submittedAt}</li>
              <li><strong>IP Address:</strong> ${sanitizedData.ip}</li>
              <li><strong>Source:</strong> ${sanitizedData.source}</li>
            </ul>
            
            <hr>
            <h3>Raw JSON Data</h3>
            <pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;">
${JSON.stringify(sanitizedData, null, 2)}
            </pre>
          `
        });
        
        // Send confirmation email to the submitter
        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'noreply@allostasis.ai',
          to: sanitizedData.email,
          subject: 'Thank you for your interest in Allostasis AI',
          text: `Dear ${sanitizedData.name},

Thank you for submitting your architecture intro request. We've received your information and will review it carefully.

Here's a summary of what you submitted:

Company: ${sanitizedData.company}
Role: ${sanitizedData.role || 'Not specified'}
Challenge: ${sanitizedData.challenge}
Timeline: ${sanitizedData.timeline || 'Not specified'}
Budget: ${sanitizedData.budget || 'Not specified'}

Project Details:
${sanitizedData.details || 'No additional details provided'}

We typically respond within 24-48 hours. If your request is urgent, please don't hesitate to follow up.

Best regards,
The Allostasis AI Team

---
This is an automated confirmation. Your data is handled securely and will only be used to respond to your inquiry.`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1a1a1a;">Thank you for your interest in Allostasis AI</h2>
              
              <p>Dear ${sanitizedData.name},</p>
              
              <p>Thank you for submitting your architecture intro request. We've received your information and will review it carefully.</p>
              
              <h3 style="color: #C04A62; margin-top: 30px;">Your Submission Summary</h3>
              
              <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Company:</strong> ${sanitizedData.company}</p>
                <p><strong>Role:</strong> ${sanitizedData.role || 'Not specified'}</p>
                <p><strong>Challenge:</strong> ${sanitizedData.challenge}</p>
                <p><strong>Timeline:</strong> ${sanitizedData.timeline || 'Not specified'}</p>
                <p><strong>Budget:</strong> ${sanitizedData.budget || 'Not specified'}</p>
                
                <p style="margin-top: 15px;"><strong>Project Details:</strong><br>
                ${sanitizedData.details || 'No additional details provided'}</p>
              </div>
              
              <p>We typically respond within 24-48 hours. If your request is urgent, please don't hesitate to follow up.</p>
              
              <p style="margin-top: 30px;">Best regards,<br>
              <strong>The Allostasis AI Team</strong></p>
              
              <hr style="margin-top: 40px; border: none; border-top: 1px solid #e0e0e0;">
              
              <p style="font-size: 12px; color: #666; margin-top: 20px;">
                This is an automated confirmation. Your data is handled securely and will only be used to respond to your inquiry.
              </p>
            </div>
          `
        });
        
        console.log('Emails sent successfully via SMTP (admin + confirmation)');
      } catch (emailError) {
        console.error('SMTP email sending failed:', emailError);
        // Don't fail the request if email fails - you might want to queue it for retry
      }
    } else {
      // Log for development when no SMTP is configured
      console.log('Emails would be sent (no SMTP configured):');
      console.log('1. Admin notification to:', process.env.SMTP_TO || 'julee@allostasis.ai');
      console.log('2. Confirmation email to:', sanitizedData.email);
      console.log('Form data:', sanitizedData);
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Your request has been submitted successfully. We will contact you soon.',
      emailSent: !!process.env.SMTP_HOST, // Indicates if emails were actually sent
      // Don't return sensitive data in production
      data: process.env.NODE_ENV === 'development' ? sanitizedData : undefined
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}