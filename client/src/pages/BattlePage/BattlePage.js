import axios from "axios";
import React, { Component, createRef } from "react";
import { Link, Redirect } from "react-router-dom";
import classicScratch from "../../assets/sounds/ClassicScratch.mp3";
import scratch1 from "../../assets/sounds/Scratch1.mp3";
import scratch2 from "../../assets/sounds/Scratch2.mp3";
import watchThis from "../../assets/sounds/WatchThis.mp3";
import GradeRapper from "../../components/GradeRapper/GradeRapper";
import RapperInfo from "../../components/RapperInfo/RapperInfo";
import Results from "../../components/Results/Results";
import "./BattlePage.scss";
const API_URL = process.env.API_URL || "http://localhost:8080";
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
        criteria: [],
        rapper1Grade: null,
        rapper2Grade: null,
        resultsArePosted: false,
    };

    // SOUND FX
    watchThis = new Audio(watchThis);
    scratch1 = new Audio(scratch1);
    scratch2 = new Audio(scratch2);
    classicScratch = new Audio(classicScratch);

    // SCROLL TO TOP
    scrollToTop = createRef();
    scrollHandler = () => {
        this.scrollToTop.current.scrollIntoView({ behavior: "auto" });
    };

    // CALLED BY RAPPERINFO
    startBattle = () => {
        this.scrollHandler();
        this.watchThis.play();
        this.setState({
            isInfo: false,
            isRapper1: true,
        });
    };

    //CALLED BY GRADE RAPPER 1
    passTheMic = (grade) => {
        this.scrollHandler();
        this.scratch1.play();
        this.setState({
            isRapper1: false,
            isRapper2: true,
            rapper1Grade: grade,
        });
    };

    // CALLED BY GRADE RAPPER 2
    dropTheMic = (grade) => {
        this.scrollHandler();
        this.scratch2.play();
        this.setState({
            isRapper2: false,
            isResults: true,
            rapper2Grade: grade,
        });
    };

    // CALLED BY RESULTS
    backToBattles = (rapper1Grade, rapper2Grade, winner) => {
        this.scrollHandler();
        this.classicScratch.play();
        let newGrade1 = {
            grade: rapper1Grade.toString(),
            rapper_id: this.state.battle.rapper1_id.toString(),
        };

        // SENDS DATA TO MYSQL
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

        // HANDLES SPOTIFY INFO
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
                    console.log(response.data.artists.items[0]);
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
                    });

                    setTimeout(() => {
                        this.setState({
                            isInfo: true,
                        });
                    }, 100);
                });

            axios.get(API_URL + "/criteria").then((response) => {
                this.setState({
                    criteria: response.data,
                });
            });
        });

        window.scrollTo(0, 0);
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
                    <main className="battle" ref={this.scrollToTop}>
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
                    <main className="battle" ref={this.scrollToTop}>
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
                    <main className="battle" ref={this.scrollToTop}>
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
                    <main className="battle" ref={this.scrollToTop}>
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
