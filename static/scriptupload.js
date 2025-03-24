// Check if user is logged in correctly
function isLoggedIn() {
    return localStorage.getItem("loggedIn") === "true";
}

document.addEventListener("DOMContentLoaded", function () {
    // Redirect to login if user is NOT logged in
    if (!isLoggedIn()) {
        window.location.href = "login.html";
        return;
    }

    const form = document.getElementById("uploadForm");
    const fileInput = document.getElementById("fileUpload");
    const resultArea = document.getElementById("resultArea");
    const uploadBtn = document.getElementById("detectBtn");

    // Handle form submission
    if (form) {
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
    }

    // Optional: Show file name on selection
    if (uploadBtn && fileInput) {
        fileInput.addEventListener("change", function () {
            if (fileInput.files.length > 0) {
                alert("File selected: " + fileInput.files[0].name);
            }
        });
    }

    // Logout functionality
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            const confirmLogout = confirm("Are you sure you want to log out?");
            if (confirmLogout) {
                localStorage.removeItem("loggedIn");
                localStorage.removeItem("userEmail"); // Clean slate
                window.location.href = "login.html";
            }
        });
    }

    // Optional Contact popup logic (if you’re using one)
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
