import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBattleContext } from "../../context/GameContext";
import { postGrade, updateRapperStats } from "../../utils/api";
import "./Results.scss";

const RapperResult = ({ rapper, grade, isWinner }) => (
    <div
        className={`results__rapper-container ${
            isWinner
                ? "results__rapper-container--1-wins"
                : "results__rapper-container--1-loses"
        }`}
    >
        <h3 className="results__name">{rapper.name}</h3>
        <h3 className="results__result">{isWinner ? "WIN" : "LOSE"}</h3>
        <p className="results__grade">Your Grade: {grade}</p>
    </div>
);

export default function Results() {
    const {
        rapper1,
        rapper2,
        battle,
        rapper1Grade,
        rapper2Grade,
        setBattle,
        setRapper1,
        setRapper2,
        setRapper1Grade,
        setRapper2Grade,
    } = useBattleContext();

    const navigate = useNavigate();

    const handleButtonClick = async () => {
        try {
            const { rapper1_id, rapper2_id } = battle;
            await postGrade(Math.round(rapper1Grade), rapper1_id);
            await postGrade(Math.round(rapper2Grade), rapper2_id);

            const winner =
                rapper1Grade > rapper2Grade ? rapper1_id : rapper2_id;
            const loser = rapper1Grade < rapper2Grade ? rapper1_id : rapper2_id;

            await updateRapperStats(winner, loser);

            setBattle({});
            setRapper1({});
            setRapper2({});
            setRapper1Grade(null);
            setRapper2Grade(null);

            navigate("/");
        } catch (error) {
            console.error(`Error handling button click: ${error}`);
        }
    };

    return (
        <main className="battle">
            <Link to="/" className="battle__heading">
                WHO'S DA ILLEST?
            </Link>
            <section className="results">
                <h2 className="results__heading">Battle Results</h2>
                <article className="results__main-container">
                    <RapperResult
                        rapper={rapper1}
                        grade={rapper1Grade}
                        isWinner={rapper1Grade > rapper2Grade}
                    />
                    <RapperResult
                        rapper={rapper2}
                        grade={rapper2Grade}
                        isWinner={rapper1Grade < rapper2Grade}
                    />
                </article>
                <h4 className="results__heading">This Battle</h4>
                <article className="results__record-container">
                    <p className="results__wins">{battle.rapper1_wins}</p>
                    <p className="results__hyphen">-</p>
                    <p className="results__wins">{battle.rapper2_wins}</p>
                </article>
                <button className="results__button" onClick={handleButtonClick}>
                    Back to Battles!
                </button>
            </section>
        </main>
    );
}
