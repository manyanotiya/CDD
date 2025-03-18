document.getElementById("signupForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let errorMessage = document.getElementById("error-message");

    // Validation
    if (email === "" || password === "" || confirmPassword === "") {
        errorMessage.textContent = "All fields are required!";
        return;
    }
    if (!email.includes("@") || !email.includes(".") || !email.includes("com")) {
        errorMessage.textContent = "Enter a valid email (must contain '@', '.', and 'com')!";
        return;
    }
    if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters!";
        return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errorMessage.textContent = "Password must contain at least one special character!";
        return;
    }
    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        return;
    }

    // If all good, send to server
    try {
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        alert(data.message);

        if (response.ok) {
            window.location.href = "login.html"; // Redirect after successful signup
        } else {
            errorMessage.textContent = data.message || "Signup failed!";
        }
    } catch (err) {
        console.error("Signup error:", err);
        errorMessage.textContent = "Server error. Try again later.";
    }
});
