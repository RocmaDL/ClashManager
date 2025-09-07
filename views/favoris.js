async function renderFavoris() {
  const favoris = JSON.parse(localStorage.getItem("favoris"));
  const personnages = await provider.getPersonnages();
  const troupsTour = await provider.getSupportItems();
  const favorisItems = [];
  favoris.forEach((id) => {
    const personnage = personnages.find((p) => p.id == id);
    const troupTour = troupsTour.find((p) => p.id == id);
    if (personnage) {
      favorisItems.push(personnage);
    }
    else if (troupTour) {
      favorisItems.push(troupTour);
    }
  });
  console.log("Favoris", favorisItems);

  let html = `<div class="container mx-auto px-4 py-4">
    <h2 class="text-2xl font-bold mb-4">Favoris</h2>
    <div class="flex flex-wrap justify-center">`;
  favorisItems.forEach((item) => {
    const card = new Card(item);
    html += card.render();
  });
  html += `</div></div>`;

  document.getElementById("app").innerHTML = html;

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

window.renderFavoris = renderFavoris;
