// DOM Elements
const loginFeedback = document.getElementById("login-feedback");
const profileFeedback = document.getElementById("profile-feedback");
const loginContainer = document.getElementById("login-container");
const profileContainer = document.getElementById("profile-container");

// Utility Function to Display Feedback
const displayFeedback = (message, color = "#00ffcc") => {
    loginFeedback.style.display = "block";
    loginFeedback.style.color = color;
    loginFeedback.textContent = message;
};

// Martian Wallet Login Functionality
async function loginWithMartian() {
    if (typeof window.martian !== "undefined") {
        try {
            const accounts = await window.martian.connect(); // Request account connection
            const walletAddress = accounts.address;

            displayFeedback(`Connected to Martian Wallet: ${walletAddress}`);

            // Redirect to dashboard or perform actions
            setTimeout(() => {
                window.location.href = "/home/index.html";
            }, 1000);
        } catch (error) {
            console.error("Martian Wallet Connection Error:", error);
            displayFeedback("Failed to connect to Martian Wallet.", "#ff4d4d");
        }
    } else {
        displayFeedback("Martian Wallet is not installed. Please install it to continue.", "#ff4d4d");
    }
}

// Sui Wallet Login Functionality
async function loginWithSuiWallet() {
    if (typeof window.suiWallet !== "undefined") {
        try {
            const accounts = await window.suiWallet.requestAccounts(); // Request account connection
            const walletAddress = accounts[0];

            displayFeedback(`Connected to Sui Wallet: ${walletAddress}`);

            // Redirect to dashboard or perform actions
            setTimeout(() => {
                window.location.href = "/home/index.html";
            }, 1000);
        } catch (error) {
            console.error("Sui Wallet Connection Error:", error);
            displayFeedback("Failed to connect to Sui Wallet.", "#ff4d4d");
        }
    } else {
        displayFeedback("Sui Wallet is not installed. Please install it to continue.", "#ff4d4d");
    }
}

// Handle Profile Form Submission
const handleProfileSubmission = (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (name && email && username && password) {
        profileFeedback.style.color = "#00ffcc";
        profileFeedback.textContent = "Profile created successfully!";
        profileFeedback.style.display = "block";

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

// Toggle Containers Utility
const toggleContainers = (showContainer, hideContainer) => {
    showContainer.style.display = "block";
    hideContainer.style.display = "none";
};

// Event Listeners
document.getElementById("martian-login").addEventListener("click", loginWithMartian);
document.getElementById("sui-login").addEventListener("click", loginWithSuiWallet);

// Guest Login Placeholder
document.getElementById("guest-login").addEventListener("click", function () {
    displayFeedback("Guest login not yet implemented.");
    window.location.href = "/home/index.html";
});

// Create Profile Button Click
document.getElementById("create-profile").addEventListener("click", () => {
    toggleContainers(profileContainer, loginContainer);
});

// Profile Form Submission
document.getElementById("profile-form").addEventListener("submit", handleProfileSubmission);
