

// Token System
let tokens = 0;
const tokenCountDisplay = document.getElementById("tokenCount");

// Function to Add Tokens
function addTokens(amount) {
    tokens += amount;
    tokenCountDisplay.textContent = tokens;
}

// Search Functionality
document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchBar").value;
    const results = document.getElementById("searchResults");

    // Simulating a Search
    results.innerHTML = `<p>Searching for: ${query}</p>`;
});

// File Input Handling (Image Preview)
let currentImageIndex = 0;
let uploadedImages = [];

document.getElementById("fileInput").addEventListener("change", function (e) {
    const files = e.target.files;
    const imagePreviewContainer = document.getElementById("imagePreview");

    uploadedImages = []; // Clear previous images

    if (files.length > 0) {
        const previewContainer = document.getElementById("imagePreviewContainer");
        previewContainer.style.display = "flex"; // Show the image preview container

        Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                uploadedImages.push(event.target.result);
                // Set the first image as the preview
                if (uploadedImages.length === 1) {
                    imagePreviewContainer.innerHTML = `<img src="${uploadedImages[0]}" alt="Image Preview" />`;
                }
            };
            reader.readAsDataURL(file);
        });

        // Update arrow visibility
        updateArrows();
    } else {
        document.getElementById("imagePreviewContainer").style.display = "none";
    }
});

// Update the arrows visibility and the image preview
function updateArrows() {
    const prevBtn = document.getElementById("prevImageBtn");
    const nextBtn = document.getElementById("nextImageBtn");

    // If there are multiple images, show navigation buttons
    if (uploadedImages.length > 1) {
        prevBtn.classList.remove("hidden");
        nextBtn.classList.remove("hidden");
    } else {
        prevBtn.classList.add("hidden");
        nextBtn.classList.add("hidden");
    }
    updateImagePreview();
}

// Navigate to the previous or next image
function updateImagePreview() {
    const imagePreviewContainer = document.getElementById("imagePreview");
    imagePreviewContainer.innerHTML = `<img src="${uploadedImages[currentImageIndex]}" alt="Image Preview" />`;
}

// Event listeners for the navigation buttons
document.getElementById("prevImageBtn").addEventListener("click", () => {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateImagePreview();
    }
});

document.getElementById("nextImageBtn").addEventListener("click", () => {
    if (currentImageIndex < uploadedImages.length - 1) {
        currentImageIndex++;
        updateImagePreview();
    }
});

// Post button functionality
document.getElementById("postBtn").addEventListener("click", function () {
    const title = document.getElementById("postTitle").value.trim();
    const content = document.getElementById("postContent").value.trim();

    if (!title || !content) {
        alert("Please enter both a title and content for your post.");
        return;
    }

    let postContent = `
        <h2>${title}</h2>
        <p>${content}</p>
    `;

    // Handle the uploaded images
    if (uploadedImages.length > 0) {
        uploadedImages.forEach((imageSrc) => {
            postContent += `<img src="${imageSrc}" alt="Uploaded Image" style="max-width: 100px; margin-top: 1rem;" />`;
        });
    }

    // Display or send the post content (this part will depend on your back-end setup)
    console.log(postContent); // Just for demonstration
    alert("Post submitted!");

    // Reset post and preview containers
    resetPostForm();
});

// Reset post and preview containers
function resetPostForm() {
    // Reset input fields
    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";

    // Clear uploaded images and hide preview container
    uploadedImages = [];
    currentImageIndex = 0;
    const previewContainer = document.getElementById("imagePreviewContainer");
    const imagePreview = document.getElementById("imagePreview");

    previewContainer.style.display = "none"; // Hide the preview container after posting
    imagePreview.innerHTML = ""; // Clear the image preview

    // Optionally, you can also hide the navigation arrows if you want
    document.getElementById("prevImageBtn").classList.add("hidden");
    document.getElementById("nextImageBtn").classList.add("hidden");
}

// Example Token Reward
addTokens(0); // Add initial tokens






document.addEventListener('DOMContentLoaded', () => {
    // Fetch posts from the server
    fetch('http://localhost:5000/api/posts')
      .then(response => response.json())
      .then(posts => {
        const feed = document.querySelector('.feed');
        feed.innerHTML = '';  // Clear existing posts in the feed
  
        // Loop through posts and create the HTML structure for each one
        posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.classList.add('post');
  
          // Create post content (you can customize this)
          const postTitle = document.createElement('h3');
          postTitle.textContent = post.title;
  
          const postContent = document.createElement('p');
          postContent.textContent = post.content;
  
          // Append to the post element
          postElement.appendChild(postTitle);
          postElement.appendChild(postContent);
  
          // Append the post to the feed
          feed.appendChild(postElement);
        });
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
      });
  });
  