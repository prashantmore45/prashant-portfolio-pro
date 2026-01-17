const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load Config
dotenv.config();         
connectDB();   
       
const app = express();

// Middleware
app.use(cors({
  // We will add your NEW Vercel/Netlify URL here later. 
  // For now, allow all or keep your current github io
  origin: "*" 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/projects", require("./routes/projects"));
app.use("/api/admin", require("./routes/admin")); // Renamed for clarity
app.use("/api/contact", require("./routes/contact"));

// Note: I removed the static /admin route. 
// We will build the admin UI in React.

app.get("/", (req, res) => {
  res.json({ status: "API is running. Database is Connected." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));