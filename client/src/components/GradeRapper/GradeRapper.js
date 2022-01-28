import React from "react";
import "./GradeRapper.scss";

export default function GradeRapper({ rapper, buttonText, click }) {
    return (
        <section className="grade">
            <h2 className="grade__rapper-name">{rapper.name}</h2>
            <button className="grade__button" onClick={click}>
                {buttonText}
            </button>
        </section>
    );
}
