// document.addEventListener("DOMContentLoaded", function () {
// <<<<<<< HEAD
//     // ✅ Check if user is already logged in
//     if (localStorage.getItem("loggedIn") === "false") {
// =======
//     // Check if user is already logged in
//     if (localStorage.getItem("loggedIn") === "true") {
// >>>>>>> 3863c7c11ae44d5dfd38f2ffdcbaf166baec8c44
//         window.location.href = "upload.html"; // Redirect to upload page
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
    // Check if user is already logged in
    if (localStorage.getItem("loggedIn") === "true") {
        window.location.href = "upload.html"; // Redirect to upload page
    }
});

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("errorMessage");


    if (email === "" || password === "") {
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
    // If all conditions are met
    else {
        errorMessage.textContent = "";
        alert("Login successful! Redirecting to upload page...");
        localStorage.setItem("loggedInUser", email);
        window.location.href = "upload.html";
    }

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      alert(data.message);
});
