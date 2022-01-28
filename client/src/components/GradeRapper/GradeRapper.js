import React from "react";
import "./GradeRapper.scss";

export default function GradeRapper({ rapper, buttonText, click }) {
    const criteria = [
        "Mic Presence",
        "Flow",
        "Rhymes",
        "Vocabulary",
        "Articulation",
        "Creativity",
        "Versatility",
        "Voice",
        "Hits",
        "Performance",
    ];

    return (
        <section className="grade">
            <h2 className="grade__rapper-name">{rapper.name}</h2>
            <article className="grade__container">
                {criteria.map((criterion) => {
                    return (
                        <>
                            <h3>{criterion}</h3>
                            <div className="grade__slider-container">
                                <input
                                    type="range"
                                    min="0"
                                    max="10"
                                    id="grade"
                                    className="grade__slider"
                                ></input>
                            </div>
                        </>
                    );
                })}
            </article>
            <button className="grade__button" onClick={click}>
                {buttonText}
            </button>
        </section>
    );
}
