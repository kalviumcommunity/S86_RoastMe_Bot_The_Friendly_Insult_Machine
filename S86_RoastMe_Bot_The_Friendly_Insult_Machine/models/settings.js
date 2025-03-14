const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  notifications: { type: Boolean, default: true },
  language: { type: String, default: 'English' },
});

module.exports = mongoose.model('Settings', settingsSchema);
