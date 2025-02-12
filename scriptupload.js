document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileUpload");
    const detectButton = document.getElementById("detectBtn");

    // File upload event
    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            alert("File selected: " + fileInput.files[0].name);
        }
    });

    // Disease Detection Simulation
    function detectDisease() {
        if (fileInput.files.length === 0) {
            alert("Please upload an image first.");
        } else {
            alert("Processing image... (Disease detection feature coming soon!)");
        }
    }

    // Attach function to button
    detectButton.addEventListener("click", detectDisease);
});


document.addEventListener("DOMContentLoaded", function () {
    console.log("Page loaded, checking for logout button..."); // Debugging

    let logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        // ✅ Remove existing event listener before adding a new one

        logoutBtn.addEventListener("click", logoutFunction);
    } else {
        console.error("Logout button NOT found! Check your HTML.");
    }
});

function logoutFunction() {
    console.log("Logout button clicked!"); // Debugging

    let confirmLogout = confirm("Are you sure you want to log out?");
    
    if (confirmLogout) {
        console.log("Logging out..."); // Debugging
        localStorage.removeItem("loggedIn"); // Remove login status
        window.location.href = "home.html"; // Redirect to login page
    } else {
        console.log("Logout canceled!"); // Debugging
    }
}