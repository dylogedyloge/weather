import WeatherApp from "../src/App";

class WeatherLandingPage {
  private static instance: WeatherLandingPage;
  private weatherSummary: {
    location: string;
    temperature: number;
    description: string;
    lastUpdated: Date;
  } | null = null;

  private constructor() {
    this.initEventListeners();
  }

  public static getInstance(): WeatherLandingPage {
    if (!WeatherLandingPage.instance) {
      WeatherLandingPage.instance = new WeatherLandingPage();
    }
    return WeatherLandingPage.instance;
  }

  private initEventListeners(): void {
    const loadWeatherBtn = document.getElementById("loadWeatherBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modal = document.getElementById("modal");

    loadWeatherBtn?.addEventListener("click", this.openWeatherApp.bind(this));
    closeModalBtn?.addEventListener("click", this.closeWeatherApp.bind(this));
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeWeatherApp();
      }
    });
  }

  private openWeatherApp(): void {
    const modal = document.getElementById("modal");
    const weatherAppContainer = document.getElementById("weatherAppContainer");

    if (modal && weatherAppContainer) {
      modal.classList.remove("hidden");
      const weatherApp = new WeatherApp({
        onWeatherUpdate: this.updateWeatherSummary.bind(this),
      });
      weatherApp.render(weatherAppContainer);
    }
  }

  private closeWeatherApp(): void {
    const modal = document.getElementById("modal");
    const weatherAppContainer = document.getElementById("weatherAppContainer");

    if (modal && weatherAppContainer) {
      modal.classList.add("hidden");
      weatherAppContainer.innerHTML = "";
      this.updateLandingPage();
    }
  }

  private updateWeatherSummary(summary: typeof this.weatherSummary): void {
    this.weatherSummary = summary;
  }

  private updateLandingPage(): void {
    if (this.weatherSummary) {
      const weatherSummaryElement = document.getElementById("weatherSummary");
      const locationElement = document.getElementById("location");
      const temperatureElement = document.getElementById("temperature");
      const descriptionElement = document.getElementById("description");
      const lastUpdatedElement = document.getElementById("lastUpdated");

      if (
        weatherSummaryElement &&
        locationElement &&
        temperatureElement &&
        descriptionElement &&
        lastUpdatedElement
      ) {
        weatherSummaryElement.classList.remove("hidden");
        locationElement.textContent = `Location: ${this.weatherSummary.location}`;
        temperatureElement.textContent = `Temperature: ${this.weatherSummary.temperature}°C`;
        descriptionElement.textContent = `Description: ${this.weatherSummary.description}`;
        lastUpdatedElement.textContent = `Last Updated: ${this.weatherSummary.lastUpdated.toLocaleString()}`;
      }
    }
  }
}

const weatherLandingPage = WeatherLandingPage.getInstance();
