const mongoose = require('mongoose');

const apologySchema = new mongoose.Schema({
  text: { type: String, required: true },
  tone: { type: String, enum: ['sincere', 'sarcastic'], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Apology', apologySchema);
