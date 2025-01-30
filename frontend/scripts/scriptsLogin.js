document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (!loginForm) {
    console.error("Form not found!");
    return;
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (!usernameInput || !passwordInput) {
      console.error("Username or Password field not found!");
      return;
    }

    const username = usernameInput.value;
    const password = passwordInput.value;

    console.log("Sending data to the server:", { username, password });

    if (username && password) {
      console.log("Redirecting to contactPage.html...");
      window.location.href = "contactPage.html"; // Redirect
    } else {
      alert("Please fill in both username and password.");
    }
  });
});
