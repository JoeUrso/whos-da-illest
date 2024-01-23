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

export const postGrade = async (grade, rapperId) => {
    const newGrade = {
        // TODO use a better id generator
        id: Math.floor(Math.random() * 1000000),
        grade: grade,
        rapper_id: rapperId,
    };
    return axios.post(API_URL + "/grades", newGrade);
};

export const updateRapperStats = async (winnerId, loserId) => {
    try {
        await axios.patch(`${API_URL}/rappers/rapper-wins`, {
            rapper_id: winnerId,
        });
        await axios.patch(`${API_URL}/rappers/rapper-losses`, {
            rapper_id: loserId,
        });
    } catch (error) {
        console.error(`Error updating rapper stats: ${error}`);
    }
};

export const updateBattleStats = async (
    battleId,
    winnerId,
    rapper1,
    rapper2
) => {
    if (winnerId === rapper1) {
        await axios.patch(API_URL + "/battles/rapper1", { id: battleId });
    } else if (winnerId === rapper2) {
        await axios.patch(API_URL + "/battles/rapper2", { id: battleId });
    } else {
        throw new Error("Invalid winnerId");
    }
};
