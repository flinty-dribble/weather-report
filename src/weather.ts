export async function getWeatherByCity(
  city: HTMLElement,
  temp: HTMLElement,
  icon: HTMLImageElement,
  description: HTMLElement,
  map: HTMLImageElement,
  input: HTMLInputElement
) {
  try {
    const cityResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=396e05fd2171ceaefead7acce7feab44`
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

    let stateOfInput = true;

    if (localStorage.length <= 10) {
      if (localStorage.length >= 1) {
        for (let i = 0; i < localStorage.length; i += 1) {
          if (input.value === localStorage.getItem(localStorage.key(i) || "")) {
            stateOfInput = false;
          }
        }

        if (stateOfInput === true) {
          localStorage.setItem(`city-${localStorage.length}`, input.value);
        }
      } else {
        localStorage.setItem(`city-${localStorage.length}`, input.value);
      }
    } else if (localStorage.length > 10) {
      for (let i = localStorage.length - 10; i < localStorage.length; i += 1) {
        if (input.value === localStorage.getItem(`city-${i}`)) {
          stateOfInput = false;
        }
      }

      if (stateOfInput === true) {
        localStorage.setItem(`city-${localStorage.length}`, input.value);
      }
    }

    const workingHistory = async () => {
      const historyResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${town.innerHTML}&appid=396e05fd2171ceaefead7acce7feab44`
      );
      const result = await historyResponse.json();

      cityCopy.innerHTML = `${result.name}`;
      tempCopy.innerHTML = `${Math.round(result.main.temp - 273.15)}℃`;
      iconCopy.src = `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
      descriptionCopy.innerHTML = result.weather[0].description;
      mapCopy.src = `https://static-maps.yandex.ru/1.x/?ll=${result.coord.lon},${result.coord.lat}&size=450,450&z=11&l=map`;
    };

    let truly = true;

    if (history.length >= 1) {
      for (let i = 0; i < history.length; i += 1) {
        if (input.value === history[i].innerHTML && history.length >= 10) {
          truly = false;
          history[i].remove();
        } else if (input.value === history[i].innerHTML) {
          history[i].remove();
        }
      }
      wrapHistory?.append(town);
      town.innerHTML = `${input.value}`;
      town.onclick = workingHistory;
    } else {
      wrapHistory?.append(town);
      town.innerHTML = `${input.value}`;
      town.onclick = workingHistory;
    }

    if (history.length >= 10) {
      if (truly === true) {
        history[0].remove();
        wrapHistory?.append(town);
        town.innerHTML = `${input.value}`;
        town.onclick = workingHistory;
      }
    } else {
      wrapHistory?.append(town);
      town.innerHTML = `${input.value}`;
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

    const wrapForButtonAndInput = document.createElement("div");
    wrapForButtonAndInput.classList.add("wrapForButtonAndInput");
    wrapWork.append(wrapForButtonAndInput);

    const input = document.createElement("input");
    input.classList.add("inputCity");
    wrapForButtonAndInput.append(input);

    const button = document.createElement("button");
    wrapForButtonAndInput.append(button);
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

    city.innerHTML = text.name;
    temp.innerHTML = `${Math.round(text.main.temp - 273.15)}℃`;
    icon.src = `http://openweathermap.org/img/wn/${text.weather[0].icon}@2x.png`;
    description.innerHTML = text.weather[0].description;
    map.src = `https://static-maps.yandex.ru/1.x/?ll=${text.coord.lon},${text.coord.lat}&size=450,450&z=11&l=map`;

    button.addEventListener("click", () => {
      getWeatherByCity(city, temp, icon, description, map, input);
    });

    let i = 0;

    if (localStorage.length <= 10) {
      i = 0;
    } else if (localStorage.length > 10) {
      i = localStorage.length - 10;
    }

    for (i; i < localStorage.length; i += 1) {
      const hist = localStorage.getItem(`city-${i}`);

      const town = document.createElement("p");
      town.classList.add("history");
      const history = document.querySelectorAll(".history");

      const workingHistory = async () => {
        const historyResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${hist}&appid=396e05fd2171ceaefead7acce7feab44`
        );
        const result = await historyResponse.json();

        city.innerHTML = `${result.name}`;
        temp.innerHTML = `${Math.round(result.main.temp - 273.15)}℃`;
        icon.src = `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
        description.innerHTML = result.weather[0].description;
        map.src = `https://static-maps.yandex.ru/1.x/?ll=${result.coord.lon},${result.coord.lat}&size=450,450&z=11&l=map`;
      };

      if (history.length >= 10) {
        history[0].remove();
        wrapHistory?.append(town);
        town.innerHTML = `${hist}`;
        town.onclick = workingHistory;
      } else {
        wrapHistory?.append(town);
        town.innerHTML = `${hist}`;
        town.onclick = workingHistory;
      }
    }

    return text;
  } catch (err) {
    return err;
  }
}

const body = document.querySelector("body");
const el = document.createElement("div");
el.classList.add("wrap");
body?.append(el);
getWeather(el);
