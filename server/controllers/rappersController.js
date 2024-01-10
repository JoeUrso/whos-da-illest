const Knex = require("knex");

const knexConfig = require("../knexfile");
const client = Knex(knexConfig);

// SEND RAPPERS TABLE
exports.index = (_req, res) => {
    client("rappers")
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving rappers: ${err}`)
        );
};

// ADD A WIN TO RAPPER
exports.editRapper1Wins = (req, res) => {
    client("rappers")
        .where({ id: req.body.rapper1_id })
        .increment({ wins: 1 })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving rappers: ${err}`)
        );
};

exports.editRapper2Wins = (req, res) => {
    client("rappers")
        .where({ id: req.body.rapper2_id })
        .increment({ wins: 1 })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving rappers: ${err}`)
        );
};

// ADD A LOSS TO RAPPER
exports.editRapper1Losses = (req, res) => {
    client("rappers")
        .where({ id: req.body.rapper1_id })
        .increment({ losses: 1 })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving rappers: ${err}`)
        );
};

exports.editRapper2Losses = (req, res) => {
    client("rappers")
        .where({ id: req.body.rapper2_id })
        .increment({ losses: 1 })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving rappers: ${err}`)
        );
};
