import fetch from "node-fetch";
import { getWeather } from "./weather";

describe("weather report", async () => {
  it("user`s sity", async () => {
    const geojs = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const pos = await geojs.json();

    const city = document.querySelector(".city");
    const temp = document.querySelector(".temp");
    const icon = document.querySelector("img");

    getWeather(pos);

    expect(city.innerHTML).toBe("city: Moscow");
    expect(temp.innerHTML).toBe("temperature: 22");
    expect(icon.src).toBe("http://openweathermap.org/img/wn/03d@2x.png");
  });
});
