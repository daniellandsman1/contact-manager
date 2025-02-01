// document.addEventListener("DOMContentLoaded", function () {
//   const loginForm = document.getElementById("loginForm");

//   if (!loginForm) {
//     console.error("Form not found!");
//     return;
//   }

//   loginForm.addEventListener("submit", async function (event) {
//     event.preventDefault(); // Prevent default form submission

//     const usernameInput = document.getElementById("username");
//     const passwordInput = document.getElementById("password");

//     if (!usernameInput || !passwordInput) {
//       console.error("Username or Password field not found!");
//       return;
//     }

//     const username = usernameInput.value.trim();
//     const password = passwordInput.value.trim();

//     if (!username || !password) {
//       alert("Please fill in both username and password.");
//       return;
//     }

//     console.log("Sending data to the server:", { username, password });

//     try {
//       const response = await fetch("https://internlink.xyz/LAMPAPI/Login.php", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: username,
//           password: password,
//         }),
//       });

//       const data = await response.json();
//       console.log("Server response:", data);

//       if (response.ok && data.success) {
//         alert("Login successful!");
//         window.location.href = "contactPage.html"; // Redirect on success
//       } else {
//         alert(data.message || "Invalid credentials. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong. Please try again later.");
//     }
//   });
// });

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

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      alert("Please fill in both username and password.");
      return;
    }

    console.log("Sending data to the server:", { username, password });

    // Make request to PHP backend using XMLHttpRequest
    const xhr = new XMLHttpRequest();
    const url = "https://internlink.xyz/LAMPAPI/Login.php";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            console.log("Server response:", response);

            if (response.success) {
              alert("Login successful!");
              // Store user data in local storage
              localStorage.setItem("userId", response.id);
              localStorage.setItem("firstName", response.firstName);
              localStorage.setItem("lastName", response.lastName);

              // Redirect on success
              window.location.href = "contactPage.html";
            } else {
              alert(
                response.message || "Invalid credentials. Please try again."
              );
            }
          } catch (error) {
            console.error("Error parsing JSON response:", error);
            alert("Unexpected server response.");
          }
        } else {
          console.error("API request failed with status:", xhr.status);
          alert("Login request failed. Please try again.");
        }
      }
    };

    // Convert data to JSON and send request
    const jsonPayload = JSON.stringify({
      username: username,
      password: password,
    });
    xhr.send(jsonPayload);
  });
});
