const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roastId: { type: mongoose.Schema.Types.ObjectId, ref: 'Roast', required: true },
  type: { type: String, enum: ['like', 'dislike'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reaction', reactionSchema);
