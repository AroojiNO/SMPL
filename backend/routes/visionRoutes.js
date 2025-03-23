const express = require('express');
const multer = require('multer');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const fs = require('fs');
const path = require('path');

const router = express.Router();
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

// API Endpoint to handle image uploads and processing
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const imagePath = req.file.path;

    // Use Google Cloud Vision to perform text (OCR) detection
    const [result] = await client.textDetection(imagePath);
    const detections = result.textAnnotations;
    const text = detections[0] ? detections[0].description : '';

    // Extract ingredients (simple split by newlines)
    const ingredients = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // Optionally, remove the uploaded file after processing
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Failed to delete temporary file:", err);
    });

    // Send the processed data back to the frontend
    res.json({ success: true, recipe: { ingredients } });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: error.message });
  }
});

// Optional: Route to get all stored results
router.get('/results', async (req, res) => {
  try {
    const results = await VisionResult.find().sort({ createdAt: -1 });
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;