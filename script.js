const weddingDate = new Date("2027-05-15T14:30:00");

function updateCountdown() {

    const now = new Date();

    const difference = weddingDate - now;

    const days = Math.ceil(
        difference / (1000 * 60 * 60 * 24)
    );

    document.getElementById("days").textContent =
        Math.max(days, 0);
}

updateCountdown();

setInterval(updateCountdown, 60000);