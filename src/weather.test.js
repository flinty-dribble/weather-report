import { getWeather } from "./weather";

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
            weather: [{ icon: "03d" }],
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
          }),
      })
    );

  const el = document.createElement("div");

  it("user`s weather", async () => {
    const res = await getWeather(el);

    const asyncMock = jest
      .fn()
      .mockResolvedValue(
        `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
      );

    expect(el.querySelector(".city").innerHTML).toBe(`city: ${res.name}`);
    expect(el.querySelector(".temp").innerHTML).toBe(
      `temperature: ${res.main.temp - 273.15}`
    );
    expect(el.querySelector("img").src).toBe(await asyncMock());
  });

  it("input and button", async () => {
    const button = el.querySelector("button");
    const res = await button.onclick();

    const history = el.querySelector(".history");
    history.remove();

    const asyncMock = jest
      .fn()
      .mockResolvedValue(
        `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
      );

    expect(el.querySelector(".city").innerHTML).toBe(`city: ${res.name}`);
    expect(el.querySelector(".temp").innerHTML).toBe(
      `temperature: ${res.main.temp - 273.15}`
    );
    expect(el.querySelector("img").src).toBe(await asyncMock());
  });

  it("history", async () => {
    const arr = [
      "Tokyo",
      "Moscow",
      "Paris",
      "New York",
      "Los Angeles",
      "Beijing",
      "Baku",
      "Sochi",
      "Nepal",
      "Rio",
    ];
    for (let i = 0; i <= arr.length; i += 1) {
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
              }),
          })
        );
      /* eslint-disable no-await-in-loop */
      await getWeather(el);
      const input = el.querySelector("input");
      const button = el.querySelector("button");
      input.value = arr[i];
      button.click();
    }

    const history = el.querySelectorAll(".history");

    expect(history[0].innerHTML).toBe("Tokyo");
    expect(history[4].innerHTML).toBe("Los Angeles");
    expect(history[9].innerHTML).toBe("Rio");
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
            }),
        })
      );

    const history = el.querySelectorAll(".history");
    await getWeather(el);
    const res = await history[0].onclick();

    const asyncMock = jest
      .fn()
      .mockResolvedValue(
        `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
      );

    expect(el.querySelector(".city").innerHTML).toBe(`city: ${res.name}`);
    expect(el.querySelector(".temp").innerHTML).toBe(
      `temperature: ${res.main.temp - 273.15}`
    );
    expect(el.querySelector("img").src).toBe(await asyncMock());
  });
});
