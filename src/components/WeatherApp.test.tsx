import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";

import { setupServer } from "msw/node";
import WeatherApp from "./WeatherApp";

const server = setupServer(
  rest.get(
    "https://api.openweathermap.org/data/2.5/weather",
    (req, res, ctx) => {
      return res(
        ctx.json({
          name: "Mock City",
          main: { temp: 20, humidity: 50 },
          weather: [{ description: "Mock weather", icon: "01d" }],
          wind: { speed: 5 },
        })
      );
    }
  ),
  rest.get(
    "https://api.openweathermap.org/data/2.5/forecast",
    (req, res, ctx) => {
      return res(
        ctx.json({
          list: [
            {
              dt: 1620000000,
              main: { temp: 22 },
              weather: [{ description: "Mock forecast", icon: "02d" }],
            },
          ],
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("WeatherApp Component", () => {
  it("renders weather data correctly", async () => {
    render(<WeatherApp />);

    expect(screen.getByText("Loading weather data...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Current Weather")).toBeInTheDocument();
      expect(screen.getByText("Mock City")).toBeInTheDocument();
      expect(screen.getByText("20°C")).toBeInTheDocument();
      expect(screen.getByText("Mock weather")).toBeInTheDocument();
      expect(screen.getByText("5-Day Forecast")).toBeInTheDocument();
      expect(screen.getByText("22°C")).toBeInTheDocument();
      expect(screen.getByText("Mock forecast")).toBeInTheDocument();
    });
  });
});
