const axios = require("axios");
const qs = require("qs");

const Knex = require("knex");

const knexConfig = require("../knexfile");
const client = Knex(knexConfig);

// IMPORT FROM ENV
require("dotenv").config();

// SEND BATTLES TABLE
exports.index = (_req, res) => {
    client("battles")
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving battles: ${err}`)
        );
};

const SPOTIFY_URL = "https://api.spotify.com/v1/search?";

// GET TOKEN FROM SPOTIFY API
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET_KEY;

const authOptions = {
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
        Authorization:
            "Basic " +
            Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify({
        grant_type: "client_credentials",
    }),
};

exports.getToken = (_req, res) => {
    axios(authOptions)
        .then((response) => {
            let token = response.data.access_token;
            res.status(200).json(token);
        })
        .catch((err) => res.status(400).send(`Error retrieving token: ${err}`));
};

exports.getArtistData = (req, res) => {
    let artistName = req.params.artistName;

    axios(authOptions)
        .then((response) => {
            let token = response.data.access_token;

            let header = {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            };

            axios
                .get(SPOTIFY_URL + `q=artist:${artistName}` + `&type=artist`, {
                    headers: header,
                })
                .then((response) => {
                    console.log(response.data.artists.items[0]);
                    res.status(200).json(response.data.artists.items[0]);
                })
                .catch((err) =>
                    res.status(400).send(`Error retrieving artist data: ${err}`)
                );
        })
        .catch((err) => res.status(400).send(`Error retrieving token: ${err}`));
};

// INCREMENT RAPPER WINS/LOSSES
exports.incrementRapper1Wins = (req, res) => {
    client("battles")
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
    client("battles")
        .where("id", "=", req.body.id)
        .increment({ rapper2_wins: 1, total_battles: 1 })
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.status(400).send(`Error incrementing wins: ${err}`);
        });
};
