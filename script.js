// Hello
// DOM Elements
const loginFeedback = document.getElementById("login-feedback");
const profileFeedback = document.getElementById("profile-feedback"); // Add this for profile feedback
const loginContainer = document.getElementById("login-container");
const profileContainer = document.getElementById("profile-container");

// MetaMask Login Functionality
async function loginWithMetaMask() {
    try {
        if (typeof window.ethereum !== "undefined") {
            // Request accounts
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            const walletAddress = accounts[0];

            // Show success feedback
            loginFeedback.style.display = "block";
            loginFeedback.style.color = "#00ffcc";
            loginFeedback.textContent = `Connected: ${walletAddress}`;

            // Redirect to home page after successful login
            setTimeout(() => {
                window.location.href = "/home/index.html"; // Replace '/home' with the desired path
            }, 1000);
            // Optional: Redirect to dashboard or perform other actions
        } else {
            // MetaMask not installed
            loginFeedback.style.display = "block";
            loginFeedback.textContent = "MetaMask is not installed. Please install MetaMask to continue.";
        }
    } catch (error) {
        // Handle errors
        loginFeedback.style.display = "block";
        loginFeedback.textContent = "Failed to connect to MetaMask.";
        console.error(error);
    }
}

// Handle Profile Form Submission
const handleProfileSubmission = (e) => {
    e.preventDefault();

    // Retrieve form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validation
    if (name && email && username && password) {
        profileFeedback.style.color = "#00ffcc";
        profileFeedback.textContent = "Profile created successfully!";
        profileFeedback.style.display = "block";

        // Simulate saving and return to login
        setTimeout(() => {
            toggleContainers(loginContainer, profileContainer);
            profileFeedback.style.display = "none";
        }, 2000);
    } else {
        profileFeedback.style.color = "#ff6666";
        profileFeedback.textContent = "Please fill out all fields.";
        profileFeedback.style.display = "block";
    }
};

// Toggle containers function
const toggleContainers = (showContainer, hideContainer) => {
    showContainer.style.display = "block";
    hideContainer.style.display = "none";
};

// Event Listeners
document.getElementById("metamask-login").addEventListener("click", loginWithMetaMask);

// Guest Login Placeholder
document.getElementById("guest-login").addEventListener("click", function () {
    window.location.href = "/home/index.html";
    loginFeedback.style.display = "block";
    loginFeedback.style.color = "#00ffcc";
    loginFeedback.textContent = "Guest login not yet implemented.";
});

// Create Profile Button Click
document.getElementById("create-profile").addEventListener("click", () => {
    toggleContainers(profileContainer, loginContainer); // Switch to profile container
});

// Profile Form Submission
document.getElementById("profile-form").addEventListener("submit", handleProfileSubmission);
