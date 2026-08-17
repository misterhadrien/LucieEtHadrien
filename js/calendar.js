/* ==========================================================================
   Calendrier — bouton Google Calendar (le fichier calendar.ics couvre
   Apple Calendar et Outlook)
   ========================================================================== */

(function () {
  "use strict";

  var ev = SITE_CONFIG.event;

  // Le format Google Calendar est identique au format ICS (YYYYMMDDTHHMMSS)
  // mais interprété en UTC. L'événement étant défini en heure locale française
  // (été 2027 : UTC+2), on décale de -2h pour obtenir l'heure UTC correcte.
  function toUtc(icsLocal, offsetHours) {
    var d = new Date(
      parseInt(icsLocal.slice(0, 4), 10),
      parseInt(icsLocal.slice(4, 6), 10) - 1,
      parseInt(icsLocal.slice(6, 8), 10),
      parseInt(icsLocal.slice(9, 11), 10) - offsetHours,
      parseInt(icsLocal.slice(11, 13), 10)
    );
    return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  }

  var params = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.title,
    dates: toUtc(ev.start, 2) + "/" + toUtc(ev.end, 2),
    location: ev.location,
    details: ev.description
  });

  var link = document.getElementById("btn-google-calendar");
  if (link) {
    link.href = "https://calendar.google.com/calendar/render?" + params.toString();
  }
})();
