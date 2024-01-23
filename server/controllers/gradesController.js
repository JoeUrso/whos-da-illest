const Knex = require("knex");
const knexConfig = require("../knexfile");
const client = Knex(knexConfig);

// SEND GRADES TABLE
exports.index = async (_req, res) => {
    try {
        const data = await client("grades");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving grades: ${err}`);
    }
};

// SEND AVERAGE GRADE
exports.AvgGrades = async (_req, res) => {
    try {
        const avgGrades = await client("grades")
            .select("rapper_id")
            .avg("grade as avgGrade")
            .groupBy("rapper_id");
        res.status(200).json(avgGrades);
    } catch (err) {
        res.status(400).send(`Error calculating average grades: ${err}`);
    }
};

// ADD NEW GRADE TO GRADES TABLE
exports.addNewGrade = async (req, res) => {
    try {
        await client("grades").insert(req.body);
        res.status(200).send("Grade added successfully");
    } catch (err) {
        res.status(400).send(`Error adding grade: ${err}`);
    }
};
