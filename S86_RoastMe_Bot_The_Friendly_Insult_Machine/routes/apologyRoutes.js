const express = require('express');
const router = express.Router();
const Apology = require('../models/apology'); // Ensure this model exists

// Get all apologies
router.get('/', async (req, res) => {
  try {
    const apologies = await Apology.find();
    res.json(apologies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new apology
router.post('/', async (req, res) => {
  try {
    const newApology = new Apology(req.body);
    await newApology.save();
    res.status(201).json(newApology);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
