const rappersData = require("../seed_data/rappers");
const battlesData = require("../seed_data/battles");
const gradesData = require("../seed_data/grades");

exports.seed = async function (knex) {
    await Promise.all([
        knex("rappers").delete(),
        knex("battles").delete(),
        knex("grades").delete(),
    ]);

    await Promise.all([
        knex("rappers").insert(rappersData),
        knex("battles").insert(battlesData),
        knex("grades").insert(gradesData),
    ]);
};
