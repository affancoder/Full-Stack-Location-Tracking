require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Define User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  age: Number,
  gender: String,
  location: {
    latitude: Number,
    longitude: Number,
    accuracy: Number,
    timestamp: Date
  },
  exactLocationData: {
    fullAddress: String,
    placeId: String,
    components: Array,
    types: Array
  },
  locationCaptured: Boolean,
  submittedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// API Routes

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ submittedAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

app.post('/api/submit-form', async (req, res) => {
  try {
    // Log the received data for debugging
    console.log('Received form data:', req.body);
    
    // Check if required fields are present
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields', 
        missingFields: [
          !firstName ? 'firstName' : null,
          !lastName ? 'lastName' : null,
          !email ? 'email' : null
        ].filter(Boolean)
      });
    }
    
    // Process location data if available
    if (req.body.location) {
      // Convert timestamp string to Date object if needed
      if (req.body.location.timestamp && typeof req.body.location.timestamp === 'string') {
        req.body.location.timestamp = new Date(req.body.location.timestamp);
      }
    }
    
    const userData = req.body;
    const newUser = new User(userData);
    
    // Save to database with detailed error handling
    await newUser.save();
    console.log('User data saved successfully with ID:', newUser._id);
    res.status(201).json({ 
      success: true, 
      message: 'Form data saved successfully',
      userId: newUser._id
    });
  } catch (error) {
    console.error('Error saving form data:', error);
    
    // Provide more specific error messages based on error type
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: validationErrors 
      });
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      // Handle duplicate key errors
      return res.status(409).json({ 
        success: false, 
        message: 'Duplicate entry error', 
        error: 'A record with this information already exists'
      });
    }
    
    // Generic error response
    res.status(500).json({ 
      success: false, 
      message: 'Error saving form data', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});