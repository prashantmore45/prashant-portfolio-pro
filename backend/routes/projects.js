const router = require('express').Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth'); 

// GET All Projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 }); 
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// POST Add Project (Protected)
router.post('/add', auth, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.json(savedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT Update Project (Protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE Project (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;  