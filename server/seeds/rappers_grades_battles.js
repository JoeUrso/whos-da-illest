const rappersData = require("../seed_data/rappers");
const battlesData = require("../seed_data/battles");
const gradesData = require("../seed_data/grades");
const usersData = require("../seed_data/users");
const userBattlesData = require("../seed_data/user_battles");

exports.seed = async function (knex) {
    await Promise.all([
        knex("rappers").delete(),
        knex("battles").delete(),
        knex("grades").delete(),
        knex("users").delete(),
        knex("user_battles").delete(),
    ]);

    await Promise.all([
        knex("rappers").insert(rappersData),
        knex("battles").insert(battlesData),
        knex("grades").insert(gradesData),
        knex("users").insert(usersData),
        knex("user_battles").insert(userBattlesData),
    ]);
};
