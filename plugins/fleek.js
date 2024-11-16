// Fleek Setup
const fleek = require("fleek-storage-js");

async function uploadToFleek(file, bucketName) {
    const uploadedFile = await fleek.upload({
        apiKey: "YOUR_FLEEK_API_KEY",
        apiSecret: "YOUR_FLEEK_API_SECRET",
        bucket: bucketName,
        key: file.name,
        data: file,
    });
    console.log("File uploaded to Fleek:", uploadedFile);
}
