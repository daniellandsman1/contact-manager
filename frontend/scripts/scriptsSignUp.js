document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.getElementById("signUpForm");

  if (!signUpForm) {
    console.error("Form not found!");
    return;
  }

  signUpForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission to reload the page

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!username || !password || !confirmPassword) {
      document.getElementById("signupMessage").textContent =
        "All fields are required.";
      return;
    }

    if (password !== confirmPassword) {
      document.getElementById("signupMessage").textContent =
        "Passwords do not match.";
      return;
    }

    // Create the request payload
    const requestData = {
      FirstName: "John",
      LastName: "Doe",
      Login: "username",
      Password: "password",
    };

    try {
      const response = await fetch(
        "http://internlink.xyz/LAMPAPI/Register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        document.getElementById("signupMessage").textContent =
          "Registration successful!";
        setTimeout(() => {
          window.location.href = "index.html"; // Redirect to login page
        }, 2000);
      } else {
        document.getElementById("signupMessage").textContent =
          data.error || "Registration failed.";
      }
    } catch (error) {
      document.getElementById("signupMessage").textContent =
        "Server error. Try again later.";
      console.error("Error:", error);
    }
  });
});
