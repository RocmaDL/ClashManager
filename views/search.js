async function renderSearch() {
  document.getElementById('app').innerHTML = `
    <div class="container mx-auto px-4 py-4">
      <input id="searchInput" type="text" placeholder="Rechercher..." class="w-full p-2 border rounded mb-4" onkeyup="executeSearch()">
      <div id="searchResults" class="flex flex-wrap justify-center"></div>
    </div>
  `;
}

async function executeSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const personnages = await provider.getPersonnages();
  const results = personnages.filter(p => p.name.toLowerCase().includes(query));
  
  let html = '';
  results.forEach(item => {
    const card = new Card(item);
    html += card.render();
  });
  document.getElementById('searchResults').innerHTML = html;
  
  const lazyImages = document.querySelectorAll('.lazy');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          obs.unobserve(entry.target);
        }
      });
    });
    lazyImages.forEach(img => observer.observe(img));
  } else {
    lazyImages.forEach(img => { img.src = img.dataset.src; });
  }
}

window.renderSearch = renderSearch;
window.executeSearch = executeSearch;
