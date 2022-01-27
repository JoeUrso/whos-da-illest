import axios from "axios";
import React, { Component } from "react";
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

            // this.setState({
            //     token: response.data,
            // });

            // let header = {
            //     Authorization: "Bearer" + " " + this.state.token,
            //     "Content-Type": "application/json",
            // };

            // console.log(header);

            // axios
            //     .get(SPOTIFY_URL + `q=artist:Drake` + `&type=artist`, {
            //         headers: header,
            //     })
            //     .then((response) => {
            //         console.log(response);
            //     });
        });
    };

    render() {
        const { battle, rapper1, rapper2, isLoading } = this.state;

        return (
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

                {/* <Link>
                    <button>DJ! GET THAT SHIT!</button>
                </Link> */}
            </main>
        );
    }
}
