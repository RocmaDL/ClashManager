async function renderListing(page = 1) {
  const personnages = await provider.getPersonnages();
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = personnages.slice(start, end);

  let html = `<div class="container mx-auto px-4 py-4">
    <div class="flex flex-wrap justify-center">`;
  pageItems.forEach(item => {
    const card = new Card(item);
    html += card.render();
  });
  html += `</div>`;
  
  // Pagination
  html += `<div class="flex justify-center mt-4 space-x-2">`;
  if (page > 1) {
    html += `<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onclick="renderListing(${page - 1})">Précédent</button>`;
  }
  if (end < personnages.length) {
    html += `<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onclick="renderListing(${page + 1})">Suivant</button>`;
  }
  html += `</div></div>`;

  document.getElementById('app').innerHTML = html;

  // Lazy loading
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
  console.log(html);
}

function ajouterFavoris(id) {
  let favoris = JSON.parse(localStorage.getItem('favoris')) || [];
  if (!favoris.includes(id)) {
    favoris.push(id);
    localStorage.setItem('favoris', JSON.stringify(favoris));
    alert("Ajouté aux favoris !");
  } else {
    alert("Déjà dans les favoris !");
  }
}

window.renderListing = renderListing;
window.ajouterFavoris = ajouterFavoris;

// ...existing code...
