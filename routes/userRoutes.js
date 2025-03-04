const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create User
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get All Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete User
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
