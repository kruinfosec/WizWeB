// models/community.js
const mongoose = require('mongoose');

// Define the schema for a community
const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,  // Ensure unique names for communities
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to a User model (if you have one)
        required: true,
    },
    image: {
        type: String,  // Store a URL or path for the image
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Set the default creation date
    },
});

// Create the model for the community
const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
