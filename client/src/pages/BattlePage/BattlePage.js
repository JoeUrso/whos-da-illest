import axios from "axios";
import React, { Component } from "react";
import GradeRapper from "../../components/GradeRapper/GradeRapper";
import RapperInfo from "../../components/RapperInfo/RapperInfo";
import "./BattlePage.scss";
const API_URL = process.env.API_URL || "http://localhost:8000";
const SPOTIFY_URL = "https://api.spotify.com/v1/search?";

export default class BattlePage extends Component {
    state = {
        battle: [],
        rapper1: [],
        rapper2: [],
        isLoading: true,
        isInfo: true,
        isRapper1: false,
        isRapper2: false,
        isResults: false,
    };

    startBattle = () => {
        this.setState({
            isInfo: false,
            isRapper1: true,
        });
    };

    passTheMic = () => {
        this.setState({
            isRapper1: false,
            isRapper2: true,
        });
    };

    DropTheMic = () => {
        this.setState({
            isRapper2: false,
            isResults: true,
        });
    };

    backToBattles = () => {
        // THIS IS WHERE YOU'LL POST THE GRADES AND SCORES AND SHIT
    };

    componentDidMount = () => {
        let selectedBattleId = this.props.match.params.battleId;

        axios.get(API_URL + "/battles").then((response) => {
            let battles = response.data;

            let foundBattle = battles.find(
                (battle) => battle.id === parseInt(selectedBattleId)
            );

            this.setState({
                battle: foundBattle,
            });
        });

        axios.get(API_URL + "/battles/rapper-data").then((response) => {
            let token = response.data;
            let header = {
                Authorization: "Bearer" + " " + token,
                "Content-Type": "application/json",
            };

            axios
                .get(
                    SPOTIFY_URL +
                        `q=artist:${this.state.battle.rapper1_name}` +
                        `&type=artist`,
                    {
                        headers: header,
                    }
                )
                .then((response) => {
                    this.setState({
                        rapper1: response.data.artists.items[0],
                    });
                });

            axios
                .get(
                    SPOTIFY_URL +
                        `q=artist:${this.state.battle.rapper2_name}` +
                        `&type=artist`,
                    {
                        headers: header,
                    }
                )
                .then((response) => {
                    this.setState({
                        rapper2: response.data.artists.items[0],
                        isLoading: false,
                    });
                });
        });
    };

    render() {
        const {
            battle,
            rapper1,
            rapper2,
            isLoading,
            isInfo,
            isRapper1,
            isRapper2,
            isResults,
        } = this.state;

        return (
            <>
                {isInfo === true && (
                    <main className="battle">
                        <h1 className="battle__heading">WHO'S DA ILLEST?</h1>
                        <h2 className="battle__name">{battle.name}</h2>
                        {isLoading === true ? (
                            <h3 className="battle__loading">loading</h3>
                        ) : (
                            <div className="battle__rapper-info-container">
                                <RapperInfo rapper={rapper1} />
                                {/* <h4 className="battle__vs">VS</h4> */}
                                <RapperInfo rapper={rapper2} />
                            </div>
                        )}
                        <button
                            className="battle__button"
                            onClick={this.startBattle}
                        >
                            YO DJ! START THE BATTLE!
                        </button>
                    </main>
                )}
                {isRapper1 === true && (
                    <main className="battle">
                        <h1 className="battle__heading">WHO'S DA ILLEST?</h1>
                        <GradeRapper
                            rapper={rapper1}
                            buttonText={"PASS THE MIC!"}
                            click={this.passTheMic}
                        />
                    </main>
                )}
                {isRapper2 === true && (
                    <main className="battle">
                        <h1 className="battle__heading">WHO'S DA ILLEST?</h1>
                        <GradeRapper
                            rapper={rapper2}
                            buttonText={"DROP THE MIC!"}
                            click={this.DropTheMic}
                        />
                    </main>
                )}
                {isResults === true && (
                    <main className="battle">
                        <h1 className="battle__heading">WHO'S DA ILLEST?</h1>
                        <h2>RESULTS</h2>
                    </main>
                )}
            </>
        );
    }
}
