import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App Component", () => {
  test("renders Weather App title", () => {
    render(<App />);
    const titleElement = screen.getByText(/Weather App/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders Load Weather button", () => {
    render(<App />);
    const buttonElement = screen.getByRole("button", { name: /Load Weather/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("weather modal is not visible initially", () => {
    render(<App />);
    const modalElement = screen.queryByRole("dialog");
    expect(modalElement).not.toBeInTheDocument();
  });
});
