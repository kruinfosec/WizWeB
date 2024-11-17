// Fleek Setup
const fleek = require("fleek-storage-js");

/**
 * Upload a file to Fleek Storage.
 * @param {File} file - The file to upload.
 * @param {string} bucketName - The name of the bucket to upload the file to.
 * @returns {Promise<void>}
 */
async function uploadToFleek(file, bucketName) {
    // Input validation
    if (!file || !file.name) {
        console.error("Invalid file provided.");
        return;
    }
    if (!bucketName) {
        console.error("Bucket name is required.");
        return;
    }

    try {
        const uploadedFile = await fleek.upload({
            apiKey: "YOUR_FLEEK_API_KEY",
            apiSecret: "YOUR_FLEEK_API_SECRET",
            bucket: bucketName,
            key: file.name,
            data: file,
        });

        console.log("File successfully uploaded to Fleek:", uploadedFile);
    } catch (error) {
        console.error("Error uploading file to Fleek:", error.message || error);
    }
}
