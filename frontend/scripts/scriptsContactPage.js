document
  .getElementById("searchInput")
  .addEventListener("input", async function () {
    const query = this.value.trim();
    if (!query) {
      document.getElementById("searchResults").innerHTML = "";
      return;
    }

    // Example API request
    const response = await fetch(`https://api.example.com/search?q=${query}`);
    const results = await response.json();

    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = results
      .map((item) => `<p>${item.name}</p>`)
      .join("");
  });
