const mongoose = require('mongoose');

const roastSchema = new mongoose.Schema({
  text: { type: String, required: true },
  level: { type: String, enum: ['mild', 'medium', 'savage'], required: true },
  category: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Roast', roastSchema);
