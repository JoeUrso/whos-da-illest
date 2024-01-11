import React from "react";
import { Link } from "react-router-dom";
import { useBattleContext } from "../../context/GameContext";
import "./BattleInfo.scss";

export default function BattleInfo({ battle }) {
    const { setRapper1, setRapper2, setBattle } = useBattleContext();

    const handleChooseBattle = () => {
        setBattle(battle);
        setRapper1(battle.rapper1_name);
        setRapper2(battle.rapper2_name);
    };

    return (
        <Link
            className="battle-info"
            key={battle.id}
            to={"/battle/" + battle.id + "/start"}
            onClick={handleChooseBattle}
        >
            <article className="battle-info__container">
                <div className="battle-info__name-container">
                    <h3 className="battle-info__card-headings">BATTLE NAME</h3>
                    <p className="battle-info__name">{battle.name}</p>
                </div>
                <div className="battle-info__rappers-battles-fought-container">
                    <div className="battle-info__rappers-container">
                        <h3 className="battle-info__card-headings">RAPPERS</h3>
                        <p className="battle-info__rappers">
                            {battle.rapper1_name} vs {battle.rapper2_name}
                        </p>
                    </div>
                    <div className="battle-info__battles-fought-container">
                        <h3 className="battle-info__card-headings">
                            BATTLES FOUGHT
                        </h3>
                        <p className="battle-info__total-battles">
                            {battle.total_battles}
                        </p>
                    </div>
                </div>
            </article>
        </Link>
    );
}
