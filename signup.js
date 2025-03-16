// document.getElementById("signupForm").addEventListener("submit", async function (e) {
//     e.preventDefault();

//     let email = document.getElementById("email").value.trim();
//     let password = document.getElementById("password").value.trim();
//     let confirmPassword = document.getElementById("confirmPassword").value.trim();
//     let errorMessage = document.getElementById("error-message");

//     // Email validation
//     if (email === "" || password === "" || confirmPassword === "") {
//         errorMessage.textContent = "All fields are required!";
//     } else if (!email.includes("@") || !email.includes(".") || !email.includes("com")) {
//         errorMessage.textContent = "Enter a valid email (must contain '@', '.', and 'com')!";
//     } 
//     // Password validation
//     else if (password.length < 6) {
//         errorMessage.textContent = "Password must be at least 6 characters!";
//     } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//         errorMessage.textContent = "Password must contain at least one special character!";
//     } 
//     // Confirm password validation
//     else if (password !== confirmPassword) {
//         errorMessage.textContent = "Passwords do not match!";
//     } 
//     // If all conditions are met, save user data
//     else {
//         errorMessage.textContent = "";
//         localStorage.setItem("userEmail", email);
//         localStorage.setItem("userPassword", password);
//         alert("Sign-up successful! Redirecting to login page...");
//         window.location.href = "login.html"; // Redirect to login page
//     }

//     const response = await fetch('http://localhost:3000/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });
  
//       const data = await response.json();
//       alert(data.message);
      
//       if (response.ok) {
//         window.location.href = "login.html"; // Go to login page after signup
//       }
// });



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
        const response = await fetch('http://127.0.0.1:5500/CDD/signup.html', {
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
