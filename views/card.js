class Card {
  constructor(personnage) {
    this.personnage = personnage;
  }
  render() {
    return `
      <div class="max-w-xs bg-white rounded overflow-hidden shadow-lg m-2 hover:shadow-xl transition-shadow duration-300">
        <img class="w-full lazy" data-src="${this.personnage.iconUrls.medium}" alt="${this.personnage.name}">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${this.personnage.name}</div>
          <p class="text-gray-700">Niveau max : ${this.personnage.maxLevel}</p>
          <p class="text-gray-700">Élixir : ${this.personnage.elixirCost}</p>
          <p class="text-gray-600 text-sm">Rareté : ${this.personnage.rarity}</p>
        </div>
        <div class="px-6 pt-4 pb-2 flex justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onclick="location.hash='detail?id=${this.personnage.id}'">
            Détails
          </button>
          <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded" onclick="ajouterFavoris(${this.personnage.id})">
            Favori
          </button>
        </div>
      </div>
    `;
  }
}
// ...existing code...
