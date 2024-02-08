const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "55re1e",
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
