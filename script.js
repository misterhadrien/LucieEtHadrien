/* ==========================================================================
   Lucie & Hadrien — 15 mai 2027
   JavaScript vanilla : navigation, compte à rebours, animations, placeholders
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Navigation ---------- */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("nav-burger");
  var menu = document.getElementById("nav-menu");

  // Fond crème plus opaque au scroll
  function onScroll() {
    nav.classList.toggle("nav--scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Menu hamburger (mobile)
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("nav__menu--open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  });

  // Fermer le menu après un clic sur un lien (mobile)
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("nav__menu--open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Compte à rebours ---------- */
  // Date cible : 15 mai 2027, 14h30 (heure locale)
  var targetDate = new Date(2027, 4, 15, 14, 30, 0);

  var el = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    minutes: document.getElementById("cd-minutes"),
    seconds: document.getElementById("cd-seconds")
  };

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function updateCountdown() {
    if (!el.days) return; // compte à rebours absent (pages secondaires)

    var diff = targetDate - Date.now();

    if (diff <= 0) {
      el.days.textContent = "00";
      el.hours.textContent = "00";
      el.minutes.textContent = "00";
      el.seconds.textContent = "00";
      return;
    }

    var seconds = Math.floor(diff / 1000);
    el.days.textContent = pad(Math.floor(seconds / 86400));
    el.hours.textContent = pad(Math.floor((seconds % 86400) / 3600));
    el.minutes.textContent = pad(Math.floor((seconds % 3600) / 60));
    el.seconds.textContent = pad(seconds % 60);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- Apparition au scroll ---------- */
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-on-scroll--visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".reveal-on-scroll").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal-on-scroll").forEach(function (el) {
      el.classList.add("reveal-on-scroll--visible");
    });
  }

  /* ---------- Placeholders images ---------- */
  // Si une image est manquante, on affiche un placeholder SVG identifiable
  // afin que le site reste présentable avant l'ajout des vraies photos.
  function placeholderFor(width, height, label) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
      '<rect width="100%" height="100%" fill="#EFE7D8"/>' +
      '<rect width="100%" height="100%" fill="none" stroke="#9CAF94" stroke-width="3" stroke-dasharray="10,8"/>' +
      '<text x="50%" y="48%" text-anchor="middle" font-family="Georgia,serif" font-size="' +
      Math.max(16, Math.min(width, height) / 12) + '" fill="#7A6E61">' + label + "</text>" +
      '<text x="50%" y="60%" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#9CAF94">[À AJOUTER]</text>' +
      "</svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("error", function () {
      var w = img.getAttribute("width") || 800;
      var h = img.getAttribute("height") || 600;
      var label = (img.getAttribute("src") || "").split("/").pop();
      img.src = placeholderFor(w, h, label);
    });
  });
})();
