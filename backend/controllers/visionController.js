const VisionResult = require('../models/VisionResult');
const multer = require('multer');
const path = require('path');
const { ImageAnnotatorClient } = require('@google-cloud/vision');

// Initialize Google Vision client
const client = new ImageAnnotatorClient();

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1617891234567.jpg
  },
});

const upload = multer({ storage: storage });

// Controller to handle image upload and Google Vision request
const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const imagePath = req.file.path;

    // Perform label detection using Google Vision
    const [result] = await client.textDetection(imagePath);
    const texts = result.textAnnotations;

    // Optionally, perform other types of analysis:
    // const [result] = await client.textDetection(imagePath);
    // const texts = result.textAnnotations;

    // Save result to MongoDB
    const visionResult = new VisionResult({
      imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
      annotations: labels,
    });

    await visionResult.save();

    res.status(200).json({
      message: 'Image analyzed and stored successfully',
      data: visionResult,
    });
  } catch (error) {
    console.error('Error in analyzeImage:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { upload, analyzeImage };