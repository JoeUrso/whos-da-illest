import axios from "axios";
import React, { Component } from "react";
import "../";
import BattleInfo from "../components/BattleInfo/BattleInfo";
import RapperStats from "../components/RapperStats/RapperStats";
import "./Homepage.scss";
const API_URL = process.env.API_URL || "http://localhost:8000";

export default class HomePage extends Component {
    state = {
        rappers: [],
        battles: [],
    };

    componentDidMount = () => {
        axios.get(API_URL + "/rappers").then((response) => {
            this.setState({
                rappers: response.data,
            });
        });

        axios.get(API_URL + "/grades/avg-grades").then((response) => {
            let grades = response.data;
            let rappersWithGrades = [];

            this.state.rappers.forEach((rapper) => {
                let foundGrade = grades.find(
                    (grade) => grade.rapper_id === rapper.id
                );
                let updatedRapper = { ...rapper, grade: foundGrade.avgGrade };
                rappersWithGrades.push(updatedRapper);
            });

            this.setState({
                rappers: rappersWithGrades,
            });
        });

        axios.get(API_URL + "/battles").then((response) => {
            this.setState({
                battles: response.data,
            });
        });
    };

    render() {
        return (
            <main className="homepage">
                <h1 className="homepage__heading">WHOSE DA ILLEST?</h1>
                <button className="homepage__button">Go To Battles</button>
                <section className="homepage__rappers">
                    <h2 className="homepage__subheading">On Da Mic</h2>
                    <div className="homepage__rappers-table">
                        <div className="homepage__rappers-table-headings">
                            <h3 className="homepage__rappers-table-name">
                                NAME
                            </h3>
                            <h3 className="homepage__rappers-table-w-l">W-L</h3>
                            <h3 className="homepage__rappers-table-avg-grade">
                                AVG GRADE
                            </h3>
                        </div>
                        {this.state.rappers
                            .sort((a, b) => b.grade - a.grade)
                            .map((rapper) => {
                                return (
                                    <RapperStats
                                        key={rapper.id}
                                        rapper={rapper}
                                        avgGrade={rapper.grade}
                                    />
                                );
                            })}
                    </div>
                </section>
                <section className="homepage__battles">
                    <h2 className="homepage__subheading">Battle Board</h2>
                    <p className="homepage__click-to-play">
                        click a battle to play
                    </p>
                    <div className="homepage__battles-table homepage__battles-table--mobile">
                        <div className="homepage__battles-table-headings">
                            <h3 className="homepage__battles-table-name">
                                NAME
                            </h3>
                            <h3 className="homepage__battles-table-rappers">
                                RAPPERS
                            </h3>
                            <h3 className="homepage__battles-table-battles-fought">
                                BATTLES FOUGHT
                            </h3>
                        </div>
                        {this.state.battles
                            .sort((a, b) => b.total_battles - a.total_battles)
                            .map((battle) => {
                                return (
                                    <BattleInfo
                                        key={battle.id}
                                        battle={battle}
                                    />
                                );
                            })}
                    </div>
                </section>
            </main>
        );
    }
}
