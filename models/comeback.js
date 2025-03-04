const mongoose = require('mongoose');

const comebackSchema = new mongoose.Schema({
  text: { type: String, required: true },
  category: { type: String, required: true },
  roastId: { type: mongoose.Schema.Types.ObjectId, ref: 'Roast', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comeback', comebackSchema);
