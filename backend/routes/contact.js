const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const auth = require('../middleware/auth');

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required.",
      });
    }

    await Contact.create({
      name,
      email,
      message,
    });

    res.json({
      success: true,
      msg: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
});

// GET (View Messages - Admin Only)
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE Message (Admin Only)
router.delete('/:id', auth, async (req, res) => {
    try {
      await Contact.findByIdAndDelete(req.params.id);
      res.json({ message: 'Message Deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
