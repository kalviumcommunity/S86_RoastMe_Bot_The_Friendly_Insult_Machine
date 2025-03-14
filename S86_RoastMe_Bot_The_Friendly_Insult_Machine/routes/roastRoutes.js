const express = require('express');
const router = express.Router();
const Roast = require('../models/roast');

// Create Roast
router.post('/', async (req, res) => {
  try {
    const newRoast = new Roast(req.body);
    await newRoast.save();
    res.status(201).json({ success: true, data: newRoast });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get All Roasts
router.get('/', async (req, res) => {
  try {
    const roasts = await Roast.find();
    res.status(200).json({ success: true, data: roasts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
