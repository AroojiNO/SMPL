const express = require('express');
const router = express.Router();
const { upload, analyzeImage } = require('../controllers/visionController');

// Route to handle image upload and analysis
router.post('/analyze', upload.single('image'), analyzeImage);

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