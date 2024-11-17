// app.js
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const Community = require('./models/community'); // Import the Community model

const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/wisweb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.log('MongoDB connection error:', err);
});

// Define a route to create a new community
app.post('/create-community', async (req, res) => {
    const { name, description, category, creator, image } = req.body;

    try {
        const newCommunity = new Community({
            name,
            description,
            category,
            creator,
            image,
        });

        // Save the community to the database
        await newCommunity.save();
        res.status(201).json(newCommunity); // Send back the created community
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Define a route to fetch all communities
app.get('/communities', async (req, res) => {
    try {
        const communities = await Community.find(); // Fetch all communities
        res.status(200).json(communities);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch communities' });
    }
});

// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
