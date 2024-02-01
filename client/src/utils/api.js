import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const fetchRappers = async () => {
    try {
        const response = await axios.get(`${API_URL}/rappers`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: `Failed to fetch rappers: ${error}` };
    }
};

export const fetchRapperGrades = async (rappersData) => {
    // TODO should this be handled on the backend?
    try {
        const response = await axios.get(`${API_URL}/grades/avg-grades`);
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

        return { data: rappersWithGrades, error: null };
    } catch (error) {
        return { data: null, error: `Failed to fetch grades: ${error}` };
    }
};

export const fetchBattles = async (rappersData) => {
    // TODO should this be handled on the backend?
    try {
        const response = await axios.get(`${API_URL}/battles`);
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

        return { data: battlesWithRapperNames, error: null };
    } catch (error) {
        return { data: null, error: `Failed to fetch battles: ${error}` };
    }
};

export const getBattle = async (battleId) => {
    try {
        const response = await axios.get(`${API_URL}/battles/${battleId}`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: `Failed to fetch battle: ${error}` };
    }
};

export const getRapperData = async (rapperName) => {
    try {
        const response = await axios.get(
            `${API_URL}/battles/rapper-data/${rapperName}`
        );
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: `Failed to fetch rapper data: ${error}` };
    }
};

export const getCriteria = async () => {
    try {
        const response = await axios.get(`${API_URL}/criteria`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: `Failed to fetch criteria: ${error}` };
    }
};

export const postGrade = async (grade, rapperId, userId) => {
    const newGrade = {
        grade: grade,
        rapper_id: rapperId,
        user_id: userId,
    };
    try {
        const response = await axios.post(`${API_URL}/grades`, newGrade);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: `Error adding grade: ${error}` };
    }
};

export const updateRapperStats = async (winnerId, loserId) => {
    try {
        await axios.patch(`${API_URL}/rappers/rapper-wins`, {
            rapper_id: winnerId,
        });
        await axios.patch(`${API_URL}/rappers/rapper-losses`, {
            rapper_id: loserId,
        });
        return { data: true, error: null };
    } catch (error) {
        return { data: null, error: `Error updating rapper stats: ${error}` };
    }
};

export const updateBattleStats = async (
    battleId,
    winnerId,
    rapper1,
    rapper2
) => {
    try {
        if (winnerId === rapper1) {
            await axios.patch(`${API_URL}/battles/rapper1`, {
                id: battleId,
            });
        } else if (winnerId === rapper2) {
            await axios.patch(`${API_URL}/battles/rapper2`, {
                id: battleId,
            });
        } else {
            throw new Error("Invalid winnerId");
        }
        return { data: true, error: null };
    } catch (error) {
        return { data: null, error: `Error updating battle stats: ${error}` };
    }
};

export const addUserToDatabase = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/users`, user);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: `Error adding user: ${error}` };
    }
};

export const addUserBattle = async (battleId, userId) => {
    const newBattle = {
        battle_id: battleId,
        user_id: userId,
    };
    try {
        const response = await axios.post(
            `${API_URL}/users-battles`,
            newBattle
        );
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: `Error adding user-battle: ${error}` };
    }
};
