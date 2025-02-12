document.addEventListener("DOMContentLoaded", function () {
    // ✅ Check if user is already logged in
    if (localStorage.getItem("loggedIn") === "true") {
        window.location.href = "upload.html"; // Redirect to upload page
    }
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("errorMessage");

    // Simple validation
    if (email === "" || password === "") {
        errorMessage.textContent = "All fields are required!";
    } else if (!email.includes("@")) {
        errorMessage.textContent = "Enter a valid email!";
    } else if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters!";
    } else {
        errorMessage.textContent = "";
        alert("Login successful! Redirecting to upload page...");
        
        // ✅ Store login status
        localStorage.setItem("loggedIn", "true");
        
        // ✅ Redirect to Upload Page
        window.location.href = "upload.html";
    }
});
