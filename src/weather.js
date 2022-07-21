export async function getWeather() {
  try {
    const geojs = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const pos = await geojs.json();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${pos.latitude}&lon=${pos.longitude}&appid=396e05fd2171ceaefead7acce7feab44`
    );
    const text = await response.json();

    const body = document.querySelector("body");
    const city = document.createElement("p");
    const temp = document.createElement("p");
    const icon = document.createElement("img");

    city.classList.add("city");
    temp.classList.add("temp");

    body.append(city);
    body.append(temp);
    body.append(icon);

    city.innerHTML = `city: ${text.name}`;
    temp.innerHTML = `temperature: ${Math.round(text.main.temp - 273.15)}`;
    icon.src = `http://openweathermap.org/img/wn/${text.weather[0].icon}@2x.png`;
    return text;
  } catch (err) {
    return err;
  }
}

getWeather();

const input = document.createElement("input");
const button = document.createElement("button");
button.innerHTML = "click";
const body = document.querySelector("body");
body.append(input);
body.append(button);

export async function weatherOfCity() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=396e05fd2171ceaefead7acce7feab44`
  );
  const result = await response.json();
  return result;
}

button.addEventListener("click", async () => {
  const weather = await weatherOfCity();

  const city = document.querySelector(".city");
  const temp = document.querySelector(".temp");
  const icon = document.querySelector("img");

  city.innerHTML = `city: ${weather.name}`;
  temp.innerHTML = `temperature: ${Math.round(weather.main.temp - 273.15)}`;
  icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

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

  if (history.length >= 10) {
    history[0].remove();
    body.append(town);
    town.innerHTML = `${input.value}`;
  } else {
    body.append(town);
    town.innerHTML = `${input.value}`;
  }
});
