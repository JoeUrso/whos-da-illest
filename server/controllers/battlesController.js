const axios = require("axios");
const qs = require("qs");

const Knex = require("knex");

const knexConfig = require("../knexfile");
const client = Knex(knexConfig);

// IMPORT FROM ENV
require("dotenv").config();

// SEND BATTLES TABLE
exports.index = async (_req, res) => {
    try {
        const data = await client("battles");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving battles: ${err}`);
    }
};

// GET TOKEN FROM SPOTIFY API
const SPOTIFY_URL = "https://api.spotify.com/v1/search?";
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

exports.getToken = async (_req, res) => {
    try {
        const response = await axios(authOptions);
        let token = response.data.access_token;
        res.status(200).json(token);
    } catch (err) {
        res.status(400).send(`Error retrieving token: ${err}`);
    }
};

// GET ARTIST DATA FROM SPOTIFY API
exports.getArtistData = async (req, res) => {
    let artistName = req.params.artistName;

    try {
        const tokenResponse = await axios(authOptions);
        let token = tokenResponse.data.access_token;

        let header = {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        };

        try {
            const artistResponse = await axios.get(
                SPOTIFY_URL + `q=artist:${artistName}` + `&type=artist`,
                {
                    headers: header,
                }
            );

            console.log(artistResponse.data.artists.items[0]);
            res.status(200).json(artistResponse.data.artists.items[0]);
        } catch (err) {
            res.status(400).send(`Error retrieving artist data: ${err}`);
        }
    } catch (err) {
        res.status(400).send(`Error retrieving token: ${err}`);
    }
};

// INCREMENT RAPPER WINS/LOSSES
const incrementBattleStats = async (battleId, incrementFields) => {
    await client("battles")
        .where("id", "=", battleId)
        .increment(incrementFields);
};

exports.incrementRapper1Wins = async (req, res) => {
    try {
        await incrementBattleStats(req.body.id, {
            rapper1_wins: 1,
            total_battles: 1,
        });
        res.sendStatus(200);
    } catch (err) {
        res.status(400).send(`Error incrementing wins: ${err}`);
    }
};

exports.incrementRapper2Wins = async (req, res) => {
    try {
        await incrementBattleStats(req.body.id, {
            rapper2_wins: 1,
            total_battles: 1,
        });
        res.sendStatus(200);
    } catch (err) {
        res.status(400).send(`Error incrementing wins: ${err}`);
    }
};
