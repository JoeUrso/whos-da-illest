const Knex = require("knex");

const knexConfig = require("../knexfile");
const client = Knex(knexConfig);

// SEND USER BATTLES TABLE
exports.index = async (_req, res) => {
    try {
        const data = await client("user_battles");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving battles: ${err}`);
    }
};

// SEND USER BATTLE BY USER ID
exports.getUserBattlesByUserId = async (req, res) => {
    try {
        const data = await client("user_battles")
            .where("user_id", req.params.id)
            .first();
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving battles: ${err}`);
    }
};

// SEND TOTAL USER BATTLES COUNT BY USER ID
exports.getUserBattlesCountByUserId = async (req, res) => {
    try {
        const data = await client("user_battles")
            .where("user_id", req.params.id)
            .count();
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving battles: ${err}`);
    }
};

// ADD USER BATTLE
exports.addUserBattle = async (req, res) => {
    try {
        const data = await client("user_battles").insert(req.body);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error adding battle: ${err}`);
    }
};
