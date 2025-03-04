const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  interactions: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);
