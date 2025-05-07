const express = require('express');
const router = express.Router();
const { User } = require('../models'); // adjust the path if needed

// Login - set cookie
router.post('/login', async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 👇 Set the cookie
    res.cookie('username', user.username, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // true if using HTTPS
    });

    res.status(200).json({
      message: 'Login successful.',
      user,
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Logout - clear cookie
router.post('/logout', (req, res) => {
  res.clearCookie('username');
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
