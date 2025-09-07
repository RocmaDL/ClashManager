async function renderListing(page = 1, sortBy = "") {
  console.log("Redirection vers #listing");
  let personnages = await provider.getPersonnages();

  // Si la navbar search a une valeur, filtrer les résultats
  const query =
    document.getElementById("navbarSearchInput")?.value.toLowerCase() || "";
  if (query.trim() !== "") {
    // Filtrer par nom dans les personnages et aussi dans supportItems si besoin
    personnages = personnages.filter((p) =>
      p.name.toLowerCase().includes(query)
    );
  }

  let sortedItems = [...personnages];
  if (sortBy === "elixir") {
    sortedItems.sort((a, b) => a.elixirCost - b.elixirCost);
  } else if (sortBy === "rareté") {
    sortedItems.sort((a, b) => a.rarity.localeCompare(b.rarity));
  } else if (sortBy === "niveau") {
    sortedItems.sort((a, b) => a.maxLevel - b.maxLevel);
  }
  const itemsPerPage = 12;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = sortedItems.slice(start, end);

  let html = `<div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Personnages</h2>
    <!-- Barre de tri -->
    <div class="flex justify-between items-center mb-4">
      <div>
        <select id="sortSelect" class="p-2 border rounded bg-gray-700 text-gray-200" onchange="renderListing(1, this.value)">
          <option value="">Trier par...</option>
          <option value="elixir" ${
            sortBy === "elixir" ? "selected" : ""
          }>Élixir</option>
          <option value="rareté" ${
            sortBy === "rareté" ? "selected" : ""
          }>Rareté</option>
          <option value="niveau" ${
            sortBy === "niveau" ? "selected" : ""
          }>Niveau</option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">`;
  pageItems.forEach((item) => {
    const card = new Card(item);
    html += card.render();
  });
  html += `</div>`;

  // Pagination
  html += `<div class="flex justify-center mt-4 space-x-2">`;
  if (page > 1) {
    html += `<button class="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded" onclick="renderListing(${
      page - 1
    }, document.getElementById('sortSelect').value)">Précédent</button>`;
  }
  if (end < sortedItems.length) {
    html += `<button class="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-4 rounded" onclick="renderListing(${
      page + 1
    }, document.getElementById('sortSelect').value)">Suivant</button>`;
  }
  html += `</div></div>`;

  document.getElementById("app").innerHTML = html;

  // Lazy loading
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

function ajouterFavoris(id) {
  let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
  const index = favoris.indexOf(id);
  if (index === -1) {
    favoris.push(id);
  } else {
    favoris.splice(index, 1);
  }
  localStorage.setItem("favoris", JSON.stringify(favoris));
  sessionStorage.setItem("favoris", JSON.stringify(favoris));

  // Recharger la vue active en fonction du hash
  if (location.hash === "#favoris") {
    renderFavoris();
  } else if (location.hash.startsWith("detailSupport")) {
    renderDetailSupport(id);
  } else if (location.hash.startsWith("detail")) {
    renderDetail(id);
  } else if (location.hash === "#supportItems") {
    renderSupportItems();
  } else {
    renderListing();
  }
}

window.renderListing = renderListing;
window.ajouterFavoris = ajouterFavoris;
