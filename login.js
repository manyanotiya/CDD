document.addEventListener("DOMContentLoaded", function () {
  // Check if user is already logged in
  if (localStorage.getItem("loggedIn") === "true") {
      window.location.href = "upload.html";
  }

  document.getElementById("loginForm").addEventListener("submit", async function (event) {
      event.preventDefault(); // Stop form from refreshing the page

      let email = document.getElementById("email").value.trim();
      let password = document.getElementById("password").value.trim();
      let errorMessage = document.getElementById("errorMessage");

      // Clear previous error
      errorMessage.textContent = "";

      // Basic validation
      if (!email || !password) {
          errorMessage.textContent = "All fields are required!";
          return;
      }

      if (!email.includes("@") || !email.includes(".") || !email.includes("com")) {
          errorMessage.textContent = "Enter a valid email!";
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

      // All good? Send request to backend
      try {
          const response = await fetch("http://localhost:5001/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ email, password })
          });

          const data = await response.json();

          if (response.ok && data.success) {
              alert("Login successful!");
              localStorage.setItem("loggedIn", "true");
              window.location.href = "upload.html";
          } else {
              errorMessage.textContent = data.message || "Login failed. Check credentials.";
          }

      } catch (err) {
          console.error("Login Error:", err);
          errorMessage.textContent = "Something went wrong. Try again.";
      }   
  });
});
