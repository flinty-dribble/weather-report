import { getWeather } from "./weather";

beforeEach(() => {
  fetch.resetMocks();
});

describe("weather report", () => {
  it("user`s weather", async () => {
    fetch.mockResponses(
      [JSON.stringify({ latitude: 39 }), { status: 200 }],
      [JSON.stringify({ main: { temp: 290 } }), { status: 200 }]
    );

    const res = await getWeather();
    expect(res).toEqual(290);
    // expect(document.querySelector(".city").innerHTML).toBe("city: Moscow");
    // expect(document.querySelector(".temp").innerHTML).toBe("temperature: 20");
    // expect(document.querySelector("img").src).toBe(
    //  "http://openweathermap.org/img/wn/03d@2x.png"
    // );
  });
});
