/* ==========================================================================
   Configuration du site — Lucie & Hadrien
   ==========================================================================
   Ce fichier regroupe les réglages externes modifiables facilement.

   IMPORTANT — Sécurité :
   - La clé "anon" de Supabase est conçue pour être publique côté client
     (sécurisation par Row Level Security côté base).
   - Ne JAMAIS mettre la clé "service_role" ni un mot de passe dans ce fichier.
   - Tant que les placeholders ne sont pas remplacés, les formulaires
     (playlist, livre d'or) restent en mode démonstration locale.
   ========================================================================== */

var SITE_CONFIG = {

  // ----- Événement (utilisé par le compte à rebours et le calendrier) -----
  event: {
    title: "💍 Mariage de Lucie & Hadrien",
    description: "Le mariage de Lucie & Hadrien — 15 mai 2027",
    location: "Prieuré de Badasset",
    start: "20270515T143000",   // format ICS : 15 mai 2027, 14h30 (heure locale)
    end: "20270516T020000"      // fin indicative : 2h du matin
  },

  // ----- Carte interactive (Leaflet + OpenStreetMap, gratuit) -----
  map: {
    // Coordonnées PROVISOIRES du lieu de mariage — À REMPLACER par les vraies.
    // format : { lat: 43.5297, lng: 5.4474 }
    venueCoords: { lat: 43.662572915660775, lng: 5.184551388295699 },
    // Centre de repli tant que les coordonnées du lieu ne sont pas connues
    // (zone Provence) :
    fallbackCenter: { lat: 43.662572915660775, lng: 5.184551388295699 },
    zoom: 12
  },

  // ----- Hébergements affichés sur la page d'accueil -----
  // Ajoutez/supprimez librement des objets dans cette liste.
  stays: [
    {
      name: "[Hébergement à ajouter]",
      type: "🏨 Hôtel",
      image: "images/hebergement-01.jpg",
      distance: "[À COMPLÉTER]",
      price: "[À COMPLÉTER]",
      description: "[À COMPLÉTER — courte description de l'hébergement.]",
      link: "[LIEN À AJOUTER]"
    },
    {
      name: "[Hébergement à ajouter]",
      type: "🏡 Chambre d'hôtes",
      image: "images/hebergement-02.jpg",
      distance: "[À COMPLÉTER]",
      price: "[À COMPLÉTER]",
      description: "[À COMPLÉTER — courte description de l'hébergement.]",
      link: "[LIEN À AJOUTER]"
    },
    {
      name: "[Hébergement à ajouter]",
      type: "🌿 Gîte",
      image: "images/hebergement-03.jpg",
      distance: "[À COMPLÉTER]",
      price: "[À COMPLÉTER]",
      description: "[À COMPLÉTER — courte description de l'hébergement.]",
      link: "[LIEN À AJOUTER]"
    }
  ],

  // ----- Lieux affichés sur la carte interactive -----
  // categories disponibles : mariage, hotel, gite, parking, gare, aeroport,
  //                         restaurant, cafe, supermarche, pharmacie, services, tourisme
  // "coords" : null tant que les coordonnées réelles ne sont pas connues
  // (le lieu n'est alors pas affiché sur la carte).
  places: [
    {
      name: "Prieuré de Badasset",
      category: "mariage",
      coords: [43.662742, 5.184049], // [À COMPLÉTER] ex. : [43.5297, 5.4474]
      address: "D22, 13116 Vernègues",
      description: "Le lieu du mariage."
    },
    { name: "[Hôtel à ajouter]", category: "hotel", coords: null, address: "[À COMPLÉTER]", description: "" },
    { name: "[Gîte / chambre d'hôtes à ajouter]", category: "gite", coords: null, address: "[À COMPLÉTER]", description: "" },
    { name: "[Parking à ajouter]", category: "parking", coords: null, address: "[À COMPLÉTER]", description: "" },
    { name: "[Gare à ajouter]", category: "gare", coords: null, address: "[À COMPLÉTER]", description: "" },
    { name: "[Aéroport à ajouter]", category: "aeroport", coords: null, address: "[À COMPLÉTER]", description: "" },
    { name: "[Restaurant à ajouter]", category: "restaurant", coords: null, address: "[À COMPLÉTER]", description: "" },
    { name: "[Café / boulangerie à ajouter]", category: "cafe", coords: null, address: "[À COMPLÉTER]", description: "" },
    { name: "[Supermarché à ajouter]", category: "supermarche", coords: null, address: "[À COMPLÉTER]", description: "" },
    { name: "[Pharmacie à ajouter]", category: "pharmacie", coords: null, address: "[À COMPLÉTER]", description: "" },
    { name: "[Service utile à ajouter]", category: "services", coords: null, address: "[À COMPLÉTER]", description: "" },
    { name: "[Lieu touristique à ajouter]", category: "tourisme", coords: null, address: "[À COMPLÉTER]", description: "" }
  ],

  // ----- Supabase (playlist & livre d'or) -----
  // 1. Créez un projet gratuit sur https://supabase.com
  // 2. Créez les tables :
  //      playlist  (id bigint generated, created_at timestamptz default now(),
  //                 first_name text, last_name text, song_title text,
  //                 artist text, message text)
  //      guestbook (id bigint generated, created_at timestamptz default now(),
  //                 first_name text, last_name text, message text)
  //    avec Row Level Security :
  //      - INSERT + SELECT autorisés pour le rôle "anon"
  //      - DELETE réservé au rôle "service_role" (modération par vous)
  // 3. Copiez l'URL du projet et la clé "anon" ci-dessous.
  supabase: {
    url: "https://dgnqyrrpwlulowbfswtm.supabase.co",        // ex. "https://xxxxxxxx.supabase.co"
    anonKey: "sb_publishable_XRQ-Mp2Uc-wobaZjy0t7iQ_CxomcXyT"     // clé publique "anon" (jamais la clé service_role)
  }
};
