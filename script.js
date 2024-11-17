// DOM Elements
const loginFeedback = document.getElementById("login-feedback");

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

// Event Listeners
document.getElementById("metamask-login").addEventListener("click", loginWithMetaMask);

// Guest Login Placeholder
document.getElementById("guest-login").addEventListener("click", function() {
    window.location.href = "/home/index.html";
    loginFeedback.style.display = "block";
    loginFeedback.style.color = "#00ffcc";
    loginFeedback.textContent = "Guest login not yet implemented.";
});

// Create Profile Placeholder
document.getElementById("create-profile").addEventListener("click", () => {
    loginFeedback.style.display = "block";
    loginFeedback.style.color = "#00ffcc";
    loginFeedback.textContent = "Create Profile not yet implemented.";
});

    document.getElementById("metamask-login").addEventListener("click", () => {
        loginFeedback.style.display = "block";
        loginFeedback.textContent = "MetaMask login is not available on this device.";
        if (typeof window.ethereum === "undefined") {
            loginFeedback.style.display = "block";
            loginFeedback.textContent = "MetaMask not detected. Please install it to enable blockchain login.";
        }
        
});
