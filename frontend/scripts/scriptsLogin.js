document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput"); // Check if input is found
  const resultsContainer = document.getElementById("searchResults"); // Check if results container is found

  if (!searchInput) {
    console.error("🔴 ERROR: searchInput element not found!");
    return;
  }
  if (!resultsContainer) {
    console.error("🔴 ERROR: searchResults container not found!");
    return;
  }

  console.log("✅ searchInput and searchResults found.");

  // 🔹 Hardcoded test data
  const testContacts = [
    {
      FirstName: "Alice",
      LastName: "Johnson",
      Phone: "123-456-7890",
      Email: "alice@example.com",
    },
    {
      FirstName: "Bob",
      LastName: "Smith",
      Phone: "987-654-3210",
      Email: "bob@example.com",
    },
    {
      FirstName: "Charlie",
      LastName: "Brown",
      Phone: "555-555-5555",
      Email: "charlie@example.com",
    },
    {
      FirstName: "David",
      LastName: "Lee",
      Phone: "111-222-3333",
      Email: "david@example.com",
    },
  ];

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim().toLowerCase();
    console.log("🔍 User typed:", query);

    if (query.length === 0) {
      console.log("❌ Input is empty. Clearing results.");
      resultsContainer.innerHTML = ""; // Clear results if input is empty
      return;
    }

    // 🔹 Filter hardcoded contacts based on the search query
    const filteredContacts = testContacts.filter(
      (contact) =>
        contact.FirstName.toLowerCase().includes(query) ||
        contact.LastName.toLowerCase().includes(query) ||
        contact.Phone.includes(query) ||
        contact.Email.toLowerCase().includes(query)
    );

    console.log("🟢 Filtered Contacts:", filteredContacts);

    // 🔹 Display results
    if (filteredContacts.length > 0) {
      resultsContainer.innerHTML = filteredContacts
        .map(
          (contact) =>
            `<p>${contact.FirstName} ${contact.LastName} - ${contact.Phone} - ${contact.Email}</p>`
        )
        .join("");
      console.log("✅ Results Updated!");
    } else {
      resultsContainer.innerHTML = "<p>No results found.</p>";
      console.log("⚠️ No results found.");
    }
  });
});
