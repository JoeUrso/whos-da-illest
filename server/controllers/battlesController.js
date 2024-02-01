const Knex = require("knex");

const knexConfig = require("../knexfile");
const client = Knex(knexConfig);

const spotify = require("./spotify");

// SEND BATTLES TABLE
exports.index = async (_req, res) => {
    try {
        const data = await client("battles");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving battles: ${err}`);
    }
};

// SEND BATTLE BY ID
exports.getBattleById = async (req, res) => {
    try {
        const battle = await client("battles")
            .where("id", "=", req.params.id)
            .first();
        res.status(200).json(battle);
    } catch (err) {
        res.status(400).send(`Error retrieving battle: ${err}`);
    }
};

// GET TOKEN FROM SPOTIFY API
exports.getToken = async (_req, res) => {
    try {
        let token = await spotify.getToken();
        res.status(200).json(token);
    } catch (err) {
        res.status(400).send(`Error retrieving token: ${err}`);
    }
};

// GET ARTIST DATA FROM SPOTIFY API
exports.getArtistData = async (req, res) => {
    let artistName = req.params.artistName;

    try {
        const artistData = await spotify.getArtistData(artistName);
        res.status(200).json(artistData);
    } catch (err) {
        res.status(400).send(`Error retrieving artist data: ${err}`);
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
