async function renderSearch() {
  document.getElementById("app").innerHTML = `
    <div class="container mx-auto p-4">
      <input id="searchInput" type="text" placeholder="Rechercher..." class="w-full p-2 border rounded mb-4 bg-gray-700 text-gray-200" onkeyup="executeSearch()">
      <div id="searchResults" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"></div>
    </div>
  `;
}

async function executeSearch() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  if (query.trim() === "") {
    renderListing();
    return;
  }
  let personnages = await provider.getPersonnages();
  let supports = await provider.getSupportItems();
  let results = [...personnages, ...supports].filter((p) =>
    p.name.toLowerCase().includes(query)
  );

  let html = "";
  results.forEach((item) => {
    const card = new Card(item);
    html += card.render();
  });
  document.getElementById("searchResults").innerHTML = html;

  const lazyImages = document.querySelectorAll(".lazy");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          obs.unobserve(entry.target);
        }
      });
    });
    lazyImages.forEach((img) => observer.observe(img));
  } else {
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
    });
  }
}

window.renderSearch = renderSearch;
window.executeSearch = executeSearch;
