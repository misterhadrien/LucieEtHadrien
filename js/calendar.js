/* ==========================================================================
   Calendrier Google Calendar
   ========================================================================== */

(function () {
  "use strict";

  if (
    typeof SITE_CONFIG === "undefined" ||
    !SITE_CONFIG.event
  ) {
    return;
  }

  var ev = SITE_CONFIG.event;

  var link = document.getElementById(
    "btn-google-calendar"
  );

  if (!link) {
    return;
  }

  var params = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.title,
    dates: ev.start + "/" + ev.end,
    ctz: "Europe/Paris",
    location: ev.location,
    details: ev.description
  });

  link.href =
    "https://calendar.google.com/calendar/render?" +
    params.toString();
})();
