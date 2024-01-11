import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBattleContext } from "../../context/GameContext";
import { getRapperData } from "../../utils/api";
import RapperInfo from "../RapperInfo/RapperInfo";
import "./BattleStart.scss";

const BattleStart = () => {
    const { battle, rapper1, rapper2, setRapper1, setRapper2 } =
        useBattleContext();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRapperData = async () => {
            const rapper1Data = await getRapperData(battle.rapper1_name);
            const rapper2Data = await getRapperData(battle.rapper2_name);
            setRapper1(rapper1Data);
            setRapper2(rapper2Data);
            setLoading(false);
        };

        fetchRapperData();
    }, []);

    const startBattle = () => {
        navigate(`/battle/${battle.id}/rapper1`);
    };

    if (loading) return <div>loading</div>;

    return (
        <main className="battle">
            <Link to="/" className="battle__heading">
                WHO'S DA ILLEST?
            </Link>
            <h2 className="battle__name">{battle.name}</h2>
            <div className="battle__rapper-info-container">
                <RapperInfo rapper={rapper1} />
                <RapperInfo rapper={rapper2} />
            </div>
            <button className="battle__button" onClick={startBattle}>
                YO DJ! START THE BATTLE!
            </button>
        </main>
    );
};

export default BattleStart;
