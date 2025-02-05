document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const contactButton = document.getElementById("addContactBtn");
  const addContact = document.getElementById("addContact");
  const cancelBtn = document.getElementById("cancelBtn");
  const saveBtn = document.getElementById("saveBtn");
  const donePage = document.getElementById("donePage");
  const searchBar = document.getElementById("searchInput");

  //only have one of these at a time
  contactForm.style.display = "none";
  donePage.style.display = "none";
  contactButton.addEventListener("click", function () {
    contactForm.style.display = "flex";
    addContact.style.display = "none";
  });
  cancelBtn.addEventListener("click", function () {
    contactForm.style.display = "none";
    addContact.style.display = "flex";
  });
  async function fetchSearchResults(query) {
    const userId = localStorage.getItem("UserID");
    try {
      const response = await fetch(
        "http://internlink.xyz/LAMPAPI/SearchContact.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: query, UserID: userId }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(query + " " + userId);
      console.log(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }
  searchBar.addEventListener("input", function () {
    fetchSearchResults(searchBar.value.trim());
  });
});
saveBtn.addEventListener("click", async function () {
  contactForm.style.display = "none";
  donePage.style.display = "flex";
  //for adding contacts
  const id = localStorage.getItem("UserID");
  const intID = Number(id);
  console.log(Number.isInteger(intID));
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phoneNumber").value;
  const jobTitle = document.getElementById("jobTitle").value;
  const company = document.getElementById("company").value;
  const linkedIn = document.getElementById("linkedin").value;
  const addingContact = {
    userId: intID,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    // jobTitle: document.getElementById("jobTitle").value,
    // company: document.getElementById("company").value,
    // linkedIn: document.getElementById("linkedin").value,
  };
  const searchContact = {
    search: firstName,
    UserID: intID,
  };
  console.log(searchContact);
  try {
    const response = await fetch(
      "http://internlink.xyz/LAMPAPI/SearchContact.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchContact),
      }
    );
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again later.");
  }
});
donePage.addEventListener("click", function () {
  donePage.style.display = "none";
  addContact.style.display = "flex";
});
