import React from "react";
import "./Results.scss";

export default function Results({
    rapper1,
    rapper2,
    battle,
    rapper1Grade,
    rapper2Grade,
}) {
    return (
        <section>
            <h2>Battle Results</h2>
            <article>
                <div>
                    <h3></h3>
                    <h3></h3>
                    <p></p>
                    <p></p>
                </div>
                <div>
                    <h3></h3>
                    <h3></h3>
                    <p></p>
                    <p></p>
                </div>
            </article>
            <article>
                <h4>This Battle</h4>
                <div>
                    <p></p>
                    <p>-</p>
                    <p></p>
                </div>
            </article>
        </section>
    );
}
