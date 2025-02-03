document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const addContactBtn = document.getElementById("addContactBtn");
    const contactForm = document.getElementById("contactForm");
    const defaultView = document.getElementById("defaultView");
    const cancelBtn = document.getElementById("cancelBtn");
    const saveBtn = document.getElementById("saveBtn");
    const savedForm = document.getElementById("savedForm");
    const doneBtn = document.getElementById("doneBtn");
    const uploadImageInput = document.getElementById("uploadImage");
    const formPic = document.querySelector(".form-pic");
  
    // Default image URL
    const defaultImageURL = "../gallery/default-profile.png";  // Make sure to update this path if needed
  
    contactForm.style.display = "none";
  
    // Show form when "Add Contact" button is clicked
    addContactBtn.addEventListener("click", function () {
      defaultView.style.display = "none"; // Hide default view
      contactForm.style.display = "flex"; // Show form
    });
  
    // Hide form and return to default view when "Cancel" is clicked
    cancelBtn.addEventListener("click", function () {
      formPic.style.backgroundImage = `url(${defaultImageURL})`; // Reset to default image
      uploadImageInput.value = "";  // Reset the file input
      contactForm.style.display = "none"; // Hide form
      defaultView.style.display = "flex"; // Show default view
    });
  
    // Save form and display saved screen
    saveBtn.addEventListener("click", function () {
      formPic.style.backgroundImage = `url(${defaultImageURL})`; // Reset to default image
      uploadImageInput.value = "";  // Reset the file input
      contactForm.style.display = "none";
      savedForm.style.display = "flex"; // Show saved form screen
    });
  
    // Done button to return to default view
    doneBtn.addEventListener("click", function () {
      savedForm.style.display = "none"; // Hide saved form
      defaultView.style.display = "flex"; // Show default view
    });
  
    // File upload input change listener
    uploadImageInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          formPic.style.backgroundImage = `url(${e.target.result})`; // Set selected image as background
        };
        reader.readAsDataURL(file); // Read file and convert to base64
      }
    });
  
    // Trigger file input when user clicks on the image
    formPic.addEventListener("click", function () {
      uploadImageInput.click(); // Trigger hidden file input when image is clicked
    });
  });
  