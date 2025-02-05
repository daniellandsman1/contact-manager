document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.getElementById("signUpForm");

  if (!signUpForm) {
    console.error("Form not found!");
    return;
  }

  signUpForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission to reload the page

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
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
      document.getElementById("signupMessage").style.color = "red";
      return;
    }

    // Create the request payload
    const requestData = {
      FirstName: firstName,
      LastName: lastName,
      Login: username,
      Password: password,
    };

    console.log("Sending data: ", requestData);
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
      console.log("Server response:", data);
      if (response.ok) {
        //checking if this is duplicate user or not
        console.log("data given back from api: ", data);

        if (data.error == "duplicate user") {
          document.getElementById("signupMessage").textContent =
            "This username is already taken.";
          document.getElementById("signupMessage").style.color = "red";
        } else {
          document.getElementById("signupMessage").textContent =
            "Registration successful!";
          document.getElementById("signupMessage").style.color = "white";
          setTimeout(() => {
            window.location.href = "index.html"; // Redirect to login page
          }, 2000);
        }
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
