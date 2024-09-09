// describe("Weather App", () => {
//   it("loads and displays weather data", () => {
//     cy.visit("/");

//     // Click the "Load Weather" button
//     cy.contains("Load Weather").click();

//     // Wait for the modal to appear
//     // cy.get("#modal", { timeout: 10000 }).should("be.visible");

//     // Check for the presence of weather data
//     cy.contains("Current Weather", { timeout: 10000 }).should("be.visible");
//     cy.contains("5-Day Forecast", { timeout: 10000 }).should("be.visible");

//     // Check for specific weather data
//     // Note: We're using 'contains' without the colon (:) as it's looking for the exact text
//     cy.contains("Temperature").should("be.visible");
//     cy.contains("Humidity").should("be.visible");
//     cy.contains("Wind Speed").should("be.visible");

//     // Check if there's any numeric data displayed (assuming temperature, humidity, and wind speed are numbers)
//     cy.get("#modal").within(() => {
//       cy.contains(/\d+/).should("be.visible");
//     });

//     // Close the modal
//     cy.get("#closeModalBtn").click();

//     // Verify that the modal is closed
//     cy.get("#modal").should("not.be.visible");
//   });
// });
describe("Weather App", () => {
  it("loads and displays weather data", () => {
    cy.visit("/");

    // Click the "Load Weather" button
    cy.contains("Load Weather").click();

    // Wait for the modal to appear
    cy.get("#modal", { timeout: 10000 }).should("be.visible");

    // Check for loading state
    cy.contains("Loading weather data...").should("be.visible");

    // Wait for either weather data or the city input to appear
    cy.get("body").then(($body) => {
      if ($body.find("#cityInput").length > 0) {
        // If geolocation failed, test the city input functionality
        cy.get("#cityInput").should("be.visible").type("London");
        cy.contains("Get Weather").click();

        // Wait for weather data to load
        cy.contains("Current Weather", { timeout: 20000 }).should("be.visible");
        cy.contains("5-Day Forecast").should("be.visible");

        // Check for specific weather data
        cy.contains("Temperature").should("be.visible");
        cy.contains("Humidity").should("be.visible");
        cy.contains("Wind Speed").should("be.visible");

        // Check if there's any numeric data displayed
        cy.get("#modal").within(() => {
          cy.contains(/\d+/).should("be.visible");
        });
      } else {
        // If geolocation succeeded, weather data should be visible
        cy.contains("Current Weather", { timeout: 20000 }).should("be.visible");
        cy.contains("5-Day Forecast").should("be.visible");

        // Check for specific weather data
        cy.contains("Temperature").should("be.visible");
        cy.contains("Humidity").should("be.visible");
        cy.contains("Wind Speed").should("be.visible");

        // Check if there's any numeric data displayed
        cy.get("#modal").within(() => {
          cy.contains(/\d+/).should("be.visible");
        });
      }
    });

    // Close the modal
    cy.get("#closeModalBtn").click();

    // Verify that the modal is closed
    cy.get("#modal").should("not.be.visible");
  });
});
