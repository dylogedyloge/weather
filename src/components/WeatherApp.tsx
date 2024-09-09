import React, { useState, useEffect } from "react";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import WeatherService from "../services/WeatherService";

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

interface WeatherAppProps {
  onWeatherUpdate?: (summary: {
    location: string;
    temperature: number;
    description: string;
    lastUpdated: Date;
  }) => void;
}

const WeatherApp: React.FC<WeatherAppProps> = ({ onWeatherUpdate }) => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    const addDebugInfo = (info: string) => {
      setDebugInfo((prev) => prev + "\n" + info);
      console.log(info);
    };

    const fetchWeatherData = async (lat: number, lon: number) => {
      try {
        addDebugInfo(`Fetching weather data for lat: ${lat}, lon: ${lon}`);
        const weatherService = WeatherService.getInstance();
        const currentWeatherData = await weatherService.getCurrentWeather(
          lat,
          lon
        );
        addDebugInfo("Current weather data fetched");
        const forecastData = await weatherService.getForecast(lat, lon);
        addDebugInfo("Forecast data fetched");

        setCurrentWeather(currentWeatherData);
        setForecast(forecastData);

        if (onWeatherUpdate) {
          onWeatherUpdate({
            location: currentWeatherData.location,
            temperature: currentWeatherData.temperature,
            description: currentWeatherData.description,
            lastUpdated: new Date(),
          });
        }
      } catch (err) {
        console.error("Error fetching weather data:", err);
        addDebugInfo(
          `Error: ${err instanceof Error ? err.message : String(err)}`
        );
        setError("Failed to fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    addDebugInfo("Requesting geolocation");

    const geolocationTimeout = setTimeout(() => {
      addDebugInfo("Geolocation request timed out");
      setError(
        "Geolocation request timed out. Please try again or enter your location manually."
      );
      setLoading(false);
    }, 10000); // 10 seconds timeout

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(geolocationTimeout);
        addDebugInfo(
          `Geolocation obtained: ${position.coords.latitude}, ${position.coords.longitude}`
        );
        fetchWeatherData(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        clearTimeout(geolocationTimeout);
        console.error("Geolocation error:", err);
        addDebugInfo(`Geolocation error: ${err.message}`);
        setError(
          `Unable to retrieve your location: ${err.message}. Please enable location services or enter your location manually.`
        );
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => {
      clearTimeout(geolocationTimeout);
    };
  }, [onWeatherUpdate]);

  const handleManualLocationSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const cityName = (
      event.currentTarget.elements.namedItem("cityName") as HTMLInputElement
    ).value;
    if (cityName) {
      setLoading(true);
      setError(null);
      setDebugInfo("Fetching weather data for manually entered location");
      const weatherService = WeatherService.getInstance();
      weatherService
        .getCurrentWeatherByCity(cityName)
        .then((currentWeatherData) => {
          setCurrentWeather(currentWeatherData);
          return weatherService.getForecastByCity(cityName);
        })
        .then((forecastData) => {
          setForecast(forecastData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching weather data:", err);
          setError(
            `Failed to fetch weather data for ${cityName}. Please check the city name and try again.`
          );
          setLoading(false);
        });
    }
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <Spinner />
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Loading weather data...
        </p>
        {debugInfo && (
          <pre className="text-left text-xs mt-4 p-2 bg-gray-100 rounded-md overflow-auto max-h-40">
            {debugInfo}
          </pre>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">{error}</p>
        <form onSubmit={handleManualLocationSubmit} className="mt-4">
          <input
            type="text"
            name="cityName"
            placeholder="Enter city name"
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Get Weather
          </button>
        </form>
        <pre className="text-left text-xs mt-4">{debugInfo}</pre>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Weather App</h2>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      <pre className="text-left text-xs mt-4">{debugInfo}</pre>
    </div>
  );
};

export default WeatherApp;
