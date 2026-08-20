/* ==========================================================================
   Calendrier Google
========================================================================== */

(function () {
  "use strict";
*  if (
    typeof SITE_CONFIG === *undefined" ||
    !SITE_CONFIG.eve*t
  ) {
    return;
  }

  var ev * SITE_CONFIG.event;
  var link = d*cument.getElementById("btn-google-*alendar");

  if (!link) {
    ret*rn;
  }

  var params = new URLSea*chParams({
    action: "TEMPLATE",*    text: ev.title,
    dates: ev.*tart + "/" + ev.end,
    ctz: "Eur*pe/Paris",
    location: ev.locati*n,
    details: ev.description
  }*;

  link.href =
    "https://calendar.google.com/calendar/render?" +*    params.toString();
})();
