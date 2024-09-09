const { defineConfig } = require("cypress");
const webpackConfig = require("./cypress/webpack.config.js");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on(
        "file:preprocessor",
        require("@cypress/webpack-preprocessor")({
          webpackOptions: webpackConfig,
        })
      );
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
