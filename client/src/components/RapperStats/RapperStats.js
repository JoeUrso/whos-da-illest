import React from "react";
import "./RapperStats.scss";

export default function RapperStats({ rapper, avgGrade }) {
    return (
        <article className="rapper-stats">
            <p className="rapper-stats__name">{rapper.name}</p>
            <p className="rapper-stats__w-l">
                {rapper.wins}-{rapper.losses}
            </p>
            <p className="rapper-stats__avg-grade">{avgGrade}</p>
        </article>
    );
}
