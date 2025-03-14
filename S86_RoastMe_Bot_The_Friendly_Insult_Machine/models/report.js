const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roastId: { type: mongoose.Schema.Types.ObjectId, ref: 'Roast', required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', reportSchema);
