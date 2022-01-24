const knex = require("knex")(require("../knexfile").development);

exports.index = (_req, res) => {
    knex("rappers")
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving rappers: ${err}`)
        );
};

exports.rappersWithGrades = (_req, res) => {
    knex("grades")
        .where("rapper_id" === "rapper_id")
        .avg("grade")
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving rappers: ${err}`)
        );
};
