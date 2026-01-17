const express = require("express");
const router = express.Router();
const Project = require("../models/Project"); // Import the new model

// GET /api/projects
// Public Route - Fetch all projects
router.get("/", async (req, res) => {
  try {
    // Fetch from DB and sort by newest first
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;