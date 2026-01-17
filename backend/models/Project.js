const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL to the image (we will handle image uploads later)
      required: true,
    },
    type: {
        type: String, // e.g. "Full Stack", "Frontend"
        default: "Web Application"
    },
    tech: {
      type: [String], // Array of strings: ["React", "Node.js"]
      required: true,
    },
    github: {
      type: String,
      required: true,
    },
    demo: {
      type: String,
      default: "", // Optional
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

module.exports = mongoose.model("Project", projectSchema);