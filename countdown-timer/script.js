const dayEl = document.querySelector(".day");
const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondEl = document.querySelector(".second");

const diwali = "4 November 2021";

const countdown = function () {
    const diwaliDate = new Date(diwali);
    const currentDate = new Date();

    const diffInMiliseconds = diwaliDate - currentDate;
    const diffInSeconds = Math.trunc(diffInMiliseconds / 1000);

    const daysLeft = Math.trunc(diffInSeconds / 3600 / 24);
    const hoursLeft = Math.trunc(diffInSeconds / 3600) % 24;
    const minutesLeft = Math.trunc(diffInSeconds / 60) % 60;
    const secondsLeft = Math.trunc(diffInSeconds) % 60;

    dayEl.innerText = daysLeft;
    hourEl.innerText = hoursLeft;
    minuteEl.innerText = minutesLeft;
    secondEl.innerText = secondsLeft;
};

setInterval(countdown, 1000);
