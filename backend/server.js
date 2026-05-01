const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization'] 
}));

app.use(express.json());

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