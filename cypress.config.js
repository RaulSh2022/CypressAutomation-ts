const { defineConfig } = require('cypress')
module.exports = defineConfig({
  videoCompression: false
})
module.exports = defineConfig({
  projectId: 'v441n8',
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 20000,
  viewportWidth: 1536,
  viewportHeight: 960,
  reporter: "mochawesome",
  scrollBehavior: false,
  video: true,
  videoUploadOnPasses: true,
  videoCompression: 15,

  env: {
    url: 'https://portal.gentem.co/login',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})
