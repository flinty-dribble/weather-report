export async function getWeather(pos) {
  const APIkey = "396e05fd2171ceaefead7acce7feab44";
  const body = document.querySelector("body");
  const city = document.createElement("p");
  const temp = document.createElement("p");
  const icon = document.createElement("img");

  city.classList.add("city");
  temp.classList.add("temp");

  body.append(city);
  body.append(temp);
  body.append(icon);

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${pos.latitude}&lon=${pos.longitude}&appid=${APIkey}`
  );
  const text = await response.json();

  city.innerHTML = `city: ${text.name}`;
  temp.innerHTML = `temperature: ${Math.round(text.main.temp - 273.15)}`;
  icon.src = `http://openweathermap.org/img/wn/${text.weather[0].icon}@2x.png`;
}

async function func() {
  const geojs = await fetch("https://get.geojs.io/v1/ip/geo.json");
  const pos = await geojs.json();

  return getWeather(pos);
}

func();
