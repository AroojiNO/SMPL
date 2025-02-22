// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors()); // Enable CORS so your React app can communicate with this backend

// MongoDB Atlas connection
// Replace <username>, <password>, and <cluster-url> with your details.
const mongoURI = env.process.MONGODB_URI
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a Mongoose schema and model for recipes
const recipeSchema = new mongoose.Schema({
  imageFilename: String,
  ingredients: [String],
  nutrition: Object, // Adjust the structure as needed
});
const Recipe = mongoose.model('Recipe', recipeSchema);

// Configure Multer to store uploads temporarily in the 'uploads/' directory
const upload = multer({ dest: 'uploads/' });

// Create a Google Cloud Vision client
const visionClient = new ImageAnnotatorClient();

// API Endpoint to handle image uploads and processing
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // The file is stored temporarily at req.file.path
    const imagePath = req.file.path;

    // Use Google Cloud Vision to perform text (OCR) detection
    const [result] = await visionClient.textDetection(imagePath);
    const detections = result.textAnnotations;
    // The first element typically contains the full detected text
    const text = detections[0] ? detections[0].description : '';
    console.log('OCR Text:', text);

    // **Ingredient Extraction:**  
    // This is a simple approach: splitting the text by newlines and filtering empty lines.
    // In a real-world scenario, you might want to perform more refined parsing.
    const ingredients = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // **Nutritional Information:**  
    // For demonstration purposes, we’re assigning dummy values.
    // Replace this with real nutritional lookup logic or API calls.
    const nutrition = ingredients.reduce((acc, ingredient) => {
      acc[ingredient] = { calories: 100, protein: 5, fat: 2, carbs: 15 };
      return acc;
    }, {});

    // Save the processed recipe data to MongoDB Atlas
    const recipe = new Recipe({
      imageFilename: req.file.filename,
      ingredients,
      nutrition,
    });
    await recipe.save();

    // Optionally, remove the uploaded file after processing to free up disk space.
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Failed to delete temporary file:", err);
    });

    // Send the processed data back to the frontend
    res.json({ success: true, recipe });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server on a specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));