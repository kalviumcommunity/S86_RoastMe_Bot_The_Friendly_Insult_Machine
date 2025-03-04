const express = require('express');
const router = express.Router();
const Comeback = require('../models/comeback');

// Create a new Comeback
router.post('/', async (req, res) => {
  try {
    const newComeback = new Comeback(req.body);
    await newComeback.save();
    res.status(201).json({ success: true, data: newComeback });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get all Comebacks
router.get('/', async (req, res) => {
  try {
    const comebacks = await Comeback.find();
    res.status(200).json({ success: true, data: comebacks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get a single Comeback by ID
router.get('/:id', async (req, res) => {
  try {
    const comeback = await Comeback.findById(req.params.id);
    if (!comeback) {
      return res.status(404).json({ success: false, message: 'Comeback not found' });
    }
    res.status(200).json({ success: true, data: comeback });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update a Comeback by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedComeback = await Comeback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedComeback) {
      return res.status(404).json({ success: false, message: 'Comeback not found' });
    }
    res.status(200).json({ success: true, data: updatedComeback });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete a Comeback by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedComeback = await Comeback.findByIdAndDelete(req.params.id);
    if (!deletedComeback) {
      return res.status(404).json({ success: false, message: 'Comeback not found' });
    }
    res.status(200).json({ success: true, message: 'Comeback deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
