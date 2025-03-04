const mongoose = require('mongoose');

const RoastSchema = new mongoose.Schema({
  text: { type: String, required: true },
  level: { type: String, enum: ['mild', 'medium', 'savage'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Roast', RoastSchema);
