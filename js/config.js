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
    zoom: 9
  },

  // ----- Hébergements affichés sur la page d'accueil -----
  // Ajoutez/supprimez librement des objets dans cette liste.
  stays: [
    {
      name: "Village Pont Royal en Provence Pierre & Vacances",
      type: "🏨 Hôtel",
      image: "images/hebergement-01.jpg",
      distance: "10 minutes en voiture",
      price: "[À COMPLÉTER]",
      description: "[À COMPLÉTER — courte description de l'hébergement.]",
      link: "[LIEN À AJOUTER]"
    },
    {
      name: "Camping Lou Paradou",
      type: "🏕️ Camping",
      image: "images/hebergement-02.jpg",
      distance: "10 minutes en voiture",
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
    { name: "Prieuré de Badasset", category: "mariage", coords: [43.662572915660775, 5.184551388295699], address: "D22, 13116 Vernègues", description: "Le lieu du mariage." },
    { name: "Village Pont Royal en Provence Pierre & Vacances", category: "hotel", coords: [43.70948752142142, 5.222498364709028], address: "Domaine et Golf de Pont-Royal, 13370 Mallemort, France", description: "À 10 minutes en voiture du lieu du mariage." },
    { name: "Camping Lou Paradou", category: "camping", coords: [43.638668268187786, 5.275293288849929], address: "151 Chemin des Ponnes , Avenue d'Aix, 13410 Lambesc, France", description: "À 10 minutes en voiture du lieu du mariage." },
    { name: "Gare Salon-de-Provence", category: "gare", coords: [43.639353356081365, 5.089926801161895], address: "13300 Salon-de-Provence, France", description: "Gare la plus proche." },
    { name: "Aix-en-Provence TGV", category: "gare", coords: [43.45528397038415, 5.317224067953765], address: "13290 Aix-en-Provence, France", description: "Gare TGV la plus proche." },
    { name: "Aéroport Marseille Provence", category: "aeroport", coords: [43.43848360548113, 5.215037835876824], address: "Marignane, France", description: "Aéroport le plus proche." },
    { name: "Parc Animalier de la Barben", category: "tourisme", coords: [43.62402386890663, 5.2095669809005205], address: "Rte du Château, 13330 La Barben, France", description: "" },
    { name: "Le Roy René Musée du Calisson", category: "tourisme", coords: [43.581987148592695, 5.3803605104489405], address: "Quartier la Calade, 5380 Route d'Avignon, D7N, 13100 Aix-en-Provence, France", description: "Musée gratuit et magasin d'usine" },
    { name: "Savonnerie Marius Fabre", category: "tourisme", coords: [43.63780742870377, 5.090869367407603], address: "148 Av. Paul Bourret, 13300 Salon-de-Provence, France", description: "Visite gratuite sur réservation et magasin d'usine" },
    { name: "Miramas le vieux", category: "tourisme", coords: [43.5632802799067, 5.024749044443601], address: "Rue Frédéric Mistral, 13140 Miramas, France", description: "Petit village provençal sympa à visiter et glacier réputé Le Quillé" }
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
