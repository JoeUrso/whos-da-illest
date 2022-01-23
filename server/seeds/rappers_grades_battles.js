const rappersData = require("../seed_data/rappers");
const battlesData = require("../seed_data/battles");
const gradesData = require("../seed_data/grades");

exports.seed = function (knex) {
    return knex("rappers")
        .del()
        .then(function () {
            return knex("rappers").insert(rappersData);
        })
        .then(() => {
            return knex("battles").del();
        })
        .then(() => {
            return knex("battles").insert(battlesData);
        })
        .then(() => {
            return knex("grades").del();
        })
        .then(() => {
            return knex("grades").insert(gradesData);
        });
};
