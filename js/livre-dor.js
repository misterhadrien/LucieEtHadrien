/* ==========================================================================
   Livre d'or — persistance via Supabase (compatible GitHub Pages)
   Configuration : voir js/config.js (SITE_CONFIG.supabase)
   Table attendue : guestbook (id, created_at, first_name, last_name, message)

   Modération : la suppression d'un message se fait depuis le tableau de bord
   Supabase (la clé service_role n'est jamais exposée côté client).
   ========================================================================== */

(function () {
  "use strict";

  var form = document.getElementById("guestbook-form");
  var list = document.getElementById("guestbook-list");
  var successBox = document.getElementById("gb-success");
  var infoBox = document.getElementById("gb-info");
  if (!form || !list) return;

  // Messages d'exemple pour montrer le rendu — à SUPPRIMER une fois le
  // service connecté (ils disparaissent automatiquement dès que Supabase
  // est configuré).
  var DEMO_ENTRIES = [
    { first_name: "Marie", message: "Nous avons tellement hâte de partager cette journée avec vous !", demo: true },
    { first_name: "Grand-mère Jeanne", message: "Un amour aussi beau que le vôtre, ça se fête ! À très vite mes chéris.", demo: true }
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
      '<p class="entry-card__message">« ' + escapeHtml(entry.message) + " »</p>" +
      '<p class="entry-card__author">— ' + escapeHtml(entry.first_name) + "</p>";
    return card;
  }

  function renderList(entries) {
    list.innerHTML = "";
    if (!entries.length) {
      list.innerHTML = '<p class="section__subtitle" style="grid-column:1/-1">Aucun message pour le moment — laissez-nous le premier mot !</p>';
      return;
    }
    entries.forEach(function (e) { list.appendChild(renderEntry(e)); });
  }

  function showInfo(msg) {
    infoBox.textContent = msg;
    infoBox.hidden = false;
  }

  function loadEntries() {
    if (!configured) {
      renderList(DEMO_ENTRIES);
      showInfo("Le livre d'or sera connecté au service en ligne très prochainement (voir js/config.js). En attendant, voici deux exemples d'affichage.");
      return;
    }
    client
      .from("guestbook")
      .select("first_name, message, created_at")
      .order("created_at", { ascending: false })
      .limit(100) // limitation raisonnable du nombre de messages affichés
      .then(function (res) {
        if (res.error) {
          showInfo("Impossible de charger les messages pour le moment. Réessayez plus tard.");
          renderList([]);
        } else {
          renderList(res.data || []);
        }
      });
  }

  /* ---------- Validation ---------- */
  function setInvalid(input, invalid) {
    input.closest(".form__field").classList.toggle("form__field--invalid", invalid);
    return !invalid;
  }

  function validate(data) {
    var ok = true;
    ok = setInvalid(form.elements.firstName, !data.first_name) && ok;
    ok = setInvalid(form.elements.message, data.message.length < 10) && ok;
    return ok;
  }

  /* ---------- Protection anti-spam ---------- */
  var MIN_FILL_TIME = 3000;
  var openedAt = Date.now();

  function isSpam() {
    if (form.elements.website.value) return true;
    if (Date.now() - openedAt < MIN_FILL_TIME) return true;
    return false;
  }

  // Limitation locale : 3 messages max par heure et par appareil
  var RATE_KEY = "lh-guestbook-rate";
  function rateLimited() {
    try {
      var times = JSON.parse(localStorage.getItem(RATE_KEY) || "[]")
        .filter(function (t) { return Date.now() - t < 3600000; });
      if (times.length >= 3) return true;
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
      message: form.elements.message.value.trim()
    };

    if (!validate(data)) return;

    if (isSpam()) {
      showInfo("Merci de prendre quelques instants pour écrire votre message.");
      return;
    }

    if (!configured) {
      showInfo("Le service en ligne n'est pas encore connecté (voir js/config.js). Votre message n'a pas pu être enregistré.");
      return;
    }

    if (rateLimited()) {
      showInfo("Vous avez déjà écrit plusieurs messages récemment — revenez dans un petit moment !");
      return;
    }

    client.from("guestbook").insert([data]).then(function (res) {
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
