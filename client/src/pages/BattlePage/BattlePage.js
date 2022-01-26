import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import RapperInfo from "../../components/RapperInfo/RapperInfo";
import "./BattlePage.scss";
const API_URL = process.env.API_URL || "http://localhost:8000";

// const client_id = "b5e35c2df7ec4fcd86e84ed4cb6deb0b";
// // ADD NEW const client_secret = "";
// const BASE_64_ENCODED_AUTH = Buffer.from(client_id + ":" + client_secret);

// console.log(BASE_64_ENCODED_AUTH);

// const getToken = {
//     url: "https://accounts.spotify.com/api/token",
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Basic ${BASE_64_ENCODED_AUTH}`,
//     },
//     grant_type: "client_credentials",
// };

export default class BattlePage extends Component {
    state = {
        battle: [],
        rapper1: [],
        rapper2: [],
    };

    // requestAuthorization = () => {
    //     axios.post(getToken).then((response) => {
    //         console.log(response.data);
    //     });
    // };

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

        // this.requestAuthorization();
    };

    render() {
        const { battle, rapper1, rapper2 } = this.state;

        return (
            <main className="battle">
                <h1 className="battle__heading">WHOSE DA ILLEST?</h1>
                <h2>{battle.name}</h2>
                <div>
                    <RapperInfo rapper={rapper1} />
                    <RapperInfo rapper={rapper2} />
                </div>
                <Link>
                    <button>DJ! GET THAT SHIT!</button>
                </Link>
            </main>
        );
    }
}
