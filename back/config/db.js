const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Update if you're using cloud MongoDB
const client = new MongoClient(uri);

const connectDB = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection failed", error);
    }
};

module.exports = { connectDB, client };
