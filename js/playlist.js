/* ==========================================================================
   Playlist des mariés — persistance via Supabase (compatible GitHub Pages)
   Configuration : voir js/config.js (SITE_CONFIG.supabase)
   Table attendue : playlist (id, created_at, first_name, last_name,
                                  song_title, artist, message)
   ========================================================================== */

(function () {
  "use strict";

  var form = document.getElementById("playlist-form");
  var list = document.getElementById("playlist-list");
  var successBox = document.getElementById("pl-success");
  var infoBox = document.getElementById("pl-info");
  if (!form || !list) return;

  var DEMO_ENTRIES = [
    { song_title: "[Titre d'exemple]", artist: "[Artiste]", first_name: "Prénom", message: "", demo: true }
  ];

  /* ---------- Connexion Supabase ---------- */
  function getClient() {
    var cfg = SITE_CONFIG.supabase;
    if (!cfg.url || !cfg.anonKey || typeof supabase === "undefined") return null;
    return supabase.createClient(cfg.url, cfg.anonKey);
  }

  var client = getClient();
  var configured = !!client;

  /* ---------- Rendu ---------- */
  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function renderEntry(entry) {
    var card = document.createElement("article");
    card.className = "entry-card" + (entry.demo ? " entry-card--demo" : "");
    card.innerHTML =
      '<p class="entry-card__title">🎵 ' + escapeHtml(entry.song_title) + "</p>" +
      '<p class="entry-card__artist">' + escapeHtml(entry.artist) + "</p>" +
      (entry.message ? '<p class="entry-card__message">« ' + escapeHtml(entry.message) + " »</p>" : "") +
      '<p class="entry-card__author">Proposée par : ' + escapeHtml(entry.first_name) + "</p>";
    return card;
  }

  function renderList(entries) {
    list.innerHTML = "";
    if (!entries.length) {
      list.innerHTML = '<p class="section__subtitle" style="grid-column:1/-1">Aucune chanson proposée pour le moment — soyez le premier !</p>';
      return;
    }
    var count = document.getElementById("playlist-count");
    if (count) {
       count.textContent =
           entries.length +
           " chansons proposées";
    }
    entries.forEach(function (e) { list.appendChild(renderEntry(e)); });
  }

  function loadEntries() {
    if (!configured) {
      renderList(DEMO_ENTRIES);
      showInfo("Le partage des chansons sera activé dès la connexion au service en ligne (voir js/config.js). En attendant, voici un exemple d'affichage.");
      return;
    }
    client
      .from("playlist")
      .select("song_title, artist, first_name, message, created_at")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(function (res) {
        if (res.error) {
          showInfo("Impossible de charger les chansons pour le moment. Réessayez plus tard.");
          renderList([]);
        } else {
          renderList(res.data || []);
        }
      });
  }

  function showInfo(msg) {
    infoBox.textContent = msg;
    infoBox.hidden = false;
  }

  /* ---------- Validation ---------- */
  function setInvalid(input, invalid) {
    input.closest(".form__field").classList.toggle("form__field--invalid", invalid);
    return !invalid;
  }

   function validate(data) {
     var ok = true;
     ok = setInvalid(form.elements.firstName, !data.first_name) && ok;
     ok = setInvalid(form.elements.songTitle, !data.song_title) && ok;
     ok = setInvalid(form.elements.artist, !data.artist) && ok;
     return ok;
   }

  /* ---------- Protection anti-spam ---------- */
  var MIN_FILL_TIME = 3000; // le formulaire doit rester 3s ouvert (anti-robot)
  var openedAt = Date.now();

  function isSpam() {
    if (form.elements.website.value) return true;           // honeypot rempli
    if (Date.now() - openedAt < MIN_FILL_TIME) return true;  // rempli trop vite
    return false;
  }

  // Limitation locale : 5 propositions max par heure et par appareil
  var RATE_KEY = "lh-playlist-rate";
  function rateLimited() {
    try {
      var times = JSON.parse(localStorage.getItem(RATE_KEY) || "[]")
        .filter(function (t) { return Date.now() - t < 3600000; });
      if (times.length >= 5) return true;
      times.push(Date.now());
      localStorage.setItem(RATE_KEY, JSON.stringify(times));
      return false;
    } catch (e) { return false; }
  }

  /* ---------- Envoi ---------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    successBox.hidden = true;
    infoBox.hidden = true;

    var data = {
      first_name: form.elements.firstName.value.trim(),
      last_name: form.elements.lastName.value.trim(),
      song_title: form.elements.songTitle.value.trim(),
      artist: form.elements.artist.value.trim(),
      message: form.elements.message.value.trim()
    };

    if (!validate(data)) return;

    if (isSpam()) {
      showInfo("Merci de prendre quelques instants pour remplir le formulaire.");
      return;
    }

    if (!configured) {
      showInfo("Erreur de connexion à la base de données. Votre proposition n'a pas pu être enregistrée.");
      return;
    }

    if (rateLimited()) {
      showInfo("Vous avez déjà proposé plusieurs chansons récemment — revenez dans un petit moment !");
      return;
    }

    client.from("playlist").insert([data]).then(function (res) {
      if (res.error) {
        showInfo("Une erreur est survenue. Réessayez dans un instant.");
      } else {
        form.reset();
        openedAt = Date.now();
        successBox.hidden = false;
        loadEntries();
      }
    });
  });

  loadEntries();
})();
