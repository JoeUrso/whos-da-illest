const Knex = require("knex");
require("dotenv").config();

const config = {
    client: "cockroachdb",
    connection: process.env.DATABASE_URL,
    migrations: {
        directory: "migrations",
    },
    seeds: {
        directory: "seeds",
    },
};

module.exports = config;
