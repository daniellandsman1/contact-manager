// script.js
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission to the server

    // Retrieve the form data
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simulate sending data to the server (e.g., via an API)
    console.log("Sending data to the server:", { username, password });

    // Simulate a successful login and navigate to the next page
    if (username && password) {
      window.location.href = "contactPage.html"; // Redirect to the dashboard or next page
    } else {
      alert("Please fill in both username and password.");
    }
  });
