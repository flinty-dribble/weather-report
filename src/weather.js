export async function getWeather(el) {
  try {
    const geojs = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const pos = await geojs.json();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${pos.latitude}&lon=${pos.longitude}&appid=396e05fd2171ceaefead7acce7feab44`
    );
    const text = await response.json();

    const input = document.createElement("input");
    el.append(input);

    const button = document.createElement("button");
    el.append(button);
    button.innerHTML = "click";

    const map = document.createElement("div");
    el.append(map);
    map.id = "map";

    const city = document.createElement("p");
    const temp = document.createElement("p");
    const icon = document.createElement("img");
    city.classList.add("city");
    temp.classList.add("temp");
    el.append(city);
    el.append(temp);
    el.append(icon);

    city.innerHTML = `city: ${text.name}`;
    temp.innerHTML = `temperature: ${Math.round(text.main.temp - 273.15)}`;
    icon.src = `http://openweathermap.org/img/wn/${text.weather[0].icon}@2x.png`;

    const createMap = () => {
      /* global ymaps */
      /* eslint no-undef: "error" */

      const yandex = new ymaps.Map("map", {
        center: [pos.latitude, pos.longitude],
        zoom: 10,
      });
      return yandex;
    };
    ymaps.ready(createMap);

    button.onclick = async () => {
      try {
        const cityResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=396e05fd2171ceaefead7acce7feab44`
        );
        const res = await cityResponse.json();
        city.innerHTML = `city: ${res.name}`;
        temp.innerHTML = `temperature: ${Math.round(res.main.temp - 273.15)}`;
        icon.src = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;

        const town = document.createElement("p");
        town.classList.add("history");
        const history = document.querySelectorAll(".history");

        if (history.length >= 1) {
          for (let i = 0; i < history.length; i += 1) {
            if (input.value === history[i].innerHTML) {
              history[i].remove();
            }
          }
        }

        const workingHistory = async () => {
          const historyResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${town.innerHTML}&appid=396e05fd2171ceaefead7acce7feab44`
          );
          const result = await historyResponse.json();

          city.innerHTML = `city: ${result.name}`;
          temp.innerHTML = `temperature: ${Math.round(
            result.main.temp - 273.15
          )}`;
          icon.src = `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;

          return res;
        };

        if (history.length >= 10) {
          history[0].remove();
          el.append(town);
          town.innerHTML = `${input.value}`;
          town.onclick = workingHistory;
        } else {
          el.append(town);
          town.innerHTML = `${input.value}`;
          town.onclick = workingHistory;
        }
        return res;
      } catch (err) {
        return err;
      }
    };

    return text;
  } catch (err) {
    return err;
  }
}
const body = document.querySelector("body");
const el = document.createElement("div");
body.append(el);
getWeather(el);
