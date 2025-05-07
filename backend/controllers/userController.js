// controllers/userController.js
const { User } = require('../models');

// Create a new user
const createUser = async (req, res) => {
  const { username, email, role } = req.body;

  if (!username || !email || !role) {
    return res.status(400).json({ success: false, message: 'Username, email, and role are required.' });
  }

  try {
    const user = await User.create({ username, email, role });
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating user', details: error.message });
  }
};

// Update user role by username
const updateUserRole = async (req, res) => {
  const { username, role } = req.body;

  if (!username || !role) {
    return res.status(400).json({ success: false, message: 'Username and role are required.' });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (role && ['admin', 'user'].includes(role)) {
      user.role = role;
      await user.save();
      return res.status(200).json({ success: true, data: user });
    }

    return res.status(400).json({ success: false, message: 'Invalid role' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createUser, updateUserRole }; // Export both functions
