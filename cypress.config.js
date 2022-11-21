const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://wave-trial.getbynder.com/',
    video: false,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json'
    },
    screenshotOnRunFailure: true,
    screenshotsFolder:"mochawesome-report",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
  env: {
    "apiUrl": "https://api.themoviedb.org/3/",
    "apiKey": "bc4572da1285e968946fe454c434a518",
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzQ1NzJkYTEyODVlOTY4OTQ2ZmU0NTRjNDM0YTUxOCIsInN1YiI6IjYzNzY5ZDY5MzM2ZTAxMDBkOTc3ODI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LDFAzvkNhhasA3k3K1ruus2F_v04mJBeC5c3oiZYNtQ"
  }
});
