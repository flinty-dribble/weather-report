import { getWeather, getWeatherByCity } from "./weather";

describe("weather report", () => {
  global.fetch = jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            name: "Moscow",
            main: { temp: 291.15 },
            weather: [{ icon: "03d", description: "moderate rain" }],
            coord: { lon: 37.91, lat: 55.34 },
          }),
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            name: "London",
            main: { temp: 295.15 },
            weather: [{ icon: "03d", description: "light rain" }],
            coord: { lon: 37.91, lat: 55.34 },
          }),
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            name: "Tokyo",
            main: { temp: 298.15 },
            weather: [{ icon: "02d", description: "overcast clouds" }],
            coord: { lon: 37.91, lat: 55.34 },
          }),
      })
    );

  const el = document.createElement("div");

  it("user`s weather", async () => {
    const res = await getWeather(el);

    const asyncMock = jest
      .fn()
      .mockResolvedValueOnce(
        `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
      )
      .mockResolvedValueOnce(
        `https://static-maps.yandex.ru/1.x/?ll=${res.coord.lon},${res.coord.lat}&size=450,450&z=11&l=map`
      );

    expect(el.querySelector(".city")?.innerHTML).toBe(`${res.name}`);
    expect(el.querySelector(".temp")?.innerHTML).toBe(
      `${res.main.temp - 273.15}℃`
    );
    expect(el.querySelector("img")?.src).toBe(await asyncMock());
  });

  it("input and button", async () => {
    const city: HTMLElement | null = el.querySelector(".city");
    const temp: HTMLElement | null = el.querySelector(".temp");
    const icon: HTMLImageElement | null = el.querySelector(".icon");
    const description: HTMLElement | null = el.querySelector(".description");
    const map: HTMLImageElement | null = el.querySelector(".map");
    const input: HTMLInputElement | null = el.querySelector("input");

    if (city && temp && icon && description && map && input !== null) {
      const res = await getWeatherByCity(
        city,
        temp,
        icon,
        description,
        map,
        input
      );

      const asyncMock = jest
        .fn()
        .mockResolvedValueOnce(
          `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
        )
        .mockResolvedValueOnce(
          `https://static-maps.yandex.ru/1.x/?ll=${res.coord.lon},${res.coord.lat}&size=450,450&z=11&l=map`
        );

      expect(city?.innerHTML).toBe(`${res.name}`);
      expect(temp?.innerHTML).toBe(`${res.main.temp - 273.15}℃`);
      expect(icon?.src).toBe(await asyncMock());
    }
  });

  it("working history", async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({}),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              name: "Moscow",
              main: { temp: 291.15 },
              weather: [{ icon: "03d" }],
              coord: { lon: 37.91, lat: 55.34 },
            }),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              name: "London",
              main: { temp: 295.15 },
              weather: [{ icon: "03d" }],
              coord: { lon: 37.91, lat: 55.34 },
            }),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              name: "Tokyo",
              main: { temp: 298.15 },
              weather: [{ icon: "02d" }],
              coord: { lon: 37.91, lat: 55.34 },
            }),
        })
      );

    await getWeather(el);

    const city: HTMLElement | null = el.querySelector(".city");
    const temp: HTMLElement | null = el.querySelector(".temp");
    const icon: HTMLImageElement | null = el.querySelector(".icon");
    const description: HTMLElement | null = el.querySelector(".description");
    const map: HTMLImageElement | null = el.querySelector(".map");
    const input: HTMLInputElement | null = el.querySelector("input");

    if (city && temp && icon && description && map && input !== null) {
      const res = await getWeatherByCity(
        city,
        temp,
        icon,
        description,
        map,
        input
      );

      const asyncMock = jest
        .fn()
        .mockResolvedValueOnce(
          `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
        )
        .mockResolvedValueOnce(
          `https://static-maps.yandex.ru/1.x/?ll=${res.coord.lon},${res.coord.lat}&size=450,450&z=11&l=map`
        );

      expect(el.querySelector(".city")?.innerHTML).toBe(`${res.name}`);
      expect(el.querySelector(".temp")?.innerHTML).toBe(
        `${res.main.temp - 273.15}℃`
      );
      expect(el.querySelector("img")?.src).toBe(await asyncMock());
    }
  });
});
