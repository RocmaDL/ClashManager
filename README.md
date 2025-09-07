# ClashManager

## Introduction

ClashManager est une application web permettant de consulter et gérer des items inspirés de Clash Royale. L'application offre une navigation fluide entre plusieurs vues grâce à l'utilisation des hash dans l'URL.

## Installation

- Ouvrez le fichier index.html dans votre navigateur.
- Pour de meilleures performances, utilisez un serveur web local (ex: Live Server, http-server).

## Navigation

L'application utilise les hash dans l'URL pour naviguer entre les vues. Voici quelques exemples :

- **Home / Listing**

  - URL : `http://localhost/chemin/vers/index.html#listing` ou simplement `http://localhost/chemin/vers/index.html`
  - Description : Affiche une liste paginée des items. La pagination vous permet de naviguer à travers plusieurs pages d'items.

- **Détail d’un Item**

  - URL : `http://localhost/chemin/vers/index.html#detail?id=<ID>`
  - Description : Affiche les informations détaillées d’un item sélectionné. Cliquez sur le bouton "Détails" sur une carte pour accéder à cette vue, où `<ID>` correspond à l’identifiant unique de l’item.

- **Favoris**

  - URL : `http://localhost/chemin/vers/index.html#favoris`
  - Description : Affiche les items que vous avez ajoutés à vos favoris. Ils sont sauvegardés localement pour une navigation future.

- **Recherche**
  - URL : `http://localhost/chemin/vers/index.html#search`
  - Description : Permet de rechercher un item par son nom. Tapez votre requête dans la barre de recherche pour filtrer la liste des items.

## Technologies utilisées

- HTML, CSS, JavaScript
- [Tailwind CSS](https://tailwindcss.com)
- API Fetch pour récupérer les données depuis un fichier JSON

## Auteurs

- [RocmaDL](https://www.github.com/RocmaDL)
