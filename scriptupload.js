// document.addEventListener("DOMContentLoaded", function () {
//     const fileInput = document.getElementById("fileUpload");
//     const detectButton = document.getElementById("detectBtn");

//     // File upload event
//     fileInput.addEventListener("change", function () {
//         if (fileInput.files.length > 0) {
//             alert("File selected: " + fileInput.files[0].name);
//         }
//     });

//     // Disease Detection Simulation
//     function detectDisease() {
//         if (fileInput.files.length === 0) {
//             alert("Please upload an image first.");
//         } else {
//             alert("Processing image... (Disease detection feature coming soon!)");
//         }
//     }

//     // Attach function to button
//     detectButton.addEventListener("click", detectDisease);
// });


// document.addEventListener("DOMContentLoaded", function () {
//     console.log("Page loaded, checking for logout button..."); // Debugging

//     let logoutBtn = document.getElementById("logoutBtn");

//     if (logoutBtn) {
//         // ✅ Remove existing event listener before adding a new one

//         logoutBtn.addEventListener("click", logoutFunction);
//     } else {
//         console.error("Logout button NOT found! Check your HTML.");
//     }
// });

// function logoutFunction() {
//     console.log("Logout button clicked!"); // Debugging

//     let confirmLogout = confirm("Are you sure you want to log out?");
    
//     if (confirmLogout) {
//         console.log("Logging out..."); // Debugging
//         localStorage.removeItem("loggedIn"); // Remove login status
//         window.location.href = "home.html"; // Redirect to login page
//     } else {
//         console.log("Logout canceled!"); // Debugging
//     }
// }


// Function to check if user is logged in
function isLoggedIn() {
    return localStorage.getItem("loggedInUser") !== null;
}

// Handle Upload Button Click
document.getElementById("uploadBtn").addEventListener("click", function () {
    if (!isLoggedIn()) {
        // Redirect to login page if not logged in
        alert("You must log in first!");
        window.location.href = "login.html";
    } else {
        // Allow file selection if logged in
        document.getElementById("fileInput").click();
    }
});

// Simulate login process
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            localStorage.setItem("loggedInUser", "user@example.com");
            alert("Login successful!");
            window.location.href = "upload.html"; // Redirect to upload after login
        });
    }
});

// Contact Popup Logic
document.getElementById('contact-btn').addEventListener('click', function () {
    document.getElementById('contact-popup').style.display = 'block';
});

document.querySelector('.close-btn').addEventListener('click', function () {
    document.getElementById('contact-popup').style.display = 'none';
});
