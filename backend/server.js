const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse form data and enable CORS
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/wizweb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder for uploaded images
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

// Mongoose Community Model
const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String } // Optional image field
});

const Community = mongoose.model('Community', communitySchema);

// POST Route to Create a New Community
app.post('/create-community', upload.single('image'), async (req, res) => {
  const { name, description, category } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !description || !category) {
    return res.status(400).json({ message: 'Name, description, and category are required.' });
  }

  try {
    const newCommunity = new Community({
      name,
      description,
      category,
      image
    });
    const savedCommunity = await newCommunity.save();
    res.status(201).json(savedCommunity);
  } catch (error) {
    console.error('Error creating community:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET Route to Fetch All Communities
app.get('/get-communities', async (req, res) => {
  try {
    const communities = await Community.find(); // Fetch all communities from MongoDB
    res.status(200).json(communities); // Return communities
  } catch (error) {
    console.error('Error fetching communities:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
