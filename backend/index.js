require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const visionRoutes = require('./routes/visionRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use('/uploads', express.static('uploads')); // Serve static files

// Routes
app.use('/api/vision', visionRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
  // Start server after successful DB connection
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));