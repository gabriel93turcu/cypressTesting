const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    chromeWebSecurity: false
    //baseUrl: "https://www.emag.ro/"
  },
});
