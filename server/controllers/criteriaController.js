const fs = require("fs");

// READ CRITERIA JSON FILE
function readCriteria() {
    const data = fs.readFileSync("./data/criteria.json");
    const parsedData = JSON.parse(data);
    return parsedData;
}

// SEND CRITERIA
exports.index = (_req, res) => {
    const criteria = readCriteria();
    res.send(criteria);
};
