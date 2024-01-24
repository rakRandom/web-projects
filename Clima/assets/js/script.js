const $ = name => document.querySelector(name);

const API_KEY = "eb9f495d1ffcab049b9f151af9248020";
const cidadeField = $("#cidade-field");
const warnLabel = $("#warn-label");
const resultDiv = $(".result");

// Result labels
const nameLabel = $("#name-label");
const tempLabel = $("#temp-label");
const windLabel = $("#wind-label");
const maxTempLabel = $("#max-temp-label");
const minTempLabel = $("#min-temp-label");

// 0ashBNASUDG2ibasdu9aGHSDOiuasduasdiblISAUdbLAVSdyAusgd

$("#clima-button").addEventListener("click", searchClimate);
cidadeField.addEventListener("keydown", (key) => {
    if (key.code === "Enter")
        searchClimate()
});

async function searchClimate() {
    let city_name = cidadeField.value;
    cidadeField.value = "";
    warnLabel.style.display = "block";
    warnLabel.innerText = "Carregando...";
    let res = await getClimate(city_name);

    if (res) {
        warnLabel.style.display = "none";
        resultDiv.style.display = "flex";
    }
    else {
        warnLabel.innerText = "Não encontramos esta localização.";
        resultDiv.style.display = "none";
    }
}


async function findID(city_name) {
    let res = await fetch("./assets/data/city_id_data.json").then(res => res.json());
    return res[city_name];
}


async function getClimate(city_name) {
    let city_id = await findID(city_name.toLowerCase());
    if (city_id == undefined)
        return false

    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city_id}&appid=${API_KEY}`);
    if (!res.ok)
        return false;

    let payload = await res.json(); // wind: speed,  sys: country, main: temp, main: temp_max, main:temp_min
    let {sys: {country}, wind: {speed}, main: {temp, temp_max: tempMax, temp_min: tempMin}} = payload;

    city_name = city_name.split(" ");
    for (let i = 0; i < city_name.length; i++) {
        city_name[i] = city_name[i][0].toUpperCase() + city_name[i].substr(1);
    }

    updateResult(city_name.join(" "), country, temp - 273.15, speed * 3.701, tempMax - 273.15, tempMin - 273.15);
    return true;
}


function updateResult(city_name, country_name, temp, wind, maxTemp, minTemp) {
    nameLabel.innerText = `${city_name} - ${country_name}`;
    tempLabel.innerText = temp.toFixed(2);
    windLabel.innerText = wind.toFixed(2);
    maxTempLabel.innerText = maxTemp.toFixed(0);
    minTempLabel.innerText = minTemp.toFixed(0);
}