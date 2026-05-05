const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();

const app = express();

// Security & Performance Middleware (order matters!)
app.use(helmet()); // Add security headers
app.use(compression()); // Gzip compression middleware
app.use(mongoSanitize()); // Prevent NoSQL injection attacks

// Optimized CORS configuration
const isDevelopment = process.env.NODE_ENV !== 'production';
const productionFrontendUrl = process.env.FRONTEND_URL || 'https://prashant-portfolio-pro.vercel.app';

const allowedOrigins = isDevelopment
  ? ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'] // Dev: accept all common local ports
  : productionFrontendUrl.split(',').map(url => url.trim()); // Production: use environment variable (can be comma-separated)

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (isDevelopment || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      console.warn(`Allowed origins: ${allowedOrigins.join(', ')}`);
      callback(new Error('CORS not allowed'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization'],
  credentials: true,
  maxAge: 86400 // Pre-flight request cache: 24 hours
}));

// Request body size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Cache Control Headers for different types of requests
app.use((req, res, next) => {
  if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|webp|svg)$/)) {
    // Static assets: 1 year cache (immutable)
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (req.method === 'GET' && req.path.includes('/api/')) {
    // API responses: 5 minutes cache
    res.setHeader('Cache-Control', 'public, max-age=300');
  } else if (req.method === 'GET') {
    // HTML: 1 hour cache
    res.setHeader('Cache-Control', 'public, max-age=3600');
  }
  next();
});

// Health Check Endpoint - Prevents Render and MongoDB sleep
app.get('/api/health', async (req, res) => {
  try {
    // Ping MongoDB to keep it warm
    await mongoose.connection.db.admin().ping();
    
    res.status(200).json({ 
      status: 'Server is active',
      database: 'Connected',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (dbError) {
    // Attempt to reconnect if connection failed
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB reconnected via health check');
    } catch (err) {
      console.warn('Database reconnection attempt during health check:', err.message);
    }
    
    res.status(200).json({ 
      status: 'Server is active',
      database: 'Reconnecting...',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  }
});

// Rate limiters
const rateLimiters = require('./middleware/rateLimiter');

// Apply rate limiting
app.use('/api/', rateLimiters.general);
app.use('/api/health', rateLimiters.health);
app.use('/api/contact', rateLimiters.contact);
app.use('/api/admin', rateLimiters.auth);
app.use('/api/projects', rateLimiters.projects);

// Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/admin', require('./routes/admin'));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));