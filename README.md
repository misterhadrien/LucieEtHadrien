# Lucie & Hadrien — 15 mai 2027

Site statique du mariage de Lucie & Hadrien (Provence, 15 mai 2027).
HTML5 / CSS3 / JavaScript vanilla — aucun backend Node, hébergement GitHub Pages.

## Structure

```
/
├── index.html        — page d'accueil (hero, histoire, compte à rebours,
│                       programme, lieu, carte interactive, hébergements,
│                       infos pratiques, dress code, photos, cagnotte, RSVP,
│                       galerie, FAQ)
├── provence.html     — mini-guide touristique pour les invités
├── playlist.html     — propositions de chansons (Supabase)
├── livre-dor.html    — livre d'or (Supabase)
├── style.css
├── script.js         — navigation, compte à rebours, animations, placeholders
├── calendar.ics      — événement pour Apple Calendar / Outlook
├── CNAME             → lucie-et-hadrien.fr
├── favicon.svg
├── js/
│   ├── config.js     — ⭐ TOUTE la configuration modifiable (voir ci-dessous)
│   ├── calendar.js   — lien Google Calendar
│   ├── map.js        — carte interactive Leaflet + OpenStreetMap
│   ├── playlist.js   — formulaire + affichage des chansons
│   └── livre-dor.js  — formulaire + affichage des messages
└── images/           — photos (placeholders automatiques si absentes)
```

## Configuration centrale : `js/config.js`

Ce fichier contient tout ce que vous aurez à modifier au fil des mois :

- `event` — titre, dates, lieu de l'événement (calendrier)
- `map.venueCoords` — **coordonnées du lieu du mariage** (format `{ lat: 43.5, lng: 5.4 }`).
  Tant qu'elles sont `null`, la carte reste centrée sur une zone générique de Provence.
- `stays` — liste des hébergements (nom, type, photo, distance, prix, description, lien)
- `places` — lieux affichés sur la carte (une catégorie parmi : `mariage`, `hotel`,
  `gite`, `parking`, `gare`, `aeroport`, `restaurant`, `cafe`, `supermarche`,
  `pharmacie`, `services`, `tourisme`). Un lieu sans coordonnées n'est pas affiché.
- `supabase` — URL + clé « anon » pour la playlist et le livre d'or

Toutes les informations manquantes sont balisées `[À COMPLÉTER]` ou `[LIEN … À AJOUTER]`
dans `index.html` et `js/config.js`.

## Activer la playlist et le livre d'or (Supabase — gratuit)

Ces fonctionnalités nécessitent un stockage externe (GitHub Pages est 100 % statique).
Procédure détaillée dans les commentaires de `js/config.js` :

1. Créez un projet gratuit sur [supabase.com](https://supabase.com).
2. Créez les tables `playlist` et `guestbook` (schéma dans `js/config.js`).
3. Activez Row Level Security : `SELECT` + `INSERT` pour `anon` seulement
   (la modération/suppression se fait depuis le tableau de bord Supabase).
4. Copiez l'URL du projet et la clé **anon** (publique) dans `SITE_CONFIG.supabase`.

⚠️ Ne mettez jamais la clé `service_role` ni un mot de passe dans le code client.

Tant que Supabase n'est pas configuré, les deux pages affichent des exemples
clairement identifiés et les formulaires expliquent que le service arrive bientôt.

## Déploiement GitHub Pages

1. Poussez ces fichiers dans un repository GitHub.
2. Settings → Pages → Source : branche `main`, dossier `/ (root)`.
3. Le fichier `CNAME` associe le domaine `lucie-et-hadrien.fr`.
4. Chez votre registrar : A records vers `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153`, `185.199.111.153` (ou CNAME `www` → `<user>.github.io`).
5. Après propagation, activez « Enforce HTTPS ».

## Test local

Ouvrez simplement `index.html` dans un navigateur — aucun serveur requis.
(Note : la carte Leaflet et les polices Google nécessitent une connexion internet.)
