// Simple in-memory rate limiter (for production, use Redis or similar)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const maxRequests = parseInt(process.env.MAX_REQUESTS_PER_HOUR || '10');
  const windowMs = 60 * 60 * 1000; // 1 hour
  
  const key = `contact_${ip}`;
  const record = requestCounts.get(key);
  
  // Clean up old entries
  for (const [k, v] of requestCounts.entries()) {
    if (v.resetTime < now) {
      requestCounts.delete(k);
    }
  }
  
  if (!record || record.resetTime < now) {
    // First request or window expired
    requestCounts.set(key, {
      count: 1,
      resetTime: now + windowMs
    });
    return { allowed: true };
  }
  
  if (record.count >= maxRequests) {
    // Rate limit exceeded
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }
  
  // Increment count
  record.count++;
  return { allowed: true };
}