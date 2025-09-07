async function renderDetailSupport(itemId) {
    const supports = await provider.getSupportItems();
    const item = supports.find((p) => p.id == itemId);
    if (!item) {
      document.getElementById("app").innerHTML = "<p>Support non trouvé</p>";
      return;
    }
    document.getElementById("app").innerHTML = `
      <div class="container mx-auto p-4">
        <button class="mb-4 text-blue-400 hover:underline" onclick="history.back()">← Retour</button>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-4 rounded shadow-lg">
          <div class="flex flex-col items-center">
            <img class="w-48 h-48 object-contain rounded lazy" data-src="${item.iconUrls.medium}" alt="${item.name}">
          </div>
          <div>
            <h2 class="text-3xl font-bold mb-2">${item.name}</h2>
            <p class="mb-1"><span class="font-bold">Niveau max:</span> ${item.maxLevel}</p>
            <p class="mb-1"><span class="font-bold">Rareté:</span> ${item.rarity}</p>
            <!-- Autres informations si disponible -->
          </div>
        </div>
      </div>
    `;
  
    const lazyImage = document.querySelector(".lazy");
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
  }
  
  window.renderDetailSupport = renderDetailSupport;
