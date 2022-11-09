export async function getWeatherById(
  city: HTMLElement,
  temp: HTMLElement,
  icon: HTMLImageElement,
  description: HTMLElement,
  map: HTMLImageElement,
  inputLat: HTMLInputElement,
  inputLon: HTMLInputElement
) {
  try {
    const cityResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${inputLat.value}&lon=${inputLon.value}&appid=396e05fd2171ceaefead7acce7feab44`
    );
    const res = await cityResponse.json();
    const cityCopy = city;
    const tempCopy = temp;
    const iconCopy = icon;
    const descriptionCopy = description;
    const mapCopy = map;

    cityCopy.innerHTML = `${res.name}`;
    tempCopy.innerHTML = `${Math.round(res.main.temp - 273.15)}℃`;
    iconCopy.src = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
    descriptionCopy.innerHTML = res.weather[0].description;
    mapCopy.src = `https://static-maps.yandex.ru/1.x/?ll=${res.coord.lon},${res.coord.lat}&size=450,450&z=11&l=map`;

    const wrapHistory = document.querySelector(".wrapHistory");
    const town = document.createElement("p");
    town.classList.add("history");
    const history = document.querySelectorAll(".history");

    const workingHistory = async () => {
      const historyResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${town.innerHTML}&appid=396e05fd2171ceaefead7acce7feab44`
      );
      const result = await historyResponse.json();

      cityCopy.innerHTML = `city: ${result.name}`;
      tempCopy.innerHTML = `temperature: ${Math.round(
        result.main.temp - 273.15
      )}`;
      iconCopy.src = `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
      descriptionCopy.innerHTML = result.weather[0].description;
      mapCopy.src = `https://static-maps.yandex.ru/1.x/?ll=${result.coord.lon},${result.coord.lat}&size=450,450&z=11&l=map`;
    };

    let truly = true;

    if (history.length >= 1) {
      for (let i = 0; i < history.length; i += 1) {
        if (res.name === history[i].innerHTML && history.length >= 10) {
          truly = false;
          history[i].remove();
        } else if (res.name === history[i].innerHTML) {
          history[i].remove();
        }
      }
      wrapHistory?.append(town);
      town.innerHTML = `${res.name}`;
      town.onclick = workingHistory;
    } else {
      wrapHistory?.append(town);
      town.innerHTML = `${res.name}`;
      town.onclick = workingHistory;
    }

    if (history.length >= 10) {
      if (truly === true) {
        history[0].remove();
        wrapHistory?.append(town);
        town.innerHTML = `${res.name}`;
        town.onclick = workingHistory;
      }
    } else {
      wrapHistory?.append(town);
      town.innerHTML = `${res.name}`;
      town.onclick = workingHistory;
    }

    return res;
  } catch (err) {
    return err;
  }
}

export async function getWeather(el: HTMLDivElement) {
  try {
    const geojs = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const pos = await geojs.json();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${pos.latitude}&lon=${pos.longitude}&appid=396e05fd2171ceaefead7acce7feab44`
    );
    const text = await response.json();

    const wrapWork = document.createElement("div");
    wrapWork.classList.add("wrapWork");
    el.append(wrapWork);

    const wrapForButtonAndInput1 = document.createElement("div");
    wrapForButtonAndInput1.classList.add("wrapForButtonAndInput-1");
    wrapWork.append(wrapForButtonAndInput1);

    const wrapForButtonAndInput2 = document.createElement("div");
    wrapForButtonAndInput2.classList.add("wrapForButtonAndInput-2");
    wrapWork.append(wrapForButtonAndInput2);

    const latPar = document.createElement("p");
    latPar.classList.add("coordsPar");
    wrapForButtonAndInput1.append(latPar);
    latPar.innerHTML = "Latitude - ";
    const inputLat = document.createElement("input");
    inputLat.classList.add("inputLat");
    wrapForButtonAndInput1.append(inputLat);

    const lonPar = document.createElement("p");
    lonPar.classList.add("coordsPar");
    wrapForButtonAndInput2.append(lonPar);
    lonPar.innerHTML = "Longitude - ";
    const inputLon = document.createElement("input");
    inputLon.classList.add("inputLon");
    wrapForButtonAndInput2.append(inputLon);

    const button = document.createElement("button");
    wrapWork.append(button);
    button.innerHTML = "click";

    const wrapInfo = document.createElement("div");
    wrapInfo.classList.add("wrapInfo");
    el.append(wrapInfo);

    const wrapHistory = document.createElement("div");
    wrapHistory.classList.add("wrapHistory");
    wrapWork.append(wrapHistory);

    const city = document.createElement("p");
    const temp = document.createElement("p");
    const icon = document.createElement("img");
    const description = document.createElement("p");
    const map = document.createElement("img");
    city.classList.add("city");
    temp.classList.add("temp");
    icon.classList.add("icon");
    description.classList.add("description");
    map.classList.add("map");
    wrapInfo.append(city);
    wrapInfo.append(temp);
    wrapInfo.append(icon);
    wrapInfo.append(description);
    wrapInfo.append(map);

    city.innerHTML = `${text.name}`;
    temp.innerHTML = `${Math.round(text.main.temp - 273.15)}℃`;
    icon.src = `http://openweathermap.org/img/wn/${text.weather[0].icon}@2x.png`;
    description.innerHTML = text.weather[0].description;
    map.src = `https://static-maps.yandex.ru/1.x/?ll=${text.coord.lon},${text.coord.lat}&size=450,450&z=11&l=map`;

    button.addEventListener("click", () => {
      getWeatherById(city, temp, icon, description, map, inputLat, inputLon);
    });

    return text;
  } catch (err) {
    return err;
  }
}
const body = document.querySelector("body");
const el = document.createElement("div");

body?.append(el);
getWeather(el);
