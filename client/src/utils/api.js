import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:8080";

export const fetchRappers = async () => {
    try {
        const response = await axios.get(API_URL + "/rappers");
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch rappers: " + error);
    }
};

export const fetchRapperGrades = async (rappersData) => {
    try {
        const response = await axios.get(API_URL + "/grades/avg-grades");
        const gradesData = response.data;

        const rappersWithGrades = rappersData.map((rapper) => {
            const foundGrade = gradesData.find(
                (grade) => grade.rapper_id === rapper.id
            );
            return {
                ...rapper,
                grade: foundGrade ? foundGrade.avgGrade : null,
            };
        });

        return rappersWithGrades;
    } catch (error) {
        throw new Error("Failed to fetch grades: " + error);
    }
};

export const fetchBattles = async (rappersData) => {
    try {
        const response = await axios.get(API_URL + "/battles");
        const battlesData = response.data;

        const battlesWithRapperNames = battlesData.map((battle) => {
            const rapper1 = rappersData.find(
                (rapper) => rapper.id === battle.rapper1_id
            );
            const rapper2 = rappersData.find(
                (rapper) => rapper.id === battle.rapper2_id
            );
            return {
                ...battle,
                rapper1_name: rapper1 ? rapper1.name : null,
                rapper2_name: rapper2 ? rapper2.name : null,
            };
        });

        return battlesWithRapperNames;
    } catch (error) {
        throw new Error("Failed to fetch battles: " + error);
    }
};

export const postGrade = async (grade, rapperId) => {
    const newGrade = {
        // TODO use a better id generator
        id: Math.floor(Math.random() * 1000000),
        grade: grade,
        rapper_id: rapperId,
    };
    return axios.post(API_URL + "/grades", newGrade);
};

export const updateBattleAndRapper = async (
    winner,
    battle,
    rapper1,
    rapper2
) => {
    let winnerUrl, loserUrl;
    if (winner.toLowerCase() === rapper1.name.toLowerCase()) {
        winnerUrl = "/rappers/rapper1-wins";
        loserUrl = "/rappers/rapper2-losses";
    } else {
        winnerUrl = "/rappers/rapper2-wins";
        loserUrl = "/rappers/rapper1-losses";
    }

    await axios.patch(API_URL + "/battles/" + winner, battle);
    await axios.patch(API_URL + winnerUrl, battle);
    return axios.patch(API_URL + loserUrl, battle);
};

export const getBattle = async (battleId) => {
    const response = await axios.get(API_URL + "/battles");
    const battles = response.data;
    return battles.find((battle) => battle.id === battleId);
};

export const getRapperData = async (rapperName) => {
    const response = await axios.get(
        API_URL + `/battles/rapper-data/${rapperName}`
    );
    return response.data;
};

export const getCriteria = async () => {
    const response = await axios.get(API_URL + "/criteria");
    return response.data;
};
