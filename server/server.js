const express = require("express");
const app = express();
const cors = require("cors");
const battleRoutes = require("./routes/battleRoute");
const rapperRoutes = require("./routes/rapperRoute");

// Import from .env
require("dotenv").config();
const PORT = process.env.PORT || 8000;

// Enable cors and allow paths to read req.body (let post read json input)
app.use(cors());
app.use(express.json());

// default routes
app.use("/battle", battleRoutes);
app.use("/rapper", rapperRoutes);

app.listen(PORT, () => {
    console.log("server running on port", PORT);
});
