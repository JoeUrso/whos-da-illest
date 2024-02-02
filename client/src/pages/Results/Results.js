import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classicScratch from "../../assets/sounds/ClassicScratch.mp3";
import { useBattleContext } from "../../context/GameContext";
import {
    addUserBattle,
    getBattle,
    postGrade,
    updateBattleStats,
    updateRapperStats,
} from "../../utils/api";
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

    const classicScratchAudio = new Audio(classicScratch);

    const { user } = useUser();

    useEffect(() => {
        (async () => {
            try {
                const { rapper1_id, rapper2_id, id } = battle;
                await postGrade(Math.round(rapper1Grade), rapper1_id, user.id);
                await postGrade(Math.round(rapper2Grade), rapper2_id, user.id);
                await addUserBattle(user.id, id);

                const winner =
                    rapper1Grade > rapper2Grade ? rapper1_id : rapper2_id;
                const loser =
                    rapper1Grade < rapper2Grade ? rapper1_id : rapper2_id;

                await updateRapperStats(winner, loser);
                await updateBattleStats(id, winner, rapper1_id, rapper2_id);

                const updatedBattle = await getBattle(id);
                setBattle(updatedBattle.data);
            } catch (error) {
                throw new Error(`Error handling button click: ${error}`);
            }
        })();
    }, []);

    const handleButtonClick = async () => {
        setBattle({});
        setRapper1({});
        setRapper2({});
        setRapper1Grade(null);
        setRapper2Grade(null);

        classicScratchAudio.play();
        navigate("/");
    };

    return (
        <main className="battle">
            <Link to="/" className="battle__heading">
                WHO'S DA ILLEST?
            </Link>
            <section className="results">
                <h2 className="results__heading">Battle Results</h2>
                <article className="results__main-container">
                    {/* TODO fix the animations, sometimes the winner gets bumped in the wrong direction */}
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
