const mongoose = require('mongoose');

const botResponseSchema = new mongoose.Schema({
  type: { type: String, enum: ['roast', 'comeback', 'apology'], required: true },
  text: { type: String, required: true },
  status: { type: String, enum: ['active', 'archived'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BotResponse', botResponseSchema);
