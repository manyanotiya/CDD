// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem("loggedIn") === "true";
}

// Handle Upload Button Click
// document.addEventListener("DOMContentLoaded", function () {
//     // Check login on page load
//     if (!isLoggedIn()) {
//         alert("You must log in first!");
//         window.location.href = "login.html";
//     }
//     // Upload Button
       const uploadBtn = document.getElementById("uploadBtn");
//     const form = document.getElementById("uploadForm");
//     const fileInput = document.getElementById("fileUpload");
       const detectButton = document.getElementById("detectBtn");
//     form.addEventListener("submit", function (e) {
//         e.preventDefault();

//         const file = fileInput.files[0];
//         const cropType = document.getElementById("cropType").value;

//         if (!file || !cropType) {
//             alert("Please select a crop type and upload an image.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("image", file);
//         formData.append("cropType", cropType);

//         fetch("http://localhost:5000/predict", {
//             method: "POST",
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => {
//             resultArea.innerHTML = `<h3>Disease Detected: ${data.result}</h3>`;
//         })
//         .catch(err => {
//             console.error(err);
//             resultArea.innerHTML = `<h3>Error detecting disease.</h3>`;
//         });
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("uploadForm");
    const fileInput = document.getElementById("fileUpload");
    const resultArea = document.getElementById("resultArea");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const file = fileInput.files[0];
        const cropType = document.getElementById("cropType").value;

        if (!file || !cropType) {
            alert("Please select a crop type and upload an image.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file); // Must be 'file' to match Flask backend
        formData.append("model", cropType); // Must be 'model' to match Flask backend

        fetch("http://localhost:5000/predict", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.predicted_class) {
                resultArea.innerHTML = `<h3>Prediction: ${data.predicted_class}</h3>`;
            } else {
                resultArea.innerHTML = `<h3>Error: ${data.error || "Unknown error"}</h3>`;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            resultArea.innerHTML = `<h3>Something went wrong while predicting!</h3>`;
        });
    });
});

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
// });
