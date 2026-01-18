const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tech: { type: [String], required: true },
  github: { type: String, required: true },
  demo: { type: String },
  type: { type: String },
  
  order: { type: Number, default: 99 },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);