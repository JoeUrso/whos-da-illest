const fs = require("fs");

// READ CRITERIA JSON FILE
const path = require("path");
function readCriteria() {
    const filePath = path.join(__dirname, "../data/criteria.json");
    const data = fs.readFileSync(filePath);
    const parsedData = JSON.parse(data);
    return parsedData;
}

// SEND CRITERIA
exports.index = (_req, res) => {
    const criteria = readCriteria();
    res.send(criteria);
};
