class Provider {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }
  async fetchData(dataType) {
    try {
      const response = await fetch(this.apiEndpoint+"/"+dataType);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des données", error);
      return null;
    }
  }
  async getPersonnages() {
    const data = await this.fetchData("items");
    return data;
  }
  async getSupportItems() {
    const data = await this.fetchData("supportItems");
    return data;
  }
}
const provider = new Provider(API_ENDPOINT);
// ...existing code...
