import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import GradeRapper from "../../components/GradeRapper/GradeRapper";
import RapperInfo from "../../components/RapperInfo/RapperInfo";
import Results from "../../components/Results/Results";
import "./BattlePage.scss";
const API_URL = process.env.API_URL || "http://localhost:8000";
const SPOTIFY_URL = "https://api.spotify.com/v1/search?";

export default class BattlePage extends Component {
    state = {
        battle: [],
        rapper1: [],
        rapper2: [],
        isInfo: false,
        isRapper1: false,
        isRapper2: false,
        isResults: false,
        // criteria: [
        //     {
        //         id: 1,
        //         criterion: "Presence",
        //         explainer:
        //             "Energy on the mic. Voice. Rapper stands out when featured on a song.",
        //     },
        //     {
        //         id: 2,
        //         criterion: "Flow",
        //         explainer:
        //             "Cadence. Melody. The way the words move over the beat.",
        //     },
        //     {
        //         id: 3,
        //         criterion: "Rhymes",
        //         explainer:
        //             "Complexity of rhyme schemes: use of internal rhymes, slant rhymes, etc.",
        //     },
        //     {
        //         id: 4,
        //         criterion: "Complexity",
        //         explainer:
        //             "Vocabulary. Use of metaphors, entendres, and other figurative language.",
        //     },
        //     {
        //         id: 5,
        //         criterion: "Articulation",
        //         explainer:
        //             "How well you can understand what the Rapper is saying.",
        //     },
        //     {
        //         id: 6,
        //         criterion: "Creativity",
        //         explainer:
        //             "Sticking to themes. Experimentation. Music video concepts. Image.",
        //     },
        //     {
        //         id: 7,
        //         criterion: "Versatility",
        //         explainer:
        //             "How many subgenres has the Rapper mastered (ie trap, boom bap, etc)?",
        //     },
        //     {
        //         id: 8,
        //         criterion: "Depth",
        //         explainer:
        //             "Concepts. Emotion. Storytelling. Philosophy. Political statements.",
        //     },
        //     {
        //         id: 9,
        //         criterion: "Hits",
        //         explainer: "How many hit records does the Rapper have?",
        //     },
        //     {
        //         id: 10,
        //         criterion: "Performance",
        //         explainer: "Live performances. Music video performances.",
        //     },
        // ],
        rapper1Grade: null,
        rapper2Grade: null,
        resultsArePosted: false,
    };

    startBattle = () => {
        this.setState({
            isInfo: false,
            isRapper1: true,
        });
    };

    passTheMic = (grade) => {
        this.setState({
            isRapper1: false,
            isRapper2: true,
            rapper1Grade: grade,
        });
    };

    dropTheMic = (grade) => {
        this.setState({
            isRapper2: false,
            isResults: true,
            rapper2Grade: grade,
        });
    };

    backToBattles = (rapper1Grade, rapper2Grade, winner) => {
        let newGrade1 = {
            grade: rapper1Grade.toString(),
            rapper_id: this.state.battle.rapper1_id.toString(),
        };

        let newGrade2 = {
            grade: rapper2Grade.toString(),
            rapper_id: this.state.battle.rapper2_id.toString(),
        };

        axios.post(API_URL + "/grades", newGrade1).then((response) => {});

        axios.post(API_URL + "/grades", newGrade2).then((response) => {});

        if (winner.toLowerCase() === this.state.rapper1.name.toLowerCase()) {
            axios
                .patch(API_URL + "/battles/rapper1", this.state.battle)
                .then((response) => {});

            axios
                .patch(API_URL + "/rappers/rapper1-wins", this.state.battle)
                .then((response) => {});

            axios
                .patch(API_URL + "/rappers/rapper2-losses", this.state.battle)
                .then((response) => {});
        } else {
            axios
                .patch(API_URL + "/battles/rapper2", this.state.battle)
                .then((response) => {});

            axios
                .patch(API_URL + "/rappers/rapper1-losses", this.state.battle)
                .then((response) => {});

            axios
                .patch(API_URL + "/rappers/rapper2-wins", this.state.battle)
                .then((response) => {});
        }

        this.setState({
            resultsArePosted: true,
        });
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
                        isInfo: true,
                    });
                });
        });
    };

    render() {
        const {
            battle,
            rapper1,
            rapper2,
            isInfo,
            isRapper1,
            isRapper2,
            isResults,
            criteria,
            rapper1Grade,
            rapper2Grade,
            resultsArePosted,
        } = this.state;

        return (
            <>
                {isInfo === false &&
                    isRapper1 === false &&
                    isRapper2 === false &&
                    isResults === false && (
                        <h1 className="battle__loading">loading</h1>
                    )}
                {isInfo === true && (
                    <main className="battle">
                        <Link to="/" className="battle__heading">
                            WHO'S DA ILLEST?
                        </Link>
                        <h2 className="battle__name">{battle.name}</h2>
                        <div className="battle__rapper-info-container">
                            <RapperInfo rapper={rapper1} />
                            <RapperInfo rapper={rapper2} />
                        </div>
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
                        <Link to="/" className="battle__heading">
                            WHO'S DA ILLEST?
                        </Link>
                        <GradeRapper
                            rapper={rapper1}
                            criteria={criteria}
                            buttonText={"PASS THE MIC!"}
                            click1={this.passTheMic}
                            isRapper1={true}
                        />
                    </main>
                )}

                {isRapper2 === true && (
                    <main className="battle">
                        <Link to="/" className="battle__heading">
                            WHO'S DA ILLEST?
                        </Link>
                        <GradeRapper
                            rapper={rapper2}
                            criteria={criteria}
                            buttonText={"DROP THE MIC!"}
                            click2={this.dropTheMic}
                            isRapper1={false}
                        />
                    </main>
                )}

                {isResults === true && (
                    <main className="battle">
                        <Link to="/" className="battle__heading">
                            WHO'S DA ILLEST?
                        </Link>
                        <Results
                            rapper1={rapper1}
                            rapper2={rapper2}
                            rapper1Grade={rapper1Grade}
                            rapper2Grade={rapper2Grade}
                            battle={battle}
                            click3={this.backToBattles}
                        />
                    </main>
                )}

                {resultsArePosted === true && <Redirect to="/" />}
            </>
        );
    }
}
