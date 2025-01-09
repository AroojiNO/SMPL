const mongoose = require('mongoose');

const VisionResultSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  annotations: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('VisionResult', VisionResultSchema);