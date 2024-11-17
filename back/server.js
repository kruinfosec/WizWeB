// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an express app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Database Connection
mongoose.connect('your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Define routes (add more as needed)
app.get('/', (req, res) => {
    res.send('Welcome to Web3 DApp Backend');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
