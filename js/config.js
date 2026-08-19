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
    start: "20270515T140000",   // format ICS : 15 mai 2027, 14h30 (heure locale)
    end: "20270516T020000"      // fin indicative : 2h du matin
  },

  // ----- Carte interactive (Leaflet + OpenStreetMap, gratuit) -----
  map: {
    // Coordonnées du lieu de mariage
    venueCoords: { lat: 43.662572915660775, lng: 5.184551388295699 },
    // Centre de repli
    fallbackCenter: { lat: 43.662572915660775, lng: 5.184551388295699 },
    zoom: 9
  },

  // ----- Hébergements affichés sur la page d'accueil -----
  stays: [
    {
      name: "Village Pont Royal en Provence Pierre & Vacances",
      type: "🏨 Appart-Hôtel",
      image: "https://photos.pierreetvacances.com/admin/fp2/photos/43/800x600/AAA_111314_43.jpg",
      distance: "12 minutes en voiture",
      price: "à partir de 115 €/nuit",
      description: "Ce village vacances propose des appartements et maisons dans un cadre verdoyant, avec piscine et nombreuses activités. Une option idéale pour prolonger votre séjour et profiter de la région en famille.",
      link: "https://www.pierreetvacances.com/fr-fr/fp_POL_location-village-pont-royal-en-provence"
    },
    {
      name: "Camping Lou Paradou",
      type: "🏕️ Camping",
      image: "https://www.campinglouparadou.com/wp-content/uploads/2020/03/piscine-enfants-provence.jpg",
      distance: "12 minutes en voiture",
      price: "à partir de 300€/semaine mobil-home 4 à 6 personnes",
      description: "Ce camping propose des mobil-homes climatisés avec terrasse, piscine et ambiance familiale. Une solution idéale pour séjourner à proximité du mariage et profiter de la Provence.",
      link: "https://www.campinglouparadou.com/"
    }
  ],

  places: [
    { name: "Prieuré de Badasset", category: "mariage", coords: [43.662572915660775, 5.184551388295699], address: "Vernègues", description: "" },
    { name: "Village Pont Royal en Provence Pierre & Vacances", category: "logement", coords: [43.70948752142142, 5.222498364709028], address: "Mallemort", description: "" },
    { name: "Camping Lou Paradou", category: "logement", coords: [43.638668268187786, 5.275293288849929], address: "Lambesc", description: "" },
    { name: "Aix-en-Provence TGV", category: "gare", coords: [43.45528397038415, 5.317224067953765], address: "Aix-en-Provence", description: "" },
    { name: "Aéroport Marseille Provence", category: "aeroport", coords: [43.43848360548113, 5.215037835876824], address: "Marignane", description: "" },
    { name: "Parc Animalier de la Barben", category: "tourisme", coords: [43.62402386890663, 5.2095669809005205], address: "La Barben,", description: "" },
    { name: "Le Roy René Musée du Calisson", category: "tourisme", coords: [43.581987148592695, 5.3803605104489405], address: "Aix-en-Provence", description: "Musée gratuit et magasin d'usine" },
    { name: "Savonnerie Marius Fabre", category: "tourisme", coords: [43.63780742870377, 5.090869367407603], address: "Salon-de-Provence", description: "Visite gratuite sur réservation et magasin d'usine" },
    { name: "Miramas le vieux", category: "tourisme", coords: [43.5632802799067, 5.024749044443601], address: "Miramas", description: "Petit village provençal et glacier réputé Le Quillé" },
    { name: "Les Baux-de-Provence", category: "tourisme", coords: [43.74487537186587, 4.794378331451952], address: "Les Baux-de-Provence", description: "Village médiéval provençal en hauteur, château et carrière des lumières à visiter" },
    { name: "L'Isle-sur-la-Sorgue", category: "tourisme", coords: [43.917552484737605, 5.052320689062531], address: "L'Isle-sur-la-Sorgue", description: "La venise provençal et canoë" },
    { name: "Village des marques", category: "tourisme", coords: [43.59384299966176, 4.993471894392565], address: "Miramas", description: "McArthurGlen Provence" },
    { name: "Chez nous", category: "maison", coords: [43.23521248422839, 5.402934640955494], address: "Marseille", description: "" },
    { name: "Mairie", category: "mairie", coords: [43.630169561351174, 5.176226038253986], address: "La Barben", description: "" },
     { name: "Château Virant", category: "tourisme", coords: [43.549441239117755, 5.154855198014228], address: "Lançon-Provence", description: "Domaine viticole, visite gratuite avec musée sur l'huile d'olive" },
     { name: "Château Bas", category: "tourisme", coords: [43.68372658909194, 5.196703112675502], address: "Vernègues", description: "Domaine viticole" },
     { name: "Colorado Provençal", category: "tourisme", coords: [43.92010331682514, 5.499618831698154], address: "Rustrel", description: "" },
     { name: "Rousillon", category: "tourisme", coords: [43.90237093505007, 5.292920938686112], address: "Rousillon", description: "Village provençal" },
     { name: "Fontaine de Vaucluse", category: "tourisme", coords: [43.92216452206535, 5.127757219955902], address: "Fontaine de Vaucluse", description: "Village provençal et visite gratuite du torrent de la sorgue" },
     { name: "Aix-en-Provence", category: "tourisme", coords: [43.52638250545041, 5.445492623216467], address: "Aix-en-Provence", description: "" },
     { name: "Cassis", category: "tourisme", coords: [43.21382820862716, 5.537965976597395], address: "Aix-en-Provence", description: "Port et bâteau visite des calanques" }
  ],

  supabase: {
    url: "https://dgnqyrrpwlulowbfswtm.supabase.co",       
    anonKey: "sb_publishable_XRQ-Mp2Uc-wobaZjy0t7iQ_CxomcXyT"     
  }
};
