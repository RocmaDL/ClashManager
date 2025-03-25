function router() {
  const hash = location.hash.slice(1); // Supprime le #
  if (hash.startsWith('detail')) {
    // Extraction du paramètre id (ex: detail?id=26000000)
    const params = new URLSearchParams(hash.split('?')[1]);
    const id = params.get('id');
    if (id) {
      renderDetail(id);
    } else {
      document.getElementById('app').innerHTML = '<p>Identifiant manquant pour la vue détail</p>';
    }
  } else if (hash === 'favoris') {
    renderFavoris();
  } else if (hash === 'search') {
    renderSearch();
  } else if (hash === 'listing' || hash === '') {
    renderListing();
  } else {
    document.getElementById('app').innerHTML = '<p>Page non trouvée</p>';
  }
}
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
// ...existing code...
