const mongoose = require('mongoose');

const VisionResultSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  annotations: {
    text: { type: String }, // Detected text
    fullTextAnnotation: { type: Object }, // Detailed annotation (optional)
    // If you want to keep labels as well, you can include them here
    //labels: { type: [String] },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('VisionResult', VisionResultSchema);