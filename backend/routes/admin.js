const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Contact = require("../models/Contact");
const Project = require("../models/Project"); 


const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
const JWT_SECRET = process.env.JWT_SECRET;

function adminAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ ok: false, msg: "No token" });

  const parts = auth.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ ok: false });

  try {
    const decoded = jwt.verify(parts[1], JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ ok: false, msg: "Invalid token" });
  }
}


// POST /api/admin/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: "24h" });
    return res.json({ ok: true, token });
  }
  return res.status(401).json({ ok: false, msg: "Invalid credentials" });
});


// POST /api/admin/projects/add
router.post("/projects/add", adminAuth, async (req, res) => {
    try {
        const { title, description, image, tech, github, demo, type } = req.body;
        
        const newProject = new Project({
            title,
            description,
            image,
            tech, 
            github,
            demo,
            type
        });

        await newProject.save();
        res.json({ ok: true, msg: "Project added successfully!", project: newProject });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error adding project" });
    }
});

// DELETE /api/admin/projects/:id
router.delete("/projects/:id", adminAuth, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ ok: true, msg: "Project deleted" });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error deleting project" });
    }
});


router.get("/messages", adminAuth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});

module.exports = router;