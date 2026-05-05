const router = require('express').Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth'); 

// GET All Projects with pagination and optimization
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Using lean() for better performance on read-only queries
    const projects = await Project
      .find()
      .sort({ order: 1 })
      .skip(skip)
      .limit(limit)
      .select('title description image tech link featured type order') // Only select needed fields
      .lean() // Returns plain JS objects, faster than full Mongoose docs
      .exec();

    const total = await Project.countDocuments();

    res.json({
      data: projects,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: projects.length
      }
    });
  } catch (err) {
    console.error('Projects fetch error:', err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET Single Project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project
      .findById(req.params.id)
      .lean()
      .exec();
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// POST Add Project (Protected)
router.post('/add', auth, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
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
      { new: true, runValidators: true }
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
    res.json({ message: 'Project Deleted Successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;  