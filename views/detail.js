async function renderDetail(personnageId) {
  const personnages = await provider.getPersonnages();
  const troupTour = await provider.getSupportItems();
  let personnage = personnages.find((p) => p.id == personnageId);
  if (!personnage) {
    personnage = troupTour.find((p) => p.id == personnageId); 
    if (!personnage) {
      document.getElementById("app").innerHTML = "<p>Personnage non trouvé</p>";
      return;
    }
  }
  // On commence par afficher l'image de base
  let isEvolution = false;
  function toggleImage() {
    isEvolution = !isEvolution;
    const imgElement = document.getElementById("detailImage");
    imgElement.dataset.current = isEvolution ? "evo" : "base";
    imgElement.src =
      isEvolution && personnage.iconUrls.evolutionMedium
        ? personnage.iconUrls.evolutionMedium
        : personnage.iconUrls.medium;
    document.getElementById("toggleBtn").innerText = isEvolution
      ? "Voir originale"
      : "Voir évolution";
  }

  document.getElementById("app").innerHTML = `
    <div class="container mx-auto p-4">
      <button class="mb-4 text-blue-400 hover:underline" onclick="history.back()">← Retour</button>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-4 rounded shadow-lg">
        <div class="flex flex-col items-center">
          <img id="detailImage" class="w-48 h-48 object-contain rounded lazy" data-src="${
            personnage.iconUrls.medium
          }" alt="${personnage.name}" data-current="base">
          ${
            personnage.iconUrls.evolutionMedium
              ? `<button id="toggleBtn" class="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded" onclick="toggleImage()">Voir évolution</button>`
              : ""
          }
        </div>
        <div>
          <h2 class="text-3xl font-bold mb-2">${personnage.name}</h2>
          <p class="mb-1"><span class="font-bold">Niveau max:</span> ${
            personnage.maxLevel
          }</p>
          <p class="mb-1"><span class="font-bold">Coût en Élixir:</span> ${
            personnage.elixirCost
          }</p>
          <p class="mb-1 ${
            rarityColors[personnage.rarity.toLowerCase()] || ""
          }"><span class="font-bold">Rareté:</span> ${personnage.rarity}</p>
          <!-- D'autres informations pertinentes -->
          <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onclick="ajouterFavoris(${
            personnage.id
          })">
            Ajouter aux favoris
          </button>
        </div>
      </div>
    </div>
  `;

  // Lazy loading
  const lazyImage = document.getElementById("detailImage");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          obs.unobserve(entry.target);
        }
      });
    });
    observer.observe(lazyImage);
  } else {
    lazyImage.src = lazyImage.dataset.src;
  }
  window.toggleImage = toggleImage;
}

// Export éventuel si vous utilisez un module
// export { renderDetail };
