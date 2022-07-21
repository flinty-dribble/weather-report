import { getWeather, weatherOfCity } from "./weather";

describe("weather report", () => {
  it("user`s weather", async () => {
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
      );

    const res = await getWeather();
    const asyncMock = jest
      .fn()
      .mockResolvedValue(
        `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
      );
    expect(document.querySelector(".city").innerHTML).toBe(`city: ${res.name}`);
    expect(document.querySelector(".temp").innerHTML).toBe(
      `temperature: ${res.main.temp - 273.15}`
    );
    expect(document.querySelector("img").src).toBe(await asyncMock());
  });

  const input = document.querySelector("input");
  const button = document.querySelector("button");

  it("input and button", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            name: "London",
            main: { temp: 295.15 },
            weather: [{ icon: "01d" }],
          }),
      })
    );

    input.value = "London";
    button.dispatchEvent(new Event("click"));

    const res = await weatherOfCity();

    const asyncMock = jest
      .fn()
      .mockResolvedValue(
        `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
      );
    expect(document.querySelector(".city").innerHTML).toBe(`city: ${res.name}`);
    expect(document.querySelector(".temp").innerHTML).toBe(
      `temperature: ${res.main.temp - 273.15}`
    );
    expect(document.querySelector("img").src).toBe(await asyncMock());
  });

  it("history", () => {
    const history = document.querySelectorAll(".history");

    input.value = "Washington";
    button.dispatchEvent(new Event("click"));
    expect(history[0].innerHTML).toBe("Washington");
    input.value = "Tokyo";
    button.dispatchEvent(new Event("click"));
    input.value = "Paris";
    button.dispatchEvent(new Event("click"));
    input.value = "New York";
    button.dispatchEvent(new Event("click"));
    input.value = "Los Angeles";
    button.dispatchEvent(new Event("click"));
    input.value = "Beijing";
    button.dispatchEvent(new Event("click"));
    input.value = "Baku";
    button.dispatchEvent(new Event("click"));
    input.value = "Sochi";
    button.dispatchEvent(new Event("click"));
    input.value = "Nepal";
    button.dispatchEvent(new Event("click"));
    input.value = "Rio";
    button.dispatchEvent(new Event("click"));
    // expect(cities[4].innerHTML).toBe(input.value)
    // expect(history).toBe(input.value);

    const secondCity = history[1];
    input.value = "Hokkaido";
    button.dispatchEvent(new Event("click"));
    expect(history[0].innerHTML).toBe(secondCity.innerHTML);

    input.value = "Paris";
    button.dispatchEvent(new Event("click"));
    expect(history[9].innerHTML).not.toBe(input.value);
  });
});
