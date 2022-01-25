const knex = require("knex")(require("../knexfile").development);

exports.index = (_req, res) => {
    knex("grades")
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving grades: ${err}`)
        );
};

exports.AvgGrades = (_req, res) => {
    knex("grades")
        .then((grades) => {
            let avgGrades = [];

            for (let i = 0; i < grades.length; i++) {
                const individualGrade = grades[i];

                let rapperGrades = grades.filter(
                    (grade) => grade.rapper_id === individualGrade.rapper_id
                );

                let rapperAvgGrade = () => {
                    let rapperGradesSum = 0;
                    let rapperGradesCount = 0;
                    let rapperId = "";

                    rapperGrades.forEach((grade) => {
                        rapperGradesSum += grade.grade;
                        rapperGradesCount++;
                        rapperId = grade.rapper_id;
                    });

                    return {
                        avgGrade: Math.round(
                            rapperGradesSum / rapperGradesCount
                        ),
                        rapper_id: rapperId,
                    };
                };

                let foundAvgGrade = rapperAvgGrade();

                avgGrades.push(foundAvgGrade);
            }

            removeDuplicates = () => {
                let allAvgGrades = new Set();
                return avgGrades.filter(
                    (obj) =>
                        !allAvgGrades.has(obj["rapper_id"]) &&
                        allAvgGrades.add(obj["rapper_id"])
                );
            };

            let avgGradesNoDuplicates = removeDuplicates();
            res.status(200).json(avgGradesNoDuplicates);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving rappers: ${err}`)
        );
};
