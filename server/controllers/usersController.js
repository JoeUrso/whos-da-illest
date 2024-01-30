const Knex = require("knex");
const knexConfig = require("../knexfile");
const client = Knex(knexConfig);

// ADD A USER TO DB
exports.addNewUser = async (req, res) => {
    const { id, first_name, last_name, email_address } = req.body;

    try {
        const existingUser = await client("users").where("id", id).first();

        if (!existingUser) {
            await client("users").insert({
                id,
                first_name,
                last_name,
                email_address,
            });
            res.status(201).send("User added to database");
        } else {
            res.status(200).send("User already exists");
        }
    } catch (err) {
        res.status(400).send(`Error adding user: ${err}`);
    }
};
