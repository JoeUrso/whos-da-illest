const Knex = require("knex");
const knexConfig = require("../knexfile");
const client = Knex(knexConfig);

// SEND RAPPERS TABLE
exports.index = async (_req, res) => {
    try {
        const data = await client("rappers");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving rappers: ${err}`);
    }
};

// Function to edit wins or losses of a rapper
const editRapperStats = async (rapperId, field, res) => {
    try {
        await client("rappers")
            .where({ id: rapperId })
            .increment({ [field]: 1 });
        res.status(200).send(
            `${field} updated successfully for rapper ID ${rapperId}`
        );
    } catch (err) {
        res.status(400).send(`Error updating ${field}: ${err}`);
    }
};

// EDIT RAPPER WINS OR LOSSES
exports.editRapperWins = async (req, res) => {
    await editRapperStats(req.body.rapper_id, "wins", res);
};

exports.editRapperLosses = async (req, res) => {
    await editRapperStats(req.body.rapper_id, "losses", res);
};
