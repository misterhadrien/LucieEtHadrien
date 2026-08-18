/* ==========================================================================
   Carte interactive — Leaflet + OpenStreetMap (gratuit, compatible GitHub Pages)
   Les données (lieux, catégories, coordonnées du lieu du mariage) se
   configurent dans js/config.js.
   ========================================================================== */

(function () {
  "use strict";

  var mapEl = document.getElementById("map");
  if (!mapEl || typeof L === "undefined") return;

  /* ---------- Catégories ---------- */
var CATEGORIES = {
  mariage:  { label: "Lieu du mariage",       icon: "📍", color: "#8B5E3C" },
  logement: { label: "Hébergements",              icon: "⛺", color: "#B97962" },
  gare:     { label: "Gare",                  icon: "🚉", color: "#7B8794" },
  aeroport: { label: "Aéroport",              icon: "✈️", color: "#5F7892" },
  maison:   { label: "Chez nous",            icon: "🏠", color: "#A66A45" },
  tourisme: { label: "Lieux à découvrir",    icon: "🌿", color: "#657A52" }
};

  var cfg = SITE_CONFIG.map;
  var venue = cfg.venueCoords || null;

  var center = venue
    ? [venue.lat, venue.lng]
    : [cfg.fallbackCenter.lat, cfg.fallbackCenter.lng];

  var map = L.map(mapEl, { scrollWheelZoom: false }).setView(center, cfg.zoom);
  map.on("click", function () { map.scrollWheelZoom.enable(); });
  map.on("mouseout", function () { map.scrollWheelZoom.disable(); });

   L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
     maxZoom: 20,
     attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
   }).addTo(map);

  /* ---------- Distance (haversine, km) ---------- */
  function distanceKm(a, b) {
    var R = 6371, rad = Math.PI / 180;
    var dLat = (b[0] - a[0]) * rad;
    var dLng = (b[1] - a[1]) * rad;
    var h = Math.sin(dLat / 2) ** 2 +
            Math.cos(a[0] * rad) * Math.cos(b[0] * rad) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function fmtDistance(km) {
    return km < 1 ? Math.round(km * 1000) + " m" : km.toFixed(1).replace(".", ",") + " km";
  }

  /* ---------- Marqueurs ---------- */
  var layers = {}; // catégorie -> LayerGroup
  var venueLatLng = venue ? [venue.lat, venue.lng] : null;

   SITE_CONFIG.places.forEach(function (place) {
     var cat = CATEGORIES[place.category];
     if (!cat || !place.coords) return;
   
     var latLng = [place.coords[0], place.coords[1]];
     var isVenue = place.category === "mariage";
   
     if (!layers[place.category]) {
       layers[place.category] = L.layerGroup().addTo(map);
     }
   
     // Marqueur principal
   var marker = L.marker(latLng, {
     icon: L.divIcon({
       className: isVenue
         ? "map-marker-emoji map-marker-emoji--venue"
         : "map-marker-emoji",
       html: '<span>' + cat.icon + '</span>',
       iconSize: isVenue ? [46, 46] : [36, 36],
       iconAnchor: isVenue ? [23, 23] : [18, 18],
       popupAnchor: [0, isVenue ? -23 : -18]
     }),
     zIndexOffset: isVenue ? 1000 : 0
   });

    var distanceLine = "";
    if (!isVenue && venueLatLng) {
      distanceLine = "<p>À " + fmtDistance(distanceKm(venueLatLng, latLng)) +
                     " du lieu du mariage</p>";
    } else if (!isVenue && !venueLatLng) {
      distanceLine = "<p>Distance : [coordonnées du lieu à compléter]</p>";
    }

    var routeUrl = "https://www.google.com/maps/dir/?api=1&destination=" + latLng[0] + "," + latLng[1];

    marker.bindPopup(
      '<div class="map-popup">' +
        "<h3>" + place.name + "</h3>" +
        '<p class="map-popup__category">' + cat.label + "</p>" +
        (place.address ? "<p>" + place.address + "</p>" : "") +
        distanceLine +
        (place.description ? "<p>" + place.description + "</p>" : "") +
        '<a class="map-popup__route" href="' + routeUrl + '" target="_blank" rel="noopener">Itinéraire</a>' +
      "</div>"
    );

    layers[place.category].addLayer(marker);
  });

   var venueButton = L.control({ position: "topright" });
   
   venueButton.onAdd = function () {
     var div = L.DomUtil.create("button", "map-control-btn");
     div.innerHTML = "📍 Lieu du mariage";
     div.title = "Revenir au lieu du mariage";
   
     L.DomEvent.disableClickPropagation(div);
   
     div.onclick = function () {
       if (venueLatLng) {
         map.setView(venueLatLng, cfg.zoom, {
           animate: true
         });
       }
     };
   
     return div;
   };
   
   venueButton.addTo(map);

  /* ---------- Légende (filtres cliquables) ---------- */
  var legend = document.getElementById("map-legend");
  if (legend) {
    Object.keys(CATEGORIES).forEach(function (key) {
      var cat = CATEGORIES[key];
      var item = document.createElement("button");
      item.type = "button";
      item.className = "map-legend__item";
      item.setAttribute("aria-pressed", "true");
      item.innerHTML = cat.icon + " " + cat.label;
      item.addEventListener("click", function () {
        var group = layers[key];
        if (!group) return;
        var on = map.hasLayer(group);
        if (on) { map.removeLayer(group); } else { map.addLayer(group); }
        item.classList.toggle("map-legend__item--off", on);
        item.setAttribute("aria-pressed", on ? "false" : "true");
      });
      legend.appendChild(item);
    });
  }

  /* ---------- Cartes hébergement (page d'accueil) ---------- */
  var stayList = document.getElementById("stay-list");
  if (stayList) {
    SITE_CONFIG.stays.forEach(function (stay) {
      var card = document.createElement("article");
      card.className = "stay-card reveal-on-scroll";
      card.innerHTML =
        '<img class="stay-card__img" src="' + stay.image + '" alt="' + stay.name + '" width="600" height="450" loading="lazy">' +
        '<div class="stay-card__body">' +
          '<p class="stay-card__type">' + stay.type + "</p>" +
          "<h3>" + stay.name + "</h3>" +
          '<p class="stay-card__meta">📍 ' + stay.distance + " · <strong>" + stay.price + "</strong></p>" +
          '<p class="stay-card__desc">' + stay.description + "</p>" +
          '<div class="stay-card__actions">' +
            '<a class="btn btn--primary btn--small" href="' + stay.link + '" target="_blank" rel="noopener">Voir l\'hébergement</a>' +
          "</div>" +
        "</div>";
      stayList.appendChild(card);
    });

    // fallback placeholder pour les photos d'hébergement manquantes
    stayList.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("error", function () {
        img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450">' +
          '<rect width="100%" height="100%" fill="#EFE7D8"/>' +
          '<rect width="100%" height="100%" fill="none" stroke="#9CAF94" stroke-width="3" stroke-dasharray="10,8"/>' +
          '<text x="50%" y="50%" text-anchor="middle" font-family="Georgia,serif" font-size="42" fill="#7A6E61">[Photo à ajouter]</text></svg>');
      });
    });
  }
})();
