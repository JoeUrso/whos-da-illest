const axios = require("axios");
const qs = require("qs");

const Knex = require("knex");

const knexConfig = require("../knexfile");
const client = Knex(knexConfig);

// IMPORT FROM ENV
require("dotenv").config();

// SEND BATTLES TABLE
exports.index = (_req, res) => {
    knex("battles")
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving battles: ${err}`)
        );
};

// GET TOKEN FROM SPOTIFY API
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET_KEY;

const headers = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
        username: clientId,
        password: clientSecret,
    },
};
const data = {
    grant_type: "client_credentials",
};

// GET RAPPER INFO FROM SPOTIFY
exports.getToken = (_req, res) => {
    axios
        .post(
            "https://accounts.spotify.com/api/token",
            qs.stringify(data),
            headers
        )
        .then((response) => {
            let token = response.data.access_token;
            console.log(token);
            res.status(200).json(token);
        })
        .catch((err) => res.status(400).send(`Error retrieving token: ${err}`));
};

// INCREMENT RAPPER WINS/LOSSES
exports.incrementRapper1Wins = (req, res) => {
    knex("battles")
        .where("id", "=", req.body.id)
        .increment({ rapper1_wins: 1, total_battles: 1 })
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.status(400).send(`Error incrementing wins: ${err}`);
        });
};

exports.incrementRapper2Wins = (req, res) => {
    knex("battles")
        .where("id", "=", req.body.id)
        .increment({ rapper2_wins: 1, total_battles: 1 })
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.status(400).send(`Error incrementing wins: ${err}`);
        });
};
