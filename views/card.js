const rarityColors = {
  common: "text-blue-500",
  rare: "text-amber-800",
  epic: "text-purple-600",
  legendary: "text-pink-500",
  champion: "text-yellow-500",
};
const rarityShadow = {
  common: "shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]",
  rare: "shadow-[0_0_10px_2px_rgba(251,191,36,0.5)]",
  epic: "shadow-[0_0_10px_2px_rgba(168,85,247,0.5)]",
  legendary: "shadow-[0_0_10px_2px_rgba(236,72,153,0.5)]",
  champion: "shadow-[0_0_10px_2px_rgba(234,179,8,0.5)]",
};

class Card {
  constructor(personnage) {
    this.personnage = personnage;
  }
  estFavori() {
    const favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    let isFav = false;
    favoris.forEach((id) => {
      if (id == this.personnage.id) {
        isFav = true;
      }
    });
    return isFav;
  }
  render() {
    const favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    const isFav = this.estFavori();
    return `
      <div class="w-40 bg-gray-800 rounded-2xl overflow-hidden transition-transform transform hover:scale-105 m-2 border border-transparent hover:border-2 ${
        rarityShadow[this.personnage.rarity.toLowerCase()] || ""
      }">
        <img class="w-full h-24 object-contain lazy" data-src="${
          this.personnage.iconUrls.medium
        }" alt="${this.personnage.name}">
        <div class="p-2">
          <div class="font-bold text-base mb-1">${this.personnage.name}</div>
          <p class="text-sm">Niv.: ${this.personnage.maxLevel}</p>
          <p class="text-sm">Élixir: ${this.personnage.elixirCost}</p>
          <p class="text-xs ${
            rarityColors[this.personnage.rarity.toLowerCase()] || ""
          }">Rareté: ${this.personnage.rarity}</p>
        </div>
        <div class="px-2 pb-2 flex justify-between items-center">
          <button class="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded transition-colors" onclick="location.hash='detail?id=${
            this.personnage.id
          }'">
            Détails
          </button>
          <button class="toggleFav text-red-500 hover:text-red-700 transition-colors" onclick="ajouterFavoris(${
            this.personnage.id
          });" title="Favori">
            ${
              isFav
                ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" viewBox="0 0 20 20">
                     <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657l-6.828-6.829a4 4 0 010-5.656z"/>
                   </svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21 4.318 12.682a4.5 4.5 0 010-6.364z" />
                   </svg>`
            }
          </button>
        </div>
      </div>
    `;
  }
}
