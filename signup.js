document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let errorMessage = document.getElementById("error-message");

    // Email validation
    if (email === "" || password === "" || confirmPassword === "") {
        errorMessage.textContent = "All fields are required!";
    } else if (!email.includes("@") || !email.includes(".") || !email.includes("com")) {
        errorMessage.textContent = "Enter a valid email (must contain '@', '.', and 'com')!";
    } 
    // Password validation
    else if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters!";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errorMessage.textContent = "Password must contain at least one special character!";
    } 
    // Confirm password validation
    else if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
    } 
    // If all conditions are met, save user data
    else {
        errorMessage.textContent = "";
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        alert("Sign-up successful! Redirecting to login page...");
        window.location.href = "login.html"; // Redirect to login page
    }
});
