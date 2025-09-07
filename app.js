function updateNavbarActive(activePage) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.dataset.nav === activePage) {
      link.classList.add("font-bold");
    } else {
      link.classList.remove("font-bold");
    }
  });
}

function router() {
  const hash = location.hash.slice(1); // Supprime le #
  if (hash.startsWith("detail?")) {
    // Extraction du paramètre id (ex: detail?id=26000000)
    const params = new URLSearchParams(hash.split("?")[1]);
    const id = params.get("id");
    if (id) {
      renderDetail(id);
    } else {
      document.getElementById("app").innerHTML =
        "<p>Identifiant manquant pour la vue détail</p>";
    }
    updateNavbarActive(""); // aucun onglet actif
  } else if (hash.startsWith("detailSupport?")) {
    const params = new URLSearchParams(hash.split("?")[1]);
    const id = params.get("id");
    if (id) {
      renderDetailSupport(id);
    } else {
      document.getElementById("app").innerHTML =
        "<p>Identifiant manquant pour la vue détail support</p>";
    }
    updateNavbarActive("");
  } else if (hash === "favoris") {
    renderFavoris();
    updateNavbarActive("favoris");
  } else if (hash === "search") {
    renderSearch();
    updateNavbarActive("");
  } else if (hash === "supportItems") {
    renderSupportItems();
    updateNavbarActive("supportItems");
  } else if (hash === "listing" || hash === "") {
    renderListing();
    updateNavbarActive("listing");
  } else {
    document.getElementById("app").innerHTML = "<p>Page non trouvée</p>";
    updateNavbarActive("");
  }
}

window.addEventListener("load", () => {
  // Redirige vers "#listing" si aucun hash n'est défini
  if (!location.hash) {
    location.hash = "#listing";
  }
  router();
});

window.addEventListener("hashchange", router);
