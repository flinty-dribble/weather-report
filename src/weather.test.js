import { getWeather } from "./weather";

describe("weather report", () => {
  it("user`s weather", async () => {
    const asyncMock = jest
      .fn()
      .mockResolvedValue("default")
      .mockResolvedValueOnce(
        (await fetch("https://get.geojs.io/v1/ip/geo.json")).json()
      )
      .mockResolvedValueOnce(getWeather());

    expect(await asyncMock()).toEqual(290);

    // expect(document.querySelector(".city").innerHTML).toBe("city: Moscow");
    // expect(document.querySelector(".temp").innerHTML).toBe("temperature: 20");
    // expect(document.querySelector("img").src).toBe(
    //  "http://openweathermap.org/img/wn/03d@2x.png"
    // );
  });
});
