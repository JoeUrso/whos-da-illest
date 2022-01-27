const express = require("express");
const app = express();
const cors = require("cors");
const battlesRoutes = require("./routes/battlesRoute");
const rappersRoutes = require("./routes/rappersRoute");
const gradesRoutes = require("./routes/gradesRoute");
const knex = require("knex")(require("./knexfile").development);

// Import from .env
require("dotenv").config();
const PORT = process.env.PORT;

// Enable cors and allow paths to read req.body (let post read json input)
app.use(cors());
app.use(express.json());

// default routes
app.use("/battles", battlesRoutes);
app.use("/rappers", rappersRoutes);
app.use("/grades", gradesRoutes);

app.listen(PORT, () => {
    console.log("server running on port", PORT);
});
