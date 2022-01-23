import React, { Component } from "react";
import BattleInfo from "../components/BattleInfo/BattleInfo";
import RapperStats from "../components/RapperStats/RapperStats";
import "./Homepage.scss";

export default class HomePage extends Component {
    state = {
        rappers: [
            {
                id: 1,
                name: "Jay-Z",
                wins: 22,
                losses: 4,
            },
            {
                id: 2,
                name: "Drake",
                wins: 17,
                losses: 7,
            },
            {
                id: 3,
                name: "The Notorious B.I.G",
                wins: 29,
                losses: 6,
            },
        ],
        battles: [
            {
                id: 1,
                name: "Battle of the Chart Toppers",
                rapper1_id: 1,
                rapper2_id: 2,
                rapper1_wins: 22,
                rapper2_wins: 12,
                total_battles: 40,
            },
            {
                id: 2,
                name: "Battle of the Poets",
                rapper1_id: 5,
                rapper2_id: 10,
                rapper1_wins: 20,
                rapper2_wins: 11,
                total_battles: 31,
            },
            {
                id: 3,
                name: "Battle of the BARS",
                rapper1_id: 12,
                rapper2_id: 15,
                rapper1_wins: 12,
                rapper2_wins: 9,
                total_battles: 21,
            },
        ],
    };

    render() {
        return (
            <main className="homepage">
                <h1 className="homepage__heading">WHOSE DA ILLEST?</h1>
                <button className="homepage__button">Go To Battles</button>
                <section className="homepage__rappers">
                    <h2 className="homepage__subheading">On Da Mic</h2>
                    <div className="homepage__rappers-table">
                        <h3 className="homepage__rappers-table-name">NAME</h3>
                        <h3 className="homepage__rappers-table-w-l">W-L</h3>
                        <h3 className="homepage__rappers-table-avg-grade">
                            AVG GRADE
                        </h3>
                    </div>
                    {this.state.rappers.map((rapper) => {
                        <RapperStats rapper={rapper} avgGrade={10} />;
                    })}
                </section>
                <section className="homepage__battles">
                    <h2 className="homepage__subheading">Battle Board</h2>
                    <p className="homepage__click-to-play">
                        click a battle to play
                    </p>
                    <div className="homepage__battles-table">
                        <h3 className="homepage__battles-table-name">NAME</h3>
                        <h3 className="homepage__battles-table-rappers">
                            RAPPERS
                        </h3>
                        <h3 className="homepage__battles-table-battles-fought">
                            BATTLES FOUGHT
                        </h3>
                    </div>
                    {this.state.battles.map((battle) => {
                        <BattleInfo battle={battle} />;
                    })}
                </section>
            </main>
        );
    }
}
