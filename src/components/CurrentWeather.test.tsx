import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CurrentWeather from "./CurrentWeather";

const mockData = {
  location: "New York",
  temperature: 20.5,
  description: "Cloudy",
  humidity: 60,
  windSpeed: 5.5,
  icon: "04d",
};

describe("CurrentWeather Component", () => {
  it("renders correctly with given data", () => {
    render(<CurrentWeather data={mockData} />);

    expect(screen.getByText("Current Weather")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("20.5°C")).toBeInTheDocument();
    expect(screen.getByText("Cloudy")).toBeInTheDocument();
    expect(screen.getByText("60%")).toBeInTheDocument();
    expect(screen.getByText("5.5 m/s")).toBeInTheDocument();
    expect(screen.getByAltText("Weather icon")).toHaveAttribute(
      "src",
      "http://openweathermap.org/img/wn/04d@4x.png"
    );
  });
});
