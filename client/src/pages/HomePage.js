import React, { Component } from "react";
import BattleInfo from "../components/BattleInfo/BattleInfo";
import RapperStats from "../components/RapperStats/RapperStats";
import "./Homepage.scss";

export default class HomePage extends Component {
    state = {
        rappers: [],
        battles: [],
    };

    render() {
        return (
            <div>
                <h1>WHOSE DA ILLEST?</h1>
                <button>Go To Battles</button>
                <section>
                    <h2>On Da Mic</h2>
                    <div>
                        <h3>NAME</h3>
                        <h3>W-L</h3>
                        <h3>AVG GRADE</h3>
                    </div>
                    {this.state.rappers.map((rapper) => {
                        <RapperStats rapper={rapper} avgGrade={10} />;
                    })}
                </section>
                <section>
                    <h2>Battle Board</h2>
                    <div>
                        <h3>NAME</h3>
                        <h3>RAPPERS</h3>
                        <h3>BATTLES FOUGHT</h3>
                    </div>
                    {this.state.battles.map((battle) => {
                        <BattleInfo battle={battle} />;
                    })}
                </section>
            </div>
        );
    }
}
