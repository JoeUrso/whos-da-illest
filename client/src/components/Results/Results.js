import React from "react";
import "./Results.scss";

export default function Results({
    rapper1,
    rapper2,
    battle,
    rapper1Grade,
    rapper2Grade,
    click3,
}) {
    let winner = "";
    rapper1Grade > rapper2Grade
        ? (winner = rapper1.name)
        : (winner = rapper2.name);

    return (
        <section className="results">
            <h2 className="results__heading">Battle Results</h2>
            <article className="results__main-container">
                <div className="results__rapper-container">
                    <h3 className="results__name">{rapper1.name}</h3>
                    {rapper1Grade > rapper2Grade ? (
                        <h3 className="results__result">WIN</h3>
                    ) : (
                        <h3 className="results__result">LOSE</h3>
                    )}
                    <p className="results__grade">Your Grade: {rapper1Grade}</p>
                </div>
                <div className="results__rapper-container">
                    <h3 className="results__name">{rapper2.name}</h3>
                    {rapper2Grade > rapper1Grade ? (
                        <h3 className="results__result">WIN</h3>
                    ) : (
                        <h3 className="results__result">LOSE</h3>
                    )}
                    <p className="results__grade">Your Grade: {rapper2Grade}</p>
                </div>
            </article>
            <h4 className="results__heading">This Battle</h4>
            <article className="results__record-container">
                <p className="results__wins">{battle.rapper1_wins}</p>
                <p className="results__hyphen">-</p>
                <p className="results__wins">{battle.rapper2_wins}</p>
            </article>
            <button
                className="results__button"
                onClick={() => {
                    click3(rapper1Grade, rapper2Grade, winner);
                }}
            >
                Back to Battles!
            </button>
        </section>
    );
}
