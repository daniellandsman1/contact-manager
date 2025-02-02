document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  if (!loginForm) {
    console.error("Form not found!");
    return;
  }

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      alert("Please fill in both username and password.");
      return;
    }

    const loginInfo = {
      login: username,
      password: password,
    };

    // console.log("Sending data to the server:", {
    //   username,
    //   password,
    // });

    try {
      const response = await fetch("http://internlink.xyz/LAMPAPI/Login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        console.log("Api call successful:");
        if (data.error == "No Records Found") {
          // console.log("username or password is incorrect");
          loginMessage.textContent = "Username or Password is incorrect.";
        } else {
          loginMessage.textContent = "";
          console.log("Login successful");

          window.location.href = "../pages/contactPage.html";
        }
      } else {
        alert(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  });
});
