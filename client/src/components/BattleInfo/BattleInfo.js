import React from "react";
import "./BattleInfo.scss";

export default function BattleInfo({ battle }) {
    return (
        <article className="battle-info">
            <div className="battle-info__name-container">
                <h3 className="battle-info__card-headings">BATTLE NAME</h3>
                <p className="battle-info__name">{battle.name}</p>
            </div>
            <div className="battle-info__rappers-battles-fought-container">
                <div className="battle-info__rappers-container">
                    <h3 className="battle-info__card-headings">RAPPERS</h3>
                    <p className="battle-info__rappers">
                        {battle.rapper1_id} vs {battle.rapper2_id}
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
    );
}
