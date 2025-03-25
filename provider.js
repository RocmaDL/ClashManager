class Provider {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }
  async fetchData() {
    try {
      const response = await fetch(this.apiEndpoint);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des données", error);
      return null;
    }
  }
  async getPersonnages() {
    const data = await this.fetchData();
    return data && data.items ? data.items : [];
  }
  async getSupportItems() {
    const data = await this.fetchData();
    return data && data.supportItems ? data.supportItems : [];
  }
}
const provider = new Provider(API_ENDPOINT);
// ...existing code...
