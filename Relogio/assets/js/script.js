const $ = name => document.querySelector(name);

const timeLabel = $("#time-label");
const secPointer = $(".p_s");
const minPointer = $(".p_m");
const hrsPointer = $(".p_h");


function fix(time) {
    return time.toFixed(0).padStart(2, "0");
}


function updateDate() {
    let date = new Date();

    let sec = date.getSeconds();
    let min = date.getMinutes();
    let hrs = date.getHours();

    timeLabel.innerText = `${fix(hrs)}:${fix(min)}:${fix(sec)}`;

    min += sec / 60;
    hrs += min / 60;

    secPointer.style.transform = `rotate(${sec * 6 - 90}deg)`;
    minPointer.style.transform = `rotate(${min * 6 - 90}deg)`;
    hrsPointer.style.transform = `rotate(${hrs * 30 - 90}deg)`;
    console.log("Date Updated");
}

updateDate();
setInterval(updateDate, 500);
