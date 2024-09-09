import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Forecast from "./Forecast";

const mockData = [
  { date: "2023-05-01", temperature: 22, description: "Sunny", icon: "01d" },
  {
    date: "2023-05-02",
    temperature: 23,
    description: "Partly cloudy",
    icon: "02d",
  },
];

describe("Forecast Component", () => {
  it("renders correctly with given data", () => {
    render(<Forecast data={mockData} />);

    expect(screen.getByText("5-Day Forecast")).toBeInTheDocument();
    expect(screen.getByText("2023-05-01")).toBeInTheDocument();
    expect(screen.getByText("22.0°C")).toBeInTheDocument();
    expect(screen.getByText("Sunny")).toBeInTheDocument();
    expect(screen.getByText("2023-05-02")).toBeInTheDocument();
    expect(screen.getByText("23.0°C")).toBeInTheDocument();
    expect(screen.getByText("Partly cloudy")).toBeInTheDocument();
    expect(screen.getAllByAltText("Weather icon")).toHaveLength(2);
  });
});
