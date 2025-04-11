const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },  // ✅ This must exist!
  email: { type: String, required: true, unique: true },
  // Add other fields if needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
