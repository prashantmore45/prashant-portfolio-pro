const rateLimit = require('express-rate-limit');

// Rate limiters configuration
const createLimiter = (windowMs, maxRequests, message) => 
  rateLimit({
    windowMs,
    max: maxRequests,
    message: message || 'Too many requests, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.method === 'OPTIONS', // Skip OPTIONS requests
    keyGenerator: (req) => {
      // Use IP address or fallback to user agent
      return req.ip || req.headers['x-forwarded-for'] || 'unknown';
    }
  });

module.exports = {
  // General API rate limit: 100 requests per 15 minutes
  general: createLimiter(15 * 60 * 1000, 100, 'API rate limit exceeded'),
  
  // Contact form: 5 requests per hour
  contact: createLimiter(60 * 60 * 1000, 5, 'Too many contact submissions. Please try again later.'),
  
  // Authentication: 5 attempts per 15 minutes
  auth: createLimiter(15 * 60 * 1000, 5, 'Too many login attempts. Please try again later.'),
  
  // Projects endpoint: 50 requests per minute (for fetching)
  projects: createLimiter(60 * 1000, 50, 'Project endpoint rate limit exceeded'),
  
  // Health check: 30 requests per minute
  health: createLimiter(60 * 1000, 30, 'Health check rate limit exceeded')
};
