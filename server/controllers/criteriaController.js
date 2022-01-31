const fs = require("fs");

function readCriteria() {
    const data = fs.readFileSync("./data/criteria.json");
    const parsedData = JSON.parse(data);
    return parsedData;
}

exports.index = (_req, res) => {
    const criteria = readCriteria();
    res.send(criteria);
};
