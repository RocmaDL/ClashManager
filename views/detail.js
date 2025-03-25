async function renderDetail(personnageId) {
  // Récupérer la liste des personnages depuis le provider
  const personnages = await provider.getPersonnages();
  const personnage = personnages.find(p => p.id == personnageId);
  if (!personnage) {
    document.getElementById('app').innerHTML = '<p>Personnage non trouvé</p>';
    return;
  }
  
  // Construction du template pour afficher le détail
  document.getElementById('app').innerHTML = `
    <h2>${personnage.name}</h2>
    <img data-src="${personnage.iconUrls.medium}" alt="${personnage.name}" class="lazy">
    <p>Niveau max: ${personnage.maxLevel}</p>
    <p>Coût en élixir: ${personnage.elixirCost}</p>
    <!-- ... autres informations pertinents ... -->
  `;
  
  // Implémentation du lazy loading
  const lazyImage = document.querySelector('.lazy');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(lazyImage);
  } else {
    // Fallback simple
    lazyImage.src = lazyImage.dataset.src;
  }
}

// Export éventuel si vous utilisez un module
// export { renderDetail };

// ...existing code...
