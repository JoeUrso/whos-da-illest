import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [battle, _setBattle] = useState({});
    const [rapper1, _setRapper1] = useState({});
    const [rapper2, _setRapper2] = useState({});
    const [criteria, _setCriteria] = useState([]);
    const [rapper1Grade, _setRapper1Grade] = useState(null);
    const [rapper2Grade, _setRapper2Grade] = useState(null);

    const setBattle = (newBattle) => {
        _setBattle(newBattle);
    };

    const setRapper1 = (newRapper1) => {
        _setRapper1(newRapper1);
    };

    const setRapper2 = (newRapper2) => {
        _setRapper2(newRapper2);
    };

    const setCriteria = (newCriteria) => {
        _setCriteria(newCriteria);
    };

    const setRapper1Grade = (newRapper1Grade) => {
        console.log("newRapper1Grade", newRapper1Grade);
        _setRapper1Grade(newRapper1Grade);
    };

    const setRapper2Grade = (newRapper2Grade) => {
        console.log("newRapper2Grade", newRapper2Grade);
        _setRapper2Grade(newRapper2Grade);
    };

    const value = {
        battle,
        setBattle,
        rapper1,
        setRapper1,
        rapper2,
        setRapper2,
        criteria,
        setCriteria,
        rapper1Grade,
        setRapper1Grade,
        rapper2Grade,
        setRapper2Grade,
    };

    return (
        <GameContext.Provider value={value}>{children}</GameContext.Provider>
    );
};

export const useBattleContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error(
            "useBattleContext must be used within a BattleProvider"
        );
    }
    return context;
};
