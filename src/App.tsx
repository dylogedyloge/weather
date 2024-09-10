import React, { useState, useEffect } from "react";
import WeatherApp from "./components/WeatherApp";

const App: React.FC = () => {
  const [showWeatherApp, setShowWeatherApp] = useState(false);
  const [weatherSummary, setWeatherSummary] = useState<any>(null);

  useEffect(() => {
    const loadWeatherBtn = document.getElementById("loadWeatherBtn");
    if (loadWeatherBtn) {
      loadWeatherBtn.addEventListener("click", () => setShowWeatherApp(true));
    }

    return () => {
      if (loadWeatherBtn) {
        loadWeatherBtn.removeEventListener("click", () =>
          setShowWeatherApp(true)
        );
      }
    };
  }, []);

  useEffect(() => {
    if (weatherSummary) {
      const landingPage = document.getElementById("landing-page");
      const weatherSummaryElement = document.getElementById("weatherSummary");
      const locationElement = document.getElementById("location");
      const temperatureElement = document.getElementById("temperature");
      const descriptionElement = document.getElementById("description");
      const lastUpdatedElement = document.getElementById("lastUpdated");

      if (
        landingPage &&
        weatherSummaryElement &&
        locationElement &&
        temperatureElement &&
        descriptionElement &&
        lastUpdatedElement
      ) {
        landingPage.style.display = "block";
        weatherSummaryElement.classList.remove("hidden");
        locationElement.textContent = `Location: ${weatherSummary.location}`;
        temperatureElement.textContent = `Temperature: ${weatherSummary.temperature.toFixed(
          1
        )}°C`;
        descriptionElement.textContent = `Description: ${weatherSummary.description}`;
        lastUpdatedElement.textContent = `Last Updated: ${weatherSummary.lastUpdated.toLocaleString()}`;
      }
    }
  }, [weatherSummary]);

  const handleWeatherUpdate = (summary: any) => {
    setWeatherSummary(summary);
    // setShowWeatherApp(false);
  };

  return (
    <div className="App">
      {showWeatherApp ? (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-3/4 overflow-auto">
            <button
              className="float-right text-gray-600 hover:text-gray-800"
              onClick={() => setShowWeatherApp(false)}
            >
              &times;
            </button>
            <WeatherApp onWeatherUpdate={handleWeatherUpdate} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
