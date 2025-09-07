class Provider {
  constructor(endpoints) {
    // endpoints: { items: "...", supportItems: "..." }
    this.endpoints = endpoints;
  }
  async fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des données", error);
      return null;
    }
  }
  async getPersonnages() {
    const data = await this.fetchData(this.endpoints.items);
    console.log("Données des personnages", data);
    return data;
  }
  async getSupportItems() {
    const data = await this.fetchData(this.endpoints.supportItems);
    console.log("Données des troupes de tours", data);
    return data;
  }
}
// Mise à jour de l'initialisation des endpoints
const provider = new Provider({
  items: "http://localhost:3000/items",
  supportItems: "http://localhost:3000/supportItems",
});
