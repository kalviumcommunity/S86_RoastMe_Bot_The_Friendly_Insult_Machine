// controllers/authController.js
const { User } = require('../models'); // Use the correct destructuring to get the User model

const login = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required.' });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.cookie('username', username, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    });

    res.status(200).json({ message: 'Login successful.', user });
  } catch (error) {
    res.status(500).json({ error: 'Login failed.', details: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie('username');
  res.status(200).json({ message: 'Logged out successfully.' });
};

module.exports = { login, logout };
