async function renderSupportItems(page = 1, sortBy = "") {
    const data = await provider.getSupportItems();
    let supportItems = data;
    // Tri similaire au listing
    if (sortBy === "elixir") {
      supportItems.sort((a, b) => a.elixirCost - b.elixirCost);
    } else if (sortBy === "rareté") {
      supportItems.sort((a, b) => a.rarity.localeCompare(b.rarity));
    } else if (sortBy === "niveau") {
      supportItems.sort((a, b) => a.maxLevel - b.maxLevel);
    }
    const itemsPerPage = 12;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = supportItems.slice(start, end);
  
    let html = `<div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Troupes de tours</h2>
      <!-- Barre de tri -->
      <div class="flex justify-between items-center mb-4">
        <select id="sortSupportSelect" class="p-2 border rounded bg-gray-700 text-gray-200" onchange="renderSupportItems(1, this.value)">
          <option value="">Trier par...</option>
          <option value="elixir">Élixir</option>
          <option value="rareté">Rareté</option>
          <option value="niveau">Niveau</option>
        </select>
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
      html += `<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onclick="renderSupportItems(${
        page - 1
      }, document.getElementById('sortSupportSelect').value)">Précédent</button>`;
    }
    if (end < supportItems.length) {
      html += `<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onclick="renderSupportItems(${
        page + 1
      }, document.getElementById('sortSupportSelect').value)">Suivant</button>`;
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
  
  window.renderSupportItems = renderSupportItems;
  