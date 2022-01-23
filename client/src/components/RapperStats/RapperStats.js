import React from "react";

export default function RapperStats({ rapper, avgGrade }) {
    return (
        <article>
            <p>{rapper.name}</p>
            <p>
                {rapper.wins}-{rapper.losses}
            </p>
            <p>{avgGrade}</p>
        </article>
    );
}
