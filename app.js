function router() {
  const view = location.hash.slice(1) || 'listing';
  // ...existing code...
  switch (view) {
    case 'listing':
      // afficher la vue listing (ex: provider.getPersonnages() et rendu)
      break;
    case 'detail':
      // afficher la vue détail (pour un personnage donné)
      break;
    case 'favoris':
      // afficher la vue des favoris
      break;
    default:
      // afficher "page non trouvée" ou rediriger
      break;
  }
  // ...existing code...
}
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
// ...existing code...
