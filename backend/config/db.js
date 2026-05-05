const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 20,              // Increased connection pool
      minPoolSize: 10,              // Keep more connections ready
      socketTimeoutMS: 45000,       // Socket timeout
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      w: 'majority',
      waitQueueTimeoutMS: 10000,    // Queue timeout for connection requests
      family: 4,                    // IPv4 only (better performance)
      appName: 'prashant-portfolio' // Identify app in MongoDB
    });
    console.log("MongoDB Connected Successfully with Connection Pooling");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
