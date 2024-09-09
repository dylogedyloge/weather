class WeatherService {
  private static instance: WeatherService;
  private readonly API_KEY = "25d5440f4658eeb3b677f8770eaf4392";

  private readonly BASE_URL = "https://api.openweathermap.org/data/2.5";

  private constructor() {}

  public static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  private async fetchData(endpoint: string, params: Record<string, string>) {
    const queryString = new URLSearchParams({
      ...params,
      appid: this.API_KEY,
      units: "metric", // Use metric units for temperature in Celsius
    }).toString();

    const url = `${this.BASE_URL}${endpoint}?${queryString}`;
    console.log(`Fetching data from: ${url}`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather data fetch failed: ${response.statusText}`);
    }
    return response.json();
  }

  async getCurrentWeather(lat: number, lon: number) {
    console.log(`Getting current weather for lat: ${lat}, lon: ${lon}`);
    const data = await this.fetchData("/weather", {
      lat: lat.toString(),
      lon: lon.toString(),
    });
    console.log("Current weather data:", data);
    return {
      location: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
    };
  }

  async getForecast(lat: number, lon: number) {
    console.log(`Getting forecast for lat: ${lat}, lon: ${lon}`);
    const data = await this.fetchData("/forecast", {
      lat: lat.toString(),
      lon: lon.toString(),
    });
    console.log("Forecast data:", data);
    return data.list
      .filter((_: any, index: number) => index % 8 === 0) // Get data for every 24 hours
      .slice(0, 5) // Get 5 days forecast
      .map((item: any) => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        temperature: item.main.temp,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      }));
  }

  async getCurrentWeatherByCity(city: string) {
    console.log(`Getting current weather for city: ${city}`);
    const data = await this.fetchData("/weather", { q: city });
    console.log("Current weather data:", data);
    return {
      location: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
    };
  }

  async getForecastByCity(city: string) {
    console.log(`Getting forecast for city: ${city}`);
    const data = await this.fetchData("/forecast", { q: city });
    console.log("Forecast data:", data);
    return data.list
      .filter((_: any, index: number) => index % 8 === 0) // Get data for every 24 hours
      .slice(0, 5) // Get 5 days forecast
      .map((item: any) => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        temperature: item.main.temp,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      }));
  }
}

export default WeatherService;
