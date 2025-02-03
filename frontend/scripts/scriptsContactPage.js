document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const addContactBtn = document.getElementById("addContactBtn");
    const contactForm = document.getElementById("contactForm");
    const defaultView = document.getElementById("defaultView");
    const cancelBtn = document.getElementById("cancelBtn");
    const saveBtn = document.getElementById("saveBtn");
    const savedForm = document.getElementById("saveForm");
  
    contactForm.style.display = "none";
    // Show form when button is clicked
    if (addContactBtn && contactForm && defaultView && cancelBtn) {
        // Show form when "Add Contact" button is clicked
        addContactBtn.addEventListener("click", function () {
            defaultView.style.display = "none"; // Hide default view
            contactForm.style.display = "flex"; // Show form
        });

        // Hide form and return to default view when "Cancel" is clicked
        cancelBtn.addEventListener("click", function () {
            contactForm.style.display = "none"; // Hide form
            defaultView.style.display = "flex"; // Show default view
        });

        saveBtn.addEventListener("click", function () {
            contactForm.style.display = "none";
            savedForm.style.display = "flex";
        });
    } else {
        console.error("One or more elements not found. Check your HTML structure.");
    }
  });
  