// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem("loggedIn") === "true";
}

// Handle Upload Button Click
document.addEventListener("DOMContentLoaded", function () {
    // Check login on page load
    if (!isLoggedIn()) {
        alert("You must log in first!");
        window.location.href = "login.html";
    }

    // Upload Button
    const uploadBtn = document.getElementById("uploadBtn");
    const fileInput = document.getElementById("fileUpload");
    const detectButton = document.getElementById("detectBtn");

    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener("click", function () {
            fileInput.click();
        });

        fileInput.addEventListener("change", function () {
            if (fileInput.files.length > 0) {
                alert("File selected: " + fileInput.files[0].name);
            }
        });
    }

    // Disease Detection Simulation
    if (detectButton) {
        detectButton.addEventListener("click", function () {
            if (fileInput.files.length === 0) {
                alert("Please upload an image first.");
            } else {
                alert("Processing image... (Disease detection feature coming soon!)");
            }
        });
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            const confirmLogout = confirm("Are you sure you want to log out?");
            if (confirmLogout) {
                localStorage.removeItem("loggedIn");
                window.location.href = "login.html";
            }
        });
    }

    // Contact Popup Logic
    const contactBtn = document.getElementById('contact-btn');
    const closeBtn = document.querySelector('.close-btn');

    if (contactBtn && closeBtn) {
        contactBtn.addEventListener('click', function () {
            document.getElementById('contact-popup').style.display = 'block';
        });

        closeBtn.addEventListener('click', function () {
            document.getElementById('contact-popup').style.display = 'none';
        });
    }
});
